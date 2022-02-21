// imports

var express = require('express');
var router = express.Router();

const {generateToken, verifyUser } = require('../core/authorizationlogic');
const Person = require('../models/person');


/**
 * Authentication of ADMIN, It uses BASIC_AUTH header to retrieve username and password
 * @param {any} req  
 * @param {any} res 
 * @param {function} next 
 * @returns {null}
 */
function adminrequired(req, res, next) {
    cred = Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString('ascii').split(':')
    verifyUser(cred[0], cred[1])
        .then(data => {
            if (data != null & data?.usertype == 'ADMIN') {
                next()
            } else {
                res.status(403).send()
            }
        })
}

/**
 * Get list of all new users.
 */
router.get('/newusers', adminrequired, function(req, res, next) {
    Person.findAll({
        where:{usertype: null},
        attributes: ['id', 'username', 'password']
    })
        .then(data => {
            res.send(data)
        })
})


/**
 * Get list of all users
 */
router.get('/users',adminrequired, function(req, res, next) {
    Person.findAll({
        attributes: ['id', 'username', 'usertype']
    })
        .then(data => {
            res.send(data)
        })
})

router.get('/updateusertype', adminrequired, function(req, res, next) {
    Person.update(
        {
            usertype : req.body['usertype']
        },
        {where:{id:req.body['id']}}
    ).then(data=> res.send(data))
})

module.exports = router

