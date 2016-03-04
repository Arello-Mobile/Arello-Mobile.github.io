var showMessageAlert = function(message) {
    var $messageAlert = $('.message-alert');
    $messageAlert.html(message).show('middle', function() {
        setTimeout(function() {
            $messageAlert.hide('middle');
        }, 1200)
    });
};

var initWaypoint = function() {
    var $logo = $('.logo .img-logo');
    var $menu = $('.menu');
    //Elements
    var $mobile = $('#mobile');
    var $products = $('#products');
    var $main = $('#main');
    var $gamedev = $('#gamedev');
    var $about = $('#about');
    //Constants
    var LOGO_CENTER_OFFSET = 121;

    $(window).on('scroll', function(ev) {
        var topMain = $main.offset().top;
        var bottomMain = $main.height() + topMain;

        var topMobile = $mobile.offset().top;
        var bottomMobile = $mobile.height() + topMobile;

        var topProducts = $products.offset().top;
        var bottomProducts = $products.height() + topProducts;

        var topGamedev = $gamedev.offset().top;
        var bottomGamedev = $gamedev.height() + topGamedev;

        var topAbout = $about.offset().top;
        var bottomAbout = $about.height() + topAbout;

        var currentOffset = window.pageYOffset || document.documentElement.scrollTop;
        if (currentOffset + LOGO_CENTER_OFFSET > topMain && currentOffset < bottomMain - LOGO_CENTER_OFFSET ) {
            $menu.removeAttr('style');
            $menu.find('.logo').removeAttr('style');
            $menu.find('.bg-nav').removeAttr('style');
            $menu.find('.menu-wrapper').removeAttr('style');
            $menu.addClass('top');
            $logo.removeClass('logo2').removeClass('logo3').removeClass('logo4').removeClass('logo5').addClass('logo1');
        } else if (currentOffset + LOGO_CENTER_OFFSET > topMobile && currentOffset < bottomMobile - LOGO_CENTER_OFFSET) {
            $menu.removeClass('top');
            $logo.removeClass('logo1').removeClass('logo3').removeClass('logo4').removeClass('logo5').addClass('logo2');
        } else if (currentOffset + LOGO_CENTER_OFFSET > topProducts && currentOffset < bottomProducts - LOGO_CENTER_OFFSET) {
            $menu.removeClass('top');
            $logo.removeClass('logo1').removeClass('logo2').removeClass('logo4').removeClass('logo5').addClass('logo3');

        } else if (currentOffset + LOGO_CENTER_OFFSET > topGamedev && currentOffset < bottomGamedev - LOGO_CENTER_OFFSET) {
            $menu.removeClass('top');
            $logo.removeClass('logo1').removeClass('logo2').removeClass('logo3').removeClass('logo5').addClass('logo4');
        } else if (currentOffset + LOGO_CENTER_OFFSET > topAbout && currentOffset < bottomAbout - LOGO_CENTER_OFFSET) {
            $menu.removeClass('top');
            $logo.removeClass('logo1').removeClass('logo2').removeClass('logo3').removeClass('logo4').addClass('logo5');
        }
    });
};

var clearContactForm = function() {
    var $contactForm = $('#contactForm');
    $contactForm.clearForm();
    $contactForm.find('.error').empty();
    $contactForm.find('.has-error').removeClass('has-error');
};

var initScrollTo  = function(scrollToEvent) {
	$('.main-nav .inside-link, .logo').on(scrollToEvent, function(e){
		e.preventDefault();
		var l = $(this);
        var $el = $($(this).attr('href'));
        var targetPosition = $el.offset().top;
        var currentPosition = window.pageYOffset || document.documentElement.scrollTop;
        var difference = targetPosition - currentPosition;

        $el.velocity('scroll', {
            duration: Math.abs(parseInt(difference * 0.55)),
            delay: 100
        });
        //GA
        __gaTracker('send', 'event', 'Scroll to element', scrollToEvent, $el.selector, difference);
	});
};

var Mobile = function() {};
Mobile.prototype = {
    init: function() {
    },
    events: function() {
    },
    stopEvents: function() {
    }

};

var Service = function() {};
Service.prototype = {
    init: function() {
    },
    events: function() {
    },
    stopEvents: function() {
    }
};

