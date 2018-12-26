var scriptAttr = HTMLScriptElement.prototype.setAttribute;

HTMLScriptElement.prototype.setAttribute = function(i, t) {
    if ("src" == i) {
        var o = t;
        if (!o) return;
        var c, s, n = o.match("callback=window.Q.__callbacks__.(.*?)(?:&|$)");
        n && (c = n[1], s = window.Q.__callbacks__[c]), o.match("//cache.video.i?qiyi.com/jp/avlist/") ? window.Q.__callbacks__[c] = function(i) {
            window.postMessage({
                topic: "vinfo",
                type: "vlist",
                tvInfoJs: i
            }, "*"), s(i);
        } : o.match("//cache.video.i?qiyi.com/jp/othlist") ? window.Q.__callbacks__[c] = function(i) {
            window.postMessage({
                topic: "vinfo",
                type: "othlist",
                tvInfoJs: i
            }, "*"), s(i);
        } : o.match("//cache.video.i?qiyi.com/jp/vi/") ? window.Q.__callbacks__[c] = function(i) {
            window.postMessage({
                topic: "vinfo",
                type: "tvInfo",
                tvInfoJs: i
            }, "*"), s(i);
        } : o.match("//mixer.video.iqiyi.com/jp/mixin/") ? window.Q.__callbacks__[c] = function(i) {
            window.postMessage({
                topic: "vinfo",
                type: "mixer",
                tvInfoJs: i
            }, "*"), s(i);
        } : o.match("//cache.video.i?qiyi.com/jp/sdvlst/") && (window.Q.__callbacks__[c] = function(i) {
            window.postMessage({
                topic: "vinfo",
                type: "sdvlst",
                tvInfoJs: i
            }, "*"), s(i);
        });
    }
    scriptAttr.apply(this, arguments);
};