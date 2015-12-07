window.theme = {};

// Navigation
(function( $ ) {

	'use strict';

	var $items = $( '.nav-main li.nav-parent' );

	function expand( li ) {
		li.children( 'ul.nav-children' ).slideDown( 'fast', function() {
			li.addClass( 'nav-expanded' );
			$(this).css( 'display', '' );
			ensureVisible( li );
		});
	}

	function collapse( li ) {
		li.children('ul.nav-children' ).slideUp( 'fast', function() {
			$(this).css( 'display', '' );
			li.removeClass( 'nav-expanded' );
		});
	}

	function ensureVisible( li ) {
		var scroller = li.offsetParent();
		if ( !scroller.get(0) ) {
			return false;
		}

		var top = li.position().top;
		if ( top < 0 ) {
			scroller.animate({
				scrollTop: scroller.scrollTop() + top
			}, 'fast');
		}
	}

	$items.find('> a').on('click', function() {
		var prev = $( this ).closest('ul.nav').find('> li.nav-expanded' ),
			next = $( this ).closest('li');

		if ( prev.get( 0 ) !== next.get( 0 ) ) {
			collapse( prev );
			expand( next );
		} else {
			collapse( prev );
		}
	});

}).apply( this, [ jQuery ]);

// Skeleton
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var $body		= $( 'body' ),
		$html		= $( 'html' ),
		$window		= $( window ),
		isAndroid	= navigator.userAgent.toLowerCase().indexOf('android') > -1;

	// mobile devices with fixed has a lot of issues when focus inputs and others...
	if ( typeof $.browser !== 'undefined' && $.browser.mobile && $html.hasClass('fixed') ) {
		$html.removeClass( 'fixed' ).addClass( 'scroll' );
	}

	var Skeleton = {

		options: {
			sidebars: {
				menu: '#content-menu',
				left: '#sidebar-left',
				right: '#sidebar-right'
			}
		},

		customScroll: ( !Modernizr.overflowscrolling && !isAndroid && $.fn.nanoScroller !== 'undefined'),

		initialize: function() {
			this
				.setVars()
				.build()
				.events();
		},

		setVars: function() {
			this.sidebars = {};

			this.sidebars.left = {
				$el: $( this.options.sidebars.left )
			};

			this.sidebars.right = {
				$el: $( this.options.sidebars.right ),
				isOpened: $html.hasClass( 'sidebar-right-opened' )
			};

			this.sidebars.menu = {
				$el: $( this.options.sidebars.menu ),
				isOpened: $html.hasClass( 'inner-menu-opened' )
			};

			return this;
		},

		build: function() {

			if ( typeof $.browser !== 'undefined' && $.browser.mobile ) {
				$html.addClass( 'mobile-device' );
			} else {
				$html.addClass( 'no-mobile-device' );
			}

			$html.addClass( 'custom-scroll' );
			if ( this.customScroll ) {
				this.buildSidebarLeft();
				this.buildContentMenu();
			}

			this.buildSidebarRight();

			return this;
		},

		events: function() {
			if ( this.customScroll ) {
				this.eventsSidebarLeft();
			}

			this.eventsSidebarRight();
			this.eventsContentMenu();

			if ( typeof $.browser !== 'undefined' && !this.customScroll && isAndroid ) {
				this.fixScroll();
			}

			return this;
		},

		fixScroll: function() {
			var _self = this;

			$window
				.on( 'sidebar-left-opened sidebar-right-toggle', function( e, data ) {
					_self.preventBodyScrollToggle( data.added );
				});
		},

		buildSidebarLeft: function() {
			this.sidebars.left.$nano = this.sidebars.left.$el.find( '.nano' );

			this.sidebars.left.$nano.nanoScroller({
				alwaysVisible: true,
				preventPageScrolling: true
			});

			return this;
		},

		eventsSidebarLeft: function() {

			var $nano = this.sidebars.left.$nano;

			var updateNanoScroll = function() {
				if ( $.support.transition ) {
					$nano.nanoScroller();
					$nano
						.one('bsTransitionEnd', updateNanoScroll)
						.emulateTransitionEnd(150)
				} else {
					updateNanoScroll();
				}
			};

			this.sidebars.left.$el
				.on( 'click', function() {
					updateNanoScroll();
				});

			$nano
				.on( 'mouseenter', function() {
					if ( $html.hasClass( 'sidebar-left-collapsed' ) ) {
						$nano.nanoScroller();
					}
				})
				.on( 'mouseleave', function() {
					if ( $html.hasClass( 'sidebar-left-collapsed' ) ) {
						$nano.nanoScroller();
					}
				});

			return this;
		},

		buildSidebarRight: function() {
			this.sidebars.right.isOpened = $html.hasClass( 'sidebar-right-opened' );

			if ( this.customScroll ) {
				this.sidebars.right.$nano = this.sidebars.right.$el.find( '.nano' );

				this.sidebars.right.$nano.nanoScroller({
					alwaysVisible: true,
					preventPageScrolling: true
				});
			}

			return this;
		},

		eventsSidebarRight: function() {
			var _self = this;

			var open = function() {
				if ( _self.sidebars.right.isOpened ) {
					return close();
				}

				_self.sidebars.right.isOpened = true;

				$html.addClass( 'sidebar-right-opened' );

				$window.trigger( 'sidebar-right-toggle', {
					added: true,
					removed: false
				});

				$html.on( 'click.close-right-sidebar', function(e) {
					e.stopPropagation();
					close(e);
				});
			};

			var close = function(e) {
				if ( !!e && !!e.target && ($(e.target).closest( '.sidebar-right' ).get(0) || !$(e.target).closest( 'html' ).get(0)) ) {
					e.preventDefault();
					return false;
				}

				$html.removeClass( 'sidebar-right-opened' );
				$html.off( 'click.close-right-sidebar' );

				$window.trigger( 'sidebar-right-toggle', {
					added: false,
					removed: true
				});

				_self.sidebars.right.isOpened = false;
			};

			var bind = function() {
				$('[data-open="sidebar-right"]').on('click', function(e) {
					var $el = $(this);
					e.stopPropagation();

					if ( $el.is('a') )
						e.preventDefault();

					open();
				});
			};

			this.sidebars.right.$el.find( '.mobile-close' )
				.on( 'click', function( e ) {
					e.preventDefault();
					$html.trigger( 'click.close-right-sidebar' );
				});

			bind();

			return this;
		},

		buildContentMenu: function() {
			if ( !$html.hasClass( 'fixed' ) ) {
				return false;
			}

			this.sidebars.menu.$nano = this.sidebars.menu.$el.find( '.nano' );

			this.sidebars.menu.$nano.nanoScroller({
				alwaysVisible: true,
				preventPageScrolling: true
			});

			return this;
		},

		eventsContentMenu: function() {
			var _self = this;

			var open = function() {
				if ( _self.sidebars.menu.isOpened ) {
					return close();
				}

				_self.sidebars.menu.isOpened = true;

				$html.addClass( 'inner-menu-opened' );

				$window.trigger( 'inner-menu-toggle', {
					added: true,
					removed: false
				});

				$html.on( 'click.close-inner-menu', function(e) {

					close(e);
				});

			};

			var close = function(e) {
				if ( !!e && !!e.target && !$(e.target).closest( '.inner-menu-collapse' ).get(0) && ($(e.target).closest( '.inner-menu' ).get(0) || !$(e.target).closest( 'html' ).get(0)) ) {
					return false;
				}

				e.stopPropagation();

				$html.removeClass( 'inner-menu-opened' );
				$html.off( 'click.close-inner-menu' );

				$window.trigger( 'inner-menu-toggle', {
					added: false,
					removed: true
				});

				_self.sidebars.menu.isOpened = false;
			};

			var bind = function() {
				$('[data-open="inner-menu"]').on('click', function(e) {
					var $el = $(this);
					e.stopPropagation();

					if ( $el.is('a') )
						e.preventDefault();

					open();
				});
			};

			bind();

			/* Nano Scroll */
			if ( $html.hasClass( 'fixed' ) ) {
				var $nano = this.sidebars.menu.$nano;

				var updateNanoScroll = function() {
					if ( $.support.transition ) {
						$nano.nanoScroller();
						$nano
							.one('bsTransitionEnd', updateNanoScroll)
							.emulateTransitionEnd(150)
					} else {
						updateNanoScroll();
					}
				};

				this.sidebars.menu.$el
					.on( 'click', function() {
						updateNanoScroll();
					});
			}

			return this;
		},

		preventBodyScrollToggle: function( shouldPrevent, $el ) {
			setTimeout(function() {
				if ( shouldPrevent ) {
					$body
						.data( 'scrollTop', $body.get(0).scrollTop )
						.css({
							position: 'fixed',
							top: $body.get(0).scrollTop * -1
						})
				} else {
					$body
						.css({
							position: '',
							top: ''
						})
						.scrollTop( $body.data( 'scrollTop' ) );
				}
			}, 150);
		}

	};

	// expose to scope
	$.extend(theme, {
		Skeleton: Skeleton
	});

}).apply(this, [ window.theme, jQuery ]);

