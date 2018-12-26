
//下载站点动态链接正则表达式
var g_expSina = "http\\:\\/\\/.*sina.com.+\\/d_load\\.php\\?";
var g_expPConline = "http\\:\\/\\/.*pconline.com.+\\/filedown\\.jsp\\?";
var g_expZol = "http\\:\\/\\/.*zol.com.+\\/down\\.php\\?";
var g_expCrsky = "http\\:\\/\\/.*\\/.+\\?down_url=(.+\\:\\/\\/.+)";
var g_expRefix = "http\\:\\/\\/.*\\/.+\\?uri=(.+\\:\\/\\/.+)";
var g_expGougou= "http\\:\\/\\/.*gougou.+\\/.+&url=(.+)";
var g_expReToArray = ["http\\:\\/\\/.+\\/.+\\?uri=(.+\\:\\/\\/.+)","http\\:\\/\\/.+\\/.+\\?uri=(.+\\:\\/\\/.+)"];
var g_expIapplez = "http\\:\\/\\/.*iapplez.com.+\\/download\\.php\\?";
var g_expApplex = "http\\:\\/\\/.*www.applex.net\\/publish\\/download\\.php\\?id=";

var g_isInstallThunder = false;        //是否安装了迅雷客户端
var g_isUndetectedUrl = false;         //是否开启了偏好设置中的一键捕获
var g_isUndetectWithCommandKey = true; //是否开启了偏好设置按下command时不捕获
var g_isCommandKeyPressed = false;     //是否按下了Command键
var g_isBrowserDetectEnabled = true;   //是否开启了捕获浏览器下载链接
var g_downloadUrl;

function isSameHost(url,refer_url)
{
    try{
        if(url.substr(0,6) == 'magnet'){
            return false;
        }
        var re = new RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)', 'im');
        var host_url = url.match(re)[1].toString().toLowerCase();
        var host_refer_url = refer_url.match(re)[1].toString().toLowerCase();

        var lastIndex = host_refer_url.lastIndexOf(host_url);
        if((lastIndex != -1) && (lastIndex + host_url.length == host_refer_url.length)){
            return true;
        }
        else{
            lastIndex = host_url.lastIndexOf(host_refer_url);
            if((lastIndex != -1) && (lastIndex + host_refer_url.length == host_url.length)){
                return true;
            }
        }
        return false;
    }catch(e){
        return false;
    }
}


function PreParseURL(url)
{
	var bValidate = false;

	//gougou i区分大小写
	var re = new RegExp(g_expGougou, "i");
	var reArray = re.exec(url);
	if( reArray != null && reArray.length == 2 )
	{
        return decodeURIComponent(reArray[1]);
	}

	re = new RegExp(g_expSina, "i");
	var reArray = re.exec(url);
	if( reArray != null && reArray.length == 1)
	{
		return url;
	}

	//iapple.com
	re = new RegExp(g_expIapplez, "i");
	var reArray = re.exec(url);
	if( reArray != null && reArray.length == 1)
	{
		return url;
	}

    //applex.net
    re = new RegExp(g_expApplex, "i");
    var reArray = re.exec(url);
    if( reArray != null && reArray.length == 1)
    {
        return url;
    }

	var re = new RegExp(g_expPConline, "i");
	var reArray = re.exec(url);
	if( reArray != null && reArray.length == 1)
	{
		return url;
	}

	re = new RegExp(g_expZol, "i");
	reArray = re.exec(url);
	if( reArray != null && reArray.length == 1)
	{
		return url;
	}

	re = new RegExp(g_expCrsky, "i");
	reArray = re.exec(url);
	if( reArray != null && reArray.length == 2 )
	{
		return url;
	}
}


//Command键按下
function OnWindowKeyDown(event)
{
	var unicode=event.charCode ? event.charCode : event.keyCode;
	if(unicode == 91) //chrome:COMMAND
	{
		g_isCommandKeyPressed = true;
		//console.log("g_isCommandKeyPressed 1 =" + g_isCommandKeyPressed);
		//发送按下状态到backgourd.js
		var message = {pressCommandKey: g_isCommandKeyPressed};
		chrome.runtime.sendMessage(message, function (response) {
			//console.log(response)
		});
	}
}
window.document.onkeydown=OnWindowKeyDown;


//Command键弹起
function OnWindowKeyUp(event)
{
	var unicode=event.charCode ? event.charCode : event.keyCode;
	if(unicode == 91){
		g_isCommandKeyPressed = false;
		//console.log("g_isCommandKeyPressed =" + g_isCommandKeyPressed);
		//发送按下状态到backgourd.js
		var message = { pressCommandKey: g_isCommandKeyPressed };
		chrome.runtime.sendMessage(message, function (response) {
			//console.log(response)
		});
  }
}
window.document.onkeyup=OnWindowKeyUp;

