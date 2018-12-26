$(".people_info_stuff_block").live({mouseenter:function(){//鼠标经过格子特效
		stuff = $(this);
		stuff.children(".people_info_stuff_img").stop(true,true).animate({top:5},200);
		stuff.children(".people_info_stuff_footer").stop(true,true).fadeTo(200,0.5);
		stuff.children(".people_info_stuff_del").stop(true,true).fadeIn(200);
		stuff.find(".arrow_block").stop(true,true).fadeIn(200);
	},mouseleave:function(){
		stuff = $(this);
		stuff.children(".people_info_stuff_img").stop(true,true).animate({top:15},200);
		stuff.children(".people_info_stuff_footer").stop(true,true).fadeTo(200,1);
		stuff.children(".people_info_stuff_del").stop(true,true).fadeOut(200);
		stuff.find(".arrow_block").stop(true,true).fadeOut(200);
	}});

var addNew_stuffBlock = function(box,add_json){
	$(box).empty();
	$(add_json.stuff_block).each(function(i){
		str = "<div class='people_info_stuff_block'><div class='people_info_stuff_del png'></div><div class='people_info_stuff_footer png'></div><div class='people_info_stuff_img' style='background-image:url("+add_json.stuff_block[i].img_url+")'><a href='#' class='png' target='_blank'></a></div><div class='people_info_stuff_plane'><div class='people_info_stuff_plane_name'>"+add_json.stuff_block[i].name+"</div>"
		if(add_json.stuff_block[i].type == 3)
			str += "<div class='people_info_stuff_plane_goal'><div class='people_info_stuff_stars png'><div class='people_info_stuff_star png' style='width="+(15*add_json.stuff_block[i].goal)+"px'></div></div></div>";
		else
			str += "<div class='people_info_stuff_plane_goal'>"+add_json.stuff_block[i].goal+"</div>";
		str += "</div></div>";
		$(box).append(str);
	});
}