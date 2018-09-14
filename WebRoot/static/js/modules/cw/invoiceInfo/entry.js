var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        INVOICE_SN:'',//订单编号
        STAFF_NAME:'',//姓名
        DEPT_NAME:'',//部门名称
        CREATE_DATE:'',//建档日期

        PROJECT_ID:'',//项目名称
        DEPT_ID:'',//部门

        SUPPLIER_ID:'',//供应商
        INVOICE_DATE:'',//开票日期
        AMOUNT_MONEY:'',//金额

        PROJECT_LOCATION:'',//项目地
        MEMO:'',//备注

        type:'save',//页面类型  save 保存  edit 修改
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
                data.PROJECT_ID = vm_entry.PROJECT_ID;
                data.SUPPLIER_ID = vm_entry.SUPPLIER_ID;
                data.DEPT_ID = vm_entry.DEPT_ID;
                data.INVOICE_DATE = vm_entry.INVOICE_DATE;
                data.AMOUNT_MONEY = vm_entry.AMOUNT_MONEY;
                data.PROJECT_LOCATION = vm_entry.PROJECT_LOCATION;
                data.MEMO = vm_entry.MEMO;
                data.RESOURCEIDS = ATTACHMENT;

                myjstools.ajax(false, "POST", "/web/service?METHOD=invoiceInfo_save",data, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'保存成功！',
                            text: '订单号：<span style="color:red">'+data.entity.INVOICE_SN+'</span>。',
                            html: true
                        },function () {
                            if(vm_entry.in_type == "menu"){
                                window.location.reload();
                            }else {
                                $("#entry_qx").click();
                                vm.initTable();
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
                data.PROJECT_ID = vm_entry.PROJECT_ID;
                data.SUPPLIER_ID = vm_entry.SUPPLIER_ID;
                data.DEPT_ID = vm_entry.DEPT_ID;
                data.INVOICE_DATE = vm_entry.INVOICE_DATE;
                data.AMOUNT_MONEY = vm_entry.AMOUNT_MONEY;
                data.PROJECT_LOCATION = vm_entry.PROJECT_LOCATION;
                data.MEMO = vm_entry.MEMO;
                data.RESOURCEIDS = ATTACHMENT;

                data.INVOICE_ID = vm_entry.INVOICE_ID;

                myjstools.ajax(false, "POST", "/web/service?METHOD=invoiceInfo_edit",data, function(data){
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
                            vm.initTable();
                        });
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            }

        },
        findInfo:function(){
            myjstools.ajax(false, "POST", "/web/service?METHOD=invoiceInfo_findById",{
                INVOICE_ID:vm_entry.INVOICE_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面


                    if(data.entity.INVOICE_SN != null && data.entity.INVOICE_SN != '' && data.entity.INVOICE_SN != undefined){
                        vm_entry.INVOICE_SN = data.entity.INVOICE_SN;
                    }
                    if(data.entity.STAFF_NAME != null && data.entity.STAFF_NAME != '' && data.entity.STAFF_NAME != undefined){
                        vm_entry.STAFF_NAME = data.entity.STAFF_NAME;
                    }
                    if(data.entity.CREATE_DATE != null && data.entity.CREATE_DATE != '' && data.entity.CREATE_DATE != undefined){
                        vm_entry.CREATE_DATE = data.entity.CREATE_DATE;
                    }
                    if(data.entity.PROJECT_ID != null && data.entity.PROJECT_ID != '' && data.entity.PROJECT_ID != undefined){
                        vm_entry.PROJECT_ID = data.entity.PROJECT_ID;
                    }
                    if(data.entity.SUPPLIER_ID != null && data.entity.SUPPLIER_ID != '' && data.entity.SUPPLIER_ID != undefined){
                        vm_entry.SUPPLIER_ID = data.entity.SUPPLIER_ID;
                    }
                    if(data.entity.DEPT_ID != null && data.entity.DEPT_ID != '' && data.entity.DEPT_ID != undefined){
                        vm_entry.DEPT_ID = data.entity.DEPT_ID;
                    }
                    if(data.entity.INVOICE_DATE != null && data.entity.INVOICE_DATE != '' && data.entity.INVOICE_DATE != undefined){
                        vm_entry.INVOICE_DATE = data.entity.INVOICE_DATE;
                    }
                    if(data.entity.AMOUNT_MONEY != null && data.entity.AMOUNT_MONEY != '' && data.entity.AMOUNT_MONEY != undefined){
                        vm_entry.AMOUNT_MONEY = data.entity.AMOUNT_MONEY;
                    }
                    if(data.entity.PROJECT_LOCATION != null && data.entity.PROJECT_LOCATION != '' && data.entity.PROJECT_LOCATION != undefined){
                        vm_entry.PROJECT_LOCATION = data.entity.PROJECT_LOCATION;
                    }
                    if(data.entity.MEMO != null && data.entity.MEMO != '' && data.entity.MEMO != undefined){
                        vm_entry.MEMO = data.entity.MEMO;
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
    $('#INVOICE_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });

    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }
});