//浏览器失去焦点
function OnlostFocus(event) {
	g_isCommandKeyPressed = false;
	var message = { pressCommandKey: g_isCommandKeyPressed };
	chrome.runtime.sendMessage(message, function (response) {
		//console.log(response)
	});
}
window.document.onblur = OnlostFocus;

//浏览器获取焦点
function OnBeginFocus(event) {
	//console.log("OnBeginFocus");
}
window.document.onfocus = OnBeginFocus;


//左键点击链接响应函数
 function onMouseClick(event)
 {
	var e = event.target || event.srcElement;
	var url = window.location;
    var outerhtml = e.outerHTML;
	if(e.nodeName.toUpperCase() != "A"){
		e = e.parentNode;
	}

  if(e.nodeName.toUpperCase() != "A"){
    e = e.parentNode;
  }

	if(e.nodeName.toUpperCase() == "A"){
		var url = e.href;
		var thunderHref = e.getAttribute("thunderHref");
		if(thunderHref != null){
			url = thunderHref;
		}

		if(url.length > 10 && url.substring(0,10).toLowerCase() == 'thunder://')
		{

		}
		else
		{
				var outerHTML = e.outerHTML;
				var index = outerHTML.indexOf("=\"thunder://");
				if (index > 0)
				{
		           var startindex = index - 8;
		           var endindex = index;
		           if (startindex > 0)
			       	{
			       		var thunderAttr = outerHTML.substring(startindex, endindex);
			       		if (thunderAttr.length == 8)
			       		{
			       		    var thunderUrl = e.getAttribute(thunderAttr);
			       		    if (thunderUrl != null)
			       		    {
			       		         if (thunderUrl.substring(0, 10).toLowerCase() == 'thunder://')
				       		    {
			                        url = thunderUrl;
				       		    }
			       		    }
			       		    else
			       		    {
			       		    	var splitArray = outerHTML.split("\"");
			       		    	for (var i= splitArray.length-1; i >= 0; i--)
			       		    	{
			       		    		var item = splitArray[i];
			       		    	    if (item.length>10 && item.substring(0, 10).toLowerCase() == 'thunder://')
				       		        {
			                           url = item;
			                           break;
				       		        }
			       		    	}
			       		    }
			       		}
			       	}
				}
		}

	    var ret = checkUrl(url,event);

      if(g_isInstallThunder){
          closeWindow();
      }
	}
	else{
		var outertext = outerhtml;
		var schemeArray = ["http", "https", "ftp", "ftps", "thunder", "ed2k", "magnet"];
		var startIndex = -1;
		var endIndex = -1;
		for (var i=0; i<schemeArray.length; i++){
			var scheme = schemeArray[i];
			startIndex = outertext.indexOf(scheme);
			if (startIndex >= 0){
				for (var j = startIndex; j<outertext.length; j++){
					var ch = outertext[j];
					if (ch == "\"" || ch=="<" || ch==">"){
						endIndex = j;
						break;
					}
				}
			}

			if (endIndex > 0){
				break;
			}
		}

		var linkurl = outertext.substring(startIndex, endIndex);
		var ret = checkUrl(linkurl, event);
		if (g_isInstallThunder) {
			closeWindow();
		}
	}
}


function closeWindow()
{
    var element = document.getElementById("thunder_m_div");
    if (element)
    {
          element.style.display = "none";
    }
}


//*********************************************************************
//功能: 检查URL是否是迅雷支持下载的地址
//时间：20170214
//说明：把url发送给backgroud.js
//*********************************************************************
function checkUrl(url, event)
{
	if((!g_isInstallThunder || g_isUndetectedUrl==true || g_isBrowserDetectEnabled==false || g_isCommandKeyPressed&&g_isUndetectWithCommandKey))
	{
	    return false;
	}

    var	re = new RegExp(g_expRefix, "i");
	reArray = re.exec(url);
	var refixUrl = "";
	if( reArray != null && reArray.length == 2 )
	{
		refixUrl = reArray[1];
	}

    g_downloadUrl = url;

    if(checkURLSupport(url))
    {
		downloadByThunder(url);
		event.preventDefault();
		event.stopPropagation();
    }
    else
    {
		// var currentPageUrl = window.location.href;
		// var currentPageTitle = window.document.title;
		// var message = {downurl:url, refixurl:refixUrl, websitekey:currentPageUrl, cpagetitle:currentPageTitle};
		// chrome.runtime.sendMessage(message, function(response) {});
    }
}


