const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

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

    // post 라는 컬렉션(파일)에 데이터를 저장할게요!
    // 데이터 -> object 자료형으로 저장해야함
    db.collection('post').insertOne({name: "Miseon", age: 20}, function(error, result){
        console.log('저장 완료');
    });
    

    // 8080 port에 서버를 띄우자!
    app.listen(8080, function () {
        // 서버가 열렸을 때 할 일
        console.log('listening on 8080');
    });
});