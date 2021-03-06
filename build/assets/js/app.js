'use strict';

const activeClass    = 'is-active';
const collapsedClass = 'is-collapsed';
const disabledClass  = 'is-disabled';
const expandedClass  = 'is-expanded';
const fixedClass     = 'is-fixed';
const focusClass     = 'is-focused';
const hoverClass     = 'is-hover';
const invisibleClass = 'is-invisible';
const selectedClass  = 'is-selected';
const scrolledClass  = 'is-scrolled';
const visibleClass   = 'is-visible';

const headerFixedClass  =  'header-is-fixed';
const lockedScrollClass =  'scroll-is-locked';
const lockedScrollClass2 = 'locked-scroll';
const menuVisibleClass  =  'menu-is-visible';

const aosDuration  = 250;

const $navbar = $('[data-component="navbar"]');
const $body = $('.body');
const $main = $('.main');

const bpSM = 560;
const bpMD = 768;
const bpLG = 1024;
const bpXL = 1232;
const bp2XL = 1440;

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
});
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
            appendTo: 'parent',
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
                        optionData = '<span class="hidden-xl-up">'+optionData+'</span><span class="hidden-lg-down">'+$option.attr('data-id')+'</span>';
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
Dropzone.autoDiscover = false;

$(document).ready(function () {
    let previewNode = $('[data-element="dropzone-template"]');
    let previewTemplate = previewNode.html();
    previewNode.parent().html('');

    $('[data-dropzone-block]').dropzone({
        maxFiles: 10,
        maxFilesize: 10,
        url: "/ajax_file_upload_handler/",
        previewTemplate: previewTemplate,
        autoQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: '[data-element="dropzone-previews"]', // Define the container to display the previews
        clickable: '[data-element="dropzone-trigger"]', // Define the element that should be used as click trigger to select files.
        dictFileTooBig: 'File is over 10 ??b',
        success: function (file, response) {
            $(file.previewElement).find('[data-dz-uploadprogress]').parent().hide();
        },
        error: function (file, response) {
            let item = $(file.previewElement);
            let itemError = $(file.previewElement).find('[data-dz-errormessage]');
            let itemName = $(file.previewElement).find('[data-dz-name]');

            if (file && response) {
                item.addClass('has-error');
                itemName.hide();
                itemError.html(response)
            } else {
                item.removeClass('has-error');
                itemName.show();
                itemError.html('')
            }
        },
        uploadprogress: function(progress) {
            $(file.previewElement).find('[data-dz-uploadprogress]').css('width', progress + '%');
        },
    });
});
/* Feature card */
$(document).ready(function(){
    let $featureCardToggle = $('[data-element="feature-card-toggle"]');

    $featureCardToggle.on('click', function(e){
        e.preventDefault();

        let $toggle  = $(this);
        let $card = $toggle.closest('[data-component="feature-card"]');
        let cardHeight = $card[0].scrollHeight;
        let $activeSibling = $('.'+expandedClass+'[data-component="feature-card"]');

        if ($card.hasClass(expandedClass)) {
            $card.removeClass(expandedClass);
            $card.css('height', '');
        } else {
            $activeSibling.removeClass(expandedClass);
            $activeSibling.css('height', '');
            $card.addClass(expandedClass);
            $card.css('height', cardHeight);
        }
    });
});
let $phoneInputs = document.querySelectorAll('[data-mask="phone"]');

if ($phoneInputs.length !== 0) {
    for (const inputPhone of $phoneInputs) {
        Inputmask({"mask": "+1 999 999 99 99"}).mask(inputPhone);
    }
}
/* Lottie in fullpage.js */
let $players = document.querySelectorAll('[data-player="lottie"]');

if ($players) {
    for (let player of $players) {
        playerInit(player);
    }
}

function playerInit(player){
    let target = player.parentElement;
    let source = player.getAttribute('src');

    // create an observer instance
    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.removedNodes.length > 0) { // You need to check if the mutation.removedNodes array contains div#test2 here. I'm just too lazy.

                const removedPlayer = [...mutation.removedNodes].find(el => el === player);

                if (removedPlayer) {
                    removedPlayer.load(source)
                    target.append(removedPlayer.cloneNode(true))
                    observer.disconnect(); // stop observing
                }
            }
        });
    });

    // configuration of the observer
    observer.observe(target, {
        childList: true
    }); // start observe
}

