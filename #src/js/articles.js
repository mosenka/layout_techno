// import Swiper, { Pagination, Navigation }  from 'swiper'

new Swiper('.articles', {
	// modules: [ Pagination, Navigation ],
	loop: true,
	slidesPerView: 1, 
	spaceBetween: 20,
	centeredSlides: true,
	pagination: {
		el: '.pagination',
		bulletClass: 'pagination__bullet',
		bulletActiveClass: 'pagination__bullet-active',
		clickable: true
	 },
	 navigation: {
		nextEl: '.articles__arrow-next',
		prevEl: '.articles__arrow-prev'
	 },
	// centeredSlides: true,
	breakpoints: {
		991.98: {
			slidesPerView: 3, 
			spaceBetween: 30,
			centeredSlides: true,
		},
		767.98: {
			slidesPerView: 2, 
			spaceBetween: 30,
			centeredSlides: false
		}
	}
	
});

