/* Tags slider */
$(document).ready(function(){
    let $tagsSlider = $('[data-slider="tags"]');

    $tagsSlider.on('init', function(event, slick) {
        let arrowColor = $(slick.$slides.get(slick.currentSlide)).attr('data-arrow-color');
        blob.color = arrowColor;
    });

    $tagsSlider.slick({
        arrows: true,
    }).on('afterChange', function(event, slick, currentSlide) {
        let arrowColor = $(slick.$slides.get(slick.currentSlide)).attr('data-arrow-color');
        blob.color = arrowColor;
    });

    $(window).on('orientationchange resize', function() {
        $tagsSlider.slick('resize');
    });

});