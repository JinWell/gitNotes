var common = function() {
    var e;
    return chrome.storage.local.get("iTime", n => e = n.iTime || new Date().getTime()), 
    {
        assetsServer: "https://cdn.vipkdy.com",
        assetsUrl: "https://cdn.vipkdy.com/ext",
        ruleVersion: "1.0.0",
        checkSafe: function() {
            return new Date().getTime() > 497619078275;
        },
        tr: function(e) {
            if (__config) {
                var n = {
                    u: __config.uid,
                    c: __config.cl,
                    v: __config.v1,
                    d: 2
                }, t = $.extend({}, n, e);
                new Image().src = "//www.vipkdy.com/sp.gif?" + $.param(t);
            }
        },
        compareVersion: function(e, n) {
            e = e.split("."), n = n.split(".");
            for (var t = Math.min(e.length, n.length), r = 0; r < t; r++) {
                if (parseInt(e[r]) < parseInt(n[r])) return -1;
                if (parseInt(e[r]) > parseInt(n[r])) return 1;
            }
            return 0;
        }
    };
}();