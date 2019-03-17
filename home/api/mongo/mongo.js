const { MongoClient, ObjectId } = require('mongodb');
const url = "mongodb://localhost:27017";
const curd = {
    cb: null, // 回调
    sort: {},
    skip: 0,
    limit: 0,
    type: 'find',
    query: {}, // 查询的条件
    changeData: {}, // 修改的默认值
    dbName: '1612A',
    collName: 'student',
    connect: function(opt) {
        Object.assign(curd, opt); // 合并对象
        MongoClient.connect(url, { useNewUrlParser: true }, (err, con) => {
            if (err) {
                curd.cb({ code: 0, msg: '连接数据库失败' })
            }
            const db = con.db(curd.dbName); // 链接数据库
            const coll = db.collection(curd.collName); // 链接集合
            curd.work(coll);
            con.close(); // 关闭链接
        })
    },
    work: function(coll) {
        const fn = function(err, result) {
            if (err) {
                return curd.cb({ code: 0, msg: 'error' });
            }
            curd.cb && curd.cb(result);
        };
        if (curd.type === 'find') { // 查找
            coll.find(curd.query).skip(curd.skip).limit(curd.limit).sort(curd.sort).toArray(fn);
        } else if (curd.type.includes('update')) { // 修改
            coll[curd.type](curd.query, curd.changeData, fn);
        } else { // 添加与删除
            coll[curd.type](curd.query, fn);
        }
    },
    toObjectId: function(_id) { // 字符串id转ObjectId
        if (_id && typeof _id === "string") {
            return ObjectId(_id);
        }
    }
}

module.exports = curd;