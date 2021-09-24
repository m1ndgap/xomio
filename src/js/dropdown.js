/* Dropdown */

$(document).ready(function(){
    $('[data-element="dropdown-toggle"]').on('click', function(e){
        e.preventDefault();
    });

    $('[data-element="dropdown-toggle"]').each(function () {
        let tippyDropdown = tippy(this, {
            content(reference) {
                const id = reference.getAttribute('data-template');
                const template = document.getElementById(id);
                return template.innerHTML;
            },
            allowHTML: true,
            arrow: false,
            theme: 'light',
            trigger: 'click',
            placement: 'bottom-end',
            interactive: true,
            appendTo: document.body,
            popperOptions: {
                positionFixed: true,
            },
            zIndex: 99,
            offset: [0, 4],
            onShown: function(instance) {
                let $dropdownOption = $(instance.popper).find('[data-element="dropdown-option"]');
                $dropdownOption.on('click', function(e){
                    e.preventDefault();

                    let $option = $(this);
                    let optionData = $option.html();
                    let optionsParentId = $option.closest('[data-element="dropdown-content"]').attr('data-id');
                    let $dropdown = $('[data-template="'+optionsParentId+'"]').closest('[data-component="dropdown"]');
                    let $toggleText = $dropdown.find('[data-element="dropdown-toggle-text"]');

                    if ($dropdown.attr('data-type') === 'code') {
                        optionData = $option.attr('data-id');
                    }

                    $option.siblings().removeClass(selectedClass);
                    $option.addClass(selectedClass);
                    $toggleText.html(optionData);

                    instance.hide();
                });
            }
        });
    });
});