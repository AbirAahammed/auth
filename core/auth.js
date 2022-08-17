const Person = require('../models/person');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// PRIVATE and PUBLIC key
var privateKEY = fs.readFileSync('./rsa', 'utf8');
var publicKEY = fs.readFileSync('./rsa.pub', 'utf8');

var i = 'Express Auth';          // Issuer 
var s = 'some@user.com';        // Subject 
var a = 'http://mysoftcorp.in'; // Audience




exports.generateToken = function (data, expiryTime) {
    // SIGNING OPTIONS
    var signOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: expiryTime,
        algorithm: "RS256"
    };
    return jwt.sign(data, privateKEY, signOptions);

}


/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {user}
 */
exports.verifyUser = function (username, password) {
    return Person.findOne({
        where: { username: username },
        attributes: ['id', 'username', 'password', 'usertype']
    }).then(person => {
        return person.password == password & person.usertype != null ? person : null
    })
}

/**
 * 
 * @param {string} token 
 * @returns 
 */
exports.verifyToken = function(token) {
    try {
        var decoded = jwt.verify(token, publicKEY);
    } catch (JsonWebTokenError) {
        return null
    }
    return decoded;
}



// export.token = function()