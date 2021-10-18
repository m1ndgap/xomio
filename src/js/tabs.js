/* Tabs */
$(document).ready(function(){
    let $tabToggle = $('[data-element="tabs-toggle"]');
    let $activeTab = $('.is-active[data-element="tabs-tab"]');
    let $activeTabSlider = $activeTab.find('[data-slider]');

    if ($activeTabSlider.length > 0) {
        animateTabSlider($activeTab, $activeTabSlider);
    }

    $tabToggle.on('click', function(e) {
        e.preventDefault();

        let $toggle = $(this);
        let $tabs = $toggle.closest('[data-component="tabs"]');
        let tabID;

        if ($toggle.attr('href')) {
            tabID = $toggle.attr('href').slice(1);
        }

        if ($toggle.attr('data-src')) {
            tabID = $toggle.attr('data-src');
        }

        let $tabActive = '[data-element="tabs-tab"][data-id="' + tabID +'"]';
        let $tabActiveEl = $tabs.find($tabActive);
        let $tabActiveSlider = $tabActiveEl.find('[data-slider]');

        $tabs.find('[data-element="tabs-tab"]').removeClass(activeClass);
        $tabs.find('.' + activeClass +'[data-element="tabs-toggle"]').removeClass(activeClass);
        $tabActiveEl.addClass(activeClass);
        $toggle.addClass(activeClass);

        if ($tabActiveSlider.length > 0) {
            $tabActiveSlider.slick("setPosition", 0).slick('slickGoTo', 0)

            animateTabSlider($tabActiveEl, $tabActiveSlider);
        }
    });

    function animateTabSlider(tab, slider) {
        if ($(window).width() >= bpXL) {

            let percentTime;
            let tick;
            let time = .1;
            let progressBarIndex = 0;

            tab.find('[data-element="tab-progress"]').each(function(index) {
                let progress = "<div class='in-progress in-progress-" + index + "'></div>";
                $(this).html(progress);
            });

            startProgressbar();

            function startProgressbar() {
                resetProgressbar();
                percentTime = 0;
                tick = setInterval(interval, 10);
            }

            function interval() {
                if ((slider.find('div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
                    progressBarIndex = slider.find('div[aria-hidden="false"]').data("slickIndex");
                    startProgressbar();
                } else {
                    percentTime += 1 / (time + 5);
                    tab.find('.in-progress-' + progressBarIndex).css({
                        height: percentTime + "%"
                    });
                    if (percentTime >= 100) {
                        slider.slick('slickNext');
                        progressBarIndex++;
                        if (progressBarIndex > 2) {
                            progressBarIndex = 0;
                        }
                        startProgressbar();
                    }
                }
            }

            function resetProgressbar() {
                tab.find('.in-progress').css({
                    height: 0 + '%'
                });
                clearInterval(tick);
            }
        }
    };
});