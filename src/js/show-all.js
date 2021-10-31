/* Show More/Less */
$.fn.toggleText = function(t1, t2){
    if (this.text() == t1) {
        this.text(t2);
    } else {
        this.text(t1);
    }
    return this;
};

$(document).ready(function(){
    let $showAllToggle = $('[data-element="show-all-toggle"]');

    $showAllToggle.on('click', function(e) {
        e.preventDefault();

        let toggle = $(this);
        let toggleTextOn = toggle.attr('data-text-on');
        let toggleTextOff = toggle.attr('data-text-off');
        let showAllComponent = toggle.closest('[data-component="show-all"]');

        toggle.toggleText(toggleTextOn, toggleTextOff);

        showAllComponent.toggleClass(expandedClass);
    });
});
