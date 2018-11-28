var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chinatown Tour' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Chinatown' });
});

/* GET location page. */
router.get('/location', function(req, res, next) {
  res.render('location', { title: 'Locations' });
});

/* GET map page. */
router.get('/map', function(req, res, next) {
  res.render('map', { title: 'Maps' });
});

/* GET nine-dragon page. */
router.get('/locations/nine-dragon', function(req, res, next) {
  res.render('nine-dragon', { title: 'Nine Dragon Wall' });
});

/* GET st-therese page. */
router.get('/locations/st-therese', function(req, res, next) {
  res.render('st-therese', { title: 'St. Therese' });
});

module.exports = router;
