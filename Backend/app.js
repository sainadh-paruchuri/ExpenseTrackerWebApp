const express=require('express');
const bodyParser=require('body-parser')
const cors=require('cors')
const path=require('path')
const userRoutes=require('./routes/user');
const sequelize=require('./util/database')

const app=express();


app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.use(userRoutes)
// app.use('/form',(req,res,next)=>{
//     res.sendFile(path.join(__dirname,'.','views','signUp1.html'))

// })



sequelize.sync(
)
.then(result=>{
app.listen(4000);
}).catch(err=>{
    console.log(err);
})

