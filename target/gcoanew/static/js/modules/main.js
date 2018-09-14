/**
 * Created by 11029 on 2018/4/29.
 */

var main = {
    username:'',//用户名
    password:'',//密码
    //初始化函数
    initit:function () {
        login()
    },
    //登录方法
    login:function(){
        // login.username = $("#name").val();
        // login.password = $("#password").val();
        // myjstools.ajax(false, "POST", "/web/service",{
        //     login_name:1,
        //     login_password:2
        // }, function(data){
        //     try {
        //         if (data.success != 1) {
        //             alert(data.msg);
        //             return false;
        //         }
        //         document.location.href = "main/index";
        //     } catch (e) {
        //         //alert("login_res.error:出错了！" + e.message);
        //     }
        // });

        myjstools.ajax(false, "POST", "/web/service?METHOD=kwgl_delete",{
            username:1
        }, function(data){
            try {
                // if (data.success != 1) {
                //     swal({title:'',text:data.msg,type:'error'});
                //     return false;
                // }
                // swal('','删除成功!','success');
                // //刷新列表
                // $(".layListTable .btn").click();
            } catch (e) {
                //alert("login_res.error:出错了！" + e.message);
            }
        });
    }
};
//自调用初始化函数
$(function(){
    main.initit();
});






















