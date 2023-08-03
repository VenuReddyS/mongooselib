let express = require('express');
let router = express.Router();
let {createUser, loginUser, updatePassword}=require('../controllers/custController')
let {auth}=require('../controllers/auth')
//var axios=require('axios')

router.post("/creation",createUser)
router.post('/login',loginUser)
router.post('/updatepassword',auth,updatePassword)
module.exports = router;
