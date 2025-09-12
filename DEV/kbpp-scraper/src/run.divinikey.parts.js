//import site scraper and helper to save files
import {listDivinikeyParts} from "./sites/divinikey.js";
import { saveJson} from "./lib/save.js";

const categories = [
    "switches",
    "keycaps",  
    "cases",
    "pcbs",
    "plates",
    "stabilizers",
];

// Main function so we can use await at top level in Node 
async function main() { 
    const rows  = await listDivinikeyParts( categories, { maxPages: 10});
    console.log('divinkey parts ; ${rows.length} items');
    saveJson("output/divinikey.json", rows);
    console.log("Saved to output/divinikey.json");
}


main().catch((err) => {
  console.error("run.divinikey.parts failed:", err);
  process.exit(1);
});


