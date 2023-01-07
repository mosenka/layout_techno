// import Swiper, { Navigation, Autoplay, Parallax }  from 'swiper';
// import gsap from "gsap";


new Swiper('.offer__slider', {
	// modules: [ Navigation, Autoplay, Parallax ],
	loop: true,
	speed: 600,
	autoplay: {
		delay: 8000,
	},
	slidesPerView: 1, 
	navigation: {
		nextEl: '.offer__arrow-next',
		prevEl: '.offer__arrow-prev'
	},
});

gsap.to($('.offer__title'), 1, {
	delay: 1.6,
	opacity: "1",
	y: 0
});
gsap.to([$('.offer__discription'), $('.offer__button-wrapper')], 1, {
	delay: 2,
	opacity: "1",
	y: 0
});