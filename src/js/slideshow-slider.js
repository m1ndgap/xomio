/* Slideshow slider */
$(document).ready(function(){
    let $slideshow = $('[data-slider="slideshow"]');

    $slideshow.slick({
        fade: true,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2500,
    });

    $(window).on('orientationchange resize', function() {
        $slideshow.slick('resize');
    });
});