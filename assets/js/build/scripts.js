

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
	  

	$('.content-nav a').click( function() {
		var hash = $(this).attr('href');

		// Add and remove active class from nav item and section
		$('.content-nav li').removeClass('content-nav-active');
		$(this).parent().addClass('content-nav-active');
		$('.content').removeClass('content-active');

		var $target = $(hash);

		// Slide to section corresponding to link
		$('html,body').animate({
			scrollTop: $target.offset().top
        }, 500);

		return false;

	});

	// Copy Pasta from SO link below
	var topMenu = $(".content-nav"),
	    topMenuHeight = topMenu.outerHeight()+15,
	  
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
			$('.top-link').css('width', '50px');
		} else if( $(this).scrollTop() < total_ht ) {
			$nav.removeClass(scroll_class);
			$('.top-link').css('width', '0');
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
	});




	// ----
	// Quick Quote form
	// ----
	
	//
	// Selected Option Logic
	//
	function clearActiveParam() {
		$('.quote-param').removeClass('active');
	}

	function markActiveParam() {
		clearActiveParam();
		$(this).addClass('active');
	}

	// Show selected item, and replace default hint text with that
	$('.param-option').click( function() {
		$('.param-option').removeClass('selected');
		$(this).addClass('selected');
	});


	//
	// Toggle Panels
	//
	
	$('.quote-param').on('click', {}, markActiveParam);

	// Find the next closed form panel and slide it down
	$('.next').click( function() {
		clearActiveParam();
		$('.closed:first-child')
			   .slideDown(200)
			   .toggleClass('closed active');

		// If there is only one closed panel, prompt to view results
		if( $('.closed').length == 1 ) {
			$(this).text('Show me results!');
		} 
		if ( $('.closed').length == 0 ) {
			$(this).remove();
			$(this).removeClass('next');
		}
	});

	// var q1_P1 = $('#q1_P1').val(),
	// 	q1_P2 = $('#q1_P2').val(),
	// 	q2_P1 = $('#q2_P1').val(),
	// 	q2_P2 = $('#q2_P2').val();

	var service;
	var res;

	$('.panel').change( function(event) {	
		
		$(this).next('.panel').slideDown(200).removeClass('closed');

		// If the format is Film or Photo, include the resolution question in the "panel reveal" logic
		if( $('#q0_P1').is(':checked') || $('#q0_P3').is(':checked') ) {
			$('#resQues').addClass('panel');
			$('#resResults').show();
		}

		// Logic for services. 
		// Compare the questions and assign the appropriate string to the service variable.
		if( $('#q1_P2').is(':checked') && $('#q2_P1').is(':checked') ) {
			service = 'Raw';
		} else if( $('#q1_P1').is(':checked') && $('#q2_P2').is(':checked') ) {
			service = 'Complete';
		} else {
			service = 'Direct';
		}
		
		// Update the service and resolution HTML
		$('#serviceLevel').html(service);
		$('#resolution').html(res);


		// Logic for resolution question
		// NOTE: these are showing up opposite for some reason...
		// FIX IT!!!! But not this second.
		if( $('#q3_P2').is(':checked') ) {
			res = 'Standard';
		} else if ($('#q3_P1').is(':checked')) {
			res = 'Full';
		}


		// Show the results panel if the panel in question is the last one.
		if( $(this).is('fieldset:last-of-type') ) {
			$(this).css('background', 'green');
			console.log(service + ' + ' + res);
			$('.results').slideDown(200);
		}

		$('html,body').animate({
		    scrollTop: $(this).offset().top - ( $(window).height() - $(this).outerHeight(true) ) / 3
		}, 200);

		// $(this).find('label').removeClass('selected');
		// $(event.target).siblings('label').addClass('selected');

		// $(':checked + label').addClass('selected');
	}); // END panel.change()

});

