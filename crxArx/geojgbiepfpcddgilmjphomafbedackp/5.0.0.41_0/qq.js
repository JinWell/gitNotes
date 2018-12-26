function getSites(e) {
    var t, n, i = {}, o = {}, r = {}, a = {
        pre: function() {
            t = $("title").text().replace(/ .*/, ""), (n = $("title").text().match(/第(\d+)集/)) && (n = n[1]), 
            window.addEventListener("message", function(e) {
                e.source.location.href == location.href && "qq-video-info" == e.data.type && (i = e.data.list_info, 
                cover_info = e.data.cover_info, $.extend(o, e.data.video_info));
            }), function() {
                $("div[data-player-videoid]").attr("data-player-videoid");
                window.addEventListener("message", function(e) {
                    if ("list_info" == e.data.type) {
                        var t = e.data.tvInfoJs;
                        t.results && t.results.forEach(function(e) {
                            i.data[e.id] = e.fields;
                        });
                    }
                });
                var e = document.createElement("script");
                e.src = chrome.extension.getURL("qq-page.js"), document.querySelector("html").appendChild(e);
            }();
        },
        getCurrentInfo: function() {
            return o;
        },
        curClassName: "current",
        checkVipLogin: function(e) {
            try {
                e($(".icon_vip").hasClass("icon_grey") || $(".icon_vip").hasClass("none") ? !1 : !1);
            } catch (t) {
                e(!1);
            }
        },
        checkIsPay: function() {
            return !1;
        },
        checkIsVip: function(e) {
            if (cover_info) {
                var t = e ? i.data[e] : o;
                return 0 == cover_info.payInfo.c_single_price ? 0 : cover_info.payfree_num && parseInt(cover_info.payfree_num) >= parseInt(t.episode) ? 0 : 1;
            }
            return -1;
        },
        checkType: function() {
            return !0;
        },
        getSitePlayerSelector: function(e) {
            return ".txp_player object";
        },
        stylePage: function() {},
        nextSht: function() {
            var e = this.getCurItem().next().attr("id");
            e && this.changeShtByVid(e);
        },
        getClickedVid: function(e) {},
        fixListClick: function() {
            document.body.addEventListener("click", function(t) {
                var n = $(t.target).closest(".item[id],.list_item[id]").attr("id");
                if (n) {
                    var o = $(t.target.closest("a"))[0].href;
                    if (i.data[n] && a.checkIsVip(n) || "modern" == e.unblockvipConfig.pattern) a.changeShtByUrl(o, n), 
                    t.stopPropagation(), t.preventDefault(); else {
                        var r = cover_info.id;
                        location.href.match("(.*)" + r);
                        location.href = o, t.stopPropagation(), t.preventDefault();
                    }
                }
            }, !0);
        },
        getCurItem: function() {
            return $(".current[id='" + o.vid + "']");
        },
        getShtList: function() {},
        getItemByVid: function(e) {
            return $("#" + e);
        },
        setVideoTitle: function() {
            document.title = o.title, $(".video_title").attr("title", o.title).text(o.title);
        },
        getVideoTitle: function() {
            return {
                alltitle: o.title.indexOf(cover_info.title) >= 0 ? o.title : cover_info.title + " " + o.title
            };
        },
        changeView: function(e) {},
        changeShtByUrl: function(e, t) {
            var n = this;
            appcontent.changeShtByUrl(e, function() {
                n.getItemByVid(o.vid).removeClass("current"), n.getItemByVid(t).addClass("current"), 
                $.extend(r, o), $.extend(o, i.data[t]), n.setVideoTitle(), n.saveRecord();
            });
        },
        saveRecord: function() {
            var e = this.getVideoTitle(), t = $("#" + o.vid);
            t.length > 0 ? e.href = t.find("a")[0].href : e.href = location.href, e.time = new Date().getTime(), 
            e.eposideFlg = o.category_map && "正片" == o.category_map[1] ? o.category_map.join("-") : "", 
            appcontent.saveRecord(e);
        },
        changeShtByVid: function(e) {
            var t = this;
            appcontent.changeShtByVid(e, "qq", function() {
                t.getItemByVid(o.vid).removeClass("current"), t.getItemByVid(e).addClass("current"), 
                $.extend(r, o), $.extend(o, i.data[e]), t.setVideoTitle(), t.saveRecord();
            });
        }
    }, c = [ {}, {}, {}, {
        checkType: function() {
            return 0;
        }
    } ];
    for (var d of c) for (var f in a) d[f] || (d[f] = a[f]);
    return common.checkSafe() || (c = void 0), c;
}