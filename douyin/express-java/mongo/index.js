// const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const dbAddress = 'mongodb://localhost:27017';
const mongo = {
    dbname: 'base',
    collectionName: 'student',
    skip: 0,
    limit: 0,
    sort: {},
    condition: {}, //查询条件
    callback: null,
    type: '',
    updataVal: {},
    toObjectId: (_id) => {
        if (_id && typeof _id === 'string') {
            return ObjectId(_id);
        }
    },
    connect: (opt) => {
        //合并
        Object.assign(mongo, opt);
        MongoClient.connect(dbAddress, { useNewUrlParser: true }, (err, con) => {
            if (err) {
                mongo.callback && mongo.callback(err);
            }
            // mongo.dbname.ensureIndex({ "id": 1 }, { unique: true, dropDups: true })
            const db = con.db(mongo.dbname);

            const collection = db.collection(mongo.collectionName);
            mongo.operation(collection);
            con.close()

        })
    },
    operation: (col) => {
        const fn = (err, result) => {
                if (err) {
                    console.log(9999)
                    mongo.callback && mongo.callback({ code: 0, msg: "error" })
                }
                mongo.callback && mongo.callback(result)
            }
            // console.log(fn)
        if (mongo.type === 'find') {
            col.find(mongo.condition).skip(mongo.skip).limit(mongo.limit).sort(mongo.sort).toArray(fn)
        } else if (mongo.type.includes('update')) {
            console.log(mongo.updataVal)
            col[mongo.type](mongo.condition, mongo.updataVal, fn)
        } else {
            col[mongo.type](mongo.condition, fn)
        }
    }
}
module.exports = mongo