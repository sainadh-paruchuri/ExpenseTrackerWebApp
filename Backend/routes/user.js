const express=require('express')
const path=require('path')
const router=express.Router();
const userController=require('../controller/user')
const userAuthenticate=require('../middleware/auth')
const puchaseController=require('../controller/purchase')

router.get('/form',userController.signup)

router.post('/users',userController.addUser)

router.get('/users',userController.users);

router.post('/login',userController.login);

router.post('/expense',userAuthenticate.authenticate,userController.addExpense);

router.get('/getExpenses',userAuthenticate.authenticate,userController.getExpense);

router.get('/purchasepremium',userAuthenticate.authenticate,puchaseController.purchasepremium);
router.post('/updatetransactionstatus',userAuthenticate.authenticate,puchaseController.updateTransactionStatus)


module.exports=router;


