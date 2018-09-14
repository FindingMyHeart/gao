/**
 * Created by 11029 on 2018/4/30.
 */

var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        APPLYBUY_ID:'',//申购主表ID
        applyDetailList:[],//申购详情列表
        BUY_SN:'',//采购单号
        BUY_NAME:'',//采购人
        APPLYBUY_SN:'',//申购订单号
        BUY_USER_NAME:'',//项目名称
        APPLY_USER_NAME:'',//申购人姓名
        BUY_USER_NAME:'',//采购人姓名
        APPLY_DATE:'',//申购时间
        BUY_DATE:'',//采购时间
        BUY_TYPE:'',//采购类型
        DEPT_ID:'',//部门
        POST:'',//职位
        CREATE_USERID:'',//申请人
        APPLY_NAME:'',//申请人姓名
        CREATE_TIME:'',//创建时间`
        CREATE_DATE:'',//创建日期
        itemList:[],//申请详情列表
        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        BUY_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=buy_save",{
                    APPLYBUY_ID:vm_entry.APPLYBUY_ID,
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
                            text: '采购单号：<span style="color:red">'+data.entity.BUY_SN+'</span>。',
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=buy_edit",{
                    BUY_ID:vm_entry.BUY_ID,
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=buy_findById",{
                BUY_ID:vm_entry.BUY_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.BUY_SN != null && data.entity.BUY_SN != '' && data.entity.BUY_SN != undefined){
                        vm_entry.BUY_SN = data.entity.BUY_SN;
                    }
                    if(data.entity.BUY_USER_NAME != null && data.entity.BUY_USER_NAME != '' && data.entity.BUY_USER_NAME != undefined){
                        vm_entry.BUY_USER_NAME = data.entity.BUY_USER_NAME;
                    }
                    if(data.entity.BUY_DATE != null && data.entity.BUY_DATE != '' && data.entity.BUY_DATE != undefined){
                        vm_entry.BUY_DATE = data.entity.BUY_DATE;
                    }
                    vm_entry.itemList = [];
                    if(data.entity.itemList != null && data.entity.itemList.length > 0){
                        for(var i = 0 ;i < data.entity.itemList.length ; i ++){
                            var APPLYBUY_DETAIL_ID = data.entity.itemList[i].APPLYBUY_DETAIL_ID;//申购细节ID


                            var APPLY_SYSTEM_NAME = data.entity.itemList[i].APPLY_SYSTEM_NAME;//申购【系统名称】
                            var APPLY_MATERIAL_NAME = data.entity.itemList[i].APPLY_MATERIAL_NAME;//申购【名称】
                            var APPLY_MATERIAL_BRAND = data.entity.itemList[i].APPLY_MATERIAL_BRAND;//申购【品牌】
                            var APPLY_MATERIAL_SPEC = data.entity.itemList[i].APPLY_MATERIAL_SPEC;//申购【规格】
                            var APPLY_MATERIAL_UNIT = data.entity.itemList[i].APPLY_MATERIAL_UNIT;//申购【单位】
                            var APPLY_MATERIAL_NUM = data.entity.itemList[i].APPLY_MATERIAL_NUM;//申购【数量】
                            var APPLY_MEMO = data.entity.itemList[i].APPLY_MEMO;//申购【备注】


                            var SUPPLIER_ID = "";
                            var MATERIAL_ID = "";
                            if(data.entity.itemList[i].SUPPLIER_ID != null && data.entity.itemList[i].SUPPLIER_ID != '' && data.entity.itemList[i].SUPPLIER_ID != undefined){
                                SUPPLIER_ID = data.entity.itemList[i].SUPPLIER_ID;
                            }
                            if(data.entity.itemList[i].MATERIAL_ID != null && data.entity.itemList[i].MATERIAL_ID != '' && data.entity.itemList[i].MATERIAL_ID != undefined){
                                MATERIAL_ID = data.entity.itemList[i].MATERIAL_ID;
                            }

                            var BUY_MATERIAL_BRAND = data.entity.itemList[i].BUY_MATERIAL_BRAND;
                            var BUY_MATERIAL_SPEC = data.entity.itemList[i].BUY_MATERIAL_SPEC;
                            var BUY_MATERIAL_UNIT = data.entity.itemList[i].BUY_MATERIAL_UNIT;
                            var MATERIAL_NUM = data.entity.itemList[i].MATERIAL_NUM;
                            var MEMO = data.entity.itemList[i].MEMO;


                            var BUY_NUM = data.entity.itemList[i].BUY_NUM;
                            var STORE_NUM = data.entity.itemList[i].STORE_NUM;
                            var UNIT_PRICE = data.entity.itemList[i].UNIT_PRICE;
                            var TOTAL_PRICE = data.entity.itemList[i].TOTAL_PRICE;

                            var obj = new Object();
                            obj.APPLYBUY_DETAIL_ID = APPLYBUY_DETAIL_ID;
                            obj.APPLY_SYSTEM_NAME = APPLY_SYSTEM_NAME;
                            obj.APPLY_MATERIAL_NAME = APPLY_MATERIAL_NAME;
                            obj.APPLY_MATERIAL_BRAND = APPLY_MATERIAL_BRAND;
                            obj.APPLY_MATERIAL_SPEC = APPLY_MATERIAL_SPEC;
                            obj.APPLY_MATERIAL_UNIT = APPLY_MATERIAL_UNIT;
                            obj.APPLY_MATERIAL_NUM = APPLY_MATERIAL_NUM;
                            obj.APPLY_MEMO = APPLY_MEMO;

                            obj.SUPPLIER_ID = SUPPLIER_ID;
                            obj.MATERIAL_ID = MATERIAL_ID;

                            obj.BUY_MATERIAL_BRAND = BUY_MATERIAL_BRAND;
                            obj.BUY_MATERIAL_SPEC = BUY_MATERIAL_SPEC;
                            obj.BUY_MATERIAL_UNIT = BUY_MATERIAL_UNIT;
                            obj.MATERIAL_NUM = MATERIAL_NUM;
                            obj.BUY_NUM = BUY_NUM;
                            obj.STORE_NUM = STORE_NUM;
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
        findSgxx:function(){
            myjstools.ajax(true, "POST", "/web/service?METHOD=applyBuy_findById",{
                APPLYBUY_ID:vm_entry.APPLYBUY_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    vm_entry.APPLYBUY_SN = data.entity.APPLYBUY_SN;
                    vm_entry.PROJECT_NAME = data.entity.PROJECT_NAME;
                    vm_entry.PROJECT_ID = data.entity.PROJECT_ID;
                    vm_entry.APPLY_USER_NAME = data.entity.APPLY_NAME;
                    vm_entry.APPLY_DATE = data.entity.APPLY_DATE;
                    vm_entry.applyDetailList = [];
                    if(data.entity.itemList != null && data.entity.itemList != '' && data.entity.itemList != undefined){
                        vm_entry.applyDetailList = data.entity.itemList;
                    }
                } catch (e) {
                    //alert("login_res.error:出错了！" + e.message);
                }
            });
        },
        //切换申购
        changeApplyDetail:function(index){
            var obj = vm_entry.itemList[index];
            var APPLYBUY_DETAIL_ID = obj.APPLYBUY_DETAIL_ID;
            if(APPLYBUY_DETAIL_ID == null || APPLYBUY_DETAIL_ID == "" || APPLYBUY_DETAIL_ID == undefined){
                obj.APPLY_SYSTEM_NAME = "";
                obj.APPLY_MATERIAL_NAME = '';
                obj.APPLY_MATERIAL_BRAND = '';
                obj.APPLY_MATERIAL_SPEC = '';
                obj.APPLY_MATERIAL_UNIT = '';
                obj.APPLY_MATERIAL_NUM = '';
                obj.APPLY_MEMO = '';
            }else{
                if(vm_entry.applyDetailList == null || vm_entry.applyDetailList.length < 1){
                    return;
                }
                //循环遍历，获取对象
                for(var i = 0 ;i < vm_entry.applyDetailList.length; i ++){
                    if(APPLYBUY_DETAIL_ID = vm_entry.applyDetailList[i].APPLYBUY_DETAIL_ID){

                        obj.APPLY_SYSTEM_NAME = vm_entry.applyDetailList[i].SYSTEM_LABEL;
                        obj.APPLY_MATERIAL_NAME = vm_entry.applyDetailList[i].MATERIAL_NAME;
                        obj.APPLY_MATERIAL_BRAND = vm_entry.applyDetailList[i].MATERIAL_BRAND;
                        obj.APPLY_MATERIAL_SPEC = vm_entry.applyDetailList[i].MATERIAL_SPEC;
                        obj.APPLY_MATERIAL_UNIT = vm_entry.applyDetailList[i].MATERIAL_UNIT;
                        obj.APPLY_MATERIAL_NUM = vm_entry.applyDetailList[i].MATERIAL_NUM;
                        obj.APPLY_MEMO = vm_entry.applyDetailList[i].MEMO;
                    }
                }

            }
        },
        //增加一行
        addOne:function(){
            var obj = new Object();
            obj.APPLYBUY_DETAIL_ID = '';//申购细节ID
            obj.APPLY_SYSTEM_NAME = '';//申购细节ID
            obj.APPLY_MATERIAL_NAME = '';//
            obj.APPLY_MATERIAL_BRAND = '';
            obj.APPLY_MATERIAL_SPEC = '';
            obj.APPLY_MATERIAL_UNIT = '';
            obj.APPLY_MATERIAL_NUM = '';
            obj.APPLY_MEMO = '';

            obj.SUPPLIER_ID = '';
            obj.MATERIAL_ID = '';
            obj.BUY_MATERIAL_BRAND = '';
            obj.BUY_MATERIAL_SPEC = '';
            obj.BUY_MATERIAL_UNIT = '';

            vm_entry.itemList.push(obj)
        },
        deleteThis: function (index) {
            swal({
                title: "",
                text: "确认删除这条采购信息？",
                type: "warning",
                showCancelButton: true,
                cancelButtonColor: '#d33',
                confirmButtonColor: '#1f91f3',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                vm_entry.itemList.splice(index, 1);
                swal("删除!", "选中的这条采购信息已被删除！", "success")
            });
        },
        cancel:function(){
            window.location.reload();
        }
    },

});

$(function(){
    //进入页面就会有了 APPLYBUY_ID 了，获取该申购的详情
    var APPLYBUY_ID = $("#APPLYBUY_ID").val();
    if(APPLYBUY_ID != null && APPLYBUY_ID != '' && APPLYBUY_ID != undefined){
        //获取申购信息
        vm_entry.APPLYBUY_ID = APPLYBUY_ID;
        vm_entry.findSgxx();
    }

    if(vm_entry.type == 'save'){//如果新增
        vm_entry.BUY_USER_NAME = $("#user_name").val();
        vm_entry.BUY_DATE = $("#now_date").val();
    }
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
    var item = vm_entry.itemList[index];
    item.BUY_MATERIAL_BRAND = MATERIAL_BRAND;
    item.BUY_MATERIAL_SPEC = MATERIAL_SPEC;
    item.BUY_MATERIAL_UNIT = MATERIAL_UNIT;
    item.MATERIAL_ID = MATERIAL_ID;
    vm_entry.itemList[index] = item;
}

