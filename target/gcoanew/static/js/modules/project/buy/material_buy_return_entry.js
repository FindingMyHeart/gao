/**
 * Created by 11029 on 2018/4/30.
 */

var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        RETURN_SN:'',//退货单号
        RETURN_NAME:'',//退货人`
        RETURN_DATE:'',//退货日期
        itemList:[],//退货详情列表
        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        RETURN_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=buyReturn_save",{
                    itemList: JSON.stringify(vm_entry.itemList),//退货详情列表
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'保存成功！',
                            text: '退货单号：<span style="color:red">'+data.entity.RETURN_SN+'</span>。',
                            html: true
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=buyReturn_edit",{
                    RETURN_ID:vm_entry.RETURN_ID,
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
                        });
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            }

        },
        findInfo:function(){
            myjstools.ajax(false, "POST", "/web/service?METHOD=buyReturn_findById",{
                RETURN_ID:vm_entry.RETURN_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.RETURN_SN != null && data.entity.RETURN_SN != '' && data.entity.RETURN_SN != undefined){
                        vm_entry.RETURN_SN = data.entity.RETURN_SN;
                    }
                    if(data.entity.RETURN_NAME != null && data.entity.RETURN_NAME != '' && data.entity.RETURN_NAME != undefined){
                        vm_entry.RETURN_NAME = data.entity.RETURN_NAME;
                    }
                    if(data.entity.RETURN_DATE != null && data.entity.RETURN_DATE != '' && data.entity.RETURN_DATE != undefined){
                        vm_entry.RETURN_DATE = data.entity.RETURN_DATE;
                    }
                    vm_entry.itemList = [];
                    if(data.entity.itemList != null && data.entity.itemList.length > 0){
                        for(var i = 0 ;i < data.entity.itemList.length ; i ++){
                            var PROJECT_ID = data.entity.itemList[i].PROJECT_ID;
                            var SUPPLIER_ID = data.entity.itemList[i].SUPPLIER_ID;
                            var MATERIAL_ID = data.entity.itemList[i].MATERIAL_ID;
                            var MATERIAL_NAME = data.entity.itemList[i].MATERIAL_NAME;
                            var MATERIAL_BRAND = data.entity.itemList[i].MATERIAL_BRAND;
                            var MATERIAL_SPEC = data.entity.itemList[i].MATERIAL_SPEC;
                            var MATERIAL_UNIT = data.entity.itemList[i].MATERIAL_UNIT;
                            var MATERIAL_NUM = data.entity.itemList[i].MATERIAL_NUM;
                            var MEMO = data.entity.itemList[i].MEMO;
                            var UNIT_PRICE = data.entity.itemList[i].UNIT_PRICE;
                            var TOTAL_PRICE = data.entity.itemList[i].TOTAL_PRICE;

                            var obj = new Object();
                            obj.PROJECT_ID = PROJECT_ID;
                            obj.SUPPLIER_ID = SUPPLIER_ID;
                            obj.MATERIAL_ID = MATERIAL_ID;
                            obj.MATERIAL_NAME = MATERIAL_NAME;
                            obj.MATERIAL_BRAND = MATERIAL_BRAND;
                            obj.MATERIAL_SPEC = MATERIAL_SPEC;
                            obj.MATERIAL_UNIT = MATERIAL_UNIT;
                            obj.MATERIAL_NUM = MATERIAL_NUM;
                            obj.UNIT_PRICE = UNIT_PRICE;
                            obj.TOTAL_PRICE = TOTAL_PRICE;
                            obj.MEMO = MEMO;
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
            obj.PROJECT_ID = "";
            obj.SUPPLIER_ID = "";
            obj.MATERIAL_ID = "";
            obj.MATERIAL_BRAND = "";
            obj.MATERIAL_SPEC = "";
            obj.MATERIAL_UNIT = "";
            vm_entry.itemList.push(obj)
        },
        deleteThis: function (index) {
            vm_entry.itemList.splice(index, 1);
        },
    },

});

$(function(){
    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }
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
    debugger
    var item = vm_entry.itemList[index];
    item.MATERIAL_BRAND = MATERIAL_BRAND;
    item.MATERIAL_SPEC = MATERIAL_SPEC;
    item.MATERIAL_UNIT = MATERIAL_UNIT;
    item.MATERIAL_ID = MATERIAL_ID;
    vm_entry.itemList[index] = item;
}

