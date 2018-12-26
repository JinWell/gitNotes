top !== window && chrome.runtime.sendMessage({
    topic: "get_mp4_cofig"
}, function(e) {
    if (e.length > 0) {
        var t = document.createElement("script");
        t.innerText = "var vipMp4Configs = " + JSON.stringify(e), document.querySelector("html").appendChild(t);
        var n = document.createElement("script");
        n.src = chrome.extension.getURL("mp4-page.js"), document.querySelector("html").appendChild(n);
    }
});