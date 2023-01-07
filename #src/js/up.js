let up = $('#up');

let $showScroll;

if($('.section-advantages').length != 0) {
	$showScroll = $('.section-advantages');
}else {
	$showScroll = $('.breadctumbs');
}

let isShow = false;


$("#up").click(function(e) { 
	e.preventDefault();
    $('body, html').animate({scrollTop: 0}, 500);
});

window.addEventListener('scroll', function() {
    let offset = $showScroll.offset().top + $showScroll.height();
    let scroll = $(window).scrollTop() + $(window).height();

    if(scroll <= offset) {
        if(!isShow) {
            up.css({display: 'none'});
            isShow = true;

        }
    } else {
        if(isShow) {
            up.css({display: 'flex'});
            isShow = false;
        }
    }
});


