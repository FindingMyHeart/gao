/**
 * Created by 11029 on 2018/4/30.
 */

var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        PART_A:'',//甲方
        PART_B:'',//乙方
        CONTRACT_NAME:'',//合同名称
        PROJECT_NAME:'',//项目名称
        PROJECT_DATE:'',//建档日期
        START_DATE:'',//开工日期
        END_DATE:'',//竣工日期
        MAINTENANCE_DATE:'',//维保日期
        PROJECT_ADDRESS:'',//项目地点
        CONTRACT_PRICE:'',//合同金额（元）
        PAYMENT_MODE:'',//付款方式
        TOTAL_PRICE:'',//施工总价
        PROJECT_CASE:'',//工程概况
        MANAGER_USERID:'',//项目经理
        PROJECT_DEPUTY_MANAGER:'',//项目副经理
        TECHNOLOGY_USERID:'',//技术负责人
        SECURITY_MANAGER:'',//安全负责人
        CONSTRUCTION_CLERK:'',//施工人员
        SECURITY_CLERK:'',//安全员
        MATERIAL_CLERK:'',//材料员
        DOCUMENT_CLERK:'',//资料员
        BUDGET_CLERK:'',//预算员
        PEOPLE_MANAGER_CLERK:'',//民管员
        OTHER_PEOPLE:'',//其他人员
        contactList:[],//联系人
        shenHuaList:[],//深化列表
        backMoneyList:[],//回款金额列表
        invoiceMoneyList:[],//开票金额列表
        PROJECT_STATUS:'',//项目状态
        in_type:'',
        type:'save',//页面类型  save 保存  edit 修改
        PROJECT_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            //客户名称为必填项
            if(vm_entry.PROJECT_NAME == null
                ||vm_entry.PROJECT_NAME == ""
                ||vm_entry.PROJECT_NAME == undefined){
                alert("请输入项目名称！");
                return false;
            }

            var ATTACHMENT = "";
            $(":input[name = 'resources']").each(function(i){
                if (i == 0){
                    ATTACHMENT += $(this).val();
                } else {
                    ATTACHMENT += "," + $(this).val();
                }
            });
            vm_entry.RESOURCEIDS = ATTACHMENT;


            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=projectInfo_save",{
                    PART_A:vm_entry.PART_A,//甲方
                    PART_B:vm_entry.PART_B,//乙方
                    CONTRACT_NAME:vm_entry.CONTRACT_NAME,//合同名称
                    PROJECT_NAME:vm_entry.PROJECT_NAME,//项目名称
                    PROJECT_DATE:vm_entry.PROJECT_DATE,//建档日期
                    START_DATE:vm_entry.START_DATE,//开工日期
                    END_DATE:vm_entry.END_DATE,//竣工日期
                    MAINTENANCE_DATE:vm_entry.MAINTENANCE_DATE,//维保日期
                    PROJECT_ADDRESS:vm_entry.PROJECT_ADDRESS,//项目地点
                    CONTRACT_PRICE:vm_entry.CONTRACT_PRICE,//合同金额（元）
                    PAYMENT_MODE:vm_entry.PAYMENT_MODE,//付款方式
                    TOTAL_PRICE:vm_entry.TOTAL_PRICE,//施工总额
                    PROJECT_CASE:vm_entry.PROJECT_CASE,//工程概况
                    MANAGER_USERID:vm_entry.MANAGER_USERID,//项目经理
                    PROJECT_DEPUTY_MANAGER:vm_entry.PROJECT_DEPUTY_MANAGER,//项目副经理
                    OTHER_PEOPLE:vm_entry.OTHER_PEOPLE,//其他人员
                    contactList: JSON.stringify(vm_entry.contactList),//联系人列表
                    shenHuaList: JSON.stringify(vm_entry.shenHuaList),//深化列表
                    backMoneyList: JSON.stringify(vm_entry.backMoneyList),//回款金额
                    invoiceMoneyList: JSON.stringify(vm_entry.invoiceMoneyList),//开票金额
                    RESOURCEIDS:vm_entry.RESOURCEIDS
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'',
                            text:'保存成功!',
                            type:'success'
                        },function () {
                            // $("#entry_qx").click();
                            // vm.initTable();
                            window.location.reload();
                        });
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            } else if(vm_entry.type == "edit"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=projectInfo_edit",{
                    PART_A:vm_entry.PART_A,//甲方
                    PART_B:vm_entry.PART_B,//乙方
                    CONTRACT_NAME:vm_entry.CONTRACT_NAME,//合同名称
                    PROJECT_NAME:vm_entry.PROJECT_NAME,//项目名称
                    PROJECT_DATE:vm_entry.PROJECT_DATE,//建档日期
                    START_DATE:vm_entry.START_DATE,//开工日期
                    END_DATE:vm_entry.END_DATE,//竣工日期
                    MAINTENANCE_DATE:vm_entry.MAINTENANCE_DATE,//维保日期
                    PROJECT_ADDRESS:vm_entry.PROJECT_ADDRESS,//项目地点
                    CONTRACT_PRICE:vm_entry.CONTRACT_PRICE,//合同金额（元）
                    PAYMENT_MODE:vm_entry.PAYMENT_MODE,//付款方式
                    TOTAL_PRICE:vm_entry.TOTAL_PRICE,//施工总额
                    PROJECT_CASE:vm_entry.PROJECT_CASE,//工程概况
                    MANAGER_USERID:vm_entry.MANAGER_USERID,//项目经理
                    PROJECT_DEPUTY_MANAGER:vm_entry.PROJECT_DEPUTY_MANAGER,//项目副经理
                    TECHNOLOGY_USERID:vm_entry.TECHNOLOGY_USERID,//技术负责人
                    CONSTRUCTION_CLERK:vm_entry.CONSTRUCTION_CLERK,//施工人员
                    SECURITY_CLERK:vm_entry.SECURITY_CLERK,//安全员
                    SECURITY_MANAGER:vm_entry.SECURITY_MANAGER,//安全负责人
                    MATERIAL_CLERK:vm_entry.MATERIAL_CLERK,//材料员
                    DOCUMENT_CLERK:vm_entry.DOCUMENT_CLERK,//资料员
                    BUDGET_CLERK:vm_entry.BUDGET_CLERK,//预算员
                    PEOPLE_MANAGER_CLERK:vm_entry.PEOPLE_MANAGER_CLERK,//民管员
                    OTHER_PEOPLE:vm_entry.OTHER_PEOPLE,//其他人员
                    PROJECT_ID:vm_entry.PROJECT_ID,//主键ID
                    contactList: JSON.stringify(vm_entry.contactList),//联系人列表
                    shenHuaList: JSON.stringify(vm_entry.shenHuaList),//联系人列表
                    backMoneyList: JSON.stringify(vm_entry.backMoneyList),//回款金额
                    invoiceMoneyList: JSON.stringify(vm_entry.invoiceMoneyList),//开票金额
                    RESOURCEIDS: vm_entry.RESOURCEIDS,//资源
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'',
                            text:'保存成功!',
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=projectInfo_findById",{
                PROJECT_ID:vm_entry.PROJECT_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.PART_A != null && data.entity.PART_A != '' && data.entity.PART_A != undefined){
                        vm_entry.PART_A = data.entity.PART_A;
                    }
                    if(data.entity.PART_B != null && data.entity.PART_B != '' && data.entity.PART_B != undefined){
                        vm_entry.PART_B = data.entity.PART_B;
                    }
                    if(data.entity.CONTRACT_NAME != null && data.entity.CONTRACT_NAME != '' && data.entity.CONTRACT_NAME != undefined){
                        vm_entry.CONTRACT_NAME = data.entity.CONTRACT_NAME;
                    }
                    if(data.entity.PROJECT_NAME != null && data.entity.PROJECT_NAME != '' && data.entity.PROJECT_NAME != undefined){
                        vm_entry.PROJECT_NAME = data.entity.PROJECT_NAME;
                    }
                    if(data.entity.PROJECT_DATE != null && data.entity.PROJECT_DATE != '' && data.entity.PROJECT_DATE != undefined){
                        vm_entry.PROJECT_DATE = data.entity.PROJECT_DATE;
                    }
                    if(data.entity.START_DATE != null && data.entity.START_DATE != '' && data.entity.START_DATE != undefined){
                        vm_entry.START_DATE = data.entity.START_DATE;
                    }
                    if(data.entity.END_DATE != null && data.entity.END_DATE != '' && data.entity.END_DATE != undefined){
                        vm_entry.END_DATE = data.entity.END_DATE;
                    }
                    if(data.entity.MAINTENANCE_DATE != null && data.entity.MAINTENANCE_DATE != '' && data.entity.MAINTENANCE_DATE != undefined){
                        vm_entry.MAINTENANCE_DATE = data.entity.MAINTENANCE_DATE;
                    }
                    if(data.entity.PROJECT_ADDRESS != null && data.entity.PROJECT_ADDRESS != '' && data.entity.PROJECT_ADDRESS != undefined){
                        vm_entry.PROJECT_ADDRESS = data.entity.PROJECT_ADDRESS;
                    }
                    if(data.entity.CONTRACT_PRICE != null && data.entity.CONTRACT_PRICE != '' && data.entity.CONTRACT_PRICE != undefined){
                        vm_entry.CONTRACT_PRICE = data.entity.CONTRACT_PRICE;
                    }
                    if(data.entity.PAYMENT_MODE != null && data.entity.PAYMENT_MODE != '' && data.entity.PAYMENT_MODE != undefined){
                        vm_entry.PAYMENT_MODE = data.entity.PAYMENT_MODE;
                    }
                    if(data.entity.TOTAL_PRICE != null && data.entity.TOTAL_PRICE != '' && data.entity.TOTAL_PRICE != undefined){
                        vm_entry.TOTAL_PRICE = data.entity.TOTAL_PRICE;
                    }
                    if(data.entity.PROJECT_CASE != null && data.entity.PROJECT_CASE != '' && data.entity.PROJECT_CASE != undefined){
                        vm_entry.PROJECT_CASE = data.entity.PROJECT_CASE;
                    }
                    if(data.entity.MANAGER_USERID != null && data.entity.MANAGER_USERID != '' && data.entity.MANAGER_USERID != undefined){
                        vm_entry.MANAGER_USERID = data.entity.MANAGER_USERID;
                    }
                    if(data.entity.PROJECT_DEPUTY_MANAGER != null && data.entity.PROJECT_DEPUTY_MANAGER != '' && data.entity.PROJECT_DEPUTY_MANAGER != undefined){
                        vm_entry.PROJECT_DEPUTY_MANAGER = data.entity.PROJECT_DEPUTY_MANAGER;
                    }
                    if(data.entity.TECHNOLOGY_USERID != null && data.entity.TECHNOLOGY_USERID != '' && data.entity.TECHNOLOGY_USERID != undefined){
                        vm_entry.TECHNOLOGY_USERID = data.entity.TECHNOLOGY_USERID;
                    }
                    if(data.entity.SECURITY_MANAGER != null && data.entity.SECURITY_MANAGER != '' && data.entity.SECURITY_MANAGER != undefined){
                        vm_entry.SECURITY_MANAGER = data.entity.SECURITY_MANAGER;
                    }
                    if(data.entity.CONSTRUCTION_CLERK != null && data.entity.CONSTRUCTION_CLERK != '' && data.entity.CONSTRUCTION_CLERK != undefined){
                        vm_entry.CONSTRUCTION_CLERK = data.entity.CONSTRUCTION_CLERK;
                    }
                    if(data.entity.SECURITY_CLERK != null && data.entity.SECURITY_CLERK != '' && data.entity.SECURITY_CLERK != undefined){
                        vm_entry.SECURITY_CLERK = data.entity.SECURITY_CLERK;
                    }
                    if(data.entity.MATERIAL_CLERK != null && data.entity.MATERIAL_CLERK != '' && data.entity.MATERIAL_CLERK != undefined){
                        vm_entry.MATERIAL_CLERK = data.entity.MATERIAL_CLERK;
                    }
                    if(data.entity.DOCUMENT_CLERK != null && data.entity.DOCUMENT_CLERK != '' && data.entity.DOCUMENT_CLERK != undefined){
                        vm_entry.DOCUMENT_CLERK = data.entity.DOCUMENT_CLERK;
                    }
                    if(data.entity.BUDGET_CLERK != null && data.entity.BUDGET_CLERK != '' && data.entity.BUDGET_CLERK != undefined){
                        vm_entry.BUDGET_CLERK = data.entity.BUDGET_CLERK;
                    }
                    if(data.entity.PEOPLE_MANAGER_CLERK != null && data.entity.PEOPLE_MANAGER_CLERK != '' && data.entity.PEOPLE_MANAGER_CLERK != undefined){
                        vm_entry.PEOPLE_MANAGER_CLERK = data.entity.PEOPLE_MANAGER_CLERK;
                    }
                    if(data.entity.OTHER_PEOPLE != null && data.entity.OTHER_PEOPLE != '' && data.entity.OTHER_PEOPLE != undefined){
                        vm_entry.OTHER_PEOPLE = data.entity.OTHER_PEOPLE;
                    }
                    vm_entry.contactList = [];
                    if(data.entity.contactList != null && data.entity.contactList.length > 0){
                        for(var i = 0 ;i < data.entity.contactList.length ; i ++){

                            var CONTACT_NAME = data.entity.contactList[i].CONTACT_NAME;
                            var CONTACT_TEL = data.entity.contactList[i].CONTACT_TEL;
                            var CONTACT_TYPE = data.entity.contactList[i].CONTACT_TYPE;
                            var MEMO = data.entity.contactList[i].MEMO;
                            vm_entry.contactList.push({CONTACT_NAME:CONTACT_NAME,CONTACT_TEL:CONTACT_TEL,CONTACT_TYPE:CONTACT_TYPE,MEMO:MEMO});
                            console.log(CONTACT_NAME);
                            console.log(vm_entry.contactList);
                            console.log(data.entity.contactList[i]);
                            console.log(data.entity.contactList[i].CONTACT_NAME);
                        }
                    }
                    vm_entry.shenHuaList = [];
                    if(data.entity.shenHuaList != null && data.entity.shenHuaList.length > 0){
                        for(var i = 0 ;i < data.entity.shenHuaList.length ; i ++){
                            var MATERIAL_ID = data.entity.shenHuaList[i].MATERIAL_ID;
                            var MATERIAL_BRAND = data.entity.shenHuaList[i].MATERIAL_BRAND;
                            var MATERIAL_SPEC = data.entity.shenHuaList[i].MATERIAL_SPEC;
                            var MATERIAL_UNIT = data.entity.shenHuaList[i].MATERIAL_UNIT;

                            var SYSTEM_NAME = data.entity.shenHuaList[i].SYSTEM_NAME;
                            var MATERIAL_NUM = data.entity.shenHuaList[i].MATERIAL_NUM;
                            var MEMO = data.entity.shenHuaList[i].MEMO;
                            vm_entry.shenHuaList.push({MATERIAL_ID:MATERIAL_ID,SYSTEM_NAME:SYSTEM_NAME,MATERIAL_NUM:MATERIAL_NUM,MEMO:MEMO,MATERIAL_BRAND:MATERIAL_BRAND,MATERIAL_SPEC:MATERIAL_SPEC,MATERIAL_UNIT:MATERIAL_UNIT});
                        }
                    }
                    vm_entry.backMoneyList = [];
                    if(data.entity.backMoneyList != null && data.entity.backMoneyList.length > 0){
                        for(var i = 0 ;i < data.entity.backMoneyList.length ; i ++){
                            var MONEY_DATE = data.entity.backMoneyList[i].MONEY_DATE;
                            var FEE_AMOUNT = data.entity.backMoneyList[i].FEE_AMOUNT;
                            var MEMO = data.entity.backMoneyList[i].MEMO;
                            vm_entry.backMoneyList.push({MONEY_DATE:MONEY_DATE,FEE_AMOUNT:FEE_AMOUNT,MEMO:MEMO});
                        }
                    }
                    vm_entry.invoiceMoneyList = [];
                    if(data.entity.invoiceMoneyList != null && data.entity.invoiceMoneyList.length > 0){
                        for(var i = 0 ;i < data.entity.invoiceMoneyList.length ; i ++){
                            var MONEY_DATE = data.entity.invoiceMoneyList[i].MONEY_DATE;
                            var FEE_AMOUNT = data.entity.invoiceMoneyList[i].FEE_AMOUNT;
                            var MEMO = data.entity.invoiceMoneyList[i].MEMO;
                            vm_entry.invoiceMoneyList.push({MONEY_DATE:MONEY_DATE,FEE_AMOUNT:FEE_AMOUNT,MEMO:MEMO});
                        }
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
        },
        //增加一行联系人
        addContact:function(){
            var obj = new Object();
            obj.ORDER_NO = "";
            obj.CONTACT_TYPE = "";
            obj.CONTACT_NAME = "";
            obj.CONTACT_TEL = "";
            obj.MEMO = "";
            vm_entry.contactList.push(obj)
        },
        deleteThis: function (index) {
            vm_entry.contactList.splice(index, 1);
        },


        //增加一行深化列表
        addShenHua:function(){
            var obj = new Object();
            obj.SYSTEM_NAME = '';
            obj.MATERIAL_ID = '';
            obj.MATERIAL_BRAND = '';
            obj.MATERIAL_SPEC = '';
            obj.MATERIAL_UNIT = '';
            obj.MATERIAL_NUM = '';
            obj.MEMO = '';
            vm_entry.shenHuaList.push(obj)
        },
        deleteShenHua: function (index) {
            vm_entry.shenHuaList.splice(index, 1);
        },


        //增加一行回款金额列表
        addBackMoney:function(){
            var obj = new Object();
            vm_entry.backMoneyList.push(obj)
        },
        deleteBackMoney: function (index) {
            vm_entry.backMoneyList.splice(index, 1);
        },

        //增加一行开票金额列表
        addInvoiceMoney:function(){
            var obj = new Object();
            vm_entry.invoiceMoneyList.push(obj)
        },
        deleteInvoiceMoney: function (index) {
            vm_entry.invoiceMoneyList.splice(index, 1);
        },

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

