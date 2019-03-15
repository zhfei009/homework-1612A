var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/list', function(req, res, next) {
    mongodb.find('mryx', 'iconlist', function(result) {
        if (result.length > 0) {
            res.send({ code: 0, data: result })
        } else {
            res.send({ code: 1, msg: "数据不存在" })
        }
    })
})

module.exports = router;