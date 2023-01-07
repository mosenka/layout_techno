@@include('./webp.js');

document.addEventListener('DOMContentLoaded', () => {
    @@include('./menu.js') 
    @@include('./offer.js') 
    
    @@include('./popup.js') 
    
    @@include('./advantages.js') 
    @@include('./services.js') 
    @@include('./process.js') 
    @@include('./video.js') 
    @@include('./number.js') 
    @@include('./reviews.js') 
    @@include('./articles.js') 
    @@include('./up.js') 
    @@include('./decision.js') 


    gsap.to($('.range__circle'), {
        duration: 3,
        left: '100%',
        repeat: -1,
        ease: 'none'
    });

    

})
