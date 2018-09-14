/**
 * Created by 11029 on 2018/4/30.
 */
var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        CLIENT_ID:'',//主键ID
        CLIENT_NAME:'',
        CLIENT_TEL:'',
        CLIENT_ADDRESS:'',
        CLIENT_MAIL:'',
        MEMO:'',
        JDSJ:'',//建档时间
        type:'save'//页面类型  save 保存  edit 修改
    },
    methods:{
        save:function(dialog){
            vm_entry.CLIENT_NAME = $("#client_name").val();
            vm_entry.CLIENT_TEL = $("#client_tel").val();
            vm_entry.CLIENT_ADDRESS = $("#client_address").val();
            vm_entry.CLIENT_MAIL = $("#client_mail").val();
            vm_entry.MEMO = $("#memo").val();
            //客户名称为必填项
            if(vm_entry.CLIENT_NAME == null
                ||vm_entry.CLIENT_NAME == ""
                ||vm_entry.CLIENT_NAME == undefined){
                swal({title:'',text:'请输入客户名称!',type:'warning'});
                return false;
            }
            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=customer_save",{
                    CLIENT_NAME:vm_entry.CLIENT_NAME,
                    CLIENT_TEL:vm_entry.CLIENT_TEL,
                    CLIENT_ADDRESS:vm_entry.CLIENT_ADDRESS,
                    CLIENT_MAIL:vm_entry.CLIENT_MAIL,
                    MEMO:vm_entry.MEMO
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
            }else if(vm_entry.type == "edit"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=customer_edit",{
                    CLIENT_ID:vm_entry.CLIENT_ID,
                    CLIENT_NAME:vm_entry.CLIENT_NAME,
                    CLIENT_TEL:vm_entry.CLIENT_TEL,
                    CLIENT_ADDRESS:vm_entry.CLIENT_ADDRESS,
                    CLIENT_MAIL:vm_entry.CLIENT_MAIL,
                    MEMO:vm_entry.MEMO
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=customer_findById",{
                CLIENT_ID:vm_entry.CLIENT_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.JDSJ != null && data.entity.JDSJ != '' && data.entity.JDSJ != undefined){
                        vm_entry.JDSJ = data.entity.JDSJ;
                    }
                    if(data.entity.CLIENT_NAME != null && data.entity.CLIENT_NAME != '' && data.entity.CLIENT_NAME != undefined){
                        vm_entry.CLIENT_NAME = data.entity.CLIENT_NAME;
                        $("#client_name").parent().addClass("focused");
                    }
                    if(data.entity.CLIENT_TEL != null && data.entity.CLIENT_TEL != '' && data.entity.CLIENT_TEL != undefined){
                        vm_entry.CLIENT_TEL = data.entity.CLIENT_TEL;
                        $("#client_tel").parent().addClass("focused");
                    }
                    if(data.entity.CLIENT_ADDRESS != null && data.entity.CLIENT_ADDRESS != '' && data.entity.CLIENT_ADDRESS != undefined){
                        vm_entry.CLIENT_ADDRESS = data.entity.CLIENT_ADDRESS;
                        $("#client_address").parent().addClass("focused");
                    }
                    if(data.entity.CLIENT_MAIL != null && data.entity.CLIENT_MAIL != '' && data.entity.CLIENT_MAIL != undefined){
                        vm_entry.CLIENT_MAIL = data.entity.CLIENT_MAIL;
                        $("#client_mail").parent().addClass("focused");
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
    }
});


$(function(){
    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }
});
