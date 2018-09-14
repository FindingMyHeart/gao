var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        STAFF_ID:'',//用户ID
        STAFF_NAME:'',//姓名
        STAFF_CODE:'',//职员编号
        DEPT_NAME:'',//部门名称
        POST_NAME:'',//职位
        JOIN_DATE:'',//入职时间
        ZHUANZHENG_DATE:'',//转正时间
        CREATE_TIME:'',//创建时间
        PERSONAL_SUMMARY:'',//试用期个人总结

        LEAVE_DATE:'',//预计离职日期
        LEAVE_REASON:'',//离职原因

        JIAOJIE_FINISH_DATE:'',//交接完成日期
        JIAOJIE_TYPE:'',//交接类型
        JIAOJIE_FILE:'',//交接文件


        CONTRACT_START_DATE:'',//合同开始日期
        CONTRACT_END_DATE:'',//合同结束日期
        CONTRACT_CODE:'',//合同编号
        STATUS:'',//状态  1：  2：  3：
        type:'save',//页面类型  save 保存  edit 修改
        transfer_type:'',//变动类型
        transfer_name:'',//变动名称
        in_type:'',//进入类型
        RESOURCEIDS:'',//文件的主键ID
        TRANSFER_ID:'',//主键ID
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


                var data = new Object();
                if(vm_entry.transfer_type == '1'){
                    data.STAFF_ID = vm_entry.STAFF_ID;
                    data.TRANSFER_TYPE = vm_entry.transfer_type;
                    data.ZHUANZHENG_DATE = vm_entry.ZHUANZHENG_DATE;
                    data.PERSONAL_SUMMARY = vm_entry.PERSONAL_SUMMARY;
                }

                if(vm_entry.transfer_type == '2'){
                    data.STAFF_ID = vm_entry.STAFF_ID;
                    data.TRANSFER_TYPE = vm_entry.transfer_type;
                    data.LEAVE_DATE = vm_entry.LEAVE_DATE;
                    data.LEAVE_REASON = vm_entry.LEAVE_REASON;
                }

                if(vm_entry.transfer_type == '3'){
                    data.STAFF_ID = vm_entry.STAFF_ID;
                    data.TRANSFER_TYPE = vm_entry.transfer_type;
                    data.JIAOJIE_FINISH_DATE = vm_entry.JIAOJIE_FINISH_DATE;
                    data.JIAOJIE_TYPE = vm_entry.JIAOJIE_TYPE;
                    data.JIAOJIE_FILE = ATTACHMENT;
                }

                myjstools.ajax(false, "POST", "/web/service?METHOD=staffTransfer_save",data, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'保存成功！',
                            text: '',
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


                var data = new Object();
                if(vm_entry.transfer_type == '1'){
                    data.STAFF_ID = vm_entry.STAFF_ID;
                    data.TRANSFER_TYPE = vm_entry.transfer_type;
                    data.ZHUANZHENG_DATE = vm_entry.ZHUANZHENG_DATE;
                    data.PERSONAL_SUMMARY = vm_entry.PERSONAL_SUMMARY;
                }

                if(vm_entry.transfer_type == '2'){
                    data.STAFF_ID = vm_entry.STAFF_ID;
                    data.TRANSFER_TYPE = vm_entry.transfer_type;
                    data.LEAVE_DATE = vm_entry.LEAVE_DATE;
                    data.LEAVE_REASON = vm_entry.LEAVE_REASON;
                }

                if(vm_entry.transfer_type == '3'){
                    data.STAFF_ID = vm_entry.STAFF_ID;
                    data.TRANSFER_TYPE = vm_entry.transfer_type;
                    data.JIAOJIE_FINISH_DATE = vm_entry.JIAOJIE_FINISH_DATE;
                    data.JIAOJIE_TYPE = vm_entry.JIAOJIE_TYPE;
                    data.JIAOJIE_FILE = ATTACHMENT;
                }

                data.TRANSFER_ID = vm_entry.TRANSFER_ID;

                myjstools.ajax(false, "POST", "/web/service?METHOD=staffTransfer_edit",data, function(data){
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=staffTransfer_findById",{
                TRANSFER_ID:vm_entry.TRANSFER_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.STAFF_ID != null && data.entity.STAFF_ID != '' && data.entity.STAFF_ID != undefined){
                        vm_entry.STAFF_ID = data.entity.STAFF_ID;
                    }
                    if(data.entity.STAFF_NAME != null && data.entity.STAFF_NAME != '' && data.entity.STAFF_NAME != undefined){
                        vm_entry.STAFF_NAME = data.entity.STAFF_NAME;
                    }
                    if(data.entity.STAFF_CODE != null && data.entity.STAFF_CODE != '' && data.entity.STAFF_CODE != undefined){
                        vm_entry.STAFF_CODE = data.entity.STAFF_CODE;
                    }
                    if(data.entity.DEPT_NAME != null && data.entity.DEPT_NAME != '' && data.entity.DEPT_NAME != undefined){
                        vm_entry.DEPT_NAME = data.entity.DEPT_NAME;
                    }
                    if(data.entity.POST_NAME != null && data.entity.POST_NAME != '' && data.entity.POST_NAME != undefined){
                        vm_entry.POST_NAME = data.entity.POST_NAME;
                    }
                    if(data.entity.CONTACT != null && data.entity.CONTACT != '' && data.entity.CONTACT != undefined){
                        vm_entry.CONTACT = data.entity.CONTACT;
                    }
                    if(data.entity.TRANSFER_TYPE != null && data.entity.TRANSFER_TYPE != '' && data.entity.TRANSFER_TYPE != undefined){
                        vm_entry.TRANSFER_TYPE = data.entity.TRANSFER_TYPE;
                    }
                    if(data.entity.APPLY_DATE != null && data.entity.APPLY_DATE != '' && data.entity.APPLY_DATE != undefined){
                        vm_entry.APPLY_DATE = data.entity.APPLY_DATE;
                    }
                    if(data.entity.ZHUANZHENG_DATE != null && data.entity.ZHUANZHENG_DATE != '' && data.entity.ZHUANZHENG_DATE != undefined){
                        vm_entry.ZHUANZHENG_DATE = data.entity.ZHUANZHENG_DATE;
                    }
                    if(data.entity.PERSONAL_SUMMARY != null && data.entity.PERSONAL_SUMMARY != '' && data.entity.PERSONAL_SUMMARY != undefined){
                        vm_entry.PERSONAL_SUMMARY = data.entity.PERSONAL_SUMMARY;
                    }
                    if(data.entity.LEAVE_DATE != null && data.entity.LEAVE_DATE != '' && data.entity.LEAVE_DATE != undefined){
                        vm_entry.LEAVE_DATE = data.entity.LEAVE_DATE;
                    }
                    if(data.entity.LEAVE_REASON != null && data.entity.LEAVE_REASON != '' && data.entity.LEAVE_REASON != undefined){
                        vm_entry.LEAVE_REASON = data.entity.LEAVE_REASON;
                    }
                    if(data.entity.JIAOJIE_FINISH_DATE != null && data.entity.JIAOJIE_FINISH_DATE != '' && data.entity.JIAOJIE_FINISH_DATE != undefined){
                        vm_entry.JIAOJIE_FINISH_DATE = data.entity.JIAOJIE_FINISH_DATE;
                    }
                    if(data.entity.JIAOJIE_TYPE != null && data.entity.JIAOJIE_TYPE != '' && data.entity.JIAOJIE_TYPE != undefined){
                        vm_entry.JIAOJIE_TYPE = data.entity.JIAOJIE_TYPE;
                    }
                    if(data.entity.resourceList != null && data.entity.resourceList != '' && data.entity.resourceList != undefined){
                        var html = "";
                        if(data.entity.resourceList.length > 0){
                            var resourceList = data.entity.resourceList;
                            for(var i = 0 ; i < resourceList.length ; i ++){
                                var down_url = "web/download?RESOURCE_ID=" +  resourceList[i].RESOURCE_ID;
                                html += "<div id='" + resourceList[i].RESOURCE_ID + "'>";
                                html += "<a href='" + down_url  + "' style='color: #333;'>" + resourceList[i].FILENAME + "</a>&nbsp;";
                                if(vm_entry.type != 'view') {
                                    html += "<a class='del-a' onclick='javascript:deleteFile(\"" + resourceList[i].RESOURCE_ID + "\")' style='cursor: pointer;'>删除</a>";
                                }
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
    watch:{
        STAFF_ID:function(new_val,old_val){
            console.log("新的值：" + new_val);
            console.log("旧的值：" + old_val);
            if(new_val == null || new_val == undefined || new_val == ""){
                vm_entry.STAFF_ID = "";
                vm_entry.STAFF_NAME = "";
                vm_entry.DEPT_NAME = "";
                vm_entry.POST_NAME = "";
                vm_entry.CONTACT = "";
            }else{
                var title = $("#STAFF_ID option[value='"+new_val+"']").attr("title");
                if(title != null && title != '' && title != undefined){
                    var arr = title.split("-");
                    vm_entry.STAFF_NAME = arr[0];
                    vm_entry.DEPT_NAME = arr[1];
                    vm_entry.POST_NAME = arr[2];
                    vm_entry.CONTACT = arr[3];
                }
            }


        }
    }
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

function changeStaff(){

}


$(function(){
    $('#LEAVE_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('#JIAOJIE_FINISH_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }


    if(vm_entry.transfer_type == '1'){
        vm_entry.transfer_name = "转正申请";
    } else if(vm_entry.transfer_type == '2'){
        vm_entry.transfer_name = "离职申请";
    } else if(vm_entry.transfer_type == '3'){
        vm_entry.transfer_name = "工作交接";
    }


});