//*********************************************************************
//功能: 检查URL是否是迅雷支持下载的地址
//时间：20170405
//说明："http","https","ftp","ftps","thunder","ed2k","magnet"
//*********************************************************************
function checkURLSupport(downloadUrl)
{
	var schemeArray = ["http","https","ftp","ftps","thunder","ed2k","magnet"];

	var splitUrlArray = downloadUrl.split(":");

    var schemeStr = "";
	if(splitUrlArray.length > 1)
	{
        schemeStr = splitUrlArray[0];
	}

	if (schemeStr == "")
	{
		return false;
	}
	if (schemeArray.indexOf(schemeStr) == -1)
	{
		return false;
	}
	if (schemeStr == "thunder" || schemeStr == "ed2k" || schemeStr == "magnet")
	{
		return true;
	}

    var extArray = ["3g2","3gp","3gp2","3gpp","flv","f4v","flc","fli","flic","asf","avi","csf","dat","divx","evo","ifo","m1v","m2p","m2ts","m2v","m4b","m4p","m4v","mkv","mov","mp2v","mp4","mpe","mpeg","mpeg1","mpeg2","mpeg4","mpg","mpv2","pmp","pss","pva","qt","ram","rm","rmvb","rp","rpm","rt","smi","smil","tp","tpr","ts","vob","vp6","wm","wma","wmp","wmv","asm","asx","avsts","bik","d2v","dsa","dsm","dss","dsv","hlv","ivf","ivm","kpl","m3u","mpcpl","mts","ogm","pls","pmp2","qpl","ratdvd","realpix","rmi","scm","smk","smpl","tod","vg2","vid","wax","wmx","wv","wvx","ogv","ogx","ogg","mp3","flac","musepack","ape","shorten","wavpack","aac","apple lossless","wave","aiff","nsf","gbs","gym","spc","vgm","hes","it","s3m","xm","mod","m3u","pls","cue","deb","dmg","apk","msi","sis","sisx","pkg","exe","ipsw","zip","rar","7z","tar","gz","gz2","bz2","iso","torrent"];

    var extname = "";
    var splitUrlByPointArray = downloadUrl.split(".");
    var length =  splitUrlByPointArray.length;
    if(length > 1)
    {
        extname = splitUrlByPointArray[length-1];
    }

    if(extname == "")
    {
   	    return false;
    }
    if(extArray.indexOf(extname) >-1)
    {
   	   return true;
    }

    return false;
}


function downloadByThunder(downloadurl)
{
	if (downloadurl == "undefined")
	{
        return false;
	}

 	if(downloadurl.length > 0)
 	{
        downloadByThunderImp(downloadurl);
		return true;
 	}
 	else
 	{
 	     var theURL = PreParseURL(g_downloadUrl);
 	     if (theURL)
 	     {
 	     	downloadByThunderImp(theURL);
 	     	return true;
 	     };
 	}

 	return false;
 }


 function downloadByThunderImp(downloadurl)
 {
 	    var refer_url = document.location.href;
        var cookie = document.cookie;
         if(!isSameHost(downloadurl,refer_url))
         {
             cookie = '';
         }

 	    var currentPageUrl = window.location.href;
 	    var currentPageTitle = window.document.title;
        var message = {linkurl:downloadurl, pageurl:refer_url, cookie:cookie, filename:"", websitekey:currentPageUrl, cpagetitle:currentPageTitle};
		chrome.runtime.sendMessage(message, function(response) {
		  //console.log(response)
		});
 }



//*********************************************************************
//功能: 当backgroud.js中监控到浏览器下载后向content.js获取页面cookie
//时间：20170213
//说明：当页面刷新时获取客户端配置信息
//*********************************************************************
chrome.runtime.onMessage.addListener(function(message, sender, sendResponseCallback)
{
    if(message.name == "getCookie")
    {
         sendResponseCallback({cookie: document.cookie});
    }
    else if(message.browserkey)
    {
    	 g_isUndetectedUrl = message.websitekey;
    	 g_isUndetectWithCommandKey = message.commandkey;
    	 g_isBrowserDetectEnabled = message.browserkey;
       g_isInstallThunder = message.isInstallThunderKey;

       if(g_isInstallThunder == undefined){
          g_isInstallThunder = true;
       }

      if (!g_isUndetectedUrl && g_isBrowserDetectEnabled)
     	{
        //true允许事件冒泡
     		 document.addEventListener("click", onMouseClick, true);
      }
    }
    else
    {
        var downloadurl = message.supportUrlKey;

    	var ret = downloadByThunder(downloadurl);
        if(ret)
	    {

	    }
    }
});


//*********************************************************************
//功能: 发送消息给扩展，让扩展获取配置信息
//时间：20170213
//说明：当页面刷新时获取客户端配置信息
//*********************************************************************
function OnPageLoad()
{
	var currentPageUrl = window.location.href;
 	var currentPageTitle = window.document.title;
	var message = {commandkey:"UndetectWithCommand", browserkey:"BrowserDetectEnabled", websitekey:currentPageUrl, cpagetitle:currentPageTitle};
	chrome.runtime.sendMessage(message, function(response)
	{
	   //console.log(response)
	});
}

var timer = window.setTimeout(OnPageLoad,1000);

//document.body.innerHTML+="<style> #thunder_m_div {display: none !important;} </style>";
