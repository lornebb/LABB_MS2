const chordSectionREF = $('#chord-section');
const lyricSectionREF = $('#lyric-section');
const homeSectionREF = $('#home-section');
const chordRootREF = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const chordQualityREF = ['', 'm', 'dim', '+'];
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

/** 
 * emailJS API - when submit on contact form is sent, 
 * EmailJS API is used to send the email to the developer directly 
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

/**  
* Google reCaptcha makes sure no automated programs can send email through this.
*/
function onSubmit(token) {
    document.getElementById("contact-form-submit").submit();
}

/** 
 * Chord Generator - modified from Scraggos Music Tools - reference in README.
 * A random chord and quality is created this function. To make sure 
 * no unnatural flats are used, the replaceObj function transposes them back to neutral. 
 */
function chordGenerator(chordNumber) {
    let chordProgression = '';
    for (let i = 0; i < chordNumber; i++) {
        let randomRoot = randomChoice(chordRootREF);
        let randomQuality = randomChoice(chordQualityREF);
        let chord = randomRoot + randomQuality;
        if (chord in replaceObjREF) {
            chord = replaceObjREF[chord];
        }
        chordProgression += chord + ((i < chordNumber - 1) ? " | " : "");
    }
    return chordProgression;
}

/** 
 * This takes the users chord amount selection from the dropdown, creates a
 * result containing the generation in the amounts requested
 * of those chords, clearing it on every refresh.
 */
function randomChords() {
    $("#chord-gen-box").show();
    $("#Random-CP-title").html("");
    $("#Random-CP").html("");
    let noOfChords = $("#chord-amount-selector");
    let chordNumber = Number(noOfChords.val());
    let noProgressions = $("#progression-amount-selector");
    let progressionNumber = Number(noProgressions.val());
    if (chordNumber < 1) {
        chordNumber = 1;
    }
    if (chordNumber > 16) {
        chordNumber = 16;
    }
    if (progressionNumber < 1) {
        progressionNumber = 5;
    }
    if (progressionNumber > 50) {
        progressionNumber = 50;
    }
    let titleOutput = `<div> ${progressionNumber} Random Progressions of ${chordNumber} Chords </div>`;
    let output = "";
    for (let i = 1; i <= progressionNumber; i++) {
        output += `<div class="chord-gen-number">${i}.` + ((i < 10) ? "\xa0\xa0\xa0" : "\xa0\xa0"
            `</div>`);
        output += `<div class="chord-gen-font">${chordGenerator(chordNumber)}</div>`;
    }
    $("#Random-CP-title").append(titleOutput);
    $("#Random-CP").append(output);
}

/** 
 * This creates the amount of each chord and progression requested 
*/
function randomChoice(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

$("#generate-random-ChP").on("click", randomChords);

/**
 * Submit the lyric search term to the Shazam API 
 */
$("#lyric-form").submit(function (e) {
    e.preventDefault();
    let searchValue = $('#lyric-search-value').val();
    searchLyrics(searchValue);
});

/**  
 * Lyric Search - Shazam API
 * When user submits lyrics to be searched, Shazam API searches its database for matches.
 */
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
