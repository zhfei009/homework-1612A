var express = require('express');
var router = express.Router();
const crcd = require('../mongodb')
router.get('/api/find', function(req, res, next) {
    crcd.connect({
            cd: function(rs) {
                res.send(rs)
            },
            type: "find",
        })
        // console.log(req.url)
        // res.send("666")
});

module.exports = router;