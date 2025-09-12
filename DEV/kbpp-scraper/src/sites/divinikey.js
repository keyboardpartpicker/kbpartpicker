// src/sites/divinikey.parts.js
import { fetchHtml } from "../lib/fetch.js";

const BASE = "https://divinikey.com";

//sleep helper to avoid too many requests
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Edit paths if a collection differs on the site
export const DIVINIKEY_COLLECTIONS = {
  switches: "/collections/switches",
  keycaps: "/collections/new-keycaps",
  cases: "/collections/keyboard-kits",               // may be different; adjust if needed
  pcbs: "/collections/pcb",                    // adjust if needed
  plates: "/collections/keyboard-plates",                // adjust if needed
  stabilizers: "/collections/keyboard-stabilizers",        // adjust if needed
};

// Small helpers to keep output clean
const clean = (s) => (s ? s.replace(/\s+/g, " ").trim() : null);
const abs = (href) => new URL(href, BASE).href;

// Try to read a price off the card (Shopify themes vary)
function readPriceFromCard($, card) {
  // Common patterns:
  // - .price .money
  // - .price-item , .price__regular .price-item--regular
  // - data attributes not consistent across themes
  const txt =
    $(card).find(".price__current").first().text() ||
    $(card).find(".price .money").first().text() ||
    $(card).find(".price-item").first().text() ||
    $(card).find(".price__regular .price-item--regular").first().text() ||
    ""; 
    const m = txt.replace(/,/g, "").match(/(\d+(\.\d+)?)/);
    return m ? Number(m[1]) : null;
}

/**
 * Scrape one collection page (with optional pagination)
 * Returns [{ name, link, price, category, source }]
 */
export async function listDivinikeyCategory(category, { maxPages = 20 } = {}) {
  const path = DIVINIKEY_COLLECTIONS[category];
  if (!path) throw new Error(`Unknown category: ${category}`);

  const items = [];
  let url = abs(path);
  console.log("max pages:", maxPages);
  for (let page = 1; page <= maxPages && url; page++) {
    const $ = await fetchHtml(url);

    const productCards = $("product-card").toArray();;

    // scrape all product parts on current page
    for(const card of productCards) {
      const a = $(card).find("a.card-link").first();
      const name = clean(a.text());
      const href = a.attr("href");

      const link = abs(href);
      const price = readPriceFromCard($, card);

      //add details to information
      const details = await scrapeProductDetails(link);

      items.push({
        name,
        link,
        price: price ?? null,
        category,
        source: "divinikey",
        ...details,
      });
        await sleep(200 + Math.floor(Math.random() * 200));
    }

    // Pagination (Shopify often uses rel="next"; if not present, stop)
    const next = $('a.pagination__arrow--next').attr("href"); 
    //console.log(next);
    url = next ? abs(next) : null;

      if (url) {
        await sleep(200 + Math.floor(Math.random() * 200));
      }
  }

  return items;
}

/**
 * Scrape multiple categories at once
 */
export async function listDivinikeyParts(categories, opts) {
  const out = [];
  for (const cat of categories) {
    const rows = await listDivinikeyCategory(cat, opts);
    out.push(...rows);
    console.log(`${cat}: ${rows.length} items`);
  }
  return out;
}

async function scrapeProductDetails(url) {  
  //need to find correct dom selector
  const $ = await fetchHtml(url); // <-- You need this line!

  const features = [];
  $(".product-description li").each((_, li) => {
    features.push($(li).text().trim());
  });

  //will work on scraping images later
  /*const images = [];
  $(".product__media-item img").each((_, img) => {
    images.push(abs($(img).attr("src")));
  }); */

  return {features};
}

