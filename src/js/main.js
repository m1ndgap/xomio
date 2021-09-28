$(document).ready(function() {
      
    /*
    $('.step-variants').each(function() {
        let el = $(this);
        checkStepVariants(el);
    });
    */
    let i = 0, speed = 60, txt = '', el = {},is_write = false,is_rewrite = false;
    
    function goWrite(element, text) {
        //if (element.innerHTML == '') {
            i = 0;
            txt = text;
            element.innerHTML = '';
            el = element;
            is_rewrite = false;
            is_write = true;
            typeWriter();
        //}
        
    }
    
    function goRewrite(element, text) {
        if (element.innerHTML != '') {
            i = text.length;
            txt = text;
            element.innerHTML = text;
            el = element;
            is_rewrite = true;
            is_write = false;
            typeRewriter();
        }
        
    }
    
    function typeWriter() {
        if (i < txt.length && is_write) {
            el.innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    function typeRewriter() {
        if (i >= 0 && el.innerHTML != '' && is_rewrite) {
            el.innerHTML = txt.substr(0, i);
            i--;
            setTimeout(typeRewriter, speed);
        }
    }
    
    
    
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
    
    $('.close-popup').on('click', function() {
        $('.popup').fadeOut(300);
    });
    $('.bl3 .tags-list .tag-item').each(function() {
        let w = $(this).outerWidth();
        $(this).find('.bg').width(w);
    });
    
    $('.bl3 .tags-list .tag-item .name').on('click', function() {
        if ($(this).closest('.tag-item').hasClass('open')) {
            $(this).closest('.tag-item').removeClass('open');
        } else {
            $('.bl3 .tags-list .tag-item.open').removeClass('open');
            $(this).closest('.tag-item').addClass('open');
        }
        
        return false;
    });
    $('.bl3 .tags-list .tag-item .detail .more').on('click', function() {
        $('.popup').fadeIn(300, function() {
            if (!$('.popup-list').hasClass('.slick-initialized')) {
                $('.popup-list').slick({
                  dots: false,
                  arrows: false,
                  infinite: true,
                  slidesToShow: 1,
                  pauseOnHover: false,
                  
                });
                
                
            }
            
        });
    });
    
    $(document).on('click', '.popup .popup-list .popup-list-item .next', function() {
        $('.popup-list').slick('slickNext');
        return false;
    });
    
    

    
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
    
    if ($('.main .bl1list').length > 0) {
         $('.bl1list').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            let txt = $('.main .bl1list .slick-slide[data-slick-index="'+currentSlide+'"] .title div').attr('data-text');
            if (txt) {
                goRewrite($('.main .bl1list .slick-slide[data-slick-index="'+currentSlide+'"] .title div')[0], txt);
            }
          anime({
              targets: '.main .bl1list .slick-slide[data-slick-index="'+nextSlide+'"] .li-item',
              translateY: [-5, 0],
              opacity: ['0', '1'],
              delay: anime.stagger(100, {start: 1000}), // increase delay by 100ms for each elements.

          });
        });
        
        $('.main .bl1list').on('afterChange', function(event, slick, currentSlide){
          console.log(currentSlide);
          let txt = $('.main .bl1list .slick-slide[data-slick-index="'+currentSlide+'"] .title div').attr('data-text');
          if (txt) {
              goWrite($('.main .bl1list .slick-slide[data-slick-index="'+currentSlide+'"] .title div')[0], txt);
          }
          
          if ($('.main .bl1list-video-item.slick-slide[data-slick-index="'+currentSlide+'"]').find('video').length > 0) {
              let video = $('.main .bl1list-video-item.slick-slide[data-slick-index="'+currentSlide+'"] video')[0];
              video.pause();
              video.currentTime = 0;
              video.play();
          }


        });
        
        $('.main .bl1list').on('init', function(event, slick){

          let txt = $('.main .bl1list .slick-active .title div').attr('data-text');
          if (txt) {
              goWrite($('.main .bl1list .slick-active .title div')[0], txt);
          }
          
          anime({
              targets: '.main .bl1list .slick-active .li-item',
              translateY: [-5, 0],
              opacity: ['0', '1'],
              delay: anime.stagger(100, {start: 1000}), // increase delay by 100ms for each elements.

          });
          
        });
            
        $('.main .bl1list').slick({
          dots: true,
          arrows: false,
          fade: true,
          infinite: true,
          slidesToShow: 1,
          speed: 800,
          pauseOnHover: false,
          pauseOnFocus: false,
          autoplay: true,
          autoplaySpeed: 28000,
          asNavFor: '.main .bl1list-video'
        });
        
        $('.main .bl1list-video').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          pauseOnFocus: false,
          pauseOnHover: false,
          arrows: false,
          fade: true
        });
    }
    
    
    
    
    
    $('.bl2list').slick({
      dots: true,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      pauseOnHover: false,
      autoplay: true,
        autoplaySpeed: 4400
    });
    
    if ($('.main .bl4list').length > 0) {
        $('.main .bl4list').on('afterChange', function(event, slick, currentSlide){
          if ($('.bl4list-video-item.slick-slide[data-slick-index="'+currentSlide+'"]').find('video').length > 0) {
              let video = $('.bl4list-video-item.slick-slide[data-slick-index="'+currentSlide+'"] video')[0];
              video.pause();
              video.currentTime = 0;
              video.play();
          }
        });
        
        $('.main .bl4list').slick({
          dots: true,
          arrows: false,
          infinite: true,
          slidesToShow: 1,
          pauseOnHover: false,
          autoplay: true,
          autoplaySpeed: 5000,
          asNavFor: '.bl4list-video'
        });
        
        $('.main .bl4list-video').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true
        });
    }
    
    
    
        $('.idx-car1').on('afterChange', function(event, slick, currentSlide){
          if ($('.idx-car1-video .bl4list-video-item.slick-slide[data-slick-index="'+currentSlide+'"]').find('video').length > 0) {
              let video = $('.idx-car1-video .bl4list-video-item.slick-slide[data-slick-index="'+currentSlide+'"] video')[0];
              video.pause();
              video.currentTime = 0;
              video.play();
          }
        });
        
        $('.idx-car1').slick({
          dots: true,
          arrows: false,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          pauseOnHover: false,
          autoplay: true,
          autoplaySpeed: 5000,
          asNavFor: '.idx1-car-video'
        });
        
        $('.idx1-car-video').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true
        });

    
    
    $('.textlist .li-item .li-title').on('click', function() {

        let el = $(this).parent().find('.li-desc')[0];
        let parent = $(this).closest('.li-item');
        if ($(parent).hasClass('open')) {
            
            setTimeout(function() { $(parent).removeClass('open');  }, 200);
            anime({
                targets: el,
                translateY: [0, -5],
                opacity: ['1', '0'],
                duration: 500,
                complete: function(anim) {
                    
                }
            });
            
        } else {
            $(parent).addClass('open');
            anime({
                targets: el,
                translateY: [-5, 0],
                opacity: ['0', '1'],
                duration: 500,
                delay: 200,
            });
        }
        
        return false;
    });
    
	var is_mobile = false;
	function mobileInit() {
				
		
	}
    

});