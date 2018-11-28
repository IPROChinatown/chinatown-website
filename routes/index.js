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
// router.get('/locations/', function(req, res, next) {
//   res.render('nine-dragon', { title: 'Nine Dragon Wall' });
// });

/* GET st-therese page. */
// router.get('/locations/', function(req, res, next) {
//   res.render('st-therese', { title: 'St. Therese' });
// });

/* GET individual location pages. */
var locs = ["buddhist-temple", "medicine", "ccamuseum", "casl", "st-therese", "nine-dragon"]

function make_loc_router (loc) {
	router.get("/locations/".concat(loc), function(req, res, next) {
		res.render("locations/".concat(loc), { title: loc });
	});
}

for (l = 0; l < locs.length; l++) {
	make_loc_router(locs[l]);
}

module.exports = router;
