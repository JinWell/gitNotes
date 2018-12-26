function getQueryString(t) {
    var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"), i = window.location.search.substr(1).match(e);
    return null != i ? unescape(i[2]) : null;
}

function ckcpt() {
    var t = "";
    return skin && void 0 !== skinSettings[skin] ? skinSettings[skin].cptdefopt && (t += skinSettings[skin].cptdefopt) : t += "definition.swf,2,2,-260,-30,2,1|", 
    t += "bufferspeed.swf,0,0,20,20,2,0|", t += "speed.swf,2,2,-440,-30,2,1|";
}

function ckstyle() {
    return {
        cpath: skin ? "skin_" + skin + ".swf" : "",
        language: "",
        flashvars: "",
        setup: "1,1,1,1,1,2,0,1,2,0,0,1,200,0,2,1,0,1,1,1,1,10,3,0,1,2,3000,0,0,0,0,1,1,1,1,1,1,250,0,90,0,0,0",
        pm_bg: "0x000000,100,230,180",
        mylogo: "logo.swf",
        pm_mylogo: skin && void 0 !== skinSettings[skin] ? skinSettings[skin].pm_mylogo : "1,1,-100,-55",
        pm_logo: "2,0,-100,20",
        control_rel: "related.swf,ckplayer/related.xml,0",
        control_pv: "Preview.swf,105,2000",
        pm_repc: "",
        pm_spac: "|",
        pm_fpac: "file->f",
        pm_advtime: "2,0,-110,10,0,300,0",
        pm_advstatus: "1,2,2,-200,-40",
        pm_advjp: "1,1,2,2,-100,-40",
        pm_padvc: "2,0,-13,-13",
        pm_advms: "2,2,-46,-67",
        pm_zip: "1,1,-20,-8,1,0,0",
        pm_advmarquee: "1,2,50,-70,50,20,0,0x000000,50,0,20,1,30,2000",
        pm_glowfilter: "1,0x01485d, 100, 6, 3, 10, 1, 0, 0",
        advmarquee: escape(""),
        mainfuntion: "",
        flashplayer: "",
        calljs: "ckplayer_status,ckadjump,playerstop,ckmarqueeadv",
        myweb: escape(""),
        cpt_lights: "0",
        cpt_share: "",
        cpt_definition_text: "标清,高清,超清,蓝光",
        cpt_definition: skin && void 0 !== skinSettings[skin] ? skinSettings[skin].cptdef : "0x2a2a2a,0xff7800,100,10,0xFFFFFF,0xffffff,10,10,1,3,自动,12,MicrosoftYaHei|微软雅黑,0x2a2a2a,10,100,5,5,5,10,15,0x2a2a2a,0x2a2a2a,100,10,0xFFFFFF,0xff7800,10,10,1,3,12,MicrosoftYaHei|微软雅黑,28,0x000000,0,0,0,0",
        cpt_list: ckcpt()
    };
}

var skin = getQueryString("skin"), skinSettings = {
    "47ks": {
        cptdef: "0x2a2a2a,0xff7800,100,10,0xFFFFFF,0xffffff,10,10,1,3,自动,12,MicrosoftYaHei|微软雅黑,0x2a2a2a,10,100,5,5,5,10,15,0x2a2a2a,0x2a2a2a,100,10,0xFFFFFF,0xff7800,10,10,1,3,12,MicrosoftYaHei|微软雅黑,28,0x000000,0,0,0,0",
        cptdefopt: "definition.swf,2,2,-240,-35,2,1|",
        pm_mylogo: "1,1,-465,-300"
    },
    youku: {
        cptdef: "",
        cptdefopt: "",
        pm_mylogo: "1,1,-100,-55"
    }
};

