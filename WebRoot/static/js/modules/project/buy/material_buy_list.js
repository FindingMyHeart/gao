var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'REPAIR_NO',title: '采购单号',width:140}
            ,{field:'BAOXIU_DATE',title: '项目名称',width:200}
            ,{field:'PERSONNEL_NAMES',title: '系统名称',width:120}
            ,{field:'PERSONNEL_NAMES',title: '供应商',width:200}
            ,{field:'PERSONNEL_NAMES',title: '名称',width:120}
            ,{field:'PERSONNEL_NAMES',title: '品牌',width:120}
            ,{field:'PERSONNEL_NAMES',title: '规格型号',width:120}
            ,{field:'REPAIR_STATUS_NAME',title: '状态',align:'center',width:100}
            ,{field:'REPAIR_STATUS_NAME',title: '采购日期',width:100}
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
                        METHOD:'buy_list',
                        BUY_TYPE:'2'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	vm.view(data.REPAIR_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.REPAIR_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.REPAIR_ID);
                    } else if(obj.event === 'close'){
                        vm.close(data.REPAIR_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var BUY_SN_SEARCH = $('#BUY_SN_SEARCH').val();
                        var PROJECT_ID_SEARCH = $('#PROJECT_ID_SEARCH').val();
                        var REPAIR_STATUS_SEARCH = $('#REPAIR_STATUS_SEARCH').val();
                        var BAOXIU_TIME_SEARCH = $('#BAOXIU_TIME_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                BUY_SN_SEARCH: BUY_SN_SEARCH,
                                PROJECT_ID_SEARCH: PROJECT_ID_SEARCH,
                                REPAIR_STATUS_SEARCH:REPAIR_STATUS_SEARCH,
                                BAOXIU_TIME_SEARCH:BAOXIU_TIME_SEARCH
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
            openBootStrapDialog("","buy/materialBuy/entry?type=save","1");
        },
        edit:function(REPAIR_ID){
            openBootStrapDialog("","buy/materialBuy/entry?type=edit&REPAIR_ID="+REPAIR_ID,"1");
        },
        view:function(REPAIR_ID){
            openBootStrapDialog("","buy/materialBuy/entry?type=view&REPAIR_ID="+REPAIR_ID,"1");
        },

        delete:function(REPAIR_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=buy_delete",{
                    REPAIR_ID:REPAIR_ID
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
        close:function(REPAIR_ID){
            swal({
                title: "",
                text: "确认要关闭这条记录吗?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#1f91f3',
                cancelButtonColor: '#d33',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                myjstools.ajax(false, "POST", "/web/service?METHOD=buy_updateStatus",{
                    REPAIR_ID:REPAIR_ID,
                    REPAIR_STATUS:"1000027"
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','关闭成功!','success');
                        //刷新列表
                        $(".layListTable .btn").click();
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            });
        }
    },
    mounted:function(){

    }
});

$(function(){
    vm.initTable();
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#BAOXIU_TIME_SEARCH' //指定元素
        });
        //给input赋值
        $('#BAOXIU_TIME_SEARCH').val(myjstools.today());
    });
});