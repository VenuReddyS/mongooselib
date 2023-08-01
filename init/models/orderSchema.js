const mongoose = require('mongoose')
const shortid = require('short-unique-id')
let ObjectId = mongoose.Schema.Types.ObjectId
const orderSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        default: new shortid().stamp(10)
    },
    items: [{
        bookId: { type: ObjectId, ref: 'books', required: true },
        quantity: { type: Number, required: true}
    }],
    discountPrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
      
    },
    totalQuantity: {
        type: Number,
        
    },
    isDeleted: {
        type: Boolean,
        default:false
    },
    orderAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('order', orderSchema)