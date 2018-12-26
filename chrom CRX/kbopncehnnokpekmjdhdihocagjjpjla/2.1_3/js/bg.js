var debug = false;

// audio ext by content-type
var audioExt = {
        'audio/mpeg': 'mp3',
        'audio/mp4': 'm4a',
        'audio/x-aiff': 'aif',
        'audio/ogg': 'ogg',
        'audio/vnd.wav': 'wav'
    },
// information about audios in tabs
    data = {};

// add audio to downloads
function downloadAudio(audio) {

    debug && console.log('Downloading file ' + audio.url);

    chrome.downloads.download({
        url: audio.url,
        filename: audio.filename,
        saveAs: true
    }, function () {
        data[audio.tabId].audios[audio.audio_id]['started'] = false;
        debug && console.log('Download Finished: audio_id=' + audio.audio_id);
    });
}

function parseFileName(url, type) {
    var clearedUrl = url.split('?', 1)[0],
        urlParts = clearedUrl.split('/'),
        filename = urlParts.length > 0 ? urlParts[urlParts.length - 1] : 'unknown',
        nameParts = filename.split('.');

    if (nameParts[nameParts.length - 1] !== audioExt[type]) {
        filename += '.' + audioExt[type];
    }

    return filename;
}


function getAudioInfo(headers) {
    var info = {};

    for (var i = 0; i < headers.length; i++) {
        var header = headers[i],
            name = header.name,
            value = header.value;

        if (!name) {
            continue;
        }

        switch (name.toLowerCase()) {
            case 'content-type':
                info.type = value.split(';', 1)[0];
                break;

            case 'content-length':
                info.size = parseInt(value);
                info.formattedSize = formatSize(value);
                break;
        }
    }
    if (!info.size) {
        info.size = 0;
        info.formattedSize = '';
    }

    return info.type && audioExt[info.type] ? info : null;
}

function formatSize(bytes) {
    var thresh = 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = ['kB', 'MB', 'GB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}

function checkFiltersAllow(audio, tabId) {

    chrome.tabs.get(tabId, function (tab) {
        if (!tab) {
            console.log(chrome.runtime.lastError.message);
            return false;
        }
        debug && console.log('Found audio ' + audio.url);
        audio.audio_id = audio.url.hashCode();
        audio.tabId = tabId;
        data[tabId].audios[audio.audio_id] = audio;

    });
}


// hash function for creating Audio Ids
String.prototype.hashCode = function () {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
};


chrome.webRequest.onHeadersReceived.addListener(function (details) {
    if (!details.responseHeaders || details.tabId < 0) {
        return;
    }

    var audio = getAudioInfo(details.responseHeaders);
    var tabId = details.tabId;

    if (!audio) {

        if (!data[tabId]) {
            data[tabId] = {
                audios: {}
            };
            chrome.tabs.get(tabId, function (tab) {
                if (tab) {
                    data[tabId].page = {
                        url: tab.url,
                        title: tab.title
                    };
                } else {
                    data[tabId].error = chrome.runtime.lastError;
                    delete data[tabId];
                }
            });
        }
        return;
    }

    audio.url = details.url;
    audio.filename = parseFileName(details.url, audio.type);
    audio.ext = audioExt[audio.type];

    if (!data[tabId]) {
        data[tabId] = {
            audios: {}
        };
        chrome.tabs.get(tabId, function (tab) {
            if (tab) {
                data[tabId].page = {
                    url: tab.url,
                    title: tab.title
                };
                checkFiltersAllow(audio, tabId);
            }
        });
    }
    else
        checkFiltersAllow(audio, tabId);
}, {urls: ["<all_urls>"]}, ["responseHeaders"]);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.msg) {
        case 'getAudios':
            sendResponse({
                fetchedAudios: data[request.tabId]
            });

            break;

        case 'startDownloading':
            debug && console.log('Message: startDownloading tabId=' + request.tabId + " audioId=" + request.audioId);
            if (data[request.tabId] && data[request.tabId].audios[request.audioId]) {
                debug && console.log('Audio was found in tabsInfo.');
                sendResponse({started: true});
                data[request.tabId].audios[request.audioId]['started'] = true;
                downloadAudio(data[request.tabId].audios[request.audioId]);
            } else {
                debug && console.log('Audio was NOT found in tabsInfo.');
                sendResponse({started: false});
            }

            break;

        case 'checkAudioIsNew':
            if (data[sender.tab.id] && data[sender.tab.id].audios)
                for (var vIndex in data[sender.tab.id].audios)
                    if (data[sender.tab.id].audios[vIndex].url == request.url)
                        return sendResponse({isNew: false});

            sendResponse({isNew: true});

            break;
    }
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status && changeInfo.status === 'loading' && changeInfo.url) {
        delete data[tabId];
    }
});
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    delete data[tabId];
});


