/**
 * Created by 11029 on 2018/4/30.
 */

var material_entry = new Vue({
    el:"#entry_body",
    data:{
        MATERIAL_CODE:'',//编码
        MATERIAL_TYPE:'',//所属分类
        MATERIAL_NAME:'',//名称
        MATERIAL_BRAND:'',//品牌
        MATERIAL_SPEC:'',//规格
        MATERIAL_UNIT:'',//单位
        MATERIAL_MEMO:'',//备注
        MATERIAL_ID:'',//主键ID
        type:'',//类型
    },
    methods:{
        //保存
        save:function(){
            //客户名称为必填项
            if(material_entry.MATERIAL_CODE == null
                ||material_entry.MATERIAL_CODE == ""
                ||material_entry.MATERIAL_CODE == undefined){
                swal("请输入物料编码！");
                return false;
            }
            if(material_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=material_save",{
                    MATERIAL_CODE:material_entry.MATERIAL_CODE,//编码
                    MATERIAL_TYPE:material_entry.MATERIAL_TYPE,//所属分类
                    MATERIAL_NAME:material_entry.MATERIAL_NAME,//名称
                    MATERIAL_BRAND:material_entry.MATERIAL_BRAND,//品牌
                    MATERIAL_SPEC:material_entry.MATERIAL_SPEC,//规格
                    MATERIAL_UNIT:material_entry.MATERIAL_UNIT,//单位
                    MATERIAL_MEMO:material_entry.MATERIAL_MEMO,//备注
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
            } else if(material_entry.type == "edit"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=material_edit",{
                    MATERIAL_CODE:material_entry.MATERIAL_CODE,//编码
                    MATERIAL_TYPE:material_entry.MATERIAL_TYPE,//所属分类
                    MATERIAL_NAME:material_entry.MATERIAL_NAME,//名称
                    MATERIAL_BRAND:material_entry.MATERIAL_BRAND,//品牌
                    MATERIAL_SPEC:material_entry.MATERIAL_SPEC,//规格
                    MATERIAL_UNIT:material_entry.MATERIAL_UNIT,//单位
                    MATERIAL_MEMO:material_entry.MATERIAL_MEMO,//备注
                    MATERIAL_ID:material_entry.MATERIAL_ID,//主键ID
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=material_findById",{
                MATERIAL_ID:material_entry.MATERIAL_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.MATERIAL_CODE != null && data.entity.MATERIAL_CODE != '' && data.entity.MATERIAL_CODE != undefined){
                        material_entry.MATERIAL_CODE = data.entity.MATERIAL_CODE;
                        $("#MATERIAL_CODE").parent().addClass("focused");
                    }
                    if(data.entity.MATERIAL_TYPE != null && data.entity.MATERIAL_TYPE != '' && data.entity.MATERIAL_TYPE != undefined){
                        material_entry.MATERIAL_TYPE = data.entity.MATERIAL_TYPE;
                        $("#MATERIAL_TYPE").parent().addClass("focused");
                    }
                    if(data.entity.MATERIAL_NAME != null && data.entity.MATERIAL_NAME != '' && data.entity.MATERIAL_NAME != undefined){
                        material_entry.MATERIAL_NAME = data.entity.MATERIAL_NAME;
                        $("#MATERIAL_NAME").parent().addClass("focused");
                    }
                    if(data.entity.MATERIAL_BRAND != null && data.entity.MATERIAL_BRAND != '' && data.entity.MATERIAL_BRAND != undefined){
                        material_entry.MATERIAL_BRAND = data.entity.MATERIAL_BRAND;
                        $("#MATERIAL_BRAND").parent().addClass("focused");
                    }
                    if(data.entity.MATERIAL_SPEC != null && data.entity.MATERIAL_SPEC != '' && data.entity.MATERIAL_SPEC != undefined){
                        material_entry.MATERIAL_SPEC = data.entity.MATERIAL_SPEC;
                        $("#MATERIAL_SPEC").parent().addClass("focused");
                    }
                    if(data.entity.MATERIAL_UNIT != null && data.entity.MATERIAL_UNIT != '' && data.entity.MATERIAL_UNIT != undefined){
                        material_entry.MATERIAL_UNIT = data.entity.MATERIAL_UNIT;
                        $("#MATERIAL_UNIT").parent().addClass("focused");
                    }
                    if(data.entity.MATERIAL_MEMO != null && data.entity.MATERIAL_MEMO != '' && data.entity.MATERIAL_MEMO != undefined){
                        material_entry.MATERIAL_MEMO = data.entity.MATERIAL_MEMO;
                        $("#MATERIAL_MEMO").parent().addClass("focused");
                    }
                } catch (e) {
                    //alert("login_res.error:出错了！" + e.message);
                }
            });
        }
    },

});

$(function(){
    if(material_entry.type == 'edit'){//如果修改,还需要初始化数据
        material_entry.findInfo();
    }
});

