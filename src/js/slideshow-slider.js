/* Slideshow slider */
$(document).ready(function(){
    let $slideshows = $('[data-slider="slideshow"]');

    $slideshows.each(function(index, slider) {
        let $slider = $(slider);
        let sliderAutoplaySpeed = +$slider.attr('data-autoplay-speed') || 2500;
        let sliderDots = false;

        if ($slider.attr('data-dots')) {
            sliderDots = true;
        }

        $slider.slick({
            infinite: true,
            arrows: false,
            dots: sliderDots,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: sliderAutoplaySpeed,
            pauseOnHover: false,
        });

        $(window).on('orientationchange resize', function() {
            $slider.slick('resize');
        });
    });
});