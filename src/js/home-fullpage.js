/* Index page with fullpage.js */
document.addEventListener('DOMContentLoaded', function() {
    const $homeFullpage = document.querySelector('.page-home [data-page="fullpage"]');

    if (!$homeFullpage) {
        return false;
    }

    function initialization(){
        var myFullpage = new fullpage('[data-page="fullpage"]', {
            paddingTop: document.querySelector('[data-component="navbar"]').offsetHeight+'px',
            sectionSelector: '[data-fullpage="section"]',
            slideSelector: '[data-fullpage="slide"]',
            //autoScrolling: true,
            slidesNavigation: false,
            controlArrows: false,
            scrollBar: true,
            //responsive: 900,
            licenseKey: '70FFA765-BA464426-B38D8C81-8308669D',
            scrollHorizontally: true,
            scrollHorizontallyKey: 'E6229FD0-80AC4893-A7CE7036-0EDBAD95',
            afterLoad: function(origin, destination, direction) {
                if ( destination.isLast ) {
                    fullpage_api.setAutoScrolling(false);
                    fullpage_api.setFitToSection(false);
                } else {
                    fullpage_api.setAutoScrolling(true);
                    fullpage_api.setFitToSection(true);
                }
            },
            afterRender: function(){
                if (this.isFirst) {
                    let $typer = this.item.querySelector('[data-element="typewriter"]');

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
            },
            afterSlideLoad: function(section, origin, destination, direction){
                if (section.index === 0) {
                    let $typer = destination.item.querySelector('[data-element="typewriter"]');

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

    //fullPage.js initialization
    initialization();
});
