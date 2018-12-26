function getSites(t) {
    var e, i, r, n = [], a = {
        pre: function() {
            !function() {
                for (var t = $("script"), r = 0; r < t.length; r++) if (regRst = t[r].innerText.match(/[\s\S]*pid: (\d+),[\s\S]*title:"(.+?)",/), 
                regRst) {
                    e = regRst[1], i = regRst[2];
                    break;
                }
            }(), function() {
                var t = location.href.match(/.*\/(\d+).html/)[1];
                $.ajax({
                    url: "http://d.api.m.le.com/apipccard/dynamic?id=" + e + "&cid=2&vid=" + t + "&platform=pc&isvip=0&type=episode,otherlist,relalbum",
                    dataType: "json",
                    success: function(t) {
                        200 == t.code && t.data && (n = n.concat(t.data.otherlist.videolist).concat(t.data.episode.videolist));
                    }
                });
            }();
            for (var t = $("script"), a = 0; a < t.length; a++) if (regRst = t[a].innerText.match(/[\s\S]*title:"(.+?)",/), 
            regRst) {
                e = regRst[1], r = {
                    vurl: location.href,
                    tvQipuId: regRst[2],
                    vn: regRst[3]
                };
                break;
            }
        },
        checkVipLogin: function(t) {
            $.ajax({
                url: "http://d.api.m.le.com/yuanxian/memberlogin",
                dataType: "json",
                success: function(e) {
                    t(e.body && 1 === e.body.isvip ? !0 : !1);
                },
                error: function() {
                    t(!1);
                }
            });
        },
        checkIsPay: function() {
            return !1;
        },
        checkIsVip: function(t) {
            if (!(t = t || {
                url: location.href.replace(/#.*/, "").replace(/\?.*/, "")
            }) || !e) {
                if ($(".js-start-vip").length) {
                    var i = $(".js-start-vip").text();
                    return a.getCurItem().length ? a.getCurItem().find(".juji_vip_ico").length ? 1 : 0 : -1 !== i.indexOf("开通影视会员") ? 1 : 0;
                }
                return -1;
            }
            return a.checkIsVipByVlist(t);
        },
        checkIsVipByVlist: function(t) {
            var e;
            return n && n.length > 0 && (t.vid ? e = utils.getArrayEleByKey(n, "vid", t.vid) : t.url && (e = utils.getArrayEleByKey(n, "url", t.url))), 
            e ? e.ispay : -1;
        },
        checkType: function() {
            return !0;
        },
        getSitePlayerSelector: function(t) {
            return $("#video").length ? "#video" : "#fla_box, .ztPlay, #player embed";
        },
        stylePage: function() {},
        nextSht: function() {
            var t = a.getCurItem().parent().next(), e = t.find("a").attr("data-vid");
            e && (a.saveRecord(t), a.changeShtByVid(e));
        },
        getClickedItem: function(t) {
            return $(t).closest("[data-vid]");
        },
        getClickedVid: function(t) {
            return a.getClickedItem(t).attr("data-vid");
        },
        saveRecord: function(t) {
            var e = a.getVideoTitle(t);
            e.href = window.location.href, e.time = new Date().getTime(), e.eposideFlg = e.alltitle.replace(/第\d+集/, ""), 
            appcontent.saveRecord(e);
        },
        fixListClick: function() {
            document.body.addEventListener("click", function(e) {
                var i = a.getClickedItem(e.target), r = a.getClickedVid(e.target);
                if (r) {
                    if (1 === a.checkIsVipByVlist({
                        vid: r
                    }) || "modern" == t.unblockvipConfig.pattern) a.changeShtByVid(r), e.stopPropagation(), 
                    e.preventDefault(); else {
                        var c = a.getCurItem().attr("data-vid");
                        1 === a.checkIsVipByVlist({
                            vid: c
                        }) ? location.href = utils.getArrayEleByKey(n, "vid", r).url : (a.getCurItem().removeClass("cur"), 
                        a.getItemByVid(r).addClass("cur"), a.setVideoTitle());
                    }
                    a.saveRecord(i);
                }
            }, !0);
        },
        getCurItem: function() {
            return $("[data-vid].cur");
        },
        getShtList: function() {},
        getItemByVid: function(t) {
            return $(`[data-vid=${t}]`);
        },
        setVideoTitle: function() {
            var t, e = a.getCurItem(), i = e.attr("data-vtype");
            "episode" == i ? t = $('meta[name="irAlbumName"]').attr("content") + e.text() : "related" == i ? t = e.attr("title") : "listing" == i && (t = e.attr("title")), 
            $(".j-video-name").attr("title", t).text(t);
        },
        getVideoTitle: function(t) {
            if (!t) return {
                alltitle: i
            };
            var e, r, n, c = t || a.getCurItem(), o = c.attr("data-vtype");
            return e = "episode" == o ? (r = $('meta[name="irAlbumName"]').attr("content")) + (n = c.text()) : r = "related" == o ? c.attr("title") : "listing" == o ? c.attr("title") : $(".video-info-top dt").text(), 
            {
                alltitle: e,
                title: r,
                num: n
            };
        },
        changeShtByVid: function(t) {
            var e = utils.getArrayEleByKey(n, "vid", t).url;
            appcontent.changeShtByUrl(e, function() {
                a.getCurItem().removeClass("cur"), a.getItemByVid(t).addClass("cur"), a.setVideoTitle(t);
            });
        },
        changeSht: function(t) {
            var e = 0;
            +t < 10 && (t = "0" + t);
            var i = setInterval(function() {
                if (e > 20) clearInterval(i); else {
                    e++;
                    var r = $("a[title^='第" + t + "集']");
                    r.length > 0 && (r[0].click(), clearInterval(i));
                }
            }, 300);
        }
    }, c = [ {
        checkType: function() {
            return !!location.href.match(/www\.le\.com/);
        }
    }, {
        checkType: function() {
            return !!location.href.match(/sports\.le\.com/);
        },
        getClickedItem: function(t) {
            return $(t).closest("[data-id]");
        },
        getClickedVid: function(t) {
            return this.getClickedItem(t).attr("data-id");
        },
        getCurItem: function() {
            return $(".video-item.current");
        },
        getItemByVid: function(t) {
            return $(`.video-item[data-id="${t}"]`);
        },
        setVideoTitle: function() {
            $(".game-header .title").text(this.getCurItem().find(".video-name").attr("title"));
        },
        changeShtByVid: function(t) {
            var e = this;
            chrome.runtime.sendMessage({
                topic: "getFlashvars",
                url: t,
                type: "letv"
            }, function() {
                e.getCurItem().removeClass("current"), e.getItemByVid(t).addClass("current"), e.setVideoTitle();
            });
        }
    } ];
    for (var o of c) for (var l in a) o[l] || (o[l] = a[l]);
    return c;
}