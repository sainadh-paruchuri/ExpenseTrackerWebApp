const express=require('express')
const path=require('path')
const router=express.Router();
const userController=require('../controller/user')
const userAuthenticate=require('../middleware/auth')

router.get('/form',userController.signup)

router.post('/users',userController.addUser)

router.get('/users',userController.users);

router.post('/login',userController.login);

router.post('/expense',userController.addExpense);

router.get('/getExpenses',userAuthenticate.authenticate,userController.getExpense);


module.exports=router;


