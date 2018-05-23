

//--------------- Page Loading Items --------------
$(".overlay").css('display', 'block');
$(".loading").css('display', 'block');

function loaded() {
    $(".overlay").fadeOut(200);
    $(".loading").fadeOut(200);
    $(".custom-container").css('visibility','visible').hide().fadeIn(200);
}

//-------------- Close Any Modal --------------------
function closeModal() {
    $(".overlay").fadeOut(200);
    $(".custom-modal").fadeOut(200);
}
$(document).keydown(function(e) {
    if (e.keyCode == 27) { closeModal() }
});
$(".close-overlay").on("click", function () {
    closeModal();
});