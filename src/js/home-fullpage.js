/* Index page with fullpage.js */
var homeFullpage;
document.addEventListener('DOMContentLoaded', function() {
    const $homeFullpage = document.querySelector('.page-home [data-page="fullpage"]');

    if (!$homeFullpage) {
        return false;
    }

    function initialization(){
        homeFullpage = new fullpage('[data-page="fullpage"]', {
            paddingTop: document.querySelector('[data-component="navbar"]').offsetHeight+'px',
            sectionSelector: '[data-fullpage="section"]',
            slideSelector: '[data-fullpage="slide"]',
            slidesNavigation: true,
            controlArrows: false,
            scrollBar: true,
            responsiveWidth: bpXL,
            normalScrollElements: '.section--scrollable',
            //responsiveHeight: 1000,
            //scrollOverflow: true,
            licenseKey: '7C83C7E4-02654F77-96AB0657-A3F6DE6F',
            scrollHorizontally: true,
            scrollHorizontallyKey: 'E6229FD0-80AC4893-A7CE7036-0EDBAD95',
            afterLoad: function(origin, destination, direction) {
            },
            afterRender: function(){
                if (this.isFirst) {
                    typeWord(this);
                }

                /*let video = this.item.querySelector('video');

                if ( video ) {
                    video.muted = true;
                    video.play();
                }*/
            },
            afterSlideLoad: function(section, origin, destination, direction){
                if (section.index === 0) {
                    typeWord(destination);
                }
            },
            onSlideLeave: function(section, origin, destination, direction) {
                let $typer = origin.item.querySelector('[data-element="typewriter"]');
                let typewriter = new Typewriter($typer);

                typewriter
                .deleteAll(15)
                .start();
            }
        });
    }

    function typeWord(el) {
        let $typer = el.item.querySelector('[data-element="typewriter"]');

        let typewriter = new Typewriter($typer, {
            delay: 100,
        });

        typewriter
        .typeString($typer.dataset.word)
        .callFunction(function(state) {
            state.elements.cursor.style.display = 'none';
        })
        .start();
    }

    //fullPage.js initialization
    initialization();
});
