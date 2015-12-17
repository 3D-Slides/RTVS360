/* ============================================================
 * Builder Script
 =========================================================== */

/**** BUILDER FUNCTIONS ****/
function toggleBuilder(){
    $('.builder-toggle').on('click', function(){
        if($('#builder').hasClass('open')) $('#builder').removeClass('open');
        else $('#builder').addClass('open');
    });
}

/* Active Custom Scroll for Builder Sidebar */
function builderScroll() {
    $('.builder .inner').mCustomScrollbar("destroy");
    scroll_height = "100%";
    $('.builder .inner').mCustomScrollbar({
        scrollButtons: {
            enable: false
        },
        autoHideScrollbar: true,
        scrollInertia: 150,
        theme: "light",
        set_height: scroll_height,
        advanced: {
            updateOnContentResize: true
        }
    });
}

/* Enable / Disable Layouts */
function handleLayout(){
    $('.layout-option input').on('click', function(){
        var layout = $(this).attr('data-layout');
        var is_checked = $(this).prop('checked');
        if(layout == 'rtl' && is_checked == true) toggleRTL();
        if(layout == 'rtl' && is_checked == false) toggleRTL();
        if(layout == 'sidebar' && is_checked == true) handleSidebarFixed();
        if(layout == 'sidebar' && is_checked == false) handleSidebarFluid();
        if(layout == 'topbar' && is_checked == true) handleTopbarFixed();
        if(layout == 'topbar' && is_checked == false) handleTopbarFluid();
        if(layout == 'sidebar-hover' && is_checked == true) createSidebarHover();
        if(layout == 'sidebar-hover' && is_checked == false) removeSidebarHover();
        if(layout == 'submenu-hover' && is_checked == true) createSubmenuHover();
        if(layout == 'submenu-hover' && is_checked == false) removeSubmenuHover();
        if(layout == 'sidebar-top' && is_checked == true) createSidebarTop();
        if(layout == 'sidebar-top' && is_checked == false) removeSidebarTop();
        if(layout == 'boxed' && is_checked == true) createBoxedLayout();
        if(layout == 'boxed' && is_checked == false) removeBoxedLayout();
    });
}

/* Main Color */
function mainColor(){
    $('.theme-color').on('click', function(e){
        e.preventDefault();
        var main_color = $(this).data('color');
        var main_name = $(this).attr('data-main');
        $('body').removeClass (function (index, css) {
            return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
        });
        $('body').addClass('color-'+main_name);
        $('.theme-color').removeClass('active');
        $(this).addClass('active');
        if ($(this).data('main') == 'default'){
            $('.theme-left').css('background-color', '#202226');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393E44');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#fff');
            $('.sltl .theme-left').css('background-color', '#fff');
        }
        if ($(this).data('main') == 'primary'){
            $('.theme-left').css('background-color', '#319DB5');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#164954');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#DDE6E9');
        }
        if ($(this).data('main') == 'red'){
            $('.theme-left').css('background-color', '#C9625F');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#4E3232');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#F8F3F1');
        }
        if ($(this).data('main') == 'green'){
            $('.theme-left').css('background-color', '#18A689');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#24392E');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#F1F8F3');
        }
        if ($(this).data('main') == 'orange'){
            $('.theme-left').css('background-color', '#C58627');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#50361F');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#F8F4F1');
        }
        if ($(this).data('main') == 'purple'){
            $('.theme-left').css('background-color', '#6E62B5');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393F51');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#F3F2F7');
        }
        if ($(this).data('main') == 'blue'){
            $('.theme-left').css('background-color', '#4A89DC');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#1E3948');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#F2F4F7');
        }
        $.cookie('main-color', main_color);
        $.cookie('main-name', main_name);
        $.cookie('main-color', main_color, { path: '/' });
        $.cookie('main-name', main_name, { path: '/' });
    });
}

/* Switch Theme */
function handleTheme(){
    $('.theme').on('click', function(e) {
        e.preventDefault();
        $('.theme').removeClass('active');
        $(this).addClass('active');
        var theme_name = $(this).attr('data-theme');
        switchTheme(theme_name);
    });

    function switchTheme(name){
        if (name == null){
            $('.theme-sidebar-defaut').addClass('active');
            $.cookie('theme', name);
            $.cookie('theme', name, { path: '/' });
        }
        else{
            $('.theme-sidebar-'+name).addClass('active');
            $('body').removeClass (function (index, css) {
                return (css.match (/(^|\s)theme-\S+/g) || []).join(' ');
            });
            $('body').addClass('theme-'+name);
            $.cookie('theme', name);
            $.cookie('theme', name, { path: '/' });
        }
    }
}

