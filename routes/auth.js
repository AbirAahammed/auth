var express = require('express');
var router = express.Router();
var logger = require('morgan');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('db.sqlite')
const Person = require('../models/person');
const verify = require('../core/authorizationlogic')
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:data.sqlite');
var request = require("request");

// get config vars
dotenv.config();

const handleResponse = (res, data) => res.status(200).send(data);
const handleError = (res, err) => res.status(500).send(err);
/**Default Algorithm is used HS256 */
function generateWebToken(param) {
  return jwt.sign(param, process.env.TOKEN_SECRET)
}

function generateWebToken_hs512(param) {
  return jwt.sign(param, process.env.TOKEN_SECRET_512, { algorithm: 'HS256' })
}

/* GET a JWT token. */
router.get('/alltoken', function (req, res, next) {
  console.debug(`User Name : ${req.body['username']}`)

  /**Generate the token */
  var token_HS256 = generateWebToken(req.body);

  /**Respond object */
  var allToken = { "HS256": token_HS256 }

  res.send(allToken);
});
router.get('/token', function (req, res, next) {
  username = req.body['username']
  passwordHash = req.body['password']
  verify(username, passwordHash)
    .then(data =>   handleResponse(res, data))
    .catch(err => handleError(res, err));

});


router.post('/user', function (req, res) {
  username = req.body['username']
  passwordHash = req.body['password']
  usertype = req.body['usertype']

  console.log(`username : ${username}, password : ${passwordHash}`)

  /**
   ***************************************************************
   *        Check whey async post request is not working         *
   ***************************************************************
   * (async () => {
    const jane = await Person.create({
      username: username,
      password: passwordHash
    });
  })();
  
   */
  
 var person = Person.create({
    username: username,
    password: passwordHash,
    usertype:usertype
  });
  res.send('Done');

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
