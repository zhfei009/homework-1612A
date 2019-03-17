const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://localhost:27017";
const curd = {
    dbName: "xinxi", //数据库的名称
    colName: "xin", //集合的名称
    query: null, //查询条件
    cd: null, //执行的函数
    skip: 0, //开始的下标
    limit: 0, //截取的条数
    sort: null, //排序的方式
    type: "", //使用的方法
    updateVal: {},
    connect: function(opt) {
        Object.assign(curd, opt)
        MongoClient.connect(url, { useNewUrlParser: true }, (err, con) => {
            if (err) {
                return curd.cd({ code: 0, msg: "链接失败" })
            }
            const db = con.db(curd.dbName)
            const col = db.collection(curd.colName);
            curd.work(col) //操作集合
            con.close();
        })
    },
    work: function(col, cd) {
        const fn = function(err, result) {
            if (err) {
                return curd.cd({ code: 0, msg: "链接失败" })
            }
            curd.cd && curd.cd(result)
        }
        if (curd.type === "find") {
            col.find(curd.query).skip(curd.skip).limit(curd.limit).sort(curd.sort).toArray(fn)
        } else if (curd.type.includes("update")) {
            col[curd.type](curd.query, curd.updateVal, fn)
        } else {
            col[curd.type](curd.query, fn)
        }
    },
    tobjectId: function(_id) {
        if (_id && typeof _id === "string") {
            return ObjectId(_id)
        }
    }
}
module.exports = curd;