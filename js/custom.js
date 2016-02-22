

+function ($) {
  'use strict';
  

/*=========================================================================
     Typing Text
========================================================================= */
  
  $('.typist').typist({
      speed: 12
    }).typistPause(2000) // 2 sec before to write
    .typistAdd('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequuntur unde quae totam').typistPause(800) // 0,8 sec
    .typistAdd('\consectetur adipisicing elit.... ').typistPause(1500) // 1,5 sec
    .typistAdd('You will be ready?');



/*=========================================================================
     Parallax
========================================================================= */
  
  // parallax
  if ($(".parallax").length > 0 && $(".parallax-elem").length < 1) {
    $.stellar({
      responsive: true,
      horizontalScrolling: false
    });
  }


						   
/*=========================================================================
     DropDown
========================================================================= */
  
  function DropDown(el) {
    this.dd = el;
    this.initEvents();
  }
  DropDown.prototype = {
    initEvents: function() {
      var obj = this;
      obj.dd.on('click', function(event) {
        $(this).toggleClass('active');
        event.stopPropagation();
      });
    }
  }
  var dd = new DropDown($('.wrapper-dropdown'));
  $(document).on(function() {
    // all dropdowns
    $('.wrapper-dropdown').removeClass('active');
  });
						   

						   
/*=========================================================================
     Flip Card
========================================================================= */
  
/*! flip */
!function(e){var t=function(e){e.data("fliped",!0);var t="rotate"+e.data("axis");e.find(".flip-front").css({transform:t+(e.data("reverse")?"(-180deg)":"(180deg)")}),e.find(".flip-back").css({transform:t+"(0deg)"})},i=function(e){e.data("fliped",!1);var t="rotate"+e.data("axis");e.find(".flip-front").css({transform:t+"(0deg)"}),e.find(".flip-back").css({transform:t+(e.data("reverse")?"(180deg)":"(-180deg)")})};e.fn.flip=function(a){return this.each(function(){var r=e(this);if(void 0!==a&&"boolean"==typeof a)a?t(r):i(r);else{var s=e.extend({axis:"y",reverse:!1,trigger:"click",speed:500},a);if(r.data("reverse",s.reverse),r.data("axis",s.axis),"x"==s.axis.toLowerCase())var o=2*r.outerHeight(),n="rotatex";else var o=2*r.outerWidth(),n="rotatey";r.find(".flip-back").css({transform:n+"("+(s.reverse?"180deg":"-180deg")+")"}),r.css({perspective:o,position:"relative"});var f=s.speed/1e3||.5;if(r.find(".flip-front, .flip-back").outerHeight(r.height()).outerWidth(r.width()).css({"transform-style":"preserve-3d",position:"absolute",transition:"all "+f+"s ease-out","backface-visibility":"hidden"}),"click"==s.trigger.toLowerCase())r.find('button, a, input[type="submit"]').on(function(e){e.stopPropagation()}),r.on(function(){r.data("fliped")?i(r):t(r)});else if("hover"==s.trigger.toLowerCase()){var d=function(){r.unbind("mouseleave",c),t(r),setTimeout(function(){r.bind("mouseleave",c),r.is(":hover")||i(r)},s.speed+150)},c=function(){i(r)};r.mouseenter(d),r.mouseleave(c)}}}),this}}(jQuery);
  // Flip Card
  $(function() {
    $(".flip-card").flip({
      trigger: "hover"
    });
  });



/*=========================================================================
     Side Navigation
========================================================================= */
  
var $lateral_menu_trigger = $(
		'#owl-menu-trigger'),
	$content_wrapper = $('.page-wrapper'),
	$navigation = $('');
//open-close lateral menu clicking on the menu icon
$lateral_menu_trigger.on('click',
	function(event) {
		event.preventDefault();
		$lateral_menu_trigger.toggleClass(
			'is-clicked');
		$navigation.toggleClass(
			'lateral-menu-is-open');
		$content_wrapper.toggleClass(
			'lateral-menu-is-open').one(
			'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
			function() {
				// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
				$('html').toggleClass(
					'overflow-hidden');
			});
		$('#owl-lateral-nav').toggleClass(
			'lateral-menu-is-open');
		//check if transitions are not supported - i.e. in IE9
		if ($('html').hasClass(
				'no-csstransitions')) {
			$('body').toggleClass(
				'overflow-hidden');
		}
	});
//close lateral menu clicking outside the menu itself
$content_wrapper.on('click', function(
	event) {
	if (!$(event.target).is(
			'#owl-menu-trigger, #owl-menu-trigger span'
		)) {
		$lateral_menu_trigger.removeClass(
			'is-clicked');
		$navigation.removeClass(
			'lateral-menu-is-open');
		$content_wrapper.removeClass(
			'lateral-menu-is-open').one(
			'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
			function() {
				$('html').removeClass(
					'overflow-hidden');
			});
		$('#owl-lateral-nav').removeClass(
			'lateral-menu-is-open');
		//check if transitions are not supported
		if ($('html').hasClass(
				'no-csstransitions')) {
			$('body').removeClass(
				'overflow-hidden');
		}
	}
});
//open (or close) submenu items in the lateral menu. Close all the other open submenu items.
$('.item-has-children').children('a').on(
	'click',
	function(event) {
		event.preventDefault();
		$(this).toggleClass('submenu-open').next(
				'.sub-menu').slideToggle(200).end()
			.parent('.item-has-children').siblings(
				'.item-has-children').children('a')
			.removeClass('submenu-open').next(
				'.sub-menu').slideUp(200);
	});



/*=========================================================================
     Owl Search
========================================================================= */
  
  //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
  var MqL = 1170;
  //move nav element position according to window width
  moveNavigation();
  $(window).on('resize', function() {
    (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300): window.requestAnimationFrame(moveNavigation);
  });
  //open search form
  $('.owl-search-trigger').on('click', function(event) {
    event.preventDefault();
    toggleSearch();
    closeNav();
  });
  //close lateral menu on mobile 
  $('.owl-search-overlay').on('swiperight', function() {
    if ($('.owl-primary-nav').hasClass('nav-is-visible')) {
      closeNav();
      $('.owl-search-overlay').removeClass('is-visible');
    }
  });
  $('.owl-search-overlay').on('click', function() {
    closeNav();
    toggleSearch('close')
    $('.owl-search-overlay').removeClass('is-visible');
  });
  //submenu items - go back link
  $('.go-back').on('click', function() {
    $(this).parent('.owl-header-buttons').addClass('is-hidden').parent('.has-children').parent('.owl-header-buttons').removeClass('moves-out');
  });

  function closeNav() {
    $('.owl-nav-trigger').removeClass('nav-is-visible');
    $('.owl-primary-nav').removeClass('nav-is-visible');
  }

  function toggleSearch(type) {
    if (type == "close") {
      //close serach 
      $('.owl-search').removeClass('is-visible');
      $('.owl-search-trigger').removeClass('search-is-visible');
      $('.owl-search-overlay').removeClass('search-is-visible');
    } else {
      //toggle search visibility
      $('.owl-search').toggleClass('is-visible');
      $('.owl-search-trigger').toggleClass('search-is-visible');
      $('.owl-search-overlay').toggleClass('search-is-visible');
      if ($(window).width() > MqL && $('.owl-search').hasClass('is-visible')) $('.owl-search').find('input[type="search"]').focus();
      ($('.owl-search').hasClass('is-visible')) ? $('.owl-search-overlay').addClass('is-visible'): $('.owl-search-overlay').removeClass('is-visible');
    }
  }

  function checkWindowWidth() {
    //check window width (scrollbar included)
    var e = window,
      a = 'inner';
    if (!('innerWidth' in window)) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    if (e[a + 'Width'] >= MqL) {
      return true;
    } else {
      return false;
    }
  }

  function moveNavigation() {
    var navigation = $('.owl-nav');
    var desktop = checkWindowWidth();
    if (desktop) {
      navigation.detach();
      navigation.insertBefore('.owl-header-buttons');
    } else {
      navigation.detach();
      navigation.insertAfter('.owl-main-content');
    }
  }



/*=========================================================================
     Map
========================================================================= */
  
  $("#map, .map-overlay").click(function(e){
    var e=window.event||e;
    $(".map-center").addClass("off");
	e.stopPropagation();
  });
  $("#map, .map-overlay").mouseout(function(e){
    $(".map-center").removeClass("off");
  });
  



/*=========================================================================
   Animated DIV
========================================================================= */
  
function css3animationEffect(){$().waypoint&&Modernizr.mq("only all and (min-width: 320px)")&&$(".animated").waypoint(function(){var i=$(this).data("animation-type");("undefined"==typeof i||0==i)&&(i="fadeIn"),$(this).addClass(i);var t=$(this).data("animation-duration");("undefined"==typeof t||0==t)&&(t="1"),$(this).css("animation-duration",t+"s");var n=$(this).data("animation-delay");"undefined"!=typeof n&&0!=n&&$(this).css("animation-delay",n+"s"),$(this).css("visibility","visible"),setTimeout(function(){$.waypoints("refresh")},1e3)},{triggerOnce:!0,offset:"bottom-in-view"})}css3animationEffect();	



/*=========================================================================
     jQuery CounTo plugin
========================================================================= */
  
(function(a){a.fn.countTo=function(g){g=g||{};return a(this).each(function(){function e(a){a=b.formatter.call(h,a,b);f.html(a)}var b=a.extend({},a.fn.countTo.defaults,{from:a(this).data("from"),to:a(this).data("to"),speed:a(this).data("speed"),refreshInterval:a(this).data("refresh-interval"),decimals:a(this).data("decimals")},g),j=Math.ceil(b.speed/b.refreshInterval),l=(b.to-b.from)/j,h=this,f=a(this),k=0,c=b.from,d=f.data("countTo")||{};f.data("countTo",d);d.interval&&clearInterval(d.interval);d.interval=
setInterval(function(){c+=l;k++;e(c);"function"==typeof b.onUpdate&&b.onUpdate.call(h,c);k>=j&&(f.removeData("countTo"),clearInterval(d.interval),c=b.to,"function"==typeof b.onComplete&&b.onComplete.call(h,c))},b.refreshInterval);e(c)})};a.fn.countTo.defaults={from:0,to:0,speed:1E3,refreshInterval:100,decimals:0,formatter:function(a,e){return a.toFixed(e.decimals)},onUpdate:null,onComplete:null}})(jQuery);

// display counter
$('.counters-box').waypoint(function() {
	$(this).find('.display-counter').each(
		function() {
			var value = $(this).data('value');
			$(this).countTo({
				from: 0,
				to: value,
				speed: 3000,
				refreshInterval: 10
			});
		});
	setTimeout(function() {
		$.waypoints('refresh');
	}, 1000);
}, {
	triggerOnce: true,
	offset: '100%'
});

						   
/*=========================================================================
     Pice Flip
========================================================================= */
  
  jQuery(document).ready(function($) {

    //hide the subtle gradient layer (.owl-pricing-list > li::after) when pricing table has been scrolled to the end (mobile version only)
    checkScrolling($('.owl-pricing-body'));
    $(window).on('resize', function() {
      window.requestAnimationFrame(function() {
        checkScrolling($('.owl-pricing-body'))
      });
    });
    $('.owl-pricing-body').on('scroll', function() {
      var selected = $(this);
      window.requestAnimationFrame(function() {
        checkScrolling(selected)
      });
    });

    function checkScrolling(tables) {
      tables.each(function() {
        var table = $(this),
          totalTableWidth = parseInt(table.children('.owl-pricing-features').width(),10),
          tableViewport = parseInt(table.width(),10);
        if (table.scrollLeft() >= totalTableWidth - tableViewport - 1) {
          table.parent('li').addClass('is-ended');
        } else {
          table.parent('li').removeClass('is-ended');
        }
      });
    }
    //switch from monthly to annual pricing tables
    bouncy_filter($('.owl-pricing-container'));

    function bouncy_filter(container) {
      container.each(function() {
        var pricing_table = $(this);
        var filter_list_container = pricing_table.children('.owl-pricing-switcher'),
          filter_radios = filter_list_container.find('input[type="radio"]'),
          pricing_table_wrapper = pricing_table.find('.owl-pricing-wrapper');
        //store pricing table items
        var table_elements = {};
        filter_radios.each(function() {
          var filter_type = $(this).val();
          table_elements[filter_type] = pricing_table_wrapper.find('li[data-type="' + filter_type + '"]');
        });
        //detect input change event
        filter_radios.on('change', function(event) {
          event.preventDefault();
          //detect which radio input item was checked
          var selected_filter = $(event.target).val();
          //give higher z-index to the pricing table items selected by the radio input
          show_selected_items(table_elements[selected_filter]);
          //rotate each owl-pricing-wrapper 
          //at the end of the animation hide the not-selected pricing tables and rotate back the .owl-pricing-wrapper
          if (!Modernizr.cssanimations) {
            hide_not_selected_items(table_elements, selected_filter);
            pricing_table_wrapper.removeClass('is-switched');
          } else {
            pricing_table_wrapper.addClass('is-switched').eq(0).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
              hide_not_selected_items(table_elements, selected_filter);
              pricing_table_wrapper.removeClass('is-switched');
              //change rotation direction if .owl-pricing-list has the .owl-bounce-invert class
              if (pricing_table.find('.owl-pricing-list').hasClass('owl-bounce-invert')) pricing_table_wrapper.toggleClass('reverse-animation');
            });
          }
        });
      });
    }

    function show_selected_items(selected_elements) {
      selected_elements.addClass('is-selected');
    }

    function hide_not_selected_items(table_containers, filter) {
      $.each(table_containers, function(key, value) {
        if (key != filter) {
          $(this).removeClass('is-visible is-selected').addClass('is-hidden');
        } else {
          $(this).addClass('is-visible').removeClass('is-hidden is-selected');
        }
      });
    }
  });



