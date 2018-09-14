var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        ASSET_NAME:'',//资产名称
        ASSET_CODE:'',//资产编码
        ASSET_TYPE:'',//资产类别
        BUY_TIME:'',//购入时间
        SALVAGE_VALUE:'',//残值折旧
        ASSET_BRAND:'',//品牌
        ASSET_SPEC:'',//规格
        ASSET_UNIT:'',//单位
        ASSET_NUM:'',//数量
        BELONG_USERID:'',//所属人
        BELONG_DEPTID:'',//所属部门
        ASSET_MEMO:'',//资产描述
        STATUS:'',//状态 1：正常、2：报废、3：变卖、4：丢失
        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        RESOURCEIDS:'',//文件的主键ID
        ASSET_ID:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            var ATTACHMENT = "";
            $(":input[name = 'resources']").each(function(i){
                if (i == 0){
                    ATTACHMENT += $(this).val();
                } else {
                    ATTACHMENT += "," + $(this).val();
                }
            });
            vm_entry.RESOURCEIDS = ATTACHMENT;

            if(vm_entry.type == "save"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=asset_save",{
                    ASSET_NAME:vm_entry.ASSET_NAME,
                    ASSET_CODE:vm_entry.ASSET_CODE,
                    ASSET_TYPE:vm_entry.ASSET_TYPE,
                    BUY_TIME:vm_entry.BUY_TIME,
                    SALVAGE_VALUE:vm_entry.SALVAGE_VALUE,
                    ASSET_BRAND:vm_entry.ASSET_BRAND,
                    ASSET_SPEC:vm_entry.ASSET_SPEC,
                    ASSET_UNIT:vm_entry.ASSET_UNIT,
                    ASSET_NUM:vm_entry.ASSET_NUM,
                    BELONG_USERID:vm_entry.BELONG_USERID,
                    BELONG_DEPTID:vm_entry.BELONG_DEPTID,
                    ASSET_MEMO:vm_entry.ASSET_MEMO,
                    RESOURCEIDS:vm_entry.RESOURCEIDS
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        //保存成功
                        swal({
                            title:'保存成功！',
                            text: '资产编号：<span style="color:red">'+data.entity.ASSET_CODE+'</span>。',
                            html: true
                        },function () {
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
            } else if(vm_entry.type == "edit"){
                myjstools.ajax(false, "POST", "/web/service?METHOD=asset_edit",{
                    ASSET_NAME:vm_entry.ASSET_NAME,
                    ASSET_CODE:vm_entry.ASSET_CODE,
                    ASSET_TYPE:vm_entry.ASSET_TYPE,
                    BUY_TIME:vm_entry.BUY_TIME,
                    SALVAGE_VALUE:vm_entry.SALVAGE_VALUE,
                    ASSET_BRAND:vm_entry.ASSET_BRAND,
                    ASSET_SPEC:vm_entry.ASSET_SPEC,
                    ASSET_UNIT:vm_entry.ASSET_UNIT,
                    ASSET_NUM:vm_entry.ASSET_NUM,
                    BELONG_USERID:vm_entry.BELONG_USERID,
                    BELONG_DEPTID:vm_entry.BELONG_DEPTID,
                    ASSET_MEMO:vm_entry.ASSET_MEMO,
                    RESOURCEIDS:vm_entry.RESOURCEIDS,
                    ASSET_ID:vm_entry.ASSET_ID
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
                        });
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            }

        },
        findInfo:function(){
            myjstools.ajax(false, "POST", "/web/service?METHOD=asset_findById",{
                ASSET_ID:vm_entry.ASSET_ID
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.ASSET_NAME != null && data.entity.ASSET_NAME != '' && data.entity.ASSET_NAME != undefined){
                        vm_entry.ASSET_NAME = data.entity.ASSET_NAME;
                    }
                    if(data.entity.ASSET_CODE != null && data.entity.ASSET_CODE != '' && data.entity.ASSET_CODE != undefined){
                        vm_entry.ASSET_CODE = data.entity.ASSET_CODE;
                    }
                    if(data.entity.ASSET_TYPE != null && data.entity.ASSET_TYPE != '' && data.entity.ASSET_TYPE != undefined){
                        vm_entry.ASSET_TYPE = data.entity.ASSET_TYPE;
                    }
                    if(data.entity.BUY_TIME != null && data.entity.BUY_TIME != '' && data.entity.BUY_TIME != undefined){
                        vm_entry.BUY_TIME = data.entity.BUY_TIME;
                    }
                    if(data.entity.SALVAGE_VALUE != null && data.entity.SALVAGE_VALUE != '' && data.entity.SALVAGE_VALUE != undefined){
                        vm_entry.SALVAGE_VALUE = data.entity.SALVAGE_VALUE;
                    }
                    if(data.entity.ASSET_BRAND != null && data.entity.ASSET_BRAND != '' && data.entity.ASSET_BRAND != undefined){
                        vm_entry.ASSET_BRAND = data.entity.ASSET_BRAND;
                    }
                    if(data.entity.ASSET_SPEC != null && data.entity.ASSET_SPEC != '' && data.entity.ASSET_SPEC != undefined){
                        vm_entry.ASSET_SPEC = data.entity.ASSET_SPEC;
                    }
                    if(data.entity.ASSET_UNIT != null && data.entity.ASSET_UNIT != '' && data.entity.ASSET_UNIT != undefined){
                        vm_entry.ASSET_UNIT = data.entity.ASSET_UNIT;
                    }
                    if(data.entity.ASSET_NUM != null && data.entity.ASSET_NUM != '' && data.entity.ASSET_NUM != undefined){
                        vm_entry.ASSET_NUM = data.entity.ASSET_NUM;
                    }
                    if(data.entity.BELONG_USERID != null && data.entity.BELONG_USERID != '' && data.entity.BELONG_USERID != undefined){
                        vm_entry.BELONG_USERID = data.entity.BELONG_USERID;
                    }
                    if(data.entity.BELONG_DEPTID != null && data.entity.BELONG_DEPTID != '' && data.entity.BELONG_DEPTID != undefined){
                        vm_entry.BELONG_DEPTID = data.entity.BELONG_DEPTID;
                    }
                    if(data.entity.ASSET_MEMO != null && data.entity.ASSET_MEMO != '' && data.entity.ASSET_MEMO != undefined){
                        vm_entry.ASSET_MEMO = data.entity.ASSET_MEMO;
                    }
                    if(data.entity.STATUS != null && data.entity.STATUS != '' && data.entity.STATUS != undefined){
                        vm_entry.STATUS = data.entity.STATUS;
                    }
                    if(data.entity.resourceList != null && data.entity.resourceList != '' && data.entity.resourceList != undefined){
                        var html = "";
                        if(data.entity.resourceList.length > 0){
                            var resourceList = data.entity.resourceList;
                            for(var i = 0 ; i < resourceList.length ; i ++){
                                var down_url = "web/download?RESOURCE_ID=" +  resourceList[i].RESOURCE_ID;
                                html += "<div id='" + resourceList[i].RESOURCE_ID + "'>";
                                html += "<a href='" + down_url  + "' style='color: #333;'>" + resourceList[i].FILENAME + "</a>&nbsp;";
                                html += "<a class='del-a' onclick='javascript:deleteFile(\"" + resourceList[i].RESOURCE_ID + "\")' style='cursor: pointer;'>删除</a>";
                                html += "<input type='hidden' name='resources' value='" + resourceList[i].RESOURCE_ID + "'>";
                                html += "</div>";
                            }
                        }
                        $("#fileDiv").html(html);
                    }
                } catch (e) {
                    //alert("login_res.error:出错了！" + e.message);
                }
            });
        }
    },

});

