/* Accordion */
document.addEventListener('DOMContentLoaded', function() {
    let $accordions = document.querySelectorAll('[data-component="accordion"]');
    let i;

    if (!$accordions) {
        return false;
    }

    for (i = 0; i < $accordions.length; i++) {
        let $toggles = $accordions[i].querySelectorAll('[data-element="accordion-toggle"]');
        let j;

        for (j = 0; j < $toggles.length; j++) {
            $toggles[j].addEventListener("click", function(e) {
                e.preventDefault();

                let $toggle = this;
                let $component = $toggle.closest('[data-component="accordion"]');
                let $item = $toggle.closest('[data-element="accordion-item"]');
                let $content = $item.querySelector('[data-element="accordion-content"]');


                if ($item.classList.contains(collapsedClass)) {
                    let $activeSibling = $component.querySelector('[data-element="accordion-item"]:not(.'+collapsedClass+')');

                    if ($activeSibling) {
                        $activeSibling.querySelector('[data-element="accordion-content"]').style.maxHeight = 0;
                        $activeSibling.classList.add(collapsedClass);
                    }

                    $content.style.maxHeight = $content.scrollHeight + 'px';
                    $item.classList.remove(collapsedClass);
                } else {
                    $content.style.maxHeight = 0;
                    $item.classList.add(collapsedClass);
                }
            });
        }
    }
});