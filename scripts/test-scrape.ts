import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto("https://unite-db.com/pokemon/charizard", { waitUntil: "domcontentloaded", timeout: 60000 });
  
  // Wait for at least one table to appear
  await page.waitForSelector("table", { timeout: 10000 }).catch(() => console.log("No table found"));
  
  const tablesInfo = await page.evaluate(() => {
    const tables = Array.from(document.querySelectorAll("table"));
    return tables.map(t => {
      const rows = Array.from(t.querySelectorAll("tr"));
      const firstRowText = rows[0] ? rows[0].innerText.replace(/\n/g, " | ") : "";
      const lastRowText = rows[rows.length - 1] ? rows[rows.length - 1].innerText.replace(/\n/g, " | ") : "";
      return { rowCount: rows.length, firstRowText, lastRowText };
    });
  });
  
  console.log("Tables found:", tablesInfo);
  await browser.close();
}

main();