$(document).ready(function() {
    function checkStepVariants(el) {
        let wF = $(el).find('.variant:first').outerWidth();
        let wL = $(el).find('.variant:last').outerWidth();
        let varsLine = $(el).find('.vars-line');
        $(varsLine).css('left', wF / 2 + 'px').css('right', wL / 2 + 'px');
    }

    function checkStepVariants2(el) {
        let ansline = $(el).find('.ans-line');
        if ($(el).find('.variant.act').length > 0) {
            let act = $(el).find('.variant.act');
            let actOffset = $(act).offset();
            let lineWidth = $(window).width() / 2 - $(act).offset().left - $(act).outerWidth() / 2;
            $(ansline).width(Math.abs(lineWidth));
            if (lineWidth < 0) {
                $(ansline).css('right', 'calc(50% + ' + (lineWidth) + 'px)');
            } else {
                $(ansline).css('left', 'calc(50% + ' + (-1*lineWidth) + 'px)');
            }
        }
    }

    $('.gofirst').on('click', function() {
        if (!$(this).hasClass('hold')) {
            anime({
              targets: '.gofirst',
              scale: 0.7,
              direction: 'alternate',
              duration: 200,
              easing: 'easeInOutQuad'
            });
            $(this).addClass('hold');
            gostep(0);
        }

        return false;
    });

    $('.step-variants .variant').on('click', function() {
        if (!$(this).closest('.step-block').hasClass('hold')) {
            $(this).closest('.step-block').addClass('hold');
            let id = $(this).data('id');
            $(this).addClass('act');

            checkStepVariants2($(this).closest('.step-block'));

            setTimeout(function() { gostep(id); }, 1000);
        }
        return false;
    });

    $('.step-dialog .ans').on('click', function() {
        if (!$(this).closest('.step-block').hasClass('hold')) {
            $(this).closest('.step-block').addClass('hold');
            let id = $(this).data('id');
            $(this).addClass('act');
            setTimeout(function() { gostep(id); }, 1000);
        }
        return false;
    });

    function gostep(num) {
        $('.step-block[data-id="'+num+'"]').fadeIn(100, function() {
            $('.step-block[data-id="'+num+'"]').addClass('act');
            $('html').animate({
                scrollTop: $('.step-block[data-id="'+num+'"]').offset().top - 200
            }, 800);
            let length = $('.step-block.act').length;
            let withVariants = false;
            $('.step-block.act').each(function(index, element) {
                if (index == (length - 2) && $(this).hasClass('step-variants')) withVariants = true;
                if (index !== (length - 1)) $(this).addClass('prev');
                if (index == (length - 1) && withVariants) $(this).addClass('wvariants');

            });
            if ($('.step-block[data-id="'+num+'"]').data('goto')) {
                setTimeout(function() {gostep($('.step-block[data-id="'+num+'"]').data('goto')) }, 1000);
            }
            if ($('.step-block[data-id="'+num+'"].step-variants').length > 0) {
                let el = $('.step-block[data-id="'+num+'"].step-variants');
                let delay = 0;
                $('.step-block[data-id="'+num+'"].step-variants .variant').each(function() {
                    let e = $(this);
                    setTimeout(function() { $(e).addClass('go');  }, delay);
                    delay = delay + 300;
                });
                checkStepVariants($(el));
            }
        });
    }
	
    $(document).on('click', '.checkbox', function() {
        var inp = $(this).find('input');
        if ($(this).hasClass('active'))
        {
            $(this).removeClass('active');
            $(inp).val('');
        }
        else
        {
            $(this).addClass('active');
            $(inp).val(1);
        }
        return false;
    });
});
/* Menu */
let $menu = $('[data-component="menu"]');
let $menuToggle = $('[data-element="menu-toggle"]');

function hideMenu() {
    $menu.removeClass(visibleClass);
    $menuToggle.removeClass(activeClass);
    $body.removeClass(menuVisibleClass);
    $body.removeClass(lockedScrollClass);
}

