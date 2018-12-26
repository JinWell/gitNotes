(function() {
	var domNum = 2;
	var timer = window.setInterval(function() {
		var container = document.body,
			tips = document.querySelector('#frame_homeicondialog'),
			overlay = document.querySelector('#scrim2');

		if(tips) {
			container.removeChild(tips);  //移除请使用ipad看的提示
			domNum--;
		}

		if(overlay) {
			container.removeChild(overlay);  //移除遮罩
			domNum--;
		}
		domNum == 0 && window.clearInterval(timer);
	}, 100);
})();
