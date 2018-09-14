/**
 * Created by 11029 on 2018/4/30.
 */

var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        DAILY_ID:'',//主键ID
        TODAY_CONTENT:'',//今日内容
        TOMORROW_PLAN:'',//明日计划
        type:'',//类型
        DAILY_TYPE:'',//日志类型  1 日报  2 周报 3 月报

        V_STAFF_NAME:'',
        V_STAFF_CODE:'',
        V_DEPT_NAME:'',
        V_POST_NAME:'',
        V_TX_DATE:'',

        NAME1:'',//今
        NAME2:'',//明
    },
    methods: {
        //保存
        save: function () {

            if(vm_entry.type == "save"){
                //客户名称为必填项
                if (vm_entry.TODAY_CONTENT == null
                    || vm_entry.TODAY_CONTENT == ""
                    || vm_entry.TODAY_CONTENT == undefined) {
                    swal("请输入" + vm_entry.NAME1 + "！");
                    return false;
                }
                if (vm_entry.TOMORROW_PLAN == null
                    || vm_entry.TOMORROW_PLAN == ""
                    || vm_entry.TOMORROW_PLAN == undefined) {
                    swal("请输入" + vm_entry.NAME2 + "！");
                    return false;
                }

                myjstools.ajax(false, "POST", "/web/service?METHOD=daily_save", {
                    DAILY_TYPE: vm_entry.DAILY_TYPE,//报告类型
                    TODAY_CONTENT: vm_entry.TODAY_CONTENT,//今日内容
                    TOMORROW_PLAN: vm_entry.TOMORROW_PLAN,//明日计划
                }, function (data) {
                    try {
                        if (data.success != 1) {
                            swal({title: '', text: data.msg, type: 'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title: '',
                            text: '操作成功!',
                            type: 'success'
                        }, function () {
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
            }else if(vm_entry.type == "edit"){
                //客户名称为必填项
                if (vm_entry.TODAY_CONTENT == null
                    || vm_entry.TODAY_CONTENT == ""
                    || vm_entry.TODAY_CONTENT == undefined) {
                    swal("请输入今日内容！");
                    return false;
                }
                if (vm_entry.TOMORROW_PLAN == null
                    || vm_entry.TOMORROW_PLAN == ""
                    || vm_entry.TOMORROW_PLAN == undefined) {
                    swal("请输入明日计划！");
                    return false;
                }

                myjstools.ajax(false, "POST", "/web/service?METHOD=daily_edit", {
                    DAILY_TYPE: vm_entry.DAILY_TYPE,//报告类型
                    TODAY_CONTENT: vm_entry.TODAY_CONTENT,//今日内容
                    TOMORROW_PLAN: vm_entry.TOMORROW_PLAN,//明日计划
                    DAILY_ID:DAILY_ID//主键ID
                }, function (data) {
                    try {
                        if (data.success != 1) {
                            swal({title: '', text: data.msg, type: 'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title: '',
                            text: '操作成功!',
                            type: 'success'
                        }, function () {
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
            }
        },
        cancel:function(){
            window.location.reload();
        },
        findInfo:function(){
            myjstools.ajax(false, "POST", "/web/service?METHOD=daily_findById",{
                DAILY_ID:$("#DAILY_ID").val()
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.STAFF_NAME != null && data.entity.STAFF_NAME != '' && data.entity.STAFF_NAME != undefined){
                        vm_entry.V_STAFF_NAME = data.entity.STAFF_NAME;
                        // $("#V_STAFF_NAME").parent().addClass("focused");
                    }
                    if(data.entity.STAFF_CODE != null && data.entity.STAFF_CODE != '' && data.entity.STAFF_CODE != undefined){
                        vm_entry.V_STAFF_CODE = data.entity.STAFF_CODE;
                        // $("#V_STAFF_CODE").parent().addClass("focused");
                    }
                    if(data.entity.DEPT_NAME != null && data.entity.DEPT_NAME != '' && data.entity.DEPT_NAME != undefined){
                        vm_entry.V_DEPT_NAME = data.entity.DEPT_NAME;
                        // $("#V_DEPT_NAME").parent().addClass("focused");
                    }
                    if(data.entity.POST_NAME != null && data.entity.POST_NAME != '' && data.entity.POST_NAME != undefined){
                        vm_entry.V_POST_NAME = data.entity.POST_NAME;
                        // $("#V_POST_NAME").parent().addClass("focused");
                    }
                    if(data.entity.TX_DATE != null && data.entity.TX_DATE != '' && data.entity.TX_DATE != undefined){
                        vm_entry.V_TX_DATE = data.entity.TX_DATE;
                        // $("#V_TX_DATE").parent().addClass("focused");
                    }
                    if(data.entity.TODAY_CONTENT != null && data.entity.TODAY_CONTENT != '' && data.entity.TODAY_CONTENT != undefined){
                        vm_entry.TODAY_CONTENT = data.entity.TODAY_CONTENT;
                        // $("#V_TX_DATE").parent().addClass("focused");
                    }
                    if(data.entity.TOMORROW_PLAN != null && data.entity.TOMORROW_PLAN != '' && data.entity.TOMORROW_PLAN != undefined){
                        vm_entry.TOMORROW_PLAN = data.entity.TOMORROW_PLAN;
                        // $("#V_TX_DATE").parent().addClass("focused");
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
    if(vm_entry.DAILY_TYPE == '1'){
        vm_entry.NAME1 = "今日工作内容";
        vm_entry.NAME2 = "明日工作内容";
    } else if(vm_entry.DAILY_TYPE == '2'){
        vm_entry.NAME1 = "本周工作内容";
        vm_entry.NAME2 = "下周工作内容";
    } else if(vm_entry.DAILY_TYPE == '3'){
        vm_entry.NAME1 = "本月工作内容";
        vm_entry.NAME2 = "下月工作内容";
    }


});

