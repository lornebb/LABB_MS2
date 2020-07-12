// send mail js
// 

(function () {
    emailjs.init("user_NLgvc4Mu5hpwy6V4uUBBn");
})();

function sendMail(contactForm) {
    console.log("reached");
    emailjs.send("lorneashley_gmail_com", "wub", {
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

// chord and melody generator js 
// CREDIT - Scraggo's Music Tools - https://codepen.io/scraggo/pen/JNveOq?editors=0110 /

// ========================
// RANDOM GENERATORS SETUP
// ========================


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**Returns a random integer between min (inclusive) and max (inclusive)
 Using Math.round() will give you a non-uniform distribution!*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random choice of element from array
function randomChoice(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

// =========================
// 1. RANDOM CHORD GENERATOR
// =========================

// Cache DOM access.
let noChords = document.getElementById("noChords");
let noProgressions = document.getElementById("noProgressions");
let generateButtonRandomCP = document.getElementById("generateRandomCP");

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
    let chNum = Number(noChords.value);
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
    document.getElementById("titleRandomCP").innerHTML = titleOutput;
    document.getElementById("functionRandomCP").innerHTML = output;
}

generateButtonRandomCP.addEventListener("click", randomChords);

// search lyrics and show results js 

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
            var artistResult = data.tracks.hits[0].track
            // console.log("artist:", data.tracks.hits[0].track.subtitle)
            // console.log("track:", data.tracks.hits[0].track.title)
            // console.log("link", data.tracks.hits[0].track.share.html)
            var lyricResultLink = data.tracks.hits[0].track.share.html
            // console.log("did it work?", lyricResultLink)
            $('#artist-result').val(`${artistResult.subtitle}`)
            $('#track-result').val(`${artistResult.title}`)
            //  $('#lyric-link').attr("href", `${artistResult.track.share.html}`)
            $("#lyric-link").find("href").attr("href", `${lyricResultLink}`);
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

// Chord chart 

function returnChordsToHtml() {
    let chordName = document.getElementById("chordName")
    return chordName;
}

function showGtrChords() {
    let chordName = document.getElementById("chordName")
    console.log(chordName.value)
    let chRoot = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
    let chQuality = ['', 'm', 'dim', '+'];
    //$("#scales_chords_api").find("chord").attr("chord", `${chordName}`)
    // var test = $(chordName).val();
    // console.log(test)
    if (chordName !== chRoot || chordName !== chQuality) {
        fetch(``)


        // <ins class="scales_chords_api" chord="${chordName}" instrument="guitar" width="390px;" height="200px;"></ins>
        document.getElementById('gtr-insert').insertAdjacentHTML('beforeend', ``);
    } else {
        console.log("gtr choord search did not work")
        document.getElementById('gtr-insert').insertAdjacentHTML('beforeend', `<h6 class="small-text"> Your search for ${chordName} did not return anything, try a less specific syntax." </h6>`);
    };
};

function showPianoChords() {
    let chordName = document.getElementById("chordName")
    console.log(chordName.value)
    let chRoot = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
    let chQuality = ['', 'm', 'dim', '+'];
    if (chordName !== chRoot || chordName !== chQuality) {
        document.getElementById('piano-insert').insertAdjacentHTML('beforeend', `<ins class="scales_chords_api" chord="${chordName}" instrument="piano" width="390px;" height="200px;"></ins>`);
    } else {
        console.log("gtr choord search did not work")
        document.getElementById('piano-insert').insertAdjacentHTML('beforeend', `<h6 class="small-text"> Your search for ${chordName} did not return anything, try a less specific syntax." </h6>`);
    };
}

// Section button hide and show / toggle

$('#chords-and-melody-section-btn').click(function () {
    $('#chords-and-melody-section').toggle()
    $('#home-section').toggle()
});

$('#writing-section-btn').click(function () {
    $('#writing-section').toggle()
    $('#home-section').toggle()
});

$('#lyric-search-btn').click(function () {
    $('#lyric-section').toggle()
    $('#home-section').toggle()
});

$('#gtr-button').click(function () {
    $('.chord-sound-gtr').toggle()
});

$('#piano-button').click(function () {
    $('.chord-sound-piano').toggle()
});
