/**
 	基本工具
*/
var myjstools = {
	/* 用户对像 */
	userinfo: new Object()
	
	, 
	/* 服务器根 */
	wwwroot: "http://localhost:8080/gcoa"
	, 
	/* 服务器根 */
	wwwroot_image: "http://localhost:8080/gcoa"
	,
	/* 添加标签 */
	addtab:function(title, url)
	{
		top.addtab(title, url);
	}
	
	,
	/* 弹出窗口  */
	opennewweb:function(title, url)
	{
		$('#win').window('open');
			
		$('#win').window('setTitle', title);
		
		$("#fra_s").attr("src", url);
		//myjstools.addtab('jsxx' + id, "详细信息[" + id + "]", myjstools.wwwroot + "/pchtml/jsgl/info.html?id=" + id);
	}
	
	,
	/* 回到顶部  */
	returntop:function(){
		$("html,body").animate({scrollTop:0},1000);
	}
	
	,
	showerrinfo:function(msg)
	{
		try
		{
			$.messager.alert('提示', msg, 'info');	
		}catch(e)
		{
			alert(msg);
		}
	}
	
	,/* 分析地址参数等 */
	request: function(paras) {
		var url = location.href;
		var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
		var paraObj = {}
		for (i = 0; j = paraString[i]; i++) {
			paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = decodeURIComponent(j.substring(j.indexOf("=") + 1, j.length));
		}
		var returnValue = paraObj[paras.toLowerCase()];
		if (typeof(returnValue) == "undefined") {
			return "";
		} else {
			return returnValue;
		}
	}
	
	
	,/* json to string */
	O2String: function(O) {
		try {
			var j = JSON.stringify(O);
			
			return j;
		} catch (e) {
			
			var S = [];
			var J = "";
			if (Object.prototype.toString.apply(O) === '[object Array]') {
				for (var i = 0; i < O.length; i++)
					S.push(this.O2String(O[i]));
				J = '[' + S.join(',') + ']';
			} else if (Object.prototype.toString.apply(O) === '[object Date]') {
				J = "new Date(" + O.getTime() + ")";
			} else if (Object.prototype.toString.apply(O) === '[object RegExp]' || Object.prototype.toString.apply(O) === '[object Function]') {
				J = O.toString();
			} else if (Object.prototype.toString.apply(O) === '[object Object]') {
				for (var i in O) {
					O[i] = typeof(O[i]) == 'string' ? '"' + O[i] + '"' : (typeof(O[i]) === 'object' ? this.O2String(O[i]) : O[i]);
					S.push(i + ':' + O[i]);
				}
				J = '{' + S.join(',') + '}';
			}

			return J;
		}
	}
	
	
	,/* 格式化日期格式 */
	myformatter: function(date1) {
		var y = date1.getFullYear();
		var m = date1.getMonth() + 1;
		var d = date1.getDate();
		
		//alert(y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d));
		return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
	}
	
	,/* easyui 控件使用  */
	myparser:function(s){
		var t = Date.parse(s);
		if (!isNaN(t)){
			return new Date(t);
		} else {
			var str = s.replace(/-/g,"/");
			
			t = Date.parse(str);
			
			if (!isNaN(t)){
				return new Date(t);
			}else
			{
				return new Date();
			}
		}
	}
	
	,/* 格式化日期格式 ，有时返回‘今天’等  */
	myformatter_des: function(date_in) {
		var strres = date_in;	
		
		try
		{
			if (new Date(date_in).toDateString() === new Date().toDateString()) {
			    //今天
			    if((new Date()) - (new Date(date_in)) < 60*60*1000)
			    {
			    	return "刚刚";
			    }else if((new Date()) - (new Date(date_in)) > 60*60*1000)
			    {
			    	return "1小时前";
			    }else if((new Date()) - (new Date(date_in)) > 2 * 60*60*1000)
			    {
			    	return "2小时前";
			    }
			    else if((new Date()) - (new Date(date_in)) > 4 * 60*60*1000)
			    {
			    	return "4小时前";
			    }
			    else if((new Date()) - (new Date(date_in)) > 8 * 60*60*1000)
			    {
			    	return "今天";
			    }
			    else
			    {
					return date_in;					    	
			    }
			} else {
			    //之前
			    
			    var dd = new Date(date_in);
			    var day_1 = new Date(new Date().toDateString()) - 86400000;//昨天
			    var day_2 = new Date(new Date().toDateString()) - 86400000 * 2;//前天
			    
			    if(dd >= day_1)
			    {
					return "昨天";		    	
			    }else if(dd >= day_2)
			    {
			    	return "前天";	
			    }else
			    {
			    	var month = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
					var currentDate = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
					return dd.getFullYear() + "-" + month + "-" + currentDate;	
			    }
			    
			}
		}catch(e)
		{
			this.showerrinfo(e.message);	
		}
		
		
		return strres;
	}
	
	,/* 把返回的jsondate格式化   */
	ChangeDateFormat: function(jsondate) {
		try
		{
			jsondate = jsondate.replace("T", " ");
			
			var date = new Date(jsondate);
			
			var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			return date.getFullYear() + "-" + month + "-" + currentDate + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();	
			
//			jsondate = jsondate.replace("/Date(", "").replace(")/", "");
//	
//			if (jsondate.indexOf("+") > 0) {
//				jsondate = jsondate.substring(0, jsondate.indexOf("+"));
//			} else if (jsondate.indexOf("-") > 0) {
//				jsondate = jsondate.substring(0, jsondate.indexOf("-"));
//			}
//			
//			var date = new Date(parseInt(jsondate, 10));
//			var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
//			var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
//			return date.getFullYear() + "-" + month + "-" + currentDate + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();	
		}catch(e)
		{
			return "";
		}
	}
	,/* 得到星座名 */
	getxz:function(date)
	{
		var datenew = new Date(date);
		
		var month = datenew.getMonth() + 1;
		var day = datenew.getDate();
		
		var s="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
	    var arr=[20,19,21,21,21,22,23,23,23,23,22,22];
	    return s.substr(month*2-(day<arr[month-1]?2:0),2);
	}
	
	
	,/* 调用ajax */
	ajax: function(async, postorget, url, data, funcallback) {
		var timestamp = new Date().getTime();
		
		var newurl = this.wwwroot + url;
		
		if(url.indexOf("?") >= 0)
		{
			newurl += "&t=" + timestamp;
		}else
		{
			newurl += "?t=" + timestamp;
		}
		
		$.ajax(
			newurl, {
				async: async,
				cache: false,
				dataType: "json",
				data: data,
				type: postorget,
				//contentType: "application/json",//不去掉就不支持post
				processData: true,
				headers: {
                    //'Authorization': 'Basic ' + token,
                    //'Role': role
                }
				, complete: function(e, xhr, settings){
			       if(e.status === 200){
			
			       }else if(e.status === 304){
			
			       }else{
						alert("http error:" + e.status);
			       }
				}
				, success: function(data, textStatus, jqXHR) {
					if (textStatus == "success") {
						try {
							funcallback(data);
						} catch (e) {
							myjstools.showerrinfo("myjstools.ajax.error2:提交结果错误了！" + textStatus);
						}
					}
				}
			}
		).error(function(jqXHR, textStatus, errorThrown) {
			if(window.confirm("网络不给力，是否重试？"))
			{
				myjstools.ajax(async, postorget, url, data, funcallback);
			}
		});
	}
	
	
	,/* 调用ajax，参数用json格式化 */
	ajax_jsondata: function(async, postorget, url, data, funcallback) {
		this.ajax(async, postorget, url, JSON.stringify(data), funcallback);
	}

	
	,/* 得到全部 up="up" type="text" input的 value  */
	getallinput: function()
	{
		var data = new Object();
		
		$("[up='up']").each(function() {
			data[$(this).attr("id")] = $(this).val();
		});
		
		return data;
	}
	
	,/* 全部 up="up" type="text" input的 value 赋值 */
	setallinput: function(data)
	{
		$("[up='up']").each(function() {
			if(data[$(this).attr("id")])
			{
				$("#" + $(this).attr("id")).val(data[$(this).attr("id")]);
				
				try
				{
					$("#" + $(this).attr("id")).textbox("setValue", data[$(this).attr("id")]);
				}catch(e)
				{
					
				}
			}
		});
		
		return data;
	}
	, /* 日期添加天数 */
	addDate:function(dd,dadd){
		var a = new Date(dd)
		a = a.valueOf()
		a = a + dadd * 24 * 60 * 60 * 1000
		a = new Date(a)
		return a;
	}

	, /* 返回  n天m小时  */
	getdiffdayhour:function(d1,d2){
		var dt_d = 0;
        var dt_h = 0;
        var dt_d_all = 0;
        var dt_diff = ""; 
        
		dt_d = parseInt((d2.getTime() - d1.getTime() - 8 * 60 * 60 * 1000)/(24 * 60 * 60 * 1000));
			            
        dt_d_all = d2.getTime() - d1.getTime() - 8 * 60 * 60 * 1000;
        
        dt_h = parseInt((dt_d_all - dt_d * 24 * 60 * 60 * 1000)/(60 * 60 * 1000));
        
        if(dt_d > 0)
        {
        	dt_diff = dt_d + "天";
        }
        if(dt_h > 0)
        {
        	dt_diff += dt_h + "小时";
        }
			       
		return dt_diff;
	}
	
	, /* 格式化金额 */
	fmoney :function (s, n) {
	    n = n > 0 && n <= 20 ? n : 2;  
	    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
	    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];  
	    t = "";  
	    for (i = 0; i < l.length; i++) {  
	        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
	    }  
	    return t.split("").reverse().join("") ;// + "." + r;  
	}
	,
	/* 判断是否为整数 */
	isInteger: function(obj) {
 		return obj%1 === 0
	}
};