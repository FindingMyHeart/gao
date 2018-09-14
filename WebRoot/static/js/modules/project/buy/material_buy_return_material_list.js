var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'RETURN_SN',title: '退货单号',width:140}
            ,{field:'PROJECT_NAME',title: '项目名称',width:120}
            ,{field:'SUPPLIER_NAME',title: '供应商',width:200}
            ,{field:'MATERIAL_NAME',title: '名称',width:120}
            ,{field:'MATERIAL_BRAND',title: '品牌',width:120}
            ,{field:'MATERIAL_SPEC',title: '规格型号',width:120}
            ,{field:'MATERIAL_UNIT',title: '单位',width:120}
            ,{field:'MATERIAL_NUM',title: '数量',width:100}
            ,{field:'UNIT_PRICE',title: '单价',width:100}
            ,{field:'TOTAL_PRICE',title: '金额',width:100}
            ,{field:'RETURN_NAME',title: '退货人',width:100}
            ,{field:'RETURN_DATE',title: '退货日期',width:120}
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
                        METHOD:'buyReturn_materialList'
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
                        var RETURN_SN_SEARCH = $('#RETURN_SN_SEARCH').val();
                        var STAFF_NAME_SEARCH = $('#STAFF_NAME_SEARCH').val();
                        var RETURN_DATE_SEARCH = $('#RETURN_DATE_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                RETURN_SN_SEARCH: RETURN_SN_SEARCH,
                                STAFF_NAME_SEARCH:STAFF_NAME_SEARCH,
                                RETURN_DATE_SEARCH:RETURN_DATE_SEARCH
                            }
                        });
                    }
                };

                $('.layListTable .btn').on('click', function(){
                    var type = $(this).data('type');
                    active[type] ? active[type].call(this) : '';
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
            elem: '#RETURN_DATE_SEARCH' //指定元素
        });
    });
});