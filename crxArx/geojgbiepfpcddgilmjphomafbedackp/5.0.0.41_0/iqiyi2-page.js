Q.kit.QiyiPlayer.getPlayer("video").on("videochanged", function(e) {
    var t = document.querySelector('.selected[j-delegate="videoPlayList"], .selected[data-delegate="videoPlayList"]');
    t && t.nextElementSibling && e.data.tvid != t.dataset.videolistTvid && t.nextElementSibling.querySelector("a").click();
});