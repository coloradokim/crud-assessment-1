router.get('/delete/:id/:applicantId', function (req, res, next) {

  var filteredApplicants = [];

  jobs.findOne({_id: req.params.id}, function (err, doc) {
    for (var i = 0; i < doc.applicants.length; i++) {
      console.log(‘doc.applicants['+i+'].applicantId = ', doc.applicants[i].applicantId);
      console.log('req.params.applicantId = ', req.params.applicantId);

      if (doc.applicants[i].applicantId.toString() === req.params.applicantId.toString()) {
        console.log('MATCH! KICK IT OUT!');
      } else {
        console.log('NO MATCH, LEAVE IT');
        filteredApplicants.push(doc.applicants[i]);
      }
    }
    console.log('FILTERED = ', filteredApplicants);
    jobs.update({_id: req.params.id},
      {$set: {
        applicants: filteredApplicants
      }
    });
  });

  res.redirect('/' + req.params.id);
});
