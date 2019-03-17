var express = require('express');
var router = express.Router();
const mongodb = require('mongodb-curd');
const bdBase = 'data';
const dbCol = 'list';

/* GET home page. */
router.get('/api/list', function(req, res, next) {
  mongodb.find(bdBase,dbCol,(result)=>{
     res.send({code:0,data:result});
  })
});

module.exports = router;
