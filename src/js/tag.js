/* Tabs */
$(document).ready(function(){
    let $tag = $('[data-element="tag"]');
    let $tagToggle = $('[data-element="tag-toggle"]');
    let $tagsPopup = $('[data-component="tags-popup"]');
    let $tagsPopupTrigger = $('[data-element="tags-popup-trigger"]');
    let $tagsPopupSlider = $('[data-slider="tags"]');
    let $tagsPopupClose = $('[data-element="tags-popup-close"]');
    let tagPopoverWidth = 365;

    if ( $(window).width() < 375 ) {
        tagPopoverWidth = 288;
    }

    $tag.each(function() {
        let $tag = $(this);
        let tagWidth = $tag.outerWidth();
        let tagHeight = $tag.height();
        let $tagItem = $tag.closest('[data-element="tag-item"]');

        $tagItem.width(tagWidth);
        $tagItem.height(tagHeight);
        $tag.find('[data-element="tag-popover-bg"]').width(tagWidth);
    });

    $tagToggle.on('click', function(e) {
        e.preventDefault();

        let $toggle = $(this);
        let $tag = $toggle.closest('[data-element="tag"]');
        let tagWidth = tagPopoverWidth;

        if ($tag.hasClass(expandedClass)) {
            $tag.css('width', 'auto');
            $tag.removeClass(expandedClass);
        } else {
            $('.'+expandedClass+'[data-element="tag"]').css('width', 'auto');
            $('.'+expandedClass+'[data-element="tag"]').removeClass(expandedClass);

            if ( $toggle.outerWidth() > tagWidth ) {
                tagWidth = $toggle.outerWidth() + 28;
            }

            if ( ($(window).width() - $toggle.offset().left ) < tagWidth ) {
                $tag.addClass('is-right');
            }

            $tag.addClass(expandedClass);
            $tag.css('width', tagWidth);
        }

        return false;
    });

    $tagsPopupTrigger.on('click', function(e) {
        e.preventDefault();

        let $trigger = $(this);
        let triggerID = $trigger.attr('data-id');

        $tagsPopupSlider.slick('slickGoTo', triggerID - 1, false);

        setTimeout(function() {
            $tagsPopup.addClass(visibleClass);
        }, 400);

        $('.'+expandedClass+'[data-element="tag"]').css('width', 'auto');
        $('.'+expandedClass+'[data-element="tag"]').removeClass(expandedClass);
    });

    $tagsPopupClose.on('click', function(e) {
        e.preventDefault();

        $tagsPopup.removeClass(visibleClass);
    });

    $(document).on('keyup', function(e) {
        if (e.key === "Escape" || e.keyCode === 27) {
            $tagsPopup.removeClass(visibleClass);
            $('.'+expandedClass+'[data-element="tag"]').css('width', 'auto');
            $('.'+expandedClass+'[data-element="tag"]').removeClass(expandedClass);
        }
    });
});