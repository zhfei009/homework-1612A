//操作数据库
const { MongoClient, ObjectId } = require('mongodb'); //mongodb客户端对象
const url = 'mongodb://localhost:27017'; //数据库默认地址

const mongo = {
    dbBase: 'test', //数据库
    dbColl: 'douyin', //集合
    cb: null,
    query: {}, //查询条件
    skip: 0, //跳过几条数据，（起始位置）
    limit: 0, //获得几条数据
    sort: {}, //排序条件
    connect: (opt) => { //关联数据库
        Object.assign(mongo, opt); //合并对象，后设的覆盖先设的

        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                mongo.cb({ code: 1, mes: "数据库连接失败" });
                return; //抛错
            }
            const db = client.db(mongo.dbBase); //打开数据库
            const coll = db.collection(mongo.dbColl); //找到集合
            mongo.work(coll, opt); //操作任务
            client.close(); //关闭数据库
        });
    },
    work: (coll, opt) => {
        //查找集合
        coll.find(mongo.query).skip(mongo.skip).limit(mongo.limit).sort(mongo.sort).toArray((err, result) => {
            if (err) {
                mongo.cb({ code: 1, mes: 'error' });
                return; //抛错
            }
            mongo.cb && mongo.cb(result); //对任务成功与否的反馈
        });
    }
}

module.exports = mongo;