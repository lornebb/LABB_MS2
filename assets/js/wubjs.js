// send mail js

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

// RANDOM GENERATORS SETUP
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

// RANDOM CHORD GENERATOR

// Cache DOM access.

$(document).ready(() => {
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
});

// Chord Chart generator

$(document).ready(() => {

    const chordSelectGtr = (chord) => {
        return `<ins class="scales_chords_api" chord="${chord}" instrument="guitar"></ins>`
    }

    const chordSelectPiano = (chord) => {
        return `<ins class="scales_chords_api" chord="${chord}" instrument="piano"></ins>`
    }

    const audioSelectGtr = (chord) => {
        return `<ins class="scales_chords_api" chord="${chord}" instrument="guitar" output="sound" name="guitar-clip"></ins>`
    }

    const audioSelectPiano = (chord) => {
        return `<ins class="scales_chords_api" chord="${chord}" instrument="piano" output="sound" name="guitar-clip"></ins>`
    }

    $("#chord-dropdown").on("change", function (e) {
        const newChord = e.target.value;
        const location = $("#gtr-insert");
        location.html(chordSelectGtr(newChord));
        scales_chords_api_onload();
    });

    $("#chord-dropdown").on("change", function (e) {
        const newChord = e.target.value;
        const location = $("#piano-insert");
        location.html(chordSelectPiano(newChord));
        scales_chords_api_onload();
    });

    $("#chord-dropdown").on("change", function (e) {
        const newChord = e.target.value;
        const location = $("#gtr-sound-insert");
        location.html(audioSelectGtr(newChord));
        scales_chords_api_onload();
    });

    $("#chord-dropdown").on("change", function (e) {
        const newChord = e.target.value;
        const location = $("#piano-sound-insert");
        location.html(audioSelectPiano(newChord));
        scales_chords_api_onload();
    });

    function scales_chords_api_onload() {
        var api_url = "https://www.scales-chords.com/api/scapi.1.3.php";
        if (typeof api_override_url !== 'undefined') {
            var api_url = api_override_url;
        }
        if (typeof scales_chords_api_debug === 'undefined') {
            var scales_chords_api_debug = false;
        }
        var x = document.getElementsByClassName("scales_chords_api");
        var obj_id_count = 1;
        if (scales_chords_api_debug) console.log(x);
        for (var i = 0; i < x.length; i++) {
            var params = "";
            var first = true;
            var obj = x[i];
            obj.id = "scapiobjid" + obj_id_count;
            obj_id_count += 1;
            var att = x[i].attributes;
            if (scales_chords_api_debug) console.log(x[i]);
            if (scales_chords_api_debug) console.log(att);
            if (scales_chords_api_debug) console.log(att.length);
            for (j = 0; j < att.length; j++) {
                if (scales_chords_api_debug) console.log(att[j]);
                if (scales_chords_api_debug) console.log("name: " + att[j].nodeName + " value: " + att[j].nodeValue);
                if (!first) params += "&";
                else params = "id=" + obj.id + "&";
                first = false;
                params += encodeURI(att[j].nodeName) + "=" + encodeURI(att[j].nodeValue);
            }
            if (scales_chords_api_debug) alert(params);
            ajaxCall(api_url, params, function (xmlhttp) {
                var myString = xmlhttp.responseText;
                var myStringArray = myString.split("###RAWR###");
                var objid = myStringArray[0];
                if (scales_chords_api_debug) {
                    document.getElementById(objid).innerHTML = "<!--" + mystring + "-->";
                    if (myStringArray[2].length > 0) document.getElementById(objid).innerHTML += myStringArray[2];
                } else {
                    if (myStringArray[2].length > 0)
                        document.getElementById(objid).innerHTML = myStringArray[2];
                }
            });
        }
    }

    function ajaxCall(url, params, successCallback, failCallback, ongoingCallback, cfg) {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (successCallback) {
                        successCallback(xhr);
                    }
                } else {
                    if (failCallback) {
                        failCallback(xhr);
                    }
                }
            } else {
                if (ongoingCallback) {
                    ongoingCallback(xhr);
                }
            }
        };
        var paramString = "";
        if (typeof params === "string")
            paramString = params;
        else
        if (params && typeof params === "object") {
            for (var p in params) {
                var pValue = params[p];
                if (typeof pValue === "string")
                    pValue = encodeURIComponent(pValue);
                paramString += "&" + p + "=" + pValue;
            }
            if (paramString.length > 0)
                paramString = paramString.substring(1);
        }
        xhr.open("POST", url, true);
        if (cfg) {
            if (cfg.options) {
                for (var o in cfg.options) {
                    if (o in xhr)
                        xhr[o] = cfg.options[o];
                }
            }
            if (cfg.headers) {
                for (var h in cfg.headers) {
                    xhr.setRequestHeader(h, cfg.headers[h]);
                }
            }
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(paramString);
    }
});

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
        .then($("#search-loading").css("display", "block"))
        .then(response => response.json())
        .then(data => {
            $('#results-below-box-show').css("display", "block")
            $("#search-loading").css("display", "none")
            $("#search-results-section").css("display", "block")
            console.log(data)
            var artistResult = data.tracks.hits[0].track
            var lyricResultLink = data.tracks.hits[0].track.share.html
            $('#artist-result').val(`${artistResult.subtitle}`)
            $('#track-result').val(`${artistResult.title}`)
            // $("#lyric-link").find("href").attr("href", lyricResultLink)
            console.log(lyricResultLink)
            $(".put-result-link-here").html(`<a href="${lyricResultLink}" target="_blank"> <input type="button" id="lyric-link"  name="link-res" value="Lyric Link Result"> ></a>`)
        })
        .catch(err => {
            $('#something-went-wrong-box-hide').css("display", "block")
            $("#search-loading").css("display", "none")
            console.log(err)
        })
};

$('#lyric-search-form').submit(function (e) {
    e.preventDefault();
    $("#search-loading").toggle();
    let searchValue = $('#lyric-search-box').val()
    searchLyrics(searchValue);
});

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
    $('.gtr-hide').css("display", "block")
    $('.chord-sound-gtr').css("display", "block")
    $('.piano-hide').css("display", "none")
    $('.chord-sound-piano').css("display", "none")
});

$('#piano-button').click(function () {
    $('.piano-hide').css("display", "block")
    $('.chord-sound-piano').css("display", "block")
    $('.gtr-hide').css("display", "none")
    $('.chord-sound-gtr').css("display", "none")
});