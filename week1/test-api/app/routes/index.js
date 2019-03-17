var express = require('express');
var router = express.Router();
const curd = require('../mongo');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/list', function(req, res, next) {
    let { page } = req.query;
    console.log(req.url);
    curd.connect({
        type: 'find',
        dbName: 'test',
        collName: 'week1',
        skip: page * 1,
        limit: 3,
        cb: function(rs) {
            res.send(rs);
        }
    })
});
module.exports = router;