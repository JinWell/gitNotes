function _parseVip(e, t) {
    Math.random();
    var a = parsersUtil.get(e.type || e.url);
    kdyExt.parser[a](e, function(a) {
        t(a), trParams = {
            succ: 1,
            ref: e.type || e.url,
            accode: getAcode(a.parsefun),
            final: 1
        }, tr(trParams);
    });
}

function _parseVipNext(e, t) {
    parsersUtil.change(e.type || e.url) ? _parseVip(e, t) : t({
        msg: "error"
    });
}

function _parseVipChange(e, t) {
    _parseVipNext(e, t);
}

"undefined" == typeof global && (global = window);

var appcontent = {};

!function(e, t) {
    chrome.storage.local.get([ "__config", "vip-config" ], function(t) {
        t.__config && (e.__config = t.__config), e.vipConfig = t["vip-config"];
    });
}(appcontent), function(e, t) {
    function a(a, i, r) {
        var s = a.attr("width") || "100%", n = a.attr("height") || "100%";
        location.href.match(/tudou\.com/) && (n = "90%");
        var o = $("<embed></embed>");
        o.addClass("ckplayer-embed"), $(".ckplayer-embed").remove(), a.css("display", "none");
        var c = e.vipConfig.third.rules[S.parserName], p = r || (!i.match(/&s=0/) && c && c.ownPlayer ? c.ckplayer + "?vipkdy" : null) || (S.isHttps ? t.assetsServer : t.assetsServer.replace(/^https/, "http")) + "/ckplayer/ckplayer.swf";
        return o.attr({
            allowscriptaccess: "always",
            allowfullscreen: !0,
            quality: "high",
            bgcolor: "#fff",
            wmode: "transparent",
            src: p,
            width: s,
            height: n,
            name: "ckplayer_a1",
            id: "ckplayer_a1",
            align: "middle",
            type: "application/x-shockwave-flash",
            pluginspage: "http://www.macromedia.com/go/getflashplayer",
            style: "display:none;",
            flashvars: i
        }), a.after(o), o;
    }
    function i(e, a) {
        var i, r = e.url;
        return r.match("https?%3A%2F%2F") && (r = decodeURIComponent(r)), r = a ? r : encodeURIComponent(r), 
        "m3u8" == e.ext || "m3u8_list" == e.ext ? i = {
            f: encodeURIComponent(e.swf || t.assetsServer + "/ckplayer/m3u8.swf"),
            a: r,
            c: 0,
            s: 4,
            lv: 0,
            p: 1,
            v: 100
        } : "mp4" == e.ext ? i = {
            f: r,
            c: 0,
            s: 0,
            p: 1,
            v: 100,
            h: 0
        } : "xml" == e.ext && (i = {
            f: r,
            c: 0,
            s: 2,
            p: 1,
            v: 100,
            h: 0
        }), i;
    }
    function r(e) {
        var t = i(e), a = [];
        for (var r in t) a.push(r + "=" + t[r]);
        return a.push("loaded=ckplayerLoadedHandler"), a.join("&");
    }
    function s(e) {
        e.f = encodeURIComponent(e.f), e.a = encodeURIComponent(e.a);
        var t = [];
        for (var a in e) t.push(a + "=" + e[a]);
        return t.push("loaded=ckplayerLoadedHandler"), t.join("&");
    }
    function n(e) {
        if (0 == $("#vip-page").length) {
            var t = document.createElement("script");
            t.src = chrome.extension.getURL("page.js"), t.id = "vip-page", document.body.appendChild(t);
        }
        var i = $(w.getSitePlayerSelector());
        0 == i.length && (i = $(".dplayer")), b = a(i, r(e), e.ckplayer)[0], w.stylePage(), 
        i.hide(), i.hasClass("dplayer") && (i[0].removeAttribute("class"), i.empty(), i.before('<div class="txp_player" style="width:100%;height:100%"><object></object></div>')), 
        $(b).show(), w.stopSiteVideo && w.stopSiteVideo();
    }
    function o(e, t) {
        if (0 == $("#vip-page").length) {
            var i = document.createElement("script");
            i.src = chrome.extension.getURL("page.js"), i.id = "vip-page", document.body.appendChild(i);
        }
        var r = $(w.getSitePlayerSelector());
        0 == r.length && (r = $(".dplayer")), b = a(r, s(e), t)[0], w.stylePage(), r.hide(), 
        r.hasClass("dplayer") && (r[0].removeAttribute("class"), r.empty(), r.before('<div class="txp_player" style="width:100%;height:100%"><object></object></div>')), 
        $(b).show(), w.stopSiteVideo && w.stopSiteVideo(), clearTimeout(U), P = 0, c({
            succ: 1,
            ref: T,
            acode: 3,
            final: 1
        });
    }
    function c(t) {
        if (e.__config) {
            var a = {
                u: e.__config.uid,
                c: e.__config.cl,
                v: e.__config.v1,
                d: 2
            }, i = $.extend({}, a, t);
            new Image().src = "http://www.vipkdy.com/sp.gif?" + $.param(i);
        }
    }
    function p(e) {
        e = i(e, 1);
        var t = "";
        for (var a in e) t += "{" + a + "->" + e[a] + "}";
        setTimeout(function() {
            b.videoPause(), b.newAddress(t), b.videoPlay();
        }, 3e3);
    }
    function d() {
        function t(e, t, a) {
            return `<div class="vip-parser-item ${a ? "vip-parser-item-" + a : ""}" data-name=${e} data-action="change-to">` + `   <span class="vip-parser-name">账号${t + 1}</span>` + '   <span class="vip-parser-error"><sapn></div>';
        }
        if (!$(".vip-msg-main").length) {
            var a = {
                "iqiyi.com": [ "爱奇艺", "http://vip.iqiyi.com/" ],
                "le.com": [ "乐视", "https://ibuy.le.com/v2/buy/package.html#type=42" ],
                "youku.com": [ "优酷", "http://pay.youku.com/buy/products.html" ],
                "tudou.com": [ "土豆", "http://pay.youku.com/buy/products.html" ],
                "qq.com": [ "腾讯视频", "http://film.qq.com/" ],
                "sohu.com": [ "搜狐视频", "https://film.sohu.com/vip.html" ],
                "pptv.com": [ "PPTV", "http://vip.pptv.com/" ],
                "mgtv.com": [ "芒果", "http://order.mgtv.com/pay/pc/index.html" ]
            }[utils.getDomain(location.href)];
            C = $('<div class="vip-msg-main">   <div class="vip-header">      <div class="vip-fl">         <img src="' + chrome.extension.getURL("logos/16.png") + '">          <span class="vip-status">VIP看电影</span>      </div>      <div class="vip-btn-wrapper vip-fr">          <div class="vip-btn" title="查看" data-action="show-parsers">              <svg class="kdy-icon" aria-hidden="true">                 <use xlink:href="#icon-xiangxiajiantou"></use>              </svg>          </div>          <div class="vip-btn" title="隐藏" data-action="hide-parsers">              <svg class="kdy-icon" aria-hidden="true">                 <use xlink:href="#icon-xiangshangjiantou"></use>              </svg>          </div>          <div class="vip-btn" title="切换" data-action="change">              <svg class="kdy-icon" aria-hidden="true">                 <use xlink:href="#icon-change"></use>              </svg>          </div>          <div class="vip-btn vip-btn-mul" title="">              <svg class="kdy-icon" aria-hidden="true">                 <use xlink:href="#icon-wxbsousuotuiguang"></use>              </svg>          </div>      </div>   </div>   <div class="vip-pay-tip"></div>   <div class="vip-parsers-list"></div>   <div class="vip-tip">       <div>本软件仅供技术学习，勿做商业用途。</div>       <div>请支持购买<a href="' + a[1] + '"target="_blank">' + a[0] + "会员</a>，享受高清影视剧</div>   </div></div>").appendTo(document.body), 
            chrome.runtime.sendMessage({
                topic: "getParsersStatus"
            }, function(e) {
                if (e.all.length > 0) {
                    var a = e.all.map((a, i) => {
                        var r = "";
                        return a == e.cur && (r = "cur"), e.errors.indexOf(a) >= 0 && (r = "error"), t(a, i, r);
                    });
                    $(a.join("")).appendTo(C.find(".vip-parsers-list"));
                } else $('<div class="vip-msg-error">获取账号失败，请稍等一会或重启浏览器。</div>').appendTo(C.find(".vip-parsers-list"));
            }), chrome.storage.local.get("hideParsers", e => {
                C.addClass(e.hideParsers ? "parsers-hidden" : "parsers-showed");
            }), C.on("click", ".vip-btn, .vip-parser-item", function() {
                switch (this.dataset.action) {
                  case "redo":
                    v();
                    break;

                  case "close":
                    C.hide();
                    break;

                  case "change":
                    e.changeParser("gview-btn-change");
                    break;

                  case "show-parsers":
                    C.removeClass("parsers-hidden").addClass("parsers-showed"), chrome.storage.local.set({
                        hideParsers: !1
                    });
                    break;

                  case "hide-parsers":
                    C.removeClass("parsers-showed").addClass("parsers-hidden"), chrome.storage.local.set({
                        hideParsers: !0
                    });
                    break;

                  case "change-to":
                    S.parsing = this.dataset.name, e.changeParser("gview-parser-item", this.dataset.name);
                }
            });
        }
    }
    function l(e, t) {
        switch (d(), clearTimeout(V), $(document.body).removeClass("vip-parsed"), e) {
          case "later":
            if ($(".vip-wait-time").length > 0) return;
            t = Math.ceil(t / 1e3), C.find(".vip-btn-mul").attr("data-action", "close").attr("title", "关闭"), 
            C.find(".vip-status").html(`请等待<span class='vip-wait-time'>${t}</span>秒`), C.find(".vip-btn-mul use").attr("xlink:href", "#icon-close");
            var a = setInterval(function() {
                t > 0 ? (t--, $(".vip-wait-time").text(t)) : (clearInterval(a), v());
            }, 1e3);
            break;

          case "parsing":
            C.find(".vip-status").text("获取账号中..."), C.find(".vip-btn-mul").attr("data-action", "close").attr("title", ""), 
            C.find(".vip-btn-mul").removeAttr("data-action"), C.find(".vip-btn-mul use").attr("xlink:href", "#icon-wxbsousuotuiguang"), 
            C.find(".vip-parser-item-cur").removeClass("vip-parser-item-cur"), C.find(".vip-parser-item-parsing").removeClass("vip-parser-item-parsing"), 
            C.find(`.vip-parser-item[data-name="${S.parsing}"]`).addClass("vip-parser-item-parsing");
            break;

          case "vip-pay":
          case "vip-ticket":
            C.find(".vip-btn-mul").attr("data-action", "close").attr("title", "关闭"), C.find(".vip-status").html("暂不支持"), 
            C.find(".vip-pay-tip").addClass("vip-pay-tip-active").html("本视频是<strong>付费电影</strong>或者<strong>用券电影</strong>，请自行付费."), 
            C.find(".vip-btn-mul use").attr("xlink:href", "#icon-close"), C.find('.vip-btn[data-action="show-parsers"],.vip-btn[data-action="hide-parsers"],.vip-parsers-list').hide();
            break;

          case "success":
            w.mdView && w.mdView(), C.find(".vip-status").text("获取账号成功"), C.find(".vip-btn-mul").attr("data-action", "close").attr("title", "关闭"), 
            C.find(".vip-btn-mul use").attr("xlink:href", "#icon-close"), V = setTimeout(function() {
                C.find('[data-action="close"]').length > 0 && C.find(".vip-tip").hide();
            }, 5e3), C.find(".vip-parser-item-parsing").removeClass("vip-parser-item-parsing"), 
            C.find(`.vip-parser-item[data-name="${S.parserName}"]`).addClass("vip-parser-item-cur"), 
            $(document.body).addClass("vip-parsed");
            break;

          case "error":
            C.find(".vip-status").text("获取账号失败"), C.find(".vip-btn-mul").attr("data-action", "redo").attr("title", "重新获取"), 
            C.find(".vip-btn-mul use").attr("xlink:href", "#icon-redo");
        }
        C.show(), C.find(".vip-tip").show();
    }
    function v() {
        I ? e.changeShtByVid(I, R, function() {}) : e.changeShtByUrl(T, function() {});
    }
    function u() {
        U = setTimeout(function() {
            e.changeParser();
        }, 2e4);
    }
    function m() {
        return {
            closeExt: !1,
            unblockVip: !0,
            blockWebAd: !0,
            pattern: "traditon"
        };
    }
    function h(e) {
        if (w) var t = 0, a = setInterval(function() {
            if (t > 20) clearInterval(a); else {
                t++;
                var i;
                -1 !== (i = w.checkIsVip()) && (e(i), clearInterval(a));
            }
        }, 1e3);
    }
    function f() {
        if (w) {
            var t = 0, a = setInterval(function() {
                t > 20 ? clearInterval(a) : (t++, $(w.getSitePlayerSelector()).length > 0 && (e.changeShtByUrl(location.href, function() {}), 
                clearInterval(a)));
            }, 300);
            $(document.body).addClass("vipkdy-enabled");
        }
    }
    function g(e) {
        $("#vipkdy-parser-iframe").remove(), $("#dplayer-vip").remove(), clearTimeout(U);
        var t = $(w.getSitePlayerSelector());
        0 == t.length && (t = $(".dplayer"));
        t.attr("width"), t.attr("height");
        t.css("display", "none"), t.after(`<div id="dplayer-vip"></div>`);
        new DPlayer({
            element: document.getElementById("dplayer-vip"),
            autoplay: !0,
            video: {
                url: e
            }
        });
    }
    function y() {
        var t = 0, a = setInterval(function() {
            t > 20 ? clearInterval(a) : (t++, $(w.getSitePlayerSelector()).length > 0 && (clearInterval(a), 
            a = setInterval(function() {
                var t = w.getVideoTitle();
                t.title && (clearInterval(a), t.href = window.location.href, t.time = new Date().getTime(), 
                e.saveRecord(t));
            }, 1e3)));
        }, 300);
    }
    function k() {
        chrome.storage.local.get("unblockvipConfig", function(t) {
            var a = e.unblockvipConfig = t.unblockvipConfig ? t.unblockvipConfig : m();
            if (!a.closeExt) {
                if (window.addEventListener("load", w.fixListClick), w.saveRecord) var i = setInterval(function() {
                    -1 !== w.saveRecord() && clearInterval(i);
                }, 500); else y();
                w.stylePage && w.stylePage();
                /(?:\?|&)kdynum=(\d)*/.exec(window.location.href);
                "modern" === a.pattern ? f() : h(function(e) {
                    0 === e ? w.bindEventsOnOriginVideo && w.bindEventsOnOriginVideo() : 1 === e ? f() : 2 === e ? l("vip-pay") : 3 === e && l("vip-ticket");
                });
            }
        });
    }
    var b, w, x = getSites(appcontent), P = 0, S = {};
    if (void 0 !== x) {
        for (var _ of x) if (_.checkType()) {
            (w = _).pre && w.pre();
            break;
        }
        window.addEventListener("message", function(t) {
            "ckplayer-ended" == t.data.topic ? w.nextSht() : (0 === P && "ckplayer-error" == t.data.topic || "ckplayer-speed-slow" == t.data.topic) && (e.changeParser(t.data.topic), 
            P++);
        });
        var C, V, I, R, T, U;
        if (e.changeShtByVid = function(e, t, a) {
            $("#vipkdy-parser-iframe").remove(), $("#dplayer-vip").remove(), clearTimeout(U), 
            I = e, R = t;
            chrome.runtime.sendMessage({
                topic: "getFlashvars",
                url: e,
                type: t
            }, function() {
                S = data.parser, a(data);
            }), u(), l("parsing"), b && b.videoPause && b.videoPause();
        }, e.changeShtByUrl = function(e, t) {
            $("#vipkdy-parser-iframe").remove(), $("#dplayer-vip").remove(), clearTimeout(U), 
            T = e, chrome.runtime.sendMessage({
                topic: "getFlashvars",
                url: e
            }, function(e) {
                S = e.parser, t(e);
            }), u(), l("parsing"), b && b.videoPause && b.videoPause();
        }, e.changeParser = function(e, t) {
            $("#vipkdy-parser-iframe").remove(), $("#dplayer-vip").remove(), clearTimeout(U);
            T ? (chrome.runtime.sendMessage({
                topic: "changeParser",
                url: T,
                reason: e,
                parser: t
            }, function(e) {
                e && "ok" == e.msg && (S = e.parser);
            }), u(), l("parsing"), b && b.videoPause && b.videoPause()) : I && chrome.runtime.sendMessage({
                topic: "changeParser",
                url: I,
                type: R,
                reason: e,
                parser: t,
                only: !0
            }, function(e) {});
        }, e.saveRecord = function(e) {
            chrome.storage.local.get("vipkdyRecords", function(t) {
                var a = t.vipkdyRecords ? t.vipkdyRecords : [], i = -1;
                e.eposideFlg && -1 != (i = utils.getArrayIndexByKey(a, "eposideFlg", e.eposideFlg)) && a.splice(i, 1), 
                -1 != (i = utils.getArrayIndexByKey(a, "href", e.href)) && a.splice(i, 1), a.push(e), 
                a.length > 30 && (a = a.slice(a.length - 30)), chrome.storage.local.set({
                    vipkdyRecords: a
                });
            });
        }, window.addEventListener("message", function(e) {
            var t;
            "ckplayer-flashvars" == e.data.topic ? (t = $(w.getSitePlayerSelector()), $(b).remove(), 
            b = null, t.hide(), $("video.vip-parser").remove(), o(e.data.flashvars, e.data.ckplayer), 
            l("success"), $("#vipkdy-parser-iframe").remove(), $("#dplayer-vip").remove()) : "vip-mp4" == e.data.topic && (t = $(w.getSitePlayerSelector()), 
            $(b).remove(), b = null, t.hide(), $("video#dplayer-vip").remove(), $("#dplayer-vip").remove(), 
            g(e.data.flashvars.f), w.stopSiteVideo && w.stopSiteVideo(), l("success"), $("#vipkdy-parser-iframe").remove());
        }), chrome.runtime.onMessage.addListener(function(t) {
            if ("newAddress" != t.topic || S.parserName != t.parserName && t.parserName) "changeParser-contextMenus" == t.topic && e.changeParser(t.topic); else {
                var a = $(w.getSitePlayerSelector()), i = t.value;
                $(b).remove(), b = null, "ok" == i.msg ? (a.hide(), b && $(b).show(), w.stopSiteVideo && w.stopSiteVideo(), 
                b ? p(i) : n(i), l("success")) : "later" == i.msg ? l("later", i.time) : (a.show(), 
                w.restoreSiteVideo && w.restoreSiteVideo(), b && $(b).hide(), l("error")), P = 0, 
                clearTimeout(U);
            }
        }), w) {
            if (w.checkVipLogin) var L = w.checkVipLogin(function(e) {
                e ? chrome.runtime.sendMessage({
                    topic: "vip-login",
                    domain: utils.getDomain(location.href),
                    value: L
                }) : k();
            }); else k();
            if (document.URL.indexOf("tv.sohu.com") >= 0 && -1 == document.cookie.indexOf("fee_status=true") && (document.cookie = "fee_status=true"), 
            document.URL.indexOf("www.iqiyi.com") >= 0 && -1 == document.cookie.indexOf("player_forcedType=h5_VOD") && (document.cookie = "player_forcedType=h5_VOD"), 
            document.URL.indexOf("v.youku.com") >= 0) {
                var O = parseInt(89 * Math.random() + 11);
                document.cookie = "vgray=" + O;
                try {
                    sessionStorage.removeItem("P_l_h5");
                } catch (e) {}
            }
        }
    }
}(appcontent, common);