SCRIPT_ROOT="http://www.duoc.cn/";
Chrome_DUOC_login_url=SCRIPT_ROOT+"login_page";
Chrome_url=chrome.extension.getURL('/');
Chrome_prefix_url=Chrome_url+"*";

function check_login_tab_exists( check_unlogin ){
    if (check_unlogin == false){
        return ;
    }
    /*检查是否有登录窗口，如果有，则不再弹出，否则弹出*/
    login_url_re = /www.duoc.cn\/login_page/i;
    chrome.tabs.getAllInWindow(function(tabs){
        flag = false;
        for (var i=0; i<tabs.length; i++){
            if (tabs[i].url.match(login_url_re) != null){
                flag = true;
            }
        }
        if (flag==false){
            chrome.tabs.create({url:Chrome_DUOC_login_url});
        }
    });
}

function ChromeExt_get_login_bar( check_unlogin ){
    /* 获取所有未读提醒 */
    $.post(SCRIPT_ROOT+"login_bar",
        function(data){
            if (data.done =='OK' && data.stat == 'LOGGED_IN'){
                //chrome.storage.local.get('data',function(_old){
                    _old = localStorage._old;
                    _old_data = $.parseJSON(_old);
                    new_reminds=data.new_reminds;
                    uid = data.uid;
                    old_reminds = 0;
                    if ( _old_data != undefined ){
                        if ( _old_data[uid] !=undefined ){ 
                            if (_old_data[uid].new_reminds != undefined){ 
                                old_reminds=_old_data[uid].new_reminds;
                            }
                        }
                        else{
                            _old_data[uid] = data;
                        }
                    }
                    else{
                        _old_data = {uid:data};
                    }
                    tips = '今日待完成提醒'+new_reminds+"个";
                    if (new_reminds > old_reminds){
                        noti = window.webkitNotifications.createNotification(
                            chrome.extension.getURL('duoc.png'),  // icon url - can be relative
                            '您有'+(new_reminds-old_reminds)+'个新的提醒！', // notification title
                            tips// notification body text
                        );
                        noti.show();
                    }
                    chrome.browserAction.setBadgeText({text:''+(new_reminds != 0 ? new_reminds:'')});
                    chrome.browserAction.setTitle({title:tips});
                    _old_data[uid]=data;
                    _old = JSON.stringify(_old_data);
                    localStorage.setItem('_old',_old);  
                    //chrome.storage.local.set(_old);
               // });
            }
            else if (data.stat != 'LOGGED_IN' ){
                /*需要重新登录多C*/
                chrome.browserAction.setBadgeText({text:''});
                chrome.browserAction.setTitle({title:'请您在网页登录多C'});
                check_login_tab_exists( check_unlogin );
            }
            else{
                chrome.browserAction.setBadgeText({text:''});
                chrome.browserAction.setTitle({title:'请您在网页登录多C'});
            }
        },
        'json'
    );
}

