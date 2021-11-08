/* Tags */
document.addEventListener('DOMContentLoaded', function() {
    let $tags = document.querySelectorAll('[data-element="tag"]');

    if ($tags.length === 0) {
        return false;
    }

    let $tagToggles = document.querySelectorAll('[data-element="tag-toggle"]');
    let $tagsPopup = document.querySelector('[data-component="tags-popup"]');
    let $tagsPopupTriggers = document.querySelectorAll('[data-element="tags-popup-trigger"]');
    let $tagsPopupSlider = document.querySelector('[data-slider="tags"]');
    let $tagsPopupClose = document.querySelector('[data-element="tags-popup-close"]');
    let tagPopoverWidth = 365;
    let i;

    if ( window.innerWidth < 375 ) {
        tagPopoverWidth = 288;
    }

    for (i = 0; i < $tags.length; i++) {
        let $tag = $tags[i];
        let $tagToggle = $tag.querySelector('[data-element="tag-toggle"]');
        let $tagItem = $tag.closest('[data-element="tag-item"]');
        let $tagPopover = $tag.querySelector('[data-element="tag-popover"]');
        let tagWidth = $tagToggle.scrollWidth;
        let tagHeight = $tagToggle.scrollHeight;
        let tagExpandedWidth = tagPopoverWidth;

        $tagPopover.style.display = "block";

        if ( tagWidth > tagExpandedWidth ) {
            tagExpandedWidth = tagWidth + 28;
        }

        $tagItem.style.width = tagWidth + 'px';
        $tagItem.style.height = tagHeight + 'px';
        $tag.querySelector('[data-element="tag-popover"]').style.width = tagExpandedWidth + 'px';
    };

    for (i = 0; i < $tagToggles.length; i++) {
        $tagToggles[i].addEventListener("click", function(e) {
            e.preventDefault();

            let $toggle = this;
            let $tag = $toggle.closest('[data-element="tag"]');
            let $popover = $tag.querySelector('[data-element="tag-popover"]');
            let tagWidth = tagPopoverWidth;
            let tagHeight = $toggle.scrollHeight + $popover.scrollHeight;

            if ($tag.classList.contains(expandedClass)) {
                $tag.classList.remove(expandedClass);
                $tag.style='';
            } else {
                collapseActiveTag();

                if ( $toggle.scrollWidth > tagWidth ) {
                    tagWidth = $toggle.offsetWidth + 28;
                }

                if ( (window.innerWidth - $toggle.getBoundingClientRect().left ) < tagWidth ) {
                    $tag.classList.add('is-right');
                }

                if ( (window.innerHeight - $toggle.getBoundingClientRect().top ) < tagHeight ) {
                    $tag.classList.add('is-bottom');
                }

                $tag.classList.add(expandedClass);
                $tag.style.width = tagWidth + 'px';
                $tag.style.height = tagHeight + 'px';
                $tag.classList.add(expandedClass);
            }

            return false;
        });
    };

    for (i = 0; i < $tagsPopupTriggers.length; i++) {
        $tagsPopupTriggers[i].addEventListener("click", function(e) {
            e.preventDefault();

            let $trigger = this;
            let triggerID = $trigger.dataset.id;

            $($tagsPopupSlider).slick('slickGoTo', triggerID - 1, false);

            setTimeout(function() {
                $tagsPopup.classList.add(visibleClass);
            }, 400);

            collapseActiveTag();

            fullpage_api.setAutoScrolling(false);
            fullpage_api.setFitToSection(false);
            $body[0].classList.add(lockedScrollClass2);
        });
    }

    $tagsPopupClose.addEventListener("click", function(e) {
        e.preventDefault();

        $tagsPopup.classList.remove(visibleClass);
        fullpage_api.setAutoScrolling(true);
        fullpage_api.setFitToSection(true);
        $body[0].classList.remove(lockedScrollClass2);
    });

    document.addEventListener("keyup", function(e) {
        if (e.key === "Escape" || e.keyCode === 27) {
            $tagsPopup.classList.remove(visibleClass);
            collapseActiveTag();
            fullpage_api.setAutoScrolling(true);
            fullpage_api.setFitToSection(true);
            $body[0].classList.remove(lockedScrollClass2);
        }
    });

    function collapseActiveTag() {
        if (document.querySelector('.'+expandedClass+'[data-element="tag"]')) {
            document.querySelector('.'+expandedClass+'[data-element="tag"]').style = '';
            document.querySelector('.'+expandedClass+'[data-element="tag"]').classList.remove(expandedClass);
        }
    };
});