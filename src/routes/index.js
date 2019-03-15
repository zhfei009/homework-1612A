var express = require('express');
var router = express.Router();

const mongo = require('../mongo/mongo.js'); //调用方法

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//查询数据
router.get('/api/getlist', (req, res, next) => { //查询
    mongo.connect({
        cb: (rs) => { //调用
            res.send(rs);
        },
        skip: 2,
        limit: 2,
        sort: { age: 1 }

    });

});

//添加接口
router.post('/api/addlist', (req, res, next) => {
    let { user, ID_card } = req.body; //获得所需值

    if (!user || !ID_card) { //拦截判断
        res.send({ code: 2, mes: "信息不完整" });
    }
    mongo.connect({
        cb: (rs) => { //调用
            res.send(rs);
        },
        query: req.body,
        type: 'insertOne'


    });
});

//删除接口
router.get('/api/dellist', (req, res, next) => {
    let { _id, name } = req.query; //获得所需值

    if (!_id) { //拦截判断
        res.send({ code: 2, mes: "信息不完整" });
    }

    // if (name) { //拦截判断
    //     res.send({ code: 2, mes: "信息不完整" });
    // }
    mongo.connect({
        cb: (rs) => { //调用
            res.send(rs);
        },
        query: { _id: mongo.toObjectId(_id) },
        // query: { name: 'zd' },
        type: 'deleteMany'

    });
});

//更新接口
router.post('/api/updatalist', (req, res, next) => {
    let { user, ID_card, _id } = req.body; //获得所需值

    if (!user || !ID_card || !_id) { //拦截判断
        res.send({ code: 2, mes: "信息不完整" });
    }
    delete req.body._id;
    mongo.connect({
        cb: (rs) => { //调用
            res.send(rs);
        },
        query: { _id: mongo.toObjectId(_id) },
        type: 'updateOne',
        updataVal: { $set: req.body }


    });
});

module.exports = router;