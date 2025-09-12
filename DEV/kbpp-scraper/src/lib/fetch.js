import axios from "axios";
import * as cheerio from "cheerio";

// No proxy yet. If you later add SCRAPERAPI_KEY in a .env, we can switch here.
//File is in chrage of making actual requests to the HTTP
export async function fetchHtml(url) {
    console.log("Fetching --> ", url);
    //gets the page
    const res = await axios.get(url, { 
      headers: {
      // 2) Pretend to be a normal browser to avoid simple bot blocks.
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      "accept-language": "en-US,en;q=0.9",
    },
    //timeout: 30000, // 30s guard so bad pages don't hang forever

    validateStatus: () => true, // we'll handle bad statuses ourselves
  });

  // Load into cheerio so we can use 

if (res.status >= 400) { 
    throw new Error(`HTTP ${res.status} fetching ${url}`);
}
  const $ = cheerio.load(res.data);
  return $;

}
