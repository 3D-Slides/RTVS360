//******************************** CHAT MENU SIDEBAR ******************************//
function quickviewSidebar() {

    function toggleqQuickview(){
        $('#quickview-toggle').on('click', function(e){
            e.preventDefault();
            if($('#quickview-sidebar').hasClass('open')) $('#builder').removeClass('open');
            else $('#quickview-sidebar').addClass('open');
        });
    }

    $('.chat-back').on('click', function(){
        $('.chat-conversation').removeClass('current');
        $('.chat-body').addClass('current');
    });

    $('.chat-list').on('click', 'li', function(){
        var chat_name     = $(this).find('.user-name').html();
        var chat_txt      = $(this).find('.user-txt').html();
        var chat_status   = $(this).find('.user-status').html();
        var chat_img      = $(this).find('img').attr('src');
        $('.chat-conversation .user-name').html(chat_name);
        $('.chat-conversation .user-txt').html(chat_txt);
        $('.chat-conversation .user-status').html(chat_status);
        $('.chat-conversation .user-img img').attr("src",chat_img);
        $('.chat-conversation .conversation-body .conversation-img img').attr("src",chat_img);

        $('.chat-body').removeClass('current');
        $('.chat-conversation').addClass('current');
    });

    /* Open / Close right sidebar */
    $('#quickview-toggle').on('click', function(){
        $('#chat-notification').hide();
        setTimeout(function () {
            $('.mm-panel .badge-danger').each(function () {
                $(this).removeClass('hide').addClass('animated bounceIn');
            });
        }, 1000);
    });

    /* Remove current message when opening */
    $('.have-message').on('click', function () {
        $(this).removeClass('have-message');
        $(this).find('.badge-danger').fadeOut();
    });

    /* Send messages */
    $('.send-message').keypress(function (e) {
        if (e.keyCode == 13) {
            var chat_message = '<li class="img">' +
                '<span>' +
                '<div class="chat-detail chat-right">' +
                '<img src="assets/images/avatars/avatar1.png" data-retina-src="assets/images/avatars/avatar1_2x.png"/>' +
                '<div class="chat-detail">' +
                '<div class="chat-bubble">' +
                $(this).val() +
                '</div>' +
                '</div>' +
                '</div>' +
                '</span>' +
                '</li>';
            $(chat_message).hide().appendTo($(this).parent().parent().parent().find('.conversation-body ul')).fadeIn();
            $(this).val("");
            quickviewHeight();
            customScroll();
        }
    });


    content.addEventListener('click', function(ev) {
        chatSidebar = document.getElementById('quickview-sidebar');
        var target = ev.target;
        if( target !== chatSidebar ) {
            if($('#quickview-sidebar').hasClass('open')){
                $('#quickview-sidebar').addClass('closing');
                $('#quickview-sidebar').removeClass('open');
                setTimeout(function(){
                    $('#quickview-sidebar').removeClass('closing');
                },400);
            }
        }
    });

   if($('.settings-chart .progress-bar').length) {
        $('.settings-tab').on('click', function () {
            setTimeout(function () {
              $('.settings-chart .setting1').progressbar();
              window.myRadar = new Chart(document.getElementById("setting-chart").getContext("2d")).Radar(radarChartData, {
                responsive: true,
                tooltipCornerRadius:0,
                animationSteps: 60,
            });
            }, 200);
            setTimeout(function () {
              $('.settings-chart .setting2').progressbar();
            }, 400);
            

        });
    };

    /* Radar Chart */
    var radarChartData = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [38,48,40,89,96,27,90]
            }
        ]
    };

    toggleqQuickview();
}


function quickviewHeight(){
    $('.chat-conversation').height('');
    chatConversationHeight = $('.chat-conversation').height();
    windowHeight= $(window).height();
    if(chatConversationHeight < windowHeight) {
        $('.chat-conversation').height($(window).height() - 50);
    }
}



/****  Initiation of Main Functions  ****/
$(document).ready(function () {

    quickviewSidebar();
    quickviewHeight();

});


/****  On Resize Functions  ****/
$(window).resize(function () {
    noteTextarea();
    quickviewHeight();

});