/*=========================================================================
     Accordion
========================================================================= */
  
  /* -- 1 -- */
  $(function() {
    $(".f-accordion").accordion({
      collapsible: true,
      heightStyle: "content"
    });
  });
  /* -- 2 -- */
  $(".notaccordion").addClass("ui-accordion ui-accordion-icons ui-widget ui-helper-reset").find("h3").addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-top ui-corner-bottom").hover(function() {
    $(this).toggleClass("ui-state-hover");
  }).prepend('<span class="ui-icon ui-icon-triangle-1-e"></span>').click(function() {
    $(this).find("> .ui-icon").toggleClass("ui-icon-triangle-1-e ui-icon-triangle-1-s").end().next().toggleClass("ui-accordion-content-active").slideToggle();
    return false;
  }).next().addClass("ui-accordion-content  ui-helper-reset ui-widget-content ui-corner-bottom").hide();



/*=========================================================================
   animated text
========================================================================= */
  
  var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
    var that = this;
    var delta = 300 - Math.random() * 100;
    if (this.isDeleting) {
      delta /= 2;
    }
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate-inner');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate-inner > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };


						   
						   
/*=========================================================================
     ProgressBars
========================================================================= */
  
  (function($, undefined) {
    $.widget("ui.progressbar", {
      version: "1.10.4",
      options: {
        max: 100,
        value: 0,
        change: null,
        complete: null
      },
      min: 0,
      _create: function() {
        // Constrain initial value
        this.oldValue = this.options.value = this._constrainedValue();
        this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
          // Only set static values, aria-valuenow and aria-valuemax are
          // set inside _refreshValue()
          role: "progressbar",
          "aria-valuemin": this.min
        });
        this.valueDiv = $("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
        this._refreshValue();
      },
      _destroy: function() {
        this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
        this.valueDiv.remove();
      },
      value: function(newValue) {
        if (newValue === undefined) {
          return this.options.value;
        }
        this.options.value = this._constrainedValue(newValue);
        this._refreshValue();
      },
      _constrainedValue: function(newValue) {
        if (newValue === undefined) {
          newValue = this.options.value;
        }
        this.indeterminate = newValue === false;
        // sanitize value
        if (typeof newValue !== "number") {
          newValue = 0;
        }
        return this.indeterminate ? false : Math.min(this.options.max, Math.max(this.min, newValue));
      },
      _setOptions: function(options) {
        // Ensure "value" option is set after other values (like max)
        var value = options.value;
        delete options.value;
        this._super(options);
        this.options.value = this._constrainedValue(value);
        this._refreshValue();
      },
      _setOption: function(key, value) {
        if (key === "max") {
          // Don't allow a max less than min
          value = Math.max(this.min, value);
        }
        this._super(key, value);
      },
      _percentage: function() {
        return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min);
      },
      _refreshValue: function() {
        var value = this.options.value,
          percentage = this._percentage();
        this.valueDiv.toggle(this.indeterminate || value > this.min).toggleClass("ui-corner-right", value === this.options.max).width(percentage.toFixed(0) + "%");
        this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate);
        if (this.indeterminate) {
          this.element.removeAttr("aria-valuenow");
          if (!this.overlayDiv) {
            this.overlayDiv = $("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv);
          }
        } else {
          this.element.attr({
            "aria-valuemax": this.options.max,
            "aria-valuenow": value
          });
          if (this.overlayDiv) {
            this.overlayDiv.remove();
            this.overlayDiv = null;
          }
        }
        if (this.oldValue !== value) {
          this.oldValue = value;
          this._trigger("change");
        }
        if (value === this.options.max) {
          this._trigger("complete");
        }
      }
    });
  })(jQuery);
  //	Visible, Sam Sehnert, samatdf, TeamDF
  //	================================================================================
  (function(e) {
    e.fn.visible = function(t, n, r) {
      var i = e(this).eq(0),
        s = i.get(0),
        o = e(window),
        u = o.scrollTop(),
        a = u + o.height(),
        f = o.scrollLeft(),
        l = f + o.width(),
        c = i.offset().top,
        h = c + i.height(),
        p = i.offset().left,
        d = p + i.width(),
        v = t === true ? h : c,
        m = t === true ? c : h,
        g = t === true ? d : p,
        y = t === true ? p : d,
        b = n === true ? s.offsetWidth * s.offsetHeight : true,
        r = r ? r : "both";
      if (r === "both") return !!b && m <= a && v >= u && y <= l && g >= f;
      else if (r === "vertical") return !!b && m <= a && v >= u;
      else if (r === "horizontal") return !!b && y <= l && g >= f
    }
  })(jQuery)
  //	ProBars
  //	===============================================================================
  function animateProgressBar() {
    $('.pro-bar').each(function(i, elem) {
      var elem = $(this),
        percent = elem.attr('data-pro-bar-percent'),
        delay = elem.attr('data-pro-bar-delay');
      if (!elem.hasClass('animated-pro')) elem.css({
        'width': '0%'
      });
      if (elem.visible(true)) {
        setTimeout(function() {
          elem.animate({
            'width': percent + '%'
          }, 2000, 'easeInOutExpo').addClass('animated-pro');
        }, delay);
      }
    });
  }
  $(function() {
    animateProgressBar();
  });
  $(window).resize(function() {
    animateProgressBar();
  });
  $(window).scroll(function() {
    animateProgressBar();
    if ($(window).scrollTop() + $(window).height() == $(document).height()) animateProgressBar();
  });

						   
						   
