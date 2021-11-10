/* Tags */
function collapseActiveTag() {
    if (document.querySelector('.'+expandedClass+'[data-element="tag"]')) {
        document.querySelector('.'+expandedClass+'[data-element="tag"]').style = '';
        document.querySelector('.'+expandedClass+'[data-element="tag"]').classList.remove(expandedClass);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    let $tags = document.querySelectorAll('[data-element="tag"]');

    if ($tags.length === 0) {
        return false;
    }

    let $tagToggles = document.querySelectorAll('[data-element="tag-toggle"]');
    let $tagsPopup = document.querySelector('[data-component="tags-popup"]');
    let $tagsList = document.querySelector('[data-element="tags-list"]');
    let $tagsPopupTriggers = document.querySelectorAll('[data-element="tags-popup-trigger"]');
    let $tagsPopupSlider = document.querySelector('[data-slider="tags"]');
    let $tagsPopupClose = document.querySelector('[data-element="tags-popup-close"]');
    let tagPopoverWidth = 365;
    let i;

    if ( window.innerWidth < bpSM ) {
        tagPopoverWidth = document.querySelector('[data-element="tag-item"]').scrollWidth;
    }

    function resizeTags() {
        collapseActiveTag();

        for (i = 0; i < $tags.length; i++) {
            let $tag = $tags[i];
            let $tagToggle = $tag.querySelector('[data-element="tag-toggle"]');
            let $tagItem = $tag.closest('[data-element="tag-item"]');
            let $tagPopover = $tag.querySelector('[data-element="tag-popover"]');
            let tagWidth = $tagToggle.scrollWidth;
            let tagHeight = $tagToggle.scrollHeight;
            let tagExpandedWidth = tagPopoverWidth;

            if ( window.innerWidth < bpSM ) {
                if ( tagWidth > $tagItem.scrollWidth ) {
                    tagExpandedWidth = $tagItem.scrollWidth;
                }
            } else {
                if ( tagWidth > tagExpandedWidth ) {
                    tagExpandedWidth = tagWidth + 28;
                }
            }

            $tagPopover.style.display = "block";
            $tagPopover.style.width = tagExpandedWidth + 'px';

            if ( window.innerWidth < bpSM ) {
                $tagPopover.style.display = "";
            }
            $tagItem.style.width = tagWidth + 'px';
            $tagItem.style.height = tagHeight + 'px';
        };
    }

    resizeTags();

    window.addEventListener("resize", function(e) {
        resizeTags();
    });

    window.addEventListener("orientationchange", function(e) {
        resizeTags();
    });

    for (i = 0; i < $tagToggles.length; i++) {
        $tagToggles[i].addEventListener("click", function(e) {
            e.preventDefault();

            let $toggle = this;
            let $tag = $toggle.closest('[data-element="tag"]');
            let $popover = $tag.querySelector('[data-element="tag-popover"]');

            $popover.style.display = "block";

            let tagWidth = tagPopoverWidth;
            let tagHeight = $toggle.scrollHeight + $popover.scrollHeight;

            if ($tag.classList.contains(expandedClass)) {
                $tag.classList.remove(expandedClass);
                $tag.style='';
                $popover.style.display = "";
            } else {
                collapseActiveTag();

                if ( $toggle.scrollWidth > tagWidth ) {
                    tagWidth = $toggle.offsetWidth + 28;
                }

                if ( window.innerWidth < bp2XL ) {
                    if ( ($tagsList.clientWidth - ($toggle.getBoundingClientRect().left - $tagsList.getBoundingClientRect().left) ) < tagWidth ) {
                        $tag.classList.add('is-right');
                    }
         
                    if ( ($tagsList.clientHeight - ($toggle.getBoundingClientRect().top - $tagsList.getBoundingClientRect().top) ) < tagHeight ) {
                        $tag.classList.add('is-bottom');
                    }
                } else {
                    if ( (window.innerWidth - $toggle.getBoundingClientRect().left ) < tagWidth ) {
                        $tag.classList.add('is-right');
                    }
       
                    if ( (window.innerHeight - $toggle.getBoundingClientRect().top ) < tagHeight ) {
                        $tag.classList.add('is-bottom');
                    }
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
            let triggerSlideId = $tagsPopupSlider.querySelector('[data-id="'+triggerID+'"]').dataset.slickIndex;

            $($tagsPopupSlider).slick('slickGoTo', triggerSlideId, false);

            setTimeout(function() {
                $tagsPopup.classList.add(visibleClass);
            }, 400);

            fullpage_api.setAutoScrolling(false);
            fullpage_api.setFitToSection(false);
            $body[0].classList.add(lockedScrollClass2);

            collapseActiveTag();
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
});