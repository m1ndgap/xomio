/* Tabs */
$(document).ready(function(){
    let $tabToggle = $('[data-element="tabs-toggle"]');

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
        }
    });
});