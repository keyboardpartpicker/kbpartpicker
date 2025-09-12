import puppeteer from "puppeteer";

async function run() { 
    let browser;
    try{
        //remove this alter 
        const SCRAPER_API_KEY = '437e82ae349037a49d52bf25303bb502'
        browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--proxy-server=proxy.scraperapi.com:8001'
    ]
    });

        const page = await browser.newPage();

        await page.authenticate({
            username: SCRAPER_API_KEY,
            password: ''
        });


        await page.goto('https://drop.com/mechanical-keyboards/drops?sc=keycaps', { waitUntil: 'domcontentloaded' });

        const title = await page.title();
        console.log(`Page title: ${title}`);

    } catch (e) {
        //catch error
        console.error('scraper error', e);
    }
    finally {
        //automatically close the browser
        await browser?.close();
    }

}
run();

/* */

