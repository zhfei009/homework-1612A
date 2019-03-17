var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");
const dbAddress = "mongodb://localhost:27017";


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/api/list', function(req, res, next) {

    MongoClient.connect(dbAddress, { useNewUrlParser: true }, (err, con) => {
            if (err) {
                return res.send({ code: 0, error: "error" })
            }
            const db = con.db("data");
            const collection = db.collection("list1");
            collection.find().skip(2).limit(5).toArray((err, result) => {
                console.log(result)
                if (err) {
                    return res.send({ code: 0, error: "error" })
                }
                res.send({ code: 1, data: result })
            })
        })
        // res.send("123")
        // res.send("2222")
});
module.exports = router;