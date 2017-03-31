// change styles
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

})(jQuery);
