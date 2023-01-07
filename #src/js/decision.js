// decision page
$('.decision__card').each(function(index, elem) {
	let height;
	height = $(this).find('.decision__card-font').outerHeight(true);
	$(this).css({height: height}, 200);

	$(this).hover(function(){
		height = $(this).find('.decision__card-back').outerHeight();
		$(this).animate({height: height}, 200);
	}, 
	function() {
		height = $(this).find('.decision__card-font').outerHeight();
		$(this).animate({height: height}, 200);
	})
	
});

// decisions page
let cardHeight = 0;
$('.decisions__card-font').each(function(index, elem){
	if($(elem).outerHeight(true) > cardHeight) {
		cardHeight = $(elem).outerHeight(true);
	}
	return true;
});
$('.decisions__card').css({height: cardHeight});

$('.decisions__card-font').css({height: cardHeight});


showTabsContent();

$('.decision__tabs-item').on('click', function(){
	$('.decision__tabs-item').removeClass('decision__tabs-item-active');
	$(this).addClass('decision__tabs-item-active');
	showTabsContent();

});

function showTabsContent() {
	
	let text = $('.decision__tabs-item-active').find('.decision__tabs-content').text();

	$('.decision__tabs-text').text(text);


}