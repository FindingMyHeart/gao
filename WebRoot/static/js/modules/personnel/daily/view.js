/**
 * Created by 11029 on 2018/4/30.
 */

var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        V_STAFF_NAME:'',
        V_STAFF_CODE:'',
        V_DEPT_NAME:'',
        V_POST_NAME:'',
        V_TX_DATE:'',
        V_TODAY_CONTENT:'',//今日内容
        V_TOMORROW_PLAN:'',//明日计划
        DAILY_ID:'',//主键ID
    },
    methods: {
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
                        $("#V_STAFF_NAME").parent().addClass("focused");
                    }
                    if(data.entity.STAFF_CODE != null && data.entity.STAFF_CODE != '' && data.entity.STAFF_CODE != undefined){
                        vm_entry.V_STAFF_CODE = data.entity.STAFF_CODE;
                        $("#V_STAFF_CODE").parent().addClass("focused");
                    }
                    if(data.entity.DEPT_NAME != null && data.entity.DEPT_NAME != '' && data.entity.DEPT_NAME != undefined){
                        vm_entry.V_DEPT_NAME = data.entity.DEPT_NAME;
                        $("#V_DEPT_NAME").parent().addClass("focused");
                    }
                    if(data.entity.POST_NAME != null && data.entity.POST_NAME != '' && data.entity.POST_NAME != undefined){
                        vm_entry.V_POST_NAME = data.entity.POST_NAME;
                        $("#V_POST_NAME").parent().addClass("focused");
                    }
                    if(data.entity.TX_DATE != null && data.entity.TX_DATE != '' && data.entity.TX_DATE != undefined){
                        vm_entry.V_TX_DATE = data.entity.TX_DATE;
                        $("#V_TX_DATE").parent().addClass("focused");
                    }
                    if(data.entity.TODAY_CONTENT != null && data.entity.TODAY_CONTENT != '' && data.entity.TODAY_CONTENT != undefined){
                        vm_entry.V_TODAY_CONTENT = data.entity.TODAY_CONTENT;
                        // $("#V_TX_DATE").parent().addClass("focused");
                    }
                    if(data.entity.TOMORROW_PLAN != null && data.entity.TOMORROW_PLAN != '' && data.entity.TOMORROW_PLAN != undefined){
                        vm_entry.V_TOMORROW_PLAN = data.entity.TOMORROW_PLAN;
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
    vm_entry.findInfo();
});

