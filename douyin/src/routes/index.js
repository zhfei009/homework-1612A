var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');

/* GET home page. */
router.get('/icon', function(req, res, next) {
    mongodb.find('douyin', 'icon', function(result) {

        if (result.length > 0) {
            res.send({ code: 1, data: result })
        } else {
            res.send({ code: 0, msg: "数据不存在" })
        }
    })
});
router.get('/list', function(req, res, next) {
    mongodb.find('adam', 'douyin', function(result) {

        if (result.length > 0) {
            res.send({ code: 1, data: result })
        } else {
            res.send({ code: 0, msg: "数据不存在" })
        }
    })
})

module.exports = router;