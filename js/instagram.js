var url = "../js/ins.json";
var items = new Array();
var img_h = 0;
var img_w = 0;
var view_h = $(document.body).height();
var view_w = $(document.body).width();
    view_w = view_w > 540 ? 540 : view_w;

var InsModal_ = function() {
    $('.ins_modal').remove();
}

var InsModal = function(ins_num) {
    console.log('你点击了' + ins_num);

    var modal_template = [
        '<div class="ins_modal" onClick="InsModal_()">',
        '    <div class="modal-box">',
        '        <div>location_</div>',
        '        <img class="modal_img" src="url_">',
        '        <div>text</div>',
        '    </div>',
        '</div>'
        ].join("");

    var url_path = '../ins/';
    modal_template = modal_template.replace('url_', url_path + items[ins_num].images.standard.url);
    modal_template = modal_template.replace('location_', items[ins_num].location.name);
    modal_template = modal_template.replace('title_', items[ins_num].title);

    img_h = items[ins_num].images.standard.height + 56;
    img_w = items[ins_num].images.standard.width;

    console.log(img_h + " " + img_w);
    console.log(view_h + " " + view_w);

    $(modal_template).appendTo('.container');

    if (img_h / (img_w + 0.1) > view_h / (view_w + 0.1)) {
        $('.modal_img').css('height', '100%');
        $('.modal_img').css('width', 'auto');
        console.log("图更高");
    } else {
        $('.modal_img').css('width', '100%');
        $('.modal_img').css('height', 'auto');
        $('.modal-box').css('margin-top', String((view_h - (img_h * view_w) / img_w) / 2) + 'px');
        console.log("窗口更高");
    }
}

$(window).resize(function() {
    view_h = $(document.body).height();
    view_w = $(document.body).width();
    view_w = view_w > 540 ? 540 : view_w;

    if (img_h / (img_w + 0.1) > view_h / (view_w + 0.1)) {
        $('.modal_img').css('height', '100%');
        $('.modal_img').css('width', 'auto');
        console.log("图更高");
    } else {
        $('.modal_img').css('width', '100%');
        $('.modal_img').css('height', 'auto');
        $('.modal-box').css('margin-top', String((view_h - (img_h * view_w) / img_w - 2 - 10 - 27 * 2) / 2) + 'px');
        console.log("窗口更高");
    }
});

var render = function() {
    var ins_template = [
        '<div class="ins_box">',
        '<div style="padding: 5px">',
        '    <img onClick="InsModal(ins_num)" class="ins_img" title="title_" src="url_"/>',
        '</div>',
        '</div>'
        ].join("");

    for (var i=0; i<50; i++) {
        $.each(items, function(index, item) {
            var template = ins_template;
            var url_path = '../ins/';

            template = template.replace('url_', url_path + item.images.thumnail.url);
            template = template.replace('ins_num', index);
            template = template.replace('title_', item.title);

            $(template).appendTo('.ins_container');

            console.log(item);
        })
    }
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
