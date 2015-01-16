/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),f.prototype=new t,f.prototype.check=function(){var e=v[this.img.src]||new c(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return c.prototype=new t,c.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});
/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);

$(document).ready(function() {
	
	$('body').addClass('js');

	console.log('Check it: https://github.com/laras126/dijifi-theme');

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

	var $hero = $('.hero-image:not(.hero-video-placeholder)');
	
	$hero.each( function() {
		var $image = $(this).find('#headerImageLoader'),
			$t = $(this),
			imageSrc = $image.attr('src');
	
		$(this).imagesLoaded( function() {

			$t.fadeTo(200, 0.5, function() {
			    
			    // Don't add the background image for large video headers
				$t.css('background-image', 'url(\'' + imageSrc + '\')');

			}).fadeTo(600, 1);

			$t.find('.spinner').hide();
			
		});
	});
	

	$('.hero-video-placeholder').each( function() {
		if( $(window).width() < 1087) {

			var $v_image = $(this).find('#headerImageLoader'),
				$v_t = $(this),
				v_imageSrc = $v_image.attr('src');
		
			$v_t.imagesLoaded( function() {

				$v_t.fadeTo(200, 0.5, function() {
					$v_t.css('background-image', 'url(\'' + v_imageSrc + '\')');
				}).fadeTo(600, 1);

				$v_t.find('.spinner').hide();
				
			});

		}
	});
	


	// If there are videos, load them nicely
    // Thx: http://atomicrobotdesign.com/blog/web-development/check-when-an-html5-video-has-loaded/

    if( $('video').length ) {
	    window.addEventListener('load', function() {
	        var video = document.querySelector('.hero-video video');
	        var preloader = document.querySelector('.spinner');

	        function checkLoad() {
	            if (video.readyState === 4) {
	                $('.spinner').fadeOut(300);
	                $('.hero-video video').animate({
	                	'opacity': 1
	                }, 400);
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
		nav_ht = $nav.outerHeight(),
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
			$('.section-header').addClass('nav-stuck');
			$('.top-link-bottom').fadeIn(300);
			$('.content-nav-arrow').fadeOut(300);

			$('.top-link-top').css({
				'width': '50px',
				'opacity': '1'
			});
			
		} else if( $(this).scrollTop() < total_ht ) {

			$nav.removeClass(scroll_class);
			$('.section-header').removeClass('nav-stuck');
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

