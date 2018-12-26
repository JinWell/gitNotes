function ckplayerEnded() {
    window.postMessage({
        topic: "ckplayer-ended"
    }, "*");
}

function ckplayerError() {
    window.postMessage({
        topic: "ckplayer-error"
    }, "*");
}

function ckplayerSpeed(e) {
    __speed.push(e);
}

function ckplayerVideoLoad() {}

function ckplayerBytes(e) {
    e < 20480 * speedTime / 1e3 && window.postMessage({
        topic: "ckplayer-speed-slow"
    }, "*"), gCkplayer.removeListener("bytes", "ckplayerBytes");
}

function ckplayerLoadedHandler() {
    (gCkplayer = document.querySelector(".ckplayer-embed")).addListener("videoLoad", "ckplayerVideoLoad"), 
    gCkplayer.addListener("ended", "ckplayerEnded"), gCkplayer.addListener("error", "ckplayerError");
}

var gCkplayer, __speed = [], speedTime = 2e4;