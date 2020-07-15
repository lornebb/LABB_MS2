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
});

// emailJS
$('#contact-form-submit').on('click', sendMail)

function sendMail(contactForm) {
    console.log("EmailJS - calling");
    emailjs.init("user_NLgvc4Mu5hpwy6V4uUBBn");
    let templateParams = {"feature_request": $('#feature-request').val()}
    emailjs.send("lorneashley_gmail_com", "wub", templateParams)
        .then(
            function (response) {
                console.log("SUCCESS - called, sent", response, response.status, response.text);
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    return false;
}

