var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/jobs-demo');
var jobCollection = db.get('jobs');

router.get('/jobs', function(req, res, next) {
  jobCollection.find({}, function(err, records) {
    res.render('jobs/index', {allJobs: records});
  });
});

router.get('/jobs/new', function(req, res, next) {
  res.render('jobs/new');
});

router.post('/jobs', function(req, res, next) {
  jobCollection.insert({
    title: req.body.title,
    company: req.body.company,
    description: req.body.description,
    responsibilities: req.body.responsibilities,
    timeStamp: new Date(),
    open: true});
  res.redirect('/jobs')
});

router.get('/jobs/:id', function(req, res, next) {
  jobCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('jobs/show', {theJob: record});
  });
});


module.exports = router;
