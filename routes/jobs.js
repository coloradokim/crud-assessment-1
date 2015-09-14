var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/jobs-demo');
var jobCollection = db.get('jobs');

router.get('/jobs', function(req, res, next) {
  res.render('jobs/index');
});

router.get('/jobs/new', function(req, res, next) {
  res.render('jobs/new');
});

router.post('/jobs', function(req, res, next) {
  jobCollection.insert({
    title: req.body.title,
    company: req.body.company,
    description: req.body.description,
    responsibilities: req.body.responsbilities,
    timeStamp: new Date(),
    open: true});
  res.redirect('/jobs')
});

module.exports = router;
