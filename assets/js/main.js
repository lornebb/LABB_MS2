const chordSectionRef = $('#chord-section');
const lyricSectionRef = $('#lyric-section');
const homeSectionRef = $('#home-section');
const chordRootRef = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const chordQualityRef = ['', 'm', 'dim', '+'];
const replaceObjRef = {
    'Ebdim': 'D#dim',
    'Abdim': 'G#dim',
    'Bbdim': 'A#dim'
};
const contactFormSubmit = $('#contact-form-submit');
const lyricSearchLoading = $('#lyric-search-loading');
const lyricSearchResults = $('#lyric-search-results');

// section toggles and doc.ready generator scripts 

$(document).ready(function () {
    // When Chord Section button is selected, it hides the other section elements
    $('#chords-section-button').on('click', function () {
        homeSectionRef.hide();
        chordSectionRef.show();
        $("#chord-gen-box").hide();
    });
    // When Lyric Section button is selected, it hides the other section elements
    $('#lyric-section-button').on('click', function () {
        lyricSectionRef.show();
        homeSectionRef.hide();
        chordSectionRef.hide();
    });
    // When Back button is selected, it hides the other section elements
    $('.back').on('click', function () {
        homeSectionRef.show();
        chordSectionRef.hide();
        lyricSectionRef.hide();
    });
    // when DOM is loaded, only the Home section shows
    $("#lyric-search-results").hide();
    $("#lyric-search-loading").hide();
    $("#contact-form-confirmation").hide();
    $('#contact-form-fail').hide();
    $('#something-went-wrong-box').hide();
});

$('#contact-form-submit').click(function(){
    if($('#feature-request').val() == ''){
        $('#contact-form-fail').show();
    }
    else {
        $('#contact-form-fail').hide();
        sendMail();
        return false;
    }
 });

/** 
 * emailJS API - when submit on contact form is sent, 
 * EmailJS API is used to send the email to the developer directly 
 * */
function sendMail() {
    console.log("EmailJS - calling");
    emailjs.init("user_NLgvc4Mu5hpwy6V4uUBBn");
    const templateParams = {
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
 * Chord Generator - modified from Scraggos Music Tools - reference in README.
 * A random chord and quality is created this function. To make sure 
 * no unnatural flats are used, the replaceObj function transposes them back to neutral. 
 */
function chordGenerator(chordNumber) {
    let chordProgression = '';
    for (let i = 0; i < chordNumber; i++) {
        let randomRoot = randomChoice(chordRootRef);
        let randomQuality = randomChoice(chordQualityRef);
        let chord = randomRoot + randomQuality;
        if (chord in replaceObjRef) {
            chord = replaceObjRef[chord];
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
            distLyrics(data);
        })
        .catch(err => {
            $("#search-loading").hide();
            $('#something-went-wrong-box').show();
            $('#lyric-results-box').hide();
            $('.lyric-results-text').hide();
            console.log(err);
        });
}

function distLyrics(data){
    lyricSearchLoading.hide();
    lyricSearchResults.show();
    let artistResult = data.tracks.hits[0].track;
    let lyricResultLink = data.tracks.hits[0].track.share.html;
    $('#artist-fill').html(`${artistResult.subtitle}`);
    $('#song-fill').html(`${artistResult.title}`);
    $("#lyric-search-link").attr("href", `${lyricResultLink}`);
}