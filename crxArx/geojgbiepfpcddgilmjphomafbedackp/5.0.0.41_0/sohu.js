function getSites(t) {
    var e = {
        curClassName: "active",
        checkIsPay: function() {
            return -1 !== $(".movie-info-vip-wrap").text().indexOf("付费点播");
        },
        checkIsVip: function() {
            if ($(".detailInfo_btns .J_open_vip_btn,.vipBox .js-by-vip").length) {
                var t = $(".detailInfo_btns .J_open_vip_btn,.vipBox .js-by-vip").text();
                return this.getCurItem().length ? this.getCurItem().find(".tips_vip").length ? 1 : 0 : -1 !== t.indexOf("黄金会员") ? 1 : 0;
            }
            return -1;
        },
        checkType: function() {
            return !0;
        },
        getSitePlayerSelector: function(t) {
            return "#playerWrap embed, #player";
        },
        stylePage: function() {
            $("#player_vipTips").remove();
        },
        nextSht: function() {
            var t = this.getCurItem().next();
            t.attr("data-vid") && t.click();
        },
        getClickedVid: function(t) {},
        fixListClick: function() {},
        getCurItem: function() {
            return $("[data-vid].on");
        },
        getShtList: function() {},
        getItemByVid: function(t) {
            return $("[data-vid='" + t + "']");
        },
        setVideoTitle: function() {
            $(".crumbs").next().text(this.getCurItem().find("a").attr("title"));
        },
        getVideoTitle: function() {
            var t = $(".crumbs").next().text();
            return {
                alltitle: t,
                title: t.replace(/\s/g, "").replace(/第\d+集/, "")
            };
        },
        changeView: function(t) {},
        changeShtByUrl: function(t) {},
        changeShtByVid: function(t) {
            appcontent.changeShtByVid(t, "sohu", function() {
                e.getCurItem().removeClass("on"), e.getItemByVid(t).addClass("on"), e.setVideoTitle();
            });
        }
    }, n = [ {}, {}, {}, {
        checkType: function() {
            return location.href.match(/.*\.sohu\.com\/.+\/.*\.(?:html|shtml)/);
        }
    } ];
    for (var i of n) for (var r in e) i[r] || (i[r] = e[r]);
    return n;
}