function uploadFileNew() {
    if($("#id-input-file-1").val() == null || $("#id-input-file-1").val() == "" || $("#id-input-file-1").val() == undefined){
        swal({title:"",text:'请选择文件！',type:'error'});
        return false;
    }


    var formData = new FormData();
    formData.append("file", document.getElementById("id-input-file-1").files[0]);
    $.ajax({
        url: myjstools.wwwroot + '/web/uploadImg',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
    }).done(function (res) {

        if(res.success != 1) {
            swal({title:'',text:res.msg,type:"error"});
            return;
        }
        var down_url = "";
        down_url = myjstools.wwwroot + "/web/download?RESOURCE_ID=" +  res.entity.resourceId;
        var html = "";
        html += "<div id='" + res.entity.resourceId + "'>";
        html += "<a href='" + down_url  + "' style='color: #333;'>" + res.entity.resourceName + "</a>&nbsp;";
        html += "<a class='del-a' onclick='javascript:deleteFile(\"" + res.entity.resourceId + "\")' style='cursor: pointer;'>删除</a>";
        html += "<input type='hidden' name='resources' value='" + res.entity.resourceId + "'>";
        html += "</div>";
        $("#fileDiv").append(html);
    }).fail(function (res) {
    });
}

function deleteFile(id) {
    $("#" + id).remove();
}


$(function(){
    
    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }

    layui.use('laydate', function(){
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#buy_time' //指定元素
        });
    });

});

