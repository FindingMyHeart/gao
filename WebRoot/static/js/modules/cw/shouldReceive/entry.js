var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        FEE_SN:'',//申请编号
        FEE_TYPE:'1',//申请类型

        DEPT_NAME:'',//部门名称
        CREATE_USERNAME:'',//姓名
        POST_NAME:'',//职位
        CREATE_DATE:'',//建档日期

        ADD_PAYMENT_MODE:'',//添加信息----付款方式
        ADD_ACCOUNT_ID:'',//添加信息----结算账号id
        ADD_ACCOUNT_MONEY:'',//添加信息----结算金额

        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        RESOURCEIDS:'',//文件的主键ID
        PROJECT_ID:'',//主键ID
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
                var FEE_TYPE = vm_entry.FEE_TYPE;
                data.FEE_TYPE = FEE_TYPE;
                data.PURPOSE = vm_entry.PURPOSE;//用途
                data.AMOUNT_MONEY = vm_entry.AMOUNT_MONEY;//金额
                data.KAIHU_BANK = vm_entry.KAIHU_BANK;//开户行
                data.ACCOUNT_NAME = vm_entry.ACCOUNT_NAME;//账户名称
                data.BANK_ACCOUNT = vm_entry.BANK_ACCOUNT;//账号
                data.PAYMENT_MODE = vm_entry.PAYMENT_MODE;//付款方式


                if(FEE_TYPE == "1"){//通用型
                    //没有特例的东西
                }else if(FEE_TYPE == "2"){ //施工费
                    data.PROJECT_ID = vm_entry.PROJECT_ID;//项目ID
                    data.SHIGONGDUI = vm_entry.SHIGONGDUI;//施工队
                }else if(FEE_TYPE == "3"){ //采购付款
                    data.PROJECT_ID = vm_entry.PROJECT_ID;//项目ID
                    data.BUY_SUPPLIER_ID = vm_entry.BUY_SUPPLIER_ID;//供应商
                    data.BUY_CONTRACT_NO = vm_entry.BUY_CONTRACT_NO;//采购合同编号
                    data.BUY_FEE_TYPE = vm_entry.BUY_FEE_TYPE;//采购付款类型
                    data.BUY_INVOICE_TYPE = vm_entry.BUY_INVOICE_TYPE;//采购票据类型
                }else if(FEE_TYPE == "4"){ //借款
                    data.BORROW_REAL_MONEY = vm_entry.BORROW_REAL_MONEY;//实际金额
                    data.BORROW_BACK_MONEY = vm_entry.BORROW_BACK_MONEY;//退回金额
                    data.BORROW_BU_MONEY = vm_entry.BORROW_BU_MONEY;//补领金额
                }else if(FEE_TYPE == "5"){ //报销
                    data.BAOXIAO_TYPE = vm_entry.BAOXIAO_TYPE;//报销类型
                    data.BAOXIAO_INVOICE_NUM = vm_entry.BAOXIAO_INVOICE_NUM;//报销张数
                }else if(FEE_TYPE == "6"){ //差旅
                    data.CHAILV_LOCATION = vm_entry.CHAILV_LOCATION;//出差地点
                    data.CHAILV_START_LOCATION = vm_entry.CHAILV_START_LOCATION;//出发地点
                    data.CHAILV_START_DATE = vm_entry.CHAILV_START_DATE;//出发时间
                    data.CHAILV_END_LOCATION = vm_entry.CHAILV_END_LOCATION;//到达地点
                    data.CHAILV_END_DATE = vm_entry.CHAILV_END_DATE;//到达时间
                    data.CHAILV_PERSON_NUM = vm_entry.CHAILV_PERSON_NUM;//人数
                    data.CHAILV_DAY_NUM = vm_entry.CHAILV_DAY_NUM;//天数
                }

                data.RESOURCEIDS = ATTACHMENT;

                myjstools.ajax(false, "POST", "/web/service?METHOD=feeApply_save",data, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'保存成功！',
                            text: '申请单号：<span style="color:red">'+data.entity.FEE_SN+'</span>。',
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
                var FEE_TYPE = vm_entry.FEE_TYPE;
                data.FEE_TYPE = FEE_TYPE;
                data.PURPOSE = vm_entry.PURPOSE;//用途
                data.AMOUNT_MONEY = vm_entry.AMOUNT_MONEY;//金额
                data.KAIHU_BANK = vm_entry.KAIHU_BANK;//开户行
                data.ACCOUNT_NAME = vm_entry.ACCOUNT_NAME;//账户名称
                data.BANK_ACCOUNT = vm_entry.BANK_ACCOUNT;//账号
                data.PAYMENT_MODE = vm_entry.PAYMENT_MODE;//付款方式

                if(FEE_TYPE == "1"){//通用型
                    //没有特例的东西
                }else if(FEE_TYPE == "2"){ //施工费
                    data.PROJECT_ID = vm_entry.PROJECT_ID;//项目ID
                    data.SHIGONGDUI = vm_entry.SHIGONGDUI;//施工队
                }else if(FEE_TYPE == "3"){ //采购付款
                    data.PROJECT_ID = vm_entry.PROJECT_ID;//项目ID
                    data.BUY_SUPPLIER_ID = vm_entry.BUY_SUPPLIER_ID;//供应商
                    data.BUY_CONTRACT_NO = vm_entry.BUY_CONTRACT_NO;//采购合同编号
                    data.BUY_FEE_TYPE = vm_entry.BUY_FEE_TYPE;//采购付款类型
                    data.BUY_INVOICE_TYPE = vm_entry.BUY_INVOICE_TYPE;//采购票据类型
                }else if(FEE_TYPE == "4"){ //借款
                    data.BORROW_REAL_MONEY = vm_entry.BORROW_REAL_MONEY;//实际金额
                    data.BORROW_BACK_MONEY = vm_entry.BORROW_BACK_MONEY;//退回金额
                    data.BORROW_BU_MONEY = vm_entry.BORROW_BU_MONEY;//补领金额
                }else if(FEE_TYPE == "5"){ //报销
                    data.BAOXIAO_TYPE = vm_entry.BAOXIAO_TYPE;//报销类型
                    data.BAOXIAO_INVOICE_NUM = vm_entry.BAOXIAO_INVOICE_NUM;//报销张数
                }else if(FEE_TYPE == "6"){ //差旅
                    data.CHAILV_LOCATION = vm_entry.CHAILV_LOCATION;//出差地点
                    data.CHAILV_START_LOCATION = vm_entry.CHAILV_START_LOCATION;//出发地点
                    data.CHAILV_START_DATE = vm_entry.CHAILV_START_DATE;//出发时间
                    data.CHAILV_END_LOCATION = vm_entry.CHAILV_END_LOCATION;//到达地点
                    data.CHAILV_END_DATE = vm_entry.CHAILV_END_DATE;//到达时间
                    data.CHAILV_PERSON_NUM = vm_entry.CHAILV_PERSON_NUM;//人数
                    data.CHAILV_DAY_NUM = vm_entry.CHAILV_DAY_NUM;//天数
                }

                data.RESOURCEIDS = ATTACHMENT;
                data.FEE_ID = vm_entry.FEE_ID;

                myjstools.ajax(false, "POST", "/web/service?METHOD=feeApply_edit",data, function(data){
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
            }else if(vm_entry.type == 'addInfo'){

                var data = new Object();
                data.ADD_PAYMENT_MODE = vm_entry.ADD_PAYMENT_MODE;
                data.ADD_ACCOUNT_ID = vm_entry.ADD_ACCOUNT_ID;
                data.FEE_ID = vm_entry.FEE_ID;

                myjstools.ajax(false, "POST", "/web/service?METHOD=feeApply_addInfo",data, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'',
                            text:'添加信息成功!',
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=feeApply_findById",{
                FEE_ID:vm_entry.FEE_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.FEE_SN != null && data.entity.FEE_SN != '' && data.entity.FEE_SN != undefined){
                        vm_entry.FEE_SN = data.entity.FEE_SN;
                    }
                    if(data.entity.DEPT_NAME != null && data.entity.DEPT_NAME != '' && data.entity.DEPT_NAME != undefined){
                        vm_entry.DEPT_NAME = data.entity.DEPT_NAME;
                    }
                    if(data.entity.CREATE_USERNAME != null && data.entity.CREATE_USERNAME != '' && data.entity.CREATE_USERNAME != undefined){
                        vm_entry.CREATE_USERNAME = data.entity.CREATE_USERNAME;
                    }
                    if(data.entity.POST_NAME != null && data.entity.POST_NAME != '' && data.entity.POST_NAME != undefined){
                        vm_entry.POST_NAME = data.entity.POST_NAME;
                    }
                    if(data.entity.CREATE_DATE != null && data.entity.CREATE_DATE != '' && data.entity.CREATE_DATE != undefined){
                        vm_entry.CREATE_DATE = data.entity.CREATE_DATE;
                    }

                    if(data.entity.FEE_TYPE != null && data.entity.FEE_TYPE != '' && data.entity.FEE_TYPE != undefined){
                        vm_entry.FEE_TYPE = data.entity.FEE_TYPE;
                    }
                    if(data.entity.PURPOSE != null && data.entity.PURPOSE != '' && data.entity.PURPOSE != undefined){
                        vm_entry.PURPOSE = data.entity.PURPOSE;
                    }
                    if(data.entity.AMOUNT_MONEY != null && data.entity.AMOUNT_MONEY != '' && data.entity.AMOUNT_MONEY != undefined){
                        vm_entry.AMOUNT_MONEY = data.entity.AMOUNT_MONEY;
                    }
                    if(data.entity.KAIHU_BANK != null && data.entity.KAIHU_BANK != '' && data.entity.KAIHU_BANK != undefined){
                        vm_entry.KAIHU_BANK = data.entity.KAIHU_BANK;
                    }
                    if(data.entity.ACCOUNT_NAME != null && data.entity.ACCOUNT_NAME != '' && data.entity.ACCOUNT_NAME != undefined){
                        vm_entry.ACCOUNT_NAME = data.entity.ACCOUNT_NAME;
                    }
                    if(data.entity.BANK_ACCOUNT != null && data.entity.BANK_ACCOUNT != '' && data.entity.BANK_ACCOUNT != undefined){
                        vm_entry.BANK_ACCOUNT = data.entity.BANK_ACCOUNT;
                    }
                    if(data.entity.PAYMENT_MODE != null && data.entity.PAYMENT_MODE != '' && data.entity.PAYMENT_MODE != undefined){
                        vm_entry.PAYMENT_MODE = data.entity.PAYMENT_MODE;
                    }

                    if(data.entity.PROJECT_ID != null && data.entity.PROJECT_ID != '' && data.entity.PROJECT_ID != undefined){
                        vm_entry.PROJECT_ID = data.entity.PROJECT_ID;
                    }
                    if(data.entity.SHIGONGDUI != null && data.entity.SHIGONGDUI != '' && data.entity.SHIGONGDUI != undefined){
                        vm_entry.SHIGONGDUI = data.entity.SHIGONGDUI;
                    }


                    if(data.entity.BUY_SUPPLIER_ID != null && data.entity.BUY_SUPPLIER_ID != '' && data.entity.BUY_SUPPLIER_ID != undefined){
                        vm_entry.BUY_SUPPLIER_ID = data.entity.BUY_SUPPLIER_ID;
                    }
                    if(data.entity.BUY_CONTRACT_NO != null && data.entity.BUY_CONTRACT_NO != '' && data.entity.BUY_CONTRACT_NO != undefined){
                        vm_entry.BUY_CONTRACT_NO = data.entity.BUY_CONTRACT_NO;
                    }
                    if(data.entity.BUY_FEE_TYPE != null && data.entity.BUY_FEE_TYPE != '' && data.entity.BUY_FEE_TYPE != undefined){
                        vm_entry.BUY_FEE_TYPE = data.entity.BUY_FEE_TYPE;
                    }
                    if(data.entity.BUY_INVOICE_TYPE != null && data.entity.BUY_INVOICE_TYPE != '' && data.entity.BUY_INVOICE_TYPE != undefined){
                        vm_entry.BUY_INVOICE_TYPE = data.entity.BUY_INVOICE_TYPE;
                    }

                    if(data.entity.BORROW_REAL_MONEY != null && data.entity.BORROW_REAL_MONEY != '' && data.entity.BORROW_REAL_MONEY != undefined){
                        vm_entry.BORROW_REAL_MONEY = data.entity.BORROW_REAL_MONEY;
                    }
                    if(data.entity.BORROW_BACK_MONEY != null && data.entity.BORROW_BACK_MONEY != '' && data.entity.BORROW_BACK_MONEY != undefined){
                        vm_entry.BORROW_BACK_MONEY = data.entity.BORROW_BACK_MONEY;
                    }
                    if(data.entity.BORROW_BU_MONEY != null && data.entity.BORROW_BU_MONEY != '' && data.entity.BORROW_BU_MONEY != undefined){
                        vm_entry.BORROW_BU_MONEY = data.entity.BORROW_BU_MONEY;
                    }

                    if(data.entity.BAOXIAO_TYPE != null && data.entity.BAOXIAO_TYPE != '' && data.entity.BAOXIAO_TYPE != undefined){
                        vm_entry.BAOXIAO_TYPE = data.entity.BAOXIAO_TYPE;
                    }
                    if(data.entity.BAOXIAO_INVOICE_NUM != null && data.entity.BAOXIAO_INVOICE_NUM != '' && data.entity.BAOXIAO_INVOICE_NUM != undefined){
                        vm_entry.BAOXIAO_INVOICE_NUM = data.entity.BAOXIAO_INVOICE_NUM;
                    }

                    if(data.entity.CHAILV_LOCATION != null && data.entity.CHAILV_LOCATION != '' && data.entity.CHAILV_LOCATION != undefined){
                        vm_entry.CHAILV_LOCATION = data.entity.CHAILV_LOCATION;
                    }
                    if(data.entity.CHAILV_START_LOCATION != null && data.entity.CHAILV_START_LOCATION != '' && data.entity.CHAILV_START_LOCATION != undefined){
                        vm_entry.CHAILV_START_LOCATION = data.entity.CHAILV_START_LOCATION;
                    }
                    if(data.entity.CHAILV_START_DATE != null && data.entity.CHAILV_START_DATE != '' && data.entity.CHAILV_START_DATE != undefined){
                        vm_entry.CHAILV_START_DATE = data.entity.CHAILV_START_DATE;
                    }
                    if(data.entity.CHAILV_END_LOCATION != null && data.entity.CHAILV_END_LOCATION != '' && data.entity.CHAILV_END_LOCATION != undefined){
                        vm_entry.CHAILV_END_LOCATION = data.entity.CHAILV_END_LOCATION;
                    }
                    if(data.entity.CHAILV_END_DATE != null && data.entity.CHAILV_END_DATE != '' && data.entity.CHAILV_END_DATE != undefined){
                        vm_entry.CHAILV_END_DATE = data.entity.CHAILV_END_DATE;
                    }
                    if(data.entity.CHAILV_PERSON_NUM != null && data.entity.CHAILV_PERSON_NUM != '' && data.entity.CHAILV_PERSON_NUM != undefined){
                        vm_entry.CHAILV_PERSON_NUM = data.entity.CHAILV_PERSON_NUM;
                    }
                    if(data.entity.CHAILV_DAY_NUM != null && data.entity.CHAILV_DAY_NUM != '' && data.entity.CHAILV_DAY_NUM != undefined){
                        vm_entry.CHAILV_DAY_NUM = data.entity.CHAILV_DAY_NUM;
                    }



                    if(data.entity.ADD_PAYMENT_MODE != null && data.entity.ADD_PAYMENT_MODE != '' && data.entity.ADD_PAYMENT_MODE != undefined){
                        vm_entry.ADD_PAYMENT_MODE = data.entity.ADD_PAYMENT_MODE;
                    }
                    if(data.entity.CW_KAIHU_BANK != null && data.entity.CW_KAIHU_BANK != '' && data.entity.CW_KAIHU_BANK != undefined){
                        vm_entry.CW_KAIHU_BANK = data.entity.CW_KAIHU_BANK;
                    }
                    if(data.entity.ADD_ACCOUNT_ID != null && data.entity.ADD_ACCOUNT_ID != '' && data.entity.ADD_ACCOUNT_ID != undefined){
                        vm_entry.ADD_ACCOUNT_ID = data.entity.ADD_ACCOUNT_ID;
                    }


                    if(data.entity.cwAccountList != null && data.entity.cwAccountList != '' && data.entity.cwAccountList != undefined){
                        vm_entry.CW_ACCOUNT_LIST = data.entity.cwAccountList;
                    }

                    if(data.entity.resourceList != null && data.entity.resourceList != '' && data.entity.resourceList != undefined){
                        var html = "";
                        if(data.entity.resourceList.length > 0){
                            var resourceList = data.entity.resourceList;
                            for(var i = 0 ; i < resourceList.length ; i ++){
                                var down_url = "web/download?RESOURCE_ID=" +  resourceList[i].RESOURCE_ID;
                                html += "<div id='" + resourceList[i].RESOURCE_ID + "'>";
                                html += "<a href='" + down_url  + "' style='color: #333;'>" + resourceList[i].FILENAME + "</a>&nbsp;";
                                if(vm_entry.type != 'view' && vm_entry.type != 'addInfo') {
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
        FEE_TYPE:function(new_val,old_val){
            if(new_val == '3'){
                getBuyContractList();
            }
        },
        PROJECT_ID:function(new_val,old_val){
            if(vm_entry.FEE_TYPE == '2'){
                if(new_val == null || new_val == "" || new_val ==undefined){
                    vm_entry.SGZZJ = "";
                    return;
                }
                getProjectInfo(new_val);
            }else if(vm_entry.FEE_TYPE == '3'){
                getBuyContractList();
            }

        },
        BUY_FEE_TYPE:function(new_val,old_val){
            if(vm_entry.FEE_TYPE == '3'){
                getBuyContractList();
            }
        },
        BUY_CONTRACT_NO:function(new_val,old_val){
            if(vm_entry.FEE_TYPE == '3'){
                if(new_val == null || new_val == "" || new_val ==undefined){
                    vm_entry.CONTRACT_PRICE = "";
                    return;
                }
                var CONTRACT_ID = $("#BUY_CONTRACT_NO").find('option[value="'+new_val+'"]').attr("title");
                getBuyContractInfo(CONTRACT_ID);
            }
        },
        CW_KAIHU_BANK:function(new_val,old_val){
            getAccountList(new_val);
        },
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

function getProjectInfo(PROJECT_ID){
    myjstools.ajax(false, "POST", "/web/service?METHOD=projectInfo_findById",{
        PROJECT_ID:PROJECT_ID
    }, function(data){
        try {
            if (data.success != 1) {
                swal({title:'',text:data.msg,type:'error'});
                return false;
            }
            //加载成功,初始化页面
            if(data.entity.TOTAL_PRICE != null && data.entity.TOTAL_PRICE != '' && data.entity.TOTAL_PRICE != undefined){
                vm_entry.SGZZJ = data.entity.TOTAL_PRICE;
            }
        } catch (e) {
            //alert("login_res.error:出错了！" + e.message);
        }
    });
}
function getBuyContractList(){
    myjstools.ajax(false, "POST", "/web/service?METHOD=buyContract_listAll",{
        PROJECT_ID:vm_entry.PROJECT_ID,
        SUPPLIER_ID:vm_entry.BUY_SUPPLIER_ID
    }, function(data){
        try {
            if (data.success != 1) {
                swal({title:'',text:data.msg,type:'error'});
                return false;
            }
            vm_entry.BUY_CONTRACT_LIST = [];
            vm_entry.BUY_CONTRACT_NO = '';
            vm_entry.CONTRACT_PRICE = '';
            //加载成功,初始化页面
            if(data.rows != null && data.rows != '' && data.rows != undefined){
                vm_entry.BUY_CONTRACT_LIST = data.rows;
            }

        } catch (e) {
            //alert("login_res.error:出错了！" + e.message);
        }
    });
}

function getBuyContractInfo(CONTRACT_ID){
    myjstools.ajax(false, "POST", "/web/service?METHOD=buyContract_findById",{
        CONTRACT_ID:CONTRACT_ID
    }, function(data){
        try {
            if (data.success != 1) {
                swal({title:'',text:data.msg,type:'error'});
                return false;
            }
            //加载成功,初始化页面
            if(data.entity.CONTRACT_PRICE != null && data.entity.CONTRACT_PRICE != '' && data.entity.CONTRACT_PRICE != undefined){
                vm_entry.CONTRACT_PRICE = data.entity.CONTRACT_PRICE;
            }
        } catch (e) {
            //alert("login_res.error:出错了！" + e.message);
        }
    });
}

function getAccountList(kaihu_bank){
    myjstools.ajax(false, "POST", "/web/service?METHOD=cwaccount_listAll",{
        KAIHU_BANK:kaihu_bank
    }, function(data){
        try {
            if (data.success != 1) {
                swal({title:'',text:data.msg,type:'error'});
                return false;
            }
            //加载成功,初始化页面
            if(data.rows != null && data.rows != '' && data.rows != undefined){
                vm_entry.CW_ACCOUNT_LIST = data.rows;
            }
            //CW_ACCOUNT_LIST
        } catch (e) {
            //alert("login_res.error:出错了！" + e.message);
        }
    });
}


$(function(){
    $('#CHAILV_START_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('#CHAILV_END_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });

    if(vm_entry.type == 'edit' || vm_entry.type == 'view' || vm_entry.type == 'addInfo'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }
});