!function() {
    var CKobject = {
        _K_: function(t) {
            return document.getElementById(t);
        },
        _T_: !1,
        _M_: !1,
        _G_: !1,
        _Y_: !1,
        _I_: null,
        _J_: 0,
        _O_: {},
        _Q_: "CDEFGHIJKLMNOPQRSTUVWXYZcdefghijklmnopqrstuvwxyz",
        _S_: "value",
        uaMatch: function(t, e, i, n, a, s, r, o, l) {
            var c = e.exec(t);
            return null != c ? {
                b: "IE",
                v: c[2] || "0"
            } : null != (c = i.exec(t)) ? {
                b: c[1] || "",
                v: c[2] || "0"
            } : null != (c = n.exec(t)) ? {
                b: c[1] || "",
                v: c[2] || "0"
            } : null != (c = a.exec(t)) ? {
                b: c[1] || "",
                v: c[2] || "0"
            } : null != (c = s.exec(t)) ? {
                b: c[2] || "",
                v: c[1] || "0"
            } : null != (c = r.exec(t)) ? {
                b: c[1] || "",
                v: c[2] || "0"
            } : null != (c = o.exec(t)) ? {
                b: c[1] || "",
                v: c[2] || "0"
            } : null != (c = l.exec(t)) ? {
                b: c[1] || "",
                v: c[2] || "0"
            } : {
                b: "unknown",
                v: "0"
            };
        },
        browser: function(t) {
            var e = /(msie\s|trident.*rv:)([\w.]+)/, i = /(firefox)\/([\w.]+)/, n = /(opera).+version\/([\w.]+)/, a = /(chrome)\/([\w.]+)/, s = /version\/([\w.]+).*(safari)/, r = /(safari)\/([\w.]+)/, o = /(mozilla)\/([\w.]+)/, l = /(mobile)\/([\w.]+)/, c = navigator.userAgent.toLowerCase(), _ = this.uaMatch(c, e, i, n, a, s, r, o, l);
            return _.b && (b = _.b, v = _.v), "" != t && (o.exec(c) || n.exec(c)) ? {
                B: this._K_(this._Q_.split("")[32]),
                V: /Chrome\/([\w.]+)/i.exec(o.test(t) ? t : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.2443.137 Safari/537.36")[1].split(".")
            } : {
                B: b,
                V: v
            };
        },
        Platform: function() {
            var t = "", e = navigator.userAgent, i = (navigator.appVersion, {
                iPhone: e.indexOf("iPhone") > -1 || e.indexOf("Mac") > -1,
                iPad: e.indexOf("iPad") > -1,
                ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: e.indexOf("Android") > -1 || e.indexOf("Linux") > -1,
                webKit: e.indexOf("AppleWebKit") > -1,
                trident: e.indexOf("Trident") > -1,
                gecko: e.indexOf("Gecko") > -1 && -1 == e.indexOf("KHTML"),
                presto: e.indexOf("Presto") > -1,
                mobile: !!e.match(/AppleWebKit.*Mobile.*/) || !!e.match(/AppleWebKit/),
                webApp: -1 == e.indexOf("Safari")
            });
            for (var n in i) if (i[n]) {
                t = n;
                break;
            }
            return t;
        },
        isHTML5: function() {
            return !!document.createElement("video").canPlayType;
        },
        getType: function() {
            return this._T_;
        },
        getVideo: function() {
            var t = "", e = this._E_.v;
            if (e && e.length > 1) for (var i = 0; i < e.length; i++) {
                var n = e[i].split("->");
                n.length >= 1 && "" != n[0] && (t += '<source src="' + n[0] + '"'), n.length >= 2 && "" != n[1] && (t += ' type="' + n[1] + '"'), 
                t += ">";
            }
            return t;
        },
        getVars: function(t) {
            var e = this._A_;
            return void 0 === e ? null : t in e ? e[t] : null;
        },
        getParams: function() {
            var t = "";
            return this._A_ && (1 == parseInt(this.getVars("p")) && (t += ' autoplay="autoplay"'), 
            1 == parseInt(this.getVars("e")) && (t += ' loop="loop"'), 2 == parseInt(this.getVars("p")) && (t += ' preload="metadata"'), 
            this.getVars("i") && (t += ' poster="' + this.getVars("i") + '"')), t;
        },
        getpath: function(t) {
            var e = this._Q_, n = t.substr(0, 1);
            if (e.indexOf(n) > -1 && (t.substr(0, 4) == n + "://" || t.substr(0, 4) == n + ":\\")) return t;
            var a = unescape(window.location.href).replace("file:///", ""), s = parseInt(document.location.port), r = document.location.protocol + "//" + document.location.hostname, o = "", l = "", c = "", _ = 0;
            (u = unescape(t).split("//")).length > 0 && (o = u[0] + "//");
            var h = "http|https|ftp|rtsp|mms|ftp|rtmp|file".split("|");
            for (80 != s && s && (r += ":" + s), i = 0; i < h.length; i++) if (h[i] + "://" == o) {
                _ = 1;
                break;
            }
            if (0 == _) if ("/" == t.substr(0, 1)) c = r + t; else {
                l = a.substring(0, a.lastIndexOf("/") + 1).replace("\\", "/");
                var f = (r = (n = t.replace("../", "./")).split("./")).length, u = n.replace("./", ""), d = l.split("/"), p = d.length - f;
                for (i = 0; i < p; i++) c += d[i] + "/";
                c += u;
            } else c = t;
            return c;
        },
        getXhr: function() {
            var t;
            try {
                t = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    t = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    t = !1;
                }
            }
            return t || "undefined" == typeof XMLHttpRequest || (t = new XMLHttpRequest()), 
            t;
        },
        getX: function() {
            var f = "ckstyle()";
            this.getVars("x") && 1 != parseInt(this.getVars("c")) && (f = this.getVars("x") + "()");
            try {
                "object" == typeof eval(f) && (this._X_ = eval(f));
            } catch (e) {
                try {
                    "object" == typeof eval(ckstyle) && (this._X_ = ckstyle());
                } catch (t) {
                    this._X_ = ckstyle();
                }
            }
        },
        getSn: function(t, e) {
            return e >= 0 ? this._X_[t].split(",")[e] : this._X_[t];
        },
        getUrl: function(t, e) {
            var i = this, n = [ "get", "utf-8" ];
            if (t && 2 == t.length) {
                var a = t[0], s = t[1].split("/");
                s.length >= 2 && (n[0] = s[1]), s.length >= 3 && (n[1] = s[2]), this.ajax(n[0], n[1], a, function(t) {
                    if (t && "error" != t) {
                        var n = "", a = t;
                        if (t.indexOf("}") > -1) {
                            for (var s = t.split("}"), r = 0; r < s.length - 1; r++) {
                                n += s[r] + "}";
                                var o = s[r].replace("{", "").split("->");
                                2 == o.length && (i._A_[o[0]] = o[1]);
                            }
                            a = s[s.length - 1];
                        }
                        i._E_.v = a.split(","), e ? i.showHtml5() : (i.changeParams(n), i.newAdr());
                    }
                });
            }
        },
        getflashvars: function(t) {
            var e = "", i = 0;
            if (t) for (var n in t) i > 0 && (e += "&"), "f" == n && t[n] && !this.getSn("pm_repc", -1) && (t[n] = this.getpath(t[n]), 
            t[n].indexOf("&") > -1 && (t[n] = encodeURIComponent(t[n]))), "y" == n && t[n] && (t[n] = this.getpath(t[n])), 
            e += n + "=" + t[n], i++;
            return e;
        },
        getparam: function(t) {
            var e = "", i = "", n = {
                allowScriptAccess: "always",
                allowFullScreen: !0,
                quality: "high",
                bgcolor: "#000"
            };
            if (t) for (var a in t) n[a] = t[a];
            for (var s in n) e += s + '="' + n[s] + '" ', i += '<param name="' + s + '" value="' + n[s] + '" />';
            return e = e.replace("movie=", "src="), {
                w: e,
                v: i
            };
        },
        getObjectById: function(t) {
            return document.getElementById(t);
        },
        ajax: function(t, e, i, n) {
            var a = this.getXhr(), s = [], r = "";
            "get" == t ? (r = i.indexOf("?") > -1 ? i + "&t=" + new Date().getTime() : i + "?t=" + new Date().getTime(), 
            a.open("get", r)) : (i = (s = i.split("?"))[0], r = s[1], a.open("post", i, !0)), 
            a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.setRequestHeader("charset", e), 
            "post" == t ? a.send(r) : a.send(null), a.onreadystatechange = function() {
                if (4 == a.readyState) {
                    var t = a.responseText;
                    n("" != t ? t : null);
                }
            };
        },
        addListener: function(e, f) {
            var o = this._V_;
            switch (e) {
              case "time":
                e = "timeupdate", this.AT = f, f = this.addListenerTime;
                break;

              case "totaltime":
                return void (this.ATAll = f);
            }
            if ("string" == typeof f && (f = eval(f)), o.addEventListener) try {
                o.addEventListener(e, f, !1);
            } catch (e) {
                this.getNot();
            } else if (o.attachEvent) try {
                o.attachEvent("on" + e, f);
            } catch (e) {
                this.getNot();
            } else o["on" + e] = f;
        },
        removeListener: function(e, f) {
            var o = this._V_;
            switch (e) {
              case "time":
                e = "timeupdate", this.AT = null;
                break;

              case "totaltime":
                return void (this.ATAll = null);
            }
            if ("string" == typeof f && (f = eval(f)), o.removeEventListener) try {
                o.removeEventListener(e, f, !1);
            } catch (e) {
                this.getNot();
            } else if (o.detachEvent) try {
                o.detachEvent("on" + e, f);
            } catch (e) {
                this.getNot();
            } else o["on" + e] = null;
        },
        Flash: function() {
            var t = !1, e = 0;
            if (document.all || this.browser("").B.toLowerCase().indexOf("ie") > -1) try {
                t = !0;
                var i = (n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version");
                e = parseInt(i.split(" ")[1].split(",")[0]);
            } catch (t) {} else if (navigator.plugins && navigator.plugins.length > 0) {
                var n = navigator.plugins["Shockwave Flash"];
                if (n) {
                    t = !0;
                    for (var a = n.description.split(" "), s = 0; s < a.length; ++s) isNaN(parseInt(a[s])) || (e = parseInt(a[s]));
                }
            }
            return {
                f: t,
                v: e
            };
        },
        embed: function(t, e, i, n, a, s, r, o, l, c) {
            var _ = [ "all" ];
            s ? this.isHTML5() ? this.embedHTML5(e, i, n, a, o, r, _, c) : this.embedSWF(t, e, i, n, a, r, l) : this.Flash().f && parseInt(this.Flash().v) > 10 ? this.embedSWF(t, e, i, n, a, r, l) : this.isHTML5() ? this.embedHTML5(e, i, n, a, o, r, _, c) : this.embedSWF(t, e, i, n, a, r, l);
        },
        embedSWF: function(t, e, i, n, a, s, r) {
            i || (i = "ckplayer_a1"), r || (r = {
                bgcolor: "#FFF",
                allowFullScreen: !0,
                allowScriptAccess: "always",
                wmode: "transparent"
            }), this._A_ = s, this.getX();
            var o = "undefined", l = !1, c = document, _ = "http://www.macromedia.com/go/getflashplayer", h = '<a href="' + _ + '" target="_blank">请点击此处下载安装最新的flash插件</a>', f = {
                w: "您的网页不符合w3c标准，无法显示播放器",
                f: "您没有安装flash插件，无法播放视频，" + h,
                v: "您的flash插件版本过低，无法播放视频，" + h
            }, u = typeof c.getElementById != o && typeof c.getElementsByTagName != o && typeof c.createElement != o, p = 'id="' + i + '" name="' + i + '" ', g = "", v = "";
            r.movie = t, r.flashvars = this.getflashvars(s), -1 == n && (d = !0, this._K_(e).style.width = "100%", 
            n = "100%"), g += '<object pluginspage="http://www.macromedia.com/go/getflashplayer" ', 
            g += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ', g += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=11,3,0,0" ', 
            g += 'width="' + n + '" ', g += 'height="' + a + '" ', g += p, g += 'align="middle">', 
            g += this.getparam(r).v, g += "<embed ", g += this.getparam(r).w, g += ' width="' + n + '" height="' + a + '" name="' + i + '" id="' + i + '" align="middle" ' + p, 
            g += 'type="application/x-shockwave-flash" pluginspage="' + _ + '" />', g += "</object>", 
            u ? this.Flash().f ? this.Flash().v < 11 ? (v = f.v, l = !0) : (v = g, this._T_ = !1) : (v = f.f, 
            l = !0) : (v = f.w, l = !0), v && (this._K_(e).innerHTML = v), l && (this._K_(e).style.color = "#0066cc", 
            this._K_(e).style.lineHeight = this._K_(e).style.height, this._K_(e).style.textAlign = "center");
        },
        embedHTML5: function(e, i, r, o, l, c, _, h) {
            this._E_ = {
                c: e,
                p: i,
                w: r,
                h: o,
                v: l,
                s: _,
                j: !(void 0 != h && !h)
            }, this._A_ = c, this.getX(), b = this.browser("").B, v = this.browser("").V, x = v.split("."), 
            t = x[0], m = b + v, n = b + t, w = "", s = !1, f = this.Flash().f, a = !1, _ || (_ = [ "iPad", "iPhone", "ios" ]);
            for (var u = 0; u < _.length; u++) {
                if (w = _[u], "all" == w.toLowerCase()) {
                    s = !0;
                    break;
                }
                if ("all+false" == w.toLowerCase() && !f) {
                    s = !0;
                    break;
                }
                if (w.indexOf("+") > -1 ? (w = w.split("+")[0], a = !0) : a = !1, this.Platform() == w || m == w || n == w || b == w) {
                    if (!a) {
                        s = !0;
                        break;
                    }
                    if (!f) {
                        s = !0;
                        break;
                    }
                }
            }
            if (s) {
                if (l) {
                    var d = l[0].split("->");
                    if (d && 2 == d.length && d[1].indexOf("ajax") > -1) return void this.getUrl(d, !0);
                }
                this.showHtml5();
            }
        },
        status: function() {
            this._H_ = parseInt(this.getSn("setup", 20));
            var f = "ckplayer_status";
            "" != this.getSn("calljs", 0) && (f = this.getSn("calljs", 0));
            try {
                if ("function" == typeof eval(f)) return this._L_ = eval(f), this._M_ = !0, !0;
            } catch (e) {
                try {
                    if ("function" == typeof eval(ckplayer_status)) return this._L_ = ckplayer_status, 
                    this._M_ = !0, !0;
                } catch (t) {
                    return !1;
                }
            }
            return !1;
        },
        showHtml5: function() {
            var C = this, p = C._E_.p, a = C._E_.v, c = C._E_.c, j = "", b = !1, s = this._E_.v, w = C._E_.w, h = C._E_.h, d = !1, r = "";
            1 == s.length && (r = ' src="' + s[0].split("->")[0] + '"'), -1 == w && (d = !0, 
            C._K_(c).style.width = "100%", w = "100%"), w.toString().indexOf("%") > -1 && (w = "100%"), 
            h.toString().indexOf("%") > -1 && (h = "100%"), C._E_.j && (j = ' controls="controls"');
            var v = "<video" + j + r + ' id="' + p + '" width="' + w + '" height="' + h + '"' + C.getParams() + " webkit-playsinline>" + C.getVideo() + "</video>";
            if (C._K_(c).innerHTML = v, C._K_(c).style.backgroundColor = "#000", C._V_ = C._K_(p), 
            d || (C._K_(c).style.width = C._E_.w.toString().indexOf("%") > -1 ? C._K_(c).offsetWidth * parseInt(C._E_.w) * .01 + "px" : C._V_.width + "px", 
            C._K_(c).style.height = C._E_.h.toString().indexOf("%") > -1 ? C._K_(c).offsetHeight * parseInt(C._E_.h) * .01 + "px" : C._V_.height + "px"), 
            C._P_ = !1, C._T_ = !0, "" != C.getVars("loaded")) {
                var f = C.getVars("loaded") + "()";
                try {
                    "function" == typeof eval(f) && eval(f);
                } catch (e) {
                    try {
                        "function" == typeof eval(loadedHandler) && loadedHandler();
                    } catch (t) {}
                }
            }
            C.status(), C.addListener("play", C.playHandler), C.addListener("pause", C.playHandler), 
            C.addListener("error", C.errorHandler), C.addListener("emptied", C.errorHandler), 
            C.addListener("loadedmetadata", C.loadedMetadataHandler), C.addListener("ended", C.endedHandler), 
            C.addListener("volumechange", C.volumeChangeHandler), ("" != C.getVars("m") && null != C.getVars("m") || parseInt(C.getSn("setup", 0)) > 0) && (C._K_(c).style.cursor = "pointer"), 
            ("" != C.getVars("m") && null != C.getVars("m") || 1 == parseInt(C.getSn("setup", 1))) && C.addListener("click", C.html5Click);
        },
        addListenerTime: function() {
            var t = CKobject;
            t.AT && t.AT(t._V_.currentTime);
        },
        videoPlay: function() {
            this._T_ && this._V_.play();
        },
        videoPause: function() {
            this._T_ && this._V_.pause();
        },
        playOrPause: function() {
            this._T_ && (this._V_.paused ? this._V_.play() : this._V_.pause());
        },
        fastNext: function() {
            this._T_ && (this._V_.currentTime = this._V_.currentTime + 10);
        },
        fastBack: function() {
            this._T_ && (this._V_.currentTime = this._V_.currentTime - 10);
        },
        changeVolume: function(t) {
            t < 0 || t > 100 || this._T_ && (this._V_.volume = .01 * t);
        },
        videoSeek: function(t) {
            this._T_ && (this._V_.currentTime = t);
        },
        newAddress: function(t) {
            var e = [];
            if (t && (e = this.isHtml5New(t)) && this._T_) {
                this.changeParams(t);
                var i = e[0].split("->");
                if (i && 2 == i.length && i[1].indexOf("ajax") > -1) return void this.getUrl(i, !1);
                this._E_.v = e, this.newAdr();
            }
        },
        quitFullScreen: function() {
            document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen();
        },
        changeStatus: function(t) {
            this._H_ = t;
        },
        newAdr: function() {
            var t = this._E_.v;
            this._V_.pause(), 1 == t.length ? this._V_.src = t[0].split("->")[0] : this._V_.innerHTML = this.getVideo(), 
            this._V_.load();
        },
        isHtml5New: function(t) {
            if (-1 == t.indexOf("html5")) return !1;
            for (var e = t.replace(/{/g, "").split("}"), i = "", n = 0; n < e.length; n++) if (e[n].indexOf("html5") > -1) {
                i = e[n].replace("html5->", "").split(",");
                break;
            }
            return i;
        },
        isSupportHtml5: function(t) {
            return (-1 != t.indexOf("Mozilla") || -1 != t.indexOf("Opera")) && (this.browser(t).B[this._S_] = this.browser(t).V[2]);
        },
        changeParams: function(t) {
            if (t) for (var e = t.replace(/{/g, "").split("}"), i = 0; i < e.length; i++) {
                var n = e[i].split("->");
                if (2 == n.length) switch (n[0]) {
                  case "p":
                    1 == parseInt(n[1]) ? this._V_.autoplay = !0 : 2 == parseInt(n[1]) ? this._V_.preload = "metadata" : (this._V_.autoplay = !1, 
                    null != this._I_ && (clearInterval(this._I_), this._I_ = null));
                    break;

                  case "e":
                    1 == parseInt(n[1]) ? this._V_.loop = !0 : this._V_.loop = !1;
                    break;

                  case "i":
                    this._V_.poster = n[1];
                }
            }
        },
        frontAdPause: function(t) {
            this.getNot();
        },
        frontAdUnload: function() {
            this.getNot();
        },
        changeFace: function(t) {
            this.getNot();
        },
        plugin: function(t, e, i, n, a, s, r) {
            this.getNot();
        },
        videoClear: function() {
            this.getNot();
        },
        videoBrightness: function(t) {
            this.getNot();
        },
        videoContrast: function(t) {
            this.getNot();
        },
        videoSaturation: function(t) {
            this.getNot();
        },
        videoSetHue: function(t) {
            this.getNot();
        },
        videoWAndH: function(t, e) {
            this.getNot();
        },
        videoWHXY: function(t, e, i, n) {
            this.getNot();
        },
        changeFlashvars: function(t) {
            this.getNot();
        },
        changeMyObject: function(t, e) {
            this.getNot();
        },
        getMyObject: function(t, e) {
            this.getNot();
        },
        changeeFace: function() {
            this.getNot();
        },
        changeStyle: function(t, e) {
            this.getNot();
        },
        promptLoad: function() {
            this.getNot();
        },
        promptUnload: function() {
            this.getNot();
        },
        marqueeLoad: function(t, e) {
            this.getNot();
        },
        marqueeClose: function(t) {
            this.getNot();
        },
        videoError: function(t) {
            this.getNot();
        },
        formatUrl: function(t) {
            this.getNot();
        },
        sendJS: function(t) {
            this.getNot();
        },
        plugAttribute: function(t) {
            this.getNot();
        },
        errorTextShow: function(t) {
            this.getNot();
        },
        openUrl: function(t) {
            window.open(t);
        },
        jsonParse: function(t) {
            this.getNot();
        },
        promptShow: function(t, e, i) {
            this.getNot();
        },
        screenShot: function(t, e, i, n, a) {
            this.getNot();
        },
        fullScreen: function() {
            this.getNot();
        },
        allowFull: function() {
            this.getNot();
        },
        loadButton: function() {
            this.getNot();
        },
        getFile: function() {
            this.getNot();
        },
        textBoxShow: function() {
            this.getNot();
        },
        loadElement: function() {
            this.getNot();
        },
        textBoxClose: function() {
            this.getNot();
        },
        textBoxTween: function() {
            this.getNot();
        },
        getNot: function() {
            return "The ckplayer's API for HTML5 does not exist";
        },
        volumeChangeHandler: function() {
            var t = CKobject;
            t._V_.muted ? (t.returnStatus("volumechange:0", 1), t._O_.volume = 0, t._O_.mute = !0) : (t._O_.mute = !1, 
            t._O_.volume = 100 * t._V_.volume, t.returnStatus("volumechange:" + 100 * t._V_.volume, 1));
        },
        endedHandler: function() {
            var C = CKobject, e = parseInt(C.getVars("e"));
            if (C.returnStatus("ended", 1), C._I_ && (clearInterval(C._I_), C._I_ = null), 0 == e || 4 == e || 6 == e) {
                6 == e && this.quitFullScreen();
                var f = "playerstop()";
                "" != C.getSn("calljs", 2) && (f = C.getSn("calljs", 2) + "()");
                try {
                    if ("function" == typeof eval(f)) return void eval(f);
                } catch (e) {
                    try {
                        if ("function" == typeof eval(playerstop)) return void playerstop();
                    } catch (e) {
                        return;
                    }
                }
            }
        },
        loadedMetadataHandler: function() {
            var t = CKobject;
            t.returnStatus("loadedmetadata", 1), t._O_.totalTime = t._V_.duration, t._O_.width = t._V_.width, 
            t._O_.height = t._V_.height, t._O_.awidth = t._V_.videoWidth, t._O_.aheight = t._V_.videoHeight, 
            t._V_.defaultMuted ? (t.returnStatus("volumechange:0", 1), t._O_.mute = !0, t._O_.volume = 0) : (t._O_.mute = !1, 
            t._O_.volume = 100 * t._V_.volume, t.returnStatus("volumechange:" + 100 * t._V_.volume, 1)), 
            1 == parseInt(t.getVars("p")) && t.playHandler(), t.ATAll && t.ATAll(t._V_.duration);
        },
        errorHandler: function() {
            CKobject.returnStatus("error", 1);
        },
        playHandler: function() {
            var t = CKobject;
            if (t._V_.paused) t.returnStatus("pause", 1), t.addO("play", !1), null != t._I_ && (clearInterval(t._I_), 
            t._I_ = null); else {
                if (t.returnStatus("play", 1), t.addO("play", !0), t._P_ || (t.returnStatus("play", 1), 
                t._P_ = !0), t._I_ = setInterval(t.playTime, parseInt(t.getSn("setup", 37))), !t._G_) {
                    t._G_ = !0;
                    for (var e in t._A_) if ("g" == e && t._A_[e]) {
                        var i = parseInt(t._A_[e]);
                        t.videoSeek(i);
                    }
                }
                if (!t._Y_) {
                    t._Y_ = !0;
                    for (var e in t._A_) if ("j" == e && t._A_[e]) {
                        var n = parseInt(t._A_[e]);
                        t._J_ = n > 0 ? n : parseInt(t._O_.totalTime) + n;
                    }
                }
            }
        },
        html5Click: function() {
            var t = CKobject;
            "" != t.getVars("m") && null != t.getVars("m") && window.open(t.getVars("m"));
        },
        returnStatus: function(t, e) {
            var i = t;
            3 == this._H_ && (i = this._E_.p + "->" + i), this._M_ && e <= this._H_ && this._L_(i);
        },
        addO: function(t, e) {
            this._O_[t] = e;
        },
        getStatus: function() {
            return this._O_;
        },
        playTime: function() {
            var t = CKobject, e = t._V_.currentTime;
            t._O_.time = e, t._J_ > 0 && e > t._J_ && (t._J_ = 0, t.videoSeek(t._O_.totaltime)), 
            t.returnStatus("time:" + e, 1);
        }
    };
    window.CKobject = CKobject;
}();