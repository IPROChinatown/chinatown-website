// To the extent possible under law, I waive all copyright and related
// or neighboring rights to this program via CC0

var icon_dir = "/images/map-icons";

var icon_width = 45;
var icon_height = Math.round(icon_width * 290 / 229); // The icons we're using are not square

function make_icon_link (name) {
    return icon_dir.concat("/").concat(icon_width.toString()).concat("/").concat(name);
}

var location_elems = []; // Icons and maps added for locations

var origin_lat = 41.848;
var origin_long = -87.6400;

var origin_lat_end = 41.8595;
var origin_long_end = -87.6300;

var map_width_coords = origin_long_end - origin_long;
var map_height_coords = origin_lat_end - origin_lat;

var locations = [
    {"name": "Nine Dragon Wall",
     "address": "158 W Cermak Rd",
     "position": {"lat": 41.853170000, "lng": -87.631345000},
     "icon": make_icon_link("dragonwall.png"),
     "link": ["locations/nine-dragon"]},
    {"name": "Buddhist Friendship Temple",
     "address": "2249 S Wentworth Ave",
     "position": {"lat": 41.851436200, "lng": -87.631652300},
     "icon": make_icon_link("temple.png"),
     "link": ["locations/buddhist-temple"]},
    {"name": "Chinese Christian Union Church",
     "address": "2301 S Wentworth Ave",
     "position": {"lat": 41.850719000, "lng": -87.631671600},
     "icon": make_icon_link("ccuc.png"),
     "link": ["#"]},
    {"name": "Chinese Medicine",
     "address": "2400 S Wentworth Ave",
     "position": {"lat": 41.849052000, "lng": -87.632070700},
     "icon": make_icon_link("medicine.png"),
     "link": ["locations/medicine"]},
    {"name": "Unique Objects/Traditions",
     "address": "2316 S Wentworth Ave",
     "position": {"lat": 41.850397200, "lng": -87.632185900},
     "icon": make_icon_link("uniquetraditions.png"),
     "link": ["locations/tradition-objects"]},
    {"name": "Chinese-American Museum",
     "address": "238 W 23rd St",
     "position": {"lat": 41.851217700, "lng": -87.633518200},
     "icon": make_icon_link("museum.png"),
     "link": ["locations/ccamuseum"]},
    {"name": "St Therese Church",
     "address": "218 W Alexander St",
     "position": {"lat": 41.851545200, "lng": -87.632607200},
     "icon": make_icon_link("therese.png"),
     "link": ["locations/st-therese"]},
    {"name": "Family Associations (Moy)",
     "address": "2238 S Wentworth Ave",
     "position": {"lat": 41.851749300, "lng": -87.632259500},
     "icon": make_icon_link("family.png"),
     "link": ["locations/familyAssoc"]},
    {"name": "Pui Tak",
     "address": "2216 S Wentworth Ave",
     "position": {"lat": 41.852396900, "lng": -87.632291100},
     "icon": make_icon_link("puitak.png"),
     "link": ["locations/puitak"]},
    {"name": "Chinatown Square Plaza",
     "address": "2133 S China Pl",
     "position": {"lat": 41.853490, "lng": -87.635407},
     "icon": make_icon_link("plaza.png"),
     "link": ["#"]},
    {"name": "Chinese American Service League / CBCAC",
     "address": "2141 S Tan Ct",
     "position": {"lat": 41.854406300, "lng": -87.635565500},
     "icon": make_icon_link("casl.png"),
     "link": ["locations/casl", "locations/cbcac"]},
    {"name": "Ping Tom Park",
     "address": "1700 S Wentworth Ave",
     "position": {"lat": 41.856500900, "lng": -87.634700000},
     "icon": make_icon_link("pingtom.png"),
     "link": ["#"]},
    {"name": "Chinatown Library",
     "address": "2100 S Wentworth Ave",
     "position": {"lat": 41.853859, "lng": -87.632156},
     "icon": make_icon_link("ChinatownLibrary.png"),
     "link": ["/stories#library"]},
    {"name": "Chinatown Gate",
     "address": "2206 S Wentworth Ave",
     "position": {"lat": 41.852610, "lng": -87.632170},
     "icon": make_icon_link("ChinatownGate.png"),
     "link": ["#"]},
    {"name": "Chinatown Chamber of Commerce",
     "address": "2169B S China Pl",
     "position": {"lat": 41.853530, "lng": -87.635130},
     "icon": make_icon_link("ChinatownChamberofCommerce.png"),
     "link": ["#"]},
    {"name": "Allen Lee Plaza", // \"You are beautiful plaza\" for Mahjong
     "address": "2301 S Wentworth Ave",
     "position": {"lat": 41.850930, "lng": -87.631840},
     "icon": make_icon_link("story.png"),
     "link": ["/stories#plaza"]},
    {"name": "Sun Yat-Sen Park",
     "address": "251 W 24th Pl, Chicago, IL 60616",
     "position": {"lat": 41.848148, "lng": -87.633354},
     "icon": make_icon_link("story.png"),
     "link": ["/stories#park"]}
];

