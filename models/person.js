const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:data.sqlite');

class Person extends Model {}
const userType = {
  ADMIN : 0,
  CLIENT: 1,
  DRIVER: 2,
  OTHER: 3
}

Person.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  usertype:DataTypes.ENUM('ADMIN', 'CLIENT', 'DRIVER', 'OTHER')

}, { sequelize, modelName: 'person' });

// (async () => {
//   await sequelize.sync();
//   const jane = await Person.create({
//     username: 'janedoe',
//     password: 'janedoe'
//   });
//   console.log(jane.toJSON());
// })();
Person.sync()
module.exports = Person
