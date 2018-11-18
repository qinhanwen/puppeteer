const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });//无头模式默认是true，设置为false
    const page = await browser.newPage();
    await page.goto('http://www.exexm.com/');

    await page.waitForSelector('.logo>a>img');//等待元素
    const img = await page.$('.logo>a>img');//其实就是document.querySelector
    const boundingBox = await img.boundingBox();//获取一个对象有x，y，width，height属性
    await page.screenshot({ path: 'images/exe-logo.png', clip: boundingBox });//clip 指定页面剪切部分，对象，属性有x,y,width,height

    await browser.close();
})();