function checkPotentialPopup(a,t,e){var o=extractHostFromURL(t),i=extractHostFromURL(e),r=isThirdParty(o,i),n=defaultMatcher.matchesAny(t||"about:blank","POPUP",i,r);n instanceof BlockingFilter&&chrome.tabs.remove(a)}if("webNavigation"in chrome){var tabsLoading={};chrome.webNavigation.onCreatedNavigationTarget.addListener(function(a){if(!isFrameWhitelisted(a.sourceTabId,a.sourceFrameId)){var t=getFrameUrl(a.sourceTabId,a.sourceFrameId);t&&(tabsLoading[a.tabId]=t,checkPotentialPopup(a.tabId,a.url,t))}}),chrome.tabs.onUpdated.addListener(function(a,t,e){a in tabsLoading&&("url"in t&&checkPotentialPopup(a,e.url,tabsLoading[a]),"status"in t&&"complete"==t.status&&"about:blank"!=e.url&&delete tabsLoading[a])})}