/*=========================================================================
   Close Message box
========================================================================= */
  
  (function($) {
    "use strict";
    $.fn.wTimeline = function() {
      return this.each(function() {
        var timeline = $(this),
          items = timeline.find('.ser-tab-item'),
          sections = timeline.find('.ser-tab-section'),
          running = false,
          sectionsWrapper = timeline.find('.ser-tab-sections'),
          sumWidth = 0,
          sectionsContainer = $('<div></div>', {
            id: 'section_container'
          }).css({
            position: 'relative'
          }),
          resizeTimer = null,
          sectionsPadding = $(sections[0]).innerWidth() - $(sections[0]).width(),
          activeIndex = 0,
          sectionsContainerPresent;
        $(sections).css({
          display: 'block'
        });
        $(sectionsWrapper).css({
          position: 'relative'
        });

        function timeline_resize() {
          sectionsWrapper.css({
            width: timeline.innerWidth() - sectionsWrapper.css('border-left-width') - sectionsWrapper.css('border-right-width') + 'px'
          });
          $(sections).css({
            width: sectionsWrapper.innerWidth() - sectionsPadding + 'px'
          });
          if ($(window).width() < 768) {
            if (!timeline.hasClass('type_vertical')) {
              timeline.addClass('type_vertical');
            }
            if (sectionsContainerPresent === true || sectionsContainerPresent === undefined) {
              sectionsWrapper.css({
                height: 'auto',
                overflow: 'visible'
              });
              $(sections).css({
                float: 'none'
              });
              $(sections).each(function(sectionIndex, section) {
                var section_content = $(section).find('.ser-tab-section-content');
                if (!$(section).hasClass('active')) {
                  section_content.css('display', 'none');
                }
                sectionsWrapper.append(section);
              });
              sectionsContainer.remove();
              sectionsContainerPresent = false;
            }
          } else {
            if (timeline.hasClass('type_vertical')) {
              timeline.removeClass('type_vertical');
            }
            sectionsWrapper.css({
              height: $(sections[activeIndex]).outerHeight() + 'px',
              overflow: 'hidden'
            });
            sumWidth = sections.length * (sectionsWrapper.innerWidth());
            var leftPos = -activeIndex * (sectionsWrapper.innerWidth());
            sectionsContainer.css({
              width: sumWidth + 'px',
              height: $(sections[activeIndex]).outerHeight() + 'px',
              left: leftPos
            });
            if (sectionsContainerPresent === false || sectionsContainerPresent === undefined) {
              sectionsContainer = $('<div></div>', {
                id: 'section_container'
              }).css({
                position: 'relative'
              });
              $(sections).css({
                float: 'left'
              });
              $(sections).each(function(sectionIndex, section) {
                var section_content = $(section).find('.ser-tab-section-content');
                section_content.css({
                  'display': 'block',
                  'height': 'auto'
                });
                sectionsContainer.append(section);
              });
              sectionsContainer.css({
                width: sumWidth + 'px',
                height: $(sections[activeIndex]).outerHeight() + 'px',
                left: leftPos
              });
              sectionsWrapper.append(sectionsContainer);
              sectionsContainerPresent = true;
            }
          }
        }
        timeline_resize();
        $(window).resize(function() {
          window.clearTimeout(resizeTimer);
          resizeTimer = window.setTimeout(function() {
            timeline_resize();
          }, 50);
        });
        sections.each(function(index, element) {
          var section = $(element),
            item = $(items[index]),
            section_title = section.find('.ser-tab-section-title'),
            section_content = section.find('.ser-tab-section-content');
          if (item.length) {
            item.click(function() {
              if ((!section.hasClass('active')) && (!running)) {
                running = true;
                items.each(function() {
                  if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                  }
                });
                if (item.length) {
                  item.addClass('active');
                }
                var leftPos = -index * (sectionsWrapper.innerWidth());
                sectionsWrapper.animate({
                  height: section.outerHeight()
                }, 300);
                sectionsContainer.animate({
                  left: leftPos
                }, 300, function() {
                  sections.each(function() {
                    if ($(this).hasClass('active')) {
                      $(this).removeClass('active');
                    }
                  });
                  section.addClass('active');
                  activeIndex = index;
                  running = false;
                });
              }
            });
          }
          if (section_title.length) {
            section_title.click(function() {
              if ((!section.hasClass('active')) && (!running)) {
                running = true;
                var currentHeight, newHeight;
                items.each(function() {
                  if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                  }
                });
                if (item.length) {
                  item.addClass('active');
                }
                sections.each(function() {
                  if ($(this).hasClass('active')) {
                    currentHeight = $(this).find('.ser-tab-section-content').height();
                    $(this).find('.ser-tab-section-content').slideUp();
                  }
                });
                newHeight = section_content.height();
                if (activeIndex < index) {
                  $('html').animate({
                    scrollTop: $('html').scrollTop() - currentHeight
                  });
                }
                section_content.slideDown(null, function() {
                  sections.each(function() {
                    if ($(this).hasClass('active')) {
                      $(this).removeClass('active');
                    }
                  });
                  section.addClass('active');
                  activeIndex = index;
                  running = false;
                });
              }
            });
          }
        });
      });
    };
  })(jQuery);
  jQuery(document).ready(function() {
    "use strict";
    jQuery('.ser-tab').wTimeline();
  });
						   


						   
