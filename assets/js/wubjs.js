// send mail js

function sendMail(contactForm) {
    console.log("reached");
    emailjs.send("lorneashley_gmail_com", "wub", {
        /*    "from_name": contactForm.name.value,
            "from_email": contactForm.emailaddress.value,*/
        "feature_request": contactForm.feature_request.value
    })
        .then(
            function (response) {
                console.log("SUCCESS", response);
                console.log("SUCCESS", response.status, response.text);
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    return false;
}

$("#test").click(function () {
    alert("reached")
});

// search lyrics js

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