function changeMc(index,obj){
    var MATERIAL_ID = $(obj).val();//选中的值
    var MATERIAL_BRAND = "";//品牌
    var MATERIAL_SPEC = "";//规格
    var MATERIAL_UNIT = "";//单位
    var title = $(obj).find('option[value="'+MATERIAL_ID+'"]').attr("title");
    if(title != null && title != '' && title != undefined){
        var arr = title.split("-");
        if(arr.length > 0){
            MATERIAL_BRAND = arr[0];
        }
        if(arr.length > 1){
            MATERIAL_SPEC = arr[1];
        }
        if(arr.length > 2){
            MATERIAL_UNIT = arr[2];
        }
    }

    var item = vm_entry.shenHuaList[index];
    item.MATERIAL_BRAND = MATERIAL_BRAND;
    item.MATERIAL_SPEC = MATERIAL_SPEC;
    item.MATERIAL_UNIT = MATERIAL_UNIT;
    item.MATERIAL_ID = MATERIAL_ID;
}

$(function(){
    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }
    $('#START_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('#END_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('#MAINTENANCE_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });


    $("#entry_qx").on('click',function(){
        // 获得frame索引
        var index = parent.layer.getFrameIndex(window.name);
        //关闭当前frame
        parent.layer.close(index);
        window.parent.vm.initTable();
    });

});

