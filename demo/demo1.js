const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: './chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    headless: false
  });//无头模式默认是true，设置为false
  const page = await browser.newPage();
  await page.goto('https://baidu.com');
  await page.screenshot({path: 'images/baidu.png'});

  await browser.close();
})();
