$(document).ready(function () {
    //thank you W3school for this function for scrolling//
    console.log("new page load")
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
    };
});

// test button for linked file - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

$("#test").click(function () {
    alert("reached")
});

// send mail js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

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

// search lyrics js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

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

$('#lyric-search-form').submit(function (e) {
    e.preventDefault();
    let searchValue = $('#lyric-search-box').val()
    searchLyrics(searchValue);
});

// Section button hide and show / toggle - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// function toggleHomeView() {
//     var pageName = document.getElementById('home-section');
//     if (pageName.style.display === "none") {
//         pageName.style.display = "block";
//     } else {
//         pageName.display = "none";
//     }
// }



$( '#chords-and-melody-section-btn' ).click(function() {
    $( '#chords-and-melody-section' ).toggle()
    $( '#home-section' ).toggle()
});

$( '#writing-section-btn' ).click(function() {
    $( '#writing-section' ).toggle()
    $( '#home-section' ).toggle()
});

$( '#lyric-search-btn' ).click(function() {
    $( '#lyric-section' ).toggle()
    $( '#home-section' ).toggle()
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

console.log("end of js script")