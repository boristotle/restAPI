var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/dogsDB');
var dogCollection = db.get('dogs');


// this is a get request to render the dogs homepage
router.get('/dogs', function(req, res, next) {
  dogCollection.find({}, function(err, dogs) {
    res.render('dogs/home', {allDogs: dogs})
  });
});


// router.get('/', function(req, res, next){
//   database.find({}, function(err, data){
//     res.redner('home', {allData: data})
//   })
// })


// this is a get request to render the new dog page
router.get('/dogs/new', function(req, res, next) {
  res.render('dogs/new');
})


// router.get('/new', function(req, res, next){
//   res.render('new');
// })

// this is a post request to add a new dog to the database from the form posting to /new
router.post('/new', function(req, res, next){
  dogCollection.insert({ dogName: req.body.dogName, dogBreed: req.body.dogBreed, dogAge: req.body.dogAge});
  res.redirect('/dogs');
});


// router.post('/new', function(req, res next){
//   database.insert({ name: req.body.name, age: req.body.age});
// req.redirect('/');
// })
  

// this is the get request to render the edit page
router.get('/dogs/:id/edit', function(req, res, next){
  dogCollection.findOne({_id: req.params.id}, function(err, dogs){
    res.render('dogs/edit', {theDog: dogs});
  });
});



// router.get('/:id/edit', function(req, res, nexdt){
//   database.findOne({_id: req.params.id}, function(err, data){
//     res.render('/edit');
//   })
// })

// this is the post request to edit a dog
router.post('/dogs/:id/edit', function(req, res, next) {
  dogCollection.update(req.params.id, {
  dogName: req.body.dogName,
  dogBreed: req.body.dogBreed,
  dogAge: req.body.dogAge}, function(err, dogs){
    res.redirect('/dogs');
  })
})


// router.post('/:id/edit', function(req, res, next){
// database.update(req.params.id, {
//   name: req.body.name,
//   age: req.body.age}, function(err, data) {
//     res.redirect('/');
// })
// })


// this is the postingst request to delete a dog
router.post('/dogs/:id/delete', function(req, res, next){
  dogCollection.remove({_id: req.params.id}, function(err, dogs){
    res.redirect('/dogs');
  });
})



// router.post('/:id/delete', function(req, res, next){
//   database.remove({_id: req.params.id}, function(err, data}{
// res.redirect('/');
//   })
// })


module.exports = router;
