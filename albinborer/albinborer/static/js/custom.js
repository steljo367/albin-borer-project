$(function () {
	// Multi Level dropdowns
	$("ul.dropdown-menu [data-toggle='dropdown']").on("click", function (event) {
		event.preventDefault();
		event.stopPropagation();
		$(this).siblings().toggleClass("show");
		if (!$(this).next().hasClass('show')) {
			$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
		}
		$(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
			$('.dropdown-submenu .show').removeClass("show");
		});
	});

	//SHOW THE MATCHING DIV IN TEAM PAGE
	$('body .dropdown-list li').on("click", function (e) {
		e.preventDefault();
		var id = $(this).attr('data-toggle');
		$("body .search-result .post-result").each(function () {
			$(this).hide();
			if ($(this).attr('data-id') === id) {
				$(this).show();
			}
		});
	});

	//TEAM AND PROJECT PAGE DROPDOWN
	$('.dropdown-list').on("click", function (e) {
		e.preventDefault();
		$(this).toggleClass('hover');
	});
	
	//	PREVENT-CLIK ON SUB-LOCATION
	$('body .location-filter li').on("click", function (e) {
		e.preventDefault();
		$("body .sub-location-filter").removeClass('prevent-default');
	});
	$('body .sub-location-filter').on("click", function (e) {
		e.preventDefault();
		$("body .location-filter").toggleClass('prevent-default');
	});
});

$(window).on('load', function () {
	//	BANNER IMGAE AUTO HEIGHT
	var x = $('header').height();
	$('.banner-image').css("height", window.innerHeight - x);
	
	$('body .location-filter .all.selected')
	$('.banner-image').css("height", window.innerHeight - x);

	//	STICKY-HEADER
	$(window).scroll(function () {
		if ($(window).scrollTop() >= 90) {
			$('header').addClass('sticky');
		} else {
			$('header').removeClass('sticky');
		}
	});
});

//TYPEWRITTER-AUTO-TEXT
$(function () {
	var TxtType = function (el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	};

	TxtType.prototype.tick = function () {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

		var that = this;
		var delta = 200 - Math.random() * 100;

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

		setTimeout(function () {
			that.tick();
		}, delta);
	};

	window.onload = function () {
		var elements = document.getElementsByClassName('typewrite');
		for (var i = 0; i < elements.length; i++) {
			var toRotate = elements[i].getAttribute('data-type');
			var period = elements[i].getAttribute('data-period');
			if (toRotate) {
				new TxtType(elements[i], JSON.parse(toRotate), period);
			}
		}
		// INJECT CSS
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
		document.body.appendChild(css);
	};
});