const mongodb = require("mongodb");
const MongoC = mongodb.MongoClient;
const address = "mongodb://localhost:27017";
const ObjectId = mongodb.ObjectId;
const mongo = {
    destKu: "list", //默认数据库
    destHe: "tst", //默认集合
    query: {}, //查询条件
    updateVal: {}, //删除的默认值
    skip: 0, //跳过几页  （默认0）
    limit: 0, //几条数据每页  （默认0）
    sort: {}, //排序
    type: "find", //属性的类型
    cb: null,
    next: (opt) => {
        //合并  对象
        Object.assign(mongo, opt);
        //关联数据库
        MongoC.connect(address, { useNewUrlParser: true }, (err, con) => {
            //判断 错
            if (err) {
                return mongo.cb({ code: 2, msg: "连接数据库失败" });
            }
            //成功
            //连接数据库
            const db = con.db(mongo.destKu);
            const clients = db.collection(mongo.destHe);
            //操作集合
            //  调用操作集合的方法
            mongo.work(clients);
            //关闭数据库
            con.close();
        });
    },
    //操作集合
    work: (coll) => {
        //回调信息
        const fn = (err, result) => {
            if (err) {
                return mongo.cb({ code: 0, msg: "error" })
            }
            mongo.cb && mongo.cb(result);
        };
        //判断 属性的类型
        if (mongo.type === "find") { //查找集合
            //查找集合
            coll.find(mongo.query).skip(mongo.skip).limit(mongo.limit).sort(mongo.sort).toArray(fn);
        } else if (mongo.type.includes("update")) {
            coll[mongo.type](mongo.query, mongo.updateVal, fn);
        } else {
            coll[mongo.type](mongo.query, fn);
        }
    },
    //将id字符串转换objectID格式
    toObject: (_id) => {
        //判断_id 是否 是字符串 并且有值
        if (_id && typeof(_id) === "string") {
            //转换格式 
            return ObjectId(_id);
        }
    }
}
module.exports = mongo;