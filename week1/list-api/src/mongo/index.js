const { MongoClient, ObjectId } = require('mongodb')
const url = 'mongodb://localhost:27017';
const coud = {
    dbName: '1612A',
    collName: 'xuesheng',
    query: {},
    type: 'find',
    cb: null,
    update: {},
    limit: 0,
    skip: 0,
    connect: function(opt) {
        Object.assign(coud, opt)
            //打开数据库
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                coud.cb({ code: 0, msg: "数据库请求失败" });
                return;
            }

            const db = client.db(coud.dbName);
            const coll = db.collection(coud.collName);
            //操作集合
            coud.work(coll)
                //关闭数据库
            client.close()
        })
    },
    //操作数据库cls
    work: function(coll, cb) {
        const fn = function(err, result) {
            if (err) {
                coud.cb({ code: 0, msg: "失败" });
                return
            }
            coud.cb && coud.cb(result)
        }
        if (coud.type === 'find') {
            // coll.find(coud.query).skip(coud.skip).limit(coud.limit).toArray((fn));
            coll[coud.type](coud.query).toArray(fn);
        } else if (coud.type.includes('update')) {
            coll[coud.type](coud.query, coud.update, fn);
        } else {
            coll[coud.type](coud.query, fn);
        }
    },
    toObject: function(_id) {
        if (_id && typeof _id === 'string') {
            return ObjectId(_id)
        }
    }
}

module.exports = coud;