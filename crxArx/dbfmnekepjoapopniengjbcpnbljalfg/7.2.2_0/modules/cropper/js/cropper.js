"use strict";infinity.modules["cropper-cropper"]=function(){var e=310;$("#cropper-done").text(infinity.i18n("done"));var r={targetObj:null,isFirstLoad:!0,show:function(r,o){var e=this;e.targetObj=r,o?e.setInitSelectColor(e.targetObj.selectColor):infinity.fadeIn(".i-cropper","block","0.3s",function(){e.setInitSelectColor(e.targetObj.selectColor)})},hide:function(){infinity.fadeOut(".i-cropper","","0.3s",function(){$(".i-cropper").hide()})},cropperSize:300,outputSize:300,editObj:null,setInitSelectColor:function(r){$(".cropper-bg-color").css("border-color","transparent"),$("[data-id="+r.id+"]").css("border-color","#"+r.border),$(".cropper-bg").css({"background-color":r.value,"background-image":r.bgImage})},init:function(){var i=this;function o(e){var r="#"+e;$(".cropper-bg-color").css("border-color","transparent"),$("[data-id=picker]").css("border-color",r),$(".cropper-bg").css({"background-color":r,"background-image":"none"}),i.targetObj.colors.map(function(r,o){"picker"==r.id?(r.select=!0,r.value=e,r.border=e,i.targetObj.selectColor=r):r.select=!1})}$(".cropper-bg-color").on("click",function(r){r.preventDefault();var e=r.target.getAttribute("data-id");if("picker"!=e){var o=r.target.getAttribute("data-value"),t=r.target.getAttribute("data-border"),c=r.target.getAttribute("data-bgImage");$(".cropper-bg-color").css("border-color","transparent"),$(this).css("border-color","#"+t),$(".cropper-bg").css({"background-color":"#"+o,"background-image":c}),i.targetObj.colors.map(function(r,o){r.id==e?(r.select=!0,i.targetObj.selectColor=r):r.select=!1})}}),infinity.require("color-picker",!0).then(function(){var r=new CP(document.querySelector("#cropper-color-picker"));r.set("rgb(255,255,255)"),r.on("exit",function(r,o,e){}),r.on("enter",function(r,o,e){}),r.on("start",function(r){o(r)}),r.on("drag",function(r){o(r)})}),$(".cropper-rotate-left").on("click",function(){$(i.editObj).cropper("rotate",-90)}),$(".cropper-rotate-right").on("click",function(){$(i.editObj).cropper("rotate",90)}),$(".cropper-zoomIn").on("click",function(r){$(i.editObj).cropper("zoom",.1)}),$(".cropper-zoomOut").on("click",function(r){$(i.editObj).cropper("zoom",-.1)}),$(".cropper-reset").on("click",function(r){$(i.editObj).cropper("reset"),$(".cropper-bg-color").css("border","solid 1px transparent"),$(".cropper-bg-transparent").css("border","solid 1px #ccc"),$(i.editObj).cropper("setCropBoxData",{top:0,left:0,width:e,height:e}),$(".cropper-preview,.cropper-bg").css({"background-color":"transaprent","background-image":"url(/icon/transparent.png)"})})},onEditImage:function(i,r,n){var p=this;p.isFirstLoad=!!r,$(p.editObj).cropper("destroy"),$("#cropper-image").attr("src",i),$("#cropper-image").cropper({aspectRatio:1,viewMode:0,dragMode:"crop",preview:".cropper-preview",autoCropArea:1,modal:!1,toggleDragModeOnDblclick:!1,crop:function(r){},built:function(){$(".cropper-ok").off("click");var t=this;p.editObj=t,$(t).cropper("setCropBoxData",{top:0,left:0,width:e,height:e});var c=!1;try{c=$(t).cropper("getCroppedCanvas",{width:p.outputSize,height:p.outputSize}).toDataURL("image/png",1).substr(0,100),0==i.indexOf("chrome://extension-icon/")&&$(p.editObj).cropper("zoomTo",1.7)}catch(r){}$(".cropper-ok").on("click",function(r){var o=$(t).cropper("getCroppedCanvas",{width:p.outputSize,height:p.outputSize}).toDataURL("image/png",1),e=$(this).attr("data-color");p.hide(),c!=o.substr(0,100)||p.isFirstLoad||0==i.indexOf("chrome://extension-icon/")?(p.isFirstLoad=!1,n&&n(o,e)):n&&n(i,e)})}})}};return r.init(),r};