/* Tab slider */
$(document).ready(function(){
    let $tabNavSliders = $('[data-slider="tab-nav"]');

    $tabNavSliders.each(function(index, slider) {
        let $tabNavSlider = $(slider);
        let $sliderParent = $tabNavSlider.closest('[data-slider-parent]');

        $tabNavSlider.slick({
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
            $tabNavSlider.slick('resize');
        });

        if ($(window).width() >= bpXL) {
            var percentTime;
            var tick;
            var time = .1;
            var progressBarIndex = 0;

            $('[data-element="tab-progress"]').each(function(index) {
                var progress = "<div class='in-progress in-progress-" + index + "'></div>";
                $(this).html(progress);
            });

            function startProgressbar() {
                resetProgressbar();
                percentTime = 0;
                tick = setInterval(interval, 10);
            }

            function interval() {
                if (($('.slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
                    progressBarIndex = $('.slider .slick-track div[aria-hidden="false"]').data("slickIndex");
                    startProgressbar();
                } else {
                    percentTime += 1 / (time + 5);
                    $('.in-progress-' + progressBarIndex).css({
                        //height: percentTime + "%"
                    });
                    if (percentTime >= 100) {
                        $tabNavSlider.slick('slickNext');
                        progressBarIndex++;
                        if (progressBarIndex > 2) {
                            progressBarIndex = 0;
                        }
                        startProgressbar();
                    }
                }
            }

            function resetProgressbar() {
                $('.in-progress').css({
                    //height: 0 + '%'
                });
                clearInterval(tick);
            }
            startProgressbar();
            // End ticking machine

            $('[data-element="tab-trigger"]').click(function () {
                clearInterval(tick);
                var goToThisIndex = $(this).data("slickIndex");
                $tabNavSlider.slick('slickGoTo', goToThisIndex, false);
                startProgressbar();
            });
        }
    });
});