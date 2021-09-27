/* Common slider */
$(document).ready(function(){
    let $sliders = $('[data-slider="slider"]');

    $sliders.each(function(index, slider) {
        let $slider = $(slider);
        let $sliderParent = $slider.closest('[data-slider-parent]');
        let $sliderNav = $sliderParent.find('[data-slider="slider-nav"]');

        $slider.slick({
            dots: true,
            arrows: false,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 5000,
            asNavFor: $sliderNav
        });

        $sliderNav.slick({
          arrows: false,
          fade: true
        });

        $(window).on('orientationchange resize', function() {
            $slider.slick('resize');
            $sliderNav.slick('resize');
        });
    });
});