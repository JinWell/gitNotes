!function() {
    if (top !== window) {
        var flg = 0, origOpen = XMLHttpRequest.prototype.open;
        if (XMLHttpRequest.prototype.open = function() {
            if (!flg) {
                for (var mp4 of vipMp4Configs) if (arguments[1].match(mp4.reqReg)) {
                    var resultReg = mp4.resultReg;
                    this.addEventListener("load", function() {
                        var mp4Url = this.responseText.match(resultReg);
                        (mp4Url = mp4Url ? mp4Url[1] : "") && (mp4Url = eval(`"${mp4Url}"`), top.window.postMessage({
                            topic: "vip-mp4",
                            flashvars: {
                                f: mp4Url,
                                s: 0
                            }
                        }, "*"), flg = 1);
                    });
                    break;
                }
                origOpen.apply(this, arguments);
            }
        }, !flg) var maxCount = 20, count = 0, interval = setInterval(function() {
            ++count > maxCount && clearInterval(interval);
            var e = document.querySelector(".dplayer-video,.dplayer-video-current");
            e && (top.window.postMessage({
                topic: "vip-mp4",
                flashvars: {
                    f: e.src,
                    s: 0
                }
            }, "*"), flg = 1, clearInterval(interval));
        }, 1e3);
    }
}();