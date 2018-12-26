function getSites(t) {
    var e = {
        curClassName: "active",
        checkIsPay: function() {
            return !1;
        },
        checkType: function() {
            return !0;
        },
        checkIsVip: function() {
            return $("#videoBtnWenan").length ? -1 !== $("#videoBtnWenan").text().indexOf("会员免费观看") ? 1 : 0 : $(".buy-vod").length > 0 ? 1 : $(".ktvip").length > 0 ? 1 : -1;
        },
        getSitePlayerSelector: function(t) {
            return "#pptv_playpage_box object, #player_box object";
        },
        stylePage: function() {},
        nextSht: function() {
            var t = this.getCurItem().next().attr("href");
            t && (window.location.href = t);
        },
        getClickedVid: function(t) {},
        fixListClick: function() {},
        getCurItem: function() {
            return $("[data-id].now");
        },
        getShtList: function() {},
        getItemByVid: function(t) {},
        setVideoTitle: function() {},
        getVideoTitle: function() {
            var t = $(".tv-name,#video_name").text();
            return {
                alltitle: t,
                title: t.replace(/\(第\d+集\)/, "")
            };
        },
        changeView: function(t) {},
        changeShtByUrl: function(t) {
            appcontent.changeShtByUrl(t, function() {
                var t = e.getCurItem().next();
                e.getCurItem().removeClass("now"), t.addClass("now");
            });
        },
        changeShtByVid: function(t) {}
    }, n = [ {}, {}, {}, {
        checkType: function() {
            return location.href.match(/http:\/\/.*\.pptv\.com\/.*html/);
        }
    } ];
    for (var i of n) for (var c in e) i[c] || (i[c] = e[c]);
    return n;
}