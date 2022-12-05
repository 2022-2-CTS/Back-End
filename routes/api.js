const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
var bodyParser = require('body-parser')
var router = express.Router();

app.use(bodyParser.json())

const cors = require("cors");
const { application } = require('express');

// const options = {useUnifiedTopology: true}; 
// MongoDB 연결
const MongoClient = require('mongodb').MongoClient;

const convert = require('xml-js');
const request = require('request');
//부산 공공 데이터 포털
//연극
const Playdata = [];
const Concertdata = [];
const Musicaldata = [];
const Exhibitdata = [];
var axios = require('axios');
const { xml } = require('cheerio');
const key='g4PpueQjaKzayfFQRksvGpJ0jDZ%2BGGmRxzFDMU1o80hY8ObYPgFLuyZDB8iKnGoMh5PSeVLp2tp1lToKexwCjQ%3D%3D'
var listP;
var listC;
var listM;
var listE;
//연극 데이터
//total받기
async function getPlay(){
  console.log("gettotal")
  var config = {
    method: 'get',
    url: 'http://apis.data.go.kr/6260000/BusanCulturePlayDetailService/getBusanCulturePlayDetail?serviceKey='+key,
    headers: {}
  };
  axios(config)
  .then(await function (response) {
    var xmlToJson = convert.xml2json(response.data, { compact: true, spaces: 4 });
    xmlToJson = JSON.parse(xmlToJson)
    listP = Number(xmlToJson.response.body.totalCount._text);
}).then(await function(){
  getplaydata()
})
}
async function getplaydata(){
  await console.log("getset")
  var config = {
    method: 'get',
    url: 'http://apis.data.go.kr/6260000/BusanCulturePlayDetailService/getBusanCulturePlayDetail?serviceKey='+key+'&numOfRows='+listP,
    headers: {}
  };
  axios(config)
  .then( await function (response) {
    var xmlToJson = convert.xml2json(response.data, { compact: true, spaces: 4 });
    //var tmp = xmlToJson[0]
    xmlToJson = JSON.parse(xmlToJson)
    for (var i = 0; i < listP; i++) {
      const tmpData = {
        category: '연극',
        url: xmlToJson.response.body.items.item[i].dabom_url._text,
        data: {
          title: xmlToJson.response.body.items.item[i].title._text,
          op_st_dt: xmlToJson.response.body.items.item[i].op_st_dt._text,
          op_ed_dt: xmlToJson.response.body.items.item[i].op_ed_dt._text,
          showtime: xmlToJson.response.body.items.item[i].showtime._text,
          price: xmlToJson.response.body.items.item[i].price._text
        }
      }
      Playdata.push(tmpData);
    }
    console.log(Playdata,"데이터")
  })

}
// getPlay()

//콘서트
async function getConcert(){
  console.log("gettotal")
  var config = {
    method: 'get',
    url: 'http://apis.data.go.kr/6260000/BusanCultureConcertDetailService/getBusanCultureConcertDetail?serviceKey='+key,
    headers: {}
  };
  axios(config)
  .then(await function (response) {
    var xmlToJson = convert.xml2json(response.data, { compact: true, spaces: 4 });
    xmlToJson = JSON.parse(xmlToJson)
    listC = Number(xmlToJson.response.body.totalCount._text);
}).then(await function(){
  getConcertdata()
})
}
async function getConcertdata(){
  var config = {
    method: 'get',
    url: 'http://apis.data.go.kr/6260000/BusanCultureConcertDetailService/getBusanCultureConcertDetail?serviceKey='+key+'&numOfRows='+listC,
    headers: {}
  };
  axios(config)
  .then( await function (response) {
    var xmlToJson = convert.xml2json(response.data, { compact: true, spaces: 4 });
    //var tmp = xmlToJson[0]
    xmlToJson = JSON.parse(xmlToJson)
    for (var i = 0; i < listC; i++) {
      const tmpData = {
        category: '콘서트',
        url: xmlToJson.response.body.items.item[i].dabom_url._text,
        data: {
          title: xmlToJson.response.body.items.item[i].title._text,
          op_st_dt: xmlToJson.response.body.items.item[i].op_st_dt._text,
          op_ed_dt: xmlToJson.response.body.items.item[i].op_ed_dt._text,
          showtime: xmlToJson.response.body.items.item[i].showtime._text,
          price: xmlToJson.response.body.items.item[i].price._text
        }
      }
      Concertdata.push(tmpData);
    }
    console.log(Concertdata,"데이터")
  })

}
// getConcert()
  
async function getExhibit(){
  console.log("gettotal")
  var config = {
    method: 'get',
    url: 'http://apis.data.go.kr/6260000/BusanCultureExhibitDetailService/getBusanCultureExhibitDetail?serviceKey='+key,
    headers: {}
  };
  axios(config)
  .then(await function (response) {
    var xmlToJson = convert.xml2json(response.data, { compact: true, spaces: 4 });
    xmlToJson = JSON.parse(xmlToJson)
    listE = Number(xmlToJson.response.body.totalCount._text);
}).then(await function(){
  getExhibitdata()
})
}
async function getExhibitdata(){
  var config = {
    method: 'get',
    url: 'http://apis.data.go.kr/6260000/BusanCultureExhibitDetailService/getBusanCultureExhibitDetail?serviceKey='+key+'&numOfRows='+listE,
    headers: {}
  };
  axios(config)
  .then( await function (response) {
    var xmlToJson = convert.xml2json(response.data, { compact: true, spaces: 4 });
    //var tmp = xmlToJson[0]
    xmlToJson = JSON.parse(xmlToJson)
    for (var i = 0; i < listE; i++) {
      const tmpData = {
        category: '전시',
        url: xmlToJson.response.body.items.item[i].dabom_url._text,
        data: {
          title: xmlToJson.response.body.items.item[i].title._text,
          op_st_dt: xmlToJson.response.body.items.item[i].op_st_dt._text,
          op_ed_dt: xmlToJson.response.body.items.item[i].op_ed_dt._text,
          showtime: xmlToJson.response.body.items.item[i].showtime._text,
          price: xmlToJson.response.body.items.item[i].price._text
        }
      }
      Exhibitdata.push(tmpData);
    }
    console.log(Exhibitdata,"데이터")
  })

}
getExhibit()


  


// DB connection URL
// admin, cts1234
// mongodb+srv://디비계정아이디:디비계정패스워드@cluster0-qaxa3.mongodb.net/데이터베이스이름?retryWrites=true&w=majority
var URL = 'mongodb+srv://admin:cts1234@cts.1xmwczv.mongodb.net/?retryWrites=true&w=majority'

// 어떤 데이터베이스에 저장할 것인가?
var db;

router.get('/play',function(get,res){
  res.send(Playdata);
  // console.log(Playdata)
});
// router.get('/concert',function(get,res){
//   res.send(Concertdata);
// });
// router.get('/musical',function(get,res){
//   res.send(Musicaldata);
// });
// router.get('/exhibit',function(get,res){
//   res.send(Exhibitdata);
// });

// error : 에러 발생 시, 어떤 에러인지 알려줌
MongoClient.connect(URL, function (error, client) {
  // error 출력
  if (error) return console.log(error);
  // BusanCultureMap 이라는 데이터베이스(폴더)에 접근할게요!
  db = client.db('BusanCultureMap');
});

console.log("api");

module.exports = router;