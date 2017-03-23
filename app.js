var Flickr = require("node-flickr");
var express = require('express');
var http = require('http');

//parameters for flickr API
var key = {"api_key" : "209ad645579753faddda52110765128b" };
var flickr = new Flickr(key);
var apiURL = 'https://api.flickr.com/services/api/';
var tag = "";
var location = "";

//set the app
app.set('port', process.env.PORT || 3000);

http.createServer( function (req, res){
	res.writeHead(200);
	res.end();
});

//show the index page by default on the port 3000
app.get('/',function(req, res){
	res.sendFile(__dirname + './index.html');
	res.render('index');
});

app.post('/post', function(req,res){
	//will bring the parameters location, tags, preferences for the research
	tag = req.body.tag;
	location = req.body.location;

	//call the function to search
	//function to create the itineraire
});


//Get the photo by tags
function tagSearch(tag){
	flickr.get("photos.search", {"tags":tag}, function(err,result){
		if (err) return console.error(err);
		console.log(result.photos);
	});
	return 0;
};

//Try to get photos by GeoData proprieties true
flickr.get("photos.geo.getLocation", {"photo_id" : photo_id}, function(err,result){
	if (err) return console.error(err);
	console.log(result);
});


//Search Photo according paramaters : location, tags, favorites
//Get the location of each one
//Create an object with the data in json file
//Use google maps to create a route