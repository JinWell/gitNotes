function getSites(t) {
    var e = {
        curClassName: "active",
        checkIsPay: function() {
            return !1;
        },
        checkIsVip: function() {
            if ($(".c-player-paytips-button").length) {
                var t = $(".c-player-paytips-button").text();
                return this.getCurItem().length ? this.getCurItem().find(".v-mark-player-vip2").length ? 1 : 0 : -1 !== t.indexOf("开通会员") ? 1 : 0;
            }
            return -1;
        },
        checkType: function() {
            return !0;
        },
        getSitePlayerSelector: function(t) {
            return "#hunantv-player-1";
        },
        stylePage: function() {},
        nextSht: function() {
            var t = this.getCurItem().next();
            t.attr("page-video") && t.click();
        },
        getClickedVid: function(t) {},
        fixListClick: function() {},
        getCurItem: function() {
            return $("li[page-video].on");
        },
        getShtList: function() {},
        getItemByVid: function(t) {
            return $("li[page-video='" + t + "']");
        },
        setVideoTitle: function() {
            var t = $(".v-panel-title").text().replace(/(?:第)(\d)*(?:集)/, function(t, e) {
                return "第" + (+e + 1) + "集";
            });
            $(".v-panel-title").text(t);
        },
        getVideoTitle: function() {
            return $(".v-panel-title").length ? {
                alltitle: $(".v-panel-title").text(),
                title: $(".v-panel-title").text().replace(/第\d+集/, "")
            } : {};
        },
        changeView: function(t) {},
        changeShtByUrl: function(t) {},
        changeShtByVid: function(t) {
            var e = this;
            appcontent.changeShtByVid(t, "mgtv", function() {
                e.getCurItem().removeClass("on"), e.getItemByVid(t).addClass("on"), e.setVideoTitle();
            });
        }
    }, n = [ {}, {}, {}, {
        checkType: function() {
            return location.href.match(/http:\/\/www\.mgtv\.com\/.*\.html/);
        }
    } ];
    for (var i of n) for (var r in e) i[r] || (i[r] = e[r]);
    return n;
}