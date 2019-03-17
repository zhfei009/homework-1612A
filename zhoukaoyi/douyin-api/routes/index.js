var express = require('express');
var router = express.Router();
const curd = require('../mongo');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
//查找排序分页
router.get('/api/list', function(req, res, next) {
    // res.send('hellow')

    curd.cont({ //传入的参数
        cb: (rs) => {
            console.log(rs.length)
            if (!rs.length) {
                res.send({ code: 0, msg: '没有找到相关数据' })
            } else {
                res.send({ code: 1, data: rs })
            }
        },
        type: 'find',
        query: {
            imgs: "douyinbanner.png"
        }
    });
});

module.exports = router;