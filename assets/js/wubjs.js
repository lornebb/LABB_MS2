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


// ===========================
// 2. RANDOM MELODY GENERATOR
// ===========================

//FORM VARIABLES - ID
let numNotesEl = document.getElementById("noNotesMelody");
let numMelodiesEl = document.getElementById("noMelodies");
let generateButtonRandomMelody = document.getElementById("generateRandomMelody");
//global
let direction = ["↑", "↓"];

function melody_d(notes) {
    /*Creates a random diatonic melody as such: ↑1 ↑3 ↑5 ↓7 ↑1 ↑2 ↓4 ↓6
      notes is an integer, how many melody notes you"d like.*/
    var melody = "";
    //generate string as such:
    // ↓6 ↑1 ↓3 ↓7 ↑4 ↑7 ↑1 ↑3 
    for (var x = 0; x < notes; x++) {
        //direction
        var randDirection = randomChoice(direction);
        // melody note = 
        var diatonic7 = getRandomInt(1, 7);
        melody += `${randDirection}${diatonic7} `;
    }
    return melody;
}

function melody_c(notes) {
    /*Creates a random chromatic melody as such: ↑C ↑D ↑Eb ↓F ↑G ↑C# ↓Bb ↓A
    notes is an integer, how many melody notes you"d like.
    */
    var ch_root = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", ];
    var melody = "";
    for (var x = 0; x < notes; x++) {
        // direction
        var randDirection = randomChoice(direction);
        // get melody note
        var chromatic12 = randomChoice(ch_root);
        melody += `${randDirection}${chromatic12} `;
    }
    return melody;
}

function createDiatonicMelody(numNotes, numMelodies) {
    var dMelody = "<ol>";
    for (var x = 0; x < numMelodies; x++) {
        dMelody += `<li>${melody_d(numNotes)}</li>`;
    }
    dMelody += "</ol>"
    return dMelody;
}

function createChromaticMelody(numNotes, numMelodies) {
    var cMelody = "<ol>";
    for (var x = 0; x < numMelodies; x++) {
        cMelody += `<li>${melody_c(numNotes)}</li>`;
    }
    cMelody += "</ol>"
    return cMelody;
}

function createMelodies() {
    let numNotes = numNotesEl.value;
    let numMelodies = numMelodiesEl.value;
    if (numNotes < 3) {
        numNotes = 3;
    } else if (numNotes > 30) {
        numNotes = 30;
    }
    if (numMelodies < 1) {
        numMelodies = 1;
    } else if (numMelodies > 30) {
        numMelodies = 30;
    }
    document.getElementById("titleDiatonicMelody").innerHTML = `${numMelodies} Random Diatonic Melodies of ${numNotes} Notes`;
    document.getElementById("functionDiatonicMelody").innerHTML = createDiatonicMelody(numNotes, numMelodies);
    document.getElementById("titleChromaticMelody").innerHTML = `${numMelodies} Random Chromatic Melodies of ${numNotes} Notes`;
    document.getElementById("functionChromaticMelody").innerHTML = createChromaticMelody(numNotes, numMelodies);
}

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

function showGtrChords() {
    let chordName = document.getElementById("chordName")
    console.log(chordName.value)
    //$("#scales_chords_api").find("chord").attr("chord", `${chordName}`)
    document.getElementById('container').insertAdjacentHTML('beforeend', '<div id="idChild"> content html </div>');
};

// function chordGenerator(chNum) {
//     let replaceObj = {
//         'Ebdim': 'D#dim',
//         'Abdim': 'G#dim',
//         'Bbdim': 'A#dim'
//     };
//     let chRoot = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
//     let chQuality = ['', 'm', 'dim', '+'];
//     let chProg = '';
//     for (let i = 0; i < chNum; i++) {
//         let randRoot = randomChoice(chRoot);
//         let randQuality = randomChoice(chQuality);
//         let chord = randRoot + randQuality;
//         if (chord in replaceObj) {
//             chord = replaceObj[chord];
//         }
//         chProg += chord + ((i < chNum - 1) ? " | " : "");
//     }
//     return chProg;
// }

// function randomChords() {
//     let chNum = Number(noChords.value);
//     let progNum = Number(noProgressions.value);
//     if (chNum < 1) {
//         chNum = 1;
//     }
//     if (chNum > 16) {
//         chNum = 16;
//     }
//     if (progNum < 1) {
//         progNum = 5;
//     }
//     if (progNum > 50) {
//         progNum = 50;
//     }
//     let titleOutput = `${progNum} Random Progressions of ${chNum} Chords`;
//     let output = "";
//     for (let i = 1; i <= progNum; i++) {
//         output += `${i}.` + ((i < 10) ? "\xa0\xa0\xa0" : "\xa0\xa0");
//         output += `${chordGenerator(chNum)}<br>`;
//     }
//     document.getElementById("titleRandomCP").innerHTML = titleOutput;
//     document.getElementById("functionRandomCP").innerHTML = output;
// }

// generateButtonRandomCP.addEventListener("click", randomChords);

// console.log(fullChordName);

// change chord name 
//


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
