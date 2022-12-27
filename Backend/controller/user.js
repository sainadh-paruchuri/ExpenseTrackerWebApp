const path=require('path')
const User=require('../model/user')
const bcrypt=require('bcrypt');
exports.signup=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','signUp1.html'))

}
exports.addUser=(req,res,next)=>{
    console.log(req.body);
    const username=req.body.username;
    const useremail=req.body.useremail;
    const password=req.body.password;   

    const saltround=10;
    bcrypt.hash(password,saltround,async(err,hash)=>{
        console.log(err);
        await  User.create({
        username:username,
        useremail:useremail,
        password:hash
    })
    .then(result=>{
         res.status(201).json({msg:'suessfully user created'})
        console.log(result);
    })
    .catch(err=>console.log(err))
    })
   
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
            bcrypt.compare(password,result[0].password,(err,result)=>{
                 if(!err){
                res.status(200).json({msg:'User login sucessfully'})
            }
            else{
                res.status(401).json({msg:'User not authorized'})
            }

            })
           
             }
            //  else{
            //      return res.status(404).json({msg:'User not found'})
            // }
        })
    }
}

