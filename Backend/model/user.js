const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const User=sequelize.define('user',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    useremail:{
         type:Sequelize.STRING,
         allowNull:false,
         unique:true
    },
    password:{
          type:Sequelize.STRING,
          allowNull:false,
    },
    ispremiumuser:Sequelize.BOOLEAN

}

)

module.exports=User