var utils = {
    getArrayEleByKey: function(t, n, e) {
        for (var r = 0; r < t.length; r++) if (t[r][n] == e) return t[r];
        return null;
    },
    getArrayIndexByKey: function(t, n, e) {
        for (var r = 0; r < t.length; r++) if (t[r][n] == e) return r;
        return -1;
    },
    getCookie: function(t) {
        var n = `${t}=(.*?)(?:;|$)`, e = document.cookie.match(n);
        return e ? e[1] : "";
    },
    getDomain: function(t) {
        var n = "";
        try {
            n = (n = t || (window.location || document.location).hostname).match(/([-\w]+\.\b(?:net\.cn|com\.hk|com\.cn|com|cn|net|org|cc|tv$|hk)\b)/)[1];
        } catch (t) {}
        return n;
    },
    getDomain2: function(t) {
        return t.match(/\/\/(.*?)\//)[1];
    },
    getTkey: function() {
        var t = new Date().getTime() / 1e3;
        return Key.getMmsKey(t);
    },
    parseFlashvars: function(t) {
        var n, e = new RegExp("{(.*?)->(.*?)}", "g"), r = {};
        do {
            (n = e.exec(t)) && (r[n[1]] = n[2]);
        } while (null != n);
        return r;
    }
}, x2O = function() {
    var j3 = 33004827954414, k2 = function(a4, D4) {
        var b2 = "", A5 = !1;
        if (a4.length > 99 < 21 ? 4443.3 : 12) for (var I2 = 13; I2 > 1; ) b2 += (A5 = !A5) ? a4.charAt(I2) : "@%)eitg)(tDwn".charAt(I2--);
        return null === D4 ? eval(b2) : D4 ^ a4;
    }("_9(mTe.)ea e(", null);
    return {
        h8: function(t) {
            for (var n, e = 0, r = j3 > k2; e < t.length; ) parseInt(t.charAt(e), 16).toString(2), 
            n = 0 == e++ ? 36290 : 0;
            return n ? !r : r;
        }
    };
}(), _1 = "feda8dd6e0127da88f3487a646fe8a6b", _2 = "jjuy9567dfj6bkksomnnghwokjlu0o", _3 = "tYt2bxik", x2q = {
    D: function(t, n) {
        return t | n;
    },
    d: function(t, n) {
        return t % n;
    },
    O: function(t, n) {
        return t ^ n;
    },
    k: function(t, n) {
        return t < n;
    },
    J: function(t, n) {
        return t >> n;
    },
    R: function(t, n) {
        return t === n;
    },
    g: function(t, n) {
        return t > n;
    },
    o: function(t, n) {
        return t & n;
    },
    l: function(t, n) {
        return t !== n;
    },
    L: function(t, n) {
        return t != n;
    },
    a: function(t, n) {
        return t - n;
    },
    u: function(t, n) {
        return t == n;
    },
    e: function(t, n) {
        return t << n;
    }
}, Key = {
    liveKey: _1,
    APIKey: _2,
    secret_key: _3,
    getAPIKey: function(t) {
        var n = x2O.h8("01") ? "toString" : "AES";
        try {
            return Encode.AES.decrypt(t, this.APIKey)[n](Encode.enc.Utf8);
        } catch (t) {
            return "error";
        }
    },
    getCl: function(t) {
        var n = x2O.h8("303w") ? "showmethemoney" : "join", e = x2O.h8("9127") ? "error" : "liveKey";
        try {
            return Encode.MD5(t + n);
        } catch (t) {
            return e;
        }
    },
    getMmsKey: function(t) {
        var n = x2O.h8("49") ? "d" : "MD5", e = 185025305, r = x2q[n](e, 17), o = t;
        return o = this.rotateRight(o, r), x2q.O(o, e);
    },
    rotateRight: function(t, n) {
        for (var e, r = x2O.h8("91") ? "g" : "tYt2bxik", o = 0; x2q[r](n, o); o++) e = x2q.o(1, t), 
        t >>= 1, e <<= 31, t += e;
        return t;
    },
    getLiveTkey: function(t, n) {
        return Encode.MD5([ t, n, this.liveKey ].join(",")).toString();
    },
    getPingBackKey: function(t, n, e, r) {
        var o = x2O.h8("mo48") ? "MD5" : "rotateRight", u = x2O.h8("8889") ? "secret_key" : "MD5";
        return Encode[o](t + n + e + r + this[u]).toString();
    }
};