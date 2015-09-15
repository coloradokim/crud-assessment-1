var record = {
  "title" : "Reporter",
  "company" : "AP",
  "description" : "b",
  "responsibilities" : "a",
  "timeStamp" : "September 14th 2015, 1:34 pm",
  "open" : true,
  "application" : [ { "name" : "Kim", "email" : "k@k.com", "url" : "k.com", "id" : 1 },
                    { "name" : "Cat", "email" : "cat@comcast.com", "url" : "c.com", "id" : 2 } ] }



var newArr = record.application <= use forEach 
  var findID = function(arr) {
    var index= record.application.indexOf(record.application.id=1)
    console.log(index);
     return record.application.splice(index, 1)
  }
console.log(findID(newArr));

// console.log(findID(record.application));

// router.get('/jobs/:id/apply/:applyId', function(req, res, next){
//   var a = req.url.split('/')
//   var b = a.length -1
//   jobs.findOne({_id: req.params.id}, function(err, doc){
//     var idFilter = doc.apply.filter(function(apply){
//       return apply.applyId == a[b]
//     })
//     res.render('show', {apply: idFilter[0], postId: doc._id})
//   })
// })
