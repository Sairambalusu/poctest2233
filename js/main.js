$(function () {
	'use strict';


	// PAGE TRANSITIONS
	// ---------------------------------
	$(".animsition").animsition({
		inClass               :   'fade-in',
		outClass              :   'fade-out',
		inDuration            :    800,
		outDuration           :    500,
		// linkElement           :   '.animsition-link',
		linkElement           :   'a:not([target="_blank"]):not([href^=#]):not([class*="popup-"]):not([class*="no-redirect"])',
		loading               :    true,
		loadingParentElement  :   'body', //animsition wrapper element
		loadingClass          :   'animsition-loading',
		unSupportCss          : [ 'animation-duration',
								  '-webkit-animation-duration',
								  '-o-animation-duration'
								],
		overlay               :   false,
		overlayClass          :   'animsition-overlay-slide',
		overlayParentElement  :   'body'
	});	



	// IF ELEMENT VISIBLE
	// ---------------------------------
	$.fn.isVisible = function(){
		var st = $(window).scrollTop(),
			wh = $(window).height(),
			tt = $(this).offset().top,
			th = $(this).height(),
			r;
		if(st+wh>=tt && tt+th>=st){r = 1}else{r = 0}
		return r;
	};



	// HEADER
	// ---------------------------------

	// small header on scroll
	if( !$('#header').hasClass('header-small') ){
		$(window).scroll(function () {
			var wh = $(window).height(),
				st = $(window).scrollTop();
			if( st >= wh/3 ){
				$('#header').addClass('header-small');
				$('a.logo').addClass('logo-hide');
				$('a.logo-top').removeClass('logo-hide');
			}else{
				$('#header').removeClass('header-small');
				$('a.logo').removeClass('logo-hide');
				$('a.logo-top').addClass('logo-hide');
			}
		}).scroll();
	}

	// Show on scroll-Up
	$('#header.headroom').headroom();

	// dark HEADER
	if( $('.hero.text-dark').length ){
		$('#header').addClass('text-dark');
		$('.overlay-footer').removeClass('text-light').addClass('text-dark');
	}



	// OVERLAY MENU
	// ---------------------------------

	// menu button click
	$('.show-overlay-menu').click(function(){
		$('.overlay-menu').addClass('active');

		var lil = $('.overlay-menu li').length,
			s   = 1;
		setInterval(function () {
			if( s <= lil ){
				$('.overlay-menu li:nth-child('+ s +')').addClass('visible');
				s = s+1;
			}
		}, 70);

		return false;
	});

	// overlay menu close button
	$('.menu-close').click(function(){
		$('.overlay-menu').removeClass('active');
		$('.overlay-menu li').removeClass('visible');
		return false;
	});
	// overlay menu submenu
	$('.overlay-menu .has-submenu a').click(function () {
		if( $(this).parent('.has-submenu').hasClass('opened') ){
			$(this).parent('.has-submenu').removeClass('opened');
			$(this).next('ul').slideUp();
		}else{
			$(this).closest('#nav').find('.has-submenu').removeClass('opened');
			$(this).closest('#nav').find('.has-submenu ul').slideUp();
			$(this).parent('.has-submenu').addClass('opened');
			$(this).next('ul').slideDown();
		}
		return false;
	});
	// overlay menu link
	$('.overlay-menu a.sscroll').click(function(){
		$('.overlay-menu').removeClass('active');
		$('.overlay-menu li').removeClass('visible');
		return false;
	});

	// HERO SCROLL DOWN ARROW
	$('.scroll-down:not(.sscroll)').click(function () {
		var wh = $(window).height()+70;
		$('html, body').animate({ scrollTop: wh }, 1300, 'easeInOutExpo');
		return false;
	});

	// HERO OVERLAY FOOTER
	$(window).scroll(function () {
		var st = $(window).scrollTop();
		if( st > 0 ){
			$('.overlay-footer').fadeOut();
		}else{
			$('.overlay-footer').fadeIn();
		}
	});	



	// OWL CAROUSEL
	$('.owl-slider').each(function () {
		var $this = $(this),
			items = $this.data('items'),
			itemsTablet = $this.data('items-tablet'),
			itemsMobile = $this.data('items-mobile'),
			speed = $this.data('speed'),
			margin = $this.data('margin'),
			loop  = $this.data('loop'),
			loop  = loop != undefined ? loop : true,
			dots  = $this.data('dots'),
			dots  = dots != undefined ? dots : true,
			nav   = $this.data('nav'),
			nav   = nav != undefined ? nav : true,
			autoplay = $this.data('autoplay'),
			autoplay = autoplay != undefined ? autoplay : true,
			mousewheel = $this.data('mousewheel'),
			mousewheel = mousewheel != undefined ? mousewheel : false;
		$this.imagesLoaded(function () {
			$this.owlCarousel({
				dots: dots,
				nav: nav,
				loop: loop,
				autoplay: autoplay,
				autoplayTimeout: (speed+9000) || 5000,
				smartSpeed: speed || 1000,
				dotsSpeed: 1000,
				navSpeed: 1000,
				autoHeight : true,
				responsive: {
					0:   { items: itemsMobile || itemsTablet || items || 1 },
					768: { items: itemsTablet || items || 1 },
					992: { items: items || 1 }
				},
				margin: margin || 0
			});
		});
		// refresh height on resize
		$this.on('resized.owl.carousel', function(event) {
			$this.find('.owl-height').css('height', $this.find('.owl-item.active').height() );
		});

		if( mousewheel ){
			$this.mousewheel(function(e){
				if( e.deltaY < 0 ){
					$this.trigger('next.owl.carousel');
				}else{
					$this.trigger('prev.owl.carousel');
				}
			});
		}

	});



	// BACKGROUNDS
	$('[data-background]').each(function(){
		var bg = $(this).attr('data-background');
		if( bg.match('^rgb') || bg.match('^#') ){
			$(this).css('background-color', bg);
		}else{
			$(this).css('background-image', 'url('+bg+')');
		}
	});



	// POSITIONS
	$('[data-positionX]').each(function(){
		var x = $(this).attr('data-positionX');
		$(this).css('left', x+'px');
	});
	$('[data-positionY]').each(function(){
		var y = $(this).attr('data-positionY');
		$(this).css('top', y+'px');
	});



	// PARALLAX BACKGROUNDS
	// ---------------------------------
	$.stellar({
		horizontalScrolling: false
	});
	// stellar fix - bg position on load
	if( $('[data-stellar-background-ratio]').length > 0 ){
		setTimeout(function () {
			var st = $(window).scrollTop();
			$(window).scrollTop(st+1);
			setTimeout(function(){
				$(window).scrollTop(st)
			}, 200)
		}, 200);
	};



	// SMOOTH SCROLL
	// ---------------------------------
	$('.sscroll').click(function () {
		var ti = $(this).attr('href'),
			tt = $(ti).offset().top+1;	//$(ti).offset().top-100;
		$('html, body').animate({ scrollTop: tt }, 1000, 'easeInOutExpo');
		return false;
	});	



	// ITEM APPEAR ANIMATION
	// ---------------------------------
	new WOW().init();	



	// YT Background
	// ---------------------------------
	$('.ytbg').YTPlayer({
		mute: true,
		showControls: false,
		showYTLogo: false,
		containment: 'self'
	});	



	// EQUAL-HEIGHT COLUMNS	
	$('.equal-height-cols').each(function () {
		var el = $(this).find('[class*="col-"]');
		el.matchHeight({
			byRow: false
		});
	});  



	// RESPONSIVE VIDEOS
	// ---------------------------------
	$('.video-container').fitVids();


	// MASONRY
	// ---------------------------------
	$(window).load(function(){
		$('.masonry').each(function () {
			var $this = $(this);
			$this.imagesLoaded(function () {
				$this.isotope({
					itemSelector: '.masonry-item'
				});
			});
		});
		
		if(( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {	
			$('#hero div.hero').css({'background-attachment': 'scroll'});
		}
	});	
	


	// MOUSE PARALLAX
	$('.no-touch .mouse-parallax').each(function(){
		var mouseX;
		var mouseY;
		var $this = $(this);
		var $speed = $this.attr('data-speed'),
			$speed = $speed != undefined && $speed != '' ? $speed : 0.05;
		
		$(window).mousemove(function(e){
			if( window.innerWidth >= 993 ){
				mouseX = e.pageX;
				mouseY = e.pageY;
				var st = $(window).scrollTop();
				var iw = $this.width();
				var ih = $this.height();
				var it = $this.offset().top;
				var il = $this.offset().left;
				var centerX = il + iw/2;
				var centerY = it - st + ih/2;
				var leftPos = -(mouseX - centerX) * $speed;
				var topPos = -(mouseY - centerY) * $speed;
				$this.css({
					'-webkit-transform': 'translate3d('+leftPos+'px, '+topPos+'px, 0)',
					'-ms-transform': 'translate3d('+leftPos+'px, '+topPos+'px, 0)',
					'transform': 'translate3d('+leftPos+'px, '+topPos+'px, 0)'
				});
			}
		});
		
	});	



	// SCROLL TO TOP
	// ---------------------------------
	$(window).scroll(function () {
		var wh = $(window).height(),
			st = $(window).scrollTop();
		if( st >= wh*1.2 ){ $('.to-top').addClass('visible'); }else{ $('.to-top').removeClass('visible') }
	});
	$('.to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 600);	
		return false;	
	});

	$('.logo-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 600);	
		return false;	
	});
	
	// IMAGE POPUP
	// ---------------------------------
	// single
	$('.popup-image').magnificPopup({
		type: 'image',
		mainClass: 'mfp-fade',
		removalDelay: 300,
		closeOnContentClick: true,
		fixedContentPos: false,
		fixedBgPos: false
	});
	// gallery mode
	$('.popup-gallery-link').magnificPopup({
		gallery: {
			enabled: true
		},
		mainClass: 'mfp-fade',
		fixedContentPos: false,
		type: 'image'
	});	


	// YOUTUBE, VIMEO, GOOGLE MAPS POPUP
	// ---------------------------------
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		disableOn: 0,
		preloader: false,
		removalDelay: 300,
		fixedContentPos: false
	});

	// GALLERY POPUP (wrapper)
	// ---------------------------------
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		gallery: {
			enabled: true
		},
		mainClass: 'mfp-fade',
		fixedContentPos: false,
		type: 'image'
	});	
	// SINGLE GALLERY
	$('.popup-single-gallery').each(function () {
		$(this).magnificPopup({
			delegate: 'a',
			mainClass: 'mfp-fade',
			gallery: {
				enabled: true
			},
			fixedContentPos: false,
			type: 'image'
		});		
	});
	
	$(document).ready(function() {
		$('.icon-hover-box').bind('touchstart touchend', function(e) {
			//e.preventDefault();
			$(this).toggleClass('hoverover');
		});
    });
	
})
