var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chinatown Tour' });
});

/* GET about page. */
/* router.get('/about', function(req, res, next) {
 *   res.render('about', { title: 'About Chinatown' });
 * });*/

/* GET story index page. */
router.get('/stories', function(req, res, next) {
  res.render('stories', { title: 'Chinatown Stories' });
});

/* GET location page. */
router.get('/location', function(req, res, next) {
  res.render('location', { title: 'Locations' });
});

/* GET map page. */
router.get('/map', function(req, res, next) {
  res.render('map', { title: 'Maps' });
});

/* GET contact info page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* GET individual location pages. */
var locs = ["buddhist-temple", "medicine", "ccamuseum", "casl", "st-therese", "nine-dragon", "puitak", "commerce", "tradition-objects","youthGroup", "familyAssoc"]

function make_loc_router (loc) {
	router.get("/locations/".concat(loc), function(req, res, next) {
		res.render("locations/".concat(loc), { title: loc });
	});
}

for (l = 0; l < locs.length; l++) {
	make_loc_router(locs[l]);
}

module.exports = router;
