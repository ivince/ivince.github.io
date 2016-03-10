var url = "../js/ins.json";
var items = new Array();
var img_h = 0;
var img_w = 0;
var view_h;
var view_w;
view_h = $(document.body).height();
view_w = $(document.body).width();
view_w = view_w > 740 ? 740 : view_w;

var InsModal_ = function() {
    $('.ins_modal').remove();
    $('body').css('overflow', 'auto');
}

var InsModal = function(ins_num) {
    $('body').css('overflow', 'hidden');
    var modal_template = [
        '<div class="ins_modal" onClick="InsModal_()">',
        '    <div class="modal-box">',
        '        <div class="img_location">',
        '            <i class="fa fa-camera"></i>',
        '            <i class="fa fa-at at-location"></i>',
        '            location_',
        '        </div>',
        '        <div class="line-1px"></div>',
        '        <img class="modal_img" src="url_">',
        '        <div class="line-1px"></div>',
        '        <div class="img_title">',
        '            <i class="fa fa-heart heart"></i>',
        '            title_',
        '        </div>',
        '    </div>',
        '</div>'
        ].join("");

    var url_path = '../ins/';
    modal_template = modal_template.replace('url_', url_path + items[ins_num].images.standard.url);
    modal_template = modal_template.replace('location_', items[ins_num].location.name);
    modal_template = modal_template.replace('title_', items[ins_num].title);

    img_h = items[ins_num].images.standard.height + 70;// 70px is the (location + title + line-1px)
    img_w = items[ins_num].images.standard.width;

    $(modal_template).appendTo('.container');

    var img_  = img_h / img_w;
    var view_ = view_h / view_w;

    var cssImgH = view_h - 80; // 80px is the (ins_modal's padding + location + title + line-1px)
    var cssBoxH = Math.floor(img_w / (img_h - 70) * cssImgH);

    if (img_ > view_) {
        $('.modal_img').css('height', String(cssImgH) + 'px');
        $('.modal-box').css('width', String(cssBoxH) + 'px');
    } else {
        $('.modal_img').css('width', '100%');
    }

}

$(window).resize(function() {
});


var render = function() {
    var ins_template = [
        '<div class="ins_box">',
        '<div style="padding: 0px; padding-left: lpadding_; padding-right: rpadding_">',
        '    <img onClick="InsModal(ins_num)" class="ins_img" title="title_" src="url_"/>',
        '</div>',
        '</div>'
        ].join("");

    var _items = items.slice();
    for (var i=0; i<10; i++) {
        $.each(_items, function(index, item) {
            items.push(item);
        })
    }

    $.each(items, function(index, item) {
        var template = ins_template;
        var url_path = '../ins/';

        template = template.replace('url_', url_path + item.images.thumnail.url);
        template = template.replace('ins_num', index);
        template = template.replace('title_', item.title);

        if (index % 3 == 0) {
            template = template.replace('lpadding_', '0px');
            template = template.replace('rpadding_', '0px');
        } else if ((index + 1) % 3 == 0) {
            template = template.replace('rpadding_', '0px');
            template = template.replace('lpadding_', '0px');
        } else{
            template = template.replace('rpadding_', '0px');
            template = template.replace('lpadding_', '0px');
        }

        $(template).appendTo('.ins_container');

    })
}

$.ajax({
    url: url,
    type:"GET",
    dataType:"json",
    success:function(response){
        items = response.items;
        render();
    }
});
