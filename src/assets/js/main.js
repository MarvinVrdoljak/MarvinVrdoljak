!function ($) {
    let $accordionTitle = $('.accordion__title-wrapper');

    $accordionTitle.on('click', function(){
        $(this).toggleClass('is-active');
        $(this).next('.accordion__content-wrapper').stop().slideToggle();
    });

}(jQuery);
