/**
 * Created by Кристи on 16.11.2017.
 */
jQuery(function ($) { "use strict";

    $('.header-slider').slick({
        infinite: true,
        autoplay:true,
        arrows:true,
        adaptiveHeight:true,
        responsive:true,
        dots:false,
        fade: true,
        nextArrow: '<span class="nextArrow"><i class="fa fa-angle-right"></i></span>',
        prevArrow: '<span class="prevArrow"><i class="fa fa-angle-left"></i></span>',
        cssEase: 'linear'
    });
    $('.slider-services').slick({
        infinite: true,
        autoplay:false,
        arrows:false,
        slidesToShow:3,
        slidesToScroll:3,
        vertical: true,
        dots:true,
        verticalSwiping: true,
        nextArrow: '<span class="nextArrow"><i class="fa fa-angle-right"></i></span>',
        prevArrow: '<span class="prevArrow"><i class="fa fa-angle-left"></i></span>',
        cssEase: 'linear'
    });
    $('.case-slider').slick({
        infinite: true,
        autoplay:false,
        arrows:false,
        slidesToShow:1,
        slidesToScroll:1,
        dots:true,
        cssEase: 'linear'
    });

    var limit     = $(window).height()/3,
        $backToTop = $('#back-to-top');
    $(window).scroll(function () {
        if ( $(this).scrollTop() > limit ) {
            $backToTop.fadeIn();
        } else {
            $backToTop.fadeOut();
        }
    });
    $backToTop.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1500);
        return false;
    });


    $('.st-ff-count').appear();
    $(document.body).on('appear', '.st-ff-count', function(e, $affected) {
        $affected.each(function(i) {
            if (parseInt($(this).data('runit'))) {
                $(this).countTo({
                    speed: 3000,
                    refreshInterval: 50
                });
                $(this).data('runit', "0");
            };

        });
    });
    $(function() {
        $(document.body).on('appear', '.slider__item', function(e, $affected) {
            $(this).addClass("appeared");
        });
        $('.slider__item').appear({force_process: true});
    });
    $(function(){
        $('#works').mixItUp({
            animation: {
                duration: 700,
                effects: 'stagger(34ms) rotateZ(20deg) fade scale(0.41)',
                easing: 'ease'
            }
        });
    });
});

if(document.body.clientWidth<1024){
    $(".navbar-collapse").each(function(){
        $(this).on('click', 'a', function (e) {
            $(e.delegateTarget).collapse('toggle').parent().parent().parent().parent().find('.navbar-toggle').removeClass('active');;
        });
    });
    $(".navbar-toggle").on("click", function () {
        $(this).toggleClass("active");
    });
}
