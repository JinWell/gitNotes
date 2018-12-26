function openit(){
  chrome.tabs.create({url:"http://www.sotapit.com/",active:true});
}
chrome.browserAction.onClicked.addListener(openit);
function noticeInstalled() {
  var currVersion = chrome.app.getDetails().version;
  var prevVersion = localStorage['version']
  if (currVersion != prevVersion) {
    if (typeof prevVersion == 'undefined') {
    
      chrome.tabs.create({url: "options.html"});
       alert("感谢您的安装");
    } else {
      alert("2017.11.22 紧急修复“客户端无权播放”的问题。\n欢迎扫码关注我的公众号“一只撅屁股的猪”。\n以后有其他什么的软件，也会第一时间在公众号上发布");
      chrome.tabs.create({url: "options.html"});

    }
    localStorage['version'] = currVersion;
  }
}

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
      noticeInstalled();
    } else if (details.reason == "update"){
      noticeInstalled();
    }
});

  

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-90895341-1', 'auto');
  ga('send', 'pageview');

