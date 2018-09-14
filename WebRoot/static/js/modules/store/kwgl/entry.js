var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        LOCATION_NAME:'',//库位名称
        LOCATION_ADDRESS:'',//库位地址
        LOCATION_MAN:'',//库位联系人
        LOCATION_MANTEL:'',//负责人电话
        MEMO:'',//备注
        type:'save',//页面类型  save 保存  edit 修改
        LOCATION_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            //客户名称为必填项
            if(vm_entry.LOCATION_NAME == null
                ||vm_entry.LOCATION_NAME == ""
                ||vm_entry.LOCATION_NAME == undefined){
                alert("请输入库位名称！");
                return false;
            }
            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=kwgl_save",{
                    LOCATION_NAME:vm_entry.LOCATION_NAME,//库位名称
                    LOCATION_ADDRESS:vm_entry.LOCATION_ADDRESS,//库位地址
                    LOCATION_MAN:vm_entry.LOCATION_MAN,//库位联系人
                    LOCATION_MANTEL:vm_entry.LOCATION_MANTEL,//负责人电话
                    MEMO:vm_entry.MEMO,//备注
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=kwgl_edit",{
                    LOCATION_NAME:vm_entry.LOCATION_NAME,//库位名称
                    LOCATION_ADDRESS:vm_entry.LOCATION_ADDRESS,//库位地址
                    LOCATION_MAN:vm_entry.LOCATION_MAN,//库位联系人
                    LOCATION_MANTEL:vm_entry.LOCATION_MANTEL,//负责人电话
                    MEMO:vm_entry.MEMO,//备注
                    LOCATION_ID:vm_entry.LOCATION_ID,//主键ID
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=kwgl_findById",{
                LOCATION_ID:vm_entry.LOCATION_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.LOCATION_NAME != null && data.entity.LOCATION_NAME != '' && data.entity.LOCATION_NAME != undefined){
                        vm_entry.LOCATION_NAME = data.entity.LOCATION_NAME;
                        $("#location_name").parent().addClass("focused");
                    }
                    if(data.entity.LOCATION_ADDRESS != null && data.entity.LOCATION_ADDRESS != '' && data.entity.LOCATION_ADDRESS != undefined){
                        vm_entry.LOCATION_ADDRESS = data.entity.LOCATION_ADDRESS;
                        $("#location_address").parent().addClass("focused");
                    }
                    if(data.entity.LOCATION_MAN != null && data.entity.LOCATION_MAN != '' && data.entity.LOCATION_MAN != undefined){
                        vm_entry.LOCATION_MAN = data.entity.LOCATION_MAN;
                        $("#location_man").parent().addClass("focused");
                    }
                    if(data.entity.LOCATION_MANTEL != null && data.entity.LOCATION_MANTEL != '' && data.entity.LOCATION_MANTEL != undefined){
                        vm_entry.LOCATION_MANTEL = data.entity.LOCATION_MANTEL;
                        $("#location_mantel").parent().addClass("focused");
                    }
                    if(data.entity.MEMO != null && data.entity.MEMO != '' && data.entity.MEMO != undefined){
                        vm_entry.MEMO = data.entity.MEMO;
                        $("#memo").parent().addClass("focused");
                    }
                } catch (e) {
                    //alert("login_res.error:出错了！" + e.message);
                }
            });
        }
    },

});

$(function(){
    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }
});

