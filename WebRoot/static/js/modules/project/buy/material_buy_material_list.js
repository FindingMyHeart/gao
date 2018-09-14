var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'BUY_SN',title: '采购订单号',width:140}
            ,{field:'PROJECT_NAME',title: '项目名称',width:200}
            ,{field:'SYSTEM_NAME',title: '系统名称',width:120}
            ,{field:'SUPPLIER_NAME',title: '供应商',width:120}
            ,{field:'MATERIAL_NAME',title: '名称',width:120}
            ,{field:'MATERIAL_BRAND',title: '品牌',width:120}
            ,{field:'MATERIAL_SPEC',title: '规格型号',width:120}
            ,{field:'MATERIAL_UNIT',title: '单位',width:120}
            ,{field:'MATERIAL_NUM',title: '数量',width:120}
            ,{field:'BUY_NUM',title: '到货数量',width:120}
            ,{field:'UN_NUM',title: '未到货数量',width:120}
            ,{field:'UNIT_PRICE',title: '单价',width:120}
            ,{field:'TOTAL_PRICE',title: '金额',width:100}
            ,{field:'MEMO',title: '备注',width:100}
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
                        METHOD:'buy_materialList',
                        BUY_TYPE:'2'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                    ,done: function(res, page, count){
                        //分类显示中文名称
                        $("[data-field='UN_NUM']").children().each(function(index){
                            if(res.data.length < 1){
                                return;
                            }
                            if(index > 0){
                                var single = res.data[index-1];
                                if(single.MATERIAL_NUM != null && single.MATERIAL_NUM != '' && single.MATERIAL_NUM != undefined
                                    && single.BUY_NUM != null && single.BUY_NUM != '' && single.BUY_NUM != undefined ){
                                    $(this).html((parseInt(single.MATERIAL_NUM) - parseInt(single.BUY_NUM)));
                                }
                            }
                        })
                    }
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                        //TODO 查看
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
                        var BUY_DATE_SEARCH = $('#BUY_DATE_SEARCH').val();
                        var PROJECT_ID_SEARCH = $('#PROJECT_ID_SEARCH').val();
                        var SYSTEM_NAME_SEARCH = $('#SYSTEM_NAME_SEARCH').val();
                        var SUPPLIER_ID_SEARCH = $('#SUPPLIER_ID_SEARCH').val();
                        var MATERIAL_NAME_SEARCH = $('#MATERIAL_NAME_SEARCH').val();
                        var MATERIAL_BRAND_SEARCH = $('#MATERIAL_BRAND_SEARCH').val();
                        var MATERIAL_SPEC_SEARCH = $('#MATERIAL_SPEC_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                BUY_SN_SEARCH: BUY_SN_SEARCH,
                                BUY_DATE_SEARCH:BUY_DATE_SEARCH,
                                PROJECT_ID_SEARCH:PROJECT_ID_SEARCH,
                                SYSTEM_NAME_SEARCH:SYSTEM_NAME_SEARCH,
                                SUPPLIER_ID_SEARCH:SUPPLIER_ID_SEARCH,
                                MATERIAL_NAME_SEARCH:MATERIAL_NAME_SEARCH,
                                MATERIAL_BRAND_SEARCH:MATERIAL_BRAND_SEARCH,
                                MATERIAL_SPEC_SEARCH:MATERIAL_SPEC_SEARCH,
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
            elem: '#BUY_DATE_SEARCH' //指定元素
        });
    });

    $('select').searchableSelect();
});