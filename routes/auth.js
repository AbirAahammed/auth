var express = require('express');
var router = express.Router();
var logger = require('morgan');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const redis = require('redis');
    
// get config vars
dotenv.config();

// db client
const client = redis.createClient('0.0.0.0', '7000');

client.on('connect', function() {
  console.log('Connected!!!');
  client.get('framework', function(err, reply) {
    console.log(reply); // ReactJS
  });
});


client.on('error', (err) => {
  console.log(err);
});

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

  router.get('/redis', async function (req, res) {
    await client.connect()
    await client.hmset('frameworks_hash', 'javascript', 'ReactJS', 'css', 'TailwindCSS', 'node', 'Express');

    client.hgetall('frameworks_hash', function(err, object) {
      console.log(object); // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
    });
    client.set('framework', 'ReactJS');

    client.get('framework', function(err, reply) {
      console.log(reply); // ReactJS
      res.send(result)
    });
})


  module.exports = router;
