!function e(t, n, r) {
    function o(c, a) {
        if (!n[c]) {
            if (!t[c]) {
                var u = "function" == typeof require && require;
                if (!a && u) return u(c, !0);
                if (i) return i(c, !0);
                var s = new Error("Cannot find module '" + c + "'");
                throw s.code = "MODULE_NOT_FOUND", s;
            }
            var d = n[c] = {
                exports: {}
            };
            t[c][0].call(d.exports, function(e) {
                var n = t[c][1][e];
                return o(n || e);
            }, d, d.exports, e, t, n, r);
        }
        return n[c].exports;
    }
    for (var i = "function" == typeof require && require, c = 0; c < r.length; c++) o(r[c]);
    return o;
}({
    1: [ function(e, t, n) {
        var r = {
            tr: function(e, t) {
                t = r.getRequestParams(t), new Image().src = C.jrServer + "/" + e + ".gif?" + $.param(t);
            },
            param: function(e) {
                var t = [];
                for (var n in e) t.push(n + "=" + (encodeURIComponent(e[n]) || ""));
                return t.join("&");
            },
            parseParams: function(e) {
                for (var t = e ? e.split("&") : [], n = {}, r = 0, o = t.length; r < o && t[r]; r++) {
                    var i = t[r].split("=");
                    n[i[0]] = decodeURIComponent(i[1]);
                }
                return n;
            },
            extend: function(e, t, n, r) {
                if (!e || !t) return e;
                void 0 === n && (n = !0);
                var o, i, c;
                if (r && (c = r.length)) for (o = 0; o < c; o++) !((i = r[o]) in t) || !n && i in e || (e[i] = t[i]); else for (i in t) !n && i in e || (e[i] = t[i]);
                return e;
            },
            getImpParams: function(e) {
                var t = {
                    u: e.uid,
                    c: e.cl,
                    v: e.ver,
                    v1: e.v1,
                    v2: e.v2,
                    s: e.ps,
                    t: e.ad,
                    sd: e.sd,
                    bl: e.bl,
                    cp: e.cp,
                    de: e.de,
                    mv: e.mv,
                    a: e.ci,
                    r: document.referrer,
                    tms: new Date().getTime()
                };
                for (var n in t) t[n] || "number" == typeof t[n] || delete t[n];
                return t;
            },
            redirectWhenClick: function(e, t) {
                e.target.href;
                r.openLink(t), e.stopPropagation(), e.preventDefault();
            },
            openLink: function(e) {
                function t() {
                    var t = document.createElement("a");
                    return t.setAttribute("target", "_blank"), t.setAttribute("id", "simulatelink"), 
                    t.style.display = "none", t.setAttribute("href", e), t;
                }
                var n = document.getElementById("simulatelink");
                n ? "A" != n.tagName ? (n = t(), document.body.appendChild(n), n.click(), document.body.removeChild(n)) : n.click() : (n = t(), 
                document.body.appendChild(n), n.click());
            },
            loadSc: function(e, t) {
                var n = document.getElementsByTagName("head")[0], r = document.createElement("script");
                r.charset = "utf-8", r.async = !0, r.src = e, r.onload = r.onreadystatechange = function() {
                    r.readyState && "loaded" !== r.readyState && "complete" !== r.readyState || (r.onload = r.onreadystatechange = null, 
                    t && t(), r.parentNode.removeChild(r));
                }, n.appendChild(r);
            },
            loadCss: function(e) {
                var t = document.createElement("link");
                t.rel = "stylesheet", t.href = e, t.type = "text/css", document.body.appendChild(t);
            },
            getCookie: function(e) {
                var t = new RegExp("(^| )" + e + "=([^;]*)(;|$)"), n = document.cookie.match(t);
                return n ? unescape(n[2]) : null;
            },
            setCookie: function(e, t, n) {
                var r = "";
                if ("number" == typeof n && (n = {
                    expires: n
                }), n) for (var o in n) if ("expires" == o) {
                    var i = new Date();
                    i.setTime(i.getTime() + n.expires), r += "expires=" + i.toGMTString() + ";";
                } else r += o + "=" + n[o] + ";";
                document.cookie = e + "=" + escape(t) + ";" + r;
            },
            removeCookie: function(e, t) {
                (t = t || {}).expires = -1, r.setCookie(e, "deleted", t);
            },
            getArrayItem: function(e, t) {
                for (var n = null, r = 0; r < e.length; r++) if (t(e[r])) {
                    n = e[r];
                    break;
                }
                return n;
            },
            getDomain: function(e) {
                var t = "";
                try {
                    t = (t = e || (window.location || document.location).hostname).match(/([-\w]+\.\b(?:net\.cn|com\.hk|com\.cn|com|cn|net|org|cc|tv$|hk)\b)/)[1];
                } catch (e) {}
                return t;
            },
            isIE: function() {
                return !!(window.ActiveXObject || "ActiveXObject" in window);
            },
            log: function(e) {
                window.console;
            },
            mouseEvent: function(e, t, n, r, o) {
                var i, c = {
                    bubbles: !0,
                    cancelable: "mousemove" != e,
                    view: window,
                    detail: 0,
                    screenX: t,
                    screenY: n,
                    clientX: r,
                    clientY: o,
                    ctrlKey: !1,
                    altKey: !1,
                    shiftKey: !1,
                    metaKey: !1,
                    button: 0,
                    relatedTarget: void 0
                };
                if ("function" == typeof document.createEvent) (i = document.createEvent("MouseEvents")).initMouseEvent(e, c.bubbles, c.cancelable, c.view, c.detail, c.screenX, c.screenY, c.clientX, c.clientY, c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, c.button, document.body.parentNode); else if (document.createEventObject) {
                    i = document.createEventObject();
                    for (prop in c) i[prop] = c[prop];
                    i.button = {
                        0: 1,
                        1: 4,
                        2: 2
                    }[i.button] || i.button;
                }
                return i;
            }
        };
        t.exports = r;
    }, {} ],
    2: [ function(e, t, n) {
        var r = [];
        r.push(function(t) {
            var n = e("../../ext-npm/web-common");
            setTimeout(function() {
                var e = n.getImpParams(t);
                delete e.r, new Image().src = t.jrServer + "/1.gif?" + n.param(e);
            }, 5e3);
        }), r.push(function(e) {}), function(e) {
            function t() {
                chrome.runtime.sendMessage({
                    topic: "extmem",
                    action: "get",
                    key: "env"
                }, function(e) {
                    e ? r.forEach(function(t) {
                        t(e);
                    }) : e && e.isReady || setTimeout(t, 30);
                }), n++;
            }
            var n = 0;
            t(), chrome.runtime.onMessage.addListener(function(e, t, n) {
                switch (e.topic) {
                  case "net":
                    var r = $.extend({}, e.settings, {
                        success: n,
                        error: function() {
                            n();
                        }
                    });
                    $.ajax(r);
                }
                return !0;
            });
        }();
    }, {
        "../../ext-npm/web-common": 1
    } ]
}, {}, [ 2 ]);