const mongoose = require('mongoose');
const shortid = require('short-unique-id')
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    shortid: {
        type: String,
        default: new shortid().stamp(10)
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    profileImage: {
        type: String,
    },
    phoneNumber: {
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
    repeatPassword: {
        type: String,
        required: true,
        trim: true
    },
    address:
    {
        street  :{ type: String, required: true },
        district:{ type: String, required: true },
        mandal  :{ type: String, required: true },
        village :{ type: String, required: true },
        pincode :{ type: Number, required: true },
    }
});

module.exports = mongoose.model('customer', customerSchema)