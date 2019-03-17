var express = require('express');
var router = express.Router();
const coud = require('../mongo/index.js')
    /* GET home page. */
router.get('/get', function(req, res, next) {
    // let page = req.body.page
    // if (!page) {
    //     return res.send({ code: 1, msg: '信息不完整' })
    // }
    coud.connect({
        cb: function(re) {
            if (re.length) {
                res.send({ code: 0, data: re });
            } else {
                res.send({ code: 1, msg: '没有信息' });
            }
        },
        // skip: 0,
        // limit: 1
    });
});

module.exports = router;