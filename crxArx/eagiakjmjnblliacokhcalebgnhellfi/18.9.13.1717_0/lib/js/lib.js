"use strict";var infinity={};infinity.id=chrome.runtime.id.replace("@temporary-addon",""),infinity.browser=0<navigator.userAgent.indexOf("Chrome")?"Chrome":"FireFox",infinity.settingName="infinity-settings",infinity.init=function(n,t,i,e){try{i?infinity.get(n,!0,function(i){i?e&&e(i):infinity.set(n,t,!0,function(){e&&e(i)})}):localStorage[n]||(localStorage[n]=JSON.stringify(t))}catch(i){}},infinity.set=function(i,n,t,e){try{if(t){var r={};r[i]=JSON.stringify(n),chrome.storage.local.set(r,function(){e&&e(n)})}else localStorage[i]=JSON.stringify(n)}catch(i){}},infinity.get=function(t,i,e){try{if(!i)return JSON.parse(localStorage[t]);chrome.storage.local.get(t,function(i){var n=null;try{n=JSON.parse(i[t])}catch(i){}e&&e(n)})}catch(i){return null}},infinity.clear=function(){chrome.storage.local.clear(function(){for(var i in localStorage)localStorage.removeItem(i);window.location.href=window.location.href})},infinity.setting=function(i,n){if(void 0===n)return infinity.get(infinity.settingName)[i];var t=infinity.get(infinity.settingName);t[i]=n,infinity.set(infinity.settingName,t)},infinity.settingInitOrReset=function(i,n){try{var t=infinity.get(infinity.settingName);for(var e in t||(t={},infinity.set(infinity.settingName,t)),i){if(n)infinity.setting(e,i[e]);else(t=infinity.get(infinity.settingName)).hasOwnProperty(e)||infinity.setting(e,i[e])}}catch(i){}},infinity.i18n=function(n){try{return null==n?n:chrome.i18n.getMessage(n)||n}catch(i){return n}},infinity.sendMessage=function(i,n,t){chrome.runtime.sendMessage({name:i,message:n},function(i){t&&t(i)})},infinity.onMessage=function(a,o){chrome.runtime.onMessage.addListener(function(i,n,t){var e,r=i.message;return i.name==a&&(e=o&&o(r,n,t)),!0===e})},infinity.broadcast=function(n,i,t){var e=i||{};chrome.tabs.getCurrent(function(i){e.tabId=i.id,infinity.sendMessage("I-broadcast-"+n,e,t)})},infinity.onBroadcast=function(i,r){infinity.onMessage("I-broadcast-"+i,function(n,t,e){chrome.tabs.getCurrent(function(i){i.id!=n.tabId&&r&&r(n,t,e)})})},infinity.isZh=function(){return"zh-CN"==chrome.i18n.getUILanguage()};