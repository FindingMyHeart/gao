/**
 * Created by 11029 on 2018/5/1.
 */
var vm = new Vue({
    el:"body",
    data:{
        columns:[[
			 {type:'numbers',fixed: 'left'}
            ,{field:'JDR',title: '建档人',width:120}
            ,{field:'JDSJ',title: '建档日期',width:160}
            ,{field:'CLIENT_NAME',title: '客户',width:120}
            ,{field:'CLIENT_TEL',title: '联系电话',width:150}
            ,{field:'CLIENT_ADDRESS', title: '地址',width:150}
            ,{field:'CLIENT_MAIL', title: '邮箱',width:150}
            ,{field:'MEMO', title: '备注',width:120}
            ,{field:'CLIENT_ID', title: '操作',align:'center', toolbar: '#barDemo'}
        ]]
    },
    methods:{
        //进入录入界面
        entry:function(){

        },
        initTable:function(){
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#customer'
                    ,url:myjstools.wwwroot +'/web/service'
                    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , where:{
                        METHOD:'customer_list',
                        CLIENT_NAME:'',
                        CLIENT_TEL:'',
                        CREATE_DATE:'',
                        CREATE_USERID:''
                    }
                    ,id: 'customerReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                });
                //监听工具条
                table.on('tool(customer)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	 vm.view(data.CLIENT_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.CLIENT_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.CLIENT_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var CLIENT_NAME = $('#customer_name_condition').val();
                        var CREATE_USERID = $('#create_userid').val();
                        var CREATE_DATE = $('#create_date').val();
                        var CLIENT_TEL = $('#client_tel_condition').val();
                        //执行重载
                        table.reload('customerReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                CLIENT_NAME: CLIENT_NAME,
                                CLIENT_TEL:CLIENT_TEL,
                                CREATE_DATE:CREATE_DATE,
                                CREATE_USERID:CREATE_USERID
                            }
                        });
                    }
                };

                $('.customerTable .btn').on('click', function(){
                    var type = $(this).data('type');
                    active[type] ? active[type].call(this) : '';
                });

            });
        },
        save:function(){
            openBootStrapDialog("","customer/entry?type=save","1");
        },
        edit:function(CLIENT_ID){
            openBootStrapDialog("","customer/entry?type=edit&CLIENT_ID="+CLIENT_ID,"1");
        },
        view:function(CLIENT_ID){
            openBootStrapDialog("","customer/entry?type=view&CLIENT_ID="+CLIENT_ID,"1");
        },
        delete:function(CLIENT_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=customer_delete",{
                    CLIENT_ID:CLIENT_ID
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','删除成功!','success');
						//刷新列表
                        $(".customerTable .btn").click();
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
    $('#create_date').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
});
