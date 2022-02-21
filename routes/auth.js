var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
var sqlite3 = require('sqlite3').verbose()
const Person = require('../models/person');
const {generateToken, verifyUser } = require('../core/authorizationlogic')
const { Sequelize, Model, DataTypes } = require('sequelize');
const fs   = require('fs');


// get config vars
dotenv.config();
var privateKEY  = fs.readFileSync('./rsa', 'utf8');

/**
 * handle successful response.
 * @param {Any} res 
 * @param {Any} data 
 * @param {Number} httpcode 
 * @returns 
 */
const handleResponse = (res, data, httpcode) => res.status(httpcode).send(data);

/**
 * handle error response
 * @param {Any} res 
 * @param {Error} err 
 * @returns 
 */
const handleError = (res, err) => res.status(500).send(err);



router.get('/token', function (req, res, next) {
  username = req.body['username']
  passwordHash = req.body['password']
  verifyUser(username, passwordHash)
    .then(data =>   handleResponse(res, generateToken({'userName':data.username, 'usertype':data.usertype}, '2m'), 200))
    .catch(err => handleError(res, err, ));

});



router.get('/db', function (req, res, next) {
  
  (async () => {
    await Person.sync();
    const jane = await Person.create({
      username: 'Abir',
      password: '008231aaf99956982ffbb132c5fe9d79272f6f109abdefb723afe455a4213765'
    });
    console.log(jane.toJSON());
  })();
  res.send("Good db")

});

module.exports = router;
