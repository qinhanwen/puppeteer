const puppeteer = require('puppeteer');

function timeout(delay) {
    return new Promise(resolve => {
        setTimeout(
            () => {
                resolve()
            }, delay
        )
    })
}

var userInfo = {
    name: '285074175@qq.com',
    pwd: '29muyoujj',
    domaiName: 'http://pi8irywwe.bkt.clouddn.com/'
};

(async () => {
    const browser = await puppeteer.launch({
        executablePath: './chrome-mac/Chromium.app/Contents/MacOS/Chromium',
        headless: false
    });//无头模式默认是true，设置为false
    const page = await browser.newPage();
    const viewConfig = {
        width: 1080,
        height: 1920
    };
    //设置窗口 
    page.setViewport(viewConfig);
    await page.goto('https://portal.qiniu.com/bucket/picture/resource');

    page.on('error', (err) => {
        console.log(err);
    })

    //登录
    await page.waitForSelector('#email');
    await page.type('#email', userInfo.name);
    await page.type('#password', userInfo.pwd);
    await page.tap('#login-button');

    //点击左侧 对象存储的按钮
    await page.waitForSelector('.sidebar-item');
    const sidebarList = await page.$$('.sidebar-item');
    await sidebarList[4].tap();

    //点击内容管理
    await page.waitForSelector('.basic-operation>a');
    await timeout(3000);
    const breadcrumbList = await page.$$('.basic-operation>a');
    await breadcrumbList[2].tap();

    //点击加载更多
    await timeout(3000);
    await page.waitForSelector('.text-center>a');
    await page.tap('.text-center>a');

    //获取列表图片名称信息
    await timeout(3000);
    await page.waitForSelector('.file-td');
    // const innerHTML = 
    let list = await page.$$eval('.file-td', el => {
        let arr = [];
        const len = el.length;
        for (let i = 0; i < len; i++) {
            arr.push(el[i].textContent);
        }
        arr.splice(0,1);
        return arr;
    });
    
    //截图
    list = list.map(item=>item.replace(/(^\s*)|(\s*$)/g, ""));
    const len = list.length;
    for (let i = 0; i < len; i++) { 
        await page.goto(userInfo.domaiName+list[i]);
        const img = await page.$('img');
        if(img){
            const boundingBox = await img.boundingBox();
            await page.screenshot({path:'./images/'+list[i],clip: boundingBox});
        }else{
            await page.screenshot({path:'./images/'+list[i]});
        }
    }

    await browser.close();
})();
