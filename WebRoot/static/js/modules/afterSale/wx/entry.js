/**
 * Created by 11029 on 2018/4/30.
 */

var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        PROJECT_ID:'',//项目id
        BAOXIU_PERSON:'',//报修人
        BAOXIU_PERSONTEL:'',//报修人电话
        BAOXIU_CONTENT:'',//保修内容
        BAOXIU_TIME:'',//保修时间
        BAOXIU_DATE:'',//保修日期
        personnelList:[],//维修人员列表
        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        REPAIR_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            //客户名称为必填项
            if(vm_entry.PROJECT_ID == null
                ||vm_entry.PROJECT_ID == ""
                ||vm_entry.PROJECT_ID == undefined){
                alert("请选择一个项目！");
                return false;
            }
            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=afterSaleRepair_save",{
                    PROJECT_ID:vm_entry.PROJECT_ID,
                    BAOXIU_PERSON:vm_entry.BAOXIU_PERSON,
                    BAOXIU_PERSONTEL:vm_entry.BAOXIU_PERSONTEL,
                    BAOXIU_CONTENT:vm_entry.BAOXIU_CONTENT,
                    personnelList: JSON.stringify(vm_entry.personnelList),//联系人列表
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'保存成功！',
                            text: '维修单号：<span style="color:red">'+data.entity.REPAIR_NO+'</span>。',
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=afterSaleRepair_edit",{
                    PROJECT_ID:vm_entry.PROJECT_ID,
                    BAOXIU_PERSON:vm_entry.BAOXIU_PERSON,
                    BAOXIU_PERSONTEL:vm_entry.BAOXIU_PERSONTEL,
                    BAOXIU_CONTENT:vm_entry.BAOXIU_CONTENT,
                    REPAIR_ID:vm_entry.REPAIR_ID,
                    personnelList: JSON.stringify(vm_entry.personnelList),//联系人列表
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=afterSaleRepair_findById",{
                REPAIR_ID:vm_entry.REPAIR_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.BAOXIU_DATE != null && data.entity.BAOXIU_DATE != '' && data.entity.BAOXIU_DATE != undefined){
                        vm_entry.BAOXIU_DATE = data.entity.BAOXIU_DATE;
                    }
                    if(data.entity.PROJECT_ID != null && data.entity.PROJECT_ID != '' && data.entity.PROJECT_ID != undefined){
                        vm_entry.PROJECT_ID = data.entity.PROJECT_ID;
                    }
                    if(data.entity.BAOXIU_PERSON != null && data.entity.BAOXIU_PERSON != '' && data.entity.BAOXIU_PERSON != undefined){
                        vm_entry.BAOXIU_PERSON = data.entity.BAOXIU_PERSON;
                    }
                    if(data.entity.BAOXIU_PERSONTEL != null && data.entity.BAOXIU_PERSONTEL != '' && data.entity.BAOXIU_PERSONTEL != undefined){
                        vm_entry.BAOXIU_PERSONTEL = data.entity.BAOXIU_PERSONTEL;
                    }
                    if(data.entity.BAOXIU_CONTENT != null && data.entity.BAOXIU_CONTENT != '' && data.entity.BAOXIU_CONTENT != undefined){
                        vm_entry.BAOXIU_CONTENT = data.entity.BAOXIU_CONTENT;
                    }
                    vm_entry.personnelList = [];

                    if(data.entity.personnelList != null && data.entity.personnelList.length > 0){
                        for(var i = 0 ;i < data.entity.personnelList.length ; i ++){
                            var PERSONNEL_NAME = data.entity.personnelList[i].PERSONNEL_NAME;
                            var PERSONNEL_TEL = data.entity.personnelList[i].PERSONNEL_TEL;
                            var MEMO = data.entity.personnelList[i].MEMO;
                            vm_entry.personnelList.push({PERSONNEL_NAME:PERSONNEL_NAME,PERSONNEL_TEL:PERSONNEL_TEL,MEMO:MEMO});
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
            vm_entry.personnelList.push(obj)
        },
        deleteThis: function (index) {
            vm_entry.personnelList.splice(index, 1);
        },
        cancel:function(){
            window.location.reload();
        }
    },

});

$(function(){
    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }

    
});

