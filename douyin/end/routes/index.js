const express = require('express');
const router = express.Router();
const mongodb=require("mongodb");
const url="mongodb://localhost:27017";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getData', function(req, res, next) {
    mongodb.connect(url,{useNewUrlParser:true},(err,con)=>{
      if(err){
        return res.send({code:0,msg:"error"})
      }

      const db=con.db("tab");
      const collection=db.collection("douyin");
      collection.find().toArray((err,result)=>{
        if(err){
          return res.send({code:0,msg:"error"})
        }
        res.send({code:1,msg:result})
      })
    })
});

module.exports = router;
