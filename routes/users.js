var express = require('express');
const Person = require('../models/person');
var router = express.Router();
const { Sequelize, Model, DataTypes, transaction } = require('sequelize');

/**
 * Create a new User.
 */
router.post('/', function (req, res, next) {
    Person.create({
      username: req.body['username'],
      password: req.body['password']
    })
    .then(data => {
      res.status(201).json({status:"Success", id:data.id})
    });
})


module.exports = router;
