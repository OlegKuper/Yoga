$(window).resize(function(event) {
	$(".slider").slick('setPosition');
	$(".hor-slider").slick('setPosition');
});

$(document).ready(initPage);
function initPage(){
	$(function() {
		jcf.replaceAll();
	});
	ImgTobg();
	mobileMenu();
	pageScrollTop();
	validateFields();
	slider();
	hovered();
	horSlider();
	anchor();
	header_fixed_class();
}
function ImgTobg() {
	$('.img-to-bg').each(function() {
		if ($(this).find('img').length) {
			$(this).css('background-image', 'url(' + $(this).find('> img').attr('src') + ')');
		}
	});
}

function mobileMenu(){
	$('<span class="open-menu"><span></span><span></span><span></span><span></span></span>').appendTo('.header-page > .container');
	$('<span class="fader"/>').appendTo('.header-page > .container');
	$('html').on('click', '.open-menu', function() {
		$('body').toggleClass('menu-opened');
		return false;
	});
	$('.fader').on('click touchmove', function(event) {
		$('body').removeClass('menu-opened');
	});
}

function pageScrollTop() {
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.btn-page-up').fadeIn();
		} else {
			$('.btn-page-up').fadeOut();
		}
	});
	$('.btn-page-up').click(function(e){
		var offsetTop = $('body').offset().top;
		$('html, body').stop().animate({ 
			scrollTop: offsetTop
		}, 500);
		e.preventDefault();
	});
}

function slider() {
	$('.slider').slick({
		infinite: true,
	});
}
function horSlider() {
	$('.hor-slider').slick({
		infinite: true,
		dots: true,
		vertical: true,
	});
}

function anchor(){
	$(".anchor, .visual__btn-down").click(function(e){
		var href = $(this).attr("href");
		offsetTop = href === "#" ? 0 : $(href).offset().top - $('.header-page').outerHeight();
		// for modal popup
		$('body').removeClass('menu-opened');
		$("html, body").stop().animate({
			scrollTop: offsetTop
		}, 800);
		e.preventDefault();
	});
};

function header_fixed_class(){
	var header = $('.header-page');
	var wrapper = $('.wrapper');
	var heightEl  = 0;
	$(window).scrollTop() > heightEl ? header.addClass('modify') : header.removeClass('modify');
	$(window).scrollTop() > heightEl ? wrapper.addClass('header_fixed') : wrapper.removeClass('header_fixed');
	$(window).scroll(function(event){
		$(window).scrollTop() > heightEl ? header.addClass('modify') : header.removeClass('modify');
		$(window).scrollTop() > heightEl ? wrapper.addClass('header_fixed') : wrapper.removeClass('header_fixed');
	});
}

function hovered() {
	$('.shop__btn').mouseenter(function () {
		$(this).parent().find('.shop__price-title').addClass('hovered');
	}).mouseleave(function () {
		$(this).parent().find('.shop__price-title').removeClass('hovered');
	});
}

function validateFields(){
	if( document.querySelector('.contact-form') ){
		$(".contact-form").validate({
			highlight: function(element) {
				$(element).parent().addClass('form__box_error').removeClass('form__box_valid');
			},
			unhighlight: function(element) {
				$(element).parent().removeClass('form__box_error').addClass('form__box_valid');
			},
			rules: {
				request: {
					required: false,
					minlength: false
				},
				name: {
					required: true,
					minlength: 2
				},
				email: {
					required: true,
					email: true,
					myEmail: true
				}
			},
			messages: {
				request: {
					required: false,
					minlength: false
				},
				name: {
					required: false,
					minlength: false
				},
				email: {
					required: false,
					email: false,
					myEmail: false
				}
			}
		});

		$.validator.addMethod(
			"myEmail",
			function(value, element){
				return value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
			}
		);
	}
}