/**
 * Created by 11029 on 2018/5/12.
 */
var vm = new Vue({
    el:"body",
    data:{
        zNodes:[],//树节点的数据
        SELECT_TYPE_ID:'',//选中的类别
        PID_SEARCH:'',//查询条件中的PID
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'MATERIAL_CODE',title: '货品编号',width:120}
            ,{field:'MATERIAL_TYPE_NAME',title: '所属分类',width:100}
            ,{field:'MATERIAL_NAME',title: '名称',width:120}
            ,{field:'MATERIAL_BRAND',title: '品牌',width:120}
            ,{field:'MATERIAL_SPEC',title: '规格型号',width:120}
            ,{field:'MATERIAL_MEMO',title: '备注',width:100}
            ,{field:'SUPPLIER_ID', title: '操作', align:'center', toolbar: '#barDemo'}
        ]],
    },
    methods:{
        //初始化方法
        init:function(){
            //初始化树
            this.initTree();
        },
        initTable:function(){
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#material'
                    ,url:myjstools.wwwroot +'/web/service'
                    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , where:{
                        METHOD:'material_list'
                    }
                    ,id: 'materialReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                });
                //监听工具条
                table.on('tool(material)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	vm.view(data.MATERIAL_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.MATERIAL_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.MATERIAL_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var pid_search = $('#pid_search').val();
                        var material_name_search = $('#material_name_search').val();
                        var material_brand_search = $('#material_brand_search').val();
                        var material_spec_search = $('#material_spec_search').val();
                        //执行重载
                        table.reload('materialReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                pid_search: pid_search,
                                material_name_search:material_name_search,
                                material_brand_search:material_brand_search,
                                material_spec_search:material_spec_search
                            }
                        });
                    }
                };

                $('.materialTable .btn').on('click', function(){
                    var type = $(this).data('type');
                    active[type] ? active[type].call(this) : '';
                });
            });
        },
        save:function(){
            openBootStrapDialog("","material/material_entry?type=save","1");
        },
        edit:function(MATERIAL_ID){
            openBootStrapDialog("","material/material_entry?type=edit&MATERIAL_ID="+MATERIAL_ID,"1");
        },
        view:function(MATERIAL_ID){
            openBootStrapDialog("","material/material_entry?type=view&MATERIAL_ID="+MATERIAL_ID,"1");
        },
        delete:function(MATERIAL_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=material_delete",{
                    MATERIAL_ID:MATERIAL_ID
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','删除成功!','success');
                        //刷新列表
                        $(".materialTable .btn").click();
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            });
        },
        saveCategory:function(){
            openBootStrapDialog("","material/category_entry?type=save","1");
        },
        editCategory:function(){
            if(vm.SELECT_TYPE_ID == null || vm.SELECT_TYPE_ID == "" || vm.SELECT_TYPE_ID == undefined){
                swal({type:'error',title:'',text:'没有选中要修改的节点'});
                return false;
            }
            openBootStrapDialog("","material/category_entry?type=edit&TYPE_ID=" + vm.SELECT_TYPE_ID,"1");
        },
        deleteCategory:function(){
            if(vm.SELECT_TYPE_ID == null || vm.SELECT_TYPE_ID == "" || vm.SELECT_TYPE_ID == undefined){
                swal({type:'error',title:'',text:'没有选中要删除的节点'});
                return false;
            }
            swal({
                title: "",
                text: "确认要删除选中要删除的节点吗?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#1f91f3',
                cancelButtonColor: '#d33',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                myjstools.ajax(false, "POST", "/web/service?METHOD=materialCategory_delete",{
                    TYPE_ID:vm.SELECT_TYPE_ID
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','删除成功!','success');
                        //去掉该节点
                        vm.initTree();
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            });
        },
        //初始化树
        initTree:function(){
            myjstools.ajax(false, "POST", "/web/service?METHOD=materialCategory_listAllForTree", {}, function(data){
                if (data.success != 1) {
                    swal({title:'',text:data.msg,type:'error'});
                    return false;
                }
                vm.zNodes = data.rows
                var zTreeObj = $.fn.zTree.init($("#ultree"), setting, vm.zNodes);//初始化ztree
                zTreeObj.expandAll(true);//设置文件夹是否打开
                var node = zTreeObj.getNodeByParam('id', "-1");//获取id为1的点
                zTreeObj.selectNode(node);//选择点
                vm.PID_SEARCH = "-1";
                vm.initTable();
            });


        },
        //点击树
        zTreeOnClick:function(vent, menuTree, treeNode){

            //将选中的节点附上
            vm.SELECT_TYPE_ID = treeNode.id;
            //
            // vm.PID_SEARCH = treeNode.id;

            // $("#pid_search").val(treeNode.id);
            $('#pid_search').selectpicker('val',treeNode.id);

            //刷新列表
            $(".materialTable .btn").click();
        },
    }
});

$(function(){
    vm.init();
});

var setting = {
    callback: {
        onClick: vm.zTreeOnClick
    },
    edit: {
        enable: false,//修改节点
        renameTitle: "编辑节点名称",
        drag: {//拖拽
            isCopy: false,//拷贝
            isMove: false//移动
        }
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    async: {
        enable: true
    }
};


