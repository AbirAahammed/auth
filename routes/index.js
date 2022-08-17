var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
  res.render('index', {title:'index'});
});

router.post('/login', function(req, res) {
  console.log('TEsting ',req.body)
  res.cookie('token','sampletoken', { maxAge: 900000, httpOnly: true });
  res.send('tomb');
});

module.exports = router;