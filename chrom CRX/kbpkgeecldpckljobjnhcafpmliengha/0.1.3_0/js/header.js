//==================================================//
//===================全局变量========================//
//==================================================//
var uid = 0;//用户ID
var is_admin;//是不是管理员
var SCRIPT_ROOT = 'http://www.duoc.cn';
/*表单name列表数组*/
var login_a = new Array('email','passwd');//登陆
var signin_a = new Array('email','passwd','name');//注册
var time = new Date();
var se = parseInt(time.getTime()/1000);
var picSize = '';
//==================================================//
//===================模板函数========================//
//==================================================//
String.prototype.template = function(obj) {
    return this.replace(/\$\w+\$/gi, function(matchs) {
        var returns = obj[matchs.replace(/\$/g, "")];
        return (returns + "") == "undefined"? "": returns;
    });
};
//==================================================//
//=================遍历模板函数=======================//
//==================================================//
function JsonToString_temp(JSON,template){
	var str = '';
    htmlTemp = template.text();
	JSON.eacg(function(i) {
	    str += htmlTemp.temp(JSON[i]);
	});
	return str;
}
//==================================================//
//===================翻页函数========================//
//==================================================//
function turn_page(page,pageJson,page_box)//参数分别是本地记录的当前页数,传回的json(page：当前页数,page_end：结尾页数),包含翻页按钮的元素(page_left && page_right)
{
	page = pageJson.page;
	page_box.find(".page_left,.page_right").show();
	if(page == 1 || page == 0)
	{
		page_box.find(".page_left").hide();
	}
	if(page == pageJson.page_end)
	{
		page_box.find(".page_right").hide();
	}
	return page;
}
//==================================================//
//===================遍历错误信息=====================//
//==================================================//
function Traversal(info,array,show_info){//遍历info，返回string
	str = '';
	if(typeof info === 'string')
		str = info;
	else
	{
		for(count in array)
		{
			try
			{
				if(info[array[count]].constructor﻿ === Array)
				{
					for(x in info[array[count]])
					{
						str += info[array[count]][x] + "<br/>";
					}	
				}
				else
				{
					str += info[array[count]] + "<br/>";
				}
			}
			catch(err)
			{
				continue;
			}
							
		}
	}
	return str;
}
//==================================================//
//===================遍历info信息=====================//
//==================================================//
function info_cross(info){//遍历info，返回string
	str = '';
	if(typeof info === 'string')
		str = info;
	else
	{
		$(info).each(function(){
			str += info[x] + "<br/>";
		})
	}
	return str;
}
function _print(o){
	var ob = {};
	if(o == undefined || o == '' || o == ob || o.length == undefined)
	{
		return false;
	}
	else
	{
		var _str = info_cross(o),
			_time = _str.length*50;
		$.Alert({text:_str,time:_time});
	}
}
//==================================================//
//=====================弹出登陆======================//
//==================================================//
function pop_loginform(){
	$("#header_loginPage").slideDown("slow");
	$("#header_loginPage_bg").fadeTo("slow",0.5);
}
//==================================================//
//=====================收回登陆======================//
//==================================================//
function back_loginform()
{
	$("#header_loginPage").slideUp("fast");
	$("#header_loginPage_bg").hide();
}
//==================================================//
//==================背景填充=========================//
//==================================================//
var set_bg = function(){//定义背景
	var bg_pic = $("#bg"),
		life_bg = $("#life_bg,#life_bg_cover"),
		login = $("#header_loginPage"),
		login_bg = $("#header_loginPage_bg"),
		welcome = $("#wel_container"),
		idocument;
	login.css({ left:0 });
	login_bg.width(0).height(0);
	bg_pic.width(0).height(0);
	life_bg.width(0);
	welcome.height(0);
	if($.browser.opera||$.browser.mozilla||$.browser.msie) {
		idocument = document.documentElement;
  	}
	else{
		idocument = document.body;
	};
	var popW = idocument.clientWidth,
		popH = idocument.scrollHeight,
		win_width = Math.max(idocument.scrollWidth,popW),
		win_height = Math.max(popH,idocument.clientHeight);	
	welcome.height(win_height-40);
	login.css({left: (win_width-960)/2+"px"});
	login_bg.css("width",win_width+"px").css("height",win_height+"px");
	life_bg.width(popW);
	if(popW/popH>=1.8 || $("#container").css("display") != 'none')
	{
		if(popW <= 960)
		{
			bg_pic.css({width:"960px",height:"534px"});
		}
		else
			bg_pic.css({width:popW+"px",height:popW*5/9+"px"});
	}
	else if(popW/popH<1.8)
	{
		if(popH <= 534)
		{
			bg_pic.css({width:"960px",height:"534px"});
		}
		else
			bg_pic.css({width:popH*1.8+"px",height:popH+"px"});
	}
	return win_height;
}
//==================================================//
//===================用户登录处理=====================//
//==================================================//
function login(json){//用户登录处理
	uid = json.uid;
	$(".header_login").hide();
	var sign_plane = $(".header_signin");
	sign_plane.show();
	if(json.new_reminds != 0)
	{
		sign_plane.find("#header_signin_name a").attr("href",json.timeline).html(json.name+"<span class='png'>"+json.new_reminds+"</span>");
	}
	else{
		sign_plane.find("#header_signin_name a").attr("href",json.timeline).html(json.name);
	}
	sign_plane.find("#header_signin_ugc a").attr("href",json.create_style);
	sign_plane.find("#header_signin_tool .set").attr("href",json.profile);
	sign_plane.find("#header_signin_tool .timeline").attr("href",json.timeline);
	sign_plane.find("#header_signin_tool .noti").attr("href",json.notify);
	sign_plane.find("#header_signin_tool .manage").attr("href",json.manage_url);
	if(json.new_noti > 0)
	{
		$("#header_signin_notice").show().find("a").attr({
			href:json.notify
		});
	}
	else
	{
		$("#header_signin_notice").hide();
	}
	if($("#header_signin_name>span").text()=='0')//新提醒判断
		$("#header_signin_name>span").hide();
	else
		$("#header_signin_name>span").show();
	is_admin = json.is_admin;
	back_loginform();
	login_fun();
}
function login_fun(){};
//==================================================//
//===================用户登出处理=====================//
//==================================================//
function logout(){//用户登出处理
	uid = 0;
	$(".header_login").show();
	$(".header_signin").hide();
	$("#header_signin_notice").hide();
	$.Alert({text:"退出成功",time:2000});
}
//==================================================//
//================表单密码MD5加密=====================//
//==================================================//
function submit_MD5(form){//密码MD5加密
	var param = {};
	form.find("input").not(":submit").each(function(i){
		input = $(this)
		type = input.attr("type");
		name = input.attr("name");
		if(type == "password")
			param[name] = hex_md5(input.val());
		else
			param[name] = input.val();
	});
	return param;
}
//==================================================//
//=====================输入框默认文字=================//
//==================================================//
function text_define(form){
	$(form + " .define").live("focusin",function(){//去掉输入框默认文字
		$(this).val("").removeClass("define");
	})
}
//==================================================//
//=====================自动补全======================//
//==================================================//
function text_fix(type,input,poplist,callback){
	var url="/ugc/ajax-get-";
	var pf_max_num = 5;
	var kw_max_num = 50;
	var timedCount = 1;
	switch(type)
	{
		case 'habit':
			url += "habits";
			break;
		case 'paper':
			url += "papers";
			break;
		case 'stuff':
			url += "stuffs";
			break;
		case 'userinfo':
			url += "userinfo";
			break;
	};
	var fix_ajax = function(up_this){
		timedCount = 0;
		var param = {};
		param.keywords = up_this.val();
		param.pf_max_num = pf_max_num;
		param.kw_max_num = kw_max_num;
		$.jget({
		    url:url+"?"+$.param(param),
		    callback:function(json){
		        if(json.done == "OK")
		        {
		        	str = "";
		            switch(type)
					{
						case 'habit':
							$(json.list).each(function(i){
								str += "<span class='li li_habit'><span class='name' name='"+json.list[i].id+"'>"+json.list[i].name+"</span></span>";
							});
							break;
						case 'paper':
							$(json.list).each(function(i){
								str += "<span class='li li_paper'><span class='name' name='"+json.list[i].id+"'>"+json.list[i].name+"</span><span class='quality'>"+json.list[i].quality+"</span><span class='msg_num'>"+json.list[i].msg_num+"</span></span>";
							});
							break;
						case 'stuff':
							$(json.list).each(function(i){
								str += "<span class='li li_stuff'><span class='name' name='"+json.list[i].id+"'>"+json.list[i].name+"</span></span>";
							});
							break;
						case 'userinfo':
							$(json.list).each(function(i){
								str += "<span class='li li_user' name='"+json.list[i].url+"'><img src='"+json.list[i].avatar+"'/><span class='name'>"+json.list[i].name+"</span></span>";
							});
							break;
					};
					up_this.siblings(".text_poplist").html(str);
					if(up_this.siblings(".text_poplist").find(".li").length > 0)
					{
						up_this.siblings(".text_poplist").show();
					}
					else
					{
						up_this.siblings(".text_poplist").hide();
					}
					if(type == 'paper' && json.same == true)
					{
						up_this.css("color","#232323");
						notice = up_this.parents(".paper_parent").siblings(".notice").find("span");
						if(notice.text() == '请输关键词搜索小报，小报的投稿提醒需超30条才可被收藏到生活方式')
							notice.text('');
					}
					else if(type == 'paper' && json.same == false)
					{
						up_this.css("color","#943603").parents(".paper_parent").siblings(".notice").find("span").text("请输关键词搜索小报，小报的投稿提醒需超30条才可被收藏到生活方式");
					}
					timedCount = 1;
		        }
		        else
		        {
		            $.Alert({text:json.info,time:2000});
		            up_this.siblings(".text_poplist").html("");
		            $(poplist).hide();
		            timedCount = 1;
		        }
		    }
		});
		up_this.siblings(".text_poplist").show();
	};
	input_value = $(input).val();
	$(input).live({keyup:function(e){
			up_this = $(this);
			if(e.which == 40)
			{
				if(up_this.siblings(".text_poplist").find(".selected").length > 0){
					up_this.siblings(".text_poplist").find(".selected").removeClass("selected").next(".li").addClass("selected");
				}
				else
				{
					up_this.siblings(".text_poplist").find(".li:eq(0)").addClass("selected");
				}
				return false;
			}
			else if(e.which == 38)
			{
				if(up_this.siblings(".text_poplist").find(".selected").length > 0){
					up_this.siblings(".text_poplist").find(".selected").removeClass("selected").prev(".li").addClass("selected");
				}
				else
				{
					up_this.siblings(".text_poplist").find(".li:last").addClass("selected");
				}
				return false;
			}
			else if(e.which == 13)
			{
				sel = up_this.siblings(".text_poplist").find(".selected");
				if(sel.length > 0){
					val = sel.find(".name").text();
					up_this.val(val);
					sel.removeClass("selected");
					$(poplist).hide();
					if(type == 'userinfo')
					{
						up_this.parents("#ugc_msg_guy").find("#guy_link").val(sel.attr("name"));
					}
					up_this.css("color","#232323");
					notice = up_this.parents(".paper_parent").siblings(".notice").find("span");
					if(notice.text() == '请输关键词搜索小报，小报的投稿提醒需超30条才可被收藏到生活方式')
						notice.text('');
				}
				return false;
			}
			else if(up_this.val() != input_value)
			{
				input_value = up_this.val();
				fix_ajax(up_this);
				return false;
			}
			return false;
		},click:function(){
			fix_ajax($(this));
			return false;
		},keydown:function(e){
			if(e.which == 13)
				return false;
		}
	});
	$("body").click(function(){
		$(poplist).hide();
	})
	$(poplist+' .li').live({mouseenter:function(){
		$(this).addClass("selected").siblings(".li").removeClass("selected");
	},mouseleave:function(){
		$(this).removeClass("selected");
	},click:function(){
		now_hover = $(this);
		up_this = now_hover.parent("div").siblings(":text");
		if(up_this.siblings(".text_poplist").find(".selected").length > 0){
			val = now_hover.find(".name").text();
			up_this.val(val).siblings(".text_poplist").find(".selected").removeClass("selected");
			if(type == 'userinfo')
			{
				up_this.parents("#ugc_msg_guy").find("#guy_link").val(now_hover.attr("name"));
			}
			up_this.css("color","#232323");
			notice = up_this.parents(".paper_parent").siblings(".notice").find("span");
			if(notice.text() == '请输关键词搜索小报，小报的投稿提醒需超30条才可被收藏到生活方式')
				notice.text('');
			$(poplist).hide();
		}
	}})
}
//==================================================//
//=====================上传图片======================//
//==================================================//
var img_loading = false;
function upload_picture(file,type){
	file.change(function(){
		var _img = $("#mini_img"),
			up_input = $(this);
		img_loading = true;
		_img.after("<div id='img_loading_cover'><img style='top:"+(_img.height()-128)/2+"px;left:"+(_img.width()-128)/2+"px' src='http://duoc-cn.b0.upaiyun.com/static/design/global/duoc/img_loading.gif'/></div><div id='img_loading_msg'>图片上传中···</div>'");
		var loading_cover = $("#img_loading_cover"),
			_img_offset = _img.offset();
		loading_cover.offset({
			top:_img_offset.top,
			left:_img_offset.left
		}).width(_img.width()).height(_img.height());
		$.ajax({//==================================url信息获取
			cache:false,
			type:'GET',
			url:"/pics/get-sign?type="+type,
			dataType:"json",
			success:function(json){
				$("#policy").val(json.policy);
    			$("#signature").val(json.signature).parents("form").attr("action",json.url).get(0).submit();
			},
			error:function(){
				$.Alert({text:"网络异常，请重新操作",time:2000});		
				img_load_done();
			}
		});
	})
}
function img_load_acting(){
	if(img_loading)
	{
		$.Alert({text:"正在传图中，请不要提交本页面，否则会传图失败哦",time:3000});
		return true;
	}
	else
	{
		return false;
	}
}
function img_load_done(){
	$("#img_loading_cover,#img_loading_msg").remove();
	img_loading = false;
}
function DC_upload_callback(r){ //上传完毕回调函数
	if(r.code == 200)
	{
		$("#mini_img").show().attr("src",r.url_header+r.url+picSize);
	}
	else if(r.code == 403 && r.message == 'Not accept, File too large')
	{
		$.Alert({text:"失败,上传图片过大,请限制在4M以下",time:2000});
	}
	else
	{
		$.Alert({text:"上传失败",time:2000});
		try
		{
			console.log(r);
		}
		catch(err)
		{
			return false;
		}
	}
	img_load_done();
}
//==================================================//
//=====================表单验证======================//
//==================================================//
function email(input){
	var value = input.val(),
		apos=value.indexOf("@"),
		dotpos=value.lastIndexOf(".");
	if(apos<1||dotpos-apos<2)
	{
		input.siblings(".notice").find("span").text("  邮箱格式不对");
		return false;		
	}		
	else
	{
		if(input.siblings(".notice").find("span").text() == '  邮箱格式不对')
			input.siblings(".notice").find("span").text("");
		return true;
	}		
}
function password(input,input_again){
	if(input_again.val() != input.val())
	{
		input_again.siblings(".notice").find("span").text("  两次输入密码不一致");
		return false;
	}		
	else
	{
		if(input_again.siblings(".notice").find("span").text() == '  两次输入密码不一致')
			input_again.siblings(".notice").find("span").text("");
		return true;
	}		
}
function maxlength(inputs,max,text){
	inputs.keydown(function(){
		input = $(this);
		str = $(this).val();
		if(str.length >= max)
		{
			input.siblings(".notice").find("span").text("  "+text);
		}
		else if(input.siblings(".notice").find("span").text() == "  "+text)
		{
			input.siblings(".notice").find("span").text("");
		}
	}).blur(function(){
		input = $(this);
		if(input.siblings(".notice").find("span").text() == "  "+text)
			input.siblings(".notice").find("span").text("");
	})	
}
function maxlength_one(input,max,text){
	str = input.val();
	if(str.length >= max)
	{
		input.siblings(".notice").find("span").text("  "+text);
		return false;
	}
	else if(input.siblings(".notice").find("span").text() == "  "+text)
	{
		input.siblings(".notice").find("span").text("");
		return true;
	}
	else
	{
		return true;
	}
}
function minlength(inputs,min,text){
	inputs.blur(function(){
		input = $(this)
		str = input.val();
		if(str.length < min)
		{
			input.siblings(".notice").find("span").text("  "+text);
		}
		else
		{
			if(input.siblings(".notice").find("span").text() == "  "+text)
				input.siblings(".notice").find("span").text("");
		}
	})	
}
function minlength_one(input,min,text){
	str = input.val();
	if(str.length < min)
	{
		input.siblings(".notice").find("span").text("  "+text);
		return false;
	}
	else
	{
		if(input.siblings(".notice").find("span").text() == "  "+text)
			input.siblings(".notice").find("span").text("");
		return true;
	}
}
function maxnumber(inputs,max,text){
	inputs.blur(function(){
		input = $(this)
		num = parseInt($(this).val());
		if(num >= max)
		{
			input.siblings(".notice").find("span").text("  "+text);
		}
		else
		{
			if(input.siblings(".notice").find("span").text() == "  "+text)
				input.siblings(".notice").find("span").text("");
		}
	})
}
function number_range(inputs,min,max){
	inputs.live({
		keydown:function(e){
			var el = $(this),
				str = el.val(),
				done = function(range){
					var num;
					switch(range)
					{
						case 'main':
							num = e.which-48;
							break;
						case 'sub':
							num = e.which-96;
							break;
						case 'none':
							return true;
							break;
					}
					num = Number(str+num);
					if(num<=max && num>=min)
					{
						return true;
					}
					else
					{
						return false;
					}
				};
			if(e.which<=57 && e.which>=48)
			{
				return done('main');
			}
			else if(e.which<=105 && e.which>=96)
			{
				return done('sub');
			}
			else if(e.which==8 || e.which==46 || e.which==37 || e.which==39 || e.which==9)
			{
				return done('none');
			}
			else
			{
				return false;
			}
		},blur:function(){
			var el = $(this),
				num = Number(el.val());
			el.val(num);
		}
	});
}
function same_name_ajax(input,type){
	value = input.val();
	if(value.replace(/(^\s*)|(\s*$)/g,"")!="")
	{
		$.jget({
		    url:"/ugc/check-name?type="+type+"&name="+value,
		    callback:function(json){
		        if(json.stat == 'NOTUSE')
		        {
		            if(input.siblings(".notice").find("span").text() == "这个名称已经被使用了哦")
						input.siblings(".notice").find("span").text("");
		        }
		        else if(json.stat == 'USED')
		        {
		            input.siblings(".notice").find("span").text("这个名称已经被使用了哦");
		        }
		    }
		});
	}
}
function same_name(input,type){
	input.keyup(function(){
		same_name_ajax(input,type);
	})
}
function blank(input){
	if(input.val().replace(/(^\s*)|(\s*$)/g,"")=="" || input.is(".define"))
	{
		return true;
	}
	else
	{
		return false;
	}
}
//==================================================//
//=====================数组乱序======================//
//==================================================//
function shuffle(o){ //v1.0
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};
//==================================================//
//==================JSON TO STRING==================//
//==================================================//
function JsonToString (obj){   
        var THIS = this;    
        switch(typeof(obj)){   
            case 'string':   
                return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';   
            case 'array':   
                return '[' + obj.map(THIS.JsonToString).join(',') + ']';   
            case 'object':   
                 if(obj instanceof Array){   
                    var strArr = [];   
                    var len = obj.length;   
                    for(var i=0; i<len; i++){   
                        strArr.push(THIS.JsonToString(obj[i]));   
                    }   
                    return '[' + strArr.join(',') + ']';   
                }else if(obj==null){   
                    return 'null';   
  
                }else{   
                    var string = [];   
                    for (var property in obj) string.push(THIS.JsonToString(property) + ':' + THIS.JsonToString(obj[property]));   
                    return '{' + string.join(',') + '}';   
                }   
            case 'number':   
                return obj;   
            case false:   
                return obj;   
        }   
    }


