/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'STAFF_CODE',title: '职员编号',width:150}
            ,{field:'STAFF_NAME',title: '姓名',width:120}
            ,{field:'DEPT_NAME',title: '部门',width:120}
            ,{field:'POST_NAME',title: '职位',width:120}
            ,{field:'CONTRACT_START_DATE', title: '合同开始日期',width:140}
            ,{field:'CONTRACT_END_DATE', title: '合同结束日期',width:140}
            ,{field:'CONTACT', title: '联系方式',width:120}
            ,{field:'STATUS', title: '状态', align:'center',width:100}
            ,{field:'CONTRACT_ID', title: '操作', align:'center', toolbar: '#barDemo',width:270}
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
                        METHOD:'staffContract_list'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                    ,done: function(res, page, count){
                        //分类显示中文名称
                        $("[data-field='STATUS']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('<span class="badge badge-info">期限中</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">即将到期</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">已到期</span>')
                            }
                        })
                    }
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	vm.view(data.CONTRACT_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.CONTRACT_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.CONTRACT_ID);
                    } else if(obj.event === 'scrap'){  //报废
                        vm.scrap(data.CONTRACT_ID);
                    } else if(obj.event === 'sell_off'){  //变卖
                        vm.sell_off(data.CONTRACT_ID);
                    } else if(obj.event === 'lose'){  //丢失
                        vm.lose(data.CONTRACT_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var STAFF_CODE_SEARCH = $('#STAFF_CODE_SEARCH').val();
                        var DEPT_ID_SEARCH = $('#DEPT_ID_SEARCH').val();
                        var POST_SEARCH = $('#POST_SEARCH').val();
                        var STATUS_SEARCH = $('#STATUS_SEARCH').val();
                        var CONTRACT_START_DATE_SEARCH = $('#CONTRACT_START_DATE_SEARCH').val();
                        var CONTRACT_END_DATE_SEARCH = $('#CONTRACT_END_DATE_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                STAFF_CODE_SEARCH: STAFF_CODE_SEARCH,
                                DEPT_ID_SEARCH:DEPT_ID_SEARCH,
                                POST_SEARCH:POST_SEARCH,
                                STATUS_SEARCH:STATUS_SEARCH,
                                CONTRACT_START_DATE_SEARCH:CONTRACT_START_DATE_SEARCH,
                                CONTRACT_END_DATE_SEARCH:CONTRACT_END_DATE_SEARCH
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
            openBootStrapDialog("","staff/contract/entry?type=save","1");
        },
        edit:function(CONTRACT_ID){
            openBootStrapDialog("","staff/contract/entry?type=edit&CONTRACT_ID="+CONTRACT_ID,"1");
        },
        view:function(CONTRACT_ID){
            openBootStrapDialog("","staff/contract/entry?type=view&CONTRACT_ID="+CONTRACT_ID,"1");
        },
        delete:function(CONTRACT_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=staffContract_delete",{
                    CONTRACT_ID:CONTRACT_ID
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
            elem: '#CONTRACT_START_DATE_SEARCH' //指定元素
        });
        laydate.render({
            elem: '#CONTRACT_END_DATE_SEARCH' //指定元素
        });
    });
});