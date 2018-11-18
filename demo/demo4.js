const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });//无头模式默认是true，设置为false
    const page = await browser.newPage();
    await page.goto('https://mail.qq.com/');
    
    page.on('response', response => {
        console.log(response.url());
        if (response.url().indexOf('https://mail.qq.com')) {
            //需要做的操作
        }
    });
     //因为元素iframe标签内，所以要获取一下
     const frame = await page.frames().find(frame => frame.name() === 'login_frame');//找到name=login_frame的iframe
     const inputs = await frame.$$('.inputstyle');//其实就是document.querySelectorAll
     await inputs[0].type('你的邮箱');//在输入框中输入邮箱账号
     await inputs[1].type('你的邮箱密码');//在输入框中输入邮箱密码
     await frame.tap('.login_button');
})();
