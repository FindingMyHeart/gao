/**
 * Created by 11029 on 2018/4/30.
 */

var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        BUY_TYPE:'',//采购类型
        DEPT_ID:'',//部门
        POST:'',//职位
        CREATE_USERID:'',//申请人
        APPLY_NAME:'',//申请人姓名
        CREATE_TIME:'',//创建时间
        CREATE_DATE:'',//创建日期
        itemList:[],//申请详情列表
        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        OTHER_BUY_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=otherBuy_save",{
                    BUY_TYPE:vm_entry.BUY_TYPE,
                    DEPT_ID:vm_entry.DEPT_ID,
                    POST:vm_entry.POST,
                    itemList: JSON.stringify(vm_entry.itemList),//申请详情列表
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
                                vm.initTable();
                            }

                        });
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            } else if(vm_entry.type == "edit"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=otherBuy_edit",{
                    OTHER_BUY_ID:vm_entry.OTHER_BUY_ID,
                    BUY_TYPE:vm_entry.BUY_TYPE,
                    DEPT_ID:vm_entry.DEPT_ID,
                    POST:vm_entry.POST,
                    itemList: JSON.stringify(vm_entry.itemList),//申请详情列表
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
                            vm.initTable();
                        });
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            }

        },
        findInfo:function(){
            myjstools.ajax(false, "POST", "/web/service?METHOD=otherBuy_findById",{
                OTHER_BUY_ID:vm_entry.OTHER_BUY_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.BUY_TYPE != null && data.entity.BUY_TYPE != '' && data.entity.BUY_TYPE != undefined){
                        vm_entry.BUY_TYPE = data.entity.BUY_TYPE;
                    }
                    if(data.entity.DEPT_ID != null && data.entity.DEPT_ID != '' && data.entity.DEPT_ID != undefined){
                        vm_entry.DEPT_ID = data.entity.DEPT_ID;
                    }
                    if(data.entity.POST != null && data.entity.POST != '' && data.entity.POST != undefined){
                        vm_entry.POST = data.entity.POST;
                    }
                    if(data.entity.CREATE_USERID != null && data.entity.CREATE_USERID != '' && data.entity.CREATE_USERID != undefined){
                        vm_entry.CREATE_USERID = data.entity.CREATE_USERID;
                    }
                    if(data.entity.APPLY_NAME != null && data.entity.APPLY_NAME != '' && data.entity.APPLY_NAME != undefined){
                        vm_entry.APPLY_NAME = data.entity.APPLY_NAME;
                    }
                    if(data.entity.CREATE_DATE != null && data.entity.CREATE_DATE != '' && data.entity.CREATE_DATE != undefined){
                        vm_entry.CREATE_DATE = data.entity.CREATE_DATE;
                    }
                    vm_entry.itemList = [];

                    if(data.entity.itemList != null && data.entity.itemList.length > 0){
                        for(var i = 0 ;i < data.entity.itemList.length ; i ++){
                            var NAME = data.entity.itemList[i].NAME;
                            var BRAND = data.entity.itemList[i].BRAND;
                            var SPEC = data.entity.itemList[i].SPEC;
                            var UNIT = data.entity.itemList[i].UNIT;
                            var NUM = data.entity.itemList[i].NUM;
                            var MEMO = data.entity.itemList[i].MEMO;
                            var UNIT_PRICE = data.entity.itemList[i].UNIT_PRICE;
                            var TOTAL_PRICE = data.entity.itemList[i].TOTAL_PRICE;
                            vm_entry.itemList.push({NAME:NAME,BRAND:BRAND,SPEC:SPEC,UNIT:UNIT,NUM:NUM,MEMO:MEMO,UNIT_PRICE:UNIT_PRICE,TOTAL_PRICE:TOTAL_PRICE});
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
    if(vm_entry.type != 'edit'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }
});

