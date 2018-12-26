/*my ajax*/
/*my ajax*/
(function($) {
		$.jpost = function(setting){			 
			var defaults = {
				url : 'unknown',
				data : '',
				callback:function(){},
				error:function(){},
				dataType : 'json'
			};
			var options = $.extend(defaults, setting);

			$.ajax({
			    cache:false,
			    type:'POST',
			    url:options.url,
			    data:options.data,
			    dataType:options.dataType,
			    success:function(json){
			    	if(json.done == 'OK')
			    	{
			    		options.callback(json);
			    	}
			    	else
			    	{
			    		if(json.stat == 'NEED_LOGIN')
			    		{
			    			$.popframe_close();
			    			pop_loginform();
			    			go_timeline = false;
			    			$.Alert({text:"请先登录哦",time:2000});
			    		}
			    		_print(json.info);
			    		_print(json.dict_info);	
			    		options.error();	    		
			    	}
			    },
			    error:function(){
			    	options.error();
			        $.Alert({text:"网络异常",time:2000});
			    }
			});
		}
		$.jget = function(setting){			 
			var defaults = {
				url : 'unknown',
				callback:function(){},
				error:function(){},
				dataType : 'json'
			};
			var options = $.extend(defaults, setting);

			$.ajax({
			    cache:false,
			    type:'GET',
			    url:options.url,
			    dataType:options.type,
			    success:function(json){
			        if(json.done == 'OK')
			    	{
			    		options.callback(json);
			    	}
			    	else
			    	{
			    		if(json.stat == 'NEED_LOGIN')
			    		{
			    			$.popframe_close();
			    			pop_loginform();
			    			go_timeline = false;
			    			$.Alert({text:"请先登录哦",time:2000});
			    		}
			    		_print(json.info);
			    		_print(json.dict_info);
			    		options.error();
			    	}
			    },
			    error:function(){
			    	options.error();
			        $.Alert({text:"网络异常",time:2000});
			    }
			});
		}
})(jQuery);

