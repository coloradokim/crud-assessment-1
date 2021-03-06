var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/jobs-demo');
var jobCollection = db.get('jobs');
var moment = require("moment");
var now = moment(new Date());

router.get('/jobs', function(req, res, next) {
  jobCollection.find({}, function(err, records) {
    res.render('jobs/index', {allJobs: records});
  });
});

router.get('/jobs/new', function(req, res, next) {
  res.render('jobs/new');
});

router.post('/jobs', function(req, res, next) {
  var date = now.format('MMMM Do YYYY, h:mm a');
  jobCollection.insert({
    title: req.body.title,
    company: req.body.company,
    description: req.body.description,
    responsibilities: req.body.responsibilities,
    timeStamp: "Posted on " + date,
    open: true,
    application: []});
  res.redirect('/jobs')
});

router.get('/jobs/:id', function(req, res, next) {
  jobCollection.findOne({_id: req.params.id}, function(err, record) {
    res.render('jobs/show', {theJob: record});
  });
});

router.get('/jobs/:id/edit', function(req, res, next) {
  jobCollection.findOne({_id: req.params.id}, function(err, record) {
    res.render('jobs/edit', {theJob: record});
  });
});

router.post('/jobs/:id/update', function(req, res, next) {
  var date = now.format('MMMM Do YYYY, h:mm a');
  jobCollection.findOne({_id:req.params.id}, function(err, record) {
    var apps = record.application;
  jobCollection.update({_id:req.params.id},
    {title: req.body.title,
    company: req.body.company,
    description: req.body.description,
    responsibilities: req.body.responsibilities,
    timeStamp: "Updated on " + date,
    open: req.body.open,
    application: apps}, function(err, record) {
      if (err) throw err
    });
  });
    res.redirect('/jobs/' + req.params.id);
});

router.post('/jobs/:id/delete', function(req, res, next) {
  jobCollection.remove({_id: req.params.id}, function(err, record){
    if (err) throw err
  });
  res.redirect('/jobs')
});

router.get('/jobs/:id/application', function(req, res, next){
  jobCollection.findOne({_id: req.params.id}, function(err, record) {
    res.render('jobs/application', {theJob: record});
  });
});

var counter = 0;
router.post('/jobs/:id/application', function(req, res, next) {
  counter++;
  req.body.id = counter
  jobCollection.findOne(req.params.id, function(err, record) {
    record.application.push(req.body)
    jobCollection.update(req.params.id, record, function(err, record){
      res.redirect('/jobs/' + req.params.id);
    });
  });
});

router.post('/jobs/:id/application/delete', function(req, res, next) {
  jobCollection.findOne({_id: req.params.id}, function(err, record) {
    var index = record.application.indexOf(req.body.application.id)
    record.application.splice(index, 1);
    jobCollection.update({_id: req.params.id}, record, function (err,record) {
      res.redirect('/jobs/' + req.params.id);
    });
  });
});


module.exports = router;
