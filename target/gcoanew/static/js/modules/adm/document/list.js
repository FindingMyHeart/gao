/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'DOCUMENT_CODE',title: '文件编号',width:150}
            ,{field:'DOCUMENT_NAME',title: '文件名称',width:200}
            ,{field:'CREATE_DATE',title: '日期',width:120}
            ,{field:'DOCUMENT_FILE',title: '附件',width:180}
            ,{field:'DOCUMENT_ID', title: '操作', align:'center', toolbar: '#barDemo',width:220}
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
                        METHOD:'document_list'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                    ,done: function(res, page, count){
                        $("[data-field='DOCUMENT_FILE']").css('display','none');
                        //分类显示中文名称
                        $("[data-field='STATUS']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('<span class="badge badge-info">正常</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">报废</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">变卖</span>')
                            }else if($(this).text()=='4'){
                                $(this).html('<span class="badge badge-info">丢失</span>')
                            }
                        })
                    }
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	vm.view(data.DOCUMENT_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.DOCUMENT_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.DOCUMENT_ID);
                    } else if(obj.event === 'down'){
                        vm.down(data.DOCUMENT_FILE);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var DOCUMENT_CODE_SEARCH = $('#DOCUMENT_CODE_SEARCH').val();
                        var DOCUMENT_NAME_SEARCH = $('#DOCUMENT_NAME_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                DOCUMENT_CODE_SEARCH: DOCUMENT_CODE_SEARCH,
                                DOCUMENT_NAME_SEARCH:DOCUMENT_NAME_SEARCH
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
            openBootStrapDialog("","adm/document/entry?type=save","1");
        },
        edit:function(DOCUMENT_ID){
            openBootStrapDialog("","adm/document/entry?type=edit&DOCUMENT_ID="+DOCUMENT_ID,"1");
        },
        view:function(DOCUMENT_ID){
            openBootStrapDialog("","adm/document/entry?type=view&DOCUMENT_ID="+DOCUMENT_ID,"1");
        },
        down:function(DOCUMENT_FILE){
            window.location.href="web/download?RESOURCE_ID=" + DOCUMENT_FILE;
        },
        delete:function(DOCUMENT_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=document_delete",{
                    DOCUMENT_ID:DOCUMENT_ID
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
});