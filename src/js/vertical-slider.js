/* Vertical slider */
$(document).ready(function(){
    let $verticalSliders = $('[data-slider="vertical-slider"]');

    $verticalSliders.each(function(index, slider) {
        let $slider = $(slider);
        let $sliderParent = $slider.closest('[data-slider-parent]');
        let $sliderNav = $sliderParent.find('[data-slider="slider-nav"]');
        let maxHeight = -1;

        $slider.on('init', function(event, slick, currentSlide) {
            let $slider = $(slider);
            let $slides = $slider.find('.slick-slide');

            let tallestSlide = Math.max.apply(Math, $slides.map(function(index, el) {
                return $(el)[0].scrollHeight;
            }));

            $slides.css('height', tallestSlide + 'px');
        });

        $slider.slick({
            vertical: true,
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
        }).on('afterChange', function(event, slick, currentSlide){
            let $currentSlideEl = $(slick.$slides.get(currentSlide));

            if ($currentSlideEl.find('video').length > 0) {
                let video = $currentSlideEl.find('video')[0];
                video.pause();
                video.currentTime = 0;
                video.play();
            }
        });

        $(window).on('orientationchange resize', function() {
            $slider.slick('resize');
            $sliderNav.slick('resize');
        });
    });
});