const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    args: [
      "--proxy-server='direct://'",
      '--proxy-bypass-list=*',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process',
      '--ignore-certificate-errors',
      '--ignore-certificate-errors-spki-list',
      '--enable-features=NetworkService'
    ]
    //args: ["--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto('https://www.mercadolibre.com.co/ofertas', { waitUntil: 'domcontentloaded' })

  title = await page.evaluate(() => {
    let items = document.querySelectorAll("div.promotion-item__container");
    let results = []
    items.forEach((item) => {
      let imageUrl = item.querySelector('img.promotion-item__img').getAttribute('src');
      let name = item.querySelector('p.promotion-item__title').innerText;
      let discount = item.querySelector('span.promotion-item__discount').innerText;
      let price = item.querySelector('span.promotion-item__price').children[0].innerText;
      results.push({
        url: imageUrl,
        name: name,
        price: price,
        discount: discount
      });
    });
    headings_array = Array.from(items);
    return results;
  });
  console.log(title);
  await browser.close();
})();
