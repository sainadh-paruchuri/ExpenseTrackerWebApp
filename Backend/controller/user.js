const path=require('path')
const User=require('../model/user')
const bcrypt=require('bcrypt');
const Expense=require('../model/expense')
const jwt=require('jsonwebtoken'); 
const AWS=require('aws-sdk');
const { resolve } = require('path');

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

const generateAccesToken=(id,premium)=>{
    return jwt.sign({userId:id,ispremium:premium },'b4eef7abb67e5f2aff0c187f6bb44fa79b90c895ba9c0d7727b59cd')
}
exports.generateAccesToken1=(id,premium)=>{
    return jwt.sign({userId:id,ispremium:premium },'b4eef7abb67e5f2aff0c187f6bb44fa79b90c895ba9c0d7727b59cd')
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
            bcrypt.compare(password,result[0].password,(err,results)=>{
                 if(results==true){
                res.status(200).json({msg:'User login sucessfully',token:generateAccesToken(result[0].id,result[0].ispremiumuser)})
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
function uploadeToS3(data,filename){
    const BUCKET_NAME='expensetrackingdata';
    const IAM_USER_KEY='AKIA3KRRFVNUHZ35H4YE';
    const IAM_USER_SECRETE='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';

    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRETE,
        // Bucket:BUCKET_NAME
    })
        var params={
            Body:data,
            Bucket:BUCKET_NAME,
            Key:filename,
            ACL:'public-read'
            
        }
        // s3bucket.upload(params,(err,s3response)=>{
        //     if(err){
        //         return console.log(err);
        //     }
        //     else{
        //         console.log('success',s3response.Location);
        //         return s3response.Location;
        //     }
        // })
        return new Promise((resolve,reject)=>{
             s3bucket.upload(params,(err,s3response)=>{
            if(err){
                reject(err)
            }
            else{
                console.log('success',s3response.Location);
                resolve(s3response.Location);
            }
            })
        })

}

exports.expensedownload=async (req,res)=>{
     try{
    const expense=await Expense.findAll({where:{userId:req.result.id}})
    console.log(expense)
    const stringifiedExpense=JSON.stringify(expense)
    const userId=req.result.id;
    const filename=`Expense${userId}/${new Date()}.txt`
   
    const fileURL=await uploadeToS3(stringifiedExpense,filename);
    console.log(fileURL);
     res.status(200).json({ fileURL , success:true,ispremium:req.result.ispremiumuser})
    }
    catch(err){
        console.log(err);
        res.status(500).json({fileURL:'',success:false})
    }
   
   
    
}

exports.addExpense=(req,res)=>{
    console.log(req.body)
    
    const {amount,description,category}=req.body
    const userId=req.result.id
    console.log(userId);
    console.log(amount);
    Expense.create({
        amount,
        description,
        category,
        userId
    })
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:'succesfully added'})
    })
    .catch(err=>console.log(err))

}

exports.getExpense=(req,res)=>{
    console.log(req.result.id);
    console.log("hi hello");
    Expense.findAll({where :{userId:req.result.id}})
    .then(results=>{
        res.status(200).json({ispremium:req.result.ispremiumuser,results:results});
        console.log(results);
        })
    .catch(err=>console.log(err))
}


