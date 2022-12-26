const express=require('express')
const path=require('path')
const router=express.Router();

router.get('/form',(req,res)=>{
    res.sendFile(path.join(__dirname,'.','views','signUp1.html'))

})

router.post('/users',(req,res)=>{
    console.log(req.body);
})