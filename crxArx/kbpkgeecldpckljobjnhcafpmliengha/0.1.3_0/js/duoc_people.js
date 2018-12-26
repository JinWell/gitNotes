SCRIPT_ROOT="http://www.duoc.cn"
var do_task = function(){//做任务页面主函数

	/*------函数变量------*/
	var _now = new Date(),//获取今天
		_time_point = new Date(),//当前显示的时间点
		toDate=_now.getDate(),//获取现在日期
		toYear=_now.getYear(),//获取现在年份
		toMonth=_now.getMonth(),//获取现在月份
		time_zone=_now.getTimezoneOffset(),//获取时区信息
		_win = $(window),//窗口jq对象
		_w = _win.width(),//窗口宽
        //_h = 600,
		_h = _win.height(),//窗口高
		_stage = $("#do-task"),//舞台 jq对象
		_banner = $("#do-task-header-container"),//顶端控制条jq对象
		_bg = $("#do-task-bg"),//背景图jq对象
		_bg_wh = 4/3,//背景图宽高比
		_before_main = 75,//控制条距离网页顶端距离
		_if_fixed = true,//是否 控制条和背景随网页移动，辅助控制变量
		_timeline = $("#timeline"),//时间轴jq对象
		_timeline_points = $("#timeline_points_container"),//时间轴 包含时间点的div jq对象
		_popup_list = [],//弹出list列表
		_points = [],//时间点列表
		_view = 'ALL',//视图模式
		_main = $("#task-container .main"),
		_slide_left = $("#task-container .left"),
		_slide_right = $("#task-container .right"),
		_sort_type = 'ALL',
		_sort_before = 'ALL',

		/*------根据类别显示banner上的按钮------*/
		_sort_show = function(){
			var sort = $("#sort-plane");
			sort.find(".icon").removeClass("done");
			switch(_sort_type)
			{
				case 'ALL':
					sort.find(".all").addClass("done");
					break;
				case 'Unread':
					sort.find(".mail").addClass("done");
					break;
				case 'UserRemind':
					sort.find(".mail").addClass("done");
					break;
				case 'ToDo':
					sort.find(".to-do").addClass("done");
					break;
			}
		},

		/*------各种模板------*/
		_template = {
			point:$("#time_point").text(),//时间轴 时间点
			end_point:$("#end_point").text(),//时间轴 小结点
			layer_loading:$("#loading-layer").text()//读取主要内容
		},

		/*------提取时间戳------*/
		_getTime = function(_date){
			return Math.round(_date.getTime()/1000);
		},

		/*------设置现在point时间戳------*/
		_setTime = function(_time){
			_time_point.setTime(_time*1000);
		},

		/*------判断是不是现在时段------*/
		_now_boole = function(){
			if(_getTime(_now) === _getTime(_time_point))
			{
				return true;
			}
			else
			{
				return false;
			}
		},

		/*------判断时段左右切换方向------*/
		_direction = function(_type){
			if(_type == "SUM")
			{
				return 'right';
			}
			else if(_type == "ALL")
			{
				return 'left';
			}
			else
			{
				return 'motionless';
			}
		},

		/*------根据服务器时间戳提取小时------*/
		_getHours = function(_time){
			var _date = new Date();
			_date.setTime(_time*1000);
			return Number(_date.getHours());
		},

		/*------根据服务器时间戳提取时间字符串------*/
		_getTimeString = function(_time){
			var _date = new Date(),
				str = '',
				minute = 0;
			_date.setTime(_time*1000);
			minute = _date.getMinutes();
			if(minute<10)
			{
				str = "0"+minute;
			}
			else
			{
				str = minute;
			}
			if(_date.getYear() == toYear && _date.getMonth() == toMonth && _date.getDate() == toDate)
			{
				return _date.getHours()+":"+str;
			}
			else
			{
				var _year = _date.getYear();
				return ((_year<1900)?(1900+_year):_year)+"-"+(_date.getMonth()+1)+"-"+_date.getDate()+"-"+_date.getHours()+":"+str;
			}			
		},

		/*------消掉弹出list------*/
		_del_popup = function(){
			for(x in _popup_list)
			{
				_popup_list[x].hide();
			}
			_popup_list = [];
		},

		/*------回到顶部------*/
		_backtop = function(){
			var body;
			if($.browser.opera||$.browser.mozilla||$.browser.msie) {
				body = $("html");
		  	}
			else{
				body = $("body");
			};
			body.scrollTop(0);
			// body.stop(true,false).animate({
			// 	scrollTop:0
			// },300);
		},

		/*------timeline slider 事件------*/
		_do_slide = function(el){
			var time = el.data("timestamp"),
				position = el.position();
			if(time == 9999999999)
			{
				_sum_refresh(time);
			}
			else if(time == 'MAIL')
			{
				return false;
			}
			else
			{
				_task_refresh(time);
			}
			_timeline_points.css({
				left:340-position.left
			}).find(".active").removeClass("active");
			el.addClass("active");
		},

		/*------切换动画loading------*/
		_slide_layer = function(_type){
			var direction = _direction(_type),
				_sh = _main.height(),
				slider=$("#task-container ."+direction);
			if(direction == 'motionless')
			{
				return false;
			}
			_main.height(_sh).html("");
			_stage.height(_sh);
			_backtop();
			slider.height(_sh).stop(true,true).animate({
				opacity:'show',
				left:0
			},300);
			switch(direction)
			{
				case 'left':
					_main.stop(true,true).animate({
						opacity:'hide',
						left:800
					},300,function(){
						$(this).removeAttr("style");
						slider.removeAttr("style");
						_stage.removeAttr("style");
					});
					break;
				case 'right':
					_main.stop(true,true).animate({
						opacity:'hide',
						left:-800
					},300,function(){
						$(this).removeAttr("style");
						slider.removeAttr("style");
						_stage.removeAttr("style");
					});
					break;
			}
			return true;
		},
		/*------切换动画complate------*/
		_slider_done = function(html,add){
			if(!arguments[1])
			{
				add = false;
			}
			if(add){
				_main.removeAttr("style").append(html);
			}
			else{
				_main.removeAttr("style").html(html);
			}			
			_slide_left.removeAttr("style");
			_slide_right.removeAttr("style");
			_stage.removeAttr("style");
		},

		/*------删除任务效果------*/
		_del_animate = function(el){
			el.slideUp(300,function(){
				el.remove();
				judge();
			})
		},

		/*------TASK 任务列表更新------*/
		_task_refresh = function(_type){
			if(_slide_layer(_type))
			{
				var t=setTimeout(_task_list_refresh,350);
			}
			return true;
		},
        /*------TASK 内容更新------*/
		_limit = false,
		_doing = false,
		_task_list_refresh = function(){
			if(_limit == false && _doing == false)
			{
				var html='',
					// json = msg_json,
					json_temp = {},
					_temp = '',
					_clock = new Date,
					habit = $("#task-habit").text(),
					paper = $("#task-paper").text(),
					friend = $("#task-friend").text(),
					str = '',
					stuff_json = {},
					param = {},
					loading = $("#task-loading").text();
					stuff = $("#stuff_block_string").text();
				_doing = true;
				_main.append(loading);				param.type = "ALL";
				param.base_time = _getTime(_time_point);
				param.time_zone = time_zone;
                pts = Math.round(_h/60);
                pts = pts < 15 ? 15 : pts;
				param.points = "[{\"FLY\": 1,\"AREA\":"+pts+"}]";
				param_string = JsonToString(param);
				$.jpost({
					url:SCRIPT_ROOT+"/timeline",
					data:param,
					error:function(){
						_doing = false;
					},
					callback:function(json){
						if(_getTime(_time_point) == _getTime(_now))
						{
							var add = false;
						}
						else
						{
							var add = true;
						}
						// if(json.future.length<1)
						// {
						// 	html += $("#task-blank").text();
						// }
						for(x in json.future)
						{
							json_temp = json.future[x];
							switch(json_temp.type)
							{
								case 1:/*小报*/
									_temp = paper;
									json_temp.type = 'MSG';
									break;
								case 2:/*习惯*/
									_temp = habit;
									json_temp.type = 'HABIT';
									break;
								case 4:/*C友*/
									_temp = friend;
									json_temp.type = 'UUREMIND';
									break;
							}
							if(json_temp.text_img_small != undefined && json_temp.text_img_small != '')
							{
								json_temp.text_img_small = "<img src='"+json_temp.text_img_small+"'>";
							}
							if(json_temp.done == 1)
							{
								json_temp.good = 'good-done';
							}
							else if(json_temp.done == -1)
							{
								json_temp.bad = 'bad-done';
							}
							str = '';
							for(i in json_temp.stuff)
							{
								stuff_json = json_temp.stuff[i];
								stuff_json.star = stuff_json.goal*15;
								stuff_json.img = stuff_json.head;
								str += stuff.template(stuff_json);
							}
							json_temp.stuffs_html = str;
							json_temp.time = _getTimeString(json_temp.timestamp);
							html += _temp.template(json_temp);
						}
						_setTime(json_temp.timestamp);
						if(json.future_limit)
						{
							_limit = true;
							html += $("#task-add").text().template();
							$.jget({
								url:SCRIPT_ROOT+'/timeline_preview',
								callback:function(json){
									if(json.stat == 'TL_PREVIEW_OK')
									{
										switch(json.type){
											case 4:
												json.add = "的提醒";
												break;
											case 1:
												json.item_name = "《"+json.item_name+"》";
										}									
										var _html = $("#task-preview").text().template(json);
										_main.append(_html);
										_stage.removeAttr("style");
									}
									else
									{
										_print(json.info);
									}
								}
							});
						}
						_main.find(".task-loading").remove();		
						_slider_done(html,add);
						$(".task:odd").addClass("odd");
						_doing = false;
						$(".layer").removeAttr("style");
					}
				});
        
			}
		},

		/*------完成之后更新右上角数字------*/
		_undo_refresh = function(untouch_no){
			var plane = $("#header_signin_name span");
			if(untouch_no == 0)
			{
				plane.text(untouch_no).hide();
			}
			else{
				plane.text(untouch_no).show();
            }
            /* chrome的插件状态设置*/
            chrome.browserAction.setBadgeText({text:''+(untouch_no != 0 ? untouch_no:'')});
            ChromeExt_get_login_bar();
		},

		/*------AJAX 做任务------*/
		do_task = function(task,callback){
			if(!arguments[1]){
				callback = function(){};
			}
			var param = {},
				type = task.data("type"),
				finish = function(json){
					task.find(".task-header span").addClass("done");
					callback(json);
					_complete_plus(task,json.mission_points);
					task.delay(800).show(0,function(){
						_del_animate(task);
					});
					_undo_refresh(json.untouch_no);
				};
			finish({
				mission_points:1,
				untouch_no:2
			});
			if(type == "MSG" || type == "HABIT")
			{
				param.item_type = type;
				param.create_time = task.data("timestamp");
				param.style_id = task.data("styleid");
				param.item_id = task.data("itemid");
				param.msg_id = task.data("msgid");
				if(type == "HABIT")
				{
					param.msg_id = 0;
				}
				$.jpost({
					url:SCRIPT_ROOT+'/execute_mission',
					data:param,
					callback:function(json){
						if(json.stat == "EXEC_MISSION_OK")
						{
							finish(json);
						}
						else if(json.stat == "EXEC_MISSION_FAIL")
						{
							_print(json.info);
						}
					}
				});
			}
			else
			{
				param.create_time = task.data("timestamp");
				param.msg_id = task.data("msgid");
				$.jpost({
					url:SCRIPT_ROOT+'/user_remind_read',
					data:param,
					callback:function(json){
						if(json.stat == "USER_REMIND_READ_OK")
						{
							json.mission_points = 1;
							finish(json);
						}
						else if(json.stat == "USER_REMIND_READ_FAIL")
						{
							_print(json.info);
						}
					}
				});
			}				
		},

		/*------AJAX 评价MSG------*/
		_vote = function(el,stat){
			var param = {};
			param.msg_id = el.data("msgid");
			param.dst_stat = stat;
			param.with_no = 0;
			$.jpost({
				url:SCRIPT_ROOT+'/msg_vote',
				data:param,
				callback:function(json){
					if(json.stat == 'MSGVOTE_OK')
					{
						el.find(".credit").text(json.credit);
						if(stat == 1)
						{
							el.find(".good").addClass("good-done");
							el.find(".bad").removeClass("bad-done");
						}
						else if(stat == 0)
						{
							el.find(".good").removeClass("good-done");
							el.find(".bad").removeClass("bad-done");
						}
						else if(stat == -1)
						{
							el.find(".good").removeClass("good-done");
							el.find(".bad").addClass("bad-done");
						}
						_print(json.info);				
					}
					else
					{
						_print(json.info);
					}
				}
			});
		},

		/*------AJAX 删除任务------*/
		_del_task = function(el){
			var param = {},
				type = el.data("type"),
				finish = function(json){
					_del_animate(el);
					_undo_refresh(json.untouch_no);
				};
			if(type == "MSG" || type == "HABIT")
			{
				param.item_type = type;
				param.create_time = el.data("timestamp");
				param.style_id = el.data("styleid");
				param.item_id = el.data("itemid");
				param.msg_id = el.data("msgid");
				if(type == "HABIT")
				{
					param.msg_id = 0;
				}
				$.jpost({
					url:SCRIPT_ROOT+"/delete_mission",
					data:param,
					callback:function(json){
						if(json.stat = 'DELETE_MISSION_OK')
						{
							finish(json);
						}
						else if(json.stat = 'DELETE_MISSION_FAIL')
						{
							_print(json.info);
						}
					}
				});
			}
			else{
				param.msg_id = el.data("msgid");
				param.create_time = el.data("timestamp");
				$.jpost({
					url:SCRIPT_ROOT+"/delete_user_remind",
					data:param,
					callback:function(json){
						if(json.stat = 'DELETE_USER_REMIND_OK')
						{
							finish(json);
						}
						else if(json.stat = 'DELETE_USER_REMIND_FAIL')
						{
							_print(json.info);
						}
					}
				});
			}
		},

		/*------完成增加函数------*/
		_complete_plus = function(el,mission_points){
			var notice = '完成+'+mission_points;
			el.prepend("<div class='com_notice' style='top:30px'>"+notice+"</div>");
			el.find(".com_notice").animate({top:5,opacity:1},300).delay(500).animate({top:-10,opacity:0},300,function(){
				$(this).remove();
			});
		},

		/*------SUM 小结更新------*/
		_sum_refresh = function(_type){
			_slide_layer(_type);
			var ajax = function(){
					$.ajax({
						cache:false,
						url:SCRIPT_ROOT+'mission_summary',
						dataType:"html",
						success:function(html){
							_slider_done(html);
						},
						error:function(){
							$.Alert({text:"网络异常"});
						}
					});					
				},
				t=setTimeout(ajax,400);
			return true;
		},

		/*------判断读取------*/
		judge = function(){
			var _top = _win.scrollTop(),
				_body_h = document.documentElement.scrollHeight;
            _h = _win.height();
            console.log('_top='+_top+',_body_h='+_body_h+',_h='+_h);
			if(_top>=_before_main && _if_fixed)
			{
				_banner.add(_bg).addClass("fixed");
				_if_fixed = false;
			}
			else if(_top<_before_main && !_if_fixed)
			{
				_banner.add(_bg).removeClass("fixed");
				_if_fixed = true;
			}
			if((_body_h - _h - _top)<500)
			{
				_task_list_refresh();
			}
		},

		/*------窗口改变重设变量------*/
		_reset = function(){
			_stage.removeAttr("style");
			var stage_h = _stage.height();
			_stage.height(stage_h>_h?stage_h:_h);
			_w = _win.width();
			_h = _win.height();
			_banner.add(_timeline).width(0).width(_w);
			if(_w/_h>=_bg_wh)
			{
				if(_w <= 960)
				{
					_bg.css({width:960,height:960/_bg_wh});
				}
				else
					_bg.css({width:_w,height:_w/_bg_wh});
			}
			else if(_w/_h<_bg_wh)
			{
				if(_h <= 534)
				{
					_bg.css({width:960,height:960/_bg_wh});
				}
				else
					_bg.css({width:_h*_bg_wh,height:_h});
			}
		},

		/*------初始化------*/
		_init = function(){
			_reset();
			_now.setTime(0);
			_time_point.setTime(_getTime(_now)*1000);

			_task_list_refresh();
			_sort_show();

			/*------读取生活方式列表------*/
			$.jget({
				url:SCRIPT_ROOT+'/popup/get-followed-styles',
				callback:function(json){
					var _temp = $("#style-list").text(),
						html = "",
						_json = {};
					for(x in json.styles){
						_json = json.styles[x];
						html += _temp.template(_json);
					}
					$("#manage-styles-container").html(html);
				}
			})

			/*------气泡------*/
			$("#plus-plane").aToolTip({fixed: true,xOffset: 0,yOffset: -30});
			$("#today-bar").aToolTip({fixed: true,xOffset: -140,yOffset: -45});

			/*------窗口事件绑定------*/
			/*_win.wresize(function(){
				_reset();
				judge();
            })*/
            _win.bind({
				scroll:function(){
					judge();
				}
			});

			/*------BODY事件绑定------*/
			$("body").bind({
				click:function(e){
					var el = $(e.target);
					if(el.parents(".popup").length<1 && el.not(".popup"))
					{
						_del_popup();
					}
				}
			});

			/*------完成任务 事件绑定------*/
			$(".task-header").live({
				mouseenter:function(){
					var el = $(this);
					el.find("span").addClass("hover");
				},mouseleave:function(){
					var el = $(this);
					el.find("span").removeClass("hover");
				},click:function(){
					var el = $(this);
					do_task(el.parent(".task"));
				}
			});

			/*------评价按钮------*/
			$(".vote .good").live({
				click:function(){
					var good = $(this),
						el=good.parents(".task");
					if(good.is(".good-done"))
					{
						_vote(el,0);
					}
					else
					{
						_vote(el,1);
					}
				}
			});
			$(".vote .bad").live({
				click:function(){
					var bad = $(this),
						el=bad.parents(".task");
					if(bad.is(".bad-done"))
					{
						_vote(el,0);
					}
					else
					{
						_vote(el,-1);
					}
				}
			});

			/*------展开事件绑定------*/
			$(".task-body").live({
				mouseenter:function(){
					var el = $(this);
					el.find(".fold-button").stop(true,true).fadeIn(200);
				},mouseleave:function(){
					var el = $(this);
					el.find(".fold-button").stop(true,true).fadeOut(200);
				},click:function(e){
					var el = $(this);
					if($(e.target).is(".task-title") || $(e.target).parents(".task-title").length>0)
					{
						el.find(".contral").toggleClass("fold");
						el.find(".task-title img").toggle();
						//(if(el.data("img") != "" && el.data("img") != undefined)
						if(el.data("img") != "" && el.data("img") != undefined && el.data("img").length>35)
						{
							el.find(".contral").prepend(el.data("img"));
							el.data("img","");
						}
						_stage.removeAttr("style");
					}					
				}
			});

			/*------点击生活方式名称展开绑定------*/
			$(".parent_style").live({
				mouseenter:function(){
					var el = $(this);
					el.addClass("hover");
				},mouseleave:function(){
					var el = $(this);
					el.removeClass("hover");
				},click:function(){
					var el = $(this),
						_pop_block = el.next(".popup");				
					_del_popup();
					_pop_block.show();
					_popup_list.push(_pop_block);
				}
			});

			/*------快捷取消跟随绑定------*/
			$(".del_style").live({
				click:function(){
					var el = $(this).parents(".task");
					cancel_style_following(el.data("styleid"),function(){
						window.location.reload();
					})
				}
			});

			/*------管理生活方式展开绑定------*/
			$("#manage-styles").bind({
				click:function(){
					_stage.removeAttr("style");
					$("#manage-styles-plane").toggle();
				}
			});

			/*------管理取消跟随绑定------*/
			$(".style-list .del").live({
				click:function(){
					var el = $(this).parents(".style-list");
					cancel_style_following(el.data("id"),function(){
						el.remove();
						_limit = false;
						_setTime(_getTime(_now));
						_task_list_refresh();
					})
				}
			});

			/*------删除任务绑定------*/
			$(".contral .del").live({
				click:function(){
					var el = $(this).parents(".task");
					_del_task(el);
				}
			});
			
			/*------给自己写提醒输入框绑定------*/
			$("#task-input").live({
				click:function(){
					var el = $(this);
					el.siblings(".text-define").hide().siblings(".add-sure,.edit-sure").show();
				},
				blur:function(){
					var el = $(this);
					if(blank(el))
					{
						el.siblings(".text-define").show().siblings(".add-sure,.edit-sure").fadeOut(200);
					}
				},keydown:function(e){
					var el = $(this);
					if(e.which == 13)
					{
						var param = {},
							friend = $("#task-friend").text();
						param.content = el.val();
						$.jpost({
							url:SCRIPT_ROOT+"/ugc/post-self-msg",
							data:param,
							callback:function(json){
								param = {
									'type' : 4,
									'timestamp':json.timestamp,
									'item_id' : json.id,
									'msg_id' : json.id,
									'name' : '自己',
									'text' : el.val(),
									'text_url' : json.url,
									'credit' : 0,
									'done' : 0,
									'mission' : 1,
									'stuff' : []
								}
								html = friend.template(param);
								el.parents(".task").before(html);
								el.val("");
								_stage.removeAttr("style");
								$(".task").removeClass("odd").filter(":odd").addClass("odd");
							}
						});
					}
				}
			});
			$(".text-define").live({
				click:function(){
					$(this).hide().siblings(".add-sure,.edit-sure").show().siblings("#task-input").get(0).focus();
				}
			});
			$(".edit-sure").live({
				click:function(){
					var el = $(this).siblings("#task-input");
					chrome.tabs.create({url:SCRIPT_ROOT+"/ugc/new-message?user_id="+uid+"&content="+el.val()});
				}
			});

			/*------去小结页面------*/
			$("#go-summary").live({
				click:function(){
                    sum_page="http://www.duoc.cn/timeline";
                    chrome.tabs.create({url:sum_page});                 
					//_sum_refresh('SUM');
				}
			});

			/*------回主页面------*/
			$(".back-main").live({
				click:function(){
					_limit = false;
					_setTime(_getTime(_now));
					_task_refresh('ALL');
				}
			});

		};

	/*------默认执行函数------*/
	(function(){
		_init();
	})();
};

$(document).ready(function(){
	(function(){
		do_task();
	})()	
});
