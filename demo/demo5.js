const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: './chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    headless: false
  });//无头模式默认是true，设置为false
  const page = await browser.newPage();
  await page.goto('http://pi8irywwe.bkt.clouddn.com/image-20181003190309249.png');
  const img = await page.waitForSelector('img');
  const boundingBox = await img.boundingBox();//获取一个对象有x，y，width，height属性
  await page.screenshot({path: 'images/baidu.png', clip: boundingBox});

  await browser.close();
})();