function showMenu() {
    if ($(window).width() < bpXL) {
        $menu.addClass(visibleClass);
        $menuToggle.addClass(activeClass);
        $body.addClass(lockedScrollClass);
        $body.addClass(menuVisibleClass);
    }
}

function desktopCheck() {
    if ($(window).width() >= bpXL) {
        hideMenu($menu);
    }
}

$(document).ready(function(){

    $menuToggle.on('click', function(e) {
        e.preventDefault();

        if ($menu.hasClass(visibleClass)) {
            hideMenu();
        } else {
            showMenu();
        }
    });

    $(document).on('keyup', function(e) {
        if ($(window).width() < bpXL) {
            if (e.key === "Escape" || e.keyCode === 27) {
                hideMenu();
            }
        }
    });

    $(document).on('click', function(e) {
        if ($(window).width() < bpXL) {
            if ($menu.has(e.target).length === 0 && !$menu.is(e.target) && $menuToggle.has(e.target).length === 0 && !$menuToggle.is(e.target)) {
                hideMenu();
            }
        }
    });

    desktopCheck();

    $(window).on('orientationchange resize', function() {
        desktopCheck();
    });
});
/* Navbar on scroll */
document.addEventListener('DOMContentLoaded', function() {
    const $navbar = document.querySelector('[data-component="navbar"]');

    if (!$navbar) {
        return false;
    }

    function navbarDeafultScroll() {
        let onScroll = function () {
            $navbar.classList.toggle(scrolledClass, window.scrollY > $navbar.offsetHeight);
        };

        onScroll();
        window.addEventListener('scroll', function() {
            onScroll();
        });
    }

    navbarDeafultScroll();
});
/* Panel */
$(document).ready(function(){
    let $panelToggle = $('[data-element="panel-toggle"]');

    $panelToggle.on('click', function(e){
        let $toggle  = $(this);
        let toggleDisabledOn = $toggle.attr('data-disabled-on');
        let windowWidth = $(window).width();

        if ((toggleDisabledOn == 'tablet' && windowWidth >= bpMD) || (toggleDisabledOn == 'desktop' && windowWidth >= bpXL)) {
            if ($toggle.attr('href')) {
                window.location = this.href;
            } else {
                e.preventDefault();
            }
        } else {
            e.preventDefault();

            let $panel   = $toggle.closest('[data-component="panel"]');
            let $content = $panel.find('[data-element="panel-content"]');

            if ($panel.hasClass(collapsedClass)) {
                $content.slideDown(250);
                $panel.removeClass(collapsedClass);
            } else {
                $content.slideUp(250);
                $panel.addClass(collapsedClass);
            }
        }
    });
});
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
/* Switch */
$.fn.toggleText = function(t1, t2){
    if (this.text() == t1) {
        this.text(t2);
    } else {
        this.text(t1);
    }
    return this;
};

$(document).ready(function(){
    let $paymentSwitch = $('[data-component="payment-swich"]');

    $paymentSwitch.each(function(index, switchEl) {
        let $switch = $(switchEl);
        let $switchControl = $switch.find('input:radio');


        $switchControl.on('change', function(e) {
            let $control = $(this);
            let $dataEl = $switch.find('[data-element="payment-swich-data"]');

            if ($control.val() == 'left') {
                $dataEl.each(function(index, elem) {
                    $(elem).toggleText($(elem).attr('data-left'), $(elem).attr('data-right'));
                });
            } else if ($control.val() == 'right') {
                $dataEl.each(function(index, elem) {
                    $(elem).toggleText($(elem).attr('data-right'), $(elem).attr('data-left'));
                });
            }
        });
    });
});
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

