const express=require('express')
const path=require('path')
const router=express.Router();
const userController=require('../controller/user')

router.get('/form',userController.signup)

router.post('/users',userController.addUser)

module.exports=router;

