var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
var sqlite3 = require('sqlite3').verbose()
const Person = require('../models/person');
const { generateToken, verifyUser, verifyToken } = require('../core/auth')
const { Sequelize, Model, DataTypes } = require('sequelize');
const fs = require('fs');
const redis = require('redis');

const AuthToken = 'AUTH'
const RefresherToken = 'REFRESH'
// get config vars
dotenv.config();
var privateKEY = fs.readFileSync('./rsa', 'utf8');

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

const redisClient = redis.createClient(8001,'localhost');
redisClient.on('error', (err) => {
  console.log('Error occured while connecting or accessing redis server');
});

router.post('/token', function (req, res, next) {
  username = req.body['username']
  passwordHash = req.body['password']
  if (!username) {
    var decoded = verifyToken(req.body['token'])
    var aToken = generateToken({ 'username': decoded.username, 'usertype': decoded.usertype, 'auth': 'auth' }, '5m')
    var rToken =  generateToken({ 'username': decoded.username, 'usertype': decoded.usertype, 'tokentype': 'auth' }, '5m')

    handleResponse(res, {
      authToken : aToken,
      refresherToken : rToken
    }, 200)
  redisClient.set(decoded.username,rToken, redis.print);
  }
  else{
    verifyUser(username, passwordHash)
    .then(data => handleResponse(res, {
      refresherToken:generateToken({ 'username': data.username, 'usertype': data.usertype, 'tokentype': 'refresher' }, '15m'),
      authToken:generateToken({ 'username': data.username, 'usertype': data.usertype, 'tokentype': 'refresher' }, '5m')
    }, 200))
    .catch(err => handleError(res, err,));
  }


});



router.post('/db', function (req, res, next) {

  Person.create({
    username: 'admin',
    password: req.body['password'],
    usertype: 'ADMIN'
  })
    .then(data => {
      res.status(201).json({ status: "Success", id: data.id })
    })
    .catch(err => handleError(res, err,));

});

module.exports = router;
