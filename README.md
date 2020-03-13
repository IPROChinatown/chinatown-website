# chinatown-website

This is a website that will be used as a tour in Chicago's chinatown with the Chinese-American Museum of Chicago.
Make sure to check TODO for the location of the new page design we couldn't roll out.

## Team
Keith Bateman
Aury Bwashi (formerly)
Jue Huang
Leon Souweine
Neil Bhandari
Gregory Gassoway

## Requirements
- Vex, jquery, bootstrap, etc. (included in public/javascripts)
- Node.js

## Running
To run the server, type `npm start` or run the "${DIR}/bin/www" executable.
The server should run on localhost:3000, unless configured otherwise.

## Current web hosting
The website is currently hosted at http://ccamuseum-chinatown-web.herokuapp.com/. 
Any commits to this github will update the live website.

## Structure
- Routes are specified in ${DIR}/routes/index.js (translate url to directory path).
- Pages are specified in ${DIR}/views/, the top level directory contains pages associated with navbar and main page.
- ${DIR}/views/partials contains content that is reused across multiple pages (header, footer, navbar, javascript imports).
- ${DIR}/views/stories contains "Chinatown Stories" content written by children for a writing contest.
- ${DIR}/views/locations contains specific location pages.
- ${DIR}/public contains CSS (stylesheets/), JS (javascripts/), pictures (images/), and audio content (audio/).
- ${DIR}/public/audio/en contains English language audio content
- ${DIR}/public/audio/zh_HANS contains Mandarin language audio content
- ${DIR}/public/audio/zh_HANT contains Cantonese language audio content
- ${DIR}/images/ toplevel contains the static map image and various other things
- ${DIR}/images/favicons contains favicons (images displayed in the tab of the browser)
- ${DIR}/images/locations contains pictures for location pages
- ${DIR}/images/map-icons contains icons for the map in two subdirectories, 45/ and 80/; the 45/ directory contains 45px icons, while the 80/ directory contains 80px icons.
- ${DIR}/images/javascripts/ contains personal scripts and library scripts. The scripts we wrote include language.js, map.js, readmore.js, readmoreZh.js, and scrollToTop.js; some of the logic required to understand these is discussed below.
- ${DIR}/images/stylesheets/ contains CSS stylesheets. These are rarely changed, but when they are the one to change is usually style.css

## Javascripts explanation
### language.js
- language.js is used to change the language between English, Mandarin/Simplified, and Cantonese/Traditional.
- When possible, the starting language on a page will be selected by cookie.
- We universally (not just in language.js) use "en" to refer to English, "zh_HANS" to refer to Simplified Chinese, and "zh_HANT" to refer to Traditional Chinese.
- ChangeLang() is meant for use in buttons, while SetLang() is meant for a dropdown.
- The language changing functions work by changing the display style on elements using the class of those elements. Elements of class "en" will display if "en" is the selected language, while elements of class "zh_HANS" and "zh_HANT" will disappear. If an item is not of one of these classes, then it will appear regardless of the selected language.
### map.js
- This is the most complicated javascript file we had to write. It's the static map, which we made ourselves from scratch.
- lines 4-22 declare several variables. icon_dir is where you find icons, icon_width is the size of the icons, icon_height is calculated from width, but it's not perfect. These are used via make_icon_link() to create the links to the icons. The map has to add icons and things to the page, and location_elems is effectively a queue containing all the elements associated with those icons so they can be removed when necessary. origin_lat, origin_long, origin_lat_end, and origin_long_end specify the boundaries of the static map in real world coordinates. map_width_coords and map_height coords derive from the lat and long of the map, and tell us the width and height of the map in coordinates.
- Next we declare the "locations" array. This is a complicated structure, so bear with me. The locations array contains all the information we could possibly need for map purposes about every location in the website. It would be useful to move it to another file so it could be reused, but this has not yet been done. Every location is a javascript object with a "name", "address", "position" (which is an object with latitude "lat" and longitude "lng"), "icon" (which is the link to the icon), and "link". Most of these are just strings ultimately, and "address" is not currently used other than to find the "position" coordinates. "link" is complex, and in order to undrestand it we need to understand what happens when you click on an icon. When you click on an icon, the iconDialogue() function (L127) is triggered. iconDialogue gets this "link" object for the clicked location and handles it. The "link" object is always an array. If it only has one link, then we go directly to that link (the "else" clause in iconDialogue()). If it has more than one link (eg. ["/url/1", "/url/2", etc.]), then those links will be displayed in a popup (using Vex) using the URL names as the link text. If it has more than one link and those links are arrays of length 1 (eg. [["url/1"], ["url/2"], etc.]), then it does basically the same thing. If it has more than one link and those links are arrays of length 2 (eg. [["url/1", "foo"], ["url/2", "bar"], etc.], then it uses the text given as the link text (so we would have "foo" leading to "url/1"). Otherwise, it uses the lang_selected variable from language.js to determine what language is selected, and displays that text (so [["url/1", "foo", "bar", "baz"]] would display "foo" in English, "bar" in Mandarin, and "baz" in Cantonese).
- After the locations structure we have the map being built and added to the element with id "map". Nothing really special here. map_width and map_height are set from this, and these are the actual size of the map image.
- The iconDialogue() function was discussed under the "locations" array section.
- The mapOpen() function adds an icon to the map. In order to do this, it calls translate_coords on the "position" of the location (see translate_coords() below), builds the icon "img" element and clickable "map" and "click_area" elements over the top of it (these call iconDialogue() with the appropriate arguments), and puts these things into location_elems in case we need to clear them later.
- translate_coords() takes a latitude and longitude and turns them into a position on the map.
- load_locs() opens all the locations in the locations structure.
- erase_locs() deletes all elements in the location_elems array.
- refresh_locs() refreshes the page by calling erase_locs() and then load_locs with a 500 ms delay.
- iconToFront() opens a new icon over the top of the map. This is used whenever somebody mouses over an icon, effectively "loading" only that icon over the top of the others so that it gets pushed to the front. If location_elems gets too long because of this, it will call refresh_locs(), clearing all elements and redrawing them.
- Finally, we call load_locs() with a 500 ms timeout (the timeout is important to ensure that the map image has been appropriately loaded).
- Whenever the window is resized or clicked, we need to refresh, because if we don't, then icons will be in the wrong position in certain situations arising from resizing and clicking the window.
### readmore.js / readmoreZh.js
	-could be deleted.
	-the read more and read less functions are all in head file, and there're three, one for english, one for simplified chinese, and one for tradiontional chinese.
	-the function use <a> it's a link rather than button.
	-the problem still have is that we have to keep the text all in one <p> which is not a perfect structure
	-also when user press read more, it will bring the user to the bottom of the page

### scrollToTop.js
	-this funtion allow to bring user from bottom of the page to top of the page.
