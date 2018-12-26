var youku = {
	init: function() {
		this.bindEvent_();
	},
	bindEvent_: function() {
		document.addEventListener('click', this.jumpTo_.bind(this));
	},
	jumpTo_: function(e) {
		var id = e.target.id,
		self = this;

		switch (id) {
		case 'remove-add':
			this.getCurrentTab_(function(tab) {
				var url = tab.url || '',
				code = '';

				/*
				*
				* 如果参数中是x or x= or x=fsaferw，则说明已经是用video播放，则不再跳转
				*
				*/
				if (/^http:\/\/v.youku.com/.test(url)) {
					if (!self.judgeByString_(url, 'x')) {
						code = /\?.*$/.test(url) ? 'location.href="' + url.replace(/\?.*$/, '?x') + '"' : 'location.href="' + url +  '?x"';
					} else {
						code = 'alert("当前页面已经没有广告啦~~~")';
					}

				} else {
					code = 'location.href="http://www.youku.com/"';
				}
				chrome.tabs.executeScript(null, {
					code: code
				});
			});

			break;
		case 'hot-movie':
			this.getCurrentTab_(function(tab) {
				var url = tab.url || '';

				if (/^http:\/\/labs.3g.youku.com\/ipad/.test(url)) {
					chrome.tabs.executeScript(null, {
						code: 'alert("请选择你要看的电影！")'
					});
				} else {

					chrome.tabs.create({
						url: 'http://labs.3g.youku.com/ipad/',
						"selected": true
					},
					function(tab) {
						chrome.tabs.executeScript(tab.id, {
							file: "aboutIpad.js"
						});
					});
				}

			});

			break;
		}
		window.close();
	},
	judgeByString_: function(url, name) {
		var reg = new RegExp("(^|\\?|&)" + name + "(:?=([^&]*))?(\\s|&|$)", "i");
		if (reg.test(url)) {
			return true;
		}
		return false;
	},
	getCurrentTab_: function(callback) {
		chrome.windows.getCurrent(function(currentWindow) {
			chrome.tabs.query({
				active: true,
				windowId: currentWindow.id
			},
			function(activeTabs) {
				chrome.tabs.get(activeTabs[0].id, function(tab) {

					callback(tab);

				});
			});
		});
	}
};

document.addEventListener('DOMContentLoaded', function() {
	youku.init();
});
