const express = require('express');
const app = express();
var router = express.Router();

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const fs = require('fs');

var Playdata = fs.readFileSync('../json/play_json.json');
var Concertdata = fs.readFileSync('../json/concert_json.json');
var Musicaldata = fs.readFileSync('../json/musical_json.json');
var Exhibitdata = fs.readFileSync('../json/exhibit_json.json');

Playdata = Playdata.toString();
PlayJSON = JSON.parse(Playdata);
PlayRealJSON = [];

Concertdata = Concertdata.toString();
ConcertJSON = JSON.parse(Concertdata);
ConcertRealJSON = [];

Musicaldata = Musicaldata.toString();
MusicalJSON = JSON.parse(Musicaldata);
MusicalRealJSON = [];

Exhibitdata = Exhibitdata.toString();
ExhibitJSON = JSON.parse(Exhibitdata);
ExhibitRealJSON = [];

var test_URL = 'http://busandabom.net/play/view.nm?lang=ko&url=play&menuCd=8&res_no=2020030014'

var tmpData;

async function crawl(nowData) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    // headless: false일때 브라우저 크기 지정해주는 코드
    await page.setViewport({
        width: 1920,
        height: 1080
    });

    await page.setDefaultNavigationTimeout(0);

    await page.goto(nowData.url);

    // 이미지 요소 찾기
    var content = await page.content();
    var $ = cheerio.load(content);

    // 이미지 링크
    var result_image = $('#subcontent > div > div.top.boxing > div.leftbox.img.relative > img');

    console.log(result_image);
    console.log('-------------------------------');
    
    if(result_image.hasOwnProperty('0') == true) {
        var result_image_src = result_image['0']['attribs']['src'];

        // url이 제대로된 url이랑, '/image/~' 이렇게 돼있는게 있음. 이런 경우엔 앞에 다봄 url 추가해줘야함.
        if(result_image_src.startsWith('/')) {
            result_image_src = "https://busandabom.net" + result_image_src
        }

        // 기존 데이터에 이미지 링크 추가
        nowData.data.imgSrc = result_image_src;
        console.log(result_image_src);

        await page.click('#subcontent > div > div.bottom > ul > li:nth-child(2)');

        // 주소 요소 찾기
        content = await page.content();
        $ = cheerio.load(content);
    
        // 주소 텍스트
        var result_address = $('#tab2 > div.subcont-bg > div > div.boardBasic.mb_scroll > div > table > tbody > tr > td:nth-child(5)').text();
    
        // 기존 데이터에 주소 추가
        nowData.data.location = result_address;
        
        tmpData = nowData;
    }
    else {
        console.log("> image src 없음");
    }

    //console.log("<현재 완성된 데이터>");
    //console.log(nowData);


    await browser.close();
}

//console.log(PlayJSON[0].url);
//crawl(PlayJSON[0]);

function leftPad(value) {
    if (value >= 10) {
        return value;
    }

    return `0${value}`;
}

function toStringByFormatting(source, delimiter = '-') {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
}


// 연극
async function crawlPlay() {
    for (var i = 0; i < Object.keys(PlayJSON).length; i++) {
        if (PlayJSON[i] == null) continue;
        //console.log("연극, " + i + "번째 크롤링");
        //console.log(PlayJSON[i]);
        // 데이터 날짜
        if (PlayJSON[i].data.op_ed_dt != null){
            var dataDate = new Date(PlayJSON[i].data.op_ed_dt.toString());
        }
        else {
            var dataDate = new Date();
        }

        // 오늘 날짜
        var todayDate = new Date();

        // '0000-00-00' 포맷으로 변환
        dataDate = toStringByFormatting(dataDate);
        todayDate = toStringByFormatting(todayDate);

        if (todayDate <= dataDate) {
            console.log("> 연극 (" + i + ") " + dataDate + "는 " + todayDate + "보다 나중임.");

            await crawl(PlayJSON[i]);
            PlayRealJSON.push(tmpData);
        }
    }

    PlayRealJSON = JSON.stringify(PlayRealJSON);
    fs.writeFileSync('../json/play_real_json.json', PlayRealJSON);
    console.log(">>> 연극 저장 끝");
}

