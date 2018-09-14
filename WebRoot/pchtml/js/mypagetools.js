/*
 * 分页工具
 */
var mypagetools =
{
	// 当前页号
	page : 1
	, 
	// 总页数
	pagecount : 0
	, 
	// 每页行数
	pagesize : 20
	,
	// 数据地址
	url : ""
	,
	//初始化
	init : function()
	{
		try
		{
			$("#li_page_f").addClass("disabled");
			$("#li_page_p").addClass("disabled");
			$("#li_page_n").addClass("disabled");
			$("#li_page_l").addClass("disabled");
				
			$("#a_page_f").click(function(){mypagetools.gotofirst();});
			$("#a_page_p").click(function(){mypagetools.gotopre();});
			$("#a_page_n").click(function(){mypagetools.gotonext();});
			$("#a_page_l").click(function(){mypagetools.gotolast();});
		}catch(e)
		{
			
		}
	}
	,
	// 得到查询条件
	getpara : function()
	{
		
	}
	,
	// 刷新数据
	refreshdata : function(data)
	{
		
	}
	,
	// 打开第一页
	gotofirst : function()
	{
		this.gotopage(1);
	}
	,
	// 打开最后一页
	gotolast : function()
	{
		this.gotopage(this.pagecount);
	}
	,
	// 上一页
	gotopre : function()
	{
		this.gotopage(this.page - 1);
	}
	,
	// 下一页
	gotonext : function()
	{
		if(this.page + 1 > this.pagecount)
		{
			return ;
		}
		
		this.gotopage(this.page + 1);
	}
	,
	// 打开指定页
	gotopage : function(pageno)
	{
		try
		{
			if(pageno > this.pagecount)
			{
				pageno = this.pagecount;
			}
			
			if(pageno < 1)
			{
				pageno = 1;
			}
			
			this.page = pageno;
			
			var para = this.getpara();
			
			para.currentPage = this.page; // 开始页数
			para.showCount = this.pagesize; //每页行数
			
			myjstools.ajax(true, "POST", this.url, para, this.gotopagecallback);
		}catch(e)
		{
			myjstools.showerrinfo("gotopage.error:" + e.message);
		}
	}
	,
	// 回调
	gotopagecallback : function(data)
	{
		try
		{
			if(data.success != 1)
            {
            	myjstools.showerrinfo("gotopagecallback.error:出错了！" + data.msg);
            	
            	return;
            }
			
			mypagetools.pagecount = Math.floor((data.totalResult - 1) / mypagetools.pagesize + 1);
			
			$("#li_page").html(mypagetools.page + "/" + mypagetools.pagecount);
			
			$("#li_page_f").removeClass("disabled");
			$("#li_page_p").removeClass("disabled");
			$("#li_page_n").removeClass("disabled");
			$("#li_page_l").removeClass("disabled");
			
			if(mypagetools.page <= 1)
			{
				$("#li_page_f").addClass("disabled");
				$("#li_page_p").addClass("disabled");
			}
			
			if(mypagetools.page >= mypagetools.pagecount)
			{
				$("#li_page_n").addClass("disabled");
				$("#li_page_l").addClass("disabled");
			}
		}catch(e)
		{
			
		}
		
		
		mypagetools.refreshdata(data);
	}
}
