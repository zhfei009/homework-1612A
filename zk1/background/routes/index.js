var express = require('express');
var router = express.Router();
const mongoo = require("../mongo/mongo.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/app/findInfo', function(req, res, next) {
    // let { page } = req.query;
    // if (!page) {
    //     return res.send({ code: 2, msg: "参数不完整" });
    // }
    //调用 关联数据库 方法
    mongoo.next({
        destKu: "douyin",
        destHe: "yin",
        cb: (rs) => {
                if (rs.length) {
                    res.send({ code: 1, data: rs })
                } else {
                    res.send({ code: 0, msg: "没有查到相关信息" })
                };
            }
            //传参
            //query:{
            //     name:"zx"
            // },
            // skip: (1 - 1) * 1, //跳过1页
            // limit: 1, //每页3条数据
            // sort: {
            //     age: -1 //排序  降序
            // }
    });
});

module.exports = router;