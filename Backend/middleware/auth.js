const jwt=require('jsonwebtoken');
const User=require('../model/user');

exports.authenticate=(req,res,next)=>{
    try {
        const tocken=req.header('Authorization')
        console.log(tocken);
        const user=jwt.verify(tocken,'b4eef7abb67e5f2aff0c187f6bb44fa79b90c895ba9c0d7727b59cd')
        console.log(user);
        User.findByPk(user.userId).then((result) => {
            console.log(JSON.stringify(result));
            req.result=result
            next();
            
        })
    } catch (error) {
        console.log(error);
    }
}
