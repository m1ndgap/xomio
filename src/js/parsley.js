// Validation errors messages for Parsley
// Load this after Parsley

Parsley.addMessages('en', {
    type: {
        email:        "You entered an invalid email",
    },
});

Parsley.setLocale('en');

/* Forms */
$(document).ready(function() {
    /* Select2 For parsley validation */
    $('[data-element="select-default"]').change(function() {
        $(this).trigger('input');
        $(this).parsley().validate();
    });

    /* Form Parsley Validation */
    let $parsleyForm = $('[data-parsley-validate]');
    let $parsleyFormSubmit = $parsleyForm.find('[type="submit"]');

    $parsleyForm.parsley({
        excluded: "[disabled], :hidden",
        errorClass: 'has-error',
        successClass: 'has-success',
        errorsWrapper: '<div class="form__errors-list"></div>',
        errorTemplate: '<div class="form__error"></div>',
        errorsContainer (field) {
            return field.$element.parent().closest('.form__group');
        },
        classHandler (field) {
            const $parent = field.$element.closest('.form__group');
            if ($parent.length) return $parent;

            return $parent;
        }
    });

    $('[data-parsley-validate]').on('submit', function(e) {
        e.preventDefault();

        const $form = $(this);
    });

});