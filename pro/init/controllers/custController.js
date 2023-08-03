var express=require('express')
var Router=express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const axios = require('axios')
const mongoose = require('mongoose')
//registration......................

 const createUser = async function (req, res) {
    try {
        let {name,email,password,repeatPassword,mobile,address}=req.body
        //check body of data
        if (!req.body) return res.status(400).send({ status: false, message: "Enter user details" })

        //check key & value of Data is Present or not
        if (!name) return res.status(400).send({ status: false, message: "Name is required" })
        if (!email) return res.status(400).send({ status: false, message: "Email ID is required" })
        if (!mobile) return res.status(400).send({ status: false, message: "Mobile number is required" })
        if (!password) return res.status(400).send({ status: false, message: "Password is required" })
        if(password!==repeatPassword) return res.status(400).send({ status: false, message: "password should be same" })
        if (!repeatPassword) return res.status(400).send({ status: false, message: "RepeatPassword is required" })

        //checking for address
        if (!address) return res.status(400).send({ status: false, message: "Address is required" })

        //create password to hash password
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
       
        //check email and password is already exist or not
        let isEmailExist=await mongoose.models[req.body.model].findOne({email:email})
        if(isEmailExist){
        res.status(400)
        return res.send("user already registered")
        }
      // here we can start user creation
        let userData = await mongoose.models[req.body.model].create(req.body)
       
       return  res.status(201).send({ status: true, message: "customer created successfully", data: userData })
    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}
//.............login user...............................
const loginUser = async (req, res) => {
    try{
       
        const {email, password} = req.body
        //check email or password is present in body or not
        if (!req.body) return res.status(400).send({ status: false, message: "Enter user details" })
        if(!email) return res.status(400).send({status: false, message: "Email field is empty"})

        //check email is corrrect or not
        let getEmailData = await mongoose.models[req.body.model].findOne({email})
        if(!getEmailData) return res.status(400).send({status: false, message: "Email is incorrect"})

        if(!password) return res.status(400).send({status: false, message: "Password field is empty"})

        //check password is correct or not
        let passwordData = await bcrypt.compare(password, getEmailData.password)
        if(!passwordData) return res.status(400).send({status: false, message: "Password is incorrect"})


        //generate token
        let token = jwt.sign({ customerId: getEmailData.customerId}, "ecom", {expiresIn: '1d'});

        //assign the userdId in a variable
        let customerId = getEmailData.customerId

        //set the headers
        //res.status(200).setHeader("x-api-key", token);

        res.status(200).send({status: true, message: "User login successfull", data: {customerId: customerId, token: token}})
        
    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}
//..........forgot password.........................
const updatePassword=async function (req,res){
    let {email,password,repeatPassword}=req.body
    if(!req.body) return res.status(400).send({status: false, message: "Enter valid details"})
    let getEmailData = await mongoose.models[req.body.model].findOne({email:email})
    if(!getEmailData) return res.status(400).send({status: false, message: "Email is incorrect"})
    if(password!==repeatPassword) return res.status(400).send({ status: false, message: "both passwords should be same" })
    if (!repeatPassword) return res.status(400).send({ status: false, message: "RepeatPassword is required" })
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)

    let updatePassword=await mongoose.models[req.body.model]
    .findOneAndUpdate({email:email},{$set:{password: req.body.password}},{new:true})
    return res.status(201).send({status:true,message:'password updated',data:updatePassword})
}
module.exports = { createUser,loginUser,updatePassword}