import fs from "fs";
import path from "path";

// PokemonMasterData JSON Schema
interface PokemonData {
  slug: string;
  nameJa: string;
  nameEn: string;
  damageClass: string;
  rangeType: string;
  battleStyle: string;
  imageUrl: string;
}

const MASTER_DATA_PATH = path.join(process.cwd(), "prisma", "pokemonMasterData.json");

// Helper: Custom translation dictionary for exceptions
const customTranslations: Record<string, string> = {
  "mewtwo x": "ミュウツーX",
  "mewtwo y": "ミュウツーY",
  "alolan ninetales": "アローラキュウコン",
  "ho-oh": "ホウオウ",
  "mr. mime": "バリヤード",
  "mr.mime": "バリヤード",
  "mime jr.": "マネネ",
  "mega-charizard-x": "メガリザードンX",
  "mega-charizard-y": "メガリザードンY",
  "mega-gyarados": "メガギャラドス",
  "mega-lucario": "メガルカリオ",
};

async function fetchJapaneseName(nameEn: string): Promise<string> {
  const lowerName = nameEn.toLowerCase();
  if (customTranslations[lowerName]) {
    return customTranslations[lowerName];
  }

  // Sanitize for PokeAPI
  let pokeApiSlug = lowerName.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeApiSlug}`);
    if (!res.ok) return nameEn; // Fallback to English if not found
    
    const data = await res.json();
    const jaEntry = data.names.find((n: any) => n.language.name === "ja-Hrkt" || n.language.name === "ja");
    return jaEntry ? jaEntry.name : nameEn;
  } catch (error) {
    return nameEn;
  }
}

async function fetchOfficialImageUrls(): Promise<Map<string, string>> {
  console.log("Fetching official site HTML for image URLs...");
  try {
    const siteHtml = await fetch("https://www.pokemonunite.jp/ja/pokemon/").then(res => res.text());
    const regex = /https:\/\/www\.pokemonunite\.jp\/wp-content\/uploads\/[^"]+\.png/g;
    const uniqueUrls = [...new Set(siteHtml.match(regex))];
    
    const urlMap = new Map<string, string>();
    for (const url of uniqueUrls) {
      const filename = url.split('/').pop()?.toLowerCase();
      if (filename) urlMap.set(filename, url);
    }
    return urlMap;
  } catch (e) {
    console.warn("Failed to fetch official image URLs", e);
    return new Map<string, string>();
  }
}

async function downloadImage(targetUrl: string, slug: string): Promise<boolean> {
  try {
    console.log(`Downloading image for ${slug}...`);
    const response = await fetch(targetUrl);
    if (!response.ok) throw new Error("Status " + response.status);
    const buffer = await response.arrayBuffer();
    const savePath = path.join(process.cwd(), "public", "pokemon", `${slug}.png`);
    fs.writeFileSync(savePath, Buffer.from(buffer));
    return true;
  } catch(err) {
    console.error(`Failed to download image for ${slug}:`, err);
    return false;
  }
}

async function main() {
  console.log("Fetching latest roster from Unite-DB...");
  
  try {
    const [res, urlMap] = await Promise.all([
      fetch("https://unite-db.com/pokemon.json"),
      fetchOfficialImageUrls()
    ]);
    
    if (!res.ok) throw new Error("Failed to fetch from Unite-DB");
    const externalData = await res.json();

    const existingData: PokemonData[] = JSON.parse(fs.readFileSync(MASTER_DATA_PATH, "utf-8"));
    const existingSlugs = new Set(existingData.map(p => p.slug));

    let addedCount = 0;
    let missingImages: string[] = [];

    for (const ext of externalData) {
      // Base slug generation
      let slug = ext.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Specific fixes matching current pokemonMasterData.json conventions
      if (ext.name === "Alolan Ninetales") slug = "ninetales";
      if (ext.name === "Mewtwo X") slug = "mewtwox";
      if (ext.name === "Mewtwo Y") slug = "mewtwoy";
      if (ext.name === "Ho-Oh") slug = "ho-oh";
      if (ext.name === "Mr.Mime" || ext.name === "Mr. Mime") slug = "mr-mime";

      if (existingSlugs.has(slug)) {
        continue; // Already exists
      }

      console.log(`New Pokemon found: ${ext.name}. Fetching Japanese name...`);
      const nameJa = await fetchJapaneseName(ext.name);

      const newEntry: PokemonData = {
        slug,
        nameJa,
        nameEn: ext.display_name || ext.name,
        damageClass: ext.damage_type?.toLowerCase() || "physical",
        rangeType: ext.tags?.range?.toLowerCase() || "melee",
        battleStyle: ext.tags?.role?.toLowerCase() || "all-rounder",
        imageUrl: `/pokemon/${slug}.png`
      };

      existingData.push(newEntry);
      addedCount++;
      console.log(`Added: ${nameJa} (${newEntry.nameEn})`);

      // Try to find and download the image
      let filenameToCheck = `${slug}.png`;
      if (slug === "ninetales") filenameToCheck = "alolan-ninetales.png";
      if (slug === "raichu") filenameToCheck = "alolan-raichu.png";
      if (slug === "rapidash") filenameToCheck = "galarian-rapidash.png";
      if (slug === "mewtwox") filenameToCheck = "mewtwo-x.png";
      if (slug === "mewtwoy") filenameToCheck = "mewtwo-y.png";
      if (slug === "sirfetchd") filenameToCheck = "sirfetchd-1.png";

      let targetUrl = urlMap.get(filenameToCheck);
      
      if (!targetUrl) {
        for (const [key, searchUrl] of urlMap.entries()) {
          if (key.includes(slug) || key.includes(slug.replace("-", ""))) {
            targetUrl = searchUrl;
            break;
          }
        }
      }

      if (targetUrl) {
        const success = await downloadImage(targetUrl, slug);
        if (!success) missingImages.push(slug);
      } else {
        console.log(`[SKIPPED] Could not find official image URL for ${slug}`);
        missingImages.push(slug);
      }
    }

    if (addedCount > 0) {
      fs.writeFileSync(MASTER_DATA_PATH, JSON.stringify(existingData, null, 2));
      console.log(`\n✅ Successfully added ${addedCount} new Pokemon to pokemonMasterData.json!`);
      
      if (missingImages.length > 0) {
        console.log(`\x1b[33m[WARNING] The following Pokemon images could not be auto-downloaded:\x1b[0m`);
        console.log(missingImages.join(", "));
        console.log(`Please manually place their images in public/pokemon/ (e.g. public/pokemon/<slug>.png)`);
      } else {
        console.log(`✅ All images were automatically downloaded from the official site!`);
      }
      
      console.log(`Run 'npm run seed' to map them into your database.`);
    } else {
      console.log("✅ No new Pokemon found. Your roster is up to date.");
    }
    
  } catch (error) {
    console.error("Error syncing pokemon:", error);
  }
}

main();
