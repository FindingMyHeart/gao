var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        DOCUMENT_NAME:'',//文档名称
        DOCUMENT_CODE:'',//文档编号
        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        DOCUMENT_FILE:'',//文件的主键ID
        DOCUMENT_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            if($(":input[name = 'resources']").length > 1){
                swal({title:'',text:'只能上传一个文件',type:"error"});
                return false;
            }
            if($(":input[name = 'resources']").length == 1){
                vm_entry.DOCUMENT_FILE = $(":input[name = 'resources']").val();
            }

            // $(":input[name = 'resources']").each(function(i){
            //     if (i == 0){
            //         ATTACHMENT += $(this).val();
            //     } else {
            //         ATTACHMENT += ";" + $(this).val();
            //     }
            // });


            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=document_save",{
                    DOCUMENT_NAME:vm_entry.DOCUMENT_NAME,
                    DOCUMENT_CODE:vm_entry.DOCUMENT_CODE,
                    DOCUMENT_FILE:vm_entry.DOCUMENT_FILE
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'保存成功！',
                            text:'',
                            type:'success'
                        },function () {
                            if(vm_entry.in_type == "menu"){
                                window.location.reload();
                            }else {
                                $("#entry_qx").click();
                            }

                        });
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            } else if(vm_entry.type == "edit"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=document_edit",{
                    DOCUMENT_NAME:vm_entry.DOCUMENT_NAME,
                    DOCUMENT_CODE:vm_entry.DOCUMENT_CODE,
                    DOCUMENT_FILE:vm_entry.DOCUMENT_FILE,
                    DOCUMENT_ID:vm_entry.DOCUMENT_ID
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'',
                            text:'修改成功!',
                            type:'success'
                        },function () {
                            $("#entry_qx").click();
                        });
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            }

        },
        findInfo:function(){
            myjstools.ajax(false, "POST", "/web/service?METHOD=document_findById",{
                DOCUMENT_ID:vm_entry.DOCUMENT_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.DOCUMENT_NAME != null && data.entity.DOCUMENT_NAME != '' && data.entity.DOCUMENT_NAME != undefined){
                        vm_entry.DOCUMENT_NAME = data.entity.DOCUMENT_NAME;
                    }
                    if(data.entity.DOCUMENT_CODE != null && data.entity.DOCUMENT_CODE != '' && data.entity.DOCUMENT_CODE != undefined){
                        vm_entry.DOCUMENT_CODE = data.entity.DOCUMENT_CODE;
                    }
                    if(data.entity.DOCUMENT_FILE != null && data.entity.DOCUMENT_FILE != '' && data.entity.DOCUMENT_FILE != undefined){
                        debugger;
                        var html = "";
                        var down_url = "web/download?RESOURCE_ID=" +  data.entity.DOCUMENT_FILE;
                        html += "<div id='" + data.entity.DOCUMENT_FILE + "'>";
                        html += "<a href='" + down_url  + "' style='color: #333;'>" + data.entity.FILENAME + "</a>&nbsp;";
                        html += "<a class='del-a' onclick='javascript:deleteFile(\"" + data.entity.DOCUMENT_FILE + "\")' style='cursor: pointer;'>删除</a>";
                        html += "<input type='hidden' name='resources' value='" + data.entity.DOCUMENT_FILE + "'>";
                        html += "</div>";
                        $("#fileDiv").html(html);
                    }
                } catch (e) {
                    //alert("login_res.error:出错了！" + e.message);
                }
            });
        }
    },

});

function uploadFileNew() {
    if($("#id-input-file-1").val() == null || $("#id-input-file-1").val() == "" || $("#id-input-file-1").val() == undefined){
        swal({title:"",text:'请选择文件！',type:'error'});
        return false;
    }


    var formData = new FormData();
    formData.append("file", document.getElementById("id-input-file-1").files[0]);
    $.ajax({
        url: myjstools.wwwroot + '/web/uploadImg',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
    }).done(function (res) {

        if(res.success != 1) {
            swal({title:'',text:res.msg,type:"error"});
            return;
        }
        var down_url = "";
        down_url = myjstools.wwwroot + "/web/download?RESOURCE_ID=" +  res.entity.resourceId;
        var html = "";
        html += "<div id='" + res.entity.resourceId + "'>";
        html += "<a href='" + down_url  + "' style='color: #333;'>" + res.entity.resourceName + "</a>&nbsp;";
        html += "<a class='del-a' onclick='javascript:deleteFile(\"" + res.entity.resourceId + "\")' style='cursor: pointer;'>删除</a>";
        html += "<input type='hidden' name='resources' value='" + res.entity.resourceId + "'>";
        html += "</div>";
        $("#fileDiv").append(html);
    }).fail(function (res) {
    });
}

function deleteFile(id) {
    $("#" + id).remove();
}


$(function(){
    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }


});

