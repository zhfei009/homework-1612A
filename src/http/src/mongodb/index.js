const { MongoClient, ObjectId } = require('mongodb')
const dbAddress = 'mongodb://localhost:27017'
const crcd = {
    mongodb: "mongodb",
    listdata: "listdata",
    query: {}, //查询条件
    skip: 0,
    limit: 0,
    sort: {},
    cd: null,
    type: "find",
    updata: {},
    connect: function(opt) { //关联数据库
        //合并
        Object.assign(crcd, opt)
            //关联数据库
        MongoClient.connect(dbAddress, { useNewUrlParser: true }, (err, con) => {
            //判断是否有错
            if (err) {
                return res.send({ code: 0, msg: "关联数据库失败" })
            }
            //成功了,打开数据库,找集合
            const db = con.db(crcd.mongodb)
            const col = db.collection(crcd.listdata)
                //操作集合
            crcd.show(col)
                //关闭数据库
            con.close()
        })
    },

    //操作集合
    show: function(col) {
        if (crcd.type == "find") {
            col.find(crcd.query).skip(crcd.skip).limit(crcd.limit).sort(crcd.sort).toArray((err, result) => {
                if (err) {
                    //调用cd
                    crcd.cd({ code: 0, msg: "error" })
                }
                if (result) {
                    console.log(888888)
                    crcd.cd({ code: 1, msg: 'success', data: result })
                } else {
                    crcd.cd({
                        code: 0,
                        msg: "没有找到数据",
                        data: result
                    })
                }
            })
        } else if (crcd.type.includes("insert")) {
            col[crcd.type](crcd.query, (err, result) => {
                if (err) {
                    //调用cd
                    crcd.cd({ code: 0, msg: "error" })
                }
                if (result) {
                    crcd.cd({ code: 1, msg: 'success', data: result.ops })
                } else {
                    crcd.cd({ code: 0, msg: "error" })
                }
            })

        } else if (crcd.type.includes('update')) {
            col[crcd.type](crcd.query, crcd.updata, (err, result) => {
                if (err) {
                    //调用cd
                    crcd.cd({ code: 0, msg: "error" })
                }
                if (result) {
                    crcd.cd(result)
                } else {
                    crcd.cd({ code: 0, msg: "error" })
                }
            })
        } else {
            col[crcd.type](crcd.query, (err, result) => {
                if (err) {
                    //调用cd
                    crcd.cd({ code: 0, msg: "id错误" })
                }
                if (result) {
                    crcd.cd(result)
                } else {
                    crcd.cd({ code: 0, msg: "error" })
                }
            })
        }

    },
    //将id字符串转成objectId()
    toObjectId: function(_id) {
        if (_id && typeof _id === "string") {
            return ObjectId(_id)
        }
    }
}
module.exports = crcd;