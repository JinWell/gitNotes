var port=chrome.extension.connect();function lookupSelection(){var a=window.getSelection();a&&"Range"==a.type&&port.postMessage({message:"lookupEvent",values:a.toString()})}document.addEventListener("keydown",function(a){83==a.keyCode&&(a=document.activeElement,"textarea"!=a.nodeName.toLowerCase()&&"input"!=a.nodeName.toLowerCase()&&lookupSelection())});document.addEventListener("mouseup",function(a){a.ctrlKey&&(a.preventDefault(),lookupSelection())});
document.addEventListener("keydown",function(a){88==a.keyCode&&(a=document.activeElement,"textarea"!=a.nodeName.toLowerCase()&&"input"!=a.nodeName.toLowerCase()&&port.postMessage({message:"closeNoteEvent"}))});