var main_map = document.createElement("img");
main_map.setAttribute("alt", "map");
main_map.setAttribute("id", "main_map");
main_map.setAttribute("src", "/images/ct-map-coords-big.png");
main_map.setAttribute("width", "600px");
main_map.style.position = "relative";
main_map.style.left = "10%";
main_map.style.width = "80%";
main_map.style.height = "600px";
document.getElementById("map").appendChild(main_map);

var map_width = main_map.offsetWidth;
var map_height = main_map.offsetHeight;

function iconDialogue(idx) {
    translate_coords(locations[idx].position.lat, locations[idx].position.lng);
    // Get x position and y position?
    links = locations[idx].link;
    if (links.length > 1) {
        msgString = '<ul>';
        for (var i = 0; i < links.length; i++) {
            // links[i] is not escaped, so it should be changed carefully
            msgString += '<li><a href=' + links[i] + '>' + links[i] + '</a></li>';
        }
        msgString += '</ul>';
        vex.dialog.alert({ unsafeMessage: msgString });
    }
    else {
        window.open(links[0], "_self");
    }
}

function mapOpen(idx) {
    var v = locations[idx];
    var elem=document.createElement("img");

    var coords = translate_coords(v.position.lat, v.position.lng);

    elem.src = v.icon;
    elem.setAttribute("alt", "");
    elem.setAttribute("usemap", "#clickable ".concat(v.name));

    elem.style.position = "absolute";

    var rect = document.getElementById("main_map").getBoundingClientRect();
    var doc_rect = document.documentElement.getBoundingClientRect();
    
    var x = (rect.left - doc_rect.left - icon_width / 2 + coords[1]);
    var y = (rect.bottom - doc_rect.top - icon_height - coords[0]);
    elem.style.width = icon_width.toString().concat("px");
    elem.style.height = icon_height.toString().concat("px");
    elem.style.top = y.toString().concat("px");
    elem.style.left = x.toString().concat("px");
    document.getElementById("map").appendChild(elem);

    var clickable = document.createElement("map");

    clickable.setAttribute("name", "clickable ".concat(v.name));
    document.getElementById("map").appendChild(clickable);
    
    var click_area = document.createElement("area");
    click_area.setAttribute("onmouseenter", "iconToFront(".concat(idx.toString().concat(")")));

    click_area.setAttribute("shape", "rect");
    click_area.setAttribute("coords", "0,0,".concat(icon_width.toString()).concat(",").concat(icon_height.toString()));
    click_area.setAttribute("onclick", "iconDialogue(".concat(idx.toString()).concat(")"));
    click_area.setAttribute("href", "#");
    clickable.appendChild(click_area);

    location_elems.push(elem);
    location_elems.push(click_area);
    location_elems.push(clickable);
}

function translate_coords(latitude, longitude) {
    if (latitude > origin_lat_end || longitude > origin_long_end || latitude < origin_lat || longitude < origin_long) {
	alert("Uh-oh, coordinates out of bounds: (".concat(latitude.toString().concat(", ").concat(longitude.toString().concat(")"))));
    }
    return [(latitude - origin_lat) * map_height / map_height_coords, (longitude - origin_long) * map_width / map_width_coords];
}

function load_locs() {
    for (var loc = 0; loc < locations.length; loc++) {
	mapOpen(loc);
    }
}

function erase_locs() {
    for (var i = 0; i < location_elems.length; i++) {
	if (location_elems[i].parentNode != null) {
	    location_elems[i].parentNode.removeChild(location_elems[i]);
	}
    }
    location_elems = [];
}

function refresh_locs() {
    map_width = main_map.offsetWidth;
    map_height = main_map.offsetHeight;
    erase_locs();
    setTimeout(function(){ load_locs(); }, 500);
    /* load_locs();*/
}

function iconToFront(idx) {
    mapOpen(idx);
    if (location_elems.length > 10000) {
	refresh_locs();
    }
}

setTimeout(function(){ load_locs(); }, 500);

window.onresize = refresh_locs;
window.onclick = refresh_locs; // Expanding menu messes up icon position by moving map position, so whenever you click something we refresh locations.
