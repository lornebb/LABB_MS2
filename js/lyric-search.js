var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://shazam.p.rapidapi.com/search?locale=en-US&offset=0&limit=5&term=endicott",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "shazam.p.rapidapi.com",
		"x-rapidapi-key": "15dac825ebmsh76a9e21a4637745p1a6c3bjsnb08d198023c0"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});

