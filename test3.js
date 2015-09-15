router.get('/createApplication/:id', function(req,res,next){
  jobs.findOne({_id:req.params.id}, function(err,doc){
    res.render('createApplication', {job: doc});
  })
})
------------

{{#job}}
<h2>Apply for {{jobTitle}} at {{companyName}}</h2>
<form action="/posting/{{_id}}/createApplication" method="post" style="display:inline;">
  <div class="" style="margin-left: 25px;margin-bottom:15px;">
    Full Name<input type="text" style="width: 50%;" name="name"><br>
  </div>
  <div class="" style="margin-bottom:15px;">
    Email Address<input type="email" name="email" style="width: 48.9%;"><br>
  </div>

  <div class="" style="margin-left: 12px;margin-bottom:15px;">
    Resume URL<input type="text" style="width: 49.5%;" name="resumeUrl"><br>
  </div>

  <input class="inputSubmits" type="submit" style="margin-left:7.5%;"value="Create Application">
</form>
&nbsp;&nbsp;<a href="/posting/{{_id}}" style="display:inline;">Cancel</a>
{{/job}}
---------

router.post('/posting/:id/createApplication', function(req,res,next){
  jobs.findOne({_id:req.params.id}, function(err,doc){
    if(!req.body.name || !req.body.email || !req.body.resumeUrl){
      res.render('createApplication', {job: doc, applicationError: "You must fill in all input fields in order to submit an application."})
    }
    else{
      var idCount = 0;
      if(doc.applications.length < 1){
        idCount = 1;
        req.body.applicationId = idCount;
        doc.applications.push(req.body);
      }
      else{
        var lastIndex = doc.applications.length -1;
        var lastItem = doc.applications[lastIndex];
        idCount = lastItem.applicationId + 1;
        req.body.applicationId = idCount;
        doc.applications.push(req.body);
      }
      jobs.update({_id:req.params.id}, doc, function(err,doc){
        res.redirect('/posting/' + req.params.id);
      })
    }
  })

})
---------

router.post('/posting/:id/application/:applicationId/delete', function(req,res,next){
  jobs.findOne({_id: req.params.id}, function(err,doc){
    var a = req.url.split('/');
    var b = a.length -2;

    var idFilter = doc.applications.filter(function(application){
      return application.applicationId != a[b];
    })

    doc.applications = idFilter;
    jobs.update({_id:req.params.id},doc, function(err,doc){
      if(err){
        console.log(err);
      }
      res.redirect('/posting/' + req.params.id);
    })
  })
})
