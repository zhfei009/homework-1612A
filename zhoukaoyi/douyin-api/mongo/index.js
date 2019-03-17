const { MongoClient, ObjectId } = require('mongodb');
const url = "mongodb://localhost:27017";
const curd = {
    db: 'table',
    col: 'b',
    query: {}, //查找的条件
    skip: 0, //分页跳过条数
    limit: 0, //分页取几页
    type: 'find', //增，删，改的类型
    ObjectId: {},
    updateVal: {},
    sort: {}, //条件
    cb: null, //回调函数
    cont: function(opt) {
        Object.assign(curd, opt)
        MongoClient.connect(url, { useNewUrlParser: true }, (err, con) => {
            if (err) {
                curd.cb({ code: 0, msg: '连接数据库失败' });
                return;
            }
            const db = con.db(curd.db)
            const col = db.collection(curd.col)
            curd.work(col)
            con.close();
        })
    },
    //操作数据库
    work: function(col) {
        const fn = function(err, result) {
            if (err) {
                curd.cb({ code: 0, msg: '连接数据库失败' });
                return;
            }
            curd.cb && curd.cb(result)
        };
        if (curd.type === "find") {
            col.find(curd.query).skip(curd.skip).limit(curd.limit).sort(curd.sort).toArray(fn)
        } else if (curd.type.includes('update')) {
            col[curd.type](curd.query, curd.updateVal, fn) //修改
        } else {
            //添加和删除
            col[curd.type](curd.query, fn)
        }
    },
    toObjectId: function(_id) {
        if (_id && typeof _id === "string") {
            return ObjectId(_id)
        }
    }
}
module.exports = curd;