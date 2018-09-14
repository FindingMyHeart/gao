/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{

    },
    methods:{
        save:function(){
            openBootStrapDialog("","applyBuy/entry?type=save","1");
        },
        edit:function(APPLYBUY_ID){
            openBootStrapDialog("","applyBuy/entry?type=edit&APPLYBUY_ID="+APPLYBUY_ID,"1");
        }
    }
});

$(function(){
    //TODO
});