/*=========================================================================
   Close Message box
========================================================================= */
  
  $('.message-box').find('.closemsg').click(function() {
    $(this).parent('.message-box').slideUp(500);
  });
						   

 
   
/*=========================================================================
 Header Login , Select Langusge, Cart etc...
========================================================================= */

  var document = window.document,
    docElem = document.documentElement;

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function getViewportH() {
    var client = docElem['clientHeight'],
      inner = window['innerHeight'];
    if (client < inner) return inner;
    else return client;
  }

  function getOffset(el) {
    return el.getBoundingClientRect();
  }

  function isMouseLeaveOrEnter(e, handler) {
    if (e.type != 'mouseout' && e.type != 'mouseover') return false;
    var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
    while (reltg && reltg != handler) reltg = reltg.parentNode;
    return (reltg != handler);
  }

  function owlTooltipMenu(el, options) {
    this.el = el;
    this.options = extend(this.defaults, options);
    this._init();
  }
  owlTooltipMenu.prototype = {
      defaults: {
        delayMenu: 100
      },
      _init: function() {
        this.touch = Modernizr.touch;
        this.menuItems = document.querySelectorAll('#' + this.el.id + ' > li');
        this._initEvents();
      },
      _initEvents: function() {
        var self = this;
        Array.prototype.slice.call(this.menuItems).forEach(function(el, i) {
          var trigger = el.querySelector('a');
          if (self.touch) {
            trigger.addEventListener('click', function(ev) {
              self._handleClick(this, ev);
            });
          } else {
            trigger.addEventListener('click', function(ev) {
              if (this.parentNode.querySelector('ul.owl-tt-submenu')) {
                ev.preventDefault();
              }
            });
            el.addEventListener('mouseover', function(ev) {
              if (isMouseLeaveOrEnter(ev, this)) self._openMenu(this);
            });
            el.addEventListener('mouseout', function(ev) {
              if (isMouseLeaveOrEnter(ev, this)) self._closeMenu(this);
            });
          }
        });
      },
      _openMenu: function(el) {
        var self = this;
        clearTimeout(this.omtimeout);
        this.omtimeout = setTimeout(function() {
          var submenu = el.querySelector('ul.owl-tt-submenu');
          if (submenu) {
            el.className = 'owl-tt-show';
            if (self._positionMenu(el) === 'top') {
              el.className += ' owl-tt-show-above';
            } else {
              el.className += ' owl-tt-show-below';
            }
          }
        }, this.touch ? 0 : this.options.delayMenu);
      },
      _closeMenu: function(el) {
        clearTimeout(this.omtimeout);
        var submenu = el.querySelector('ul.owl-tt-submenu');
        if (submenu) {
          el.className = el.className.replace(new RegExp("(^|\\s+)" + "owl-tt-show" + "(\\s+|$)"), ' ');
          el.className = el.className.replace(new RegExp("(^|\\s+)" + "owl-tt-show-below" + "(\\s+|$)"), ' ');
          el.className = el.className.replace(new RegExp("(^|\\s+)" + "owl-tt-show-above" + "(\\s+|$)"), ' ');
        }
      },
      _handleClick: function(el, ev) {
        var item = el.parentNode,
          items = Array.prototype.slice.call(this.menuItems),
          submenu = item.querySelector('ul.owl-tt-submenu')
          // first close any opened one..
        if (typeof this.current !== 'undefined' && items.indexOf(item) !== this.current) {
          this._closeMenu(this.el.children[this.current]);
          this.el.children[this.current].querySelector('ul.owl-tt-submenu').setAttribute('data-open', 'false');
        }
        if (submenu) {
          ev.preventDefault();
          var isOpen = submenu.getAttribute('data-open');
          if (isOpen === 'true') {
            this._closeMenu(item);

            submenu.setAttribute('data-open', 'false');
          } else {
            this._openMenu(item);
            this.current = items.indexOf(item);
            submenu.setAttribute('data-open', 'true');
          }
        }
      },
      _positionMenu: function(el) {
        // checking where's more space left in the viewport: above or below the element
        var vH = getViewportH(),
          ot = getOffset(el),
          spaceUp = ot.top,
          spaceDown = vH - spaceUp - el.offsetHeight;
        return (spaceDown <= spaceUp ? 'top' : 'bottom');
      }
    }
    // add to global namespace
  window.owlTooltipMenu = owlTooltipMenu;



