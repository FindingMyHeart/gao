/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
             {type:'numbers',fixed: 'left'}
            ,{field:'SALE_NO',title: '销售单号',width:140}
            ,{field:'BUY_COMPANY',title: '购货单位',width:120}
            ,{field:'OPEN_NAME',title: '开单员',width:200}
            ,{field:'IF_INVOICE',title: '开票',align:'center',width:100}
            ,{field:'SALE_ID', title: '操作', align:'center', toolbar: '#barDemo',width:450}
        ]],
    },
    methods:{
        initTable:function(){
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#layList'
                    ,url:myjstools.wwwroot +'/web/service'
                    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , where:{
                        METHOD:'sqSale_list'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                    ,done: function(res, page, count){
                        //分类显示中文名称
                        $("[data-field='IF_INVOICE']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('是')
                            }else if($(this).text()=='2'){
                                $(this).html('否')
                            }
                        })
                    }
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	vm.view(data.SALE_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.SALE_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.SALE_ID);
                    } else if(obj.event === 'close'){
                        vm.close(data.SALE_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var SALE_TIME_SEARCH = $('#SALE_TIME_SEARCH').val();
                        var OPEN_USERID_SEARCH = $('#OPEN_USERID_SEARCH').val();
                        var BUY_COMPANY_SEARCH = $('#BUY_COMPANY_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                SALE_TIME_SEARCH: SALE_TIME_SEARCH,
                                OPEN_USERID_SEARCH:OPEN_USERID_SEARCH,
                                BUY_COMPANY_SEARCH:BUY_COMPANY_SEARCH
                            }
                        });
                    }
                };

                $('.layListTable .btn').on('click', function(){
                    var type = $(this).data('type');
                    active[type] ? active[type].call(this) : '';
                });
            });
        },
        save:function(){
            openBootStrapDialog("","sq/sale/entry?type=save","1");
        },
        edit:function(SALE_ID){
            openBootStrapDialog("","sq/sale/entry?type=edit&SALE_ID="+SALE_ID,"1");
        },
        view:function(SALE_ID){
            openBootStrapDialog("","sq/sale/entry?type=view&SALE_ID="+SALE_ID,"1");
        },

        delete:function(SALE_ID){
            swal({
                title: "",
                text: "确认要删除这条记录吗?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#1f91f3',
                cancelButtonColor: '#d33',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                myjstools.ajax(false, "POST", "/web/service?METHOD=sqSale_delete",{
                    SALE_ID:SALE_ID
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','删除成功!','success');
                        //刷新列表
                        $(".layListTable .btn").click();
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            });
        },
    },
    mounted:function(){

    }
});

$(function(){
    vm.initTable();
    $('select').searchableSelect();


    layui.use('laydate', function(){
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#SALE_TIME_SEARCH' //指定元素
        });
    });
});