/* Background Color */
function backgroundColor(){
    $('.bg-color').on('click', function(e){
        e.preventDefault();
        var bg_color = $(this).data('color');
        var bg_name = $(this).attr('data-bg');
        $('body').removeClass (function (index, css) {
            return (css.match (/(^|\s)bg-\S+/g) || []).join(' ');
        });
        $('body').addClass('bg-'+bg_name);
        $('.bg-color').removeClass('active');
        $(this).addClass('active');
        $.cookie('bg-color', bg_color);
        $.cookie('bg-name', bg_name);
        $.cookie('bg-color', bg_color, { path: '/' });
        $.cookie('bg-name', bg_name, { path: '/' });
    });
}

/* Manage Cookie */
function handleCookie(){
    if($.cookie('rtl')) enableRTL();
    if($.cookie('fluid-topbar')) handleTopbarFluid();
    if($.cookie('fixed-sidebar')) handleSidebarFixed();
    if($.cookie('fluid-sidebar')) handleSidebarFluid();
    if($.cookie('sidebar-hover')) createSidebarHover(); 
    if($.cookie('submenu-hover')) createSubmenuHover();  
    if($.cookie('sidebar-top')) createSidebarTop();
    if($.cookie('boxed-layout')) createBoxedLayout();
    if($.cookie('sidebar-collapsed') && $.cookie('first-load')) createCollapsedSidebar();
    if($.cookie('main-name')) {
        var main_name = $.cookie('main-name');
        $('body').removeClass (function (index, css) {
            return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
        });
        $('body').addClass('color-'+main_name);
        $('.theme-color').each(function(){
            if($(this).data('main') == main_name) $(this).addClass('active');
        });
        if (main_name == 'default'){
            $('.theme-left').css('background-color', '#202226');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393E44');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#fff');
            $('.sltl .theme-left').css('background-color', '#fff');
        }
        if (main_name == 'primary'){
            $('.theme-left').css('background-color', '#319DB5');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#164954');
        }
        if (main_name == 'red'){
            $('.theme-left').css('background-color', '#C9625F');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#4E3232');
        }
        if (main_name == 'green'){
            $('.theme-left').css('background-color', '#18A689');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#24392E');
        }
        if (main_name == 'orange'){
            $('.theme-left').css('background-color', '#C58627');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#50361F');
        }
        if (main_name == 'purple'){
            $('.theme-left').css('background-color', '#6E62B5');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393F51');
        }
        if (main_name == 'blue'){
            $('.theme-left').css('background-color', '#4A89DC');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#1E3948');
        }
   }

   if(!$.cookie('main-color')) {
        $('.theme-color').each(function(){
            if($(this).data('color') == '#2B2E33') $(this).addClass('active');
        });
        $('body').addClass('color-default');
    }
    // Background Color
    if($.cookie('bg-color')) {
        var bg_color = $.cookie('bg-color');
        $('.bg-color').each(function(){
            if($(this).data('color') == bg_color) $(this).addClass('active');
        });
    }
    if($.cookie('bg-name')) {
        var bg_color = $.cookie('bg-name');
        $('body').addClass('bg-'+bg_color);
    }
    if(!$.cookie('bg-color')) {
        $('.bg-color').each(function(){
            if($(this).data('color') == '#E9E9E9') $(this).addClass('active');
        });
    }
    // Sidebar Color
    if($.cookie('theme')) {
        $('body').removeClass (function (index, css) {
            return (css.match (/(^|\s)theme-\S+/g) || []).join(' ');
        });
        var theme = $.cookie('theme');
        $('.builder .'+theme).addClass('active');
        $('body').addClass('theme-'+theme);
     
        $('.theme').each(function(){
            if($(this).data('theme') == theme) $(this).addClass('active');
        });
    }
    if(!$.cookie('theme')) {
        $('.theme.sdtl').addClass('active'); 
    }
    if(!$.cookie('main-color')) {
        $('body').addClass('theme-sdtl');
        $('.theme-left').css('background-color', '#202226');
        $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393E44');
    }
}

$(document).ready(function() {
   "use strict";

    // $.removeCookie('main-color');
    // $.removeCookie('topbar-color');
    // $.removeCookie('topbar-color-custom');
    // $.removeCookie('sidebar-color');
    // $.removeCookie('sidebar-color-custom');
    // $.removeCookie('sidebar-hover');
    // $.removeCookie('submenu-hover');

    toggleBuilder();
    builderScroll();
    handleLayout();
    handleTheme();
    handleCookie();
    mainColor();
    backgroundColor();
    resetStyle();

    if($('body').hasClass('sidebar-top')){
      destroySideScroll();
    }

});

