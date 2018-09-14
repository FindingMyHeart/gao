var vm_entry = new Vue({
    el:"#entry_body",
    data:{
        staff_name:'',//姓名
        staff_sex:'',//性别
        staff_nation:'',//民族
        political_status:'',//政治面貌
        marital:'',//婚姻状况
        birthday:'',//出生年月
        education:'',//学历
        major:'',//专业
        graduate_school:'',//毕业院校
        graduate_date:'',//毕业时间
        degree:'',//学位
        english_level:'',//外语水平
        id_card:'',//身份证号
        hukou_location:'',//户口所在地
        contact:'',//联系方式
        home_tel:'',//家庭电话
        email:'',//邮箱
        address:'',//现住址
        emergency_contact:'',//应急联系人
        emergency_contact_tel:'',//应急联系人电话

        staff_code:'',//员工编号
        dept_id:'',//所属部门id
        post:'',//职位
        rank:'',//职称
        join_date:'',//入职日期
        zhuanzheng_date:'',//转正日期
        staff_status:'',//职员状态

        shebao_date:'',//社保日期
        gongjijin_date:'',//公积金日期

        certList:[],//资质列表
        experienceList:[],//工作经历列表
        familyList:[],//家庭成员列表

        resourceIds:'',//资源ID

        type:'save',//页面类型  save 保存  edit 修改
        in_type:'',//进入类型
        staff_id:'',//主键ID
    },
    methods:{
        //保存
        save:function(){
            if(vm_entry.type == "save"){

                var attachment = "";
                $(":input[name = 'resources']").each(function(i){
                    if (i == 0){
                        attachment += $(this).val();
                    } else {
                        attachment += "," + $(this).val();
                    }
                });

                vm_entry.resourceIds = attachment;

                var obj = new Object();
                obj.staff_name = vm_entry.staff_name;//姓名
                obj.staff_sex = vm_entry.staff_sex;//性别
                obj.staff_nation = vm_entry.staff_nation;//民族
                obj.political_status = vm_entry.political_status;//政治面貌
                obj.marital = vm_entry.marital;//婚姻状况
                if(vm_entry.birthday != null && vm_entry.birthday != '' && vm_entry.birthday != undefined){
                    obj.birthday = vm_entry.birthday;//出生年月
                }
                obj.education = vm_entry.education;//学历
                obj.major = vm_entry.major;//专业
                obj.graduate_school = vm_entry.graduate_school;//毕业院校
                if(vm_entry.graduate_date != null && vm_entry.graduate_date != '' && vm_entry.graduate_date != undefined){
                    obj.graduate_date = vm_entry.graduate_date;//毕业时间
                }
                obj.degree = vm_entry.degree;//学位
                obj.english_level = vm_entry.english_level;//外语水平
                obj.id_card = vm_entry.id_card;//身份证号
                obj.hukou_location = vm_entry.hukou_location;//户口所在地
                obj.contact = vm_entry.contact;//联系方式
                obj.home_tel = vm_entry.home_tel;//家庭电话
                obj.email = vm_entry.email;//邮箱
                obj.address = vm_entry.address;//现住址
                obj.emergency_contact = vm_entry.emergency_contact;//应急联系人
                obj.emergency_contact_tel = vm_entry.emergency_contact_tel;//应急联系人电话

                obj.dept_id = vm_entry.dept_id;//所属部门id
                obj.post = vm_entry.post;//职位
                obj.rank = vm_entry.rank;//职称
                if(vm_entry.join_date != null && vm_entry.join_date != '' && vm_entry.join_date != undefined){
                    obj.join_date = vm_entry.join_date;//入职日期
                }
                if(vm_entry.zhuanzheng_date != null && vm_entry.zhuanzheng_date != '' && vm_entry.zhuanzheng_date != undefined){
                    obj.zhuanzheng_date = vm_entry.zhuanzheng_date;//转正日期
                }
                obj.staff_status = vm_entry.staff_status;//职员状态
                if(vm_entry.shebao_date != null && vm_entry.shebao_date != '' && vm_entry.shebao_date != undefined){
                    obj.shebao_date = vm_entry.shebao_date;//社保日期
                }
                if(vm_entry.gongjijin_date != null && vm_entry.gongjijin_date != '' && vm_entry.gongjijin_date != undefined){
                    obj.gongjijin_date = vm_entry.gongjijin_date;//公积金日期
                }

                obj.certList = JSON.stringify(vm_entry.certList);//资质列表
                obj.experienceList = JSON.stringify(vm_entry.experienceList);//工作经历列表
                obj.familyList = JSON.stringify(vm_entry.familyList);//家庭成员列表

                obj.resourceIds = vm_entry.resourceIds;


                myjstools.ajax(false, "POST", "/web/service?METHOD=staffManage_save",obj, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        //保存成功
                        swal({
                            title:'保存成功！',
                            text: '职员编号：<span style="color:red">'+data.entity.staff_code+'</span>。',
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
                var attachment = "";
                $(":input[name = 'resources']").each(function(i){
                    if (i == 0){
                        attachment += $(this).val();
                    } else {
                        attachment += "," + $(this).val();
                    }
                });
                vm_entry.resourceIds = attachment;

                var obj = new Object();
                obj.staff_name = vm_entry.staff_name;//姓名
                obj.staff_sex = vm_entry.staff_sex;//性别
                obj.staff_nation = vm_entry.staff_nation;//民族
                obj.political_status = vm_entry.political_status;//政治面貌
                obj.marital = vm_entry.marital;//婚姻状况
                if(vm_entry.birthday != null && vm_entry.birthday != '' && vm_entry.birthday != undefined){
                    obj.birthday = vm_entry.birthday;//出生年月
                }
                obj.education = vm_entry.education;//学历
                obj.major = vm_entry.major;//专业
                obj.graduate_school = vm_entry.graduate_school;//毕业院校
                if(vm_entry.graduate_date != null && vm_entry.graduate_date != '' && vm_entry.graduate_date != undefined){
                    obj.graduate_date = vm_entry.graduate_date;//毕业时间
                }
                obj.degree = vm_entry.degree;//学位
                obj.english_level = vm_entry.english_level;//外语水平
                obj.id_card = vm_entry.id_card;//身份证号
                obj.hukou_location = vm_entry.hukou_location;//户口所在地
                obj.contact = vm_entry.contact;//联系方式
                obj.home_tel = vm_entry.home_tel;//家庭电话
                obj.email = vm_entry.email;//邮箱
                obj.address = vm_entry.address;//现住址
                obj.emergency_contact = vm_entry.emergency_contact;//应急联系人
                obj.emergency_contact_tel = vm_entry.emergency_contact_tel;//应急联系人电话

                obj.dept_id = vm_entry.dept_id;//所属部门id
                obj.post = vm_entry.post;//职位
                obj.rank = vm_entry.rank;//职称
                if(vm_entry.join_date != null && vm_entry.join_date != '' && vm_entry.join_date != undefined){
                    obj.join_date = vm_entry.join_date;//入职日期
                }
                if(vm_entry.zhuanzheng_date != null && vm_entry.zhuanzheng_date != '' && vm_entry.zhuanzheng_date != undefined){
                    obj.zhuanzheng_date = vm_entry.zhuanzheng_date;//转正日期
                }
                obj.staff_status = vm_entry.staff_status;//职员状态
                if(vm_entry.shebao_date != null && vm_entry.shebao_date != '' && vm_entry.shebao_date != undefined){
                    obj.shebao_date = vm_entry.shebao_date;//社保日期
                }
                if(vm_entry.gongjijin_date != null && vm_entry.gongjijin_date != '' && vm_entry.gongjijin_date != undefined){
                    obj.gongjijin_date = vm_entry.gongjijin_date;//公积金日期
                }

                obj.certList = JSON.stringify(vm_entry.certList);//资质列表
                obj.experienceList = JSON.stringify(vm_entry.experienceList);//工作经历列表
                obj.familyList = JSON.stringify(vm_entry.familyList);//家庭成员列表

                obj.resourceIds = vm_entry.resourceIds;
                obj.staff_id = vm_entry.staff_id;

                myjstools.ajax(false, "POST", "/web/service?METHOD=staffManage_edit",obj, function(data){
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
            myjstools.ajax(false, "POST", "/web/service?METHOD=staffManage_findById",{
                staff_id:vm_entry.staff_id
            }, function(data){
                try {
                    if (data.success != 1) {
                        swal({title:'',text:data.msg,type:'error'});
                        return false;
                    }
                    //加载成功,初始化页面
                    if(data.entity.staff_id != null && data.entity.staff_id != '' && data.entity.staff_id != undefined){
                        vm_entry.staff_id = data.entity.staff_id;
                    }
                    if(data.entity.staff_name != null && data.entity.staff_name != '' && data.entity.staff_name != undefined){
                        vm_entry.staff_name = data.entity.staff_name;
                    }
                    if(data.entity.staff_sex != null && data.entity.staff_sex != '' && data.entity.staff_sex != undefined){
                        vm_entry.staff_sex = data.entity.staff_sex;
                        // $('#staff_sex').selectpicker('val', data.entity.staff_sex);
                    }
                    if(data.entity.staff_nation != null && data.entity.staff_nation != '' && data.entity.staff_nation != undefined){
                        vm_entry.staff_nation = data.entity.staff_nation;
                    }
                    if(data.entity.political_status != null && data.entity.political_status != '' && data.entity.political_status != undefined){
                        vm_entry.political_status = data.entity.political_status;
                    }
                    if(data.entity.marital != null && data.entity.marital != '' && data.entity.marital != undefined){
                        vm_entry.marital = data.entity.marital;
                    }
                    if(data.entity.birthday != null && data.entity.birthday != '' && data.entity.birthday != undefined){
                        vm_entry.birthday = data.entity.birthday;
                    }
                    if(data.entity.education != null && data.entity.education != '' && data.entity.education != undefined){
                        vm_entry.education = data.entity.education;
                    }
                    if(data.entity.major != null && data.entity.major != '' && data.entity.major != undefined){
                        vm_entry.major = data.entity.major;
                    }
                    if(data.entity.graduate_school != null && data.entity.graduate_school != '' && data.entity.graduate_school != undefined){
                        vm_entry.graduate_school = data.entity.graduate_school;
                    }
                    if(data.entity.graduate_date != null && data.entity.graduate_date != '' && data.entity.graduate_date != undefined){
                        vm_entry.graduate_date = data.entity.graduate_date;
                    }
                    if(data.entity.degree != null && data.entity.degree != '' && data.entity.degree != undefined){
                        vm_entry.degree = data.entity.degree;
                    }
                    if(data.entity.english_level != null && data.entity.english_level != '' && data.entity.english_level != undefined){
                        vm_entry.english_level = data.entity.english_level;
                    }
                    if(data.entity.id_card != null && data.entity.id_card != '' && data.entity.id_card != undefined){
                        vm_entry.id_card = data.entity.id_card;
                    }
                    if(data.entity.hukou_location != null && data.entity.hukou_location != '' && data.entity.hukou_location != undefined){
                        vm_entry.hukou_location = data.entity.hukou_location;
                    }
                    if(data.entity.contact != null && data.entity.contact != '' && data.entity.contact != undefined){
                        vm_entry.contact = data.entity.contact;
                    }
                    if(data.entity.home_tel != null && data.entity.home_tel != '' && data.entity.home_tel != undefined){
                        vm_entry.home_tel = data.entity.home_tel;
                    }
                    if(data.entity.email != null && data.entity.email != '' && data.entity.email != undefined){
                        vm_entry.email = data.entity.email;
                    }
                    if(data.entity.address != null && data.entity.address != '' && data.entity.address != undefined){
                        vm_entry.address = data.entity.address;
                    }
                    if(data.entity.emergency_contact != null && data.entity.emergency_contact != '' && data.entity.emergency_contact != undefined){
                        vm_entry.emergency_contact = data.entity.emergency_contact;
                    }
                    if(data.entity.emergency_contact_tel != null && data.entity.emergency_contact_tel != '' && data.entity.emergency_contact_tel != undefined){
                        vm_entry.emergency_contact_tel = data.entity.emergency_contact_tel;
                    }


                    if(data.entity.staff_code != null && data.entity.staff_code != '' && data.entity.staff_code != undefined){
                        vm_entry.staff_code = data.entity.staff_code;
                    }
                    if(data.entity.dept_id != null && data.entity.dept_id != '' && data.entity.dept_id != undefined){
                        vm_entry.dept_id = data.entity.dept_id;
                    }
                    if(data.entity.post != null && data.entity.post != '' && data.entity.post != undefined){
                        vm_entry.post = data.entity.post;
                    }
                    if(data.entity.rank != null && data.entity.rank != '' && data.entity.rank != undefined){
                        vm_entry.rank = data.entity.rank;
                    }
                    if(data.entity.join_date != null && data.entity.join_date != '' && data.entity.join_date != undefined){
                        vm_entry.join_date = data.entity.join_date;
                    }
                    if(data.entity.zhuanzheng_date != null && data.entity.zhuanzheng_date != '' && data.entity.zhuanzheng_date != undefined){
                        vm_entry.zhuanzheng_date = data.entity.zhuanzheng_date;
                    }
                    if(data.entity.staff_status != null && data.entity.staff_status != '' && data.entity.staff_status != undefined){
                        vm_entry.staff_status = data.entity.staff_status;
                    }
                    if(data.entity.shebao_date != null && data.entity.shebao_date != '' && data.entity.shebao_date != undefined){
                        vm_entry.shebao_date = data.entity.shebao_date;
                    }
                    if(data.entity.gongjijin_date != null && data.entity.gongjijin_date != '' && data.entity.gongjijin_date != undefined){
                        vm_entry.gongjijin_date = data.entity.gongjijin_date;
                    }


                    if(data.entity.certList != null && data.entity.certList != '' && data.entity.certList != undefined){
                        vm_entry.certList = data.entity.certList;
                    }
                    if(data.entity.experienceList != null && data.entity.experienceList != '' && data.entity.experienceList != undefined){
                        vm_entry.experienceList = data.entity.experienceList;
                    }
                    if(data.entity.familyList != null && data.entity.familyList != '' && data.entity.familyList != undefined){
                        vm_entry.familyList = data.entity.familyList;
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
        },
        //增加一行 资质认证
        addContact1:function(){
            var obj = new Object();
            vm_entry.certList.push(obj)
        },
        deleteThis1: function (index) {
            vm_entry.certList.splice(index, 1);
        },
        //增加一行 工作经历
        addContact2:function(){
            var obj = new Object();
            vm_entry.experienceList.push(obj);
        },
        deleteThis2: function (index) {
            vm_entry.experienceList.splice(index, 1);
        },
        //增加一行 家庭成员信息
        addContact3:function(){
            var obj = new Object();
            vm_entry.familyList.push(obj)
        },
        deleteThis3: function (index) {
            vm_entry.familyList.splice(index, 1);
        },
        cancel:function(){
            window.location.reload();
        }
    },
    watch:{
        STAFF_ID:function(new_val,old_val){

        }
    }
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

function changeStaff(){

}


$(function(){
    $('#birthday').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });

    $('#graduate_date').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });


    $('#join_date').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('#zhuanzheng_date').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('#shebao_date').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('#gongjijin_date').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });






    if(vm_entry.type == 'edit' || vm_entry.type == 'view'){//如果修改,还需要初始化数据
        vm_entry.findInfo();
    }
});