// Base
(function(theme, $) {

	'use strict';

	theme = theme || {};

	theme.Skeleton.initialize();

}).apply(this, [ window.theme, jQuery ]);


window.theme = {};



// Bootstrap Toggle
(function( $ ) {

	'use strict';

	var $window = $( window );

	var toggleClass = function( $el ) {
		if ( !!$el.data('toggleClassBinded') ) {
			return false;
		}

		var $target,
			className,
			eventName;

		$target = $( $el.attr('data-target') );
		className = $el.attr('data-toggle-class');
		eventName = $el.attr('data-fire-event');


		$el.on('click.toggleClass', function(e) {
			e.preventDefault();
			$target.toggleClass( className );

			var hasClass = $target.hasClass( className );

			if ( !!eventName ) {
				$window.trigger( eventName, {
					added: hasClass,
					removed: !hasClass
				});
			}
		});

		$el.data('toggleClassBinded', true);

		return true;
	};

	$(function() {
		$('[data-toggle-class][data-target]').each(function() {
			toggleClass( $(this) );
		});
	});

}).apply( this, [ jQuery ]);

// Form to Object
(function( $ ) {

	'use strict';

	$.fn.formToObject = function() {
		var arrayData,
			objectData;

		arrayData	= this.serializeArray();
		objectData	= {};

		$.each( arrayData, function() {
			var value;

			if (this.value != null) {
				value = this.value;
			} else {
				value = '';
			}

			if (objectData[this.name] != null) {
				if (!objectData[this.name].push) {
					objectData[this.name] = [objectData[this.name]];
				}

				objectData[this.name].push(value);
			} else {
				objectData[this.name] = value;
			}
		});

		return objectData;
	};

})( jQuery );