var Menu = function() {};
Menu.prototype = {
    init: function() {
        this.$menu = $('.menu');
    },
    events: function() {
        this.$menu.off('mouseover mouseleave');
        this.$menu.on('mouseover', $.proxy(function(ev) {
            var $el = $(ev.currentTarget);
            if ($el.hasClass('top'))
                return;

            this._animateLeftMenu($el, '-29px', '1px','#e76c50');
        }, this));

        this.$menu.on('mouseleave', $.proxy(function(ev) {
            var $el = $(ev.currentTarget);
            if ($el.hasClass('top'))
                return;

            this._animateLeftMenu($el, '-34px', '0', 'rgba(29, 29, 29, 0.3)');
        }, this));
    },
    stopEvents: function() {
        this.$menu.off('mouseover mouseleave');
    },

    _animateLeftMenu: function($menu, menuLeft, logoRight, wrapperBackground) {
        var $logo = $menu.find('.logo');
        var $menuWrapper = $menu.find('.menu-wrapper');

        $menu.animate({left: menuLeft}, 50, function(){});
        $logo.animate({right: logoRight}, 50, function(){});
        $menuWrapper.css({backgroundColor: wrapperBackground});
    }

};


var changesByWindow = function(menu, servce, mobile) {
    var $html = $('html');
    $html.css('overflow', 'hidden');
    var width = $(window).width();
    $html.css('overflow', 'auto');

    if (width < 1200 || (width < 1282 && $html.attr('data-platform') == 'android')) {
        $('.pw-clients').css('width', '100%');
        $('.pw').css('width', '100%');
        FastClick.attach(document.body);

        menu.stopEvents();
        servce.stopEvents();
        $('.contact').attr('href', '\/contact_us');
    } else {
        $('.pw-clients, .pw').removeAttr('style');

        menu.events();
        servce.events();
        initWaypoint();
        $('.contact').attr('href', '#contact');
    }
    if (width > 1200 && width <= 1500) {
        $('#products .pw-stats li:first-child b').html('PUSHWOOSH<br>INC.');
        $('#mobile .mobile-stats li:last-child').html('<b>ALL</b> mobile platforms<br>you need')
    } else {

        if (width > 480 && width <= 768) {
            $('#products .pw-stats li:first-child b').html('PUSHWOOSH<br/>INC.');
        } else {
            $('#products .pw-stats li:first-child b').html('PUSHWOOSH INC.');
        }

        $('#mobile .mobile-stats li:last-child').html('<b>ALL</b> mobile platforms you need')
    }

    var $pwLogoItem = $('.pw-logo-item');
    if (width < 1200 || (width < 1282 && $html.attr('data-platform') == 'android')) {
        $pwLogoItem.css('width', '20%');
    } else {
        $pwLogoItem.removeAttr('style');
    }

    if (width <= 480) {
        $pwLogoItem.each(function() {
            $(this).css('width', '33.33333333%')
        })
    }
};

function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie 9') != -1 || myNav.indexOf('msie9') != -1)
}
//GA
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','__gaTracker');

__gaTracker('create', 'UA-59621646-1', 'auto');
__gaTracker('send', 'pageview');

