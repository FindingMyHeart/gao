var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        CERT_NAME:'',//合同名称
        CERT_CODE:'',//合同编码
        VALID_DATE:'',//有效期
        USE_CASE:'',//使用情况
        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        RESOURCEIDS:'',//资源ID
        CERT_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            if(vm_entry.type == "save"){


                var ATTACHMENT = "";
                $(":input[name = 'resources']").each(function(i){
                    if (i == 0){
                        ATTACHMENT += $(this).val();
                    } else {
                        ATTACHMENT += "," + $(this).val();
                    }
                });
                vm_entry.RESOURCEIDS = ATTACHMENT;


                myjstools.ajax(false, "POST", "/web/service?METHOD=cert_save",{
                    CERT_NAME:vm_entry.CERT_NAME,
                    CERT_CODE:vm_entry.CERT_CODE,
                    VALID_DATE:vm_entry.VALID_DATE,
                    RESOURCEIDS:vm_entry.RESOURCEIDS
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


                var ATTACHMENT = "";
                $(":input[name = 'resources']").each(function(i){
                    if (i == 0){
                        ATTACHMENT += $(this).val();
                    } else {
                        ATTACHMENT += "," + $(this).val();
                    }
                });
                vm_entry.RESOURCEIDS = ATTACHMENT;


                myjstools.ajax(false, "POST", "/web/service?METHOD=cert_edit",{
                    CERT_NAME:vm_entry.CERT_NAME,
                    CERT_CODE:vm_entry.CERT_CODE,
                    VALID_DATE:vm_entry.VALID_DATE,
                    RESOURCEIDS:vm_entry.RESOURCEIDS,
                    CERT_ID:vm_entry.CERT_ID
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=cert_findById",{
                CERT_ID:vm_entry.CERT_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.CERT_NAME != null && data.entity.CERT_NAME != '' && data.entity.CERT_NAME != undefined){
                        vm_entry.CERT_NAME = data.entity.CERT_NAME;
                    }
                    if(data.entity.CERT_CODE != null && data.entity.CERT_CODE != '' && data.entity.CERT_CODE != undefined){
                        vm_entry.CERT_CODE = data.entity.CERT_CODE;
                    }
                    if(data.entity.VALID_DATE != null && data.entity.VALID_DATE != '' && data.entity.VALID_DATE != undefined){
                        vm_entry.VALID_DATE = data.entity.VALID_DATE;
                    }


                    if(data.entity.resourceList != null && data.entity.resourceList != '' && data.entity.resourceList != undefined){
                        var html = "";
                        if(data.entity.resourceList.length > 0){
                            var resourceList = data.entity.resourceList;
                            for(var i = 0 ; i < resourceList.length ; i ++){
                                var down_url = "web/download?RESOURCE_ID=" +  resourceList[i].RESOURCE_ID;
                                html += "<div id='" + resourceList[i].RESOURCE_ID + "'>";
                                html += "<a href='" + down_url  + "' style='color: #333;'>" + resourceList[i].FILENAME + "</a>&nbsp;";
                                html += "<a class='del-a' onclick='javascript:deleteFile(\"" + resourceList[i].RESOURCE_ID + "\")' style='cursor: pointer;'>删除</a>";
                                html += "<input type='hidden' name='resources' value='" + resourceList[i].RESOURCE_ID + "'>";
                                html += "</div>";
                            }
                        }
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
    $('#valid_date').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });

    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }
});