// 콘서트
async function crawlConcert() {
    for (var i = 0; i < Object.keys(ConcertJSON).length; i++) {
        if (ConcertJSON[i] == null) continue;
        //console.log("콘서트, " + i + "번째 크롤링");
        if (ConcertJSON[i].data.op_ed_dt != null){
            var dataDate = new Date(ConcertJSON[i].data.op_ed_dt.toString());
        }
        else {
            var dataDate = new Date();
        }
        // 오늘 날짜
        var todayDate = new Date();

        // '0000-00-00' 포맷으로 변환
        dataDate = toStringByFormatting(dataDate);
        todayDate = toStringByFormatting(todayDate);

        if (dataDate >= todayDate) {
            console.log("> 콘서트 (" + i + ") " + dataDate + "는 " + todayDate + "보다 나중임.");

            await crawl(ConcertJSON[i]);
            ConcertJSON[i] = tmpData;
            ConcertRealJSON.push(tmpData);
        }
    }

    ConcertRealJSON = JSON.stringify(ConcertRealJSON);
    fs.writeFileSync('../json/concert_real_json.json', ConcertRealJSON);
    console.log(">>> 콘서트 저장 끝");
}

// 뮤지컬
async function crawlMusical() {
    for (var i = 0; i < Object.keys(MusicalJSON).length; i++) {
        if (MusicalJSON[i] == null) continue;
        //console.log("뮤지컬, " + i + "번째 크롤링");
        if (MusicalJSON[i].data.op_ed_dt != null){
            var dataDate = new Date(MusicalJSON[i].data.op_ed_dt.toString());
        }
        else {
            var dataDate = new Date();
        }
        // 오늘 날짜
        var todayDate = new Date();

        // '0000-00-00' 포맷으로 변환
        dataDate = toStringByFormatting(dataDate);
        todayDate = toStringByFormatting(todayDate);

        if (dataDate >= todayDate) {
            console.log("> 뮤지컬 (" + i + ") " + dataDate + "는 " + todayDate + "보다 나중임.");

            await crawl(MusicalJSON[i]);
            MusicalRealJSON.push(tmpData);
        }
    }

    MusicalRealJSON = JSON.stringify(MusicalRealJSON);
    fs.writeFileSync('../json/musical_real_json.json', MusicalRealJSON);
    console.log(">>> 뮤지컬 저장 끝");
}

// 전시
async function crawlExhibit() {
    for (var i = 0; i < Object.keys(ExhibitJSON).length; i++) {
        if (ExhibitJSON[i] == null) continue;
        //console.log("전시, " + i + "번째 크롤링");
        //console.log(ExhibitJSON[i]);
        if (ExhibitJSON[i].data.op_ed_dt != null){
            var dataDate = new Date(ExhibitJSON[i].data.op_ed_dt.toString());
        }
        else {
            var dataDate = new Date();
        }
        // 오늘 날짜
        var todayDate = new Date();

        // '0000-00-00' 포맷으로 변환
        dataDate = toStringByFormatting(dataDate);
        todayDate = toStringByFormatting(todayDate);

        if (dataDate >= todayDate) {
            console.log("> 전시 (" + i + ") " + dataDate + "는 " + todayDate + "보다 나중임.");

            await crawl(ExhibitJSON[i]);
            ExhibitRealJSON.push(tmpData);
        }
    }

    ExhibitRealJSON = JSON.stringify(ExhibitRealJSON);
    fs.writeFileSync('../json/exhibit_real_json.json', ExhibitRealJSON);
    console.log(">>> 전시 저장 끝");
}

async function callCrawl() {
    // await crawlPlay();
    // await console.log(">>> play 저장 끝");
    // await crawlConcert();
    // await console.log(">>> Concert 저장 끝");
    // await crawlMusical();
    // await console.log(">>> Musical 저장 끝");
    await crawlExhibit();
    await console.log(">>> Exhibit 저장 끝");
}

callCrawl();

module.exports = router;