/*=========================================================================
     Animated circle loader
========================================================================= */
  
  (function(c, e, l, j) {
    var d = function(a, b) {
      arguments.length && this.init(a, b);
    };
    d.CANVAS_NAMES = ["back", "fill", "front"];
    var i = d,
      f;
    f = l.createElement("canvas");
    f.getContext ? (f = f.getContext("2d"), f = (e.devicePixelRatio || 1) / (f.webkitBackingStorePixelRatio || f.mozBackingStorePixelRatio || f.msBackingStorePixelRatio || f.oBackingStorePixelRatio || f.backingStorePixelRatio || 1)) : f = 1;
    i.PIXEL_RATIO = f;
    i = ["ms", "moz", "webkit", "o"];
    for (f = 0; f < i.length && !e.requestAnimationFrame; f++) e.requestAnimationFrame = e[i[f] + "RequestAnimationFrame"], e.cancelAnimationFrame = e[i[f] + "CancelAnimationFrame"] || e[i[f] + "CancelRequestAnimationFrame"];
    e.requestAnimationFrame || (e.requestAnimationFrame = function(a) {
      return e.setTimeout(function() {
        a();
      }, 16);
    });
    e.cancelAnimationFrame || (e.cancelAnimationFrame = function(a) {
      clearTimeout(a);
    });
    var q = function(a) {
      arguments.length && this.init(a);
    };
    q.prototype = {
      attributes: {
        onLoop: null,
        afterStop: null,
        afterStopRequest: null,
        params: {},
        owner: null
      },
      init: function(a) {
        this.options = c.extend({}, this.attributes, a);
        this.animationHandle = null;
        this.loops = 0;
        this.stopRequested = !1;
      },
      start: function() {
        var a = this;
        this.animationHandle = e.requestAnimationFrame(function() {
          a.options.onLoop.apply(a.options.owner, [a._getThreadInfo()]) && a._loop();
        });
      },
      _getThreadInfo: function() {
        return {
          loops: ++this.loops,
          params: this.options.params,
          stopRequested: this.stopped
        };
      },
      _kill: function() {
        this.animationHandle && e.cancelAnimationFrame(this.animationHandle);
        c.isFunction(this.options.afterStop) && this.options.afterStop.call(this.options.owner);
        c.isFunction(this.options.afterStopRequest) && this.options.afterStopRequest.call(this.options.owner);
      },
      _loop: function() {
        var a = this;
        this.animationHandle = e.requestAnimationFrame(function() {
          a.options.onLoop.apply(a.options.owner, [a._getThreadInfo()]) ? a._loop() : a._kill();
        });
      },
      stop: function(a) {
        this.stopped = !0;
        this.options.afterStopRequest = a;
      }
    };
    d.prototype = {
      defaults: {
        initialValue: 0,
        maxValue: 100,
        label: "",
        labelClassName: "text-label",
        title: "",
        titleClassName: "text-title",
        dates: "",
        datesClassName: "text-dates",
        percent: !1,
        decimals: 0,
        digitClassName: "digit-label",
        format: null,
        duration: 4e3,
        fillColor: "#eeeeee",
        wrapperClassName: "circular-stat",
        outerThickness: 8,
        fillThickness: 10
      },
      init: function(a, b) {
        this.element = c(a);
        this.options = c.extend({}, this.defaults, b, this.element.data());
        this.attributes = {};
        this.labels = {};
        this.canvases = {};
        this.activeAnimationThread = null;
        this._parseOptions();
        if (this.canvases = this._build()) this._drawBackside(this.canvases.back), this._drawFrontside(this.canvases.front), this.labels = this._attachLabels(), this._updateVal(0), this.animate(this.options.initialValue, !1);
        return this;
      },
      _parseOptions: function() {
        var a = Math.max(this.element.width(), this.element.height()) / 2,
          b = this.options.outerThickness;
        this.attributes = c.extend({}, this.attributes, {
          currentValue: 0,
          radius: {
            back: a,
            fill: a - b,
            front: a - b - this.options.fillThickness
          }
        });
      },
      _createCanvas: function(a, b) {
        if (0 === a || 0 === b) return console.log("Invalid canvas dimensions"), !1;
        var g = l.createElement("canvas");
        g.width = a * d.PIXEL_RATIO;
        g.height = b * d.PIXEL_RATIO;
        1 < d.PIXEL_RATIO && (g.style.width = a + "px", g.style.height = b + "px");
        if (!g.getContext)
          if ("undefined" !== typeof G_vmlCanvasManager) G_vmlCanvasManager.initElement(g);
          else return console.log("Your browser does not support HTML5 Canvas, or excanvas is missing on IE"), !1;
        return g;
      },
      _attachLabels: function() {
        var a = c("<span></span>").addClass(this.options.digitClassName),
          b = c("<span></span>").addClass(this.options.labelClassName).text(this.options.label),
          z = c("<span></span>").addClass(this.options.titleClassName).text(this.options.title),
          y = c("<span></span>").addClass(this.options.datesClassName).text(this.options.dates);;
        this.element.append([a, b, z, y]);
        return {
          digit: a,
          text: b,
          text: z,
          text: y
        };
      },
      _build: function() {
        for (var a = {}, b, g = 2 * this.attributes.radius.back, m = 0; m < d.CANVAS_NAMES.length; ++m) {
          if (!(b = this._createCanvas(g, g))) return !1;
          b.style.position = "absolute";
          b.style.top = 0;
          b.style.left = 0;
          b.className = d.CANVAS_NAMES[m];
          a[d.CANVAS_NAMES[m]] = b;
        }
        this.element.addClass(this.options.wrapperClassName).append(c.map(a, function(a) {
          return a;
        }));
        return a;
      },
      _drawBackside: function(a) {
        var b = this.attributes.radius.back,
          g = this.attributes.radius.fill,
          a = a.getContext("2d"),
          c = a.createLinearGradient(0, 0, 0, 2 * b);
        c.addColorStop(0, "#d5d5d5");
        c.addColorStop(1, "#ffffff");
        1 < d.PIXEL_RATIO && a.scale(d.PIXEL_RATIO, d.PIXEL_RATIO);
        this._drawCircle(a, b, b, b);
        a.fillStyle = c;
        a.fill();
        this._drawCircle(a, b, b, g);
        a.fillStyle = "#eeeeee";
        a.fill();
      },
      _drawFrontside: function(a) {
        var b = this.attributes.radius.back,
          c = this.attributes.radius.front,
          a = a.getContext("2d");
        1 < d.PIXEL_RATIO && a.scale(d.PIXEL_RATIO, d.PIXEL_RATIO);
        this._drawCircle(a, b, b, c);
        a.shadowColor = "rgba(0, 0, 0, 0.3)";
        a.shadowBlur = 3;
        a.shadowOffsetY = 1;
        a.fillStyle = "#ffffff";
        a.fill();
      },
      _drawCircle: function(a, b, c, d) {
        a.beginPath();
        a.arc(b, c, d, 0, 2 * Math.PI, !1);
        a.closePath();
      },
      _updateVal: function(a, b, d) {
        c.isNumeric(a) && c.isNumeric(b) && c.isNumeric(d) ? (d = (d - b) * a, a = Math.max(0, Math.min(b + 100 * d / this.options.maxValue, 100)), b = Math.max(0, Math.min(b + d, this.options.maxValue))) : (a = Math.min(this.attributes.currentValue / this.options.maxValue, 100), b = Math.min(this.attributes.currentValue, this.options.maxValue));
        this.labels.digit[0].innerHTML = (c.isFunction(this.options.format) ? this.options.format : function(a, b, c) {
          return this.options.percent ? a.toFixed(this.options.decimals) + "%" : b.toFixed(this.options.decimals) + "/" + c.toFixed(this.options.decimals);
        }).apply(this, [a, b, this.options.maxValue]);
      },
      _redraw: function() {
        var a = this.canvases.fill,
          b = a.getContext("2d"),
          c = this.attributes.radius.back,
          f = this.attributes.radius.fill,
          e = 2 * (this.attributes.currentValue / this.options.maxValue) * Math.PI;
        b.fillStyle = this.options.fillColor;
        b.clearRect(0, 0, a.width, a.height);
        0 !== e && (b.save(), 1 < d.PIXEL_RATIO && b.scale(d.PIXEL_RATIO, d.PIXEL_RATIO), b.translate(c, c), b.rotate(-Math.PI / 2), b.beginPath(), b.arc(0, 0, f, 0, e, !1), b.lineTo(0, 0), b.closePath(), b.fill(), b.restore());
        this._updateVal();
      },
      animate: function(a, b) {
        function f(b) {
          1 === b.loops && (j = (new Date).getTime(), r = 2 * (a / this.options.maxValue) * Math.PI, p = 2 * (this.attributes.currentValue / this.options.maxValue) * Math.PI);
          var c = Math.min(((new Date).getTime() - j) / this.options.duration, 1),
            e = p + (r - p) * c;
          h.clearRect(0, 0, n.width, n.height);
          0 !== e && (h.save(), 1 < d.PIXEL_RATIO && h.scale(d.PIXEL_RATIO, d.PIXEL_RATIO), h.translate(i, i), h.rotate(-Math.PI / 2), h.beginPath(), h.arc(0, 0, l, 0, e, !1), h.lineTo(0, 0), h.closePath(), h.fill(), h.restore());
          k._updateVal(c, k.attributes.currentValue, a);
          return b.stopRequested || 1 <= c ? (k.attributes.currentValue += (a - k.attributes.currentValue) * c, !1) : !0;
        }

        function e(a) {
          c(this).queue("circular", function(a) {
            (this.activeAnimationThread = new q({
              onLoop: function() {
                return f.apply(this, arguments);
              },
              afterStop: function() {
                a();
                0 === c(this).queue("circular").length && (this.activeAnimationThread = null);
              },
              owner: this
            })).start();
          });
          a && c(this).dequeue("circular");
        }
        if (c.isNumeric(a) && !(0 > a || a > this.options.maxValue)) {
          var k = this,
            n = this.canvases.fill,
            h = n.getContext("2d"),
            i = this.attributes.radius.back,
            l = this.attributes.radius.fill,
            j, r, p;
          h.fillStyle = this.options.fillColor;
          !b && this.activeAnimationThread ? (c(this).clearQueue("circular"), this.activeAnimationThread.stop(function() {
            e.apply(this, [!0]);
          })) : e.apply(this, [!this.activeAnimationThread]);
        }
      },
      option: function(a, b) {
        if (0 === arguments.length) return c.extend({}, this.options);
        if ("string" === typeof a) {
          if (b === j) return this.options[a];
          switch (a) {
            case "label":
              this.options[a] = b;
              this.labels.text.html(b);
              break;
            case "maxValue":
              this.options.percent || (this.attributes.currentValue = Math.max(Math.min(this.attributes.currentValue, b), 0), this.options[a] = b, this._redraw());
              break;
            case "percent":
              b && (this.options.maxValue = 100, this.attributes.currentValue = Math.max(Math.min(this.attributes.currentValue, 100), 0));
            case "format":
            case "decimals":
            case "fillColor":
            case "duration":
              this.options[a] = b, this._redraw();
          }
        }
        return this;
      }
    };
    d.defaults = d.prototype.defaults;
    c.fn.CircularStat = function(a) {
      var b = "string" === typeof a,
        e = Array.prototype.slice.call(arguments, 1),
        f = this;
      if (b && "_" === a.charAt(0)) return f;
      b ? this.each(function() {
        var b = c.data(this, "circular-stat"),
          d = b && c.isFunction(b[a]) ? b[a].apply(b, e) : b;
        if (d !== b && d !== j) return f = d, !1;
      }) : this.each(function() {
        c.data(this, "circular-stat") || c.data(this, "circular-stat", new d(this, a));
      });
      return f;
    };
    c(function() {
      c('[data-provide="circular"]').each(function() {
        var a = c(this);
        a.CircularStat(a.data());
      });
    });
  })(jQuery, window, document);



