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

        /*this.classList.toggle(collapsedClass);
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } */
});

/*$(document).ready(function(){
    let $accordionToggle = $('[data-element="accordion-toggle"]');

    $accordionToggle.on('click', function(e) {
        e.preventDefault();

        let $toggle = $(this);
        let $component = $toggle.closest('[data-component="accordion"]');
        let $item = $toggle.closest('[data-element="accordion-item"]');
        let $content = $item.find('[data-element="accordion-content"]');

        if ($item.hasClass(collapsedClass)) {
            $item.siblings().addClass(collapsedClass);
            $item.siblings().find('[data-element="accordion-content"]').css('max-height', '');
            console.log($content.outerHeight());
            $content.css('max-height', $content.height() + 'px');
            $item.removeClass(collapsedClass);
        } else {
            $content.css('max-height', '');
            $item.addClass(collapsedClass);
        }


        /*for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
            } 
          });
        }

        if ($item.hasClass(collapsedClass)) {
            $item.addClass('open');
            anime({
                targets: el,
                translateY: [-5, 0],
                opacity: ['0', '1'],
                duration: 500,
                delay: 200,
            });

        } else {

            setTimeout(function() { $item.removeClass('open');  }, 200);
            anime({
                targets: el,
                translateY: [0, -5],
                opacity: ['1', '0'],
                duration: 500,
                complete: function(anim) {
                }
            });
        }*/


/*
    });
});*/