/*弹出窗插件*/
(function($) {
		var	box = $("#popFrame");
		var	bg = $("#popFrame_bg");
  		var setSize = function(width,height){
  			if(!arguments[0])
  				width = box.width();
  			if(!arguments[0])
  				height = box.height();
			if($.browser.opera||$.browser.mozilla||$.browser.msie) {
				var scrollTop = document.documentElement.scrollTop;
				var scrollLeft = document.documentElement.scrollLeft;
  			}
			else{
				var scrollTop = document.body.scrollTop;
				var scrollLeft = document.body.scrollLeft;
			};
			var popW = document.documentElement.clientWidth;
			var popH = document.documentElement.clientHeight;
			var scrollHeight = document.documentElement.scrollHeight;
			var scrollWidth = document.documentElement.scrollWidth;
			var popT = (popH - parseInt(height))/2 + scrollTop-50;
			var popL = (popW - parseInt(width))/2 + scrollLeft;
			box.css("top",popT+"px").css("left",popL+"px");
			$(bg).css("width",scrollWidth+"px").css("height",Math.max(scrollHeight,popH)+"px");
		}
		var close = function(){
			bg.unbind().fadeOut(200);
			box.fadeOut(200).find(".box_close,#popFrame_close").unbind();
			$(window).unbind("resize","setSize");
		}
		var create_window = function(jq_box){
			box.children("#popFrame_close").nextAll().remove();
			try
			{
				jq_box.clone().appendTo(box);
			}
			catch(err)
			{
				box.append(jq_box);
			}   
			bg.stop(true,true).fadeTo(200,0.3);
            box.stop(true,true).fadeIn(200); 
            setSize();                    
			bg.click(function(){
				close();
			});
            box.find(".box_close,#popFrame_close").click(function(){
				close();
            });
            $(window).wresize(function(){
            	setSize();
            });
		}
		
		$.setPic = function(){
			box.find(".loading").hide();
			pic = box.find(".big_picture");
			setSize(pic.width(),pic.height());
			box.find(".big_picture").show();
		}
		$.fn.popframe = function(setting){ 
			var defaults = {
				'jq_box' : '',
				'warn' : false
			};
			var options = $.extend(defaults, setting); 
		
			if(setting.warn == false)
			{
				this.each(function(){
					var myself = $(this);
					myself.click(function(){
						create_window(setting.jq_box);
					}); 
				});
			}
			else
			{
				create_window(setting.jq_box);
			}
		}
		$.popframe_close = function(setting){ 
			var defaults = '';
			var options = $.extend(defaults, setting);
			close();
		}
		$.ensure = function(setting){ 
			var defaults = {
					'callback':function(){},
					'title':'确认',
					'button':'确认'
			};
        
           var options = $.extend(defaults, setting);
					
			$("#ensure").find(".ensure_title").empty().append(setting.title).next(".ensure_button").empty().append(setting.button);
			create_window($("#ensure"));
			$("#ensure").click(function(){
				$(this).unbind("click");
				setting.callback();
				close();
			}); 
		}
		$.popajax = function(setting){ 
			var defaults = '';
			var options = $.extend(defaults, setting); 
		
			$.ajax({
				cache:false,
				url:setting,
				dataType:"html",
				success:function(html){
					create_window(html);
				},
				error:function(){
					$.Alert({text:"网络异常"});
				}
			});
		}
		$.popajax_pic = function(setting){ 
			var defaults = '';
			var options = $.extend(defaults, setting); 

			str = "<img class='loading' src='http://duoc.cn/static/Image/global/loading.gif'/><img class='big_picture' src='"+setting+"' onload='$.setPic();'/>";
			create_window(str);
		}
		$.confirm = function(setting){
			var defaults = {
				'title' : 'title',
				'yes' : 'yes',
				'no' : 'no',
				'callback' : function(){}
			};
			var options = $.extend(defaults, setting);
			create_window($("#confirm"));
			con = $("#confirm");
			con.find("p").text(setting.title).siblings(".big_button").text(setting.no).click(function(){$.popframe_close()}).siblings(".button").text(setting.yes).click(function(){setting.callback($(this))});
		}
})(jQuery);
/*弹出确认插件*/
(function($) {
		var	confirm_box = $("#confirm");
		var	confirm_button = $("#confirm_button");
		var confirm_exit = function (){				
			confirm_button.unbind("click");
			$("body").unbind("click",confirm_exit);
			confirm_box.hide();
		};
		$.fn.confirm = function(callback){			 
			var defaults = " ";
			var options = $.extend(defaults, callback);		

				myself = $(this);
				m_offset = myself.offset();
				confirm_exit();
				confirm_box.css({top:(m_offset.top-55)+"px",left:(m_offset.left-20+myself.width()/2)+"px"}).hide().stop(true,true).animate({opacity:"show"},200,function(){
					$("body").bind("click",confirm_exit);
				});

				/*confirm_button.click(function(){
					callback();
				});*/
		}
})(jQuery);
/*IE wresize*/
( function( $ )  
{ 
    $.fn.wresize = function( f )  
    { 
        version = '1.1'; 
        wresize = {fired: false, width: 0}; 
 
        function resizeOnce()  
        { 
            if ( $.browser.msie ) 
            { 
                if ( ! wresize.fired ) 
                { 
                    wresize.fired = true; 
                } 
                else  
                { 
                    var version = parseInt( $.browser.version, 10 ); 
                    wresize.fired = false; 
                    if ( version < 7 ) 
                    { 
                        return false; 
                    } 
                    else if ( version == 7 ) 
                    { 
                        //a vertical resize is fired once, an horizontal resize twice 
                        var width = $( window ).width(); 
                        if ( width != wresize.width ) 
                        { 
                            wresize.width = width; 
                            return false; 
                        } 
                    } 
                } 
            } 
 
            return true; 
        } 
 
        function handleWResize( e )  
        { 
            if ( resizeOnce() ) 
            { 
                return f.apply(this, [e]);
            } 
        } 
 
        this.each( function()  
        { 
            if ( this == window ) 
            { 
                $( this ).resize( handleWResize ); 
            } 
            else 
            { 
                $( this ).resize( f ); 
            } 
        } ); 
 
        return this; 
    }; 
 
} ) ( jQuery );
/*tips*/
(function($){$.fn.aToolTip=function(options){var defaults={closeTipBtn:'aToolTipCloseBtn',toolTipId:'aToolTip',fixed:false,clickIt:false,inSpeed:200,outSpeed:100,tipContent:'',toolTipClass:'defaultTheme',xOffset:5,yOffset:5,onShow:null,onHide:null},settings=$.extend({},defaults,options);return this.each(function(){var obj=$(this);if(obj.attr('title')){var tipContent=obj.attr('title');}else{var tipContent=settings.tipContent;}
var buildaToolTip=function(){$('body').append("<div id='"+settings.toolTipId+"' class='"+settings.toolTipClass+"'><p class='aToolTipContent'>"+tipContent+"</p></div>");if(tipContent&&settings.clickIt){$('#'+settings.toolTipId+' p.aToolTipContent').append("<a id='"+settings.closeTipBtn+"' href='#' alt='close'>close</a>");}},positionaToolTip=function(){$('#'+settings.toolTipId).css({top:(obj.offset().top-$('#'+settings.toolTipId).outerHeight()-settings.yOffset)+'px',left:(obj.offset().left+obj.outerWidth()+settings.xOffset)+'px'}).delay(500).fadeIn(settings.inSpeed,function(){if($.isFunction(settings.onShow)){settings.onShow(obj);}});},removeaToolTip=function(){$('#'+settings.toolTipId).stop().fadeOut(settings.outSpeed,function(){$(this).remove();if($.isFunction(settings.onHide)){settings.onHide(obj);}});};if(tipContent&&!settings.clickIt){obj.hover(function(){$('#'+settings.toolTipId).remove();obj.attr({title:''});buildaToolTip();positionaToolTip();},function(){removeaToolTip();});}
if(tipContent&&settings.clickIt){obj.click(function(el){$('#'+settings.toolTipId).remove();obj.attr({title:''});buildaToolTip();positionaToolTip();$('#'+settings.closeTipBtn).click(function(){removeaToolTip();return false;});return false;});}
if(!settings.fixed&&!settings.clickIt){obj.mousemove(function(el){$('#'+settings.toolTipId).css({top:(el.pageY-$('#'+settings.toolTipId).outerHeight()-settings.yOffset),left:(el.pageX+settings.xOffset)});});}});};})(jQuery);
/*Alert*/
(function($) {	
	$.Alert = function(settings){ 
			var defaults = {
				text:"警告框",
				time:700
				};
	var options = $.extend(defaults, settings);		
	$("#alert").empty().append(options.text);			
	if($.browser.opera||$.browser.mozilla||$.browser.msie) {
		scrollTop = document.documentElement.scrollTop;
		scrollLeft = document.documentElement.scrollLeft;
	 }
	 else{
	 	scrollTop = document.body.scrollTop;
		scrollLeft = document.body.scrollLeft;
  	  };
	  popW = document.documentElement.clientWidth;
	  popT = 150 + scrollTop;
	  popL = (popW - parseInt($("#alert").css("width").split("p")[0]))/2 + scrollLeft;
	  $("#alert").stop(true,true).css("top",(popT+50)+"px").css("left",popL+"px").animate({top:popT,opacity: 'show'},300).delay(options.time).animate({top:(popT-50),opacity: 'hide'},300);
	  } 
})(jQuery);
/*windows*/
function day_tran(value){
	switch(value)
	{
		case '0':
			return '一';
			break;
		case '1':
			return '二';
			break;
		case '2':
			return '三';
			break;
		case '3':
			return '四';
			break;
		case '4':
			return '五';
			break;
		case '5':
			return '六';
			break;
		case '6':
			return '日';
			break;
	}
}
function list_string(array){
	str = '';
	length = array.length;
	if(length > 1)
	{
		str += '[';
		for(x in array)
		{
			if(x == (length-1))
				str += array[x];
			else
				str += array[x]+',';
		}
		str += ']';
	}
	else
	{
		str = array;
	}	
	return str;	
}
function edit_time(sel){
	if(sel.attr("id") == 'month')
	{
		month = "";
		array = sel.val();
		time[0] = [];
		for(x in array)
		{
			value = array[x];
			if(value == '-1')
			{
				month += "";
			}
			else
			{
				month += value + "月 ";
			}
			time[0][x]=parseInt(value);
		}
		if(time[0].length >1 && time[0][0] == (-1))
		{
			time[0].splice(0,1);
		}
	}
	if(sel.attr("id") == 'date')
	{
		day = "";
		array = sel.val();
		time[2] = [];
		time[1] = [-2];
		if(true)
		{
			for(x in array)
			{
				value = array[x];
				if(value == '-1')
				{
					day += "每天";
				}
				else
				{
					if(day == "每天")
						day = value + "号 ";
					else
						day += value + "号 ";
				}
				time[2][x]=parseInt(value);
			}
			if(time[2].length >1 && time[2][0] == (-1))
			{
				time[2].splice(0,1);
			}
		}			
	}
	if(sel.attr("id") == 'day')
	{
		day = "";
		array = sel.val();
		time[1] = [];
		time[2] = [-2];
		if(true)
		{
			for(x in array)
			{
				value = array[x];
				if(value == '-1')
				{
					day += "每天";
				}
				else if(x==0 || x==1)
				{
					if(day == "每天")
						day = "星期" + day_tran(value) + " ";
					else if(x==0)
						day += "星期" + day_tran(value) + " ";
					else if(x==1)
						day += " " + day_tran(value) + " ";
				}
				else
				{
					if(day == "每天")
						day = " " + day_tran(value) + " ";
					else
						day += " " + day_tran(value) + " ";
				}
				time[1][x]=parseInt(value);
			}
			if(time[1].length >1 && time[1][0] == (-1))
			{
				time[1].splice(0,1);
			}
		}			
	}
}

