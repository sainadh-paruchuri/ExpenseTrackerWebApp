
const express=require('express')
const router=express.Router();
const forgotController=require('../controller/forgot')

router.post('/forgotpassword',forgotController.forgotPassword);









module.exports=router