/*=========================================================================
       Contact Form Popup bottom of the page
  ========================================================================= */
  
  jQuery(document).ready(function($) {
    // browser window scroll (in pixels) after which the "menu" link is shown
    var offset = 300;
    var navigationContainer = $('#cd-nav'),
      mainNavigation = navigationContainer.find('#cd-pop-form .cd-wrap-form');
    //hide or show the "menu" link
    checkMenu();
    $(window).scroll(function() {
      checkMenu();
    });
    //open or close the menu clicking on the bottom "menu" link
    $('.cd-nav-trigger').on('click', function() {
      $(this).toggleClass('menu-is-open');
      //we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
      mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');
    });

    function checkMenu() {
      if ($(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
        navigationContainer.addClass('is-fixed').find('.cd-nav-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
          mainNavigation.addClass('has-transitions');
        });
      } else if ($(window).scrollTop() <= offset) {
        //check if the menu is open when scrolling up
        if (mainNavigation.hasClass('is-visible') && !$('html').hasClass('no-csstransitions')) {
          //close the menu with animation
          mainNavigation.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            //wait for the menu to be closed and do the rest
            mainNavigation.removeClass('is-visible is-hidden has-transitions');
            navigationContainer.removeClass('is-fixed');
            $('.cd-nav-trigger').removeClass('menu-is-open');
          });
          //check if the menu is open when scrolling up - fallback if transitions are not supported
        } else if (mainNavigation.hasClass('is-visible') && $('html').hasClass('no-csstransitions')) {
          mainNavigation.removeClass('is-visible has-transitions');
          navigationContainer.removeClass('is-fixed');
          $('.cd-nav-trigger').removeClass('menu-is-open');
          //scrolling up with menu closed
        } else {
          navigationContainer.removeClass('is-fixed');
          mainNavigation.removeClass('has-transitions');
        }
      }
    }
  });
						   


/* ==============================================
   Countdown for jQuery v1.6.3.
=============================================== */

