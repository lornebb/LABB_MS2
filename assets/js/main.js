const chordSectionREF = $('#chord-section');
const lyricSectionREF = $('#lyric-section');
const homeSectionREF = $('#home-section');
const chRootREF = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const chQualityREF = ['', 'm', 'dim', '+'];
const replaceObjREF = {
    'Ebdim': 'D#dim',
    'Abdim': 'G#dim',
    'Bbdim': 'A#dim'
};

// section toggles and doc.ready generator scripts 

$(document).ready(function () {
    // When Chord Section button is selected, it hides the other section elements
    $('#chords-section-button').on('click', function () {
        homeSectionREF.hide();
        chordSectionREF.show();
        $("#chord-gen-box").hide();
    });
    // When Lyric Section button is selected, it hides the other section elements
    $('#lyric-section-button').on('click', function () {
        lyricSectionREF.show();
        homeSectionREF.hide();
        chordSectionREF.hide();
    });
    // When Back button is selected, it hides the other section elements
    $('.back').on('click', function () {
        homeSectionREF.show();
        chordSectionREF.hide();
        lyricSectionREF.hide();
    });
    // when DOM is loaded, only the Home section shows
    $("#lyric-search-results").hide();
    $("#lyric-search-loading").hide();
    $("#contact-form-confirmation").hide();
});


$('#contact-form-submit').on('click', sendMail);

/** emailJS API - when submit on contact form is sent, 
 * EmailJS API is used to contact developer directly 
 * */ 
function sendMail() {
    console.log("EmailJS - calling");
    emailjs.init("user_NLgvc4Mu5hpwy6V4uUBBn");
    let templateParams = {
        "feature_request": $('#feature-request').val()
    };
    emailjs.send("lorneashley_gmail_com", "wub", templateParams)
        .then(
            function (response) {
                console.log("SUCCESS - called, sent", response, response.status, response.text);
                $("#contact-form-confirmation").show();
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    return false;
}

/** Chord Generator - modified from Scraggos Music Tools - reference in README.
 A random chord and quality is created with chordGenerator() and to make sure 
 no b / flats are used, the replaceObj function transposes them. 
*/

function chordGenerator(chNum) {
    let chProg = '';
    for (let i = 0; i < chNum; i++) {
        let randRoot = randomChoice(chRootREF);
        let randQuality = randomChoice(chQualityREF);
        let chord = randRoot + randQuality;
        if (chord in replaceObjREF) {
            chord = replaceObjREF[chord];
        }
        chProg += chord + ((i < chNum - 1) ? " | " : "");
    }
    return chProg;
}

/** randomChords() takes the users amount selection from the dropdown, and returns 
 * a div template literal containing what the user selected and the generation
 * of those chords, clearing it on every refresh.
 */
function randomChords() {
    $("#chord-gen-box").show();
    $("#Random-CP-title").html("");
    $("#Random-CP").html("");
    let noChords = $("#chord-amount-selector");
    let chNum = Number(noChords.val());
    let noProgressions = $("#progression-amount-selector");
    let progNum = Number(noProgressions.val());
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
    let titleOutput = `<div> ${progNum} Random Progressions of ${chNum} Chords </div>`;
    let output = "";
    for (let i = 1; i <= progNum; i++) {
        output += `<div class="chord-gen-number">${i}.` + ((i < 10) ? "\xa0\xa0\xa0" : "\xa0\xa0"
            `</div>`);
        output += `<div class="chord-gen-font">${chordGenerator(chNum)}</div>`;
    }
    $("#Random-CP-title").append(titleOutput);
    $("#Random-CP").append(output);
}

// randomChoice() cycles through the array using JS Math function.
function randomChoice(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

$("#generate-random-ChP").on("click", randomChords);

/**  Lyric Search - Shazam API
 * When user submits lyrics, Shazam API is called.
 */
$("#lyric-form").submit(function (e) {
    e.preventDefault();
    let searchValue = $('#lyric-search-value').val();
    searchLyrics(searchValue);
});

function searchLyrics(searchValue) {
    $("#lyric-search-loading").show();
    fetch(`https://shazam.p.rapidapi.com/search?locale=en-US&offset=0&limit=5&term=${searchValue}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "shazam.p.rapidapi.com",
                "x-rapidapi-key": "15dac825ebmsh76a9e21a4637745p1a6c3bjsnb08d198023c0",
            }
        })
        .then(response => response.json())
        .then(data => {
            $('#lyric-search-loading').hide();
            $('#lyric-search-results').show();
            let artistResult = data.tracks.hits[0].track;
            let lyricResultLink = data.tracks.hits[0].track.share.html;
            $('#artist-fill').html(`${artistResult.subtitle}`);
            $('#song-fill').html(`${artistResult.title}`);
            $("#lyric-search-link").attr("href", `${lyricResultLink}`);
        })
        .catch(err => {
            $('#something-went-wrong-box-hide').show();
            $("#search-loading").hide();
            console.log(err);
        });
}

function onSubmitCaptcha(token) {
    document.getElementById("contact-form-submit").submit();
}