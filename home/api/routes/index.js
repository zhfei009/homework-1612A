var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
const dbBase = 'H5';
const dbCall = 'douyin';
/* GET home page. */
router.get('/getData', function(req, res, next) {
    mongodb.find(dbBase, dbCall, function(result) {
        res.send({ code: 1, data: result })
    })
});

module.exports = router;