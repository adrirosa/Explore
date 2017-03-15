var Flickr = require("node-flickr");
var key = {"api_key" : "209ad645579753faddda52110765128b" };

var flickr = new Flickr(key);


var apiURL = 'https://api.flickr.com/services/api/';

//Get the photo by tags
flickr.get("photos.search", {"tags":"flowers,yellow"}, function(err,result){
	if (err) return console.error(err);
	console.log(result.photos);
});

//Try to get photos by GeoData proprieties true
flickr.get("photos.getWithGeoData", {"privacy_filter": 1}, function(err,result){
	if (err) return console.error(err);
	console.log(result);
});


//Search Photo according paramaters : location, tags, favorites
//Get the location of each one
//Create an object with the data in json file
//Use google maps to create a route