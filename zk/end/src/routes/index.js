var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/list', (req, res, next) => {
    mongodb.find('abc', 'douyin', (result) => {
        if (result.length > 0) {
            res.send({ code: 1, data: result })
        } else {
            res.send({ code: 0, msg: '查找失败!' })
        }
    });
});
module.exports = router;