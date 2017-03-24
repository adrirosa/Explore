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

//set the app
app.set('port', process.env.PORT || 3000);

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
	//will bring the parameters location, tags, preferences for the research
	tag = req.body.tag;
	location = req.body.location;

	console.log(tag+" "+location);
	//call the function to search



	/**function to create the itineraire
	 *Needs google api
	 */
});
var resultGeo = getGeo(31930880093);
var resultSearch = tagSearch("car");


//var resultSearch = tagSearch('river');
//console.log(resultSearch);

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
		resultTag = {
		"photos": { 
			"page":result.photos.page,
			"pages":result.photos.pages,
			"perpage": result.photos.perpage, 
			"total": result.photos.total,
			"photo" : [
				{"id": result.photos.photo.id, "owner": result.photos.photo.owner , "title":result.photos.photo.title}
			]},
		"stat" : result.stat
	};
		//need to fix the [object object] in the list
		console.log(resultTag);
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
		//need to fix the locality, return [object object]
		console.log(resultGeo);
	});
	return resultGeo;
};

console.log("port 3000 listening");
app.listen(3000);
//Search Photo according paramaters : location, tags, favorites
//Get the location of each one
//Create an object with the data in json file
//Use google maps to create a route