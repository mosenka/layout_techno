// import gsap from "gsap";
// import { TweenLite } from "gsap/gsap-core";


function counter(number, elem) {
	let start = {score:0};

  	TweenLite.to(start, 3, 
	{
		score:"+="+number, 
		roundProps:"score", 
		onUpdate:updateHandler, 
		onUpdateParams: [elem, start],
		ease:"none"
	});
}
		
function updateHandler(elem, start) {
	$(elem).text(start.score);
}

var $element = $('.section-number');
let isVisited = 0;

$(window).scroll(function() {
	var scroll = $(window).scrollTop() + $(window).height();
	//Если скролл до середины
	var offset = $element.offset().top + ($element.height() * 0.5);

	if (scroll > offset && isVisited == 0) {
		$(".number__number").each(function(index, elem){
			counter(+$(elem).text(), elem);
		});
		isVisited = 1;
	}
});

