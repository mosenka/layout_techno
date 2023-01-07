// import gsap from "gsap";

let elem;

$('.service').on('mouseover', function(){
	gsap.to($(this), {
		duration: .5,
		y: -8,
	});
	gsap.to($(this).find('.service__img'), {
		duration: .5,
		opacity: 1
	});

});




$('.service').on('mouseout', function(){
	elem = gsap.to($(this), {
		duration: .5,
		y: 0
	});
	gsap.to($(this).find('.service__img'), {
		duration: .5,
		opacity: 0
	});

});