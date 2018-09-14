/**
 * Created by 11029 on 2018/4/29.
 */

var login = {
    username:'',//用户名
    password:'',//密码
    //初始化函数
    initit:function () {

    },
    //登录方法
    login:function(){
        login.username = $("#name").val();
        login.password = $("#password").val();
        //验证用户名
        if(!login.username){
            //TODO 暂未发现什么提示组件，先用alert代替，最后统一替换，后边的alert就不会再提了！
            alert("请输入用户名！");
            return false;
        }
        //验证密码
        if(!login.password){
            alert("请输入密码！");
            return false;
        }
        myjstools.ajax(false, "POST", "/web/login",{
                login_name:login.username,
                login_password:login.password
        }, function(data){
            try {
                if (data.success != 1) {
                   alert(data.msg);
                   return false;
                }
                document.location.href = "main/index";
            } catch (e) {
                //alert("login_res.error:出错了！" + e.message);
            }
        });
    }
};
//自调用初始化函数
$(function(){
    login.initit();
});


/*
 * 注册键盘事件
 *    登录页面
 */
$(document).keydown(function(event) {
    var keyCode = event.keyCode;
    //F5
    if(keyCode === 116){
        window.location.reload(true);
    }
    //回车键
    if(keyCode === 13){
        login.login();
    }
});

