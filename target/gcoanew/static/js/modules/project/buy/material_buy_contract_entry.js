/**
 * Created by 11029 on 2018/4/30.
 */

var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        CONTRACT_NO:'',//合同编号
        CONTRACT_NAME:'',//合同名称
        BUYER_NAME:'',//买方
        DEPT_NAME:'',//部门
        STAFF_NAME:'',//建档人
        CREATE_DATE:'',//建档日期
        CREATE_NAME:'',//建档人
        PROJECT_ID:'',//项目ID
        SUPPLIER_ID:'',//供应商ID
        CONTRACT_PRICE:'',//合同金额
        PAYMENT_MODE:'',//付款方式
        BILL_TYPE:'',//付款方式
        CONTRACT_DATE:'',//合同日期
        MEMO:'',//备注
        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        CONTRACT_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=buyContract_save",{
                    CONTRACT_NAME:vm_entry.CONTRACT_NAME,
                    BUYER_NAME:vm_entry.BUYER_NAME,
                    PROJECT_ID:vm_entry.PROJECT_ID,
                    SUPPLIER_ID:vm_entry.SUPPLIER_ID,
                    CONTRACT_PRICE:vm_entry.CONTRACT_PRICE,
                    PAYMENT_MODE:vm_entry.PAYMENT_MODE,
                    BILL_TYPE:vm_entry.BILL_TYPE,
                    CONTRACT_DATE:vm_entry.CONTRACT_DATE,
                    MEMO:vm_entry.MEMO
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'合同保存成功！',
                            text: '合同编号：<span style="color:red">'+data.entity.CONTRACT_NO+'</span>。',
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=buyContract_edit",{
                    CONTRACT_NAME:vm_entry.CONTRACT_NAME,
                    BUYER_NAME:vm_entry.BUYER_NAME,
                    PROJECT_ID:vm_entry.PROJECT_ID,
                    SUPPLIER_ID:vm_entry.SUPPLIER_ID,
                    CONTRACT_PRICE:vm_entry.CONTRACT_PRICE,
                    PAYMENT_MODE:vm_entry.PAYMENT_MODE,
                    BILL_TYPE:vm_entry.BILL_TYPE,
                    CONTRACT_DATE:vm_entry.CONTRACT_DATE,
                    MEMO:vm_entry.MEMO,
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=buyContract_findById",{
                CONTRACT_ID:vm_entry.CONTRACT_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.CONTRACT_NO != null && data.entity.CONTRACT_NO != '' && data.entity.CONTRACT_NO != undefined){
                        vm_entry.CONTRACT_NO = data.entity.CONTRACT_NO;
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
                    if(data.entity.CONTRACT_NAME != null && data.entity.CONTRACT_NAME != '' && data.entity.CONTRACT_NAME != undefined){
                        vm_entry.CONTRACT_NAME = data.entity.CONTRACT_NAME;
                    }
                    if(data.entity.BUYER_NAME != null && data.entity.BUYER_NAME != '' && data.entity.BUYER_NAME != undefined){
                        vm_entry.BUYER_NAME = data.entity.BUYER_NAME;
                    }
                    if(data.entity.PROJECT_ID != null && data.entity.PROJECT_ID != '' && data.entity.PROJECT_ID != undefined){
                        vm_entry.PROJECT_ID = data.entity.PROJECT_ID;
                    }
                    if(data.entity.SUPPLIER_ID != null && data.entity.SUPPLIER_ID != '' && data.entity.SUPPLIER_ID != undefined){
                        vm_entry.SUPPLIER_ID = data.entity.SUPPLIER_ID;
                    }
                    if(data.entity.CONTRACT_PRICE != null && data.entity.CONTRACT_PRICE != '' && data.entity.CONTRACT_PRICE != undefined){
                        vm_entry.CONTRACT_PRICE = data.entity.CONTRACT_PRICE;
                    }
                    if(data.entity.PAYMENT_MODE != null && data.entity.PAYMENT_MODE != '' && data.entity.PAYMENT_MODE != undefined){
                        vm_entry.PAYMENT_MODE = data.entity.PAYMENT_MODE;
                    }
                    if(data.entity.BILL_TYPE != null && data.entity.BILL_TYPE != '' && data.entity.BILL_TYPE != undefined){
                        vm_entry.BILL_TYPE = data.entity.BILL_TYPE;
                    }
                    if(data.entity.CONTRACT_DATE != null && data.entity.CONTRACT_DATE != '' && data.entity.CONTRACT_DATE != undefined){
                        vm_entry.CONTRACT_DATE = data.entity.CONTRACT_DATE;
                    }
                    if(data.entity.MEMO != null && data.entity.MEMO != '' && data.entity.MEMO != undefined){
                        vm_entry.MEMO = data.entity.MEMO;
                    }

                } catch (e) {
                    //alert("login_res.error:出错了！" + e.message);
                }
            });
        },
        //增加一行联系人
        addContact:function(){
            var obj = new Object();
            vm_entry.personnelList.push(obj)
        },
        deleteThis: function (index) {
            vm_entry.personnelList.splice(index, 1);
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
            elem: '#CONTRACT_DATE' //指定元素
        });
    });

});

