/*
 Theme Name: MYSELF - HTML5 responsive VCard Template
 Theme URL:  http://themewar.com/html/myself
 Author: ThemeWar
 Author URI: http://themewar.com
 Description: HTML5 responsive VCard Template
 Version: 1.0
 */
(function($){
    'use strict';

    /*=======================================================================
     [01] Portfolio Hover
     =========================================================================*/
    var sect = $(window.location.hash);
    if(sect.length === 1){
        $('.comonSections.active').removeClass('active');
        sect.addClass('active');
    }

    /*=======================================================================
     [02] Custom Scroll Bar
     =========================================================================*/
    var scroll = $(".comonSections, .fixedSidebar, #singleBlog, .singleBscoll");
    if(scroll.length > 0){
        scroll.mCustomScrollbar({
            axis : "y"
        });
    }
    /*=======================================================================
     [03] Toltip
     =========================================================================*/
    var toggle = $('.portfolio-filter');
    if(toggle.length > 0){
        $('[data-toggle="tooltip"]').tooltip();
    }
    /*=======================================================================
     [04] Portfolio Hover
     =========================================================================*/
    var grid = $("#Grid");
    if(grid.length > 0)
    {
        $('.singleFolio').each(function(){
            $(this).hoverdir({
                hoverDelay : 10
            });
        });
    }

    /*=======================================================================
     [05] Sidebar menu
     =========================================================================*/
    var fs = true,
        fixed = $(".fixedSidebar");

    $(".sidebarToggle").on('click', function(e){
        $(this).toggleClass('active');
        if(fs)
        {
            fixed.animate({right : '0px'}, 400);
            fs = false;
        }else
        {
            fixed.animate({right : '-360px'}, 400);
            fs = true;
        }
        return false;
    });
    $(document).on('mouseup', function(e){
        var container = fixed;
        if(! container.is(e.target) && container.has(e.target).length === 0)
        {
            fixed.animate({right : '-360px'}, 400);
        }
    });


    /*=======================================================================
     [06] Google Map
     =========================================================================*/
    if($("#map").length > 0)
    {
        var map;
        map = new GMaps({
            el : '#map',
            lat : 51.4584218,
            lng : - 0.0813982,
            scrollwheel : false,
            zoom : 14,
            zoomControl : true,
            panControl : false,
            streetViewControl : false,
            mapTypeControl : false,
            overviewMapControl : false,
            clickable : false
        });
        var styles = [
            {
                "featureType" : "road",
                "stylers" : [
                    {"color" : "#ffffff"}
                ]
            }, {
                "featureType" : "water",
                "stylers" : [
                    {"color" : "#EDEDED"}
                ]
            }, {
                "featureType" : "landscape",
                "stylers" : [
                    {"color" : "#f5f5f5"}
                ]
            }, {
                "elementType" : "labels.text.fill",
                "stylers" : [
                    {"color" : "#a8a8a8"}
                ]
            }, {
                "featureType" : "poi",
                "stylers" : [
                    {"color" : "#EDEDED"}
                ]
            }, {
                "elementType" : "labels.text",
                "stylers" : [
                    {"saturation" : 1},
                    {"weight" : 0.1},
                    {"color" : "#a8a8a8"}
                ]
            }
        ];
        map.addStyle({
            styledMapName : "Styled Map",
            styles : styles,
            mapTypeId : "map_style"
        });
        map.setStyle("map_style");
    }

    /*=======================================================================
     [07] Search 
     =========================================================================*/
    var sear = $(".searchBar"),
        seaG = $("#searchGen");
    seaG.on('click', function(){
        sear.fadeIn('slow');
        return false;
    });
    $(document).on('mouseup', function(e){
        var container = sear;
        if(! container.is(e.target) && container.has(e.target).length === 0)
        {
            sear.fadeOut('slow');
        }
    });

    /*=======================================================================
     [08] Header Menu tab
     =========================================================================*/
    if($('.header_home').length > 0){
        $('.scroll').on('click', function(e){
            $('.mainMenu ul li').removeClass('active');
            $(this).parent().addClass('active');
            var $this = jQuery(this),
                sect = jQuery('#' + $this.data('section')),
                current_sect = jQuery('.comonSections.active');
            if(sect.length === 1){
                if(sect.hasClass('active') === false && jQuery('body').hasClass('section-switching') === false){
                    current_sect.removeClass('active');
                    sect.addClass('active');

                }
            }
            return false;
        });
    }
    /*=======================================================================
     [09] Fillter
     =========================================================================*/
    var grids = $("#Grid");
    if(grids.length > 0){
        grids.themeWar();
    }

    /*=======================================================================
     [10] Preloader
     =========================================================================*/
    $(window).on('load', function(){
        $(".left").css({"transition" : "all 1.8s ease", "width" : "0px"});
        $(".right").css({"transition" : "all 1.8s ease", "width" : "0px"});
        $('.loaderImg').fadeOut('fast');
    });

    /*=======================================================================
     [13] Mobile Menu 
     =========================================================================*/
    if($('.mobileMenu').length > 0){
        $('.mobileMenu').on('click', function(){
            $(this).toggleClass('active');
            $('.mainMenu > ul').slideToggle('slow');
        });
    }

    /*=======================================================================
     [14] magnificPopup
     =========================================================================*/
    var apop = $('a.popUp');
    if(apop.length > 0){
        apop.magnificPopup({
            type : 'image',
            gallery : {
                enabled : true
            }
        });
    }

    /*=======================================================================
     [14] Contact Form
     =========================================================================*/
    if($("#contact_form").length > 0)
    {
        $("#contact_form").on('submit', function(e){
            e.preventDefault();
            $('#con_submit').val('Processsing...');

            var con_name = $("#con_name").val(),
                con_email = $("#con_email").val(),
                con_msg = $("#con_message").val(),
                required = 0;

            $(".required", this).each(function()
            {
                if($(this).val() === '')
                {
                    $(this).addClass('reqError');
                    required += 1;
                }
                else
                {
                    if($(this).hasClass('reqError'))
                    {
                        $(this).removeClass('reqError');
                        if(required > 0)
                        {
                            required -= 1;
                        }
                    }
                }
            });
            if(required === 0)
            {
                $.ajax({
                    type : "POST",
                    url : 'php/mail.php',
                    data : {
                        con_name : con_name,
                        con_email : con_email,
                        con_msg : con_msg
                    },
                    success : function()
                    {
                        $("#contact_form input, #contact_form textarea").val('');
                        $(".contactSuccess").fadeIn('slow');
                        $("#con_submit").val('Done!');
                        setTimeout(function(){
                            $(".contactSuccess").fadeOut('slow');
                        }, 2500);
                    }
                });
            }
            else
            {
                $("#con_submit").val('Failed!');
            }
        });
        $(".required").on('keyup', function(){
            $(this).removeClass('reqError');
        });
    }
    ;

    //=======================================================
    // Single Blog Fixed Header
    //=======================================================
    $(window).on('scroll', function(){
        if($(window).scrollTop() > 40)
        {
            $(".single-post .header").addClass('fixedHeader');
        }
        else
        {
            $(".single-post .header").removeClass('fixedHeader');
        }
    });

    //=======================================================
    // Single Blog Fixed Header
    //=======================================================
    var owl = $(".articlesSlider");
    if(owl.length > 0)
    {
        owl.owlCarousel({
            items : 2,
            itemsDesktop : [1000, 2],
            itemsDesktopSmall : [900, 2],
            itemsTablet : [600, 2],
            itemsMobile : [480, 1]
        });
        $(".owlControlla.nexta").on('click', function(){
            owl.trigger('owl.next');
        });
        $(".owlControlla.preva").on('click', function(){
            owl.trigger('owl.prev');
        });
    }

    //=======================================================
    // Color Preset
    //=======================================================
    if($(".colorPreset").length > 0)
    {
        var switchs = true;
        $(".switchButton").on('click', function(e){
            e.preventDefault();
            if(switchs)
            {
                $(this).addClass('active');
                $(".colorPreset").animate({'right' : '0px'}, 400);
                switchs = false;
            }else
            {
                $(this).removeClass('active');
                $(".colorPreset").animate({'right' : '-250px'}, 400);
                switchs = true;
            }
        });
        $(".colorSwitch a").on('click', function(e){
            e.preventDefault();
            var color = $(this).attr('href');
            $(".colorSwitch a").removeClass('active');
            $(this).addClass('active');
            $("#colorChem").attr('href', 'css/lay_colors/' + color + '.css');
            $(".scrolltoDown .hoverImg img").attr('src', 'css/lay_colors/icon/' + color + '.png');
        });
    };



})(jQuery);