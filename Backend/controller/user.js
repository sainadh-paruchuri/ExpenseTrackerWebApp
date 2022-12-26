const path=require('path')
const User=require('../model/user')
exports.signup=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','signUp1.html'))

}
exports.addUser=(req,res,next)=>{
    try{
    console.log(req.body);
    const username=req.body.username;
    const useremail=req.body.useremail;
    const password=req.body.password;    
    User.create({
        username:username,
        useremail:useremail,
        password:password
    })
    .then(result=>{
          res.redirect('/form')
        // res.status(201).json({msg:'suessfully user created'})
        // console.log(result);
    })
    .catch(err=>console.log(err))
    }
    
    catch(err){
        console.log(err)
    }
}
