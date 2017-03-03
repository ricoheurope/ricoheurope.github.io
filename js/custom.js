(function ($) {
	
	$('#style').click(function (){
		   $('link[name="style"]').attr('href','css/style.css');
		});
	
	$('#style3').click(function (){
		   $('link[name="style"]').attr('href','css/style3.css');
		});
	
	$('#style4').click(function (){
		   $('link[name="style"]').attr('href','css/style4.css');
		});
	
	$('#style5').click(function (){
		   $('link[name="style"]').attr('href','css/style5.css');
		});
	
	$('#style6').click(function (){
		   $('link[name="style"]').attr('href','css/style6.css');
		});
	
    // Navigation scrolls
    $('.navbar-nav li a').bind('click', function(event) {
        $('.navbar-nav li').removeClass('active');
        $(this).closest('li').addClass('active');
        var $anchor = $(this);
        var nav = $($anchor.attr('href'));
        if (nav.length) {
        $('html, body').stop().animate({				
            scrollTop: $($anchor.attr('href')).offset().top - 80				
        }, 1500, 'easeInOutExpo');
        
        event.preventDefault();
        }
    });
       

    // Instantiate MixItUp:
    $('#Container').mixItUp();

    // Team Slider
    $('.autoplay').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    
})(jQuery);