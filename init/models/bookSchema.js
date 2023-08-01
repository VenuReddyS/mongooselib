const mongoose=require('mongoose')
const shortid=require('short-unique-id')
const bookSchema=new mongoose.Schema({
   
bookName:{
    type:String,
    required:true,
    trim:true,
},
authorName:{
    type:String,
   // required:true,
    trim:true,
},
category:{
    type:String,
    //required:true,
    trim:true,
},subCategory:{
    type:String,
     trim:true,
},
price:{
    type:Number,
   // require:true,
},
count:{
    type:Number,
    //require:true
}
})
module.exports=mongoose.model('Books',bookSchema)