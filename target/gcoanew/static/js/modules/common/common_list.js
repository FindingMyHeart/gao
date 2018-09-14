/**
 * Created by 11029 on 2018/5/5.
 */

var listHtml = "";
listHtml += "<form id='Form' style='display: none;'>";
listHtml += "  <input type='hidden' id='title' name='title'/>";               //标题
listHtml += "  <input type='hidden' id='titleList' name='titleList'/>";      //标题的list
listHtml += "  <input type='hidden' id='data' name='data'/>";                  //数据list
listHtml += "</form>";
$(".body").append(listHtml);

/*
 参数解释：
 title   标题
 url     请求的url
 manipulating      是否是自定义    1 ; 自定义 (暂不支持)
 w       弹出层宽度（缺省调默认值）
 h       弹出层高度（缺省调默认值）
 */
function openBootStrapDialog(title,url,manipulating,w,h){
    if (title == null || title == '') {
        title=false;
    };
    if (url == null || url == '') {
        url="404.html";
    };
    if (w == null || w == '') {
        w=($(window).width()*0.9);
    };
    if (h == null || h == '') {
        h=($(window).height() - 50);
    };
    parent.openLayPage(title,url,w,h);
}



/**
 *
 * @param title   标题
 * @param url   路径
 * @param manipulating 是否是自定义    1 ; 自定义
 * @returns {boolean}
 */
function openBootStrapDialog1(title,url,manipulating) {
    $.ajax({
        type : 'POST',
        url : url,
        cache : false,
        success : function(response) {
            if (manipulating == 1) {
                ajaxDialog = new BootstrapDialog({
                    message : function(dialog) {
                        var $message = $('<div></div>');
                        $message.html(response);

                        return $message;
                    },
                    size: BootstrapDialog.SIZE_WIDE,
                    // 找到自定义页面上x号进行绑定close事件
                    onshown : function(dialogRef) {
                        var $button = dialogRef.getModalContent().find('button[data-widget="remove"]');
                        $button.on('click', {
                            dialogRef : dialogRef
                        }, function(event) {
                            event.data.dialogRef.close();
                            $('.dropdown-toggle').dropdown();
                        });
                    },
                });
                ajaxDialog.realize();
                ajaxDialog.getModalHeader().hide();// header不要
                ajaxDialog.getModalFooter().hide();// footer也不要
                ajaxDialog.getModalBody().css('padding', 0);// 无填充
                ajaxDialog.open();
            }else{
                var ajaxDialog = BootstrapDialog.show({
                    message: function (dialog) {
                        var $message = $('<div></div>');
                        $message.html(response);// 把传回来的页面作为message返回
                        return $message;
                    },
                    title: title,
                    size: BootstrapDialog.SIZE_WIDE,
                    buttons:[{
                        id: 'btn-form-submit',
                        label: '提交',
                        icon: 'fa fa-check-circle',
                        cssClass: 'btn-primary',
                        action: function(dialog){
                            vm_entry.save(dialog);
                        }
                    },{
                        label : '关闭',
                        icon: 'fa fa-close',
                        action : function(dialogItself) {
                            dialogItself.close();
                        }
                    }
                    ]
                });
            }
        }
    });
    event.preventDefault();
    return false;
}

function hzxz(){
    var titleList = [];
    //获取表头
    $(".layui-table thead tr th").each(function(i,k){
        var field = $(this).attr("data-field");
        var name = $(this).find("div").find("span").text();
        var display = $(this).css("display");
        if(field != '0' && name != '操作' && display != 'none'){
            var obj = new Object();
            obj.VALUE = field;
            obj.NAME = name;
            titleList.push(obj);
        }
    });
    var data = [];
    //获取数据
    $(".layui-table tbody tr").each(function(i,k){
        var objj = new Object();
        $(this).find("td").each(function(){
            var field = $(this).attr("data-field");
            var name = $(this).find("div").text();
            var display = $(this).css("display");

            if(field != '0' && display != 'none'){
                objj[field] = name;
            }
        })
        data.push(objj);
    });

    $("#Form").attr("action",myjstools.wwwroot + "/common/exportExcel");

    var titleName = "列表数据";
    $("h2").each(function (i) {
        if(i == 0){
            titleName = $(this).text();
        }
    })

    $("#title").val(titleName);
    $("#titleList").val(JSON.stringify(titleList));
    $("#data").val(JSON.stringify(data));
    $("#Form").submit();
}