var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/jobs', function(req, res, next) {
  res.render('jobs/index');
});

module.exports = router;
