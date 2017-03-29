var Flickr = require("node-flickr");
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express().use(express.static(__dirname+'/'));

//parameters for flickr API
var key = {"api_key" : "209ad645579753faddda52110765128b" };
var flickr = new Flickr(key);
var apiURL = 'https://api.flickr.com/services/api/';
var tag = " ";
var location = " ";
var geo = "";

//parameters google maps api
var key = "AIzaSyBetfCXVVKo1iRZvq3vwmbVpLiReLpbm4A";

//set the app
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));

http.createServer( function (req, res){
	res.writeHead(200);
	res.end(__dirname + '../views/index.html');
});

//show the index page by default on the port 3000
app.get('/',function(req, res){
	res.sendFile(__dirname + '../views/index.html');
	res.render('index');
});

app.post('/post', function(req,res){
	initMap();
	//will bring the parameters location, tags, preferences for the research
	tag = req.body.tag;
	location = req.body.location;
	console.log(tag+" "+location);

	//call the function to search
	var resultSearch = tagSearch(tag);
	for(var i = 0; i< resultSearch.lenght ; i++){
		geo = getGeo(resultSearch[i].id);
	};


	/**function to create the itineraire
	 *Needs google api
	 */

	 res.render('views/index.html');
	 res.send(geo);
});

//var resultSearch = tagSearch("car");
//var resultGeo = getGeo(31930880093);

//Get the photo by tags
function tagSearch(tag){
	var resultTag = {
		"photos": { "page":0,"pages":0,"perpage":0, "total":0,
			"photo" : [
				{"id": "", "owner": "", "title":""}

			]},
		"stat" : ""
	};

	flickr.get("photos.search", {"tags":tag, "has_geo":1}, function(err,result){
		if (err) return console.error(err);
		//console.log(result);
		resultTag = result.photos.photo;

		//console.log(JSON.stringify(resultTag, null, 2));
	});
	return resultTag;
};

//Find the location parameter thank to the photo_id
//
function getGeo(photo_id){
	var resultGeo = {
		"photo" :
		{
			"id" : '',
			"location" : 
			{
				"latitude" : '',
				"longitude" : '',
				"locality" : ''
			},
			"stat" : ''
		}
	};

	flickr.get("photos.geo.getLocation", {"photo_id" : photo_id}, function(err,result){
		if (err) return console.error(err);
		resultGeo = {
		"photo" : 
		{
			"id" : result.photo.id,
			"location" : 
			{
				"latitude" : result.photo.location.latitude,
				"longitude" : result.photo.location.longitude,
				"locality" : result.photo.location.locality
			},
			"stat" : result.stat
		}
	};
		console.log(JSON.stringify(resultGeo, null, 2));
	});
	return resultGeo;
};

//function to initialize the maps
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}


console.log("port 3000 listening");
app.listen(3000);
//Search Photo according paramaters : location, tags, favorites
//Get the location of each one
//Create an object with the data in json file
//Use google maps to create a route