!function(){"use strict";function e(e,t){function n(t,n,a){try{a(t.object)}catch(o){e.error(String.format("handleTestCommand() - Exception: {0}",o.toString()))}finally{return e.trackEvent("CopyPaste_Test"),!1}}function a(t,n,a){var o;try{o=document.getElementById("copyPasteSandbox"),o.innerHTML=t.object,o.focus(),document.execCommand("selectAll"),document.execCommand("copy"),a()}catch(r){e.error(String.format("handleCopyCommand() - Exception: {0}",r.toString()))}finally{return o.innerHTML="",e.trackEvent("CopyPaste_Copy"),!1}}function o(n,a,o){var r,c=!1;try{r=document.getElementById("copyPasteSandbox"),r.innerHTML="",r.focus(),document.execCommand("selectAll"),document.execCommand("paste")&&(Utilities.isNotUndefinedOrNull(i)&&i.length>0?(t.readImages(i,function(e){o(e)}),c=!0):o(r.innerHTML))}catch(d){e.error(String.format("handlePasteCommand() - Exception: {0}",d.toString()))}finally{return r.innerHTML="",e.trackEvent("CopyPaste_Paste",{IsPrefetchedImage:c}),c}}function r(e){if(i=[],!Utilities.isUndefinedOrNull(e.clipboardData)&&!Utilities.isUndefinedOrNull(e.clipboardData.items))for(var n=e.clipboardData.items,a=0;a<n.length;++a)t.isImageFile(n[a])&&i.push(t.getAsFile(n[a]))}var i,c={handleTestCommand:n,handleCopyCommand:a,handlePasteCommand:o,onPasteEvent:r};return c}angular.module("app.copypaste").factory("copyPasteService",["$log","imageReader",e])}();