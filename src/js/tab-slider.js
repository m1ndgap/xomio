/* Tab slider */
$(document).ready(function(){
    let $tabSliders = $('[data-slider="tab"]');

    $tabSliders.each(function(index, slider) {
        let $tabSlider = $(slider);
        let $sliderParent = $tabSlider.closest('[data-slider-parent]');
        let $tabProgress = $sliderParent.find('[data-element="tab-progress"]');

        $tabSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            setProgress(nextSlide);
        });

        $tabSlider.slick({
            arrows: false,
            fade: true,
            autoplay: true,
            autoplaySpeed: 3500,
            responsive: [
                {
                    breakpoint: bpLG,
                    settings: 'unslick'
                },
            ]
        });

        tabProgressSize($tabSlider, $sliderParent, $tabProgress);
        setProgress(0);

        $(window).on('orientationchange resize', function() {
            $tabSlider.slick('resize');

            tabProgressSize($tabSlider, $sliderParent, $tabProgress);
            setProgress(0);
        });

        function tabProgressSize(slider, sliderParent, tabProgressEl) {
            let $triggers = sliderParent.find('[data-element="tab-item"]');
            let triggersHeight = 0;

            for (let i = 0; i < $triggers.length - 1; i++) {
                triggersHeight = triggersHeight + $($triggers[i]).outerHeight();
            }

            tabProgressEl.css('height', triggersHeight + 'px');
        }

        function setProgress(index) {
            const calc = ((index + 1) / ($tabSlider.slick('getSlick').slideCount)) * 100;

            $tabProgress
            .css('background-size', `100% ${calc}%`)
            .attr('aria-valuenow', calc);
        }
    });
});