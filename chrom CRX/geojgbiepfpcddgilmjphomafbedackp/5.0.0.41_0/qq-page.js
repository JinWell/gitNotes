if (Object.defineProperty(HTMLScriptElement.prototype, "src", {
    set: function(i) {
        this.setAttribute("src", i);
        var o = i;
        if (o) {
            var t, e, n = o.match("&callback=(.*?)(?:&|$)");
            n && (t = n[1], e = window[t]), 0 === o.indexOf("https://union.video.qq.com/fcgi-bin/data?otype") && (window[t] = function(i) {
                window.postMessage({
                    type: "list_info",
                    tvInfoJs: i
                }, "*"), e(i);
            });
        }
    }
}), window.LIST_INFO) window.postMessage({
    type: "qq-video-info",
    list_info: LIST_INFO,
    video_info: VIDEO_INFO,
    cover_info: COVER_INFO
}, location.origin); else {
    var _LIST_INFO;
    Object.defineProperty(window, "LIST_INFO", {
        set: function(i) {
            _LIST_INFO = i, window.postMessage({
                type: "qq-video-info",
                list_info: _LIST_INFO,
                video_info: VIDEO_INFO,
                cover_info: COVER_INFO
            }, location.origin);
        },
        get: function() {
            return _LIST_INFO;
        }
    });
}