/* Common slider */
$(document).ready(function(){
    let $sliders = $('[data-slider="slider"]');

    $sliders.each(function(index, slider) {
        let $slider = $(slider);
        let $sliderParent = $slider.closest('[data-slider-parent]');
        let $sliderNav = $sliderParent.find('[data-slider="slider-nav"]');

        $slider.slick({
            dots: true,
            arrows: false,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 5000,
            asNavFor: $sliderNav
        });

        $sliderNav.slick({
          arrows: false,
          fade: true
        }).on('afterChange', function(event, slick, currentSlide){
            let $currentSlideEl = $(slick.$slides.get(currentSlide));

            if ($currentSlideEl.find('video').length > 0) {
                let video = $currentSlideEl.find('video')[0];
                video.pause();
                video.currentTime = 0;
                video.play();
            }
        });

        $(window).on('orientationchange resize', function() {
            $slider.slick('resize');
            $sliderNav.slick('resize');
        });
    });
});
/* Slideshow slider */
$(document).ready(function(){
    let $slideshows = $('[data-slider="slideshow"]');

    $slideshows.each(function(index, slider) {
        let $slider = $(slider);
        let sliderAutoplaySpeed = +$slider.attr('data-autoplay-speed') || 2500;
        let sliderDots = false;

        if ($slider.attr('data-dots')) {
            sliderDots = true;
        }

        $slider.slick({
            infinite: true,
            arrows: false,
            dots: sliderDots,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: sliderAutoplaySpeed,
            pauseOnHover: false,
        });

        $(window).on('orientationchange resize', function() {
            $slider.slick('resize');
        });
    });
});
var smoothScrollOptions = {
    speed: 350,
    easing: 'easeInOutCubic',
    header: '[data-component="navbar"]',
};

let scroll = new SmoothScroll('[data-scroll]', smoothScrollOptions);
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

        $aosEl.removeClass('aos-animate');

        setTimeout(function (e) {
            $aosEl.attr('data-aos', 'fade-down');
        },aosDuration);

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

        $aosEl.addClass('aos-animate');
        setTimeout(function (e) {
            $aosEl.attr('data-aos', 'fade-up');
        },aosDuration);

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
/* Tab slider */
$(document).ready(function(){
    let $tabSliders = $('[data-slider="tab"]');

    $tabSliders.each(function(index, slider) {
        let $tabSlider = $(slider);

        $tabSlider.slick({
            arrows: false,
            fade: true,
            responsive: [
                {
                    breakpoint: bpLG,
                    settings: 'unslick'
                },
            ]
        });

        $(window).on('orientationchange resize', function() {
            $tabSlider.slick('resize');
        });
    });
});

