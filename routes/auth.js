var express = require('express');
var router = express.Router();
var logger = require('morgan');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();
/** Get jwt token */
function generateWebToken(params) {
    
}
/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req)
    console.log(process.env.TOKEN_SECRET);
    res.send('respond with a resource');
  });

  module.exports = router;
