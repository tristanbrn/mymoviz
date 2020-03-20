var express = require('express');
var router = express.Router();
var request = require('sync-request');

const apiKey = 'f6977f0ee150c64613664bc7838233e7';

var movieModel = require('../models/movies');


/* GET home page. */
router.get('/', function(req, res, next) {

  res.json(data);
});


router.get('/import', async function(req, res, next) {

  var data = request('GET',`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)

  var movies = JSON.parse(data.body);
  
  res.json(movies.results);
});





router.get('/wishlist', async function(req, res, next) {

  var movieWishlist = await movieModel.find();

  res.json(movieWishlist);

});


router.post('/wishlist', async function(req, res, next) {

  alreadyExist = await movieModel.findOne({ title:req.body.title });

  console.log(alreadyExist)

  if(alreadyExist === null){

    var newMovie = new movieModel ({
      title: req.body.title,
      img: req.body.img
    });

    var movie = await newMovie.save();

    console.log('*** Inscription du film '+ req.body.title + ' en wishlist ***');
  
  } else {

    console.log('/// Le film '+ req.body.title + ' est déjà en wishlist !');
  
  }

  res.json(true);

});

router.delete('/wishlist/:id', async function(req, res, next) {

  await movieModel.deleteOne(
    { _id: req.params.id }
  );

  res.json('Suppression du film ' + req.params.title + true);

});


module.exports = router;