/* Tabs */
$(document).ready(function(){
    let $tabToggle = $('[data-element="tabs-toggle"]');
    let $activeTab = $('.is-active[data-element="tabs-tab"]');
    let $activeTabSlider = $activeTab.find('[data-slider]');

    if ($activeTabSlider.length > 0) {
        animateTabSlider($activeTab, $activeTabSlider);
    }

    $tabToggle.on('click', function(e) {
        e.preventDefault();

        let $toggle = $(this);
        let $tabs = $toggle.closest('[data-component="tabs"]');
        let tabID;

        if ($toggle.attr('href')) {
            tabID = $toggle.attr('href').slice(1);
        }

        if ($toggle.attr('data-src')) {
            tabID = $toggle.attr('data-src');
        }

        let $tabActive = '[data-element="tabs-tab"][data-id="' + tabID +'"]';
        let $tabActiveEl = $tabs.find($tabActive);
        let $tabActiveSlider = $tabActiveEl.find('[data-slider]');

        $tabs.find('[data-element="tabs-tab"]').removeClass(activeClass);
        $tabs.find('.' + activeClass +'[data-element="tabs-toggle"]').removeClass(activeClass);
        $tabActiveEl.addClass(activeClass);
        $toggle.addClass(activeClass);

        if ($tabActiveSlider.length > 0) {
            $tabActiveSlider.slick("setPosition", 0).slick('slickGoTo', 0)

            animateTabSlider($tabActiveEl, $tabActiveSlider);
        }
    });

    function animateTabSlider(tab, slider) {
        if ($(window).width() >= bpXL) {

            let percentTime;
            let tick;
            let time = .1;
            let progressBarIndex = 0;

            tab.find('[data-element="tab-progress"]').each(function(index) {
                let progress = "<div class='in-progress in-progress-" + index + "'></div>";
                $(this).html(progress);
            });

            startProgressbar();

            function startProgressbar() {
                resetProgressbar();
                percentTime = 0;
                tick = setInterval(interval, 10);
            }

            function interval() {
                if ((slider.find('[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
                    progressBarIndex = slider.find('[aria-hidden="false"]').data("slickIndex");
                    startProgressbar();
                } else {
                    percentTime += 1 / (time + 5);
                    tab.find('.in-progress-' + progressBarIndex).css({
                        height: percentTime + "%"
                    });
                    if (percentTime >= 100) {
                        slider.slick('slickNext');
                        progressBarIndex++;
                        if (progressBarIndex > (slider[0].slick.$slides.length - 1)) {
                            progressBarIndex = 0;
                            tab.find('.in-progress').css({
                                height: 0 + '%'
                            });
                        }
                        startProgressbar();
                    }
                }
            }

            function resetProgressbar() {
                clearInterval(tick);
            }
        }
    };
});
/* Tags */
function collapseActiveTag() {
    if (document.querySelector('.'+expandedClass+'[data-element="tag"]')) {
        document.querySelector('.'+expandedClass+'[data-element="tag"]').style = '';
        document.querySelector('.'+expandedClass+'[data-element="tag"]').classList.remove(expandedClass);
    }
};

(function() {
    let $tags = document.querySelectorAll('[data-element="tag"]');

    if ($tags.length === 0) {
        return false;
    }

    let $tagToggles        = document.querySelectorAll('[data-element="tag-toggle"]');
    let $tagsList          = document.querySelector('[data-element="tags-list"]');
    let $tagsPopupTriggers = document.querySelectorAll('[data-element="tags-popup-trigger"]');
    let $tagsPopupSlider   = document.querySelector('[data-slider="tags"]');
    let $tagsPopupClose    = document.querySelector('[data-element="tags-popup-close"]');
    let tagPopoverWidth    = 365;
    let i;

    if ( window.innerWidth < bpSM ) {
        tagPopoverWidth = document.querySelector('[data-element="tag-item"]').scrollWidth;
    }

    function resizeTags() {
        collapseActiveTag();

        for (i = 0; i < $tags.length; i++) {
            let $tag = $tags[i];
            let $toggle   = $tag.querySelector('[data-element="tag-toggle"]');
            let $popover  = $tag.querySelector('[data-element="tag-popover"]');
            let $item     = $tag.closest('[data-element="tag-item"]');
            let itemRect  =  $item.getBoundingClientRect();
            let tagRect   =  $toggle.getBoundingClientRect();
            let tagWidth  = tagRect.width;
            let tagHeight = tagRect.height;
            let tagExpandedWidth = tagPopoverWidth;

            if ( window.innerWidth < bpSM ) {
                if ( tagWidth > itemRect.width ) {
                    tagExpandedWidth = itemRect.width;
                }
                $popover.style.display = "none";
            } else {
                if ( tagWidth > tagExpandedWidth ) {
                    tagExpandedWidth = tagWidth + 28;
                }
            }

            $popover.style.width = tagExpandedWidth + 'px';

            if ( window.innerWidth < bpSM ) {
                $popover.style.display = "none";
            } else {
                $popover.style.display = "";
            }

            $item.style.width = tagWidth + 'px';
            $item.style.height = tagHeight + 'px';
        };
    }

    //window.scrollBy(0,1); // For Safari
    window.addEventListener("load", function (e) {
        resizeTags();
    });

    window.addEventListener("resize", function(e) {
        resizeTags();
    });

    window.addEventListener("orientationchange", function(e) {
        resizeTags();
    });

    for (i = 0; i < $tagToggles.length; i++) {
        $tagToggles[i].addEventListener("click", function(e) {
            e.preventDefault();

            let $toggle = this;
            let $tag     = $toggle.closest('[data-element="tag"]');
            let $popover = $tag.querySelector('[data-element="tag-popover"]');
            let toggleRect = $toggle.getBoundingClientRect();
            let tagsListRect = $tagsList.getBoundingClientRect();

            if ( window.innerWidth < bpSM ) {
                $popover.style.display = "block";
            }

            let tagWidth  = tagPopoverWidth;
            let tagHeight = $toggle.scrollHeight + $popover.scrollHeight;

            if ($tag.classList.contains(expandedClass)) {
                $tag.classList.remove(expandedClass);
                $tag.style='';
                $popover.style.display = '';
            } else {
                collapseActiveTag();

                if ( $toggle.scrollWidth > tagWidth ) {
                    tagWidth = $toggle.offsetWidth + 28;
                }

                if ( window.innerWidth < bp2XL ) {
                    if ( ($tagsList.clientWidth - (toggleRect.left - tagsListRect.left) ) < tagWidth ) {
                        $tag.classList.add('is-right');
                    }

                    if ( ($tagsList.clientHeight - (toggleRect.top - tagsListRect.top) ) < tagHeight ) {
                        $tag.classList.add('is-bottom');
                    }
                } else {
                    if ( (window.innerWidth - toggleRect.left ) < tagWidth ) {
                        $tag.classList.add('is-right');
                    }

                    if ( (window.innerHeight - toggleRect.top ) < tagHeight ) {
                        $tag.classList.add('is-bottom');
                    }
                }

                $tag.style.width = tagWidth + 'px';
                $tag.style.height = tagHeight + 'px';
                $tag.classList.add(expandedClass);
            }

            return false;
        });
    };

    for (i = 0; i < $tagsPopupTriggers.length; i++) {
        $tagsPopupTriggers[i].addEventListener("click", function(e) {
            e.preventDefault();

            let $trigger = this;
            let triggerID = $trigger.dataset.id;
            let triggerSlideId = $tagsPopupSlider.querySelector('[data-id="'+triggerID+'"]').dataset.slickIndex;

            $($tagsPopupSlider).slick('slickGoTo', triggerSlideId, false);

            setTimeout(function() {
                $tagsPopup.classList.add(visibleClass);
            }, 400);

            fullpage_api.setAutoScrolling(false);
            fullpage_api.setFitToSection(false);
            $body[0].classList.add(lockedScrollClass2);

            collapseActiveTag();
        });
    }

    $tagsPopupClose.addEventListener("click", function(e) {
        e.preventDefault();

        $tagsPopup.classList.remove(visibleClass);
        fullpage_api.setAutoScrolling(true);
        fullpage_api.setFitToSection(true);
        $body[0].classList.remove(lockedScrollClass2);
    });

    document.addEventListener("keyup", function(e) {
        if (e.key === "Escape" || e.keyCode === 27) {
            $tagsPopup.classList.remove(visibleClass);
            collapseActiveTag();
            fullpage_api.setAutoScrolling(true);
            fullpage_api.setFitToSection(true);
            $body[0].classList.remove(lockedScrollClass2);
        }
    });
})();
/* Tags slider */
$(document).ready(function(){
    let $tagsSlider = $('[data-slider="tags"]');

    if ($tagsSlider.length === 0) {
        return false;
    }

    /* Blob */
    let canvas, ctx;
    let render, init;
    let blob;
    let color;

    class Blob {
        constructor() {
            this.points = [];
        }

        init() {
            for(let i = 0; i < this.numPoints; i++) {
                let point = new Point(this.divisional * ( i + 1 ), this);
                this.push(point);
            }
        }

        render() {
            let canvas = this.canvas;
            let ctx = this.ctx;
            let position = this.position;
            let pointsArray = this.points;
            let radius = this.radius;
            let points = this.numPoints;
            let divisional = this.divisional;
            let center = this.center;
            let color = this.color;

            ctx.clearRect(0,0,canvas.width,canvas.height);

            pointsArray[0].solveWith(pointsArray[points-1], pointsArray[1]);

            let p0 = pointsArray[points-1].position;
            let p1 = pointsArray[0].position;
            let _p2 = p1;

            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.moveTo( (p0.x + p1.x) / 2, (p0.y + p1.y) / 2 );

            for(let i = 1; i < points; i++) {

                pointsArray[i].solveWith(pointsArray[i-1], pointsArray[i+1] || pointsArray[0]);

                let p2 = pointsArray[i].position;
                var xc = (p1.x + p2.x) / 2;
                var yc = (p1.y + p2.y) / 2;
                ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);

                ctx.fillStyle = color;

                p1 = p2;
            }

            var xc = (p1.x + _p2.x) / 2;
            var yc = (p1.y + _p2.y) / 2;
            ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);

            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = color;

            requestAnimationFrame(this.render.bind(this));
        }

        push(item) {
            if(item instanceof Point) {
                this.points.push(item);
            }
        }

        set color(value) {
            this._color = value;
        }
        get color() {
            return this._color || color;
        }

        set canvas(value) {
            if(value instanceof HTMLElement && value.tagName.toLowerCase() === 'canvas') {
                this._canvas = canvas;
                this.ctx = this._canvas.getContext('2d');
            }
        }
        get canvas() {
            return this._canvas;
        }

        set numPoints(value) {
            if(value > 2) {
                this._points = value;
            }
        }
        get numPoints() {
            return this._points || 32;
        }

        set radius(value) {
            if(value > 0) {
                this._radius = value;
            }
        }
        get radius() {
            return this._radius || 100;
        }

        set position(value) {
            if(typeof value == 'object' && value.x && value.y) {
                this._position = value;
            }
        }
        get position() {
            return this._position || { x: 0.5, y: 0.5 };
        }

        get divisional() {
            return Math.PI * 2 / this.numPoints;
        }

        get center() {
            return { x: this.canvas.width - this.radius * this.position.x, y: this.canvas.height * this.position.y };
        }

        set running(value) {
            this._running = value === true;
        }
        get running() {
            return this.running !== false;
        }
    }

    class Point {
        constructor(azimuth, parent) {
            this.parent = parent;
            this.azimuth = Math.PI - azimuth;
            this._components = { 
                x: Math.cos(this.azimuth),
                y: Math.sin(this.azimuth)
            };

            this.acceleration = -0.3 + Math.random() * 0.6;
        }

        solveWith(leftPoint, rightPoint) {
            this.acceleration = (-0.3 * this.radialEffect + ( leftPoint.radialEffect - this.radialEffect ) + ( rightPoint.radialEffect - this.radialEffect )) * this.elasticity - this.speed * this.friction;
        }

        set acceleration(value) {
            if(typeof value == 'number') {
                this._acceleration = value;
                this.speed += this._acceleration * 2;
            }
        }
        get acceleration() {
            return this._acceleration || 0;
        }

        set speed(value) {
            if(typeof value == 'number') {
                this._speed = value;
                this.radialEffect += this._speed * 5;
            }
        }
        get speed() {
            return this._speed || 0;
        }

        set radialEffect(value) {
            if(typeof value == 'number') {
                this._radialEffect = value;
            }
        }
        get radialEffect() {
            return this._radialEffect || 0;
        }

        get position() {
            return { 
                x: this.parent.center.x + this.components.x * (this.parent.radius + this.radialEffect), 
                y: this.parent.center.y + this.components.y * (this.parent.radius + this.radialEffect) 
            }
        }

        get components() {
            return this._components;
        }

        set elasticity(value) {
            if(typeof value === 'number') {
                this._elasticity = value;
            }
        }
        get elasticity() {
            return this._elasticity || 0.001;
        }
        set friction(value) {
            if(typeof value === 'number') {
                this._friction = value;
            }
        }
        get friction() {
            return this._friction || 0.0085;
        }
    }

    blob = new Blob;

    init = function(color) {
        canvas = document.createElement('canvas');
        canvas.setAttribute('touch-action', 'none');
        canvas.setAttribute('class', 'tags-popup__blob');

        document.querySelector('[data-component="tags-popup"]').appendChild(canvas);

        let resize = function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        let oldMousePoint = { x: 0, y: 0};
        let hover = false;
        let mouseMove = function(e) {

            let pos = blob.center;
            let diff = { x: e.clientX - pos.x, y: e.clientY - pos.y };
            let dist = Math.sqrt((diff.x * diff.x) + (diff.y * diff.y));
            let angle = null;

            blob.mousePos = { x: pos.x - e.clientX, y: pos.y - e.clientY };

            if(dist < blob.radius && hover === false) {
                let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
                angle = Math.atan2(vector.y, vector.x);
                hover = true;
            } else if(dist > blob.radius && hover === true){ 
                let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
                angle = Math.atan2(vector.y, vector.x);
                hover = false;
                blob.color = null;
            }

            if(typeof angle == 'number') {

                let nearestPoint = null;
                let distanceFromPoint = 100;

                blob.points.forEach((point)=> {
                    if(Math.abs(angle - point.azimuth) < distanceFromPoint) {
                        nearestPoint = point;
                        distanceFromPoint = Math.abs(angle - point.azimuth);
                    }

                });
                if(nearestPoint) {
                    let strength = { x: oldMousePoint.x - e.clientX, y: oldMousePoint.y - e.clientY };
                    strength = Math.sqrt((strength.x * strength.x) + (strength.y * strength.y)) * 10;
                    if(strength > 100) strength = 100;
                    nearestPoint.acceleration = strength / 100 * (hover ? -1 : 1);
                }
            }

            oldMousePoint.x = e.clientX;
            oldMousePoint.y = e.clientY;
        }
        window.addEventListener('pointermove', mouseMove);

        blob.canvas = canvas;
        blob.color = color;
        blob.init();
        blob.render();
    }

    init();

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
/* Text slider */
$(document).ready(function(){
    let $textSlider = $('[data-slider="text-slider"]');

    $textSlider.slick({
        dots: true,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 5000,
    });

    $(window).on('orientationchange resize', function() {
        $textSlider.slick('resize');
    });
});
/* Vertical slider */
$(document).ready(function(){
    let $verticalSliders = $('[data-slider="vertical-slider"]');

    $verticalSliders.each(function(index, slider) {
        let $slider = $(slider);
        let $sliderParent = $slider.closest('[data-slider-parent]');
        let $sliderNav = $sliderParent.find('[data-slider="slider-nav"]');
        let maxHeight = -1;

        $slider.on('init', function(event, slick, currentSlide) {
            let $slider = $(slider);
            let $slides = $slider.find('.slick-slide');

            let tallestSlide = Math.max.apply(Math, $slides.map(function(index, el) {
                return $(el)[0].scrollHeight;
            }));

            $slides.css('height', tallestSlide + 'px');
        });

        $slider.slick({
            vertical: true,
            dots: true,
            arrows: false,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 15000,
            asNavFor: $sliderNav
        });

        $sliderNav.slick({
          arrows: false,
          fade: true
        }).on('afterChange', function(event, slick, currentSlide){
            let $currentSlideEl = $(slick.$slides.get(currentSlide));

            if ($currentSlideEl.find('video').length > 0) {
                let video = $currentSlideEl.find('video')[0];
                video.pause();
                video.currentTime = 0;
                video.play();
            }
        });

        $(window).on('orientationchange resize', function() {
            $slider.slick('resize');
            $sliderNav.slick('resize');
        });
    });
});
/* Video */
document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('page-home')) {
        return false;
    }

    let video = document.querySelector('video');

    if (!video) {
        return false;
    }

    let isPaused = false;
    let observer = new IntersectionObserver((entries, observer) => { 
        entries.forEach(entry => {
            if(entry.intersectionRatio!=1  && !video.paused){
                video.pause();
                isPaused = true;
            }
            else if(isPaused) {
                video.play(); 
                isPaused=false}
            });
        }, {threshold: 1});
    observer.observe(video);
});
/* Animate on Scroll */
$(document).ready(function(){
    AOS.init({
        duration: aosDuration,
        easing: 'ease-in-out',
        once: true
    });
});
/* Index page with fullpage.js */
var homeFullpage;
document.addEventListener('DOMContentLoaded', function() {
    const $homeFullpage = document.querySelector('.page-home [data-page="fullpage"]');

    if (!$homeFullpage) {
        return false;
    }

    function initialization(){
        homeFullpage = new fullpage('[data-page="fullpage"]', {
            paddingTop: $navbar[0].offsetHeight +'px',
            sectionSelector: '[data-fullpage="section"]',
            slideSelector: '[data-fullpage="slide"]',
            slidesNavigation: true,
            controlArrows: true,
            scrollBar: true,
            responsiveWidth: bpXL,
            normalScrollElements: '.section--scrollable',
            licenseKey: '7C83C7E4-02654F77-96AB0657-A3F6DE6F',
            scrollHorizontally: true,
            scrollHorizontallyKey: 'E6229FD0-80AC4893-A7CE7036-0EDBAD95',
            afterRender: function(){
                if (this.isFirst) {
                    typeWord(this);
                }
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