var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/fun', function(req, res,next) {
  res.send('happy to share');
});

module.exports = router;
