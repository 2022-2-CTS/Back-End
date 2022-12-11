const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
var bodyParser = require('body-parser')
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
var URL = 'mongodb+srv://admin:cts1234@cts.1xmwczv.mongodb.net/?retryWrites=true&w=majority'

const fs = require('fs');

var PlayLocationJSON = fs.readFileSync('./json/play_location_json.json');
var ConcertLocationJSON = fs.readFileSync('./json/concert_location_json.json');
var MusicalLocationJSON = fs.readFileSync('./json/musical_location_json.json');
var ExhibitLocationJSON = fs.readFileSync('./json/exhibit_location_json.json');

var db;

router.get('/play', function (req, res) {
    MongoClient.connect(URL, function (error, client) {
        if (error) {
            console.log("error1");
            res.send(PlayLocationJSON);
            return;
        }
    
        db = client.db('BusanCultureMap');
        db.collection('play').find().toArray((err, items) => {
            res.send(items);
            fs.writeFileSync('./json/play_location_json.json', JSON.stringify(items));
        });
    });
});

router.get('/concert', function (req, res) {
    MongoClient.connect(URL, function (error, client) {
        if (error) {
            console.log("error2");
            res.send(ConcertLocationJSON);
            return;
        }
    
        db = client.db('BusanCultureMap');
        db.collection('concert').find().toArray((err, items) => {
            res.send(items);
            fs.writeFileSync('./json/concert_location_json.json', JSON.stringify(items));
        });
    });
});

router.get('/musical', function (req, res) {
    MongoClient.connect(URL, function (error, client) {
        if (error) {
            console.log("error3");
            res.send(MusicalLocationJSON);
            return;
        }
    
        db = client.db('BusanCultureMap');
        db.collection('musical').find().toArray((err, items) => {
            res.send(items);
            fs.writeFileSync('./json/musical_location_json.json', JSON.stringify(items));
        });
    });
});

// 디비 접근 에러 나면, 현재 파일로 보유중인 json을 보내주면 되지 않을까
router.get('/exhibit', function (req, res) {
    MongoClient.connect(URL, function (error, client) {
        if (error) {
            console.log("error4");
            res.send(ExhibitLocationJSON);
            return;
        }
    
        db = client.db('BusanCultureMap');
        db.collection('exhibit').find().toArray((err, items) => {
            res.send(items);
            fs.writeFileSync('./json/exhibit_location_json.json', JSON.stringify(items));
        });
    });
});

module.exports = router;