// Markdown
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__markdownEditor';

	var PluginMarkdownEditor = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginMarkdownEditor.defaults = {
		iconlibrary: 'fa'
	};

	PluginMarkdownEditor.prototype = {
		initialize: function($el, opts) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend( true, {}, PluginMarkdownEditor.defaults, opts );

			return this;
		},

		build: function() {
			this.$el.markdown( this.options );

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginMarkdownEditor: PluginMarkdownEditor
	});

	// jquery plugin
	$.fn.themePluginMarkdownEditor = function(opts) {
		return this.each(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginMarkdownEditor($this, opts);
			}

		});
	}

}).apply(this, [ window.theme, jQuery ]);


// TextArea AutoSize
(function(theme, $) {

	theme = theme || {};

	var initialized = false;
	var instanceName = '__textareaAutosize';

	var PluginTextAreaAutoSize = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginTextAreaAutoSize.defaults = {
	};

	PluginTextAreaAutoSize.prototype = {
		initialize: function($el, opts) {
			if (initialized) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend( true, {}, PluginTextAreaAutoSize.defaults, opts );

			return this;
		},

		build: function() {
			this.$el.autosize( this.options );

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginTextAreaAutoSize: PluginTextAreaAutoSize
	});

	// jquery plugin
	$.fn.themePluginTextAreaAutoSize = function(opts) {
		return this.each(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginTextAreaAutoSize($this, opts);
			}

		});
	}

}).apply(this, [ window.theme, jQuery ]);



// Animate
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__animate';

	var PluginAnimate = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginAnimate.defaults = {
		accX: 0,
		accY: -150,
		delay: 1
	};

	PluginAnimate.prototype = {
		initialize: function($el, opts) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginAnimate.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self = this,
				$el = this.options.wrapper,
				delay = 0;

			$el.addClass('appear-animation');

			if(!$('html').hasClass('no-csstransitions') && $(window).width() > 767) {

				$el.appear(function() {

					delay = ($el.attr('data-appear-animation-delay') ? $el.attr('data-appear-animation-delay') : self.options.delay);

					if(delay > 1) {
						$el.css('animation-delay', delay + 'ms');
					}

					$el.addClass($el.attr('data-appear-animation'));

					setTimeout(function() {
						$el.addClass('appear-animation-visible');
					}, delay);

				}, {accX: self.options.accX, accY: self.options.accY});

			} else {

				$el.addClass('appear-animation-visible');

			}

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginAnimate: PluginAnimate
	});

	// jquery plugin
	$.fn.themePluginAnimate = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginAnimate($this, opts);
			}

		});
	};

}).apply(this, [ window.theme, jQuery ]);

