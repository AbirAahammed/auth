var express = require('express');
var router = express.Router();
var logger = require('morgan');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();


/**Default Algorithm is used HS256 */
function generateWebToken(param) {
  return jwt.sign(param, process.env.TOKEN_SECRET)
}

function generateWebToken_hs512(param) {
  return jwt.sign(param, process.env.TOKEN_SECRET_512, {algorithm: 'HS256'})
}
/* GET a JWT token. */
router.get('/alltoken', function(req, res, next) {
    console.debug(`User Name : ${req.body['username']}`)

    /**Generate the token */
    var token_HS256 = generateWebToken(req.body);
    
    /**Respond object */
    var allToken = {"HS256":token_HS256}
    
    res.send(allToken);
  });

  module.exports = router;
