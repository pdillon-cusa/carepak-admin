//--------------- Page Loading Items --------------
$(".overlay").css('display', 'block');
$(".loading").css('display', 'block');

function loaded() {
    $(".overlay").fadeOut(200);
    $(".loading").fadeOut(200);
    $(".custom-container").css('visibility','visible').hide().fadeIn(200);
}