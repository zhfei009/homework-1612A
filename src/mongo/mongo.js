//操作数据库
const { MongoClient, ObjectId } = require('mongodb'); //mongodb客户端对象
const url = 'mongodb://localhost:27017'; //数据库默认地址
let dbBase = 'test'; //数据库
let dbColl = 'obj'; //集合

const mongo = {
    cb: null,
    query: {}, //查询条件
    skip: 0, //跳过几条数据，（起始位置）
    limit: 0, //获得几条数据
    sort: {}, //排序条件
    type: '',
    toObjectId: {},
    updataVal: {},
    connect: (opt) => { //关联数据库
        Object.assign(mongo, opt); //合并对象，后设的覆盖先设的

        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                mongo.cb({ code: 1, mes: "数据库连接失败" });
                return; //抛错
            }

            const db = client.db(dbBase); //打开数据库
            const coll = db.collection(dbColl); //找到集合

            mongo.work(coll, opt);

            client.close(); //关闭数据库
        });

    },
    work: (coll, opt) => {
        if (mongo.type === 'find') {
            //查找集合
            coll.find(mongo.query).skip(mongo.skip).limit(mongo.limit).sort(mongo.sort).toArray((err, result) => {
                if (err) {
                    mongo.cb({ code: 1, mes: 'error' });
                    return; //抛错
                }

                if (result) {
                    mongo.cb({ code: 0, data: result, mes: '查询成功' });
                } else {
                    mongo.cb({ code: 1, mes: '查询失败' });
                }
            });
        } else if (mongo.type.includes('insert')) {
            coll[mongo.type](mongo.query, (err, result) => {
                if (err) {
                    mongo.cb({ code: 1, mes: 'error' });
                    return; //抛错
                }

                if (result) {
                    mongo.cb({ code: 0, mes: '添加成功' });
                } else {
                    mongo.cb({ code: 1, mes: '添加失败' });
                }
            });
        } else if (mongo.type.includes('delete')) {
            coll[mongo.type](mongo.query, (err, result) => {
                if (err) {
                    mongo.cb({ code: 1, mes: 'error' });
                    return; //抛错
                }
                // console.log(result)
                if (result.result.n) {
                    mongo.cb({ code: 0, mes: '删除成功' });
                } else {
                    mongo.cb({ code: 1, mes: '删除失败' });
                }
            });
        } else {
            coll[mongo.type](mongo.query, mongo.updataVal, (err, result) => {
                if (err) {
                    mongo.cb({ code: 1, mes: 'error' });
                    return; //抛错
                }

                if (result) {
                    mongo.cb({ code: 0, mes: '修改成功', data: result });
                } else {
                    mongo.cb({ code: 1, mes: '修改失败' });
                }
            });
        }



    },
    toObjectId: (_id) => {
        if (_id && typeof _id === "string") {
            // console.log(ObjectId('5c6f551aaed8bb1f842d126d'))
            return ObjectId(_id);
        }
    }

}

module.exports = mongo;