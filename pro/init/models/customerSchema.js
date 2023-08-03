const mongoose = require('mongoose');
const shortid = require('short-unique-id')
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    customerId: {
        type: String,
        default: new shortid().stamp(10)
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    
    address:
    {
		street  :{type:String,trim:true},
        district:{type:String,trim:true},
        mandal  :{type:String,trim:true},
        village :{type:String,trim:true},
        pincode :{type:Number,trim:true}
	},
});

module.exports = mongoose.model('customer', customerSchema)