$(function() {
    //GA
    $('[href="#contact"], [href="contact_us"]').click(function() {
        __gaTracker('send', 'event', 'Follow Link', 'click', 'contact_us');
    });
    $('[type="submit"]').click(function() {
         __gaTracker('send', 'event', 'Submit Form', 'click', 'contact us');
    });
    $('.pw-link').click(function() {
         __gaTracker('send', 'event', 'Follow Link', 'click', 'Pushwoosh');
    });
    $('.social-icons a').click(function() {
        if ($(this).attr('href') == '#contact_us' || $(this).attr('href') == '/contact_us')
            return
        __gaTracker('send', 'event', 'Follow Link', 'click', 'Social Link', $(this).attr('href'));
        _gaq.push(['_trackEvent', 'Videos', 'Stop', 'Gone With the Wind'])
    });


    var $products = $('#products');
    $(window).on('scroll', function() {
        var top = $products.offset().top;
        var currentPosition = window.pageYOffset || document.documentElement.scrollTop;
        var windowHeight = $(window).height();
        if (currentPosition + windowHeight + 10 > top && currentPosition < top + $products.height() + 10) {
            $products.find('.background-wrapper').css('position', 'fixed');
            $('body').css('background', '#40619b');
        } else {
            $products.find('.background-wrapper').removeAttr('style');
            $('body').css('background', '#f6f6f6');
        }

    });

    if (isIE())
        $('#contact label').show();

    var $a =$('.main-nav a');
    $a.on('mousedown', function() {
        var $el = $(this);
        setTimeout(function()  {
            $el.blur()
        }, 50)
    });
    $a.on('touchend', function() {
        var $el = $(this);
        setTimeout(function()  {
            $el.blur()
        }, 50)
    });


    var scrollToEvent = ($(window).width() < 1200) ? 'tap' : 'click';
    initScrollTo(scrollToEvent);

    var menu = new Menu();
    var mobile = new Mobile();
    var service = new Service();

    menu.init();
    mobile.init();
    service.init();

    changesByWindow(menu, service, mobile);

    $(window).resize(function() {
        __gaTracker('send', 'event', 'window', 'resize', 'Width', $(window).width);
        changesByWindow(menu, service, mobile);
    });

    var $body = $('body');
    $body.delegate('.modal', 'hidden.bs.modal', function (ev){
        if (!$('.modal-backdrop.in').length) { $body.css('overflow-y', 'auto'); }
    });
    $body.delegate('.modal', 'shown.bs.modal', function (ev){
        $body.css('overflow-y', 'hidden');
        var $el = $(this);
        setTimeout(function() {
            $body.css('padding-right', '0 !important')
        }, 10)
    });

	/* logo slider and gamedev portfolio sliders */
	
//	var slides = $('.game-menu li');
//	var mySwiper = $('.swiper-container').swiper({
//		mode:'horizontal',
//		loop: true,
//		autoplay: false,
//		onSlideChangeEnd: function(s){
//			slides.removeClass('active');
//			slides.eq(s.activeLoopIndex).addClass('active');
//		}
//	});
//
//	$('.game-menu li a').on('click', function(e){
//		e.preventDefault();
//		slides.removeClass('active');
//		slides.eq($(this).parent().index()).addClass('active');
//		mySwiper.swipeTo($(this).parent().index(), 500);
//	});


	//if( !isMobile.any ){	

	//if( false ){

    /***** Game dev animation *********/
		var strength1 = 20,
		    strength2 = 2,
			strength3 = 5,
			strength4 = 55,
			strength5 = 5,
			init = false,
			prop = 'background-position',
			prop2 = '-webkit-transform';

		var el = {
			gd : $('#gamedev'),
			gdCastle: $('.gamedev-castle'),
			fly1: $('.fly1'),
			fly2: $('.fly2'),
			dragoon: $('.dragoon'),
			cloud: $('.cloud')
		};

		$('.fly1, .fly2, .dragoon').animate( { opacity: 1}, 400, function(){
			init = true;
		});
//
//		el.gd.mousemove(function(e){
//			var pageX = e.pageX - ( el.gd.width() / 2);
//			var pageY = e.pageY - ( el.gd.height() / 2);
//			var newvalueX = pageX * -1;
//			var newvalueY = pageY * -1;
//			if (!init) {
//			}
//			else {
//				el.gd.css(prop, (strength1+120 / el.gd.width() * pageX+120 * -1)+'px '+(strength1  / el.gd.height() * pageY+130 * -1)+'px');
//				el.gdCastle.css(prop, (strength1 / el.gdCastle.width() * pageX+200 * -1)+'px 100%');
//				el.cloud.css(prop, (strength5 / el.cloud.width() * pageX * 1)+140+'px '+(strength3  / el.cloud.height() * pageY-20 * -1)+'px');
//				/*el.fly1.css(prop, (strength4 / el.gd.width() * pageX * -1)+50+"px "+(strength1  / el.fly1.height() * pageY-20 * -1)+"px");
//				el.fly2.css(prop, (strength3 / el.fly2.width() * pageX * 1)+40+"px "+(strength3  / el.fly1.height() * pageY-20 * -1)+"px");
//				el.dragoon.css(prop, (strength3 / el.dragoon.width() * pageX * 1)+40+"px "+(strength3  / el.dragoon.height() * pageY-20 * -1)+"px");
//				*/
//
//				// http://caniuse.com/#feat=transforms2d
//				// FPS optimized
////				el.gd.css(prop2,'translate('+(strength1 / el.gd.width() * pageX+120 * -1)+"px "+(strength1  / el.gd.height() * pageY+170 * -1)+"px)");
////				el.gdCastle.css(prop2, (strength1 / el.gdCastle.width() * pageX+200 * -1)+"px 100%");
//
//				el.fly1.css('-ms-transform', 'translate('+ (strength4 / el.gd.width() * pageX * -1).toFixed(3)+50+'px, '+(strength1  / el.fly1.height() * pageY-20 * -1).toFixed(3)+'px)');
//				el.fly2.css('-ms-transform', 'translate('+ (strength3 / el.fly2.width() * pageX).toFixed(3)+40+'px, '+(strength3  / el.fly1.height() * pageY-20 * -1).toFixed(3)+'px)');
//				el.dragoon.css('-ms-transform', 'translate('+ (20 / el.dragoon.width() * pageX).toFixed(3)+40+'px, '+(20  / el.dragoon.height() * pageY-20).toFixed(3)+'px)');
//
//                el.fly1.css('-webkit-transform', 'translate('+ (strength4 / el.gd.width() * pageX * -1).toFixed(3)+50+'px, '+(strength1  / el.fly1.height() * pageY-20 * -1).toFixed(3)+'px)');
//				el.fly2.css('-webkit-transform', 'translate('+ (strength3 / el.fly2.width() * pageX).toFixed(3)+40+'px, '+(strength3  / el.fly1.height() * pageY-20 * -1).toFixed(3)+'px)');
//				el.dragoon.css('-webkit-transform', 'translate('+ (20 / el.dragoon.width() * pageX).toFixed(3)+40+'px, '+(20  / el.dragoon.height() * pageY-20).toFixed(3)+'px)');
//
//				el.fly1.css({ transform: 'translate('+ (strength4 / el.gd.width() * pageX * -1).toFixed(3)+50+'px, '+(strength1  / el.fly1.height() * pageY-20 * -1).toFixed(3)+'px)' });
//				el.fly2.css({ transform: 'translate('+ (strength3 / el.fly2.width() * pageX).toFixed(3)+40+'px, '+(strength3  / el.fly1.height() * pageY-20 * -1).toFixed(3)+'px)' });
//				el.dragoon.css({ transform: 'translate('+ (20 / el.dragoon.width() * pageX).toFixed(3)+40+'px, '+(20  / el.dragoon.height() * pageY-20).toFixed(3)+'px)' });
//				//el.cloud.css({ transform: 'translate('+ (strength5 / el.cloud.width() * pageX * 1)+140+'px, '+(strength3  / el.cloud.height() * pageY-20 * -1)+"px)" });
//			}
//		});
/************** end game dev animation****************/
	//}

    $('#contactForm').ajaxForm({
       success: function(response) {
           $('.form-group.has-error').removeClass('has-error');

           $('.error').each(function() {
                $(this).empty();
           });

            _.each(response.errors, function(error, name) {
                var $errorContainer = $('.error-' + name);
                if (error != '')
                    $errorContainer.closest('.form-group').addClass('has-error');

                $errorContainer.html(error);
            });

            if (response.status) {
                showMessageAlert('Message has been sent!');
                $('#contact').modal('hide');
            }
       },
       complete: function() {

       }
    });

    $('#contact').on('hide.bs.modal', clearContactForm)

});


/*
$(window).scroll(function() {
  var scrolledY = $(window).scrollTop();

  //$('#iphone_background').css("background-position-y", scrolledY + 'px');
  //$('#ipad_background').css("background-position-y", scrolledY-1500 + 'px');
});
*/


// IE scroll jump issue fix
if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
    $('body').on("mousewheel", function () {
      event.preventDefault();
      var wd = event.wheelDelta;
      var csp = window.pageYOffset;
      window.scrollTo(0, csp - wd);
    });
  }