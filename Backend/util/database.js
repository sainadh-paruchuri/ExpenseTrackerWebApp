const Sequelize=require('sequelize')

const sequelize=new Sequelize('expense_tracker_web_app','root','root',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;