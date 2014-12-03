$(document).ready(function() {
	
	$('body').addClass('js');

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
		

	// ----
	// Submenu
	// ----

	// This jumps...will need to fix
	 var scroll_class = 'stuck',
		header_ht = $('.page-header').outerHeight() + $('.site-header').outerHeight(),
		$nav = $('.content-nav'),
		nav_ht = $nav.outerHeight(),
		total_ht = header_ht;
	  

	// $('.fixed-image ').css('padding-top', nav_ht + 'px');

	// Copy Pasta from S.O. link below
	var topMenu = $(".content-nav"),
	    topMenuHeight = topMenu.outerHeight(),
	  
	    // All list items
	    menuItems = topMenu.find(".menuitem a"),

	    // Anchors corresponding to menu items
	    scrollItems = menuItems.map( function() {
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});
	

	$('.content-nav a').click( function() {
		var hash = $(this).attr('href');

		// Add and remove active class from nav item and section
		// $('.content-nav a').removeClass('content-nav-active');
		// $(this).addClass('content-nav-active');
		// $('.content').removeClass('content-active');

		var $target = $(hash);
		// $('.content').removeClass('content-active');
		// $target.addClass('content-active');

		// Slide to section corresponding to link
		$('html,body').animate({
			scrollTop: $target.offset().top
        }, 500);

		return false;

	});


	$(window).scroll( function() {

		// Add the class to make the nav stick
		if( $(this).scrollTop() > total_ht ) {
			$nav.addClass(scroll_class);
			$('.top-link').css('opacity', '1');
			$('.top-link').css('width', '50px');
		} else if( $(this).scrollTop() < total_ht ) {
			$nav.removeClass(scroll_class);
			$('.top-link').css('opacity', '0');
			$('.top-link').css('width', '0');
		}

		// Highlight the current item according to position on the screen
		// (Copy Pasta)
		// http://stackoverflow.com/questions/9979827/change-active-menu-item-on-page-scroll
		
		// Get container scroll position
		var fromTop = $(this).scrollTop()+topMenuHeight;

		// Get id of current scroll item
		var cur = scrollItems.map( function() {
		if ($(this).offset().top < fromTop) {
			return this;
		}
	   	
	   	// Get the id of the current element
		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";
		
		// Set/remove active class
		menuItems
			.parent().removeClass("content-nav-active")
			.end().filter("[href=#"+id+"]").parent().addClass("content-nav-active");
		});
	});





	// ----
	// Quick Quote form
	// ----
	
	// Selected Option Logic
	var desc_default = 'Click an option from the scale below.';

	// Change the text in the "hint" area when scale items are hovered over
	$('.param-option').hover( function() {
		var desc = $(this).closest('.param-desc-holder').text();
		$(this).closest('.param-desc').html('desc');
	}, function() {
		$(this).closest('.param-desc').html(desc_default);
	});

	// Show selected item, and replace default hint text with that
	$('.param-option').click( function() {
		var desc = $(this).find('.param-desc-holder').text();
		$('.param-option').removeClass('selected');
		$(this).addClass('selected');
		
		desc_default = desc;
	});





	// ----
	// Toggle Panels
	// ----
	

	function clearActiveParam() {
		$('.quote-param').removeClass('active');
	}

	function markActiveParam() {
		clearActiveParam();
		$(this).addClass('active');
	}

	$('.quote-param').on('click', {}, markActiveParam);

	// Find the next closed form panel and slide it down
	$('.next').click( function() {
		clearActiveParam();
		$('.closed:first')
			   .slideDown(200)
			   .toggleClass('closed active');

		// If there is only one closed panel, prompt to view results
		if( $('.closed').length === 1 ) {
			$(this).text('Show me results!');
		} 
		if ( $('.closed').length === 0 ) {
			$(this).remove();
			$(this).removeClass('next');
		}
	});

});


