/**
 * Created by 11029 on 2018/5/1.
 */
var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'LOCATION_NAME',title: '库位名称',width:100}
            ,{field:'MATERIAL_NAME',title: '名称',width:100}
            ,{field:'MATERIAL_BRAND', title: '品牌',width:100}
            ,{field:'MATERIAL_SPEC', title: '规格型号',width:120}
            ,{field:'MATERIAL_UNIT', title: '单位',width:120}
            ,{field:'MATERIAL_NUM', title: '数量',width:120}
            // ,{field:'', title: '图片',width:80}
            // ,{field:'', title: '参数',width:80}
            // ,{field:'', title: '货品状态',width:80}
            // ,{field:'', title: '	货品类型',width:80}
            // ,{field:'MEMO', title: '	备注',width:120}
            // ,{field:'APPLY_DETAIL_ID', title: '操作', align:'center', toolbar: '#barDemo'}
        ]],
    },
    methods:{
        initTable:function(){
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#ccgl'
                    ,url:myjstools.wwwroot +'/web/service'
                    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , where:{
                        METHOD:'ccgl_list'
                    }
                    ,id: 'ccglReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                });
                //监听工具条
                table.on('tool(ccgl)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	vm.view(data.APPLY_DETAIL_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.APPLY_DETAIL_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.APPLY_DETAIL_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var LOCATION_ID_SEARCH = $('#LOCATION_ID_SEARCH').val();
                        var MATERIAL_ID_SEARCH = $('#MATERIAL_ID_SEARCH').val();
                        //执行重载
                        table.reload('ccglReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                LOCATION_ID_SEARCH: LOCATION_ID_SEARCH,
                                MATERIAL_ID_SEARCH: MATERIAL_ID_SEARCH
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
            openBootStrapDialog("","ccgl/entry?type=save","1");
        },
        edit:function(APPLY_DETAIL_ID){
            openBootStrapDialog("","ccgl/entry?type=edit&APPLY_DETAIL_ID="+APPLY_DETAIL_ID,"1");
        },
        view:function(APPLY_DETAIL_ID){
            openBootStrapDialog("","ccgl/entry?type=view&APPLY_DETAIL_ID="+APPLY_DETAIL_ID,"1");
        },
        delete:function(APPLY_DETAIL_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=ccgl_delete",{
                    APPLY_DETAIL_ID:APPLY_DETAIL_ID
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