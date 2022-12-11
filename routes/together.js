const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
var bodyParser = require('body-parser')
var router = express.Router();


app.use(bodyParser.json())

const cors = require("cors");
const { application } = require('express');

const registers = [
    {}
]

const options = {useUnifiedTopology: true}; 
// MongoDB 연결
const MongoClient = require('mongodb').MongoClient;

// DB connection URL
// admin, cts1234
// mongodb+srv://디비계정아이디:디비계정패스워드@cluster0-qaxa3.mongodb.net/데이터베이스이름?retryWrites=true&w=majority
var URL = 'mongodb+srv://admin:cts1234@cts.1xmwczv.mongodb.net/?retryWrites=true&w=majority'

// 어떤 데이터베이스에 저장할 것인가?
var db;

// error : 에러 발생 시, 어떤 에러인지 알려줌
MongoClient.connect(URL, function (error, client) {
    // error 출력
    if (error) return console.log(error);

    // BusanCultureMap 이라는 데이터베이스(폴더)에 접근할게요!
    db = client.db('BusanCultureMap');
});

// 제목, 태그(0~3), 내용을 post collention에 저장함
router.post("/upload", function (req, res) {
    var tmpId = req.body.userId;
    var tmpTitle = req.body.title;
    var tmpTag = req.body.tag;
    var tmpContent = req.body.content;

    console.log(req.body);
    db.collection('together').insertOne({ userId: tmpId, title: tmpTitle, tag: tmpTag, content: tmpContent }, function (error, result) {
        console.log('저장 완료');
    });
})


router.get("/", function(req, res) {
    // 모든 데이터 꺼내기
    db.collection('together').find().toArray(function (error, result) {
        // DB에서 데이터를 받아온 후, 'list.ejs' 파일 렌더링
        // 'post'라는 이름으로 result 데이터가 ejs 파일로 들어감
        res.send(result)
    });
})


module.exports = router;
