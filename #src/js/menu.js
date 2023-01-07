// import gsap from "gsap";


let icon = $('.menu__icon');
const menu = $('.menu__nav-mobile');
let submenu = $('.menu__nav-mobile .submenu');

let items = $('.menu__nav-mobile .menu__item');

const $navbar = $('.navbar');

var tl = gsap.timeline({ paused: true });

// icon.prependTo(mobMenu);
// var $element = $('.section-number');
let isFixed = false;

$(window).scroll(function() {
	if ($(window).scrollTop() >= $navbar.offset().top) {
		if(!isFixed) {
			$navbar.addClass('navbar-fixed');
			isFixed = true;
		}

	} 
	if($(window).scrollTop() == 0){
		if(isFixed) {
			$navbar.removeClass('navbar-fixed');
			isFixed = false;
		}
	}
	
});

tl.to(menu, {
	duration: .5,
	top: '127px',
	y: 0,
	height: 'auto', 
});

tl.reverse();

icon.on( "click", function() {
	$(this).toggleClass('menu__icon-open');
	tl.reversed(!tl.reversed());
});

items.each(function(index,item){
	let plus = $('<span class="menu__plus">+</span>');
	
	if($(item).find('.submenu').length > 0){
		$(item).append(plus);
		let height = $(item).find('.submenu').height();
		gsap.set($(item).find('.submenu'), {
			height: 0, 
		})
		var sb = gsap.timeline({ paused: true });
		
		sb.to($(item).find('.submenu'), {
			duration: .2,
			height: height, 
		});
		sb.reverse();
	}
	plus.on('click', function(){
		sb.reversed( !sb.reversed() );
	})
});






