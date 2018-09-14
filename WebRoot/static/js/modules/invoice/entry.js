/**
 * Created by 11029 on 2018/4/30.
 */

var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        INVOICE_ID:'',//主键ID
        COMPANY_NAME:'',//单位名称
        INVOICE_NAME:'',//开票名称
        SOCIAL_CODE:'',//社会统一信用代码证
        OPEN_BANK:'',//开户行
        BANK_ACCOUNT:'',//账号
        TEL:'',//电话
        ADDRESS:'',//地址
        MEMO:'',//备注
        type:'save'//页面类型  save 保存  edit 修改
    },
    methods:{
        //保存
        save:function(){
            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=invoice_save",{
                    COMPANY_NAME:vm_entry.COMPANY_NAME,//单位名称
                    INVOICE_NAME:vm_entry.INVOICE_NAME,//开票名称
                    SOCIAL_CODE:vm_entry.SOCIAL_CODE,//社会统一信用代码证
                    OPEN_BANK:vm_entry.OPEN_BANK,//开户行
                    BANK_ACCOUNT:vm_entry.BANK_ACCOUNT,//账号
                    TEL:vm_entry.TEL,//电话
                    ADDRESS:vm_entry.ADDRESS,//地址
                    MEMO:vm_entry.MEMO,//备注
                }, function(data){
                    try {
                        if (data.success != 1) {
                            alert(data.msg);
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
            } else if (vm_entry.type == "edit"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=invoice_edit",{
                    INVOICE_ID:vm_entry.INVOICE_ID,//主键ID
                    COMPANY_NAME:vm_entry.COMPANY_NAME,//单位名称
                    INVOICE_NAME:vm_entry.INVOICE_NAME,//开票名称
                    SOCIAL_CODE:vm_entry.SOCIAL_CODE,//社会统一信用代码证
                    OPEN_BANK:vm_entry.OPEN_BANK,//开户行
                    BANK_ACCOUNT:vm_entry.BANK_ACCOUNT,//账号
                    TEL:vm_entry.TEL,//电话
                    ADDRESS:vm_entry.ADDRESS,//地址
                    MEMO:vm_entry.MEMO,//备注
                }, function(data){
                    try {
                        if (data.success != 1) {
                            alert(data.msg);
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=invoice_findById",{
                INVOICE_ID:vm_entry.INVOICE_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.COMPANY_NAME != null && data.entity.COMPANY_NAME != '' && data.entity.COMPANY_NAME != undefined){
                        vm_entry.COMPANY_NAME = data.entity.COMPANY_NAME;
                        $("#company_name").parent().addClass("focused");
                    }
                    if(data.entity.INVOICE_NAME != null && data.entity.INVOICE_NAME != '' && data.entity.INVOICE_NAME != undefined){
                        vm_entry.INVOICE_NAME = data.entity.INVOICE_NAME;
                        $("#invoice_name").parent().addClass("focused");
                    }
                    if(data.entity.SOCIAL_CODE != null && data.entity.SOCIAL_CODE != '' && data.entity.SOCIAL_CODE != undefined){
                        vm_entry.SOCIAL_CODE = data.entity.SOCIAL_CODE;
                        $("#social_code").parent().addClass("focused");
                    }
                    if(data.entity.OPEN_BANK != null && data.entity.OPEN_BANK != '' && data.entity.OPEN_BANK != undefined){
                        vm_entry.OPEN_BANK = data.entity.OPEN_BANK;
                        $("#open_bank").parent().addClass("focused");
                    }
                    if(data.entity.BANK_ACCOUNT != null && data.entity.BANK_ACCOUNT != '' && data.entity.BANK_ACCOUNT != undefined){
                        vm_entry.BANK_ACCOUNT = data.entity.BANK_ACCOUNT;
                        $("#bank_account").parent().addClass("focused");
                    }
                    if(data.entity.ADDRESS != null && data.entity.ADDRESS != '' && data.entity.ADDRESS != undefined){
                        vm_entry.ADDRESS = data.entity.ADDRESS;
                        $("#address").parent().addClass("focused");
                    }
                    if(data.entity.TEL != null && data.entity.TEL != '' && data.entity.TEL != undefined){
                        vm_entry.TEL = data.entity.TEL;
                        $("#tel").parent().addClass("focused");
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

