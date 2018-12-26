
//*********************************************************************
//功能：捕获浏览器自身的下载行为并调用迅雷进行下载
//时间：20170210
//说明：当点击下载时，浏览器本身会进行下载，该函数会取消浏览器的下载，使用迅雷下载
//*********************************************************************
var g_commandIsPress = false;  //是否按下了command键
var g_undectedSiteUrl = false;  //是否是不检测的网站
var g_isCaptureBrowserDownloadUrl = true; //是否捕获浏览器下载链接
var g_isNotresponseWhenCmdPress = true;  //在command按下时是否响应
var isListionForBrowser = false;
var g_currentPageTitle = "";
var g_currentPageUrl = "";
var g_isInstallThunder = false;
var g_item = null;
var filenames = {};

//监视Chrome浏览器自身的下载
function listionForTheBrowserDownload()
{
    if(chrome.downloads)
    {
            chrome.downloads.onDeterminingFilename.addListener(
            function(item, suggest)
            {
                    if(item.filename.length && !filenames.hasOwnProperty(item.id))
                    {
                            filenames[item.id] = item.filename;
                    }
                    suggest();
                    return true;
            });

            chrome.downloads.onCreated.addListener(
            function(item)
            {
                if (!g_isCaptureBrowserDownloadUrl || g_undectedSiteUrl || !g_isInstallThunder)
                    {
                        return;
                    }

                    if(item.state == 'complete' || item.state == 'interrupted'){
                        return;
                    }

                    //如果设置了按下command不响应
                //console.log("g_commandIsPress =" + g_commandIsPress);
                    if (g_isNotresponseWhenCmdPress && g_commandIsPress)
                    {
                        g_commandIsPress = false;
                        return;
                    }

                    g_item = item;
                    if (checkURLSupport(g_item.finalUrl))
                    {
                        canceldownload();
                    }
            });
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


//*********************************************************************
//功能：捕获浏览器链接，取消浏览器下载
//时间：20170222
//说明：根据是否要捕获进行调用本地应用发送过来的消息响应接口
//*********************************************************************
function canceldownload()
{
        //var currentPageUrl = window.location.href;
           // 取消chrome默认下载
        chrome.downloads.cancel(g_item.id);

        // 删除下载记录，有时默认下载会先执行，因为异步，防止出现默认下载框
        chrome.downloads.erase({id:g_item.id}, function (ids){});

        // 关闭chrome新建下载留存的tab
        chrome.tabs.query({url:g_item.url}, function(tabArray){
                if (tabArray[0]){
                        chrome.tabs.remove(tabArray[0].id);
                }
        });

        // 获取引用页的cookie
        chrome.tabs.query({url: g_item.referrer}, function(tabArray){
                        if(filenames.hasOwnProperty(g_item.id))
                        {
                               var message = {linkurl:g_item.finalUrl, pageurl:g_item.referrer, cookie:'', filename:filenames[g_item.id]};
                                connectToNativeHost(message);
                        }
                        else{
                               var message = {linkurl:g_item.finalUrl, pageurl:g_item.referrer, cookie:'', filename:""};
                                connectToNativeHost(message);
                        }
        });
}



//*********************************************************************
//功能：接收native host发送给扩展的消息
//时间：20170210
//说明：background.js注册的本地应用发送过来的消息响应接口
//*********************************************************************
function onNativeMessage(message)
{
    //console.log('recieved message from native app: ' + JSON.stringify(message));

    if(message.browserdownurlKey == "1")
    {
        canceldownload();
        return;
    }

    //是否在按下command时不捕获下载
    if (message.commandkey == true)
    {
        g_isNotresponseWhenCmdPress = true
    }
    else if(message.commandkey == false)
    {
        g_isNotresponseWhenCmdPress = false
    }

    //是否监视的网站
    if(message.websitekey == true)
    {
        g_undectedSiteUrl = true
    }
    else if(message.websitekey == false)
    {
        g_undectedSiteUrl = false
    }

    //是否捕获视浏览器下载链接
    if(message.browserkey == true)
    {
        g_isCaptureBrowserDownloadUrl = true;
        if (!isListionForBrowser)
        {
            isListionForBrowser = true;
            if(!g_undectedSiteUrl)
            {
               listionForTheBrowserDownload();
            }
        }
    }
    else if(message.browserkey == false)
    {
        g_isCaptureBrowserDownloadUrl = false;
    }

    //迅雷客户端是否安装,如果是undefined说明nativeapp没有传入该isInstallThunderKey键值
    if(message.isInstallThunderKey == undefined){
         g_isInstallThunder = true;
    }else{
        if(message.isInstallThunderKey == true){
            g_isInstallThunder = true;
        }else {
            g_isInstallThunder = false;
        }
    }

    //从扩展中发送消息到content.js
    //console.log(g_currentPageUrl);
    var pageurl = g_currentPageUrl;
    if (g_currentPageUrl.substr(g_currentPageUrl.length-1,1)){
       pageurl = g_currentPageUrl.substr(0, g_currentPageUrl.length - 1);
       //console.log(pageurl);
    }

    chrome.tabs.query({url:g_currentPageUrl},
      function(tabs)
      {
            if(tabs[0])
            {
              chrome.tabs.sendMessage(tabs[0].id, message, function(response) { });
            }
            else {  //用url查询失败则用pagetitle进行查询
                //console.log("queryTabsByTitle");
                chrome.tabs.query({title:g_currentPageTitle},
                  function(tabs)
                  {
                    //console.log(tabs);
                        if(tabs[0])
                        {
                          chrome.tabs.sendMessage(tabs[0].id, message, function(response) { });
                        }else{
                            //console.log("query tabs error");
                        }
                  });
            }
      });
}


//*********************************************************************
//功能：断开扩展和native host的连接
//时间：20170210
//说明：background.js注册的断开连接响应接口
//*********************************************************************
function onDisconnected()
{
    //console.log(chrome.runtime.lastError);
    //console.log('disconnected from native app.');
    port = null;
}



//*********************************************************************
//功能：扩展主动连接本地应用
//时间：20170210
//说明：建立和本地应用的连接
//*********************************************************************
function connectToNativeHost(msg)
{
    var nativeHostName = "com.thunder.chrome.host";
    port = chrome.runtime.connectNative(nativeHostName);
    port.onMessage.addListener(onNativeMessage);
    port.onDisconnect.addListener(onDisconnected);

    port.postMessage(msg);
 }


//*********************************************************************
//功能：用户左键点击下载链接后从content.js中接收下载链接等消息
//时间：20170213
//说明：
//*********************************************************************
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
      if ("pressCommandKey" in request)
      {
          g_commandIsPress = request.pressCommandKey;
          return;
      }

     if ("websitekey" in request)
     {
         g_currentPageUrl = request.websitekey;
     }

     if ("cpagetitle" in request)
     {
         g_currentPageTitle = request.cpagetitle;
         //var encodeStr = encodeURIComponent(g_currentPageTitle);
         //request.cpagetitle = encodeStr;
         request.cpagetitle = "";
     }

     connectToNativeHost(request);
});


//*********************************************************************
//功能：点击右键弹出的使用迅雷下载菜单响应
//时间：20170210
//说明：
//*********************************************************************
function clickRightMenuDownloadByThunder(info, tab)
{
    //点击右键迅雷下载后发消息给content.js
    //var port = chrome.tabs.connect(tab.id);
    //port.postMessage({url:info.linkUrl,referUrl:info.pageUrl});

    if(info.linkUrl)
    {
         connectToNativeHost({linkurl:info.linkUrl, pageurl:info.pageUrl});
    }
}

//在右键菜单中加入使用迅雷下载菜单
var title = chrome.i18n.getMessage("context_title");
chrome.contextMenus.create({type: "normal",title:title, contexts:["link"],onclick:clickRightMenuDownloadByThunder});
