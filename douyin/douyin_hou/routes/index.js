var express = require('express');
var router = express.Router();

const mongo = require('../mongo/mongo.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//查询数据
router.get('/api/getlist', (req, res, next) => { //查询
    mongo.connect({
        cb: (rs) => { //调用
            if (rs) {
                res.send({ code: 1, data: rs })
            } else {
                res.send({ code: 0 });
            }

        }


    });

});


module.exports = router;