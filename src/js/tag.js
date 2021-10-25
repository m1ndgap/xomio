/* Tabs */
$(document).ready(function(){
    let $tag = $('[data-element="tag"]');
    let $tagToggle = $('[data-element="tag-toggle"]');

    $tag.each(function() {
        let $tag = $(this);
        let tagWidth = $tag.outerWidth();

        $tag.find('[data-element="tag-popover-bg"]').width(tagWidth);
    });

    $tagToggle.on('click', function(e) {
        e.preventDefault();

        let $toggle = $(this);
        let $item = $toggle.closest('[data-element="tag"]');

        if ($item.hasClass(expandedClass)) {
            $item.removeClass(expandedClass);
        } else {
            $('.'+expandedClass+'[data-element="tag"]').removeClass(expandedClass);
            $item.addClass(expandedClass);
        }

        return false;
    });
});