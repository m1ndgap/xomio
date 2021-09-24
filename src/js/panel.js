/* Panel */
$(document).ready(function(){
    let $panelToggle = $('[data-element="panel-toggle"]');

    $panelToggle.on('click', function(e){
        let $toggle  = $(this);
        let toggleDisabledOn = $toggle.attr('data-disabled-on');
        let windowWidth = $(window).width();

        if ((toggleDisabledOn == 'tablet' && windowWidth >= bpMD) || (toggleDisabledOn == 'desktop' && windowWidth >= bpXL)) {
            if ($toggle.attr('href')) {
                window.location = this.href;
            } else {
                e.preventDefault();
            }
        } else {
            e.preventDefault();

            let $panel   = $toggle.closest('[data-component="panel"]');
            let $content = $panel.find('[data-element="panel-content"]');

            if ($panel.hasClass(collapsedClass)) {
                $content.slideDown(250);
                $panel.removeClass(collapsedClass);
            } else {
                $content.slideUp(250);
                $panel.addClass(collapsedClass);
            }
        }
    });
});