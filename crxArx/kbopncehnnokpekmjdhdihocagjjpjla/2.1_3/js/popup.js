var draw = function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (result) {
        if (!result.length)
            return;
        var tabId = result[0].id;

        var startDownloading = function (e) {
            var audioId = e.target.getAttribute('id').split('li')[1];
            console.log("Clicked on #" + audioId);
            chrome.runtime.sendMessage({msg: 'startDownloading', tabId: tabId, audioId: audioId}, function (response) {
                if (response.started && !e.target.getAttribute('disabled'))
                    e.target.setAttribute('disabled', 'disabled')
            });
        };

        chrome.runtime.sendMessage({msg: 'getAudios', tabId: tabId}, function (response) {
            var audios;
            if (response.fetchedAudios) {
                audios = [];
                for (var uid in response.fetchedAudios.audios)
                    audios.push(response.fetchedAudios.audios[uid]);
                audios.sort(function (a, b) {
                    return b.size - a.size
                });
            }
            var content = document.getElementById('content'),
                inserted = 0, div, div2, div3, newUl = false;

            var ul = document.getElementById('ul_list');
            if (!ul) {
                newUl = true;
                ul = document.createElement('div');
                ul.className = 'container text-center';
                ul.setAttribute('id', 'ul_list');
            }

            for (var i in audios) {
                var audio = audios[i];
                var button = document.getElementById('li' + audio.audio_id);
                if (!button) {
                    button = document.createElement('button');
                    button.className = 'btn btn-secondary btn-lg btn-block';
                    button.type = "button";
                    button.setAttribute('id', 'li' + audio.audio_id);
                    button.addEventListener('click', startDownloading, true);
                }
                button.innerText = audio.filename.substr(0, 25) + " " + audio.formattedSize;
                ul.appendChild(button);
                inserted++;
            }
            var div_main = document.createElement('div');
            if (inserted) {
                if (newUl) {
                    div_main.className = 'h4 text-center';
                    div_main.innerHTML = chrome.i18n.getMessage('files');
                    content.appendChild(div_main);
                    content.appendChild(ul);
                } else {
                    var ch = ul.children;
                    for (var child in ch) {
                        var found = false;
                        for (var vi in audios) {
                            if (ch[child].id == 'li' + audios[vi].audio_id)
                                found = true;
                        }
                        if (!found) {
                            ch[child].outerHTML = '';
                        }
                    }
                }
            } else {
                content.innerHTML = '<h3 style="text-align: center">'
                    + chrome.i18n.getMessage('ext_name') + '</h3>';
                div_main.className = 'title-audio-list';
                content.appendChild(div_main);

                div = document.createElement('div');
                div.className = 'main-top';
                div.innerHTML = '<img src="./img/play.png">';

                content.appendChild(div);

                div3 = document.createElement('div');
                div3.className = 'main-bottom';

                var div4 = document.createElement('div');
                div4.className = 'main-bottom-text';
                div4.innerHTML = chrome.i18n.getMessage('not_founded');
                div3.appendChild(div4);
                content.appendChild(div3);
            }
        });
    });
};

setTimeout(draw, 3e3), draw();
