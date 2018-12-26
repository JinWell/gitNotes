!function e(r, t, a) {
    function n(s, c) {
        if (!t[s]) {
            if (!r[s]) {
                var i = "function" == typeof require && require;
                if (!c && i) return i(s, !0);
                if (o) return o(s, !0);
                var u = new Error("Cannot find module '" + s + "'");
                throw u.code = "MODULE_NOT_FOUND", u;
            }
            var l = t[s] = {
                exports: {}
            };
            r[s][0].call(l.exports, function(e) {
                var t = r[s][1][e];
                return n(t || e);
            }, l, l.exports, e, r, t, a);
        }
        return t[s].exports;
    }
    for (var o = "function" == typeof require && require, s = 0; s < a.length; s++) n(a[s]);
    return n;
}({
    1: [ function(e, r, t) {
        r.exports = function() {
            if (chrome.runtime.lastError) return !0;
        };
    }, {} ],
    2: [ function(e, r, t) {
        function a(e) {
            var r = new Array(), t = e.length, a = parseInt(t / 4), n = t % 4, s = 0;
            for (s = 0; s < a; s++) r[s] = o(e.substring(4 * s + 0, 4 * s + 4));
            return n > 0 && (r[s] = o(e.substring(4 * s + 0, t))), r;
        }
        function o(e) {
            var r = e.length, t = new Array(64);
            if (r < 4) {
                var a = 0, n = 0, o = 0, s = 0;
                for (a = 0; a < r; a++) {
                    u = e.charCodeAt(a);
                    for (n = 0; n < 16; n++) {
                        var c = 1, i = 0;
                        for (i = 15; i > n; i--) c *= 2;
                        t[16 * a + n] = parseInt(u / c) % 2;
                    }
                }
                for (o = r; o < 4; o++) {
                    u = 0;
                    for (s = 0; s < 16; s++) {
                        var c = 1, i = 0;
                        for (i = 15; i > s; i--) c *= 2;
                        t[16 * o + s] = parseInt(u / c) % 2;
                    }
                }
            } else for (a = 0; a < 4; a++) {
                var u = e.charCodeAt(a);
                for (n = 0; n < 16; n++) {
                    c = 1;
                    for (i = 15; i > n; i--) c *= 2;
                    t[16 * a + n] = parseInt(u / c) % 2;
                }
            }
            return t;
        }
        function s(e) {
            var r;
            switch (e) {
              case "0000":
                r = "0";
                break;

              case "0001":
                r = "1";
                break;

              case "0010":
                r = "2";
                break;

              case "0011":
                r = "3";
                break;

              case "0100":
                r = "4";
                break;

              case "0101":
                r = "5";
                break;

              case "0110":
                r = "6";
                break;

              case "0111":
                r = "7";
                break;

              case "1000":
                r = "8";
                break;

              case "1001":
                r = "9";
                break;

              case "1010":
                r = "A";
                break;

              case "1011":
                r = "B";
                break;

              case "1100":
                r = "C";
                break;

              case "1101":
                r = "D";
                break;

              case "1110":
                r = "E";
                break;

              case "1111":
                r = "F";
            }
            return r;
        }
        function c(e) {
            var r;
            switch (e) {
              case "0":
                r = "0000";
                break;

              case "1":
                r = "0001";
                break;

              case "2":
                r = "0010";
                break;

              case "3":
                r = "0011";
                break;

              case "4":
                r = "0100";
                break;

              case "5":
                r = "0101";
                break;

              case "6":
                r = "0110";
                break;

              case "7":
                r = "0111";
                break;

              case "8":
                r = "1000";
                break;

              case "9":
                r = "1001";
                break;

              case "A":
                r = "1010";
                break;

              case "B":
                r = "1011";
                break;

              case "C":
                r = "1100";
                break;

              case "D":
                r = "1101";
                break;

              case "E":
                r = "1110";
                break;

              case "F":
                r = "1111";
            }
            return r;
        }
        function u(e) {
            var r = "";
            for (i = 0; i < 4; i++) {
                var t = 0;
                for (j = 0; j < 16; j++) {
                    var a = 1;
                    for (m = 15; m > j; m--) a *= 2;
                    t += e[16 * i + j] * a;
                }
                0 != t && (r += String.fromCharCode(t));
            }
            return r;
        }
        function l(e) {
            var r = "";
            for (i = 0; i < 16; i++) {
                var t = "";
                for (j = 0; j < 4; j++) t += e[4 * i + j];
                r += s(t);
            }
            return r;
        }
        function f(e) {
            var r = "";
            for (i = 0; i < 16; i++) r += c(e.substring(i, i + 1));
            return r;
        }
        function p(e, r) {
            var t = A(r), a = v(e), n = new Array(32), o = new Array(32), s = new Array(32), c = 0, i = 0, u = 0, l = 0, f = 0;
            for (u = 0; u < 32; u++) n[u] = a[u], o[u] = a[32 + u];
            for (c = 0; c < 16; c++) {
                for (i = 0; i < 32; i++) s[i] = n[i], n[i] = o[i];
                var p = new Array(48);
                for (l = 0; l < 48; l++) p[l] = t[c][l];
                var m = h(y(b(h(g(o), p))), s);
                for (f = 0; f < 32; f++) o[f] = m[f];
            }
            var d = new Array(64);
            for (c = 0; c < 32; c++) d[c] = o[c], d[32 + c] = n[c];
            return w(d);
        }
        function d(e, r) {
            var t = A(r), a = v(e), n = new Array(32), o = new Array(32), s = new Array(32), c = 0, i = 0, u = 0, l = 0, f = 0;
            for (u = 0; u < 32; u++) n[u] = a[u], o[u] = a[32 + u];
            for (c = 15; c >= 0; c--) {
                for (i = 0; i < 32; i++) s[i] = n[i], n[i] = o[i];
                var p = new Array(48);
                for (l = 0; l < 48; l++) p[l] = t[c][l];
                var m = h(y(b(h(g(o), p))), s);
                for (f = 0; f < 32; f++) o[f] = m[f];
            }
            var d = new Array(64);
            for (c = 0; c < 32; c++) d[c] = o[c], d[32 + c] = n[c];
            return w(d);
        }
        function v(e) {
            var r = new Array(64);
            for (i = 0, m = 1, n = 0; i < 4; i++, m += 2, n += 2) for (j = 7, k = 0; j >= 0; j--, 
            k++) r[8 * i + k] = e[8 * j + m], r[8 * i + k + 32] = e[8 * j + n];
            return r;
        }
        function g(e) {
            var r = new Array(48);
            for (i = 0; i < 8; i++) 0 == i ? r[6 * i + 0] = e[31] : r[6 * i + 0] = e[4 * i - 1], 
            r[6 * i + 1] = e[4 * i + 0], r[6 * i + 2] = e[4 * i + 1], r[6 * i + 3] = e[4 * i + 2], 
            r[6 * i + 4] = e[4 * i + 3], 7 == i ? r[6 * i + 5] = e[0] : r[6 * i + 5] = e[4 * i + 4];
            return r;
        }
        function h(e, r) {
            var t = new Array(e.length);
            for (i = 0; i < e.length; i++) t[i] = e[i] ^ r[i];
            return t;
        }
        function b(e) {
            var r = new Array(32), t = "", a = [ [ 14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7 ], [ 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8 ], [ 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0 ], [ 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 ] ], n = [ [ 15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10 ], [ 3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5 ], [ 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15 ], [ 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9 ] ], o = [ [ 10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8 ], [ 13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1 ], [ 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7 ], [ 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12 ] ], s = [ [ 7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15 ], [ 13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9 ], [ 10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4 ], [ 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14 ] ], c = [ [ 2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9 ], [ 14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6 ], [ 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14 ], [ 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3 ] ], i = [ [ 12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11 ], [ 10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8 ], [ 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6 ], [ 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13 ] ], u = [ [ 4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1 ], [ 13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6 ], [ 1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2 ], [ 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12 ] ], l = [ [ 13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7 ], [ 1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2 ], [ 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8 ], [ 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11 ] ];
            for (m = 0; m < 8; m++) {
                var f = 0, p = 0;
                switch (f = 2 * e[6 * m + 0] + e[6 * m + 5], p = 2 * e[6 * m + 1] * 2 * 2 + 2 * e[6 * m + 2] * 2 + 2 * e[6 * m + 3] + e[6 * m + 4], 
                m) {
                  case 0:
                    t = x(a[f][p]);
                    break;

                  case 1:
                    t = x(n[f][p]);
                    break;

                  case 2:
                    t = x(o[f][p]);
                    break;

                  case 3:
                    t = x(s[f][p]);
                    break;

                  case 4:
                    t = x(c[f][p]);
                    break;

                  case 5:
                    t = x(i[f][p]);
                    break;

                  case 6:
                    t = x(u[f][p]);
                    break;

                  case 7:
                    t = x(l[f][p]);
                }
                r[4 * m + 0] = parseInt(t.substring(0, 1)), r[4 * m + 1] = parseInt(t.substring(1, 2)), 
                r[4 * m + 2] = parseInt(t.substring(2, 3)), r[4 * m + 3] = parseInt(t.substring(3, 4));
            }
            return r;
        }
        function y(e) {
            var r = new Array(32);
            return r[0] = e[15], r[1] = e[6], r[2] = e[19], r[3] = e[20], r[4] = e[28], r[5] = e[11], 
            r[6] = e[27], r[7] = e[16], r[8] = e[0], r[9] = e[14], r[10] = e[22], r[11] = e[25], 
            r[12] = e[4], r[13] = e[17], r[14] = e[30], r[15] = e[9], r[16] = e[1], r[17] = e[7], 
            r[18] = e[23], r[19] = e[13], r[20] = e[31], r[21] = e[26], r[22] = e[2], r[23] = e[8], 
            r[24] = e[18], r[25] = e[12], r[26] = e[29], r[27] = e[5], r[28] = e[21], r[29] = e[10], 
            r[30] = e[3], r[31] = e[24], r;
        }
        function w(e) {
            var r = new Array(64);
            return r[0] = e[39], r[1] = e[7], r[2] = e[47], r[3] = e[15], r[4] = e[55], r[5] = e[23], 
            r[6] = e[63], r[7] = e[31], r[8] = e[38], r[9] = e[6], r[10] = e[46], r[11] = e[14], 
            r[12] = e[54], r[13] = e[22], r[14] = e[62], r[15] = e[30], r[16] = e[37], r[17] = e[5], 
            r[18] = e[45], r[19] = e[13], r[20] = e[53], r[21] = e[21], r[22] = e[61], r[23] = e[29], 
            r[24] = e[36], r[25] = e[4], r[26] = e[44], r[27] = e[12], r[28] = e[52], r[29] = e[20], 
            r[30] = e[60], r[31] = e[28], r[32] = e[35], r[33] = e[3], r[34] = e[43], r[35] = e[11], 
            r[36] = e[51], r[37] = e[19], r[38] = e[59], r[39] = e[27], r[40] = e[34], r[41] = e[2], 
            r[42] = e[42], r[43] = e[10], r[44] = e[50], r[45] = e[18], r[46] = e[58], r[47] = e[26], 
            r[48] = e[33], r[49] = e[1], r[50] = e[41], r[51] = e[9], r[52] = e[49], r[53] = e[17], 
            r[54] = e[57], r[55] = e[25], r[56] = e[32], r[57] = e[0], r[58] = e[40], r[59] = e[8], 
            r[60] = e[48], r[61] = e[16], r[62] = e[56], r[63] = e[24], r;
        }
        function x(e) {
            var r = "";
            switch (e) {
              case 0:
                r = "0000";
                break;

              case 1:
                r = "0001";
                break;

              case 2:
                r = "0010";
                break;

              case 3:
                r = "0011";
                break;

              case 4:
                r = "0100";
                break;

              case 5:
                r = "0101";
                break;

              case 6:
                r = "0110";
                break;

              case 7:
                r = "0111";
                break;

              case 8:
                r = "1000";
                break;

              case 9:
                r = "1001";
                break;

              case 10:
                r = "1010";
                break;

              case 11:
                r = "1011";
                break;

              case 12:
                r = "1100";
                break;

              case 13:
                r = "1101";
                break;

              case 14:
                r = "1110";
                break;

              case 15:
                r = "1111";
            }
            return r;
        }
        function A(e) {
            var r = new Array(56), t = new Array();
            t[0] = new Array(), t[1] = new Array(), t[2] = new Array(), t[3] = new Array(), 
            t[4] = new Array(), t[5] = new Array(), t[6] = new Array(), t[7] = new Array(), 
            t[8] = new Array(), t[9] = new Array(), t[10] = new Array(), t[11] = new Array(), 
            t[12] = new Array(), t[13] = new Array(), t[14] = new Array(), t[15] = new Array();
            var a = [ 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1 ];
            for (n = 0; n < 7; n++) for (j = 0, k = 7; j < 8; j++, k--) r[8 * n + j] = e[8 * k + n];
            var n = 0;
            for (n = 0; n < 16; n++) {
                var o = 0, s = 0;
                for (j = 0; j < a[n]; j++) {
                    for (o = r[0], s = r[28], k = 0; k < 27; k++) r[k] = r[k + 1], r[28 + k] = r[29 + k];
                    r[27] = o, r[55] = s;
                }
                var c = new Array(48);
                switch (c[0] = r[13], c[1] = r[16], c[2] = r[10], c[3] = r[23], c[4] = r[0], c[5] = r[4], 
                c[6] = r[2], c[7] = r[27], c[8] = r[14], c[9] = r[5], c[10] = r[20], c[11] = r[9], 
                c[12] = r[22], c[13] = r[18], c[14] = r[11], c[15] = r[3], c[16] = r[25], c[17] = r[7], 
                c[18] = r[15], c[19] = r[6], c[20] = r[26], c[21] = r[19], c[22] = r[12], c[23] = r[1], 
                c[24] = r[40], c[25] = r[51], c[26] = r[30], c[27] = r[36], c[28] = r[46], c[29] = r[54], 
                c[30] = r[29], c[31] = r[39], c[32] = r[50], c[33] = r[44], c[34] = r[32], c[35] = r[47], 
                c[36] = r[43], c[37] = r[48], c[38] = r[38], c[39] = r[55], c[40] = r[33], c[41] = r[52], 
                c[42] = r[45], c[43] = r[41], c[44] = r[49], c[45] = r[35], c[46] = r[28], c[47] = r[31], 
                n) {
                  case 0:
                    for (m = 0; m < 48; m++) t[0][m] = c[m];
                    break;

                  case 1:
                    for (m = 0; m < 48; m++) t[1][m] = c[m];
                    break;

                  case 2:
                    for (m = 0; m < 48; m++) t[2][m] = c[m];
                    break;

                  case 3:
                    for (m = 0; m < 48; m++) t[3][m] = c[m];
                    break;

                  case 4:
                    for (m = 0; m < 48; m++) t[4][m] = c[m];
                    break;

                  case 5:
                    for (m = 0; m < 48; m++) t[5][m] = c[m];
                    break;

                  case 6:
                    for (m = 0; m < 48; m++) t[6][m] = c[m];
                    break;

                  case 7:
                    for (m = 0; m < 48; m++) t[7][m] = c[m];
                    break;

                  case 8:
                    for (m = 0; m < 48; m++) t[8][m] = c[m];
                    break;

                  case 9:
                    for (m = 0; m < 48; m++) t[9][m] = c[m];
                    break;

                  case 10:
                    for (m = 0; m < 48; m++) t[10][m] = c[m];
                    break;

                  case 11:
                    for (m = 0; m < 48; m++) t[11][m] = c[m];
                    break;

                  case 12:
                    for (m = 0; m < 48; m++) t[12][m] = c[m];
                    break;

                  case 13:
                    for (m = 0; m < 48; m++) t[13][m] = c[m];
                    break;

                  case 14:
                    for (m = 0; m < 48; m++) t[14][m] = c[m];
                    break;

                  case 15:
                    for (m = 0; m < 48; m++) t[15][m] = c[m];
                }
            }
            return t;
        }
        r.exports = {
            e: function(e, r, t, n) {
                var s, c, i, u, f, m, d = e.length, v = "";
                if (null != r && "" != r && (u = (s = a(r)).length), null != t && "" != t && (f = (c = a(t)).length), 
                null != n && "" != n && (m = (i = a(n)).length), d > 0) if (d < 4) {
                    var g = o(e);
                    if (null != r && "" != r && null != t && "" != t && null != n && "" != n) {
                        for (q = g, I = 0; I < u; I++) q = p(q, s[I]);
                        for (A = 0; A < f; A++) q = p(q, c[A]);
                        for (x = 0; x < m; x++) q = p(q, i[x]);
                        k = q;
                    } else if (null != r && "" != r && null != t && "" != t) {
                        for (q = g, I = 0; I < u; I++) q = p(q, s[I]);
                        for (A = 0; A < f; A++) q = p(q, c[A]);
                        k = q;
                    } else if (null != r && "" != r) {
                        for (I = 0, q = g, I = 0; I < u; I++) q = p(q, s[I]);
                        k = q;
                    }
                    v = l(k);
                } else {
                    var h = parseInt(d / 4), b = d % 4, y = 0;
                    for (y = 0; y < h; y++) {
                        if (w = o(e.substring(4 * y + 0, 4 * y + 4)), null != r && "" != r && null != t && "" != t && null != n && "" != n) {
                            for (q = w, I = 0; I < u; I++) q = p(q, s[I]);
                            for (A = 0; A < f; A++) q = p(q, c[A]);
                            for (x = 0; x < m; x++) q = p(q, i[x]);
                            k = q;
                        } else if (null != r && "" != r && null != t && "" != t) {
                            for (q = w, I = 0; I < u; I++) q = p(q, s[I]);
                            for (A = 0; A < f; A++) q = p(q, c[A]);
                            k = q;
                        } else if (null != r && "" != r) {
                            for (q = w, I = 0; I < u; I++) q = p(q, s[I]);
                            k = q;
                        }
                        v += l(k);
                    }
                    if (b > 0) {
                        var k, w = o(e.substring(4 * h + 0, d));
                        if (null != r && "" != r && null != t && "" != t && null != n && "" != n) {
                            var x;
                            for (q = w, I = 0; I < u; I++) q = p(q, s[I]);
                            for (A = 0; A < f; A++) q = p(q, c[A]);
                            for (x = 0; x < m; x++) q = p(q, i[x]);
                            k = q;
                        } else if (null != r && "" != r && null != t && "" != t) {
                            var A;
                            for (q = w, I = 0; I < u; I++) q = p(q, s[I]);
                            for (A = 0; A < f; A++) q = p(q, c[A]);
                            k = q;
                        } else if (null != r && "" != r) {
                            var q, I;
                            for (q = w, I = 0; I < u; I++) q = p(q, s[I]);
                            k = q;
                        }
                        v += l(k);
                    }
                }
                return v;
            },
            d: function(e, r, t, n) {
                var o, s, c, i, l, p, m = e.length, v = "";
                null != r && "" != r && (i = (o = a(r)).length), null != t && "" != t && (l = (s = a(t)).length), 
                null != n && "" != n && (p = (c = a(n)).length);
                var g = parseInt(m / 16), h = 0;
                for (h = 0; h < g; h++) {
                    var b = f(e.substring(16 * h + 0, 16 * h + 16)), y = new Array(64), k = 0;
                    for (k = 0; k < 64; k++) y[k] = parseInt(b.substring(k, k + 1));
                    var w;
                    if (null != r && "" != r && null != t && "" != t && null != n && "" != n) {
                        for (x = y, A = p - 1; A >= 0; A--) x = d(x, c[A]);
                        for (q = l - 1; q >= 0; q--) x = d(x, s[q]);
                        for (I = i - 1; I >= 0; I--) x = d(x, o[I]);
                        w = x;
                    } else if (null != r && "" != r && null != t && "" != t) {
                        for (x = y, A = l - 1; A >= 0; A--) x = d(x, s[A]);
                        for (q = i - 1; q >= 0; q--) x = d(x, o[q]);
                        w = x;
                    } else if (null != r && "" != r) {
                        var x, A, q, I;
                        for (x = y, A = i - 1; A >= 0; A--) x = d(x, o[A]);
                        w = x;
                    }
                    v += u(w);
                }
                return v;
            }
        };
    }, {} ],
    3: [ function(e, r, t) {
        var a = {};
        a.http_build_query = function(e, r, t) {
            var a, n, o = [], s = function(e, r, t) {
                var a, n = [];
                if (!0 === r ? r = "1" : !1 === r && (r = "0"), null !== r && "object" == typeof r) {
                    for (a in r) null !== r[a] && n.push(s(e + "[" + a + "]", r[a], t));
                    return n.join(t);
                }
                if ("function" != typeof r) return encodeURIComponent(e) + "=" + encodeURIComponent(r);
                throw new Error("There was an error processing for http_build_query().");
            };
            t || (t = "&");
            for (n in e) a = e[n], r && !isNaN(n) && (n = String(r) + n), o.push(s(n, a, t));
            return o.join(t);
        }, a.extend = function(e, r, t, a) {
            if (!e || !r) return e;
            void 0 === t && (t = !0);
            var n, o, s;
            if (a && (s = a.length)) for (n = 0; n < s; n++) !((o = a[n]) in r) || !t && o in e || (e[o] = r[o]); else for (o in r) !t && o in e || (e[o] = r[o]);
            return e;
        }, a.ajax = function(e) {
            if (0 !== location.protocol.indexOf("http") && 0 === e.url.indexOf("//") && (e.url = "http:" + e.url), 
            void 0 !== (e = a.extend(e || {}, {
                type: "GET"
            }, !1)).url) {
                var r = e.type.toUpperCase();
                e.data && "string" != typeof e.data && (e.data = a.http_build_query(e.data), "GET" == r ? (e.url += (e.url.match(/\?/) ? "&" : "?") + e.data, 
                e.data = null) : e.contentType = "application/x-www-form-urlencoded");
                var t = e.error || a.ajax.error_handler, n = new XMLHttpRequest();
                n.open(r, e.url, !0), n.onreadystatechange = function() {
                    if (4 == n.readyState) if (200 == n.status) if (e.dataType && "xml" == e.dataType) e.success(n.responseXML, n.status, n); else if (e.dataType && "text" == e.dataType) e.success(n.responseText, n.status, n); else {
                        var r;
                        try {
                            r = JSON.parse(n.responseText);
                        } catch (e) {
                            r = n.responseText;
                        }
                        e.success(r, n.status, n);
                    } else t && t(n, n.status);
                }, "text" == e.dataType && n.overrideMimeType && n.overrideMimeType("text/plain"), 
                n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.setRequestHeader("referrer", "http://www.vipkdy.com/"), 
                e.contentType && n.setRequestHeader("Content-Type", e.contentType);
                try {
                    n.send(e.data);
                } catch (e) {
                    t && t(n, null, e);
                }
                return n;
            }
        }, a.setConfig = function(e) {
            e._u ? (e.url = e._u, e.dataType = "text", a.ajax(e)) : chrome.storage.local.set(e);
        }, a.getDomain = function(e) {
            var r = "";
            try {
                r = e.match(/([-\w]+\.\b(?:net\.cn|com\.hk|com\.cn|com|cn|net|org|cc|tv$|hk)\b)/)[1];
            } catch (e) {}
            return r;
        }, a.getImpParams = function(e) {
            var r = {
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
            for (var t in r) r[t] || "number" == typeof r[t] || delete r[t];
            return r;
        }, r.exports = a;
    }, {} ],
    4: [ function(e, r, t) {
        (function(r) {
            function t(e) {
                if (o) {
                    var r = {
                        u: o.uid,
                        c: o.cl,
                        v: o.v1,
                        d: 2
                    }, t = $.extend({}, r, e);
                    new Image().src = "http://www.vipkdy.com/sp.gif?" + $.param(t);
                }
            }
            function a(e) {
                return {
                    parseVipB: 2,
                    parseVipBWap: 2,
                    parseVipB1: 2,
                    parseVipB2: 1
                }[e] || 3;
            }
            function n(e) {
                if (!e) return "";
                var r = {
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
                    a: e.ci
                };
                for (var t in r) r[t] || "number" == typeof r[t] || delete r[t];
                return r;
            }
            void 0 === r && (r = window);
            var o, s = {
                server: "https://www.vipkdy.com",
                vipLogined: {}
            };
            !function() {
                var e = 0, r = setInterval(function() {
                    chrome.storage.local.get("__config", function(t) {
                        t.__config && (o = t.__config, clearInterval(r)), ++e > 10 && clearInterval(r);
                    });
                }, 1e3);
            }();
            var c, i = {}, u = function() {
                function e(e) {
                    var r = [ "qq", "iqiyi", "youku", "tudou", "le", "mgtv", "sohu" ];
                    if (-1 != r.indexOf(e)) return e;
                    var t = `(${r.join("|")})\\.(?:com|cn)`, a = e.match(t);
                    return a ? a[1] : "";
                }
                var r = {
                    default: []
                };
                $.ajax({
                    url: `${common.assetsUrl}/vip-config-v8.json?_${+new Date()}`,
                    dataType: "json",
                    success: function(e) {
                        chrome.storage.local.set({
                            "vip-config": e
                        }), c = e;
                        var t = e.third.rules;
                        if (e.parsers) for (var a in e.parsers) r[a] = [].concat(e.parsers[a]);
                        var n = [], o = [], u = [], l = [], f = [], p = [], m = [], d = [];
                        for (var a in t) {
                            var v = t[a];
                            n.push(v.ckplayer), v.m3u8 && o.push(v.m3u8), v.keyRequest && (u = u.concat(v.keyRequest)), 
                            v.redirect && (p = p.concat(v.redirect)), v.randomRefUrls && (l = l.concat(v.randomRefUrls)), 
                            v.noRefUrls && (f = f.concat(v.noRefUrls)), v.mp4 && m.push(v.mp4), v.refUrls && d.push(v.refUrls);
                        }
                        chrome.runtime.onMessage.addListener(function(e, r, t) {
                            "get_mp4_cofig" == e.topic && t(m);
                        }), chrome.webRequest.onBeforeRequest.addListener(function(e) {
                            if (e.url.match(/m3u8.swf/)) {
                                if (!(e.url.match(/cdn.vipkdy.com/) || 0 != o.length && e.url.match(o.join("|")))) {
                                    var r = "http://cdn.vipkdy.com/ckplayer/m3u8.swf";
                                    return i[e.tabId] && (t[i[e.tabId]].m3u8 ? r = t[i[e.tabId]].m3u8 : 0 == t[i[e.tabId]].urlBase.indexOf("https") && (r = r.replace("http", "https"))), 
                                    {
                                        redirectUrl: r
                                    };
                                }
                            } else for (var a of p) if (e.url.match(a[0]) && !e.url.match(a[1])) return {
                                redirectUrl: a[1]
                            };
                        }, {
                            urls: [ "<all_urls>" ]
                        }, [ "blocking", "requestBody" ]), chrome.webRequest.onBeforeRequest.addListener(function(e) {
                            if (e.frameId > 0 || navigator.userAgent.match(/MetaSr/) && 0 != e.frameId) return {
                                redirectUrl: "https://cdn.vipkdy.com/swf/vipkdy.swf"
                            };
                        }, {
                            urls: n
                        }, [ "blocking", "requestBody" ]), chrome.webRequest.onBeforeSendHeaders.addListener(function(e) {
                            var r = utils.getArrayEleByKey(e.requestHeaders, "name", "Referer") || utils.getArrayEleByKey(e.requestHeaders, "name", "referer");
                            if (!r || -1 == r.value.indexOf(utils.getDomain2(e.url))) return e.requestHeaders.push({
                                name: "Referer",
                                value: t[utils.getDomain2(e.url)].ckplayer
                            }), {
                                requestHeaders: e.requestHeaders
                            };
                        }, {
                            urls: u
                        }, [ "blocking", "requestHeaders" ]);
                        var g = function() {
                            for (var e = parseInt(10 * Math.random()) + 1, r = parseInt(10 * Math.random()) + 1, t = [], a = []; e; ) t.push(String.fromCharCode(parseInt(97 + 25 * Math.random()))), 
                            e--;
                            for (;r; ) a.push(String.fromCharCode(parseInt(97 + 25 * Math.random()))), r--;
                            return `http://www.${t.join("")}.com/${a.join("")}/?`;
                        }();
                        chrome.webRequest.onBeforeSendHeaders.addListener(function(e) {
                            var r = utils.getArrayEleByKey(e.requestHeaders, "name", "Referer") || utils.getArrayEleByKey(e.requestHeaders, "name", "referer");
                            if (!r || -1 == r.value.indexOf(utils.getDomain2(e.url))) {
                                var t = e.url.match(/.*?\?(.*)/);
                                return t = t ? t[1] : "", e.requestHeaders.push({
                                    name: "Referer",
                                    value: g + t
                                }), {
                                    requestHeaders: e.requestHeaders
                                };
                            }
                        }, {
                            urls: l
                        }, [ "blocking", "requestHeaders" ]), chrome.webRequest.onBeforeSendHeaders.addListener(function(e) {
                            var r = utils.getArrayEleByKey(e.requestHeaders, "name", "Referer") || utils.getArrayEleByKey(e.requestHeaders, "name", "referer");
                            if (r && -1 == r.value.indexOf(utils.getDomain2(e.url))) return /api\.baiyug\.cn\/vips\/index\.php\?a=/.test(e.url) ? e.requestHeaders.push({
                                name: "Referer",
                                value: "http://api.baiyug.cn/vips/index.php?url=" + r.value
                            }) : e.requestHeaders.push({
                                name: "Referer",
                                value: "http://api.baiyug.cn/vip/index.php?url=" + r.value
                            }), {
                                requestHeaders: e.requestHeaders
                            };
                        }, {
                            urls: d
                        }, [ "blocking", "requestHeaders" ]), chrome.webRequest.onBeforeSendHeaders.addListener(function(e) {
                            if (-1 !== e.url.indexOf(".ourdvsss.com") || -1 !== e.url.indexOf(".baidupcs.com") || e.frameId > 0 || navigator.userAgent.match(/MetaSr/) && 0 != e.frameId) {
                                var r = utils.getArrayIndexByKey(e.requestHeaders, "name", "Referer") || utils.getArrayIndexByKey(e.requestHeaders, "name", "referer");
                                if (-1 !== r) return e.requestHeaders.splice(r, 1), {
                                    requestHeaders: e.requestHeaders
                                };
                            }
                        }, {
                            urls: f
                        }, [ "blocking", "requestHeaders" ]);
                        for (var h in t) s.parser[h] = function(e) {
                            return function(r) {
                                var a = 'var iframe = document.createElement("iframe");iframe.src = "' + (t[e].urlBase + r.url) + "&_=" + new Date().getTime() + '";iframe.id="vipkdy-parser-iframe";document.body.appendChild(iframe);';
                                chrome.tabs.executeScript(r.tabId, {
                                    code: a
                                }, function() {});
                            };
                        }(h);
                    }
                });
                var t = {};
                return {
                    get: function(a) {
                        var n = e(a);
                        r[n] || (r[n] = r.default.map(e => e));
                        var o = r[n];
                        return void 0 === t[n] && (t[n] = 0), o[t[n] % o.length];
                    },
                    getParsersStatus(t) {
                        var a = e(t);
                        return {
                            all: r[a] || r.default,
                            errors: []
                        };
                    },
                    change: function(a, n) {
                        var o = e(a);
                        return n ? t[o] = r[o].indexOf(n) : t[o] === r[o].length ? t[o] = 0 : t[o]++, t[o] === r[o].length ? 0 : 1;
                    },
                    getIndex: function(r) {
                        var a = e(r);
                        return t[a];
                    },
                    set: function(t, a) {
                        var n = e(t), o = this.get(n), s = o.indexOf(a);
                        r[n] = [ a ].concat(o.slice(s + 1)).concat(o.slice(0, s));
                    },
                    set1: function(r) {
                        var t = e(r), a = this.get(t);
                        a.push(a.shift()), a.count++;
                    }
                };
            }();
            s.parser = function() {
                function r(e, r) {
                    var t = {};
                    return r ? (t.type = r, t.vid = e) : e.match(/sports\.le\.com/) ? t = {
                        type: "letv",
                        url: e,
                        vid: e.match(/(\d+).html/)[1]
                    } : t.url = e, t.hd = 2, t;
                }
                function l(e, r) {
                    Math.random();
                    var n = u.get(e.type || e.url);
                    s.parser[n](e, function(r) {
                        chrome.tabs.sendMessage(e.tabId, {
                            topic: "newAddress",
                            value: r,
                            parserName: n
                        }), t({
                            succ: 1,
                            ref: e.type || e.url,
                            acode: a(r.parsefun),
                            final: 1
                        });
                    }), i[e.tabId] = n;
                    var o = c.third.rules[n];
                    r && r({
                        msg: "ok",
                        parser: {
                            parserName: n,
                            isHttps: o && 0 == o.ckplayer.indexOf("https")
                        }
                    });
                }
                function f(e) {
                    var r = {
                        "ckplayer-error": 2,
                        "ckplayer-speed-slow": 3
                    }, n = {
                        succ: e.reason ? r[e.reason] : 0,
                        ref: e.type || e.url,
                        acode: a(u.get(e.type || e.url))
                    };
                    e.reason = null, u.change(e.type || e.url) ? (l(e), n.final = 0) : (chrome.tabs.sendMessage(e.tabId, {
                        topic: "newAddress",
                        value: {
                            msg: "error"
                        }
                    }), n.final = 1), t(n);
                }
                var p, m = 0, d = 5e3;
                return {
                    _parseVip: l,
                    _parseVipNext: f,
                    _parseVipChange: function(e, r) {
                        var n = {
                            "ckplayer-error": 2,
                            "ckplayer-speed-slow": 3
                        }, o = {
                            succ: e.reason ? n[e.reason] : 0,
                            ref: e.type || e.url,
                            acode: a(u.get(e.type || e.url))
                        };
                        e.reason = null, u.change(e.type || e.url, e.parser) ? (l(e, r), o.final = 0) : (r({
                            msg: "error"
                        }), o.final = 1), t(o);
                    },
                    parseVip: function(e, t, a) {
                        var n = a.url;
                        r(n), document.NaclPnacl || (document.NaclPnacl = document.getElementById("NaclPnacl"));
                        "loading" == t.status && parsevipB(n, "", function(r) {
                            chrome.tabs.sendMessage(e, {
                                topic: "newAddress",
                                value: r
                            }), encodedUrls[e] = r;
                        });
                    },
                    parseVipB: function(e, t) {
                        var a = r(e.url, e.type), n = (document.NaclPnacl || (document.NaclPnacl = document.getElementById("NaclPnacl")), 
                        document.querySelector('object[type="application/x-vipkdy"]'));
                        if (n) try {
                            var o = JSON.parse(n.getVIP($.param(a)));
                            "ok" == o.msg ? o.url.match(/vodcdn.video.taobao.com/) ? f(e) : (o.parsefun = "parseVipB", 
                            t(o)) : f(e);
                        } catch (r) {
                            f(e);
                        } else f(e);
                    },
                    parseVipBWap: function(e, t) {
                        var a = r(e.url, e.type);
                        a.wap = 1;
                        document.NaclPnacl || (document.NaclPnacl = document.getElementById("NaclPnacl"));
                        var n = document.querySelector('object[type="application/x-vipkdy"]');
                        if (n) try {
                            var o = JSON.parse(n.getVIP($.param(a)));
                            "ok" == o.msg ? o.url.match(/vodcdn.video.taobao.com/) ? f(e) : (o.parsefun = "parseVipBWap", 
                            t(o)) : f(e);
                        } catch (r) {
                            f(e);
                        } else f(e);
                    },
                    parseVipB1: function(t, a) {
                        var n = e("../../../ext-npm/ext-des"), o = r(t.url, t.type);
                        o.ts = n.e(+new Date() + "", "Vip2017_@!_d_e_s");
                        $.ajax({
                            url: s.server + "/vc/exti.htm",
                            data: o,
                            success: function(e) {
                                "ok" == e.msg ? (e.parsefun = "parseVipB1", a(e)) : f(t);
                            },
                            error: function(e) {
                                f(t);
                            }
                        }) || f(t);
                    },
                    parseVipB2: function(e, r) {
                        var t = +new Date();
                        if (t - m < d) r({
                            msg: "later",
                            time: d + m - t
                        }); else {
                            var a = document.querySelector('object[type="application/x-vipkdy"]');
                            if (a) try {
                                m = +new Date();
                                var s = "&" + $.param(n(o)), c = "url=" + encodeURIComponent(e.url);
                                if (e.url.match(/youku\.com/)) {
                                    var i = e.url.match(/id_(.*?).html/);
                                    i && (c += "&vid=" + i[1]);
                                }
                                e.url.match(/le\.com/) && (c += "&tkey=" + utils.getTkey());
                                var u = a.getVIP4(c, s);
                                (u = JSON.parse(u)).s ? r({
                                    msg: "ok",
                                    url: "m3u8" == u.ext ? encodeURIComponent(u.url) : u.url,
                                    ext: u.ext,
                                    parsefun: "parseVipB2"
                                }) : f(e);
                            } catch (r) {
                                f(e);
                            } else f(e);
                        }
                    },
                    parseVipLE: function(e, r) {
                        var t = +new Date();
                        if (t - m < d) r({
                            msg: "later",
                            time: d + m - t
                        }); else {
                            var a = document.querySelector('object[type="application/x-vipkdy"]');
                            if (a) try {
                                m = +new Date();
                                var s = "&" + $.param(n(o)), c = utils.getTkey(), i = a.getVIP4("url=" + encodeURIComponent(e.url) + "&tkey=" + c, s);
                                (i = JSON.parse(i)).s ? r({
                                    msg: "ok",
                                    url: encodeURIComponent(i.url),
                                    ext: "mp4",
                                    parsefun: "parseVipLE"
                                }) : f(e);
                            } catch (r) {
                                f(e);
                            } else f(e);
                        }
                    },
                    setCallback: function(e) {
                        p = e;
                    }
                };
            }(), r.appBg = s.appBg = function(e) {
                function r(e) {
                    e = e || "";
                    try {
                        window.external.mxGetRuntime().create("mx.app.ui").getEntryPointByActionName("popup", "toolbar").setIconImage("icon_32" + e + ".png");
                    } catch (r) {
                        try {
                            sogouExplorer.browserAction.setIcon({
                                path: "logos/32" + e + ".png"
                            });
                        } catch (r) {
                            try {
                                chrome.browserAction.setIcon({
                                    path: "logos/16" + e + ".png"
                                }), chrome.browserAction.setBadgeText({
                                    text: ""
                                });
                            } catch (r) {
                                cache.set("iconudt", {
                                    path: "./logos/16" + e + ".png"
                                });
                            }
                        }
                    }
                }
                function t(r, t, a) {
                    if (t.tab) {
                        var n = t.tab.id;
                        switch (r.tabId = n, r.topic) {
                          case "getFlashvars":
                            e.parser._parseVip(r, a);
                            break;

                          case "changeParser":
                            e.parser._parseVipChange(r, a);
                            break;

                          case "getParsersStatus":
                            a(u.getParsersStatus(t.tab.url));
                        }
                        return !0;
                    }
                }
                function a() {
                    chrome.storage.local.set({
                        unblockvipConfig: p
                    });
                }
                function n() {
                    chrome.runtime.onMessage.addListener(t), navigator.userAgent.match(/MetaSr/) || (f = chrome.contextMenus.create({
                        id: "vipkdy-change-parser",
                        title: "切换账号",
                        onclick: function(e, r) {
                            chrome.tabs.sendMessage(r.id, {
                                topic: "changeParser-contextMenus"
                            });
                        }
                    }, function() {}));
                }
                function o() {
                    chrome.runtime.onMessage.removeListener(t), f && chrome.contextMenus.remove(f);
                }
                function s() {}
                function c() {}
                function i() {
                    chrome.tabs.query({
                        active: !0
                    }, function(e) {
                        chrome.tabs.reload(e[0].id);
                    });
                }
                var l = {};
                e.parser.setCallback(function(e, r) {
                    chrome.tabs.sendMessage(e, {
                        topic: "replace",
                        value: r
                    }), l[e] = r;
                });
                var f, p = {}, m = {
                    init: function() {
                        this.inited || (this.inited = !0, chrome.storage.local.get("unblockvipConfig", function(e) {
                            m.unblockvipConfig = p = $.extend({
                                closeExt: !1,
                                unblockVip: !0,
                                blockWebAd: !0,
                                autoKdy: !0
                            }, e.unblockvipConfig), r(p.closeExt ? "g" : ""), !p.closeExt && p.unblockVip && n(), 
                            window.unblockvipConfig = p;
                        }));
                    },
                    updateConfig: function(e) {
                        if (e) for (var r in e) p[r] = e[r];
                        a();
                    },
                    updateSingleConfig: function(e, r) {
                        p[e] = r, a();
                    },
                    toggleExt: function(e) {
                        this.updateConfig({
                            closeExt: !e
                        }), r(p.closeExt ? "g" : ""), e ? (p.unblockVip && n(), p.blockWebAd && s()) : (o(), 
                        c()), i();
                    },
                    toggleUnblockVip: function() {
                        p.unblockVip = !p.unblockVip, a(), p.unblockVip ? n() : o(), i();
                    },
                    toggleBlockWebAd: function() {
                        p.blockWebAd = !p.blockWebAd, a(), p.blockWebAd ? s() : c(), i();
                    },
                    toggleSingle: function(e) {
                        this["toggle" + (e[0].toUpperCase() + e.slice(1))]();
                    },
                    openExt: function() {
                        this.toggleExt(!0);
                    },
                    pauseExt: function() {
                        this.toggleExt(!1);
                    },
                    getConfig: function() {
                        return p;
                    },
                    addAutomenus: function() {
                        this.updateConfig({
                            autoKdy: !1
                        });
                    },
                    removeAutomenus: function() {
                        this.updateConfig({
                            autoKdy: !0
                        });
                    }
                };
                return m;
            }(s), chrome.runtime.onInstalled.addListener(function(r) {
                if ("install" == r.reason) {
                    chrome.storage.local.set({
                        iTime: new Date().getTime()
                    }), setTimeout(function() {
                        var r = e("../../../ext-npm/ext-utils"), t = $.param(r.getImpParams(gConfig)), a = gConfig.jrServer + "/10.gif?" + t;
                        new Image().src = a;
                    }, 1e4);
                    var t = 0, a = setInterval(function() {
                        if (window.ucok) {
                            try {
                                chrome.storage.local.get("unblockvipConfig", function(e) {
                                    !e.unblockvipConfig || e.unblockvipConfig.closeExt;
                                });
                            } catch (e) {}
                            clearInterval(a);
                        }
                        t > 10 && clearInterval(a), t++;
                    }, 1e3);
                }
            });
            var l = 0, f = setInterval(function() {
                (window.ucok || l >= 10) && (s.appBg.init(), clearInterval(f)), l++;
            }, 1e3);
            (() => {
                function r(e) {
                    var r = `(${[ "qq", "iqiyi", "youku", "tudou", "le", "mgtv", "sohu", "pptv" ].join("|")})\\.(?:com|cn)`, t = e.match(r);
                    return t ? t[1] : "";
                }
                var t = e("../../../ext-npm/execuError.js");
                !function(e) {
                    e = e || {}, chrome.tabs.onUpdated.addListener((a, n, o) => {
                        if ("loading" === n.status && o.url.match(/^http/) && (!o.coreType || "Webkit" == o.coreType)) {
                            chrome.tabs.executeScript(a, {
                                file: "jquery.js",
                                runAt: "document_start"
                            }, t), chrome.tabs.executeScript(a, {
                                file: "common.js",
                                runAt: "document_start"
                            }, t), chrome.tabs.executeScript(a, {
                                file: "utils.js",
                                runAt: "document_start"
                            }, t);
                            var s = r(o.url);
                            appBg.unblockvipConfig && !appBg.unblockvipConfig.closeExt && s && u.getParsersStatus(s).all.length > 0 && (e[s] || chrome.tabs.executeScript(a, {
                                file: `${s}.js`,
                                runAt: "document_start"
                            }, t), chrome.tabs.executeScript(a, {
                                file: "content.js",
                                runAt: "document_start"
                            }, t));
                        }
                    });
                }();
            })();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "../../../ext-npm/execuError.js": 1,
        "../../../ext-npm/ext-des": 2,
        "../../../ext-npm/ext-utils": 3
    } ]
}, {}, [ 4 ]);