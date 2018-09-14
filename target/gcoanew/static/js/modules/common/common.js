/**
 * Created by 11029 on 2018/5/1.
 */


var common_js = {

    //滚动到顶部
    to_top:function(timer){
        $('html,body').animate({scrollTop: '0px'}, timer);
    },
    //提示语
    notify:function(type,timer,msg){
        this.to_top(100);
        var notify =  $.notify({
            // options
            icon: 'glyphicon glyphicon-' + type + '-sign',
            title: '',
            message: msg,
            target: '_blank'
        },{
            // settings
            element: 'body',
            position: null,
            type: type,
            allow_dismiss: true,
            newest_on_top: true,
            showProgressbar: false,
            placement: {
                from: "top",
                align: "center"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5000,
            timer: timer,
            url_target: '_blank'
        });
        return notify;
    }
}
