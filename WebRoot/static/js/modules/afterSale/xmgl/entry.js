/**
 * Created by 11029 on 2018/4/30.
 */

var vm_entry = new Vue({
    el:"#entry_body",
    data:{
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
        OTHER_PEOPLE:'',//其他人员
        contactList:[],//联系人
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
            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=afterSaleProject_save",{
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
                            vm.initTable();
                        });
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            } else if(vm_entry.type == "edit"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=afterSaleProject_edit",{
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
                    PROJECT_ID:vm_entry.PROJECT_ID,//主键ID
                    contactList: JSON.stringify(vm_entry.contactList),//联系人列表
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
                            vm.initTable();
                        });
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            }

        },
        findInfo:function(){
            myjstools.ajax(false, "POST", "/web/service?METHOD=afterSaleProject_findById",{
                PROJECT_ID:vm_entry.PROJECT_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
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
                } catch (e) {
                    //alert("login_res.error:出错了！" + e.message);
                }
            });
        },
        //增加一行联系人
        addContact:function(){
            var obj = new Object();
            vm_entry.contactList.push(obj)
        },
        deleteThis: function (index) {
            vm_entry.contactList.splice(index, 1);
        },
    },

});

$(function(){
    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }

    layui.use('laydate', function(){
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#START_DATE' //指定元素
        });
        laydate.render({
            elem: '#END_DATE' //指定元素
        });
        laydate.render({
            elem: '#MAINTENANCE_DATE' //指定元素
        });
    });
    
});

