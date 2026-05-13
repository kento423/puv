import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('.json') || url.includes('api')) {
      console.log(`Found JSON/API: ${url}`);
    }
  });
  
  console.log("Navigating...");
  await page.goto("https://unite-db.com/pokemon/charizard", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000); // Wait for API calls
  
  await browser.close();
}
main();
