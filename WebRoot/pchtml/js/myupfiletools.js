/*
 * 上传文件工具
 */
var myupfiletools =
{
	// token
	token : ""
	,
	// role
	role : ""
	,
	// 当前页号
	page : 0
	, 
	// 初始化
	init : function()
	{
		$("body").append("<div id='divmyupfiletools'></div>");
		$("#divmyupfiletools").load("../../uploadfile.inc", null, null);
	}
	,
	// 上传文件完成后的回调
	upfilecallback : function(data)
	{
		
	}
	,
	// 得到查询条件
	ajaxFileUpload : function() {
		$('#divuploadfile').hide();
		
	    $.ajaxFileUpload
	    (
	        {
	            url: myjstools.wwwroot + '/shop/restful/file/save', //用于文件上传的服务器端请求地址
	            secureuri: false, //是否需要安全协议，一般设置为false
	            fileElementId: 'file1', //文件上传域的ID
	            dataType: 'json', //返回值类型 一般设置为json
	            headers: {
	                'Authorization': 'Basic ' + token,
	                'Role': role
	            }
	            , success: function (data, status)  //服务器成功响应处理函数
	            {
	            	if (status == "success") {
	            		if (data.resultType == "ERROR") {
							alert("服务器返回错误:" + data.message + "," + data.errormessage);
						} else {
							$("body").append(JSON.stringify(data));
							
							this.upfilecallback(data);
						}
					}
	            },
	            error: function (data, status, e)//服务器响应失败处理函数
	            {
	                alert(e);
	            }
	        }
	    )
	    return false;
	}
}
