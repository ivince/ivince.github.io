var url = "../js/ins.json";
var style = '/ivince';
var items = new Array();
var img_h = 0;
var img_w = 0;
var view_h;
var view_w;
view_h = $(document.body).height();
view_w = $(document.body).width();
view_w = view_w > 740 ? 740 : view_w;

function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

var InsModal_ = function() {
    $('.ins_modal').remove();
}

var InsModal = function(this_) {
    var modal_template = [
        '<div class="ins_modal" onClick="InsModal_()">',
        '<div class="ins-tab">',
        '<div class="modal-tab">',
        '    <div class="modal-box">',
        '        <div class="img_location">',
        '            <i class="shot-12px"></i>',
        '            <i class="at-10px"></i>',
        '            location_',
        '        </div>',
        '        <div class="line-1px"></div>',
        '        <img src="../img/loading.gif" class="modal_img" data-src="url_">',
        '        <div class="line-1px"></div>',
        '        <div class="img_title">',
        '            <div class="like-12px"></div>',
        '            title_',
        '        </div>',
        '    </div>',
        '</div>',
        '</div>',
        '</div>'
        ].join("");

    var url_path = '../ins/standard/';

    modal_template = modal_template.replace('url_', url_path + $(this_).data('name') + $(this_).data('type'));
    modal_template = modal_template.replace('location_', $(this_).data('location'));
    modal_template = modal_template.replace('title_', $(this_).data('title'));

    var w_h = $(this_).data('w_h');
    view_h = view_h - 68;// 68px is the (location + title + line-1px)

    $(modal_template).appendTo('.container');

    var img_  = $(this_).data('w_h');
    var view_ = view_h / view_w;

    var cssImgH = view_h - 78; // 80px is the (ins_modal's padding + location + title + line-1px)
    var cssBoxH = Math.floor(w_h * cssImgH);

    if (img_ > view_) {
        $('.modal_img').css('height', String(cssImgH) + 'px');
        $('.modal-box').css('width', String(cssBoxH) + 'px');
    } else {
        $('.modal_img').css('width', '100%');
    }

    $("img").unveil();

}

$(window).resize(function() {
    view_h = $(document.body).height();
    view_w = $(document.body).width();
    view_w = view_w > 740 ? 740 : view_w;

    var img_  = img_h / img_w;
    var view_ = view_h / view_w;

    var cssImgH = view_h - 78; // 80px is the (ins_modal's padding + location + title + line-1px)
    var cssBoxH = Math.floor(img_w / (img_h - 68) * cssImgH);

    if (img_ > view_) {
        $('.modal_img').css('height', String(cssImgH) + 'px');
        $('.modal-box').css('width', String(cssBoxH) + 'px');
    } else {
        $('.modal_img').css('width', '100%');
    }
});


var render = function() {
    var ins_template = [
        '<div class="ins_box">',
        '<div style="margin: 5px;">',
        '    <img src="../img/loading.gif" onClick="InsModal(ins_num)" class="ins_img" title="title_" data-src="url_"/>',
        '</div>',
        '</div>'
        ].join("");

    //items = shuffle(items);

    $.each(items, function(index, item) {
        var template = ins_template;
        var url_path = '../ins/thumbnail/';

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

        $(function() {
            $("img").unveil();
        });
    }
});
