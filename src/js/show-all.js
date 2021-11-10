/* Show More/Less */
function toggleText(toggle, t1, t2){
    if (toggle.innerHTML == t1) {
        toggle.innerHTML = t2;
    } else {
        toggle.innerHTML = t1;
    }
    return this;
};

document.addEventListener('DOMContentLoaded', function() {
    let $showAllToggles = document.querySelectorAll('[data-element="show-all-toggle"]');
    let $showAllContents = document.querySelectorAll('[data-show-all-content]');
    let i;

    if (!$showAllToggles) {
        return false;
    }

    for (i = 0; i < $showAllToggles.length; i++) {
        $showAllToggles[i].addEventListener("click", function(e) {
            e.preventDefault();

            let $toggle = this;
            let toggleTextOn = $toggle.dataset.textOn;
            let toggleTextOff = $toggle.dataset.textOff;
            let $component = $toggle.closest('[data-component="show-all"]');
            let $content = $component.querySelector('[data-show-all-content]');
            let contentHeight = $content.offsetHeight;
            let contentScrollHeight = $content.scrollHeight;

            toggleText($toggle, toggleTextOn, toggleTextOff);

            if ($component.classList.contains(expandedClass)) {
                collapseActiveTag();
                $content.style = '';
                $component.classList.remove(expandedClass);
            } else {
                $content.style.maxHeight = contentScrollHeight + 'px';
                setTimeout(function (e) {
                    $content.style.overflow = 'visible';
                }, 500);
                $component.classList.add(expandedClass);
            }
        });
    }
});
