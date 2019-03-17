var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
var batabaseName = 'zk1'
var collcationName = 'user';

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
})


router.post('/app', function(req, res, next) {
    mongo.find(batabaseName, collcationName, {}, function(result) {
        console.log(result)
        if (!result) {
            res.send({ code: 0, mes: "error" })
        } else {
            res.send({ code: 1, mes: "success", data: result });
        }
    }, {
        skip: 0,
        limit: 0
    })
});

module.exports = router;