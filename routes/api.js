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
var axios = require('axios');
const { xml } = require('cheerio');

var config = {
  method: 'get',
  url: 'http://apis.data.go.kr/6260000/BusanCulturePlayDetailService/getBusanCulturePlayDetail?serviceKey=g4PpueQjaKzayfFQRksvGpJ0jDZ%2BGGmRxzFDMU1o80hY8ObYPgFLuyZDB8iKnGoMh5PSeVLp2tp1lToKexwCjQ%3D%3D',
  headers: { }
};

axios(config)
.then(function (response) {
  var xmlToJson = convert.xml2json(response.data, {compact: true, spaces: 4});
  //var tmp = xmlToJson[0]
  xmlToJson = JSON.parse(xmlToJson)
  console.log(xmlToJson.response.body.items.item[1])
  const data = {
    category:'연극',
    url:xmlToJson.response.body.items.item.dabom_url._text,
    data:{
      title:xmlToJson.response.body.items.item.title._text,
      op_st_dt:xmlToJson.response.body.items.item.op_st_dt._text,
      op_ed_dt:xmlToJson.response.body.items.item.op_ed_dt._text,
      showtime:xmlToJson.response.body.items.item.showtime._text,
      price:xmlToJson.response.body.items.item.price._text
    }
  }
  
  console.log(data)

})
.catch(function (error) {
  console.log(error);
});




// DB connection URL
// admin, cts1234
// mongodb+srv://디비계정아이디:디비계정패스워드@cluster0-qaxa3.mongodb.net/데이터베이스이름?retryWrites=true&w=majority
var URL = 'mongodb+srv://admin:cts1234@cts.1xmwczv.mongodb.net/?retryWrites=true&w=majority'

// 어떤 데이터베이스에 저장할 것인가?
var db;

// 8080 port에 서버를 띄우자!
app.listen(3000, function () {
    // 서버가 열렸을 때 할 일
    console.log('listening on 3000');
});

// error : 에러 발생 시, 어떤 에러인지 알려줌
MongoClient.connect(URL, function (error, client) {
    // error 출력
    if (error) return console.log(error);
    // BusanCultureMap 이라는 데이터베이스(폴더)에 접근할게요!
    db = client.db('BusanCultureMap');
});

console.log("api");

module.exports = router;