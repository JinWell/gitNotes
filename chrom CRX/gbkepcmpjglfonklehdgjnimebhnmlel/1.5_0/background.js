document.addEventListener("DOMContentLoaded", function () {
  var errorHandler = new ProxyErrorHandler();

  // If this extension has already set the proxy settings, then reset it
  // once as the background page initializes.  This is essential, as
  // incognito settings are wiped on restart.
  ProxyFormController.getPersistedSettings();

  if (false && !chrome.tabs.getBrowserNickName) {
    chrome.tabs.query(
      { currentWindow: true, active: true },
      function (tabArray) {
        var site = "http://www.163.com";
        chrome.tabs.create({ index: tabArray[0].index + 1, url: site });
      }
    );
  }
});
