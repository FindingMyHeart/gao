var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        APPLY_SN:'',//申请编号
        PROJECT_ID:'',//项目名称
        DEPT_NAME:'',//部门名称
        STAFF_NAME:'',//姓名
        CREATE_DATE:'',//建档日期

        INVOICE_CONTENT:'',//发票内容
        INVOICE_TYPE:'',//发票类型
        TAX_RATE:'',//税率
        AMOUNT_MONEY:'',//金额



        INVOICE_INFO_ID:'',//开票主键ID
        INVOICE_NAME:'',//开票名称
        SOCIAL_CODE:'',//社会统一信用代码证
        OPEN_BANK:'',//开户行
        BANK_ACCOUNT:'',//账号
        TEL:'',//电话
        ADDRESS:'',//地址

        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        RESOURCEIDS:'',//文件的主键ID
        APPLY_ID:'',//主键ID
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
                data.INVOICE_CONTENT = vm_entry.INVOICE_CONTENT;
                data.INVOICE_TYPE = vm_entry.INVOICE_TYPE;
                data.TAX_RATE = vm_entry.TAX_RATE;
                data.AMOUNT_MONEY = vm_entry.AMOUNT_MONEY;
                data.INVOICE_INFO_ID = vm_entry.INVOICE_INFO_ID;
                data.RESOURCEIDS = ATTACHMENT;

                myjstools.ajax(false, "POST", "/web/service?METHOD=invoiceApply_save",data, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'保存成功！',
                            text: '申请单号：<span style="color:red">'+data.entity.APPLY_SN+'</span>。',
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
                data.INVOICE_CONTENT = vm_entry.INVOICE_CONTENT;
                data.INVOICE_TYPE = vm_entry.INVOICE_TYPE;
                data.TAX_RATE = vm_entry.TAX_RATE;
                data.AMOUNT_MONEY = vm_entry.AMOUNT_MONEY;
                data.INVOICE_INFO_ID = vm_entry.INVOICE_INFO_ID;
                data.RESOURCEIDS = ATTACHMENT;

                data.APPLY_ID = vm_entry.APPLY_ID;

                myjstools.ajax(false, "POST", "/web/service?METHOD=invoiceApply_edit",data, function(data){
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=invoiceApply_findById",{
                APPLY_ID:vm_entry.APPLY_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面


                    if(data.entity.APPLY_SN != null && data.entity.APPLY_SN != '' && data.entity.APPLY_SN != undefined){
                        vm_entry.APPLY_SN = data.entity.APPLY_SN;
                    }
                    if(data.entity.PROJECT_ID != null && data.entity.PROJECT_ID != '' && data.entity.PROJECT_ID != undefined){
                        vm_entry.PROJECT_ID = data.entity.PROJECT_ID;
                    }
                    if(data.entity.DEPT_NAME != null && data.entity.DEPT_NAME != '' && data.entity.DEPT_NAME != undefined){
                        vm_entry.DEPT_NAME = data.entity.DEPT_NAME;
                    }
                    if(data.entity.STAFF_NAME != null && data.entity.STAFF_NAME != '' && data.entity.STAFF_NAME != undefined){
                        vm_entry.STAFF_NAME = data.entity.STAFF_NAME;
                    }
                    if(data.entity.CREATE_DATE != null && data.entity.CREATE_DATE != '' && data.entity.CREATE_DATE != undefined){
                        vm_entry.CREATE_DATE = data.entity.CREATE_DATE;
                    }
                    if(data.entity.INVOICE_CONTENT != null && data.entity.INVOICE_CONTENT != '' && data.entity.INVOICE_CONTENT != undefined){
                        vm_entry.INVOICE_CONTENT = data.entity.INVOICE_CONTENT;
                    }
                    if(data.entity.INVOICE_TYPE != null && data.entity.INVOICE_TYPE != '' && data.entity.INVOICE_TYPE != undefined){
                        vm_entry.INVOICE_TYPE = data.entity.INVOICE_TYPE;
                    }
                    if(data.entity.TAX_RATE != null && data.entity.TAX_RATE != '' && data.entity.TAX_RATE != undefined){
                        vm_entry.TAX_RATE = data.entity.TAX_RATE;
                    }
                    if(data.entity.AMOUNT_MONEY != null && data.entity.AMOUNT_MONEY != '' && data.entity.AMOUNT_MONEY != undefined){
                        vm_entry.AMOUNT_MONEY = data.entity.AMOUNT_MONEY;
                    }


                    if(data.entity.INVOICE_INFO_ID != null && data.entity.INVOICE_INFO_ID != '' && data.entity.INVOICE_INFO_ID != undefined){
                        vm_entry.INVOICE_INFO_ID = data.entity.INVOICE_INFO_ID;
                    }
                    if(data.entity.SOCIAL_CODE != null && data.entity.SOCIAL_CODE != '' && data.entity.SOCIAL_CODE != undefined){
                        vm_entry.SOCIAL_CODE = data.entity.SOCIAL_CODE;
                    }
                    if(data.entity.OPEN_BANK != null && data.entity.OPEN_BANK != '' && data.entity.OPEN_BANK != undefined){
                        vm_entry.OPEN_BANK = data.entity.OPEN_BANK;
                    }
                    if(data.entity.BANK_ACCOUNT != null && data.entity.BANK_ACCOUNT != '' && data.entity.BANK_ACCOUNT != undefined){
                        vm_entry.BANK_ACCOUNT = data.entity.BANK_ACCOUNT;
                    }
                    if(data.entity.ADDRESS != null && data.entity.ADDRESS != '' && data.entity.ADDRESS != undefined){
                        vm_entry.ADDRESS = data.entity.ADDRESS;
                    }
                    if(data.entity.TEL != null && data.entity.TEL != '' && data.entity.TEL != undefined){
                        vm_entry.TEL = data.entity.TEL;
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
        INVOICE_INFO_ID:function(new_val,old_val){
            if(new_val == null || new_val == "" || new_val ==undefined){
                vm_entry.SOCIAL_CODE = "";
                vm_entry.OPEN_BANK = "";
                vm_entry.BANK_ACCOUNT = "";
                vm_entry.ADDRESS = "";
                vm_entry.TEL = "";
            }
            getKpxx(new_val);
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

function getKpxx(INVOICE_ID){
    myjstools.ajax(false, "POST", "/web/service?METHOD=invoice_findById",{
        INVOICE_ID:INVOICE_ID
    }, function(data){
        try {
            if (data.success != 1) {
                swal({title:'',text:data.msg,type:'error'});
                return false;
            }
            //加载成功,初始化页面
            if(data.entity.SOCIAL_CODE != null && data.entity.SOCIAL_CODE != '' && data.entity.SOCIAL_CODE != undefined){
                vm_entry.SOCIAL_CODE = data.entity.SOCIAL_CODE;
            }
            if(data.entity.OPEN_BANK != null && data.entity.OPEN_BANK != '' && data.entity.OPEN_BANK != undefined){
                vm_entry.OPEN_BANK = data.entity.OPEN_BANK;
            }
            if(data.entity.BANK_ACCOUNT != null && data.entity.BANK_ACCOUNT != '' && data.entity.BANK_ACCOUNT != undefined){
                vm_entry.BANK_ACCOUNT = data.entity.BANK_ACCOUNT;
            }
            if(data.entity.ADDRESS != null && data.entity.ADDRESS != '' && data.entity.ADDRESS != undefined){
                vm_entry.ADDRESS = data.entity.ADDRESS;
            }
            if(data.entity.TEL != null && data.entity.TEL != '' && data.entity.TEL != undefined){
                vm_entry.TEL = data.entity.TEL;
            }
        } catch (e) {
            //alert("login_res.error:出错了！" + e.message);
        }
    });
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

