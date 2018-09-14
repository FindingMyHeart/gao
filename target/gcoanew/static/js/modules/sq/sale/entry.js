/**
 * Created by 11029 on 2018/4/30.
 */

var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        SALE_NO:'',//销售单号
        SALE_TIME:'',//开票日期
        SEND_ADDRESS:'',//送货地址
        OUT_STORE:'',//出货仓库
        RECEIVE_PERIOD:'',//收款期限
        BUY_COMPANY:'',//购货方单位
        BUY_COMPANY_ADDRESS:'',//购货方地址
        OUT_COMPANY:'',//出货方单位
        OUT_COMPANY_ADDRESS:'',//出货方地址

        itemList:[],//明细列表

        HJJE:'',//合计金额
        RMBDX:'',//人民币大写
        STORE_MANAGER:'',//仓管员
        BUSINESS_USERID:'',//业务员
        OPEN_USERID:'',//开单员
        IF_INVOICE:'',//是否开票

        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        SALE_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            //客户名称为必填项
            if(vm_entry.IF_INVOICE == null
                ||vm_entry.IF_INVOICE == ""
                ||vm_entry.IF_INVOICE == undefined){
                alert("请选择是否开票！");
                return false;
            }
            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=sqSale_save",{
                    SALE_TIME:vm_entry.SALE_TIME,
                    SEND_ADDRESS:vm_entry.SEND_ADDRESS,
                    OUT_STORE:vm_entry.OUT_STORE,
                    RECEIVE_PERIOD:vm_entry.RECEIVE_PERIOD,
                    BUY_COMPANY:vm_entry.BUY_COMPANY,
                    BUY_COMPANY_ADDRESS:vm_entry.BUY_COMPANY_ADDRESS,
                    OUT_COMPANY:vm_entry.OUT_COMPANY,
                    OUT_COMPANY_ADDRESS:vm_entry.OUT_COMPANY_ADDRESS,
                    STORE_MANAGER:vm_entry.STORE_MANAGER,
                    BUSINESS_USERID:vm_entry.BUSINESS_USERID,
                    OPEN_USERID:vm_entry.OPEN_USERID,
                    IF_INVOICE:vm_entry.IF_INVOICE,
                    itemList: JSON.stringify(vm_entry.itemList),//联系人列表
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'保存成功！',
                            text: '销售单号：<span style="color:red">'+data.entity.SALE_NO+'</span>。',
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
                if(vm_entry.IF_INVOICE == null
                    ||vm_entry.IF_INVOICE == ""
                    ||vm_entry.IF_INVOICE == undefined){
                    alert("请选择是否开票！");
                    return false;
                }

                myjstools.ajax(false, "POST", "/web/service?METHOD=sqSale_edit",{
                    SALE_TIME:vm_entry.SALE_TIME,
                    SEND_ADDRESS:vm_entry.SEND_ADDRESS,
                    OUT_STORE:vm_entry.OUT_STORE,
                    RECEIVE_PERIOD:vm_entry.RECEIVE_PERIOD,
                    BUY_COMPANY:vm_entry.BUY_COMPANY,
                    BUY_COMPANY_ADDRESS:vm_entry.BUY_COMPANY_ADDRESS,
                    OUT_COMPANY:vm_entry.OUT_COMPANY,
                    OUT_COMPANY_ADDRESS:vm_entry.OUT_COMPANY_ADDRESS,
                    STORE_MANAGER:vm_entry.STORE_MANAGER,
                    BUSINESS_USERID:vm_entry.BUSINESS_USERID,
                    OPEN_USERID:vm_entry.OPEN_USERID,
                    IF_INVOICE:vm_entry.IF_INVOICE,
                    SALE_ID:vm_entry.SALE_ID,
                    itemList: JSON.stringify(vm_entry.itemList),//联系人列表
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=sqSale_findById",{
                SALE_ID:vm_entry.SALE_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.SALE_NO != null && data.entity.SALE_NO != '' && data.entity.SALE_NO != undefined){
                        vm_entry.SALE_NO = data.entity.SALE_NO;
                    }
                    if(data.entity.SALE_TIME != null && data.entity.SALE_TIME != '' && data.entity.SALE_TIME != undefined){
                        vm_entry.SALE_TIME = data.entity.SALE_TIME;
                    }
                    if(data.entity.SEND_ADDRESS != null && data.entity.SEND_ADDRESS != '' && data.entity.SEND_ADDRESS != undefined){
                        vm_entry.SEND_ADDRESS = data.entity.SEND_ADDRESS;
                    }
                    if(data.entity.OUT_STORE != null && data.entity.OUT_STORE != '' && data.entity.OUT_STORE != undefined){
                        vm_entry.OUT_STORE = data.entity.OUT_STORE;
                    }
                    if(data.entity.RECEIVE_PERIOD != null && data.entity.RECEIVE_PERIOD != '' && data.entity.RECEIVE_PERIOD != undefined){
                        vm_entry.RECEIVE_PERIOD = data.entity.RECEIVE_PERIOD;
                    }
                    if(data.entity.BUY_COMPANY != null && data.entity.BUY_COMPANY != '' && data.entity.BUY_COMPANY != undefined){
                        vm_entry.BUY_COMPANY = data.entity.BUY_COMPANY;
                    }
                    if(data.entity.BUY_COMPANY_ADDRESS != null && data.entity.BUY_COMPANY_ADDRESS != '' && data.entity.BUY_COMPANY_ADDRESS != undefined){
                        vm_entry.BUY_COMPANY_ADDRESS = data.entity.BUY_COMPANY_ADDRESS;
                    }
                    if(data.entity.OUT_COMPANY != null && data.entity.OUT_COMPANY != '' && data.entity.OUT_COMPANY != undefined){
                        vm_entry.OUT_COMPANY = data.entity.OUT_COMPANY;
                    }
                    if(data.entity.OUT_COMPANY_ADDRESS != null && data.entity.OUT_COMPANY_ADDRESS != '' && data.entity.OUT_COMPANY_ADDRESS != undefined){
                        vm_entry.OUT_COMPANY_ADDRESS = data.entity.OUT_COMPANY_ADDRESS;
                    }
                    if(data.entity.STORE_MANAGER != null && data.entity.STORE_MANAGER != '' && data.entity.STORE_MANAGER != undefined){
                        vm_entry.STORE_MANAGER = data.entity.STORE_MANAGER;
                    }
                    if(data.entity.BUSINESS_USERID != null && data.entity.BUSINESS_USERID != '' && data.entity.BUSINESS_USERID != undefined){
                        vm_entry.BUSINESS_USERID = data.entity.BUSINESS_USERID;
                    }
                    if(data.entity.OPEN_USERID != null && data.entity.OPEN_USERID != '' && data.entity.OPEN_USERID != undefined){
                        vm_entry.OPEN_USERID = data.entity.OPEN_USERID;
                    }
                    if(data.entity.IF_INVOICE != null && data.entity.IF_INVOICE != '' && data.entity.IF_INVOICE != undefined){
                        vm_entry.IF_INVOICE = data.entity.IF_INVOICE;
                    }
                    vm_entry.itemList = [];

                    if(data.entity.itemList != null && data.entity.itemList.length > 0){
                        for(var i = 0 ;i < data.entity.itemList.length ; i ++){
                            var MATERIAL_NAME = data.entity.itemList[i].MATERIAL_NAME;
                            var MATERIAL_SPEC = data.entity.itemList[i].MATERIAL_SPEC;
                            var MATERIAL_UNIT = data.entity.itemList[i].MATERIAL_UNIT;
                            var MATERIAL_NUM = data.entity.itemList[i].MATERIAL_NUM;
                            var UNIT_PRICE = data.entity.itemList[i].UNIT_PRICE;
                            var GOOD_PRICE = data.entity.itemList[i].GOOD_PRICE;
                            var TAX_RATE = data.entity.itemList[i].TAX_RATE;
                            var TAXATION = data.entity.itemList[i].TAXATION;
                            var obj = new Object();
                            obj.MATERIAL_NAME = MATERIAL_NAME;
                            obj.MATERIAL_SPEC = MATERIAL_SPEC;
                            obj.MATERIAL_UNIT = MATERIAL_UNIT;
                            obj.MATERIAL_NUM = MATERIAL_NUM;
                            obj.UNIT_PRICE = UNIT_PRICE;
                            obj.GOOD_PRICE = GOOD_PRICE;
                            obj.TAX_RATE = TAX_RATE;
                            obj.TAXATION = TAXATION;
                            vm_entry.itemList.push(obj);
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
            vm_entry.itemList.push(obj)
        },
        deleteThis: function (index) {
            vm_entry.itemList.splice(index, 1);
        },
        cancel:function(){
            window.location.reload();
        }
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
            elem: '#SALE_TIME' //指定元素
        });
        laydate.render({
            elem: '#RECEIVE_PERIOD' //指定元素
        });
    });


});