// Carousel
(function(theme, $) {

	theme = theme || {};

	var initialized = false;
	var instanceName = '__carousel';

	var PluginCarousel = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginCarousel.defaults = {
		itemsDesktop: false,
		itemsDesktopSmall: false,
		itemsTablet: false,
		itemsTabletSmall: false,
		itemsMobile: false
	};

	PluginCarousel.prototype = {
		initialize: function($el, opts) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginCarousel.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			this.options.wrapper.owlCarousel(this.options).addClass("owl-carousel-init");

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginCarousel: PluginCarousel
	});

	// jquery plugin
	$.fn.themePluginCarousel = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginCarousel($this, opts);
			}

		});
	}

}).apply(this, [ window.theme, jQuery ]);


// Lightbox
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__lightbox';

	var PluginLightbox = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginLightbox.defaults = {
		tClose: 'Close (Esc)', // Alt text on close button
		tLoading: 'Loading...', // Text that is displayed during loading. Can contain %curr% and %total% keys
		gallery: {
			tPrev: 'Previous (Left arrow key)', // Alt text on left arrow
			tNext: 'Next (Right arrow key)', // Alt text on right arrow
			tCounter: '%curr% of %total%' // Markup for "1 of 7" counter
		},
		image: {
			tError: '<a href="%url%">The image</a> could not be loaded.' // Error message when image could not be loaded
		},
		ajax: {
			tError: '<a href="%url%">The content</a> could not be loaded.' // Error message when ajax request failed
		}
	};

	PluginLightbox.prototype = {
		initialize: function($el, opts) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginLightbox.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			this.options.wrapper.magnificPopup(this.options);

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginLightbox: PluginLightbox
	});

	// jquery plugin
	$.fn.themePluginLightbox = function(opts) {
		return this.each(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginLightbox($this, opts);
			}

		});
	}

}).apply(this, [ window.theme, jQuery ]);

// Portlets
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__portlet',
		storageOrderKey = '__portletOrder',
		storageStateKey = '__portletState';

	var PluginPortlet = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginPortlet.defaults = {
		connectWith: '[data-plugin-portlet]',
		items: '[data-portlet-item]',
		handle: '.portlet-handler',
		opacity: 0.7,
		placeholder: 'portlet-placeholder',
		cancel: 'portlet-cancel',
		forcePlaceholderSize: true,
		forceHelperSize: true,
		tolerance: 'pointer',
		helper: 'original',
		revert: 200
	};

	PluginPortlet.prototype = {
		initialize: function($el, opts) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			var _self = this;

			this.options = $.extend(true, {}, PluginPortlet.defaults, opts, {
				wrapper: this.$el,
				update: _self.onUpdate,
				create: _self.onLoad
			});

			return this;
		},

		onUpdate: function(event, ui) {
			var key = storageOrderKey,
				data = store.get(key),
				$this = $(this),
				porletId = $this.prop('id');

			if (!data) {
				data = {};
			}

			if (!!porletId) {
				data[porletId] = $this.sortable('toArray');
				store.set(key, data);
			}
		},

		onLoad: function(event, ui) {
			var key = storageOrderKey,
				data = store.get(key),
				$this = $(this),
				porletId = $this.prop('id'),
				portlet = $('#' + porletId);

			if (!!data) {
				var panels = data[porletId];

				if (!!panels) {
					$.each(panels, function(index, panelId) {
						$('#' + panelId).appendTo(portlet);
					});
				}
			}
		},

		saveState: function( panel ) {
			var key = storageStateKey,
				data = store.get(key),
				panelId = panel.prop('id');

			if (!data) {
				data = {};
			}

			if (!panelId) {
				return this;
			}

			var collapse = panel.find('.panel-actions').children('a.fa-caret-up, a.fa-caret-down'),
				isCollapsed = !!collapse.hasClass('fa-caret-up'),
				isRemoved = !panel.closest('body').get(0);

			if (isRemoved) {
				data[panelId] = 'removed';
			} else if (isCollapsed) {
				data[panelId] = 'collapsed';
			} else {
				delete data[panelId];
			}

			store.set(key, data);
			return this;
		},

		loadState: function() {
			var key = storageStateKey,
				data = store.get(key);

			if (!!data) {
				$.each(data, function(panelId, state) {
					var panel = $('#' + panelId);
					if (!panel.data('portlet-state-loaded')) {
						if (state == 'collapsed') {
							panel.find('.panel-actions a.fa-caret-down').trigger('click');
						} else if (state == 'removed') {
							panel.find('.panel-actions a.fa-times').trigger('click');
						}
						panel.data('portlet-state-loaded', true);
					}
				});
			}

			return this;
		},

		build: function() {
			var _self = this;

			if ( $.isFunction( $.fn.sortable ) ) {
				this.$el.sortable( this.options );
				this.$el.find('[data-portlet-item]').each(function() {
					_self.events( $(this) );
				});
			}

			var portlet = this.$el;
			portlet.css('min-height', 150);

			return this;
		},

		events: function($el) {
			var _self = this,
				portlet = $el.closest('[data-plugin-portlet]');

			this.loadState();

			$el.find('.panel-actions').on( 'click', 'a.fa-caret-up, a.fa-caret-down, a.fa-times', function( e ) {
				setTimeout(function() {
					_self.saveState( $el );
				}, 250);
			});

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginPortlet: PluginPortlet
	});

	// jquery plugin
	$.fn.themePluginPortlet = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginPortlet($this, opts);
			}

		});
	}

}).apply(this, [ window.theme, jQuery ]);

