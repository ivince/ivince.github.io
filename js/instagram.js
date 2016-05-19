var url = "../js/ins.json";
var style = '/ivince';
var items = new Array();
var img_h = 0;
var img_w = 0;
var view_h;
var view_w;
view_h = $(document.body).height()-86;
view_w = $(document.body).width()-20;

angular.module('InsApp', [
    'angularLazyImg',
    'ngTouch'
])
.config(function($interpolateProvider) {
  //$interpolateProvider.startSymbol('[[');
  //$interpolateProvider.endSymbol('[[');
})
.controller('InsController', function($scope, $http) {
    $scope.isModal = false;
    $scope.currentIndex = 0;
    $scope.slides = [];
    $scope.style = '/ivince';
    $scope.info = {
        "url": '',
        "location": '',
        "title": ''
    }
    $scope.host = 'http://7xsh7y.com1.z0.glb.clouddn.com/';
    $scope.choose = 'http://7xshqi.com2.z0.glb.qiniucdn.com/11848838_732046270231000_1387453921_n_.jpg/ivince';
    $http.get(url).success( function(response) {
        $scope.items = response.items;
    });

    $(window).resize(function(){
        if ($scope.isModal) {
            $scope.view_width   = $(".l-modal").width();
            $scope.view_height  = $(".l-modal").height() - 2 * ($(".img_location").outerHeight()+$(".line-1px").outerHeight());

            var view_ = $scope.view_width / $scope.view_height;
            var img_  = $scope.img_width / $scope.img_height;

            if (img_ > view_) {
                console.log("<");
                $('.modal_box').css('height', 'auto');
                $('#img-s').css('width', '100%');
                $('#img-s').css('height', 'auto');
                $('.modal_box').css('width', '100%');

            } else {
                console.log(">");
                $('#img-s').css('height', $scope.view_height + 'px');
                $('#img-s').css('width', 'auto');
                $('.modal_box').css('width', img_ * $scope.view_height + 'px');
                $('.modal_box').css('height', 'auto');
            }
        }
    });

    $scope.getMo = function(i) {
        $scope.currentIndex  = i;
        $scope.isModal = true;
        $(".l-modal-box").css('display', 'block');
        var url_path = 'http://7xshqi.com2.z0.glb.qiniucdn.com/';
        $scope.info.url = url_path + $scope.items[i].images.standard.url + style;
        $scope.info.location = $scope.items[i].location.name;
        $scope.info.title = $scope.items[i].title;

        $scope.view_width   = $(".l-modal").width();
        $scope.view_height  = $(".l-modal").height() - 2 * ($(".img_location").outerHeight()+$(".line-1px").outerHeight());
        $scope.img_width  = $scope.items[i].images.standard.width;
        $scope.img_height = $scope.items[i].images.standard.height;

        var view_ = $scope.view_width / $scope.view_height;
        var img_  = $scope.img_width / $scope.img_height;

        if (img_ > view_) {
            console.log("<");
            $('.modal_box').css('height', 'auto');
            $('#img-s').css('width', '100%');
            $('#img-s').css('height', 'auto');
            $('.modal_box').css('width', '100%');

        } else {
            console.log(">");
            $('#img-s').css('height', $scope.view_height + 'px');
            $('#img-s').css('width', 'auto');
            $('.modal_box').css('width', img_ * $scope.view_height + 'px');
            $('.modal_box').css('height', 'auto');
        }
    }
    $scope.removeMo = function() {
        $scope.isModal = false;
        $('.modal_box').css('height', 0);
        $('.modal_box').css('width', 0);
        $('#img-s').css('width', '0');
        $('#img-s').css('height', '0');
        $(".l-modal-box").css('display', 'none');
    }

    $scope.getNext = function() {
        console.log("next");
    }

    $scope.getPre = function() {
        console.log("pre");
    }

})

function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}
