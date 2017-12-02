'use strict';
const Sequelize = require('sequelize');
const bcrypy  = require ('bcrypt-nodejs');
module.exports = (sequelize)=>{
    const Brokertable = sequelize.define('user_broker_table',{
        UserID:{
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        BrokerUsername:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        BrokerPassword:{
            type: Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty: true,
            }
        },
        
    });
    Brokertable.beforeCreate((user_broker_table) =>
        new sequelize.Promise((resolve) => {
            bcrypy.hash(user_broker_table.BrokerPassword,null,null,(err,hashPassword)=>{
                resolve(hashedPassword);
            });
        }).then((hashedPw)=>{
            user_broker_table.BrokerPassword = hashedPw;
        })
    );
    return Brokertable;   
};