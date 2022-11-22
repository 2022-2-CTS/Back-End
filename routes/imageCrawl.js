const express = require('express');
const app = express();
var router = express.Router();

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

var test_URL = 'http://busandabom.net/play/view.nm?lang=ko&url=play&menuCd=8&res_no=2020030014'



async function image_crawl() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    // headless: false일때 브라우저 크기 지정해주는 코드
    await page.setViewport({
        width: 1920,
        height: 1080
    });

    await page.goto(test_URL);

    var content = await page.content();
    var $ = cheerio.load(content);
    
    var result_image = $('#subcontent > div > div.top.boxing > div.leftbox.img.relative > img');

    console.log(result_image['0']['attribs']['src']);
}

image_crawl();

module.exports = router;