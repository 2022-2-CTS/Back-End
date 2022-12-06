const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
var bodyParser = require('body-parser')
var router = express.Router();

// MongoDB 연결
const MongoClient = require('mongodb').MongoClient;

var URL = 'mongodb+srv://admin:cts1234@cts.1xmwczv.mongodb.net/?retryWrites=true&w=majority'

// 어떤 데이터베이스에 저장할 것인가?
var db;

var playJSON;
var concertJSON;
var musicalJSON;
var exhibitJSON;

// error : 에러 발생 시, 어떤 에러인지 알려줌
MongoClient.connect(URL, function (error, client) {
    // error 출력
    if (error) return console.log(error);

    // BusanCultureMap 이라는 데이터베이스(폴더)에 접근할게요!
    db = client.db('BusanCultureMap');

    db.collection('play').find().toArray((err, items) => {
        // 장소 저장 array
        var locationArray = [];

        for (var i = 0; i < Object.keys(items).length; i++) {
            // 모든 데이터를 돌면서,
            // 장소 array에 존재하지 않는 장소를 가진 데이터라면
            // 장소 array에 추가한다.
            tmpLocation = items[i].data.location;
            //console.log(tmpLocation);
            if (locationArray.indexOf(tmpLocation) != -1) {
                continue;
            }
            // 장소 array에 존재하는 장소를 가진 데이터라면
            // continue한다.
            else {
                locationArray.push(tmpLocation);
            }
        }

        var locationJSON = [];

        for (var i = 0; i < locationArray.length; i++) {
            var tmpObj = { };
            tmpObj[i] = [];
            locationJSON.push(tmpObj);
        }

        for (var i = 0; i < Object.keys(items).length; i++) {
            tmpLocation = items[i].data.location;
            locationJSON[locationArray.indexOf(tmpLocation)][locationArray.indexOf(tmpLocation)].push(items[i]);
        }

        console.log(locationJSON);
        playJSON = locationJSON;
        //console.log(Object.keys(locationJSON).length);

        /*
        json 데이터 출력
        for (var i = 0; i < Object.keys(locationJSON).length; i++) {
            //console.log(locationJSON);
            //console.log(i + " : " + locationJSON[i][i])
            for (var j = 0; j < Object.keys(locationJSON[i][i]).length; j++) {
                console.log(locationJSON[i][i][j].data.location);
            }
        }
        */

        db.collection('play').deleteMany({});
        db.collection('play').insertMany(playJSON);
    });
    
    db.collection('concert').find().toArray((err, items) => {
        // 장소 저장 array
        var locationArray = [];

        for (var i = 0; i < Object.keys(items).length; i++) {
            // 모든 데이터를 돌면서,
            // 장소 array에 존재하지 않는 장소를 가진 데이터라면
            // 장소 array에 추가한다.
            tmpLocation = items[i].data.location;
            //console.log(tmpLocation);
            if (locationArray.indexOf(tmpLocation) != -1) {
                continue;
            }
            // 장소 array에 존재하는 장소를 가진 데이터라면
            // continue한다.
            else {
                locationArray.push(tmpLocation);
            }
        }

        var locationJSON = [];

        for (var i = 0; i < locationArray.length; i++) {
            var tmpObj = { };
            tmpObj[i] = [];
            locationJSON.push(tmpObj);
        }

        for (var i = 0; i < Object.keys(items).length; i++) {
            tmpLocation = items[i].data.location;
            locationJSON[locationArray.indexOf(tmpLocation)][locationArray.indexOf(tmpLocation)].push(items[i]);
        }

        console.log(locationJSON);
        concertJSON = locationJSON;
        
        db.collection('concert').deleteMany({});
        db.collection('concert').insertMany(concertJSON);
    });


    db.collection('musical').find().toArray((err, items) => {
        // 장소 저장 array
        var locationArray = [];

        for (var i = 0; i < Object.keys(items).length; i++) {
            // 모든 데이터를 돌면서,
            // 장소 array에 존재하지 않는 장소를 가진 데이터라면
            // 장소 array에 추가한다.
            tmpLocation = items[i].data.location;
            //console.log(tmpLocation);
            if (locationArray.indexOf(tmpLocation) != -1) {
                continue;
            }
            // 장소 array에 존재하는 장소를 가진 데이터라면
            // continue한다.
            else {
                locationArray.push(tmpLocation);
            }
        }

        var locationJSON = [];

        for (var i = 0; i < locationArray.length; i++) {
            var tmpObj = { };
            tmpObj[i] = [];
            locationJSON.push(tmpObj);
        }

        for (var i = 0; i < Object.keys(items).length; i++) {
            tmpLocation = items[i].data.location;
            locationJSON[locationArray.indexOf(tmpLocation)][locationArray.indexOf(tmpLocation)].push(items[i]);
        }

        console.log(locationJSON);
        musicalJSON = locationJSON;

        db.collection('musical').deleteMany({});
        db.collection('musical').insertMany(musicalJSON);
    });


    db.collection('exhibit').find().toArray((err, items) => {
        // 장소 저장 array
        var locationArray = [];

        for (var i = 0; i < Object.keys(items).length; i++) {
            // 모든 데이터를 돌면서,
            // 장소 array에 존재하지 않는 장소를 가진 데이터라면
            // 장소 array에 추가한다.
            tmpLocation = items[i].data.location;
            //console.log(tmpLocation);
            if (locationArray.indexOf(tmpLocation) != -1) {
                continue;
            }
            // 장소 array에 존재하는 장소를 가진 데이터라면
            // continue한다.
            else {
                locationArray.push(tmpLocation);
            }
        }

        var locationJSON = [];

        for (var i = 0; i < locationArray.length; i++) {
            var tmpObj = { };
            tmpObj[i] = [];
            locationJSON.push(tmpObj);
        }

        for (var i = 0; i < Object.keys(items).length; i++) {
            tmpLocation = items[i].data.location;
            locationJSON[locationArray.indexOf(tmpLocation)][locationArray.indexOf(tmpLocation)].push(items[i]);
        }

        console.log(locationJSON);
        exhibitJSON = locationJSON;

        db.collection('exhibit').deleteMany({});
        db.collection('exhibit').insertMany(exhibitJSON);
    });

});