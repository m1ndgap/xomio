/* Text slider */
$(document).ready(function(){
    let $textSlider = $('[data-slider="text-slider"]');

    $textSlider.slick({
        dots: true,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 5000,
    });

    $(window).on('orientationchange resize', function() {
        $textSlider.slick('resize');
    });
});