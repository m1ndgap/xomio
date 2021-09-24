/* Select2 */
$(document).ready(function() {
    let selectCommonOptions = {
        dropdownCssClass: ':all:',
        containerCssClass: ':all:',
        minimumResultsForSearch: Infinity,
        width: 'auto',
        dropdownAutoWidth: true,
    };

    $('[data-element="select"]').select2(selectCommonOptions);

    let $selectDefault = $('[data-element="select-default"]');

    if ($selectDefault) {
        $selectDefault.each(function(index, select) {
            let $selectEl = $(select);
            let $selectParent = $selectEl.parent();

            $selectEl.select2({
                width: '100%',
                dropdownParent: $selectParent,
            }).on('select2:open', function(e){
                $('.select2-search__field').attr('placeholder', $(this).attr('data-search-placeholder'));
            });
        });
    }
});