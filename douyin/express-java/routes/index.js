const express = require('express');
const router = express.Router();
// const { MongoClient, ObjectId } = require('mongodb');
const dbAddress = 'mongodb://localhost:27017';
const curd = require('../mongo');
// const img = require('../public/images')
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/getdata', (req, res, next) => {
    curd.connect({
        dbname: 'base',
        collectionName: 'douyin',
        type: 'find',
        skip: 0,
        limit: 3,
        callback: (rs) => {
            if (rs.length) {
                res.send(JSON.stringify({ code: 1, data: rs }))
            } else {
                res.send({ code: 0, data: [] })
            }
        },
        // skip:
    })
})
module.exports = router;