/* Stats slider */
$(document).ready(function(){
    let $statsSlider = $('[data-slider="stats"]');
    let $statsProgress = $('[data-element="stats-progress"]');
    let $prevButton = $('[data-element="stats-prev"]');
    let $nextButton = $('[data-element="stats-next"]');

    $statsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        setProgress(nextSlide);

        let $currentSlideEl = $(slick.$slides.get(currentSlide));
        let $typer = $currentSlideEl.find('[data-element="stats-typewriter"]');
        let $aosEl = $(slick.$slider).find('[data-aos]');

        $aosEl.attr('data-aos', 'fade-up').removeClass('aos-animate');

        $typer.css('opacity', 0);
    });

    $statsSlider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
        initSlide(slick, currentSlide, nextSlide);
    });

    $statsSlider.on('init', function(event, slick, currentSlide, nextSlide) {
        initSlide(slick, currentSlide, nextSlide);
    });

    $statsSlider.slick({
        mobileFirst: true,
        swipeToSlide: true,
        prevArrow: $prevButton,
        nextArrow: $nextButton,
        infinite: true,
        fade: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3500,
    });

    setProgress(0);

    $(window).on('orientationchange resize', function() {
        $statsSlider.slick('resize');
        setProgress(0);
    });

    function initSlide(slick, currentSlide, nextSlide) {
        let $currentSlideEl = $(slick.$slides.get(currentSlide));
        let $typer = $currentSlideEl.find('[data-element="stats-typewriter"]')[0];
        let typerMain = $typer.dataset.main;
        let typerSmall = '<small>'+$typer.dataset.small+'</small>';
        let $aosEl = $currentSlideEl.find('[data-aos]');

        $aosEl.attr('data-aos', 'fade-down').addClass('aos-animate');

        $typer.innerHTML = '';

        $($typer).css('opacity', 1);

        let typewriter = new Typewriter($typer, {
          delay: 100,
        });

        typewriter
            .typeString(typerMain)
            .typeString(typerSmall)
            .callFunction(function(state) {
                state.elements.cursor.style.display = 'none';
            })
            .start();
    }

    function setProgress(index) {
        const calc = ((index + 1) / ($statsSlider.slick('getSlick').slideCount)) * 100;

        if ($(window).width() < bpLG) {
            $statsProgress
            .css('background-size', `${calc}% 100%`)
            .attr('aria-valuenow', calc);
        } else {
            $statsProgress
            .css('background-size', `100% ${calc}%`)
            .attr('aria-valuenow', calc);
        }
    }
});