!function() {
    var e = setInterval(function() {
        window.unblockvipConfig && !window.unblockvipConfig.closeExt && (clearInterval(e), 
        $.ajax({
            url: `${gConfig.assetsUrl}/vadblock-rules-v2.json?_=${+new Date()}`,
            dataType: "json",
            success: function(e) {
                var o = e.rules, r = new RegExp(e.iqiyiSpe, "i"), t = [], c = [], n = [], a = [];
                for (var i in o) o[i].disabled || (t = t.concat(o[i].whites || []), c = c.concat(o[i].cancels || []), 
                n = n.concat(o[i].redirects || []), a = a.concat(o[i].css || []));
                chrome.webRequest.onBeforeRequest.addListener(function(e) {
                    for (var o of t) if (e.url.match(o)) return;
                    for (var r of n) if (e.url.match(r[0])) return {
                        redirectUrl: r[1]
                    };
                    for (var a of c) if (e.url.match(a)) return {
                        cancel: !0
                    };
                }, {
                    urls: [ "<all_urls>" ]
                }, [ "blocking" ]);
                var s = 0;
                chrome.webRequest.onBeforeRequest.addListener(function(e) {
                    if (r.test(e.url) && ++s % 2 == 0) return s >= 5 && (s = 0), {
                        cancel: !0
                    };
                }, {
                    urls: [ "http://data.video.qiyi.com/*" ]
                }, [ "blocking" ]);
                var u = [ "v.qq.com", "iqiyi.com", "youku.com", "le.com", "mgtv.com", "tv.sohu.com", "tudou.com" ];
                chrome.tabs.onUpdated.addListener(function(e, o, r) {
                    if ("complete" == o.status && r.url.match(u.join("|"))) for (var t of a) {
                        r.url.match(t.urlReg) && chrome.tabs.insertCSS(e, {
                            code: t.style
                        });
                        break;
                    }
                });
            }
        }));
    }, 1e3);
}();