//==================================================//
//==================生活方式一键跟随==================//
//==================================================//

function follow_style(id,callback){
	if(!arguments[1])
	{
		arguments[1] = function(){};
	}
	$.jpost({
		url:'/popup/follow-style',
		data:'style_id='+id,
		callback:function(json){
			/*=====*/
			$(this).popframe({jq_box:$("#follow"),warn:true});
			win = $("#follow");
			win.find(".title_p").text("跟随["+json.style_name+"]成功!").siblings(".detail").find(".other").text("它将在未来"+json.duration+"天内提醒你");
			win.find(".button").attr("href",json.go_to_task);
			win.find(".big_button").click(function(){
				button = $(this);
				$.popframe_close();
				button.unbind("click");
			});
			callback();
		}
	})
}
//==================================================//
//==================生活方式取消跟随==================//
//==================================================//
function cancel_style_following(id,callback){
	if(!arguments[1])
	{
		arguments[1] = function(){};
	}
	$.ensure({callback:function(){
		$.jpost({
            url: SCRIPT_ROOT+"/profile/cancel-follow-style",
	        data:"style_id="+id,
	        callback:function(json){
	                $.Alert({text:"成功退出",time:2000});
	                callback();
	                try{
	                	addIist(order,page);
	                }
	                catch(err){}
	        }
		});
	},title:'如果退出，该生活方式将不再提醒我，是否确定退出？',button:'退出'});
}
//==================================================//
//==================小报习惯收藏操作==================//
//==================================================//
function collect(id,type){
	var hour = time.getHours();
	var time_str = [[-1],[-1],[-2],[hour],[0]];

	function write_time(value){
		var list = [];
		if(typeof(value) == 'string')
		{
			list[0] = Number(value);
			return list;
		}
		else
		{
			var i=value.length;
			for(i;i>0;i--)
			{
				list.push(Number(value[i-1]));
			}
			list.reverse();
			if(list[0] === -1 && value.length!=1)
			{
				list = list.slice(1);
			}
			return list;
		}
	}

	function change_time(sel){
		switch(sel.attr("id"))
		{
			case 'minute':
				time_str[4]=write_time(sel.val());
				break;
			case 'hour':
				time_str[3]=write_time(sel.val());
				break;
			case 'month':
				time_str[0]=write_time(sel.val());
				break;
			case 'day':
				time_str[2]= [-2];
				time_str[1]=write_time(sel.val());
				break;
			case 'date':
				time_str[1]= [-2];
				time_str[2]=write_time(sel.val());
				break;
		}
	}
	function choose_time(sel,list){
		if(sel.is("input"))
		{
			sel.val(list[0]);
			return true;
		}
		sel.find("option").attr("selected",false);
		for(x in list)
		{
			if(list[x] == -2)
			{
				if(sel.is("#date"))
				{
					sel.attr("disabled",true).hide().siblings("#day").attr("disabled",false).show().siblings("#change_time_type").find("span[name=day]").addClass("done").siblings("span").removeClass("done");
				}
				else if(sel.is("#day"))
				{
					sel.attr("disabled",true).hide().siblings("#date").attr("disabled",false).show().siblings("#change_time_type").find("span[name=date]").addClass("done").siblings("span").removeClass("done");
				}
				list[x] == -1;
			}
			sel.find("option[value="+list[x]+"]").attr("selected",true);
		}
		return true;
	}

	function auto_choose_time(win,json){
		var rule = json.rule;
		choose_time(win.find("#minute"),rule[4]);
		choose_time(win.find("#hour"),rule[3]);
		choose_time(win.find("#month"),rule[0]);
		choose_time(win.find("#day"),rule[1]);
		choose_time(win.find("#date"),rule[2]);
		time_str = rule;
		win.find("#collected_show").show().text('已收藏');
	}

	function collected(win,sel){
		var param = {};
		param['item_type'] = type;
		param['item_id'] = id;
		param['style_id'] = Number(sel.val());
		$.jget({
			url:'/popup/get-style-item-info?'+$.param(param),
			callback:function(json){
				if(json.stat == 'COLL')
				{
					auto_choose_time(win,json);
				}
				else
				{
					win.find("#collected_show").hide().text("");
				}
			}
		});
	}

	$(this).popframe({jq_box:$("#collect"),warn:true});
	var win = $("#collect");
	$.jget({
		url:'/popup/get-owned-styles',
		callback:function(json){
			var sel = win.find("#style_sel .new_style"),
				str = "<option value='$id$'>$title$</option>",
				str_checked = "<option selected='selected' value='$id$'>$title$</option>";
			sel.siblings("option").remove();
			$(json.styles).each(function(i){
				if(i==0)
				{
					sel.before(str_checked.template(json.styles[i]));
					collected(win,win.find("#style_sel"));
				}
				else
				{
					sel.before(str.template(json.styles[i]));
				}
				if(win.find("#style_sel option").length != 1)
				{
					win.find("#new_style").hide();
				}
				else
				{
					win.find("#new_style").show();
				}
			});
		}
	})	
	if(win.find("#style_sel option").length != 1)
	{
		win.find("#new_style").hide();
	}
	win.find("#hour option[value='"+hour+"']").attr("selected",true);
	win.find("#change_time_type span").click(function(){
		var button = $(this);
		button.addClass("done").siblings("span").removeClass("done");
		if(button.attr("name") == 'day')
		{
			button.parent("#change_time_type").siblings("#day").show().attr("disabled",false).siblings("#date").hide().attr("disabled",true);
		}
		else if(button.attr("name") == 'date')
		{
			button.parent("#change_time_type").siblings("#date").show().attr("disabled",false).siblings("#day").hide().attr("disabled",true);
		}
	}).hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	});
	win.find("#collected_show").hide();
	win.find("#style_sel").change(function(){
		var sel = $(this);
		if(sel.val() == "new")
		{
			win.find("#new_style").slideDown(200);
			win.find("#collected_show").hide();
		}
		else
		{
			win.find("#new_style").hide();
			var param = {};
			collected(win,sel);
		}
	});
	maxlength(win.find("#new_style input"),18,"最大18个字符");
	win.find("#new_style input").keyup(function(){
		same_name_ajax($(this),'style');
	});

	win.find("select:not('#style_sel')").change(function(){
		change_time($(this));
	});
	win.find("#hour,#minute").change(function(){
		change_time($(this));
	});	

	win.find(".button").click(function(){
		var param = {},
			sel = win.find("#style_sel");
		if(sel.val()=='new')
		{
			param['style_title'] = win.find("#new_style input").val();
			param['style_id'] = (-1);
		}
		else
		{
			param['style_title'] = sel.find(":selected").text();
			param['style_id'] = Number(sel.val());
		}
		param['item_type'] = type;
		param['item_id'] = id;
		param['rule'] = JsonToString(time_str);
		$.jpost({
			url:'/popup/collect-to-style',
			data:param,
			callback:function(json){
				if(json.stat == 'ALREADY')
				{
					$.Alert({text:"你的该生活方式的该时段已经有该任务了，不可重复哦",time:1000});
				}
				else
				{				
					$.confirm({
						'title':'收藏成功！',
						'yes':'去生活方式',
						'no':'留在此页',
						'callback':function(){
							window.location.href = json.style_url;
						}
					});
				}
			}
		})
	})

}
//==================================================//
//==================东西的收藏操作===================//
//==================================================//
function collect_stuff(id){
	$(this).popframe({jq_box:$("#collect_stuff"),warn:true});
	win = $("#collect_stuff");
	win.find(".habit_list").hide();
	win.find("#target_sel").change(function(){
		sel = $(this);
		if(sel.val() == 'habit')
		{
			$.jget({
				url:'/popup/get-using-habit',
				callback:function(json){
					var str = "<div class='li'><span class='name' name='$habit_id$'>$habit_name$</span><span class='parent_style' name='$style_id$'>$style_title$</span></div>",
						list_container = win.find(".habit_list"),
						temp = {},
						html = '';
					for(x in json.list)
					{
						for(y in json.list[x].habits)
						{
							temp = json.list[x].habits[y];
							temp['style_title'] = json.list[x].style_title;
							if(temp['style_title'].length > 6)
							{
								temp['style_title'] = temp['style_title'].slice(0,5)+"...";
							}
							temp['style_id'] = json.list[x].style_id;
							html += str.template(temp);
						}
					}
					list_container.html(html);
					win.find(".habit_list .li").bind({
						mouseenter:function(){
							$(this).addClass("hover");
						},mouseleave:function(){
							$(this).removeClass("hover");
						},click:function(){
							$(this).toggleClass("done");
						}
					})
				}
			});
			sel.parent("p").siblings(".habit_list").show();
		}
		else
		{
			sel.parent("p").siblings(".habit_list").hide();
		}
	})
	win.find(".button").click(function(){
		var value = win.find("#target_sel").val(),
			param = {},
			url = '/popup/collect-stuff';
		if(value == 'habit')
		{
			url = '/popup/collect-stuff-habit';
			var temp_json = {},
				temp_array = [];
			win.find(".habit_list .done").each(function(){
				block = $(this);
				temp_json = {};
				temp_json['style_id'] = Number(block.find(".parent_style").attr("name"));
				temp_json['habit_id'] = Number(block.find(".name").attr("name"));
				temp_array.push(temp_json);
			})
			param['collect_to'] = JsonToString(temp_array);
		}
		else if(value == 'wish')
		{
			param['c_type'] = 'wished';
		}
		else if(value == 'have')
		{
			param['c_type'] = 'owned';
		}
		param['stuff_id'] = id;
		$.jpost({
			url:url,
			data:param,
			callback:function(json){
				if(json.stat == 'DONE')
				{
					$.Alert({text:"收藏成功！",time:1000});
					$.popframe_close();
				}
				else if(json.stat == 'ALREADY')
				{
					$.Alert({text:"你已经收藏过啦。",time:1000});
				}
			}
		});
	});
}
//==================================================//
//=====================提醒评价======================//
//==================================================//
function message_vote(id,stat,button){
	var param = {};
	param.msg_id = id;
	param.dst_stat = stat;
	param.with_no = 1;
	$.jpost({
		url:'/msg_vote',
		data:param,
		callback:function(json){
			var plane = button.parents(".message_vote");
			plane.find(".credit").text(json.credit);
			plane.find(".backing").text(json.sp_no);
			plane.find(".against").text(json.ob_no);
			if(stat === 1)
			{
				plane.find(".good").addClass("good_done");
				plane.find(".bad").removeClass("bad_done");
			}
			else if(stat === -1)
			{
				plane.find(".good").removeClass("good_done");
				plane.find(".bad").addClass("bad_done");
			}				
			else if(stat === 0)
			{
				plane.find(".good").removeClass("good_done");
				plane.find(".bad").removeClass("bad_done");
			}
			_print(json.info);
		}
	});
}
//==================================================//
//=====================MD5==========================//
//==================================================//
//<input type=button value=md5 onclick="alert(hex_md5(test.value))">//
//==================================================//
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode */
/*
* These are the functions you'll usually want to call
* They take string arguments and return either hex or base-64 encoded strings
*/
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
/* Backwards compatibility - same as hex_md5() */
function calcMD5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
/*
* Perform a simple self-test to see if the VM is working
*/
function md5_vm_test()
{
return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}
/*
* Calculate the MD5 of an array of little-endian words, and a bit length
*/
function core_md5(x, len)
{
/* append padding */
x[len >> 5] |= 0x80 << ((len) % 32);
x[(((len + 64) >>> 9) << 4) + 14] = len;
var a = 1732584193;
var b = -271733879;
var c = -1732584194;
var d = 271733878;
for(var i = 0; i < x.length; i += 16)
{
var olda = a;
var oldb = b;
var oldc = c;
var oldd = d;
a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
c = md5_ff(c, d, a, b, x[i+ 2], 17, 606105819);
b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
d = md5_ff(d, a, b, c, x[i+ 5], 12, 1200080426);
c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
a = md5_ff(a, b, c, d, x[i+ 8], 7 , 1770035416);
d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
a = md5_ff(a, b, c, d, x[i+12], 7 , 1804603682);
d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
b = md5_ff(b, c, d, a, x[i+15], 22, 1236535329);
a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
c = md5_gg(c, d, a, b, x[i+11], 14, 643717713);
b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
d = md5_gg(d, a, b, c, x[i+10], 9 , 38016083);
c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
a = md5_gg(a, b, c, d, x[i+ 9], 5 , 568446438);
d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
b = md5_gg(b, c, d, a, x[i+ 8], 20, 1163531501);
a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
c = md5_gg(c, d, a, b, x[i+ 7], 14, 1735328473);
b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
c = md5_hh(c, d, a, b, x[i+11], 16, 1839030562);
b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
d = md5_hh(d, a, b, c, x[i+ 4], 11, 1272893353);
c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
a = md5_hh(a, b, c, d, x[i+13], 4 , 681279174);
d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
b = md5_hh(b, c, d, a, x[i+ 6], 23, 76029189);
a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
c = md5_hh(c, d, a, b, x[i+15], 16, 530742520);
b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
d = md5_ii(d, a, b, c, x[i+ 7], 10, 1126891415);
c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
a = md5_ii(a, b, c, d, x[i+12], 6 , 1700485571);
d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
a = md5_ii(a, b, c, d, x[i+ 8], 6 , 1873313359);
d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
b = md5_ii(b, c, d, a, x[i+13], 21, 1309151649);
a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
c = md5_ii(c, d, a, b, x[i+ 2], 15, 718787259);
b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
a = safe_add(a, olda);
b = safe_add(b, oldb);
c = safe_add(c, oldc);
d = safe_add(d, oldd);
}
return Array(a, b, c, d);
}
/*
* These functions implement the four basic operations the algorithm uses.
*/
function md5_cmn(q, a, b, x, s, t)
{
return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}
/*
* Calculate the HMAC-MD5, of a key and some data
*/
function core_hmac_md5(key, data)
{
var bkey = str2binl(key);
if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
var ipad = Array(16), opad = Array(16);
for(var i = 0; i < 16; i++)
{
ipad[i] = bkey[i] ^ 0x36363636;
opad[i] = bkey[i] ^ 0x5C5C5C5C;
}
var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
return core_md5(opad.concat(hash), 512 + 128);
}
/*
* Add integers, wrapping at 2^32. This uses 16-bit operations internally
* to work around bugs in some JS interpreters.
*/
function safe_add(x, y)
{
var lsw = (x & 0xFFFF) + (y & 0xFFFF);
var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 0xFFFF);
}
/*
* Bitwise rotate a 32-bit number to the left.
*/
function bit_rol(num, cnt)
{
return (num << cnt) | (num >>> (32 - cnt));
}
/*
* Convert a string to an array of little-endian words
* If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
*/
function str2binl(str)
{
var bin = Array();
var mask = (1 << chrsz) - 1;
for(var i = 0; i < str.length * chrsz; i += chrsz)
bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
return bin;
}
/*
* Convert an array of little-endian words to a hex string.
*/
function binl2hex(binarray)
{
var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
var str = "";
for(var i = 0; i < binarray.length * 4; i++)
{
str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
hex_tab.charAt((binarray[i>>2] >> ((i%4)*8 )) & 0xF);
}
return str;
}
/*
* Convert an array of little-endian words to a base-64 string
*/
function binl2b64(binarray)
{
var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var str = "";
for(var i = 0; i < binarray.length * 4; i += 3)
{
var triplet = (((binarray[i >> 2] >> 8 * ( i %4)) & 0xFF) << 16)
| (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
| ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
for(var j = 0; j < 4; j++)
{
if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
}
}
return str;
}



/*login ajax*/
var go_timeline = true;
function login_ajax(form){
	var param = submit_MD5(form),
		sp_next = '',
		_next = window.location.href;
	if(_next.split("?next=")[1] != undefined)
	{
		sp_next = decodeURIComponent(_next.split("?next=")[1]);
	}
	else
	{
		sp_next = _next;
	}
		$.jpost({//==================================登陆信息提交
			url:"/login?next="+sp_next,
			data:param,
			callback:function(json){
				if(json.stat == "LOGGED_IN")
				{
					if(sp_next != _next)
					{
						window.location.href=sp_next;
					}
					else if(go_timeline)
					{
						window.location.href="/timeline";
						return false;
					}
					else if(json.next != undefined || json.next != '')
					{
						window.location.href=json.next;
					}
					else
					{
						login(json);
						$.popframe_close();
					}
				}
				else
				{
					if($("#header_loginPage").is(":hidden"))
					{
						_print(json.info);
					}
					else
					{
						$("#page_notice").empty().append(Traversal(json.info,login_a));
					}					
				}
			}
		});
}
$(document).ready(function(){
	set_bg();
	$(window).wresize(function(){
		set_bg();
	});
	
	if($.contains(document.getElementById("hidden"),document.getElementById("flashes")))//判断有没有flash信息
	{		
		$("body").popframe({jq_box:$("#flashes"),warn:true});
	}
	
	$("#header_signin_ugc").aToolTip({fixed: true,xOffset: -120,yOffset: -70});//提示气泡
	$("#header_signin_notice").aToolTip({fixed: true,xOffset: -125,yOffset: -23});

	$("#confirm_button").hover(function(){
		$(this).parent("#confirm").css("background-position","-190px -220px");
	},function(){
		$(this).parent("#confirm").css("background-position","-140px -220px");
	});
	
	$("#duoc_page .header_nav_container").hover(function(){//header life_squaer button hover
		$(this).find("span").stop(true,true).fadeIn(200);
	},function(){
		$(this).find("span").stop(true,true).fadeOut(200);
	});

	$(".submit,.button").hover(function(){//form buton
		$(this).css({backgroundPosition:"0px -110px"});
	},function(){		
		$(this).css({backgroundPosition:"0px -60px"});
	})
	$(".big_button").hover(function(){//form buton
		$(this).css({backgroundPosition:"0px -50px",color:"#ffffff"});
	},function(){
		$(this).css({backgroundPosition:"0px 0px",color:"#232323"});
	})
	$.ajax({//==================================登陆信息获取
		cache:false,
		type:'POST',
		url:"http://www.duoc.cn/login_bar",
		data:"admin_type="+$("#container>div:eq(0)").attr("name")+"&item_id="+$("#life_container").attr("name"),
		async:'false',
		dataType:"json",
		success:function(json){
			/*===================备用背景处理=====================*/
			var bg_pic = $("#bg");
			bg_pic.error(function(){
				backup_img();
			}).attr({
				src:json.bg_img,
				name:json.def_bg_img
			});
		    function backup_img()
		    {
		        bg_pic.attr({
					src:bg_pic.attr("name")
				});
				if(bg_pic.attr("name") != 'www')
				{
					backup_img = function(){
			            return false;
			        };
				}
		    }
			if(json.done == "OK" && json.stat == "LOGGED_IN")
				login(json);
			else if (json.done == "OK" && json.stat == "UNLOGGED_IN") 
			{
				return true;
			}
			else
			{
				$.Alert({text:Traversal(json.info,login_a),time:2000});
			}
		},
		error:function(){
			$.Alert({text:"网络异常，请重新登录",time:2000});
		}
	});
	
	/*QQ SINA 登陆*/
	$("#header_login_qq").click(function(){
	});
	$("#header_login_sina").click(function(){
	});


	$("#header_login_login,#header_login_sign").click(function(){//触发和收回登陆页面
			pop_loginform();
			go_timeline = true;
		});
	$("#header_loginPage_back,#header_loginPage_bg").click(function(){
			back_loginform();
	});
	$("#header_loginPage_login").mouseover(function(){//登陆和注册按钮效果
				$(this).css("background-color","#e9a161");
		}).mouseout(function(){
				$(this).css("background-color","#e98125");
		}).click(function(){
			var form = $("#head_login");
			login_ajax(form);
			return false;
		});

	$("#header_loginPage_signin").mouseover(function(){
				$(this).css("color","#77b739");
		}).mouseout(function(){
				$(this).css("color","#e98125");
		}).click(function(){
			var form = $("#head_signin");
			var param = submit_MD5(form);
			$.ajax({//==================================注册信息提交
				cache:false,
				type:'POST',
				url:"/register?next="+window.location.href,
				data:param,
				dataType:"json",
				success:function(json){
					if(json.done == "OK" && json.stat == "REG_SUCCESS")
					{
						$("#page_notice").empty().append("注册成功，请到邮箱激活账号");
					}
					else
					{
						$("#page_notice").empty().append(Traversal(json.info,signin_a));
					}
				},
				error:function(){
					$.Alert({text:"网络异常，请重新提交",time:1000});
				}
			});
			return false;
		});

	$("#logout").click(function(){
		var form = $("#head_login");
			$.ajax({//==================================用户登出
				cache:false,
				type:'POST',
				url:"/logout",
				dataType:"json",
				success:function(json){
					if(json.done == "OK" && json.stat == "UNLOGGED_IN")
					{
						window.location.href = '/';
						logout();
					}
					else
					{
						$.Alert({text:Traversal(json.info,login_a),time:2000});
					}
				},
				error:function(){
					$.Alert({text:"网络异常，请重新提交",time:1000});
				}
			});
			return false;
	});
		
		
	$("#header_signin_tool").bind({//工具栏收起出现
		mouseenter:function(){
			$(this).addClass('hover').children("span").show();
		},mouseleave:function(){
			$(this).removeClass('hover').children("span").hide();
		}
	});	
		
		
	var f1=0,f2=0,f3=0,f4=0;
	var pwd_judge = function(){
		if($("#header_loginPage_signin_rpw").val() != $("#header_loginPage_signin_pw").val())
			$("#header_loginPage_signin_rpw").next("span").removeClass("icon_yes").addClass("icon_no");
		else
			$("#header_loginPage_signin_rpw").next("span").removeClass("icon_no").addClass("icon_yes"),f1=1;
	}
	$("#header_loginPage_signin_rpw,#header_loginPage_signin_pw").focusout(function(){//======================表单验证
			pwd_judge()
		});
	$("#header_loginPage_signin_rpw").keyup(function(){//======================表单验证
			pwd_judge()
		});
	
	$("#header_loginPage_signin_pw").focusout(function(){
				jthis = $(this);
				if($(jthis).val().toString().length < 6)
					$(jthis).next("span").removeClass("icon_yes").addClass("icon_no");
				else
					$(jthis).next("span").removeClass("icon_no").addClass("icon_yes"),f2=1;
		});
	$("#header_loginPage_sign_email").focusout(function(){
				jthis = $(this);
				value = $(jthis).val().toString();
				apos=value.indexOf("@")
				dotpos=value.lastIndexOf(".")
				if(apos<1||dotpos-apos<2)
					$(jthis).next("span").removeClass("icon_yes").addClass("icon_no");
				else
					$(jthis).next("span").removeClass("icon_no").addClass("icon_yes"),f3=1;
		});		
	$("#header_loginPage_sign_name").focusout(function(){
				jthis = $(this);
				if(!$(jthis).val())
					$(jthis).next("span").removeClass("icon_yes").addClass("icon_no");
				else
					$(jthis).next("span").removeClass("icon_no").addClass("icon_yes"),f4=1;
		});
		
	$("#header_loginPage_signin").click(function(){
				if(f1==1&&f2==1&&f3==1&&f4==1&&$("#header_loginPage_signin_check").is(":checked")==true)
				{	
					$("form[name='head_signin']").submit();
				}
				else
				{
					$.Alert({text:"你还没有全填好哦"});
				}
		});	
});
