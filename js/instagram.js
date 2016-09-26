var url = "../js/ins.json";
var style = '/ivince';
var items = new Array();
var W_H = 1;
var img_h = 0;
var img_w = 0;
var view_h;
var view_w;

$('.ins_modal, .close').click(function() {
    $('.ins_modal').fadeOut(0);
    $('.modal-box img').attr('src', '');

    $('body').removeClass('disable-scroll');

});

$('.modal-box').click(function() {
    return false;
});

$('.ins_img').click(function() {

    var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i) ;
    if( !wechatInfo ) {
        $('body').addClass('disable-scroll');
    }

    var url_path = '../ins/standard/';

    W_H = $(this).data('w_h');

    cal_img_css();

    $('.modal-box img').attr('src', url_path + $(this).data('name') + $(this).data('type'));
    //$(".modal_img").unveil();

    var location_text = $(this).data('location');

    $('.location').html(location_text);
    $('.img_title').html($(this).attr('title'));

    $('.ins_modal').fadeIn(1000*0.618);

});

var cal_img_css = function() {
    view_h = $(".ins_modal").height();
    view_w = $(".ins_modal").width();
    p_w = $('.post').width();

    if (view_w > p_w) {
        view_w = p_w;
    }

    img_h = view_w / W_H;

    if ((img_h + 80) > view_h) {
        $('.modal-box').css('height', view_h + 'px');
        $('.modal_img').css('height', view_h - 80 + 'px');
        $('.modal_img').css('width', 'auto');
        $('.modal-box').css('width', (view_h - 80) * W_H + 'px');
    } else {
        $('.modal-box').css('height', 'auto');
        $('.modal-box').css('width', '100%');
        $('.modal_img').css('width', '100%');
        $('.modal_img').css('height', 'auto');
    }
}

$(window).resize(function() {
    cal_img_css();
});


$(document).ready(function() {
    $("img").unveil();
});
