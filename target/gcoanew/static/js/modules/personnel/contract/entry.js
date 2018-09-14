var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        STAFF_ID:'',//用户ID
        STAFF_NAME:'',//姓名
        DEPT_NAME:'',//部门名称
        POST_NAME:'',//职位
        CONTACT:'',//联系方式
        CONTRACT_START_DATE:'',//合同开始日期
        CONTRACT_END_DATE:'',//合同结束日期
        CONTRACT_CODE:'',//合同编号
        STATUS:'',//状态  1：  2：  3：
        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        RESOURCEIDS:'',//文件的主键ID
        CONTRACT_ID:'',//主键ID
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

                myjstools.ajax(false, "POST", "/web/service?METHOD=staffContract_save",{
                    STAFF_ID:vm_entry.STAFF_ID,
                    CONTRACT_START_DATE:vm_entry.CONTRACT_START_DATE,
                    CONTRACT_END_DATE:vm_entry.CONTRACT_END_DATE,
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
                vm_entry.RESOURCEIDS = ATTACHMENT;

                myjstools.ajax(false, "POST", "/web/service?METHOD=staffContract_edit",{
                    STAFF_ID:vm_entry.STAFF_ID,
                    CONTRACT_START_DATE:vm_entry.CONTRACT_START_DATE,
                    CONTRACT_END_DATE:vm_entry.CONTRACT_END_DATE,
                    RESOURCEIDS:vm_entry.RESOURCEIDS,
                    CONTRACT_ID:vm_entry.CONTRACT_ID
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=staffContract_findById",{
                CONTRACT_ID:vm_entry.CONTRACT_ID
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
                    if(data.entity.DEPT_NAME != null && data.entity.DEPT_NAME != '' && data.entity.DEPT_NAME != undefined){
                        vm_entry.DEPT_NAME = data.entity.DEPT_NAME;
                    }
                    if(data.entity.POST_NAME != null && data.entity.POST_NAME != '' && data.entity.POST_NAME != undefined){
                        vm_entry.POST_NAME = data.entity.POST_NAME;
                    }
                    if(data.entity.CONTACT != null && data.entity.CONTACT != '' && data.entity.CONTACT != undefined){
                        vm_entry.CONTACT = data.entity.CONTACT;
                    }
                    if(data.entity.CONTRACT_START_DATE != null && data.entity.CONTRACT_START_DATE != '' && data.entity.CONTRACT_START_DATE != undefined){
                        vm_entry.CONTRACT_START_DATE = data.entity.CONTRACT_START_DATE;
                    }
                    if(data.entity.CONTRACT_END_DATE != null && data.entity.CONTRACT_END_DATE != '' && data.entity.CONTRACT_END_DATE != undefined){
                        vm_entry.CONTRACT_END_DATE = data.entity.CONTRACT_END_DATE;
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

    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#start_date' //指定元素
        });
        laydate.render({
            elem: '#end_date' //指定元素
        });
    });

});

