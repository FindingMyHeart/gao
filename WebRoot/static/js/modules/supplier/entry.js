/**
 * Created by 11029 on 2018/4/30.
 */

var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        SUPPLIER_NAME:'',//供应商名称
        SUPPLIER_PROPERTY:'',//性质
        MAIN_BRAND:'',//主营品牌
        LINK_MAN:'',//联系人（可添加多个）
        POSITION:'',//职务
        TEL:'',//电话（可添加多个）
        MAIL:'',//邮箱
        ADDRESS:'',//地址
        BUSINESS_SCOPE:'',//经营范围
        ACCOUNT_INFO:'',//账号信息
        MEMO:'',//备注
        type:'save',//页面类型  save 保存  edit 修改
        SUPPLIER_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            //客户名称为必填项
            if(vm_entry.SUPPLIER_NAME == null
                ||vm_entry.SUPPLIER_NAME == ""
                ||vm_entry.SUPPLIER_NAME == undefined){
                alert("请输入供应商名称！");
                return false;
            }
            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=supplier_save",{
                    SUPPLIER_NAME:vm_entry.SUPPLIER_NAME,//供应商名称
                    SUPPLIER_PROPERTY:vm_entry.SUPPLIER_PROPERTY,//性质
                    MAIN_BRAND:vm_entry.MAIN_BRAND,//主营品牌
                    LINK_MAN:vm_entry.LINK_MAN,//联系人（可添加多个）
                    POSITION:vm_entry.POSITION,//职务
                    TEL:vm_entry.TEL,//电话（可添加多个）
                    MAIL:vm_entry.MAIL,//邮箱
                    ADDRESS:vm_entry.ADDRESS,//地址
                    BUSINESS_SCOPE:vm_entry.BUSINESS_SCOPE,//经营范围
                    ACCOUNT_INFO:vm_entry.ACCOUNT_INFO,//账号信息
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=supplier_edit",{
                    SUPPLIER_NAME:vm_entry.SUPPLIER_NAME,//供应商名称
                    SUPPLIER_PROPERTY:vm_entry.SUPPLIER_PROPERTY,//性质
                    MAIN_BRAND:vm_entry.MAIN_BRAND,//主营品牌
                    LINK_MAN:vm_entry.LINK_MAN,//联系人（可添加多个）
                    POSITION:vm_entry.POSITION,//职务
                    TEL:vm_entry.TEL,//电话（可添加多个）
                    MAIL:vm_entry.MAIL,//邮箱
                    ADDRESS:vm_entry.ADDRESS,//地址
                    BUSINESS_SCOPE:vm_entry.BUSINESS_SCOPE,//经营范围
                    ACCOUNT_INFO:vm_entry.ACCOUNT_INFO,//账号信息
                    MEMO:vm_entry.MEMO,//备注
                    SUPPLIER_ID:vm_entry.SUPPLIER_ID,//主键ID
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=supplier_findById",{
                SUPPLIER_ID:vm_entry.SUPPLIER_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.SUPPLIER_NAME != null && data.entity.SUPPLIER_NAME != '' && data.entity.SUPPLIER_NAME != undefined){
                        vm_entry.SUPPLIER_NAME = data.entity.SUPPLIER_NAME;
                        $("#supplier_name").parent().addClass("focused");
                    }
                    if(data.entity.SUPPLIER_PROPERTY != null && data.entity.SUPPLIER_PROPERTY != '' && data.entity.SUPPLIER_PROPERTY != undefined){
                        vm_entry.SUPPLIER_PROPERTY = data.entity.SUPPLIER_PROPERTY;
                        $("#supplier_property").parent().addClass("focused");
                    }
                    if(data.entity.MAIN_BRAND != null && data.entity.MAIN_BRAND != '' && data.entity.MAIN_BRAND != undefined){
                        vm_entry.MAIN_BRAND = data.entity.MAIN_BRAND;
                        $("#main_brand").parent().addClass("focused");
                    }
                    if(data.entity.LINK_MAN != null && data.entity.LINK_MAN != '' && data.entity.LINK_MAN != undefined){
                        vm_entry.LINK_MAN = data.entity.LINK_MAN;
                        $("#link_man").parent().addClass("focused");
                    }
                    if(data.entity.TEL != null && data.entity.TEL != '' && data.entity.TEL != undefined){
                        vm_entry.TEL = data.entity.TEL;
                        $("#tel").parent().addClass("focused");
                    }
                    if(data.entity.POSITION != null && data.entity.POSITION != '' && data.entity.POSITION != undefined){
                        vm_entry.POSITION = data.entity.POSITION;
                        $("#position").parent().addClass("focused");
                    }
                    if(data.entity.MAIL != null && data.entity.MAIL != '' && data.entity.MAIL != undefined){
                        vm_entry.MAIL = data.entity.MAIL;
                        $("#mail").parent().addClass("focused");
                    }
                    if(data.entity.ADDRESS != null && data.entity.ADDRESS != '' && data.entity.ADDRESS != undefined){
                        vm_entry.ADDRESS = data.entity.ADDRESS;
                        $("#address").parent().addClass("focused");
                    }
                    if(data.entity.BUSINESS_SCOPE != null && data.entity.BUSINESS_SCOPE != '' && data.entity.BUSINESS_SCOPE != undefined){
                        vm_entry.BUSINESS_SCOPE = data.entity.BUSINESS_SCOPE;
                        $("#business_scope").parent().addClass("focused");
                    }
                    if(data.entity.ACCOUNT_INFO != null && data.entity.ACCOUNT_INFO != '' && data.entity.ACCOUNT_INFO != undefined){
                        vm_entry.ACCOUNT_INFO = data.entity.ACCOUNT_INFO;
                        $("#account_info").parent().addClass("focused");
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

