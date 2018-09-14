/**
 * Created by 11029 on 2018/4/30.
 */

var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        APPLYBUY_SN:'',//申购单号
        DEPT_ID:'',//申购部门
        DEPT_NAME:'',//申购部门名称
        CREATE_USERID:'',//申购人
        APPLY_NAME:'',//申购人姓名
        APPLY_DATE:'',//申购人日期
        CREATE_TIME:'',//创建时间
        CREATE_DATE:'',//申购日期
        PROJECT_ID:'',//项目ID
        itemList:[],//申请详情列表
        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        SESSION_DEPT_NAME:'',//session中的DEPT_NMAE
        APPLYBUY_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=applyBuy_save",{
                    PROJECT_ID:vm_entry.PROJECT_ID,
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=applyBuy_edit",{
                    PROJECT_ID:vm_entry.PROJECT_ID,
                    APPLYBUY_ID:vm_entry.APPLYBUY_ID,
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=applyBuy_findById",{
                APPLYBUY_ID:vm_entry.APPLYBUY_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.APPLYBUY_SN != null && data.entity.APPLYBUY_SN != '' && data.entity.APPLYBUY_SN != undefined){
                        vm_entry.APPLYBUY_SN = data.entity.APPLYBUY_SN;
                    }
                    if(data.entity.DEPT_ID != null && data.entity.DEPT_ID != '' && data.entity.DEPT_ID != undefined){
                        vm_entry.DEPT_ID = data.entity.DEPT_ID;
                    }
                    if(data.entity.CREATE_USERID != null && data.entity.CREATE_USERID != '' && data.entity.CREATE_USERID != undefined){
                        vm_entry.CREATE_USERID = data.entity.CREATE_USERID;
                    }
                    if(data.entity.CREATE_USERID != null && data.entity.CREATE_USERID != '' && data.entity.CREATE_USERID != undefined){
                        vm_entry.CREATE_USERID = data.entity.CREATE_USERID;
                    }
                    if(data.entity.APPLY_NAME != null && data.entity.APPLY_NAME != '' && data.entity.APPLY_NAME != undefined){
                        vm_entry.APPLY_NAME = data.entity.APPLY_NAME;
                    }
                    if(data.entity.DEPT_NAME != null && data.entity.DEPT_NAME != '' && data.entity.DEPT_NAME != undefined){
                        vm_entry.DEPT_NAME = data.entity.DEPT_NAME;
                    }
                    if(data.entity.CREATE_DATE != null && data.entity.CREATE_DATE != '' && data.entity.CREATE_DATE != undefined){
                        vm_entry.CREATE_DATE = data.entity.CREATE_DATE;
                    }
                    if(data.entity.APPLY_DATE != null && data.entity.APPLY_DATE != '' && data.entity.APPLY_DATE != undefined){
                        vm_entry.APPLY_DATE = data.entity.APPLY_DATE;
                    }
                    if(data.entity.PROJECT_ID != null && data.entity.PROJECT_ID != '' && data.entity.PROJECT_ID != undefined){
                        vm_entry.PROJECT_ID = data.entity.PROJECT_ID;
                    }
                    vm_entry.itemList = [];

                    if(data.entity.itemList != null && data.entity.itemList.length > 0){
                        for(var i = 0 ;i < data.entity.itemList.length ; i ++){
                            var SYSTEM_NAME = data.entity.itemList[i].SYSTEM_NAME;
                            var MATERIAL_ID = data.entity.itemList[i].MATERIAL_ID;
                            var MATERIAL_BRAND = data.entity.itemList[i].MATERIAL_BRAND;
                            var MATERIAL_SPEC = data.entity.itemList[i].MATERIAL_SPEC;
                            var MATERIAL_UNIT = data.entity.itemList[i].MATERIAL_UNIT;
                            var MATERIAL_NUM = data.entity.itemList[i].MATERIAL_NUM;
                            var MEMO = data.entity.itemList[i].MEMO;
                            vm_entry.itemList.push({SYSTEM_NAME:SYSTEM_NAME,MATERIAL_ID:MATERIAL_ID,MATERIAL_BRAND:MATERIAL_BRAND,MATERIAL_SPEC:MATERIAL_SPEC,MATERIAL_UNIT:MATERIAL_UNIT,MATERIAL_NUM:MATERIAL_NUM,MEMO:MEMO});
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
            obj.SYSTEM_NAME = '';
            obj.MATERIAL_ID = '';
            obj.MATERIAL_BRAND = '';
            obj.MATERIAL_SPEC = '';
            obj.MATERIAL_UNIT = '';
            obj.MATERIAL_NUM = '';
            obj.MEMO = '';
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

    var item = vm_entry.itemList[index];
    item.MATERIAL_BRAND = MATERIAL_BRAND;
    item.MATERIAL_SPEC = MATERIAL_SPEC;
    item.MATERIAL_UNIT = MATERIAL_UNIT;
    item.MATERIAL_ID = MATERIAL_ID;
}

$(function(){
    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }



});

