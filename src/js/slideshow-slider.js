/* Slideshow slider */
$(document).ready(function(){
    let $slideshow = $('[data-slider="slideshow"]');

    $slideshow.slick({
        infinite: true,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: false,
    });

    $(window).on('orientationchange resize', function() {
        $slideshow.slick('resize');
    });
});