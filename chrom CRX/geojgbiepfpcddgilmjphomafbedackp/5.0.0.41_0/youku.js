function getSites(t) {
    var e = {
        curClassName: "active",
        checkVipLogin: function(t) {
            $.ajax({
                url: "http://cmstool.youku.com/cms/player/userinfo/user_info",
                dataType: "json",
                success: function(e) {
                    t(0 === e.error && e.vip ? !0 : !1);
                },
                error: function() {
                    t(!1);
                }
            });
        },
        checkIsPay: function() {
            var t = $(".form_btn_btext").text();
            return -1 !== t.indexOf("用券免费看") || -1 !== t.indexOf("购买后观看");
        },
        checkIsVip: function() {
            if ($(".form_btn_btext").length) {
                var t = $(".form_btn_btext").text();
                return -1 !== t.indexOf("用券免费看") || -1 !== t.indexOf("购买后观看") ? 2 : -1 !== t.indexOf("开通黄金会员") || -1 !== t.indexOf("开通VIP会员") ? 1 : 0;
            }
            return -1;
        },
        checkType: function() {
            return !0;
        },
        stopSiteVideo: function() {
            oriVideoStopInterId = setInterval(function() {
                try {
                    $(".control-pause-icon")[0].click();
                } catch (t) {}
            }, 1e3);
        },
        restoreSiteVideo: function() {
            clearInterval(oriVideoStopInterId);
        },
        getSitePlayerSelector: function(t) {
            return "#player object,#ykPlayer video:first";
        },
        stylePage: function() {
            try {
                $(".h5-layer-conatiner").hide(), $(".h5player-dashboard").css({
                    opacity: 0,
                    bottom: "-50px"
                }), $(".ckplayer-embed").css("height", "100%");
            } catch (t) {}
        },
        nextSht: function() {
            var t = this.getCurItem().next();
            t.attr("id") && t.find("a")[0].click();
        },
        getClickedVid: function(t) {},
        fixListClick: function() {},
        getCurItem: function() {
            return $(".item.current");
        },
        getShtList: function() {},
        changeShtByVid: function(t) {
            appcontent.changeShtByVid(t, "youku", function() {
                var n = e.getCurItem(), i = n.next();
                i && i.addClass("current"), n.removeClass("current"), e.setVideoTitle(t);
            });
        },
        getItemByVid: function(t) {
            return $("#item_" + t);
        },
        setVideoTitle: function(t) {
            $(".base_info #subtitle").text(this.getCurItem().attr("title"));
        },
        getVideoTitle: function() {
            var t = $(".base_info #subtitle").prev().text();
            return {
                alltitle: t + $(".base_info #subtitle").text(),
                title: t
            };
        },
        changeView: function(t) {},
        changeShtByUrl: function(t) {}
    }, n = [ {}, {}, {}, {
        checkType: function() {
            return location.href.match(/\.youku\.com\/(?:.?)+\//);
        },
        fixListClick: function() {
            document.addEventListener("click", function(t) {
                var e = $(t.target).closest("[data-pjax]");
                e.length > 0 && e.removeAttr("data-pjax");
            }, !0);
        }
    } ];
    for (var i of n) for (var r in e) i[r] || (i[r] = e[r]);
    return n;
}