
$(document).ready(function() {
	
	$('body').addClass('js');

	// Toggle Menu

	var $menu = $('#menu'),
	    $menulink = $('.menu-link');

	$menulink.click(function() {
		$menulink.toggleClass('active');
		$menu.toggleClass('active');
		return false;
	});


	/** 
	 *
	 * Quick Quote form
	 *
	 */
	
	//
	// Selected Option Logic
	//

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


	//
	// Toggle Panels
	//
	
	$('.quote-param').on('click', {}, markActiveParam);

	// Find the next closed form panel and slide it down
	$('.next').click( function() {
		clearActiveParam();
		$('.closed:first')
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

});

function clearActiveParam() {
	$('.quote-param').removeClass('active');
}

function markActiveParam() {
	clearActiveParam();
	$(this).addClass('active');
}

