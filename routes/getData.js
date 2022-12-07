const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
var bodyParser = require('body-parser')
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
var URL = 'mongodb+srv://admin:cts1234@cts.1xmwczv.mongodb.net/?retryWrites=true&w=majority'

var db;

router.get('/play', function (req, res) {
    MongoClient.connect(URL, function (error, client) {
        if (error) return console.log(error);
    
        db = client.db('BusanCultureMap');
        db.collection('play').find().toArray((err, items) => {
            res.send(items);
        });
    });
});

router.get('/concert', function (req, res) {
    MongoClient.connect(URL, function (error, client) {
        if (error) return console.log(error);
    
        db = client.db('BusanCultureMap');
        db.collection('concert').find().toArray((err, items) => {
            res.send(items);
        });
    });
});

router.get('/musical', function (req, res) {
    MongoClient.connect(URL, function (error, client) {
        if (error) return console.log(error);
    
        db = client.db('BusanCultureMap');
        db.collection('musical').find().toArray((err, items) => {
            res.send(items);
        });
    });
});

router.get('/exhibit', function (req, res) {
    MongoClient.connect(URL, function (error, client) {
        if (error) return console.log(error);
    
        db = client.db('BusanCultureMap');
        db.collection('exhibit').find().toArray((err, items) => {
            res.send(items);
        });
    });
});

module.exports = router;
