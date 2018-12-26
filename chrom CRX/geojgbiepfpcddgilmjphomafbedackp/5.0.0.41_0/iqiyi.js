function getSites(e) {
    function t(e) {
        return 2 === e.payMark || 3 === e.payMark ? e.payMark : void 0 !== e.purType ? 2 === e.purType ? 1 : 0 : 2 === e.albumPurType ? 1 : 0 === e.albumPurType ? 0 : 1 === e.albumPurType ? void 0 === e.purType ? -1 : 2 === e.purType ? 1 : 0 : void 0;
    }
    var a, i = [], n = {
        get url() {
            return this.vurl;
        }
    }, r = {};
    setTimeout(function() {
        for (var e = $('script[type="text/javascript"]'), t = 0; t < e.length; t++) {
            var a = e[t].innerText.match(/[\s\S]*albumId:(\d+),[\s\S]*tvId:(\d+),[\s\S]*tvName:"(.*?)",[\s\S]*albumPurType:(\d),/);
            if (a) {
                n.vurl = location.href, n.tvQipuId = a[2], n.vn = a[3], n.albumPurType = a[4];
                break;
            }
        }
    }, 1e3);
    var o = 0, c = {
        pre: function() {
            window.addEventListener("message", function(e) {
                var t = e.data;
                if ("vinfo" == t.topic) {
                    var r = e.data.tvInfoJs;
                    if (r.data) if ("vlist" == t.type) i = i.concat(r.data.vlist); else if ("othlist" == t.type) i = i.concat(r.data.list); else if ("tvInfo" == t.type) a = {
                        payMark: r.data.payMark,
                        vurl: r.data.vu,
                        tvQipuId: r.data.tvid,
                        vn: r.data.vn
                    }, $.extend(n, a); else if ("mixer" == t.type) void 0 === r.data.length && (r.data = [ {
                        video: r.data
                    } ]), r.data.forEach(function(e) {
                        e.video && i.push({
                            payMark: e.video.payMark,
                            purType: e.video.purType,
                            vurl: e.video.url,
                            tvQipuId: e.video.tvId,
                            vn: e.video.name
                        });
                    }); else if ("sdvlst" == t.type) {
                        var o;
                        for (var c in r.data) (o = (o = r.data[c].data).length ? o : [ o ]).forEach(function(e) {
                            i.push({
                                payMark: e.payMark,
                                purType: e.purType,
                                vurl: e.vUrl,
                                tvQipuId: e.tvQipuId,
                                vn: e.videoName
                            });
                        });
                    }
                }
            });
            var e = document.createElement("script");
            e.src = chrome.extension.getURL("iqiyi-page.js"), document.querySelector("html").appendChild(e);
        },
        mdView: function() {
            setTimeout(function() {
                $(".J_play-underFrame").remove(), $("#flashArea_paypop").parent().remove();
            }, 2e3);
        },
        checkVipLogin: function(e) {
            var t = 0, a = $("i[data-vipheader-elem='vipicon']").eq(0);
            a && a.is(":visible") && (t = 1), e(t);
        },
        getCurrentInfo: function() {
            return n;
        },
        checkIsPay: function() {
            var e = $("#movielistpaybtn").text();
            return -1 !== e.indexOf("付费点播") || -1 !== e.indexOf("用券看");
        },
        bindEventsOnOriginVideo: function() {
            if (!document.getElementById("iqiyipage2")) {
                var e = document.createElement("script");
                e.id = "iqiyipage2", e.src = chrome.extension.getURL("iqiyi2-page.js"), document.querySelector("head").appendChild(e);
            }
        },
        checkIsVip: function(e) {
            if (!e || e.vid == a.tvQipuId) return a ? a.payMark : -1;
            var t = -1;
            if (e = e || {
                url: location.href.replace(/#.*/, "").replace(/\?.*/, "")
            }) t = this.checkIsVipByVlist(e); else if ($("a[data-vippay-ele='vipPayBtn']").length) {
                var i = $("a[data-vippay-ele='vipPayBtn']").text();
                t = this.getCurItem().length ? this.getCurItem().find(".icon-viedo-vip-zxSm").length && this.getCurItem().find(".icon-viedo-vip-zxSm").parent().hasClass("dn") ? 0 : 1 : -1 !== i.indexOf("开通VIP会员") ? 1 : 0;
            } else t = -1;
            return t;
        },
        checkIsVipByVlist: function(e) {
            var a;
            return i && i.length > 0 && (e.vid ? a = utils.getArrayEleByKey(i, "tvQipuId", e.vid) : e.url && (a = utils.getArrayEleByKey(i, "vurl", e.url))), 
            a ? t(a) : -1;
        },
        checkType: function() {
            return !0;
        },
        getSitePlayerSelector: function() {
            return ".pw-video,#flash";
        },
        stopSiteVideo: function() {
            $(".vipFloatbgCls").parent().remove(), $('[data-cupid="container"]').hide(), $('[data-player-hook="plgcontainer"]').hide(), 
            o = setInterval(function() {
                var e = $(".btn-pause")[0];
                e && e.click();
            }, 1e3);
        },
        restoreSiteVideo: function() {
            clearInterval(o), $('[data-player-hook="plgcontainer"]').show();
            var e = $(".btn-play")[0];
            e && e.click();
        },
        stylePage: function() {},
        nextSht: function() {
            var e = this.getCurItem().nextAll("[data-videolist-tvid],[data-vid]"), t = e.attr("data-videolist-tvid") || e.attr("data-tvid");
            t && ($.extend(r, n), $.extend(n, utils.getArrayEleByKey(i, "tvQipuId", t)), this.saveRecord(e), 
            this.changeShtByVid(t));
        },
        getClickedItem: function(e) {
            return $(e).closest("[data-videolist-tvid]");
        },
        getRecord: function() {
            if (!n || !n.vn) return -1;
            var e = this.getVideoTitle();
            return e.href = n.vurl, e.time = new Date().getTime(), e.eposideFlg = n.vn.replace(/\d+/, ""), 
            e;
        },
        getVlist: function() {},
        fixListClick: function() {
            document.body.addEventListener("click", function(t) {
                var a = $(t.target).closest("[data-videolist-tvid],[data-tvid]");
                if (a = a.attr("data-videolist-tvid") || a.attr("data-tvid")) {
                    $.extend(r, n), $.extend(n, utils.getArrayEleByKey(i, "tvQipuId", a));
                    var o = $(t.target).closest("a").attr("href");
                    if (!n && o && (location.href = o), 1 === c.checkIsVip({
                        vid: a
                    }) || "modern" == e.unblockvipConfig.pattern) c.changeShtByVid(a), t.stopPropagation(), 
                    t.preventDefault(); else {
                        var d = r.tvQipuId;
                        1 === c.checkIsVip({
                            vid: d
                        }) ? location.href = utils.getArrayEleByKey(i, "tvQipuId", a).vurl : c.changePageView();
                    }
                    c.saveRecord();
                }
            }, !0);
        },
        changePageView: function() {
            $("#widget-videotitle,#widget-videoname").text(n.vn), $("title").text(n.vn), $(`[data-videolist-tvid=${r.tvQipuId}],[data-tvid=${r.tvQipuId}]`).removeClass("selected"), 
            $(`[data-videolist-tvid=${n.tvQipuId}],[data-tvid=${n.tvQipuId}]`).addClass("selected");
        },
        changeShtByVid: function() {
            var t = this, a = n.vurl;
            e.changeShtByUrl(a, function() {
                t.changePageView();
            });
        },
        changeShtByUrl: function(t, a) {
            var i = this;
            e.changeShtByUrl(a, function() {
                i.changePageView();
            });
        },
        getCurItem: function() {
            return $('.selected[j-delegate="videoPlayList"], .selected[data-delegate="videoPlayList"]');
        },
        getShtList: function() {
            return $('[data-delegate="videoPlayList"]');
        },
        getItemByVid: function(e) {
            return $(`[data-delegate="videoPlayList"][data-videolist-tvid="${e}"]`);
        },
        getVideoTitle: function() {
            return {
                alltitle: n.vn,
                title: n.vn.replace(/第\d+集/, "")
            };
        },
        changeSht: function(e) {
            var t = 0, a = setInterval(function() {
                if (t > 20) clearInterval(a); else {
                    t++;
                    var i = $("a[rseat='sht_" + e + "']");
                    i.length > 0 && (i[0].click(), clearInterval(a));
                }
            }, 300);
        }
    }, d = [ {
        checkType: function() {
            return "电视剧" == $('meta[name="irCategory"]').attr("content");
        }
    }, {
        checkType: function() {
            return "教育" == $('meta[name="irCategory"]').attr("content");
        }
    }, {
        checkType: function() {
            return "电影" == $('meta[name="irCategory"]').attr("content");
        }
    }, {
        checkType: function() {
            return "VIP会员" == $('meta[name="irCategory"]').attr("content");
        },
        checkIsVip: function() {
            return 1;
        }
    }, {
        checkType: function() {
            return "音乐" == $('meta[name="irCategory"]').attr("content");
        }
    }, {
        checkType: function() {
            return "搞笑" == $('meta[name="irCategory"]').attr("content") || "旅游" == $('meta[name="irCategory"]').attr("content");
        }
    }, {
        checkType: function() {
            return "动漫" == $('meta[name="irCategory"]').attr("content");
        }
    }, {
        checkType: function() {
            return "综艺" == $('meta[name="irCategory"]').attr("content");
        }
    }, {
        checkType: function() {
            return "纪录片" == $('meta[name="irCategory"]').attr("content");
        }
    }, {
        checkType: function() {
            return location.href.match(/v_.+\.html/);
        }
    } ];
    for (var u of d) for (var v in c) u[v] || (u[v] = c[v]);
    return d;
}