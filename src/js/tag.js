/* Tabs */
$(document).ready(function(){
    let $tag = $('[data-element="tag"]');
    let $tagToggle = $('[data-element="tag-toggle"]');
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

        if ($tag.hasClass(expandedClass)) {
            $tag.css('width', 'auto');
            $tag.removeClass(expandedClass);
        } else {
            $('.'+expandedClass+'[data-element="tag"]').css('width', 'auto');
            $('.'+expandedClass+'[data-element="tag"]').removeClass(expandedClass);

            if ( $toggle.outerWidth() > tagPopoverWidth ) {
                tagPopoverWidth = $toggle.outerWidth();
            }

            if ( ($(window).width() - $toggle.offset().left ) < tagPopoverWidth ) {
                $tag.addClass('is-right');
            }

            $tag.addClass(expandedClass);
            $tag.css('width', tagPopoverWidth);
        }

        return false;
    });
});