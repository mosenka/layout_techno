// import Swiper, { Pagination }  from 'swiper'


new Swiper('.reviews', {
	// modules: [ Pagination ],
	loop: true,
	slidesPerView: 1, 
	spaceBetween: 20,
	pagination: {
		el: '.pagination',
		bulletClass: 'pagination__bullet',
		bulletActiveClass: 'pagination__bullet-active',
		clickable: true
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

