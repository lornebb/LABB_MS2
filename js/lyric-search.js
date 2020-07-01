function searchLyrics(lyricSearch) {
fetch("https://shazam.p.rapidapi.com/search?locale=en-US&offset=0&limit=5&term=kiss%20the%20rain", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "shazam.p.rapidapi.com",
		"x-rapidapi-key": "15dac825ebmsh76a9e21a4637745p1a6c3bjsnb08d198023c0"
	}
})
.then(response => {
    console.log(response)
    console.log("it worked");
})
.catch(err => {
    console.log(err)
    console.log("try again stupid");
})};

