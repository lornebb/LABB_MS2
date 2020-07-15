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