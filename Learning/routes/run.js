let express=require('express')
let router=express.Router();
router.get('/',(req,res)=>{
    res.json('hellow....')
})
router.post('/',(req,res)=>{
    res.send(req.body)
})
router.post('/',(req,res)=>{
    console.log('hellow')
    res.send()
})
module.exports=router