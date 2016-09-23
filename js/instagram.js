var url = "../js/ins.json";
var style = '/ivince';
var items = new Array();
var W_H = 1;
var img_h = 0;
var img_w = 0;
var view_h;
var view_w;
view_h = $(document.body).height();
view_w = $(document.body).width();
view_w = view_w > 740 ? 740 : view_w;

$('.modal_img').click(function() {
    $('.ins_modal').fadeOut(0);
});

$('.ins_img').click(function() {

    var url_path = '../ins/standard/';

    W_H = $(this).data('w_h');

    cal_img_css();

    $('.modal-box > img').attr('src', url_path + $(this).data('name') + $(this).data('type'));

    var location_text = $(this).data('location');

    $('.location').html(location_text);
    $('.img_title').html($(this).attr('title'));

    $('.ins_modal').fadeIn(1000);

    $("img").unveil();

});

var cal_img_css = function() {
    view_h = $(".ins_modal").height();
    view_w = $(".ins_modal").width();
    p_w = $('.post').width();
    console.log("post_w", p_w);
    if (view_w > p_w) {
        view_w = p_w;
    }

    console.log("view_w", view_w);
    console.log("view_h", view_h);
    console.log("W_H", W_H);

    img_h = view_w / W_H;
    console.log("img_h", img_h);

    if ((img_h + 80) > view_h) {
        $('.modal-box').css('height', view_h + 'px');
        $('.modal_img').css('height', view_h - 80 + 'px');
        $('.modal_img').css('width', 'auto');
        $('.modal-box').css('width', (view_h - 80) * W_H + 'px');
        console.log("大于");
    } else {
        $('.modal-box').css('height', 'auto');
        $('.modal-box').css('width', '100%');
        $('.modal_img').css('width', '100%');
        $('.modal_img').css('height', 'auto');
        console.log("小于");
    }
}

$(window).resize(function() {
    cal_img_css();
});


$(document).ready(function() {
    $("img").unveil();
});
