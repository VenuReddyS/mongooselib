const jwt = require("jsonwebtoken");
const userModel = require("../models/customerSchema");
const mongoose = require("mongoose")


const auth= async function (req, res, next) {
    try {
        let email = req.body.email
        let token = req.headers['authorization'];
        if (!token) {
            return res.status(400).send({ status: false, message: "Token is required..!" });
        }
        // let Token = token.split(".")
        // console.log(token)
        // let tokenValue = Token[1]
        // console.log(tokenValue)
        const decode = jwt.verify(token, "ecom")
        console.log(decode)
        let conCustomer = await userModel.findOne({ customerId: decode.customerId })
        if (conCustomer.email!==email) return res.status(400).send({ status: false, message: "customer does not exist...!" })
        next();
     }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { auth }