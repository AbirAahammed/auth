const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite:data2.sqlite');
const sequelize = new Sequelize('mysql://localhost:15012/Auth',{username:'root', password:'riba'})

class Person extends Model {}
const userType = {
  ADMIN : 0,
  CLIENT: 1,
  DRIVER: 2,
  OTHER: 3
}

Person.init({
  username: {
    type : DataTypes.STRING,
    unique:true,
    require:true
  }, 
  password: {
    type : DataTypes.BLOB,
    require : true
  },
  usertype:DataTypes.ENUM('ADMIN', 'CLIENT', 'DRIVER', 'OTHER')

}, { sequelize, modelName: 'person' });

Person.sync()
module.exports = Person
