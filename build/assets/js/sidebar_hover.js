/****  Variables Initiation  ****/
var doc            = document;
var docEl          = document.documentElement;
var $body          = $('body');
var $sidebar       = $('.sidebar');
var $sidebarFooter = $('.sidebar .sidebar-footer');
var $sidebarWidth  = $(".sidebar").width();

/* ==========================================================*/
/* HOVER SCRIPTS                                             */
/* ========================================================= */

/* Sidebar Hover */
function sidebarHover(){

    if($('.logopanel2').length == 0){
        $('.topnav').prepend('<div class="logopanel2"><h1><a href="dashboard.html"></a></h1></div>');
    }
    
    if($('body').hasClass('rtl')) {
        $sidebar.css('margin-left', '').css('margin-right', '');
        $('.sidebar .sidebar-footer').css('left', '').css('right', '');       
         $('html').on('mouseenter', 'body.rtl.sidebar-hover .sidebar', function(){
            TweenMax.to($sidebar, 0.35, { css: {marginRight: 0,opacity:1},ease: Circ.easeInOut,delay: 0});
            TweenMax.to($('.sidebar .sidebar-footer'), 0.35, {css: {right: 0,opacity:1},ease: Circ.easeInOut,delay: 0 });
        });
        $('html').on('mouseleave', 'body.rtl.sidebar-hover .sidebar', function(){
            if($body.hasClass('sidebar-condensed')) {
                TweenMax.to($sidebar, 0.35, {css: {marginRight: -170,opacity:0}, ease: Circ.easeInOut,delay: 0});
                TweenMax.to($('.sidebar .sidebar-footer'), 0.35, {css: {right: -170,opacity:0},ease: Circ.easeInOut,delay: 0});
            }
            else if($body.hasClass('sidebar-light')) {
                TweenMax.to($sidebar, 0.35, {css: {marginRight: -220,opacity:0}, ease: Circ.easeInOut,delay: 0});
               TweenMax.to($('.sidebar .sidebar-footer'), 0.35, {css: {right: -220,opacity:0},ease: Circ.easeInOut,delay: 0});
            }
            else{
                TweenMax.to($sidebar, 0.35, {css: {marginRight: -220,opacity:0}, ease: Circ.easeInOut,delay: 0});
                TweenMax.to($('.sidebar .sidebar-footer'), 0.35, {css: {right: -220,opacity:0},ease: Circ.easeInOut,delay: 0});
            }  
        });
    }

    if(!$('body').hasClass('rtl'))  {
        $('html').on('mouseenter', 'body:not(.rtl).sidebar-hover .sidebar', function(){
            TweenMax.to($sidebar, 0.35, { css: {marginLeft: 0,opacity:1},ease: Circ.easeInOut,delay: 0});
            TweenMax.to($('.sidebar .sidebar-footer'), 0.35, {css: {left: 0,opacity:1},ease: Circ.easeInOut,delay: 0 });
        });
        $('html').on('mouseleave', 'body:not(.rtl).sidebar-hover .sidebar', function(){
            if($body.hasClass('sidebar-condensed')) {
                TweenMax.to($sidebar, 0.35, {css: {marginLeft: -170,opacity:0}, ease: Circ.easeInOut,delay: 0});
                TweenMax.to($('.sidebar .sidebar-footer'), 0.35, {css: {left: -170,opacity:0},ease: Circ.easeInOut,delay: 0});
            }
            else if($body.hasClass('sidebar-light')) {
                TweenMax.to($sidebar, 0.35, {css: {marginLeft: -220,opacity:0}, ease: Circ.easeInOut,delay: 0});
                TweenMax.to($('.sidebar .sidebar-footer'), 0.35, {css: {left: -220,opacity:0},ease: Circ.easeInOut,delay: 0});
            }
            else{
                TweenMax.to($sidebar, 0.35, {css: {marginLeft: -220,opacity:0}, ease: Circ.easeInOut,delay: 0});
                TweenMax.to($('.sidebar .sidebar-footer'), 0.35, {css: {left: -220,opacity:0},ease: Circ.easeInOut,delay: 0});
            }  
        });
    }

};