
$(document).ready(function() {
	
	$('body').addClass('js');

	console.log('Check it: https://github.com/laras126/dijifi-theme')

	$('.site-cta').slideDown(300);

	$('.site-cta-close').click(function() {
		$('.site-cta').slideUp(300);
	});

	// ----
	// Toggle Menu
	// ----

	// TODO: better fallback for non-JS - adding a .js class but it causes the nav to blink
	// Look into Modernizr for that

	var $menu = $('#menu'),
	    $menulink = $('.menu-link'),
	    $menuTrigger = $('.has-subnav > a');

	$menulink.click( function(e) {
		e.preventDefault();
		$menulink.toggleClass('open');
		$menu.toggleClass('open');
		return false;
	});

	$menuTrigger.click(function(e) {
		e.preventDefault();
		var $this = $(this);
		$this.toggleClass('open').next('ul').toggleClass('open');
	});
		


	// Plugins

	$('.lazy').show().lazyload({
		effect : 'fadeIn',
		threshold : 400
	}); // Am I lazy for using this?



	// Header image spinner (with imagesloaded)

	var $hero = $('.hero-image');
		
	$hero.each( function() {
		var $image = $(this).find('#headerImageLoader'),
			$t = $(this),
			imageSrc = $image.attr('src');
	
		$(this).imagesLoaded( function() {

			$t.fadeTo(200, 0.5, function() {
			    $t.css('background-image', 'url(\'' + imageSrc + '\')');
			}).fadeTo(600, 1);

			$t.find('.spinner').hide();
			
		});
	});
	


	// If there are videos, load them nicely
    // Thx: http://atomicrobotdesign.com/blog/web-development/check-when-an-html5-video-has-loaded/

    if( $('video').length ) {
	    window.addEventListener('load', function() {
	        var video = document.querySelector('.hero-video video');
	        var preloader = document.querySelector('.spinner');

	        function checkLoad() {
	            if (video.readyState === 4) {
	                console.log('loaded');
	                $('.spinner').fadeOut(300);
	                $('.hero-video video').fadeIn(300);
	            } else {
	                setTimeout(checkLoad, 100);
	            }
	        }
	        checkLoad();
	    }, false);
    }



	// ----
	// Submenu
	// ----

	// This jumps...will need to fix
	 var scroll_class = 'stuck',
		$nav = $('.content-nav'),
		nav_ht = $nav.outerHeight()*1.5,
		header_ht = $('.page-header').outerHeight() + $('.site-header').outerHeight(),
		total_ht = header_ht;
  	

	// 1. Highlight current item
	// 2. Slide to current section on click
	$('.content-nav a').not('.directional-icon').click( function() {

		var hash = $(this).attr('href');
		var $target = $(hash + ' .section-title');

		// Slide to section corresponding to clicked hash
		$('html,body').animate({
			scrollTop: $target.offset().top - nav_ht*1.5
        }, 700);

		return false;
	}); // END click

	$('.top-link a').click( function() {
		var hash = $('#pageTop');
		var $target = $(hash);

		// Slide to section corresponding to clicked hash
		$('html,body').animate({
			scrollTop: $target.offset().top
        }, 700);

        return false;

	});




	// Highlight the current item according to position on the screen
	// http://stackoverflow.com/questions/9979827/change-active-menu-item-on-page-scroll
	// (continued below)
	
	// Cache selectors
	var topMenu = $(".content-nav"),
    topMenuHeight = topMenu.outerHeight()+40,
    
    // All list items
    menuItems = topMenu.find("a"),
    
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
		var item = $($(this).attr("href"));
      	if (item.length) { return item; }
    });



	$(window).scroll( function() {

		// Add the class to make the nav stick
		if( $(this).scrollTop() > total_ht ) {

			$nav.addClass(scroll_class);
			$('.top-link-bottom').fadeIn(300);
			$('.content-nav-arrow').fadeOut(300);

			$('.top-link-top').css({
				'width': '50px',
				'opacity': '1'
			});
			
		} else if( $(this).scrollTop() < total_ht ) {

			$nav.removeClass(scroll_class);
			$('.top-link-bottom').fadeOut(300);
			$('.content-nav-arrow').fadeIn(300);
			
			$('.top-link-top').css({
				'width': '0',
				'opacity': '0'
			});
		}


		// Highlight the current item according to position on the screen
		// http://stackoverflow.com/questions/9979827/change-active-menu-item-on-page-scroll
	
		// Get container scroll position
   		
   		var fromTop = $(this).scrollTop()+topMenuHeight;

   		// Get id of current scroll item
   		var cur = scrollItems.map(function(){
     		if ($(this).offset().top < fromTop)
       			return this;
   		});
   
   		// Get the id of the current element
   		cur = cur[cur.length-1];
   		var id = cur && cur.length ? cur[0].id : "";
   		
   		// Set/remove active class
   		menuItems
     		.parent().removeClass("content-nav-active")
     		.end().filter("[href=#"+id+"]").parent().addClass("content-nav-active");
	
	}); // END scroll






	// ----
	// Misc
	// ----

	// Hack to keep out widows
	// http://css-tricks.com/preventing-widows-in-post-titles/
   
	$('.item-title, .section-title, .main p').each( function() {
		var wordArray = $(this).text().split(" ");
		if (wordArray.length > 3) {
			wordArray[wordArray.length-2] += "&nbsp;" + wordArray[wordArray.length-1];
			wordArray.pop();
	    	$(this).html(wordArray.join(" "));
	  	}
	});


});

