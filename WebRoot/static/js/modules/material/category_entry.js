/**
 * Created by 11029 on 2018/5/13.
 */
var category_entry = new Vue({
    el:"#category_entry_body",
    data:{
        C_TYPE_CODE:'',
        C_TYPE_NAME:'',
        C_PID:'-1',//选择下级分类
        TYPE_ID:'',//主键ID
        type:'save'//页面类型  save 保存  edit 修改
    },
    methods:{
        //保存
        save:function(){
            if(category_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=materialCategory_save",{
                    TYPE_CODE:category_entry.C_TYPE_CODE,//类型编码
                    TYPE_NAME:category_entry.C_TYPE_NAME,//类型名称
                    PID:category_entry.C_PID,//所属类型
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
                            parent.vm.initTree();
                            // vm.initTable();
                            //修改
                        });
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            }else if(category_entry.type == "edit"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=materialCategory_edit",{
                    TYPE_CODE:category_entry.C_TYPE_CODE,//类型编码
                    TYPE_NAME:category_entry.C_TYPE_NAME,//类型名称
                    PID:category_entry.C_PID,//所属类型
                    TYPE_ID:category_entry.TYPE_ID,//ID
                }, function(data){
                    try {
                        if (data.success != 1) {
                            alert(data.msg);
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'',
                            text:'修改成功!',
                            type:'success'
                        },function () {
                            $("#entry_qx").click();
                            // vm.initTree();
                            parent.vm.initTree();
                            // vm.initTable();
                            //修改
                        });
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            }
        },
        findInfo:function(){
            myjstools.ajax(false, "POST", "/web/service?METHOD=materialCategory_findById",{
                TYPE_ID:category_entry.TYPE_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.TYPE_CODE != null && data.entity.TYPE_CODE != '' && data.entity.TYPE_CODE != undefined){
                        category_entry.C_TYPE_CODE = data.entity.TYPE_CODE;
                        $("#C_TYPE_CODE").parent().addClass("focused");
                    }
                    if(data.entity.TYPE_NAME != null && data.entity.TYPE_NAME != '' && data.entity.TYPE_NAME != undefined){
                        category_entry.C_TYPE_NAME = data.entity.TYPE_NAME;
                        $("#C_TYPE_NAME").parent().addClass("focused");
                    }
                    if(data.entity.PID != null && data.entity.PID != '' && data.entity.PID != undefined){
                        category_entry.C_PID = data.entity.PID;
                        $("#C_PID").parent().addClass("focused");
                    }
                } catch (e) {
                    //alert("login_res.error:出错了！" + e.message);
                }
            });
        }
    }
});

$(function(){
    if(category_entry.type == "save"){
        category_entry.C_PID = vm.SELECT_TYPE_ID;
    }

    if(category_entry.type == 'edit'){//如果修改,还需要初始化数据
        category_entry.findInfo();
    }
});