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

/* GET individual content pages. */
var cont = ["entrepreneurship","damaDancers","youthGroup","world_chinatown","newYearParade","ccvp", "chicagoFlourishingChinatown"]

function make_cont_router(cont) {
    router.get("/content/".concat(cont), function (req, res, next) {
        res.render("content/".concat(cont), { title: cont });
    });
}

for (t = 0; t < cont.length; t++) {
    make_cont_router(cont[t]);
}

/* GET individual location pages. */
var locs = ["buddhist-temple", "medicine", "ccamuseum", "casl", "st-therese", "nine-dragon", "puitak", "familyAssoc", "chinatownGate", "cbcac", "chineseZodiac", "medicine","st-therese","cucc","pingTom","casl","library", "commerce","tradition-objects"]

function make_loc_router (loc) {
	router.get("/locations/".concat(loc), function(req, res, next) {
		res.render("locations/".concat(loc), { title: loc });
	});
}

for (l = 0; l < locs.length; l++) {
	make_loc_router(locs[l]);
}

/* GET individual story pages. */
var stories = ["Hailan-Yu", "Madison-Chan", "Michael-Zhao", "Preston-Yuen", "Renee-Zhao", "Ryan-Daly", "Xiaolynn-Zhen"]

function make_story_router (name) {
	router.get("/stories/".concat(name), function(req, res, next) {
		res.render("stories/".concat(name), { title: name });
	});
}

for (s = 0; s < stories.length; s++) {
	make_story_router(stories[s]);
}

module.exports = router;
