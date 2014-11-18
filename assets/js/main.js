$(document).ready(function() {
	
	$('body').addClass('js');



	// ----
	// Toggle Menu
	// ----

	// TODO: make a fallback for non-JS - before, added a .js class but it causes the nav to blink
	// Look into Modernizr for that
	var $menu = $('#menu'),
	    $menulink = $('.menu-link');

	$menulink.click( function() {
		$menulink.toggleClass('active');
		$menu.toggleClass('active');
		return false;
	});




	// ----
	// Sticky Submenu
	// ----

	// This jumps...will need to fix
	 var scroll_class = 'stuck',
		header_ht = $('.page-header').outerHeight(),
		$nav = $('.content-nav'),
		nav_ht = $nav.outerHeight(),
		total_ht = header_ht + nav_ht;
	  
	$(window).scroll( function() {
		if( $(this).scrollTop() > total_ht ) {
			$nav.addClass(scroll_class);
		} else if( $(this).scrollTop() < total_ht ) {
			$nav.removeClass(scroll_class);
		}
	});

	$('.content-nav a').click( function() {
		var hash = $(this).attr('href');

		// Add and remove active class from nav item and section
		$('.content-nav a').removeClass('content-nav-active');
		$(this).addClass('content-nav-active');
		$('.content').removeClass('content-active');

		var $target = $('.content' + hash);
		$target.addClass('content-active');

		// Slide to section corresponding to link
		$('html,body').animate({
			scrollTop: $target.offset().top
        }, 1000);

		return false;

	});

	// $('a[href*=#]:not([href=#])').click(function() {
	// 	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	// 		var target = $(this.hash);
	// 		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	// 		if (target.length) {
	// 			$('html,body').animate({
	// 				scrollTop: target.offset().top
	//         	}, 1000);
	        
	//         	return false;
	//       	}
	// 	}
	// });



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


function clearActiveParam() {
	$('.quote-param').removeClass('active');
}

function markActiveParam() {
	clearActiveParam();
	$(this).addClass('active');
}
