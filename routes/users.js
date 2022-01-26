var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/one', function(req, res, next) {
  res.send('respond with a resource no 1');
});

module.exports = router;