function select_time(show){
	form = $("#popFrame #select_time");
	form.get(0).reset();
	month = "";
	de = ""
	day = "每天";
	time = [[-1],[-1],[-2],[0],[0]];
	var auto_chose = function(sel,list){
		options = sel.find("option");
		for(x in list)
		{
			options.each(function(){
				var op = $(this),
					val = Number(op.val());
				if(val === list[x])
				{
					op.attr("selected",true);
				}
			})
		}
	};
	form.find(":radio").click(function(){
		$(this).next("select").attr("disabled",false).siblings("select").attr("disabled",true);
	});
	form.find(":submit").click(function(){
		$.popframe_close();
		if(month != "")
		{
			de="的 ";
		}
		else if(day != "每天")
		{
			de="的 ";
			month = "每月";
		}
		time[3] = [parseInt(show.siblings("select:not('.type')").val())];
		time[4] = [parseInt(show.siblings(".minute-container").find(".minute").val())];
		str = JsonToString(time);
		show.text(month+de+day).attr("name",str);
		return false;
	});	
	form.find("select").change(function(){
		sel = $(this);
		edit_time(sel);
	});
}
function JtimeToString(Jstring){
	var str = '';
	if(Jstring == null)
		return false;
	str = '';
	if(Jstring[0] == -1)
	{
		str += '每月';
	}
	else
	{
		for(x in Jstring[0])
		{
			str += Jstring[0][x] + '月 ';
		}
	}
	str += '的 ';
	if(Jstring[1] == -1 || Jstring[2] == -1)
	{
		if (str == '每月的') 
		{
			str = '每天';
		}
		else
		{
			str += '每天';
		}			
	}
	else if(Jstring[2] == -2)
	{
		str += '星期';
		for(x in Jstring[1])
		{
			switch(Jstring[1][x])
			{
				case 0:
					str += '一 ';
					break;
				case 1:
					str += '二 ';
					break;
				case 2:
					str += '三 ';
					break;
				case 3:
					str += '四 ';
					break;
				case 4:
					str += '五 ';
					break;
				case 5:
					str += '六 ';
					break;
				case 6:
					str += '日 ';
					break;					
			}
		}			
	}
	else if(Jstring[1] == -2)
	{
		for(x in Jstring[2])
		{
			str += Jstring[2][x] + "号 "
		}		
	}
	return str
}
