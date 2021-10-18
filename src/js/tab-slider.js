/* Tab slider */
$(document).ready(function(){
    let $tabSliders = $('[data-slider="tab"]');

    $tabSliders.each(function(index, slider) {
        let $tabSlider = $(slider);

        $tabSlider.slick({
            arrows: false,
            fade: true,
            responsive: [
                {
                    breakpoint: bpLG,
                    settings: 'unslick'
                },
            ]
        });

        $(window).on('orientationchange resize', function() {
            $tabSlider.slick('resize');
        });
    });
});
