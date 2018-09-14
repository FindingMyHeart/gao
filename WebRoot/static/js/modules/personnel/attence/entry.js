var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        STAFF_ID:'',//用户ID
        STAFF_NAME:'',//姓名
        STAFF_CODE:'',//职员编号
        DEPT_NAME:'',//部门名称
        POST_NAME:'',//职位

        JIABAN_START_DATE:'',//加班开始时间
        JIABAN_END_DATE:'',//加班结束时间
        JIABAN_REASON:'',//加班原因

        TIAOXIU_START_DATE:'',//调休开始日期
        TIAOXIU_END_DATE:'',//调休结束日期
        TIAOXIU_REASON:'',//调休原因

        QINGJIA_TYPE:'',//请假类别（系统内部选取：婚嫁/事假/丧家/产假/陪产假/年假/病假，请年假可以减少系统中剩余年假时间，其他请假不计算其中）
        QINGJIA_START_DATE:'',//请假开始时间
        QINGJIA_END_DATE:'',//请假结束时间
        QINGJIA_REASON:'',//请假原因

        STATUS:'',//状态  1：  2：  3：
        type:'save',//页面类型  save 保存  edit 修改
        attence_type:'',//变动类型
        attence_name:'',//变动名称
        in_type:'',//进入类型
        ATTENCE_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            if(vm_entry.type == "save"){

                var data = new Object();
                if(vm_entry.attence_type == '1'){
                    data.STAFF_ID = vm_entry.STAFF_ID;
                    data.ATTENCE_TYPE = vm_entry.attence_type;
                    data.JIABAN_START_DATE = vm_entry.JIABAN_START_DATE;
                    data.JIABAN_END_DATE = vm_entry.JIABAN_END_DATE;
                    data.JIABAN_REASON = vm_entry.JIABAN_REASON;
                }

                if(vm_entry.attence_type == '2'){
                    data.STAFF_ID = vm_entry.STAFF_ID;
                    data.ATTENCE_TYPE = vm_entry.attence_type;
                    data.TIAOXIU_START_DATE = vm_entry.TIAOXIU_START_DATE;
                    data.TIAOXIU_END_DATE = vm_entry.TIAOXIU_END_DATE;
                    data.TIAOXIU_REASON = vm_entry.TIAOXIU_REASON;
                }

                    if(vm_entry.attence_type == '3'){
                    data.STAFF_ID = vm_entry.STAFF_ID;
                    data.ATTENCE_TYPE = vm_entry.attence_type;
                    data.QINGJIA_TYPE = vm_entry.QINGJIA_TYPE;
                    data.QINGJIA_START_DATE = vm_entry.QINGJIA_START_DATE;
                    data.QINGJIA_END_DATE = vm_entry.QINGJIA_END_DATE;
                    data.QINGJIA_REASON = vm_entry.QINGJIA_REASON;
                }

                myjstools.ajax(false, "POST", "/web/service?METHOD=staffAttence_save",data, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'保存成功！',
                            text: '',
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

                var data = new Object();
                if(vm_entry.attence_type == '1'){
                    data.STAFF_ID = vm_entry.STAFF_ID;
                    data.ATTENCE_TYPE = vm_entry.attence_type;
                    data.JIABAN_START_DATE = vm_entry.JIABAN_START_DATE;
                    data.JIABAN_END_DATE = vm_entry.JIABAN_END_DATE;
                    data.JIABAN_REASON = vm_entry.JIABAN_REASON;
                }

                if(vm_entry.attence_type == '2'){
                    data.STAFF_ID = vm_entry.STAFF_ID;
                    data.ATTENCE_TYPE = vm_entry.attence_type;
                    data.TIAOXIU_START_DATE = vm_entry.TIAOXIU_START_DATE;
                    data.TIAOXIU_END_DATE = vm_entry.TIAOXIU_END_DATE;
                    data.TIAOXIU_REASON = vm_entry.TIAOXIU_REASON;
                }

                if(vm_entry.attence_type == '3'){
                    data.STAFF_ID = vm_entry.STAFF_ID;
                    data.ATTENCE_TYPE = vm_entry.attence_type;
                    data.QINGJIA_TYPE = vm_entry.QINGJIA_TYPE;
                    data.QINGJIA_END_DATE = vm_entry.QINGJIA_END_DATE;
                    data.QINGJIA_REASON = vm_entry.QINGJIA_REASON;
                }

                data.ATTENCE_ID = vm_entry.ATTENCE_ID;

                myjstools.ajax(false, "POST", "/web/service?METHOD=staffAttence_edit",data, function(data){
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=staffAttence_findById",{
                ATTENCE_ID:vm_entry.ATTENCE_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.STAFF_ID != null && data.entity.STAFF_ID != '' && data.entity.STAFF_ID != undefined){
                        vm_entry.STAFF_ID = data.entity.STAFF_ID;
                    }
                    if(data.entity.STAFF_NAME != null && data.entity.STAFF_NAME != '' && data.entity.STAFF_NAME != undefined){
                        vm_entry.STAFF_NAME = data.entity.STAFF_NAME;
                    }
                    if(data.entity.STAFF_CODE != null && data.entity.STAFF_CODE != '' && data.entity.STAFF_CODE != undefined){
                        vm_entry.STAFF_CODE = data.entity.STAFF_CODE;
                    }
                    if(data.entity.DEPT_NAME != null && data.entity.DEPT_NAME != '' && data.entity.DEPT_NAME != undefined){
                        vm_entry.DEPT_NAME = data.entity.DEPT_NAME;
                    }
                    if(data.entity.POST_NAME != null && data.entity.POST_NAME != '' && data.entity.POST_NAME != undefined){
                        vm_entry.POST_NAME = data.entity.POST_NAME;
                    }
                    if(data.entity.ATTENCE_TYPE != null && data.entity.ATTENCE_TYPE != '' && data.entity.ATTENCE_TYPE != undefined){
                        vm_entry.attence_type = data.entity.ATTENCE_TYPE;
                    }


                    if(data.entity.JIABAN_START_DATE != null && data.entity.JIABAN_START_DATE != '' && data.entity.JIABAN_START_DATE != undefined){
                        vm_entry.JIABAN_START_DATE = data.entity.JIABAN_START_DATE;
                    }
                    if(data.entity.JIABAN_END_DATE != null && data.entity.JIABAN_END_DATE != '' && data.entity.JIABAN_END_DATE != undefined){
                        vm_entry.JIABAN_END_DATE = data.entity.JIABAN_END_DATE;
                    }
                    if(data.entity.JIABAN_REASON != null && data.entity.JIABAN_REASON != '' && data.entity.JIABAN_REASON != undefined){
                        vm_entry.JIABAN_REASON = data.entity.JIABAN_REASON;
                    }

                    if(data.entity.TIAOXIU_START_DATE != null && data.entity.TIAOXIU_START_DATE != '' && data.entity.TIAOXIU_START_DATE != undefined){
                        vm_entry.TIAOXIU_START_DATE = data.entity.TIAOXIU_START_DATE;
                    }
                    if(data.entity.TIAOXIU_END_DATE != null && data.entity.TIAOXIU_END_DATE != '' && data.entity.TIAOXIU_END_DATE != undefined){
                        vm_entry.TIAOXIU_END_DATE = data.entity.TIAOXIU_END_DATE;
                    }
                    if(data.entity.TIAOXIU_REASON != null && data.entity.TIAOXIU_REASON != '' && data.entity.TIAOXIU_REASON != undefined){
                        vm_entry.TIAOXIU_REASON = data.entity.TIAOXIU_REASON;
                    }

                    if(data.entity.QINGJIA_TYPE != null && data.entity.QINGJIA_TYPE != '' && data.entity.QINGJIA_TYPE != undefined){
                        vm_entry.QINGJIA_TYPE = data.entity.QINGJIA_TYPE;
                    }
                    if(data.entity.QINGJIA_START_DATE != null && data.entity.QINGJIA_START_DATE != '' && data.entity.QINGJIA_START_DATE != undefined){
                        vm_entry.QINGJIA_START_DATE = data.entity.QINGJIA_START_DATE;
                    }
                    if(data.entity.QINGJIA_END_DATE != null && data.entity.QINGJIA_END_DATE != '' && data.entity.QINGJIA_END_DATE != undefined){
                        vm_entry.QINGJIA_END_DATE = data.entity.QINGJIA_END_DATE;
                    }
                    if(data.entity.QINGJIA_REASON != null && data.entity.QINGJIA_REASON != '' && data.entity.QINGJIA_REASON != undefined){
                        vm_entry.QINGJIA_REASON = data.entity.QINGJIA_REASON;
                    }


                } catch (e) {
                    //alert("login_res.error:出错了！" + e.message);
                }
            });
        }
    },
    watch:{
        STAFF_ID:function(new_val,old_val){

        }
    }
});


$(function(){
    $('#JIABAN_START_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('#JIABAN_END_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('#TIAOXIU_START_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('#TIAOXIU_END_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('#QINGJIA_START_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('#QINGJIA_END_DATE').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }

    if(vm_entry.attence_type == '1'){
        vm_entry.attence_name = "加班确认";
    } else if(vm_entry.attence_type == '2'){
        vm_entry.attence_name = "调休申请";
    } else if(vm_entry.attence_type == '3'){
        vm_entry.attence_name = "请假申请";
    }


});

