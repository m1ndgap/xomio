/* Tags */
function collapseActiveTag() {
    if (document.querySelector('.'+expandedClass+'[data-element="tag"]')) {
        document.querySelector('.'+expandedClass+'[data-element="tag"]').style = '';
        document.querySelector('.'+expandedClass+'[data-element="tag"]').classList.remove(expandedClass);
    }
};

(function() {
    let $tags = document.querySelectorAll('[data-element="tag"]');

    if ($tags.length === 0) {
        return false;
    }

    let $tagToggles        = document.querySelectorAll('[data-element="tag-toggle"]');
    let $tagsList          = document.querySelector('[data-element="tags-list"]');
    let $tagsPopupTriggers = document.querySelectorAll('[data-element="tags-popup-trigger"]');
    let $tagsPopupSlider   = document.querySelector('[data-slider="tags"]');
    let $tagsPopupClose    = document.querySelector('[data-element="tags-popup-close"]');
    let tagPopoverWidth    = 365;
    let i;

    if ( window.innerWidth < bpSM ) {
        tagPopoverWidth = document.querySelector('[data-element="tag-item"]').scrollWidth;
    }

    function resizeTags() {
        collapseActiveTag();

        for (i = 0; i < $tags.length; i++) {
            let $tag = $tags[i];
            let $toggle   = $tag.querySelector('[data-element="tag-toggle"]');
            let $popover  = $tag.querySelector('[data-element="tag-popover"]');
            let $item     = $tag.closest('[data-element="tag-item"]');
            let itemRect  =  $item.getBoundingClientRect();
            let tagRect   =  $toggle.getBoundingClientRect();
            let tagWidth  = tagRect.width;
            let tagHeight = tagRect.height;
            let tagExpandedWidth = tagPopoverWidth;

            if ( window.innerWidth < bpSM ) {
                if ( tagWidth > itemRect.width ) {
                    tagExpandedWidth = itemRect.width;
                }
                $popover.style.display = "none";
            } else {
                if ( tagWidth > tagExpandedWidth ) {
                    tagExpandedWidth = tagWidth + 28;
                }
            }

            $popover.style.width = tagExpandedWidth + 'px';

            if ( window.innerWidth < bpSM ) {
                $popover.style.display = "none";
            } else {
                $popover.style.display = "";
            }

            $item.style.width = tagWidth + 'px';
            $item.style.height = tagHeight + 'px';
        };
    }

    //window.scrollBy(0,1); // For Safari
    window.addEventListener("load", function (e) {
        resizeTags();
    });

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
            let $tag     = $toggle.closest('[data-element="tag"]');
            let $popover = $tag.querySelector('[data-element="tag-popover"]');
            let toggleRect = $toggle.getBoundingClientRect();
            let tagsListRect = $tagsList.getBoundingClientRect();

            if ( window.innerWidth < bpSM ) {
                $popover.style.display = "block";
            }

            let tagWidth  = tagPopoverWidth;
            let tagHeight = $toggle.scrollHeight + $popover.scrollHeight;

            if ($tag.classList.contains(expandedClass)) {
                $tag.classList.remove(expandedClass);
                $tag.style='';
                $popover.style.display = '';
            } else {
                collapseActiveTag();

                if ( $toggle.scrollWidth > tagWidth ) {
                    tagWidth = $toggle.offsetWidth + 28;
                }

                if ( window.innerWidth < bp2XL ) {
                    if ( ($tagsList.clientWidth - (toggleRect.left - tagsListRect.left) ) < tagWidth ) {
                        $tag.classList.add('is-right');
                    }

                    if ( ($tagsList.clientHeight - (toggleRect.top - tagsListRect.top) ) < tagHeight ) {
                        $tag.classList.add('is-bottom');
                    }
                } else {
                    if ( (window.innerWidth - toggleRect.left ) < tagWidth ) {
                        $tag.classList.add('is-right');
                    }

                    if ( (window.innerHeight - toggleRect.top ) < tagHeight ) {
                        $tag.classList.add('is-bottom');
                    }
                }

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
})();