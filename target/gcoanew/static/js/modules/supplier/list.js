/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'SUPPLIER_NAME',title: '供应商',width:120}
            ,{field:'SUPPLIER_PROPERTY',title: '性质',width:100}
            ,{field:'MAIN_BRAND',title: '主营品牌',width:120}
            ,{field:'LINK_MAN',title: '联系人',width:100}
            ,{field:'POSITION', title: '职务',width:100}
            ,{field:'TEL', title: '电话',width:120}
            ,{field:'MAIL', title: '邮箱',width:120}
            ,{field:'ADDRESS', title: '地址',width:120}
            ,{field:'BUSINESS_SCOPE', title: '经营范围',width:120}
            ,{field:'ACCOUNT_INFO', title: '账号信息',width:120}
            ,{field:'MEMO', title: '备注',width:120}
            ,{field:'SUPPLIER_ID', title: '操作', align:'center', toolbar: '#barDemo',width:180}
        ]],
    },
    methods:{
        initTable:function(){
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#supplier'
                    ,url:myjstools.wwwroot +'/web/service'
                    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , where:{
                        METHOD:'supplier_list'
                    }
                    ,id: 'supplierReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                });
                //监听工具条
                table.on('tool(supplier)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	vm.view(data.SUPPLIER_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.SUPPLIER_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.SUPPLIER_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var supplier_name_search = $('#supplier_name_search').val();
                        var supplier_property_search = $('#supplier_property_search').val();
                        var main_brand_search = $('#main_brand_search').val();
                        var tel_search = $('#tel_search').val();
                        var link_man_search = $('#link_man_search').val();
                        //执行重载
                        table.reload('supplierReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                supplier_name_search: supplier_name_search,
                                supplier_property_search:supplier_property_search,
                                main_brand_search:main_brand_search,
                                tel_search:tel_search,
                                link_man_search:link_man_search
                            }
                        });
                    }
                };

                $('.supplierTable .btn').on('click', function(){
                    var type = $(this).data('type');
                    active[type] ? active[type].call(this) : '';
                });
            });
        },
        save:function(){
            openBootStrapDialog("","supplier/entry?type=save","1");
        },
        edit:function(SUPPLIER_ID){
            openBootStrapDialog("","supplier/entry?type=edit&SUPPLIER_ID="+SUPPLIER_ID,"1");
        },
        view:function(SUPPLIER_ID){
            openBootStrapDialog("","supplier/entry?type=view&SUPPLIER_ID="+SUPPLIER_ID,"1");
        },
        delete:function(SUPPLIER_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=supplier_delete",{
                    SUPPLIER_ID:SUPPLIER_ID
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','删除成功!','success');
                        //刷新列表
                        $(".supplierTable .btn").click();
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