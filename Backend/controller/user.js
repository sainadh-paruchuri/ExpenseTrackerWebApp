const path=require('path')
const User=require('../model/user')
exports.signup=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','signUp1.html'))

}
exports.addUser=(req,res,next)=>{
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
         res.status(201).json({msg:'suessfully user created'})
        console.log(result);
    })
    .catch(err=>console.log(err))
}

exports.users=(req,res,next)=>{
    User.findAll()
    .then(result=>{
        res.status(200).json(result);
        // console.log(result);
        })
    .catch(err=>console.log(err))
}
   
exports.login=(req,res,next)=>{
    console.log(req.body);
    let email=req.body.useremail;
    let password=req.body.password;
    let msg;
    if(email.length<=0||email===''||password.length<=0||password===''){
        return res.status(403).json({msg:'email or password are wrong'})
    }
    else{
        User.findAll({where:{useremail:email}})
        .then(result=>{
            console.log(result==0)
            if(result==0){
                return res.status(404).json({msg:'User not found'})
            }
            if(result[0].useremail==email){
            console.log(result[0].password);
            if(result[0].password!='' && result[0].password==password){
                res.status(200).json({msg:'User login sucessfully'})
            }
            else{
                res.status(401).json({msg:'User not authorized'})
            }
             }
            //  else{
            //      return res.status(404).json({msg:'User not found'})
            // }
        })
    }
}

