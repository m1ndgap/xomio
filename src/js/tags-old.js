/* Tags
document.addEventListener('DOMContentLoaded', function() {
    let $tags = document.querySelectorAll('[data-element="tag"]');
    let $tagToggles = document.querySelectorAll('[data-element="tag-toggle"]');
    let $tagsPopup = document.querySelector('[data-component="tags-popup"]');
    let $tagsPopupTriggers = document.querySelectorAll('[data-element="tags-popup-trigger"]');
    let $tagsPopupSlider = document.querySelector('[data-slider="tags"]');
    let $tagsPopupClose = document.querySelector('[data-element="tags-popup-close"]');
    let tagPopoverWidth = 365;
    let i;

    if (!$tags) {
        return false;
    }

    if ( window.innerWidth < 375 ) {
        tagPopoverWidth = 288;
    }

    for (i = 0; i < $tags.length; i++) {
        let $tag = $(this);
        let $tagToggle = $tag.find('[data-element="tag-toggle"]');
        let $tagItem = $tag.closest('[data-element="tag-item"]');

        let tagWidth = $tagToggle.outerWidth();
        let tagExpandedWidth = tagPopoverWidth;
        let tagHeight = $tagToggle.outerHeight();

        if ( tagWidth > tagExpandedWidth ) {
            tagExpandedWidth = tagWidth + 28;
        }

        $tagItem.width(tagWidth);
        $tagItem.height(tagHeight);
        //$tag.find('[data-element="tag-popover-bg"]').width(tagWidth);
        $tag.find('[data-element="tag-popover"]').width(tagExpandedWidth);
    };

    $tagToggle.on('click', function(e) {
        e.preventDefault();

        let $toggle = $(this);
        let $tag = $toggle.closest('[data-element="tag"]');
        let $tagPopover = $tag.find('[data-element="tag-popover"]');
        let tagWidth = tagPopoverWidth;
        let tagHeight = $tagPopover[0].scrollHeight + $tag.height();

        if ($tag.hasClass(expandedClass)) {
            $tag.classList.remove(expandedClass);
            $tag[0].style='';
        } else {
            $('.'+expandedClass+'[data-element="tag"]')[0].style='';
            $('.'+expandedClass+'[data-element="tag"]').classList.remove(expandedClass);

            if ( $toggle.outerWidth() > tagWidth ) {
                tagWidth = $toggle.outerWidth() + 28;
            }

            if ( (window.innerWidth - $toggle[0].getBoundingClientRect().left ) < tagWidth ) {
                $tag.classList.add('is-right');
            }

            //console.log($tagPopover.height());
            //console.log(tagHeight);

            if ( ($(window).height() - $toggle[0].getBoundingClientRect().top ) < tagHeight ) {
                $tag.classList.add('is-bottom');
            }

            $tag.classList.add(expandedClass);
            $tag.css('width', tagWidth);
            $tag.css('height', $tagPopover.outerHeight() + $toggle.outerHeight());
            //$tag.css('width', tagWidth);
        }

        return false;
    });

    $tagsPopupTrigger.on('click', function(e) {
        e.preventDefault();

        let $trigger = $(this);
        let triggerID = $trigger.attr('data-id');

        $tagsPopupSlider.slick('slickGoTo', triggerID - 1, false);

        setTimeout(function() {
            $tagsPopup.classList.add(visibleClass);
        }, 400);

        $('.'+expandedClass+'[data-element="tag"]').css('width', 'auto');
        $('.'+expandedClass+'[data-element="tag"]').classList.remove(expandedClass);
    });

    $tagsPopupClose.on('click', function(e) {
        e.preventDefault();

        $tagsPopup.classList.remove(visibleClass);
    });

    $(document).on('keyup', function(e) {
        if (e.key === "Escape" || e.keyCode === 27) {
            $tagsPopup.classList.remove(visibleClass);
            $('.'+expandedClass+'[data-element="tag"]').css('width', 'auto');
            $('.'+expandedClass+'[data-element="tag"]').classList.remove(expandedClass);
        }
    });
}); */