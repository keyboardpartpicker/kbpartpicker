import { fetchHtml } from "./lib/fetch.js";

const run = async () => {
  const $ = await fetchHtml("https://divinikey.com/collections/keyboard-kits");

  // Example: grab all product names on the page
  const products = [];
  $(".product-item .product-item-title").each((_, el) => {
    products.push($(el).text().trim());
  });
  
  console.log($.html().slice(0, 1000));
  //console.log(products);

};

run();
