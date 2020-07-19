// section toggles and doc.ready generator scripts
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

// Chord Generator
// only one doc.ready script in the whole document? - ask simen.

let noChords = $("#chord-amount-selector")
let noProgressions = $("#progression-amount-selector")
let generateButtonRandomChP = $("#generate-random-ChP");

function chordGenerator(chNum) {
    let replaceObj = {
        'Ebdim': 'D#dim',
        'Abdim': 'G#dim',
        'Bbdim': 'A#dim'
    };
    let chRoot = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
    let chQuality = ['', 'm', 'dim', '+'];
    let chProg = '';
    for (let i = 0; i < chNum; i++) {
        let randRoot = randomChoice(chRoot);
        let randQuality = randomChoice(chQuality);
        let chord = randRoot + randQuality;
        if (chord in replaceObj) {
            chord = replaceObj[chord];
        }
        chProg += chord + ((i < chNum - 1) ? " | " : "");
    }
    return chProg;
}

function randomChords() {
    console.log(noChords.value)
    let chNum = Number(noChords.value);
    console.log("2nd call" + noChords.value)
    let progNum = Number(noProgressions.value);
    if (chNum < 1) {
        chNum = 1;
    }
    if (chNum > 16) {
        chNum = 16;
    }
    if (progNum < 1) {
        progNum = 5;
    }
    if (progNum > 50) {
        progNum = 50;
    }
    let titleOutput = `${progNum} Random Progressions of ${chNum} Chords`;
    let output = "";
    for (let i = 1; i <= progNum; i++) {
        output += `${i}.` + ((i < 10) ? "\xa0\xa0\xa0" : "\xa0\xa0");
        output += `${chordGenerator(chNum)}<br>`;
    }
    $("#titleRandomCP").innerHTML = titleOutput;
    $("#functionRandomCP").innerHTML = output;
}

generateButtonRandomChP.on("click", randomChords);



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

// reCAPTCHA
// function onSubmitCaptcha(token) {
//     document.getElementById("contact-form-submit").submit();
// };