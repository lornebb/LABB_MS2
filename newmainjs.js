// section toggles
$(document).ready(function () {
    $('#chord-section').hide();
    $('#lyric-section').hide();
    $('#chords-section-button').on('click', function () {
        $('#home-section').hide();
        $('#chord-section').show();
    });
    $('#lyric-section-button').on('click', function () {
        $('#lyric-section').show();
        $('#home-section').hide();
        $('#chord-section').hide();
    });
    $('.back').on('click', function () {
        $('#home-section').show();
        $('#chord-section').hide();
        $('#lyric-section').hide();
    });
    $("#lyric-search-results").hide();
    $("#lyric-search-loading").hide();
    $("#contact-form-confirmation").hide();
});

// emailJS API
$('#contact-form-submit').on('click', sendMail)

function sendMail() {
    console.log("EmailJS - calling");
    emailjs.init("user_NLgvc4Mu5hpwy6V4uUBBn");
    let templateParams = {
        "feature_request": $('#feature-request').val()
    }
    emailjs.send("lorneashley_gmail_com", "wub", templateParams)
        .then(
            function (response) {
                console.log("SUCCESS - called, sent", response, response.status, response.text);
                $("#contact-form-confirmation").show()
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    return false;
}

// Lyric Search - Shazam API

$("#lyric-form-submit").on('click', searchLyrics)

function searchLyrics(searchValue) {
    $("#lyric-search-loading").show()
    fetch(`https://shazam.p.rapidapi.com/search?locale=en-US&offset=0&limit=5&term=${searchValue}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "shazam.p.rapidapi.com",
                "x-rapidapi-key": "15dac825ebmsh76a9e21a4637745p1a6c3bjsnb08d198023c0",
            }
        })
        .then(response => response.json()
            .then(data => {
                $('#lyric-search-loading').hide()
                $('#lyric-search-results').show()
                console.log(data)
                let artistResult = data.tracks.hits[0].track
                let lyricResultLink = data.tracks.hits[0].track.share.html
                $('#artist-fill').html(`${artistResult.subtitle}`)
                $('#song-fill').html(`${artistResult.title}`)
                console.log(lyricResultLink)
                $("#lyric-search-link").attr("href", `${lyricResultLink}`)
            })
            .catch(err => {
                $('#something-went-wrong-box-hide').css("display", "block")
                $("#search-loading").css("display", "none")
                console.log(err)
            }))
};

// captcha
function onSubmitCaptcha(token) {
    document.getElementById("contact-form-submit").submit();
};