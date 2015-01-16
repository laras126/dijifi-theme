<?php

	if (!class_exists('Timber')){
		add_action( 'admin_notices', function(){
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . admin_url('plugins.php#timber') . '">' . admin_url('plugins.php') . '</a></p></div>';
		});
		return;
	}

	class StarterSite extends TimberSite {

		function __construct(){
			add_theme_support('post-formats');
			add_theme_support('post-thumbnails');			
			add_theme_support('menus');

			add_filter('timber_context', array($this, 'add_to_context'));
			add_filter('get_twig', array($this, 'add_to_twig'));
			
			add_action('init', array($this, 'dfi_register_post_types'));
			add_action('init', array($this, 'dfi_register_taxonomies'));
			add_action('init', array($this, 'dfi_register_menus'));
			parent::__construct();
		}

		function dfi_register_post_types(){
			require('lib/custom-types.php');
		}

		function dfi_register_taxonomies(){
			require('lib/taxonomies.php');
		}

		function dfi_register_menus() {
			require('lib/menus.php');
		}

		function add_to_context($context){

			// Navs
			$context['main_nav'] = new TimberMenu('main_nav');
			$context['header_nav'] = new TimberMenu('header_nav');
			$context['footer_nav'] = new TimberMenu('footer_nav');
			$context['footer_nav_explore'] = new TimberMenu('footer_nav_explore');
			
			// ACF Options Page
			$context['site_tagline'] = get_field('site_tagline', 'options');
			$context['callout_tf'] = get_field('callout_tf', 'options');
			$context['callout_bar'] = get_field('callout_bar', 'options');

			$context['favicon_16_url'] = get_field('favicon_16', 'options');
			$context['favicon_32_url'] = get_field('favicon_32', 'options');

			// Site
			$context['site'] = $this;
			
			return $context;
		}

		function add_to_twig($twig){
			$twig->addExtension(new Twig_Extension_StringLoader());
			// $twig->addFilter('myfoo', new Twig_Filter_Function('myfoo'));
			return $twig;
		}

	}

	new StarterSite();




	/**
	 ****************************
	 * DiJiFi Utility Functions *
	 ****************************
	 */

	

	// Enqueue scripts
	function dfi_scripts() {

		// Use jQuery from CDN
		if (!is_admin()) {
			wp_deregister_script('jquery');
			wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js', array(), null, true);
			wp_enqueue_script('jquery');
		}

		// Add our JS
		wp_enqueue_script( 'js', get_template_directory_uri() . '/assets/js/build/scripts.min.js', array('jquery'), '1.2.0', true );
	}
	add_action( 'wp_enqueue_scripts', 'dfi_scripts' );



	// Remove unused items from the Dashboard menu
	function dfi_remove_menu_items(){
    	remove_menu_page( 'edit.php' ); // Posts
    	remove_menu_page( 'edit-comments.php' ); // Posts
    	remove_menu_page( 'users.php' ); // Users
	}
	add_action( 'admin_menu', 'dfi_remove_menu_items' );



	// Customize the editor style, from Roots.io 
	// https://github.com/roots/roots-sass/blob/master/assets/css/editor-style.css
	function dfi_editor_styles() {
		add_editor_style( 'assets/css/editor-style.css' );
	}
	add_action( 'after_setup_theme', 'dfi_editor_styles' );

	

	// Change Title field placeholders
	function dfi_title_placeholder_text ( $title ) {
		if ( get_post_type() == 'dfi_service' ) {
			$title = __( 'Service Name' );
		} else if ( get_post_type() == 'dfi_case_study' ) {
	        $title = __( 'Case Study Name' );
		} else if ( get_post_type() == 'dfi_testimonial' ) {
	        $title = __( 'Testimonial Nickname' );
		}
		return $title;
	} 
	add_filter( 'enter_title_here', 'dfi_title_placeholder_text' );



	// Customize the elements dropdown in TinyMCE
	// http://support.advancedcustomfields.com/forums/topic/wysiwyg-formatselect/
	add_filter( 'tiny_mce_before_init', function( $settings ){
		$settings['block_formats'] = 'Paragraph=p;Heading=h3;Subheading=h4';
		return $settings;
	} );



	// Add a 'Very Simple' toolbar style for the WYSIWYG editor in ACF
	// http://www.advancedcustomfields.com/resources/customize-the-wysiwyg-toolbars/
	function dfi_acf_wysiwyg_toolbar( $toolbars ) {

		$toolbars['Text Based'] = array();

		// Only one row of buttons
		$toolbars['Text Based'][1] = array('formatselect' , 'bold' , 'link' , 'italic' , 'unlink' );

		return $toolbars;
	}
	add_filter( 'acf/fields/wysiwyg/toolbars' , 'dfi_acf_wysiwyg_toolbar'  );

	

	// ACF Options Page
	
	if( function_exists('acf_add_options_page') ) {
		acf_add_options_page('Theme Settings');
	}



	// Include other files from lib/

	// (not currently using this)
	require('lib/widgets.php'); // Widgets



	// Make custom fields work with Yoast SEO (only impacts the light, but helpful!)
	// https://imperativeideas.com/making-custom-fields-work-yoast-wordpress-seo/

	if ( is_admin() ) { // check to make sure we aren't on the front end
		add_filter('wpseo_pre_analysis_post_content', 'dfi_add_custom_to_yoast');

		function dfi_add_custom_to_yoast( $content ) {
			global $post;
			$pid = $post->ID;
			
			$custom = get_post_custom($pid);
			unset($custom['_yoast_wpseo_focuskw']); // Don't count the keyword in the Yoast field!

			foreach( $custom as $key => $value ) {
				if( substr( $key, 0, 1 ) != '_' && substr( $value[0], -1) != '}' && !is_array($value[0]) && !empty($value[0])) {
				  $custom_content .= $value[0] . ' ';
				}
			}

			$content = $content . ' ' . $custom_content;
			return $content;

			remove_filter('wpseo_pre_analysis_post_content', 'dfi_add_custom_to_yoast'); // don't let WP execute this twice
		}
	}



	// Load Gravity Forms JS in the footer...really? Sheesh.
	// https://bjornjohansen.no/load-gravity-forms-js-in-footer

	function dfi_wrap_gform_cdata_open( $content = '' ) {
		$content = 'document.addEventListener( "DOMContentLoaded", function() { ';
		return $content;
	}
	add_filter( 'gform_cdata_open', 'dfi_wrap_gform_cdata_open' );

	function dfi_wrap_gform_cdata_close( $content = '' ) {
		$content = ' }, false );';
		return $content;
	}
	add_filter( 'gform_cdata_close', 'dfi_wrap_gform_cdata_close' );



	// Google Analytics snippet from HTML5 Boilerplate
 
	define('GOOGLE_ANALYTICS_ID', 'UA-2286269-1');
	
	function dfi_google_analytics() { ?>
		<script>
  			<?php if (WP_ENV === 'production') : ?>
    			(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;e=o.createElement(i);r=o.getElementsByTagName(i)[0];e.src='//www.google-analytics.com/analytics.js';r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
  			<?php else : ?>
    			function ga() {
      				console.log('GoogleAnalytics: ' + [].slice.call(arguments));
    			}
  			<?php endif; ?>
  			ga('create','<?php echo GOOGLE_ANALYTICS_ID; ?>','auto');ga('send','pageview');
		</script> <?php 
	}

	if (GOOGLE_ANALYTICS_ID && (WP_ENV !== 'production' || !current_user_can('manage_options'))) {
	  add_action('wp_footer', 'dfi_google_analytics', 20);
	}
	
?>