/**
 * Created by 11029 on 2018/4/30.
 */

var index = {
    toMenu:function (url) {
        $("#mainFrame").attr("src",url);
    }
};

$(function () {
    var main_content = document.getElementById("main_content");
    var bheight = document.documentElement.clientHeight;

    console.log("高度" + bheight);

    main_content .style.height = bheight + 'px';
});