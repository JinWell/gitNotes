function getSites(t) {
    function e() {
        for (var t = $("script").not("[src]"), e = 0; e < t.length; e++) if (t[e].innerText.match(/var pageConfig = [\s\S]*paid:/)) return !0;
        return !1;
    }
    var n, a, r, i, c, o, s = [], u = [], d = [];
    !function() {
        for (var t = $("script"), e = 0; e < t.length; e++) if (regRst = t[e].innerText.match(/[\s\S]*,paid: (\d+)[\s\S]*,paidTime: (\d+)[\s\S]*,paidType: (\d+)[\s\S]*,index: (\d+)/), 
        regRst) {
            n = parseInt(regRst[1]), a = parseInt(regRst[2]), r = parseInt(regRst[3]), i = parseInt(regRst[4]) + 1;
            break;
        }
    }(), function() {
        for (var t = $("script"), e = 0; e < t.length; e++) if (regRst = t[e].innerText.match(/[\s\S]*,iid: (\d+)[\s\S]*,icode: '(.*?)'[\s\S]*,kw: '(.*?)'/), 
        regRst) {
            c = {
                url: location.href,
                iid: regRst[1],
                icode: regRst[2],
                kw: regRst[3],
                sht: i
            };
            break;
        }
    }();
    var p = {
        pre: function() {
            window.addEventListener("message", function(t) {
                var e = t.data.resp;
                if ("tudou-ajax-resp" == t.data.type) {
                    var n;
                    0 === e.responseURL.indexOf("http://www.tudou.com/crp/alist.action") ? ((n = e.responseText.match(/__findAll\((.*)\)$/)) && (n = JSON.parse(n[1]).items), 
                    s = s.concat(n)) : 0 === e.responseURL.indexOf("http://www.tudou.com/tvp/olist.action") && ((n = e.responseText.match(/__findAll\((.*)\)$/)) && (n = JSON.parse(n[1]).items), 
                    u = u.concat(n));
                } else if ("tudou-jsonp-tdrec" == t.data.type) {
                    var a = t.data.tdrec.recommendItems;
                    a && a.forEach(function(t) {
                        d.push({
                            icode: t.code,
                            iid: t.itemId,
                            url: t.palyLink,
                            kw: t.title
                        });
                    });
                }
            });
            var t = document.createElement("script");
            t.innerText = '(function(){var origOpen = XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open = function() {this.addEventListener("load", function() {window.postMessage({type: "tudou-ajax-resp", resp: {responseURL: this.responseURL,responseText: this.responseText}}, "*");});origOpen.apply(this, arguments);};document.addEventListener("DOMNodeInserted", function(e){if(!e.target.src) return;var regRst = e.target.src.match("http://tdrec.youku.com/tjpt/tdrec.*callback=(.*?)(?:&|$)");if(regRst){var bakfun = window[regRst[1]];window[regRst[1]] = function(a){window.postMessage({type: "tudou-jsonp-tdrec", tdrec: a}, "*");bakfun(a);}}});})();', 
            document.querySelector("html").appendChild(t);
        },
        curClassName: "active",
        getCurrentInfo: function() {
            return c;
        },
        checkIsPay: function() {
            return -1 !== $(".pay_action").text().indexOf("用券免费看");
        },
        checkIsVip: function(t) {
            if (!t && 1 === n) return 1;
            t = t || c.icode;
            var e = utils.getArrayIndexByKey(s, "icode", t) + 1;
            return 2 == r ? e > a ? 1 : 0 : 1 == r ? 1 : 0;
        },
        checkType: function() {
            return !0;
        },
        getSitePlayerSelector: function(t) {
            return "#tudouHomePlayer";
        },
        stylePage: function() {
            $(".action_buttons").hide();
        },
        nextSht: function() {
            var t = this.getCurItem().next().attr("href");
            t && (window.location.href = t);
        },
        getClickedVid: function(t) {
            return $(event.target).closest("[data-id]").attr("data-id");
        },
        fixListClick: function() {
            document.body.addEventListener("click", function(e) {
                var n = $(e.target).closest("[data-pjax]"), a = n.attr("data-pjax");
                n.attr("data-id");
                if (a) {
                    var r = (a.match(/.*\/(.*)\.html/) || a.match(/.*\/(.+)\//))[1];
                    utils.getArrayEleByKey(s.concat(u).concat(d), "icode", r) && (o = c, (c = utils.getArrayEleByKey(s.concat(u).concat(d), "icode", r)).url = a, 
                    1 === p.checkIsVip(c.icode) || "modern" == t.unblockvipConfig.pattern ? (p.changeShtByUrl(a), 
                    event.stopPropagation(), event.preventDefault()) : 1 === p.checkIsVip(o.icode) ? location.href = a : p.saveRecord(a));
                }
            }, !0);
        },
        getCurItem: function() {
            return $(".tab_panel_item .active, .item.active");
        },
        getShtList: function() {},
        getItemByVid: function(t) {
            return $(`[data-id=${t}]`);
        },
        setVideoTitle: function() {
            $("#videoKw").attr("title", c.kw).text(c.kw);
        },
        saveRecord: function(t) {
            var e = this.getVideoTitle();
            e.href = t || location.href, e.time = new Date().getTime(), e.eposideFlg = c.kw.replace(/第\d+集/, ""), 
            appcontent.saveRecord(e);
        },
        getVideoTitle: function() {
            return {
                alltitle: c.kw
            };
        },
        changeView: function(t) {},
        changeShtByUrl: function(t) {
            appcontent.changeShtByUrl(t, function() {
                $(`.${p.curClassName}[data-pjax]`).removeClass(p.curClassName), $(`[data-pjax="${t}"]`).addClass(p.curClassName), 
                p.setVideoTitle(), p.saveRecord(t);
            });
        },
        changeShtByVid: function(t) {}
    }, l = [ {
        curClassName: "active",
        checkType: function() {
            return "电视剧" == $('meta[name="irCategory"]').attr("content") && !!$('meta[name="irTitle"]').attr("content").match(/\d+集$/);
        }
    }, {
        curClassName: "current",
        checkType: function() {
            return "电视剧" == $('meta[name="irCategory"]').attr("content") && !$('meta[name="irTitle"]').attr("content").match(/\d+集$/);
        }
    }, {
        curClassName: "active",
        checkType: function() {
            return "电影" == $('meta[name="irCategory"]').attr("content") && !$('meta[name="irTitle"]').attr("content").match(/《.*》/);
        }
    }, {
        curClassName: "active",
        checkType: function() {
            return "电影" == $('meta[name="irCategory"]').attr("content") && !!$('meta[name="irTitle"]').attr("content").match(/《.*》/);
        }
    }, {
        curClassName: "active",
        checkType: function() {
            return "动漫" == $('meta[name="irCategory"]').attr("content") && $("html").hasClass("album") && e();
        }
    }, {
        curClassName: "current",
        checkType: function() {
            return "动漫" == $('meta[name="irCategory"]').attr("content") && $("html").hasClass("album") && !e();
        }
    }, {
        checkType: function() {
            return $('meta[name="irTitle"]').length > 0;
        }
    } ];
    for (var m of l) for (var f in p) m[f] || (m[f] = p[f]);
    return l;
}