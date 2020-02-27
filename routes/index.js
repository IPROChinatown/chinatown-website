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
var cont = ["entrepreneurship","damaDancers","youthGroup","world_chinatown","newYearParade","ccvp", "chicagoFlourishingChinatown", "collegeStudentsChinatown", "midAutumn", "summerFair", "originsChinatowns", "stTereseChildren", "theresaMah"]
var contTitle = ["Entrepreneurship","Dama Dancers","Youth Group","Chinatowns Around the World","New Year Parade","CCVP", "Chicago Flourishing Chinatown", "College Students in Chinatown", "Mid-Autumn Festival", "Summer Fair", "Origins of Chinatowns", "St. Therese Children", "Theresa Mah"]

function make_cont_router(cont, contTitle) {
    router.get("/content/".concat(cont), function (req, res, next) {
        res.render("content/".concat(cont), { title: contTitle });
    });
}

for (t = 0; t < cont.length; t++) {
    make_cont_router(cont[t],contTitle[t]);
}

/* GET individual location pages. */
var locs = ["buddhist-temple", "medicine", "ccamuseum", "casl", "st-therese", "nine-dragon", "puitak", "familyAssoc", "chinatownGate", "cbcac", "chineseZodiac","cucc","pingTom","library", "commerce","tradition-objects","testlocation"]
var locTitle = ["The Buddhist Temple", "Herbalist", "Chinese-American Museum of Chicago", "Chinese American Service League- CASL", "St Therese", "Nine Dragon Wall", "Pui Tak Center", "Family Associations", "Chinatown Gate", "CBCAC", "The Chinese Zodiac","Chicago Chinese Christian Union Church","Ping Tom Park","Chinatown Library", "Chinatown Chamber of Commerce","Unique Objects","testlocation"]

function make_loc_router (loc,locTitle) {
	router.get("/locations/".concat(loc), function(req, res, next) {
		res.render("locations/".concat(loc), { title: locTitle });
	});
}

for (l = 0; l < locs.length; l++) {
	make_loc_router(locs[l],locTitle[l]);
}

/* GET individual story pages. */
var stories = ["Hailan-Yu", "Madison-Chan", "Michael-Zhao", "Preston-Yuen", "Renee-Zhao", "Ryan-Daly", "Xiaolynn-Zhen"]
var storiesTitle = ["Hailan Yu", "Madison Chan", "Michael Zhao", "Preston Yuen", "Renee Zhao", "Ryan Daly", "Xiaolynn Zhen"]
function make_story_router (name,nameTitle) {
	router.get("/stories/".concat(name), function(req, res, next) {
		res.render("stories/".concat(name), { title: nameTitle });
	});
}

for (s = 0; s < stories.length; s++) {
	make_story_router(stories[s],storiesTitle[s]);
}

module.exports = router;
