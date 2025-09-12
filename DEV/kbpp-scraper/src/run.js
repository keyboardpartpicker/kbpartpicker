import { scrapeDivinikey } from "./sites/divinikey.js";
import { saveJson } from "./lib/save.js";

(async () => {
  try {
    const data = await scrapeDivinikey({ maxPages: 1 });
    console.log(`divinikey: ${data.length} items`);
    saveJson("output/divinikey.json", data);
    console.log("→ wrote output/divinikey.json");
  } catch (e) {
    console.error("scrape failed:", e.message);
  }
})();
