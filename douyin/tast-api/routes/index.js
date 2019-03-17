const express = require('express');
const router = express.Router();
const curd = require("../mongo");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/api/list', function(req, res, next) {
    console.log(1)
    curd.connect({
        type: "find",
        dbName: "data",
        colName: "data",
        skip: 0,
        limit: 1,
        cd(rs) {
            console.log(rs)
            res.send({ data: rs });
        }
    })
});
module.exports = router;