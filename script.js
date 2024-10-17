$(document).ready(function() {
    function a(b) {
        $("html, body").animate({
            scrollTop: b
        }, 1000)
    }
    setTimeout(a($(document).height()), 2000);
    $(".btn").on("click", function() {
        $(this).closest(".step").hide().next(".step").fadeIn();
        a(200)
    });
    $(".option").on("click", function() {
        $(this).toggleClass("checked tr-selected")
    })
});