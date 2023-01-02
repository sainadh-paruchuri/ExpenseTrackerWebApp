const express=require('express');
const bodyParser=require('body-parser')
const cors=require('cors')
const path=require('path')
const userRoutes=require('./routes/user');
const premiumRoutes=require('./routes/premiumleader')
const sequelize=require('./util/database');
const User=require('./model/user')
const Expense=require('./model/expense')
const crypto=require('crypto');
const Order = require('./model/order');


const app=express();

// const key1=crypto.randomBytes(32).toString('hex');
// console.log(key1)


// app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use(userRoutes)
app.use(premiumRoutes)

User.hasMany(Expense);
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)



sequelize.sync(
)
.then(result=>{
app.listen(4000);
}).catch(err=>{
    console.log(err);
})

