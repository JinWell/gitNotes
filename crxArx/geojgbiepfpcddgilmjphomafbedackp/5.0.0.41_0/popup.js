var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t;
};

chrome.runtime.getBackgroundPage(function(t) {
    function e(t) {
        var e = new Date(+t.time), o = "";
        return "<li style='padding: 0 4%;width: 32%;'><a target='_blank' href='" + (o = t.num ? t.href + (-1 == t.href.indexOf("?") ? "?" : "&") + "kdynum=" + t.num : t.href) + "'>" + t.alltitle + "</a></li><li style='width: 20%;'>" + (e.getMonth() + 1) + "月" + e.getDate() + "日</li><li><a target='_blank' href='" + o + "'>点击观看</a></li>";
    }
    var o = t.appBg, n = o.getConfig();
    !function(t) {
        !0 === t.closeExt && ($("#myonoffswitch-closeExt")[0].checked = !1), $(".pattern-wrp .radio[pattern='" + (t.pattern || "traditon") + "']").addClass("selected"), 
        $(".pattern-tradition").hasClass("selected") && $(".pattern-txt1").show();
    }(n), $(".pattern-wrp .radio").click(function() {
        $(this).hasClass("selected") || ($(".pattern-wrp .radio").removeClass("selected"), 
        $(this).addClass("selected"), n.pattern = $(this).attr("pattern"), o.updateConfig(n), 
        $(this).hasClass("pattern-modern") ? ($(".pattern-txt1").hide(), chrome.tabs.query({
            active: !0
        }, function(t) {
            chrome.tabs.reload(t[0].id);
        })) : $(".pattern-txt1").show());
    }), $("#myonoffswitch-closeExt").click(function() {
        var t;
        $(this)[0].checked ? (o.openExt(), t = !1) : (o.pauseExt(), t = !0), chrome.runtime.sendMessage({
            topic: "client",
            action: "setUC",
            param: '{"closeVIP":' + t + "}"
        });
    }), chrome.storage.local.get("vipkdyRecords", function(t) {
        var o = t.vipkdyRecords ? t.vipkdyRecords : [];
        if (o.length) {
            for (var n = "", a = o.length - 1; a >= 0; a--) n += e(o[a]);
            $(".history-list .tbody ul").empty().append(n);
        }
    }), $(".btn-config").click(function() {
        $(".tab2").hide(), $(".tab1").show();
    }), $(".btn-history").click(function() {
        $(".tab1").hide(), $(".tab2").show();
    }), $(".btn-delete").click(function() {
        chrome.storage.local.set({
            vipkdyRecords: []
        }), $(".history-list .tbody ul").empty().append('<li style="width:100%">暂时没有播放记录哦</li>');
    });
});