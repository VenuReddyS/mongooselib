var express = require('express');
var router = express.Router();
var mongoose=require('mongoose')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//find
router.post('/finds',function (req,res,next){
  mongoose.models[req.body.model].find().then((docs)=>{
    res.send(docs)
  }).catch((err)=>{
    res.send(err)
  })
})
//find and filter
router.post('/find',function (req,res,next){
  mongoose.models[req.body.model].find(req.body.filter).then((docs)=>{
    res.send(docs)
  }).catch((err)=>{
    res.send(err)
  })
})
// create
router.post('/create',function (req,res,next){
  mongoose.models[req.body.model].create(req.body.create).then((docs)=>{
    res.send(docs)
  }).catch((err)=>{
    res.send(err)
  })
})
//findbyId
router.post('/findid', function (req, res, next) {
  mongoose.models[req.body.model].findById(req.body).then((docs) => {
    res.send(docs)
  }).catch((err) => {
    res.send(err)
  })
})
//findOne And Update
router.patch('/findupdate',function (req,res,next){
  mongoose.models[req.body.model].findOneAndUpdate(req.body.filter,{$inc:{ count: -1 }}).then((docs)=>{
    res.send(docs)
  }).catch((err)=>{
    res.send(err)
  })
})
//findone and delete
router.patch('/delete',function (req,res,next){
  mongoose.models[req.body.model].findOneAndDelete(req.body.filter).then((docs)=>{
    res.send(docs)
  }).catch((err)=>{
    res.send(err)                           //not completed not working while we taking delete in axios
  })
})
//replace
router.put('/replace',function (req,res,next){
  mongoose.models[req.body.model].findOneAndReplace(req.body.filter,{price:1000}).then((docs)=>{
    res.send(docs)
  }).catch((err)=>{
    res.send(err)
  })
})
//insermany
router.put('/insertmany',function (req,res,next){
  mongoose.models[req.body.model].insertMany(req.body.filter).then((docs)=>{
    res.send(docs)
  }).catch((err)=>{
    res.send(err)
  })
})
// insertOne
router.post('/insertone',function (req,res,next){
  mongoose.models[req.body.model].insertOne(req.body.filter).then((docs)=>{
    res.send(docs)
  }).catch((err)=>{
    res.send(err)
  })
})
//.......................updatemany................................
router.put("/updatemany", function (req, res) {
  mongoose.models[req.body.model].updateMany({}, { $set: { count:5000 ,price:2000} }).then((docs) => {
    console.log(docs)
    res.send(docs)
  }).catch((err) => {
    res.send(err)
  })
})
//...........................updateone..................................
router.patch("/updateOne",function(req,res){
  mongoose.models[req.body.model].updateOne(req.body.filter,{ $set: { bookName:"The" } })
  .then((docs) => {
    console.log(docs)
    res.send(docs)
  }).catch((err) => {
    res.send(err)
  })
})


module.exports = router;