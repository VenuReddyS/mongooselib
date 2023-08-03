const mongoose=require('mongoose')
const shortid=require('short-unique-id')
const productSchema=new mongoose.Schema({
   
ProductName:{
    type:String,
    required:true,
    trim:true,
},
productId:{
    type: String,
    default: new shortid().stamp(10)
},
Brand:{
    type:String,
    required:true,
    trim:true,
},
category:{
    type:String,
    required:true,
    trim:true,
},
price:{
    type:Number,
    require:true,
},
quantity:{
    type:Number,
    require:true
}
})
module.exports=mongoose.model('Books',productSchema)