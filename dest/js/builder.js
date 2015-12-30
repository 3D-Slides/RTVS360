function toggleBuilder(){$(".builder-toggle").on("click",function(){$("#builder").hasClass("open")?$("#builder").removeClass("open"):$("#builder").addClass("open")})}function builderScroll(){$(".builder .inner").mCustomScrollbar("destroy"),scroll_height="100%",$(".builder .inner").mCustomScrollbar({scrollButtons:{enable:!1},autoHideScrollbar:!0,scrollInertia:150,theme:"light",set_height:scroll_height,advanced:{updateOnContentResize:!0}})}function handleLayout(){$(".layout-option input").on("click",function(){var e=$(this).attr("data-layout"),o=$(this).prop("checked");"rtl"==e&&1==o&&toggleRTL(),"rtl"==e&&0==o&&toggleRTL(),"sidebar"==e&&1==o&&handleSidebarFixed(),"sidebar"==e&&0==o&&handleSidebarFluid(),"topbar"==e&&1==o&&handleTopbarFixed(),"topbar"==e&&0==o&&handleTopbarFluid(),"sidebar-hover"==e&&1==o&&createSidebarHover(),"sidebar-hover"==e&&0==o&&removeSidebarHover(),"submenu-hover"==e&&1==o&&createSubmenuHover(),"submenu-hover"==e&&0==o&&removeSubmenuHover(),"sidebar-top"==e&&1==o&&createSidebarTop(),"sidebar-top"==e&&0==o&&removeSidebarTop(),"boxed"==e&&1==o&&createBoxedLayout(),"boxed"==e&&0==o&&removeBoxedLayout()})}function mainColor(){$(".theme-color").on("click",function(e){e.preventDefault();var o=$(this).data("color"),a=$(this).attr("data-main");$("body").removeClass(function(e,o){return(o.match(/(^|\s)color-\S+/g)||[]).join(" ")}),$("body").addClass("color-"+a),$(".theme-color").removeClass("active"),$(this).addClass("active"),"default"==$(this).data("main")&&($(".theme-left").css("background-color","#202226"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#393E44"),$(".theme-sidebar-light, .theme-right-light").css("background-color","#fff"),$(".sltl .theme-left").css("background-color","#fff")),"primary"==$(this).data("main")&&($(".theme-left").css("background-color","#319DB5"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#164954"),$(".theme-sidebar-light, .theme-right-light").css("background-color","#DDE6E9")),"red"==$(this).data("main")&&($(".theme-left").css("background-color","#C9625F"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#4E3232"),$(".theme-sidebar-light, .theme-right-light").css("background-color","#F8F3F1")),"green"==$(this).data("main")&&($(".theme-left").css("background-color","#18A689"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#24392E"),$(".theme-sidebar-light, .theme-right-light").css("background-color","#F1F8F3")),"orange"==$(this).data("main")&&($(".theme-left").css("background-color","#C58627"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#50361F"),$(".theme-sidebar-light, .theme-right-light").css("background-color","#F8F4F1")),"purple"==$(this).data("main")&&($(".theme-left").css("background-color","#6E62B5"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#393F51"),$(".theme-sidebar-light, .theme-right-light").css("background-color","#F3F2F7")),"blue"==$(this).data("main")&&($(".theme-left").css("background-color","#4A89DC"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#1E3948"),$(".theme-sidebar-light, .theme-right-light").css("background-color","#F2F4F7")),$.cookie("main-color",o),$.cookie("main-name",a),$.cookie("main-color",o,{path:"/"}),$.cookie("main-name",a,{path:"/"})})}function handleTheme(){function e(e){null==e?($(".theme-sidebar-defaut").addClass("active"),$.cookie("theme",e),$.cookie("theme",e,{path:"/"})):($(".theme-sidebar-"+e).addClass("active"),$("body").removeClass(function(e,o){return(o.match(/(^|\s)theme-\S+/g)||[]).join(" ")}),$("body").addClass("theme-"+e),$.cookie("theme",e),$.cookie("theme",e,{path:"/"}))}$(".theme").on("click",function(o){o.preventDefault(),$(".theme").removeClass("active"),$(this).addClass("active");var a=$(this).attr("data-theme");e(a)})}function backgroundColor(){$(".bg-color").on("click",function(e){e.preventDefault();var o=$(this).data("color"),a=$(this).attr("data-bg");$("body").removeClass(function(e,o){return(o.match(/(^|\s)bg-\S+/g)||[]).join(" ")}),$("body").addClass("bg-"+a),$(".bg-color").removeClass("active"),$(this).addClass("active"),$.cookie("bg-color",o),$.cookie("bg-name",a),$.cookie("bg-color",o,{path:"/"}),$.cookie("bg-name",a,{path:"/"})})}function handleCookie(){if($.cookie("rtl")&&enableRTL(),$.cookie("fluid-topbar")&&handleTopbarFluid(),$.cookie("fixed-sidebar")&&handleSidebarFixed(),$.cookie("fluid-sidebar")&&handleSidebarFluid(),$.cookie("sidebar-hover")&&createSidebarHover(),$.cookie("submenu-hover")&&createSubmenuHover(),$.cookie("sidebar-top")&&createSidebarTop(),$.cookie("boxed-layout")&&createBoxedLayout(),$.cookie("sidebar-collapsed")&&$.cookie("first-load")&&createCollapsedSidebar(),$.cookie("main-name")){var e=$.cookie("main-name");$("body").removeClass(function(e,o){return(o.match(/(^|\s)color-\S+/g)||[]).join(" ")}),$("body").addClass("color-"+e),$(".theme-color").each(function(){$(this).data("main")==e&&$(this).addClass("active")}),"default"==e&&($(".theme-left").css("background-color","#202226"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#393E44"),$(".theme-sidebar-light, .theme-right-light").css("background-color","#fff"),$(".sltl .theme-left").css("background-color","#fff")),"primary"==e&&($(".theme-left").css("background-color","#319DB5"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#164954")),"red"==e&&($(".theme-left").css("background-color","#C9625F"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#4E3232")),"green"==e&&($(".theme-left").css("background-color","#18A689"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#24392E")),"orange"==e&&($(".theme-left").css("background-color","#C58627"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#50361F")),"purple"==e&&($(".theme-left").css("background-color","#6E62B5"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#393F51")),"blue"==e&&($(".theme-left").css("background-color","#4A89DC"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#1E3948"))}if($.cookie("main-color")||($(".theme-color").each(function(){"#2B2E33"==$(this).data("color")&&$(this).addClass("active")}),$("body").addClass("color-default")),$.cookie("bg-color")){var o=$.cookie("bg-color");$(".bg-color").each(function(){$(this).data("color")==o&&$(this).addClass("active")})}if($.cookie("bg-name")){var o=$.cookie("bg-name");$("body").addClass("bg-"+o)}if($.cookie("bg-color")||$(".bg-color").each(function(){"#E9E9E9"==$(this).data("color")&&$(this).addClass("active")}),$.cookie("theme")){$("body").removeClass(function(e,o){return(o.match(/(^|\s)theme-\S+/g)||[]).join(" ")});var a=$.cookie("theme");$(".builder ."+a).addClass("active"),$("body").addClass("theme-"+a),$(".theme").each(function(){$(this).data("theme")==a&&$(this).addClass("active")})}$.cookie("theme")||$(".theme.sdtl").addClass("active"),$.cookie("main-color")||($("body").addClass("theme-sdtl"),$(".theme-left").css("background-color","#202226"),$(".theme-sidebar-dark, .theme-right-dark").css("background-color","#393E44"))}$(document).ready(function(){"use strict";toggleBuilder(),builderScroll(),handleLayout(),handleTheme(),handleCookie(),mainColor(),backgroundColor(),resetStyle(),$("body").hasClass("sidebar-top")&&destroySideScroll()});