!function(t){function e(){function e(t){var a=1e12>t?s?performance.now()+performance.timing.navigationStart:i():t||i();a-o>=1e3&&(u._updateTargets(),o=a),n(e)}this.regional=[],this.regional[""]={labels:["Years","Months","Weeks","Days","Hours","Minutes","Seconds"],labels1:["Year","Month","Week","Day","Hour","Minute","Second"],compactLabels:["y","m","w","d"],whichLabels:null,digits:["0","1","2","3","4","5","6","7","8","9"],timeSeparator:":",isRTL:!1},this._defaults={until:null,since:null,timezone:null,serverSync:null,format:"dHMS",layout:"",compact:!1,significant:0,description:"",expiryUrl:"",expiryText:"",alwaysExpire:!1,onExpiry:null,onTick:null,tickInterval:1},t.extend(this._defaults,this.regional[""]),this._serverSyncs=[];var i="function"==typeof Date.now?Date.now:function(){return(new Date).getTime()},s=window.performance&&"function"==typeof window.performance.now,n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null,o=0;!n||t.noRequestAnimationFrame?(t.noRequestAnimationFrame=null,setInterval(function(){u._updateTargets()},980)):(o=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||i(),n(e))}function i(e,i){return"option"==e&&(0==i.length||1==i.length&&"string"==typeof i[0])?!0:t.inArray(e,p)>-1}var s=0,n=1,o=2,a=3,r=4,l=5,_=6;t.extend(e.prototype,{markerClassName:"hasCountdown",propertyName:"countdown",_rtlClass:"countdown_rtl",_sectionClass:"countdown_section",_amountClass:"countdown_amount",_rowClass:"countdown_row",_holdingClass:"countdown_holding",_showClass:"countdown_show",_descrClass:"countdown_descr",_timerTargets:[],setDefaults:function(e){this._resetExtraLabels(this._defaults,e),t.extend(this._defaults,e||{})},UTCDate:function(t,e,i,s,n,o,a,r){"object"==typeof e&&e.constructor==Date&&(r=e.getMilliseconds(),a=e.getSeconds(),o=e.getMinutes(),n=e.getHours(),s=e.getDate(),i=e.getMonth(),e=e.getFullYear());var l=new Date;return l.setUTCFullYear(e),l.setUTCDate(1),l.setUTCMonth(i||0),l.setUTCDate(s||1),l.setUTCHours(n||0),l.setUTCMinutes((o||0)-(Math.abs(t)<30?60*t:t)),l.setUTCSeconds(a||0),l.setUTCMilliseconds(r||0),l},periodsToSeconds:function(t){return 31557600*t[0]+2629800*t[1]+604800*t[2]+86400*t[3]+3600*t[4]+60*t[5]+t[6]},_attachPlugin:function(e,i){if(e=t(e),!e.hasClass(this.markerClassName)){var s={options:t.extend({},this._defaults),_periods:[0,0,0,0,0,0,0]};e.addClass(this.markerClassName).data(this.propertyName,s),this._optionPlugin(e,i)}},_addTarget:function(t){this._hasTarget(t)||this._timerTargets.push(t)},_hasTarget:function(e){return t.inArray(e,this._timerTargets)>-1},_removeTarget:function(e){this._timerTargets=t.map(this._timerTargets,function(t){return t==e?null:t})},_updateTargets:function(){for(var t=this._timerTargets.length-1;t>=0;t--)this._updateCountdown(this._timerTargets[t])},_optionPlugin:function(e,i,s){e=t(e);var n=e.data(this.propertyName);if(!i||"string"==typeof i&&null==s){var o=i;return i=(n||{}).options,i&&o?i[o]:i}if(e.hasClass(this.markerClassName)){if(i=i||{},"string"==typeof i){var o=i;i={},i[o]=s}i.layout&&(i.layout=i.layout.replace(/&lt;/g,"<").replace(/&gt;/g,">")),this._resetExtraLabels(n.options,i);var a=n.options.timezone!=i.timezone;t.extend(n.options,i),this._adjustSettings(e,n,null!=i.until||null!=i.since||a);var r=new Date;(n._since&&n._since<r||n._until&&n._until>r)&&this._addTarget(e[0]),this._updateCountdown(e,n)}},_updateCountdown:function(e,i){var s=t(e);if(i=i||s.data(this.propertyName)){if(s.html(this._generateHTML(i)).toggleClass(this._rtlClass,i.options.isRTL),t.isFunction(i.options.onTick)){var n="lap"!=i._hold?i._periods:this._calculatePeriods(i,i._show,i.options.significant,new Date);(1==i.options.tickInterval||this.periodsToSeconds(n)%i.options.tickInterval==0)&&i.options.onTick.apply(e,[n])}var o="pause"!=i._hold&&(i._since?i._now.getTime()<i._since.getTime():i._now.getTime()>=i._until.getTime());if(o&&!i._expiring){if(i._expiring=!0,this._hasTarget(e)||i.options.alwaysExpire){if(this._removeTarget(e),t.isFunction(i.options.onExpiry)&&i.options.onExpiry.apply(e,[]),i.options.expiryText){var a=i.options.layout;i.options.layout=i.options.expiryText,this._updateCountdown(e,i),i.options.layout=a}i.options.expiryUrl&&(window.location=i.options.expiryUrl)}i._expiring=!1}else"pause"==i._hold&&this._removeTarget(e);s.data(this.propertyName,i)}},_resetExtraLabels:function(t,e){var i=!1;for(var s in e)if("whichLabels"!=s&&s.match(/[Ll]abels/)){i=!0;break}if(i)for(var s in t)s.match(/[Ll]abels[02-9]|compactLabels1/)&&(t[s]=null)},_adjustSettings:function(e,i,s){for(var n,o=0,a=null,r=0;r<this._serverSyncs.length;r++)if(this._serverSyncs[r][0]==i.options.serverSync){a=this._serverSyncs[r][1];break}if(null!=a)o=i.options.serverSync?a:0,n=new Date;else{var l=t.isFunction(i.options.serverSync)?i.options.serverSync.apply(e,[]):null;n=new Date,o=l?n.getTime()-l.getTime():0,this._serverSyncs.push([i.options.serverSync,o])}var _=i.options.timezone;_=null==_?-n.getTimezoneOffset():_,(s||!s&&null==i._until&&null==i._since)&&(i._since=i.options.since,null!=i._since&&(i._since=this.UTCDate(_,this._determineTime(i._since,null)),i._since&&o&&i._since.setMilliseconds(i._since.getMilliseconds()+o)),i._until=this.UTCDate(_,this._determineTime(i.options.until,n)),o&&i._until.setMilliseconds(i._until.getMilliseconds()+o)),i._show=this._determineShow(i)},_destroyPlugin:function(e){e=t(e),e.hasClass(this.markerClassName)&&(this._removeTarget(e[0]),e.removeClass(this.markerClassName).empty().removeData(this.propertyName))},_pausePlugin:function(t){this._hold(t,"pause")},_lapPlugin:function(t){this._hold(t,"lap")},_resumePlugin:function(t){this._hold(t,null)},_hold:function(e,i){var s=t.data(e,this.propertyName);if(s){if("pause"==s._hold&&!i){s._periods=s._savePeriods;var n=s._since?"-":"+";s[s._since?"_since":"_until"]=this._determineTime(n+s._periods[0]+"y"+n+s._periods[1]+"o"+n+s._periods[2]+"w"+n+s._periods[3]+"d"+n+s._periods[4]+"h"+n+s._periods[5]+"m"+n+s._periods[6]+"s"),this._addTarget(e)}s._hold=i,s._savePeriods="pause"==i?s._periods:null,t.data(e,this.propertyName,s),this._updateCountdown(e,s)}},_getTimesPlugin:function(e){var i=t.data(e,this.propertyName);return i?"pause"==i._hold?i._savePeriods:i._hold?this._calculatePeriods(i,i._show,i.options.significant,new Date):i._periods:null},_determineTime:function(t,e){var i=function(t){var e=new Date;return e.setTime(e.getTime()+1e3*t),e},s=function(t){t=t.toLowerCase();for(var e=new Date,i=e.getFullYear(),s=e.getMonth(),n=e.getDate(),o=e.getHours(),a=e.getMinutes(),r=e.getSeconds(),l=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g,_=l.exec(t);_;){switch(_[2]||"s"){case"s":r+=parseInt(_[1],10);break;case"m":a+=parseInt(_[1],10);break;case"h":o+=parseInt(_[1],10);break;case"d":n+=parseInt(_[1],10);break;case"w":n+=7*parseInt(_[1],10);break;case"o":s+=parseInt(_[1],10),n=Math.min(n,u._getDaysInMonth(i,s));break;case"y":i+=parseInt(_[1],10),n=Math.min(n,u._getDaysInMonth(i,s))}_=l.exec(t)}return new Date(i,s,n,o,a,r,0)},n=null==t?e:"string"==typeof t?s(t):"number"==typeof t?i(t):t;return n&&n.setMilliseconds(0),n},_getDaysInMonth:function(t,e){return 32-new Date(t,e,32).getDate()},_normalLabels:function(t){return t},_generateHTML:function(e){var i=this;e._periods=e._hold?e._periods:this._calculatePeriods(e,e._show,e.options.significant,new Date);for(var p=!1,c=0,h=e.options.significant,d=t.extend({},e._show),m=s;_>=m;m++)p|="?"==e._show[m]&&e._periods[m]>0,d[m]="?"!=e._show[m]||p?e._show[m]:null,c+=d[m]?1:0,h-=e._periods[m]>0?1:0;for(var g=[!1,!1,!1,!1,!1,!1,!1],m=_;m>=s;m--)e._show[m]&&(e._periods[m]?g[m]=!0:(g[m]=h>0,h--));var f=e.options.compact?e.options.compactLabels:e.options.labels,w=e.options.whichLabels||this._normalLabels,y=function(t){var s=e.options["compactLabels"+w(e._periods[t])];return d[t]?i._translateDigits(e,e._periods[t])+(s?s[t]:f[t])+" ":""},D=function(t){var s=e.options["labels"+w(e._periods[t])];return!e.options.significant&&d[t]||e.options.significant&&g[t]?'<span class="'+u._sectionClass+'"><span class="'+u._amountClass+'">'+i._translateDigits(e,e._periods[t])+"</span><br/>"+(s?s[t]:f[t])+"</span>":""};return e.options.layout?this._buildLayout(e,d,e.options.layout,e.options.compact,e.options.significant,g):(e.options.compact?'<span class="'+this._rowClass+" "+this._amountClass+(e._hold?" "+this._holdingClass:"")+'">'+y(s)+y(n)+y(o)+y(a)+(d[r]?this._minDigits(e,e._periods[r],2):"")+(d[l]?(d[r]?e.options.timeSeparator:"")+this._minDigits(e,e._periods[l],2):"")+(d[_]?(d[r]||d[l]?e.options.timeSeparator:"")+this._minDigits(e,e._periods[_],2):""):'<span class="'+this._rowClass+" "+this._showClass+(e.options.significant||c)+(e._hold?" "+this._holdingClass:"")+'">'+D(s)+D(n)+D(o)+D(a)+D(r)+D(l)+D(_))+"</span>"+(e.options.description?'<span class="'+this._rowClass+" "+this._descrClass+'">'+e.options.description+"</span>":"")},_buildLayout:function(e,i,p,u,c,h){for(var d=e.options[u?"compactLabels":"labels"],m=e.options.whichLabels||this._normalLabels,g=function(t){return(e.options[(u?"compactLabels":"labels")+m(e._periods[t])]||d)[t]},f=function(t,i){return e.options.digits[Math.floor(t/i)%10]},w={desc:e.options.description,sep:e.options.timeSeparator,yl:g(s),yn:this._minDigits(e,e._periods[s],1),ynn:this._minDigits(e,e._periods[s],2),ynnn:this._minDigits(e,e._periods[s],3),y1:f(e._periods[s],1),y10:f(e._periods[s],10),y100:f(e._periods[s],100),y1000:f(e._periods[s],1e3),ol:g(n),on:this._minDigits(e,e._periods[n],1),onn:this._minDigits(e,e._periods[n],2),onnn:this._minDigits(e,e._periods[n],3),o1:f(e._periods[n],1),o10:f(e._periods[n],10),o100:f(e._periods[n],100),o1000:f(e._periods[n],1e3),wl:g(o),wn:this._minDigits(e,e._periods[o],1),wnn:this._minDigits(e,e._periods[o],2),wnnn:this._minDigits(e,e._periods[o],3),w1:f(e._periods[o],1),w10:f(e._periods[o],10),w100:f(e._periods[o],100),w1000:f(e._periods[o],1e3),dl:g(a),dn:this._minDigits(e,e._periods[a],1),dnn:this._minDigits(e,e._periods[a],2),dnnn:this._minDigits(e,e._periods[a],3),d1:f(e._periods[a],1),d10:f(e._periods[a],10),d100:f(e._periods[a],100),d1000:f(e._periods[a],1e3),hl:g(r),hn:this._minDigits(e,e._periods[r],1),hnn:this._minDigits(e,e._periods[r],2),hnnn:this._minDigits(e,e._periods[r],3),h1:f(e._periods[r],1),h10:f(e._periods[r],10),h100:f(e._periods[r],100),h1000:f(e._periods[r],1e3),ml:g(l),mn:this._minDigits(e,e._periods[l],1),mnn:this._minDigits(e,e._periods[l],2),mnnn:this._minDigits(e,e._periods[l],3),m1:f(e._periods[l],1),m10:f(e._periods[l],10),m100:f(e._periods[l],100),m1000:f(e._periods[l],1e3),sl:g(_),sn:this._minDigits(e,e._periods[_],1),snn:this._minDigits(e,e._periods[_],2),snnn:this._minDigits(e,e._periods[_],3),s1:f(e._periods[_],1),s10:f(e._periods[_],10),s100:f(e._periods[_],100),s1000:f(e._periods[_],1e3)},y=p,D=s;_>=D;D++){var T="yowdhms".charAt(D),v=new RegExp("\\{"+T+"<\\}([\\s\\S]*)\\{"+T+">\\}","g");y=y.replace(v,!c&&i[D]||c&&h[D]?"$1":"")}return t.each(w,function(t,e){var i=new RegExp("\\{"+t+"\\}","g");y=y.replace(i,e)}),y},_minDigits:function(t,e,i){return e=""+e,e.length>=i?this._translateDigits(t,e):(e="0000000000"+e,this._translateDigits(t,e.substr(e.length-i)))},_translateDigits:function(t,e){return(""+e).replace(/[0-9]/g,function(e){return t.options.digits[e]})},_determineShow:function(t){var e=t.options.format,i=[];return i[s]=e.match("y")?"?":e.match("Y")?"!":null,i[n]=e.match("o")?"?":e.match("O")?"!":null,i[o]=e.match("w")?"?":e.match("W")?"!":null,i[a]=e.match("d")?"?":e.match("D")?"!":null,i[r]=e.match("h")?"?":e.match("H")?"!":null,i[l]=e.match("m")?"?":e.match("M")?"!":null,i[_]=e.match("s")?"?":e.match("S")?"!":null,i},_calculatePeriods:function(t,e,i,p){t._now=p,t._now.setMilliseconds(0);var c=new Date(t._now.getTime());t._since?p.getTime()<t._since.getTime()?t._now=p=c:p=t._since:(c.setTime(t._until.getTime()),p.getTime()>t._until.getTime()&&(t._now=p=c));var h=[0,0,0,0,0,0,0];if(e[s]||e[n]){var d=u._getDaysInMonth(p.getFullYear(),p.getMonth()),m=u._getDaysInMonth(c.getFullYear(),c.getMonth()),g=c.getDate()==p.getDate()||c.getDate()>=Math.min(d,m)&&p.getDate()>=Math.min(d,m),f=function(t){return 60*(60*t.getHours()+t.getMinutes())+t.getSeconds()},w=Math.max(0,12*(c.getFullYear()-p.getFullYear())+c.getMonth()-p.getMonth()+(c.getDate()<p.getDate()&&!g||g&&f(c)<f(p)?-1:0));h[s]=e[s]?Math.floor(w/12):0,h[n]=e[n]?w-12*h[s]:0,p=new Date(p.getTime());var y=p.getDate()==d,D=u._getDaysInMonth(p.getFullYear()+h[s],p.getMonth()+h[n]);p.getDate()>D&&p.setDate(D),p.setFullYear(p.getFullYear()+h[s]),p.setMonth(p.getMonth()+h[n]),y&&p.setDate(D)}var T=Math.floor((c.getTime()-p.getTime())/1e3),v=function(t,i){h[t]=e[t]?Math.floor(T/i):0,T-=h[t]*i};if(v(o,604800),v(a,86400),v(r,3600),v(l,60),v(_,1),T>0&&!t._since)for(var C=[1,12,4.3482,7,24,60,60],M=_,b=1,S=_;S>=s;S--)e[S]&&(h[M]>=b&&(h[M]=0,T=1),T>0&&(h[S]++,T=0,M=S,b=1)),b*=C[S];if(i)for(var S=s;_>=S;S++)i&&h[S]?i--:i||(h[S]=0);return h}});var p=["getTimes"];t.fn.countdown=function(t){var e=Array.prototype.slice.call(arguments,1);return i(t,e)?u["_"+t+"Plugin"].apply(u,[this[0]].concat(e)):this.each(function(){if("string"==typeof t){if(!u["_"+t+"Plugin"])throw"Unknown command: "+t;u["_"+t+"Plugin"].apply(u,[this].concat(e))}else u._attachPlugin(this,t||{})})};var u=t.countdown=new e}(jQuery);


/* Countdown */

    var launchDay = new Date(2017, 5-1, 12);
    $('#timer').countdown({
    until: launchDay
    });

/* end Countdown function */


}(jQuery);


