
$(document).ready(function () {
    console.log("new page load")
});

// test button for linked file

$("#test").click(function () {
    alert("reached")
});


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


// search lyrics js

function searchLyrics(searchValue) {
    fetch(`https://shazam.p.rapidapi.com/search?locale=en-US&offset=0&limit=5&term=${searchValue}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "shazam.p.rapidapi.com",
                "x-rapidapi-key": "15dac825ebmsh76a9e21a4637745p1a6c3bjsnb08d198023c0",
                "access-control-allow-credentials": "true",
                "access-control-allow-headers": "ver",
                "access-control-allow-methods": "GET, POST",
                "access-control-allow-origin": "*",
                "server": "RapidAPI-1.1.15",
                "x-rapidapi-region": "AWS - eu-central-1",
                "x-rapidapi-version": "1.1.15",
                "transfer-encoding": "chunked",
                "connection": "Close"
            }
        })
        .then(response => response.json())
        .then(data => {
            $('#results-below-box-show').css("display", "block") 
            console.log(data)
        })
        .catch(err => {
            console.log("try again stupid");
            $('#something-went-wrong-box-hide').css("display", "block")            
            console.log(err)
        })
};

// var x = $("#lyric-search-box").val(); //takes value (.val) from html ID searchInput eg: fairground

// searchLyrics(x); // in brackets is the string from above determined as searchInput. searchLyrics(Fairground);  

$('#lyric-search-form').submit(function (e) { 
    e.preventDefault();
    let searchValue = $('#lyric-search-box').val()
    searchLyrics(searchValue);
});

console.log("end of js script")