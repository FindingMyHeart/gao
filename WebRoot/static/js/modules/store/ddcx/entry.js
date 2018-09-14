var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        IO_FLAG:'',//入库类型
        JIEHUO_PERSON:'',//接货人
        SHENHE_PERSON:'',//审核人
        JINGSHOU_PERSON:'',//经手人
        PROJECT_ID:'',//项目ID
        itemList:[],//库存明细列表
    },
    methods: {
        //保存
        save: function () {
            myjstools.ajax(false, "POST", "/web/service?METHOD=ccdd_save", {
                IO_FLAG: vm_entry.IO_FLAG,//入库类型
                JIEHUO_PERSON: vm_entry.JIEHUO_PERSON,//接货人
                SHENHE_PERSON: vm_entry.SHENHE_PERSON,//审核人
                JINGSHOU_PERSON: vm_entry.JINGSHOU_PERSON,//经手人
                PROJECT_ID: vm_entry.PROJECT_ID,//项目ID
                JIEHUO_PERSON: vm_entry.JIEHUO_PERSON,//接货人
                itemList: JSON.stringify(vm_entry.itemList),//库位联系人
            }, function (data) {
                try {
                    if (data.success != 1) {
                        swal({title: '', text: data.msg, type: 'error'});
                        return false;
                    }
                    //保存成功
                    swal({
                        title: "保存成功！",
                        text: '订单号：<span style="color:red">'+data.entity.ORDER_NO+'</span>。',
                        html: true
                    }, function () {
                        window.location.reload();
                    });
                } catch (e) {
                    //alert("login_res.error:出错了！" + e.message);
                }
            });

        },
        addOne: function () {
            var obj = new Object();
            vm_entry.itemList.push(obj)
        },
        deleteThis: function (index) {
            vm_entry.itemList.splice(index, 1);
        },
        cancel:function(){
            window.location.reload();
        }
    }
});

//onChange

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