// Slider
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__slider';

	var PluginSlider = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginSlider.defaults = {

	};

	PluginSlider.prototype = {
		initialize: function($el, opts) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setVars()
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setVars: function() {
			var $output = $( this.$el.data('plugin-slider-output') );
			this.$output = $output.get(0) ? $output : null;

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			var _self = this;
			this.options = $.extend( true, {}, PluginSlider.defaults, opts );

			if ( this.$output ) {
				$.extend( this.options, {
					slide: function( event, ui ) {
						_self.onSlide( event, ui );
					}
				});
			}

			return this;
		},

		build: function() {
			this.$el.slider( this.options );

			return this;
		},

		onSlide: function( event, ui ) {
			if ( !ui.values ) {
				this.$output.val( ui.value );
			} else {
				this.$output.val( ui.values[ 0 ] + '/' + ui.values[ 1 ] );
			}

			this.$output.trigger('change');
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginSlider: PluginSlider
	});

	// jquery plugin
	$.fn.themePluginSlider = function(opts) {
		return this.each(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginSlider($this, opts);
			}

		});
	}

}).apply(this, [ window.theme, jQuery ]);

// Toggle
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__toggle';

	var PluginToggle = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginToggle.defaults = {
		duration: 350,
		isAccordion: false,
		addIcons: true
	};

	PluginToggle.prototype = {
		initialize: function($el, opts) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginToggle.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self = this,
				$wrapper = this.options.wrapper,
				$items = $wrapper.find('.toggle'),
				$el = null;

			$items.each(function() {
				$el = $(this);

				if(self.options.addIcons) {
					$el.find('> label').prepend(
						$('<i />').addClass('fa fa-plus'),
						$('<i />').addClass('fa fa-minus')
					);
				}

				if($el.hasClass('active')) {
					$el.find('> p').addClass('preview-active');
					$el.find('> .toggle-content').slideDown(self.options.duration);
				}

				self.events($el);
			});

			if(self.options.isAccordion) {
				self.options.duration = self.options.duration/2;
			}

			return this;
		},

		events: function($el) {
			var self = this,
				previewParCurrentHeight = 0,
				previewParAnimateHeight = 0,
				toggleContent = null;

			$el.find('> label').click(function(e) {

				var $this = $(this),
					parentSection = $this.parent(),
					parentWrapper = $this.parents('.toggle'),
					previewPar = null,
					closeElement = null;

				if(self.options.isAccordion && typeof(e.originalEvent) != 'undefined') {
					closeElement = parentWrapper.find('.toggle.active > label');

					if(closeElement[0] == $this[0]) {
						return;
					}
				}

				parentSection.toggleClass('active');

				// Preview Paragraph
				if(parentSection.find('> p').get(0)) {

					previewPar = parentSection.find('> p');
					previewParCurrentHeight = previewPar.css('height');
					previewPar.css('height', 'auto');
					previewParAnimateHeight = previewPar.css('height');
					previewPar.css('height', previewParCurrentHeight);

				}

				// Content
				toggleContent = parentSection.find('> .toggle-content');

				if(parentSection.hasClass('active')) {

					$(previewPar).animate({
						height: previewParAnimateHeight
					}, self.options.duration, function() {
						$(this).addClass('preview-active');
					});

					toggleContent.slideDown(self.options.duration, function() {
						if(closeElement) {
							closeElement.trigger('click');
						}
					});

				} else {

					$(previewPar).animate({
						height: 0
					}, self.options.duration, function() {
						$(this).removeClass('preview-active');
					});

					toggleContent.slideUp(self.options.duration);

				}

			});
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginToggle: PluginToggle
	});

	// jquery plugin
	$.fn.themePluginToggle = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginToggle($this, opts);
			}

		});
	}

}).apply(this, [ window.theme, jQuery ]);
