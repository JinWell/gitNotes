/// <reference path="../../../typings/rivets.d.ts" />
/// <reference path="../../../typings/ExtAPI.d.ts" />
/// <reference path="../../../typings/tab-nav.d.ts" />
/// <reference path="../../../typings/common.d.ts" />
var Views;
(function (Views) {
    var Popup;
    (function (Popup_1) {
        var Keys = Core.Input.Keys;
        var $ = Core.Utils.DOM;
        var ModalMessage = Views.Common.ModalMessage;
        class AffiliateBanner {
            constructor(url, image, caption, accent = '#eee') {
                this.url = url;
                this.image = image;
                this.caption = caption;
                this.accent = accent;
            }
        }
        Popup_1.AffiliateBanner = AffiliateBanner;
        class Popup {
            constructor() {
                this.presets = [];
                this.quick = { width: null, height: null, target: 0 };
                this.showKeys = false;
                this.alternatePresetsBg = false;
                this.autoClosePopup = false;
                this.hidePresetsDescription = false;
                this.hidePopupTooltips = false;
                this.hideQuickResize = false;
                this._panels = [];
                this._clickFocus = false;
                this.license = null;
                this.collapsedSidebar = false;
                this.errorMessage = null;
                this.errorMessageTimeout = null;
                this.showQuickTips = false;
                this.presetsIconsStyle = '';
                this.presetsPrimaryLine = '';
                this.hideError = () => {
                    clearTimeout(this.errorMessageTimeout);
                    this.errorMessageTimeout = null;
                };
                this.hideQuickTips = () => {
                    this.showQuickTips = false;
                    window.localStorage['showQuickTips'] = '0';
                };
                this.presets = [];
                this.collapsedSidebar = window.localStorage['collapsed-sidebar'] === '1';
                this.hideQuickResize = window.localStorage['hideQuickResize'] === '1';
                this.showQuickTips = window.localStorage['showQuickTips'] !== '0';
                this._initPanels();
                this.quickResize = this._preventDefault(this.quickResize);
                this.handlePresetClick = this.handlePresetClick.bind(this);
                this.handleToolsClick = this.handleToolsClick.bind(this);
                this.toggleResizeInfo = this.toggleResizeInfo.bind(this);
                this.rotateViewport = this.rotateViewport.bind(this);
                this.handleKeyDown = this.handleKeyDown.bind(this);
                this.handleKeyUp = this.handleKeyUp.bind(this);
                this._showKeys = this._showKeys.bind(this);
                this._hideKeys = this._hideKeys.bind(this);
                this.dismissMessage = this.dismissMessage.bind(this);
                this.hideBanner = this.hideBanner.bind(this);
                ExtAPI.invoke('get-banner').then(b => this.showBanner(b)).catch(LOG_ERROR);
                ExtAPI.invoke('get-settings').then(settings => {
                    this.presetsIconsStyle = settings.presetsIconsStyle;
                    this.presetsPrimaryLine = settings.presetsPrimaryLine;
                    this.alternatePresetsBg = settings.alternatePresetsBg;
                    this.autoClosePopup = settings.autoClosePopup;
                    this.hidePresetsDescription = settings.hidePresetsDescription;
                    this.hidePopupTooltips = settings.hidePopupTooltips;
                    this.hideQuickResize = settings.hideQuickResize;
                    window.localStorage['hideQuickResize'] = settings.hideQuickResize ? 1 : 0;
                    this.license = settings.license;
                    for (let presetData of settings.presets) {
                        this.presets.push(new Core.Preset(presetData));
                    }
                    this._showTheUpdateMessage();
                }).catch(LOG_ERROR);
            }
            _showTheUpdateMessage() {
                let updated = window.localStorage['wasUpdated'];
                if (updated) {
                    this.showMessage('UPDATED', '');
                    let modalMsg = document.createElement('div');
                    const _cleanup = () => {
                        modalView.unbind();
                        window.localStorage.removeItem('wasUpdated');
                        chrome.browserAction.setBadgeText({ text: '' });
                    };
                    if (updated == 1) {
                        modalMsg.innerHTML = `
						<p>
							Window Resizer has just received a major update, bringing lots of
							changes like a new UI, a rotate tool, better control of the resize
							tooltip and plenty more!
						</p>

						<a rv-on-click="showReleaseNotes" href="#">&raquo; Read more</a>
					`;
                    }
                    else {
                        modalMsg.innerHTML = `
						<ul>
							<li><b>Fixed</b> an issue with re-ordering the presets.</li>
							<li><b>Modified</b> the settings page behaviour (it now opens as a full page).</li>
							<li><b>Removed</b> a deprecation warning about \`createShadowRoot\`.</li>
							<li><b>Fixed</b> some issues with accessibility audits & stuff...</li>
						</ul>

						<a rv-on-click="showReleaseNotes" href="#">&raquo; Find out more</a>
					`;
                    }
                    if (!this.license) {
                        modalMsg.innerHTML += `
						<div style="text-align: center; margin: 14px 0 -10px; padding: 14px 0 0; border-top: 1px solid #ddd;">
							<strong>Want to support this extension?</strong>
						</div>
						<style>.WR_modal_actions{text-align:center}</style>
					`;
                        this.currentMessage.actions[0].title = 'Ok, whatever!';
                        this.currentMessage.actions[0].title = 'Nah, I\'m good';
                        this.currentMessage.actions.unshift({ title: 'Buy Pro', icon: '#icon-cart', main: true, handler: () => {
                                _cleanup();
                                this.showProPage({}, this);
                            } });
                    }
                    let modalView = rivets.bind(modalMsg, this);
                    $.q('.WR_modal_message').appendChild(modalMsg);
                    this.currentMessage.onClose.addListener(_cleanup);
                }
            }
            dismissMessage() {
                TabNav.reset();
                this.currentMessage.hide().then(x => {
                    this.currentMessage = null;
                });
            }
            _createMessage(title, message) {
                let modal = new ModalMessage(title, message);
                modal.onClose.addListener(() => {
                    this._panel.focus();
                });
                return modal;
            }
            showMessage(title, message) {
                this.currentMessage = this._createMessage(title, message);
                this.currentMessage.actions.push({ title: 'OK', handler: this.dismissMessage });
            }
            showReleaseNotes(evt, ctx) {
                ctx.currentMessage.hide().then(() => {
                    chrome.browserAction.setBadgeText({ text: '' });
                    ExtAPI.invoke('open-release-notes').catch(error => {
                        ctx._handleCommonErrors(error);
                    });
                });
            }
            showProPage(evt, ctx) {
                ExtAPI.invoke('open-pro-page').catch(error => {
                    ctx._handleCommonErrors(error);
                });
            }
            showError(message) {
                clearTimeout(this.errorMessageTimeout);
                this.errorMessage = message;
                this.errorMessageTimeout = setTimeout(() => this.hideError(), 2000);
            }
            showBanner(banner) {
                this.currentBanner = banner;
                if (banner) {
                    let sheet = window.document.styleSheets[0];
                    sheet.insertRule(`#promo .banner:hover .dim { color: ${banner.accent}; }`, sheet.cssRules.length);
                    $.addClass('#promo', 'visible');
                }
            }
            hideBanner() {
                $.hide('#promo');
                $.addClass('#info', 'empty');
                //this.currentBanner = null;
                ExtAPI.invoke('hide-banner').then(firstTime => {
                    if (!firstTime)
                        return;
                    // this.showMessage('Notice', 'No more recommendations for you today!<br />See you again tomorrow! :)');
                });
            }
            quickResize(evt, ctx) {
                this._resize(this.quick);
            }
            resizePreset(ctx) {
                this._resize(ctx.item);
            }
            openPresetsSettings(evt, ctx) {
                ExtAPI.invoke('open-presets-settings').catch(error => {
                    ctx._handleCommonErrors(error);
                });
            }
            openSettings(evt, ctx) {
                ExtAPI.invoke('open-settings').catch(error => {
                    ctx._handleCommonErrors(error);
                });
            }
            bugReport(evt, ctx) {
                ExtAPI.invoke('open-url', {
                    url: 'https://windowresizer.userecho.com/'
                }).catch(LOG_ERROR);
            }
            toggleResizeInfo(evt, ctx) {
                ExtAPI.invoke('toggle-tooltip').catch(error => {
                    ctx._handleCommonErrors(error);
                });
            }
            openAsPopup(evt, ctx) {
                ExtAPI.invoke('open-as-popup').then(response => {
                    !isStandalonePopup() && window.close();
                }).catch(error => {
                    ctx._handleCommonErrors(error);
                });
            }
            rotateViewport() {
                ExtAPI.invoke('rotate-viewport').catch(error => {
                    this._handleCommonErrors(error);
                });
            }
            toggleSidebar(evt, ctx) {
                ctx.collapsedSidebar = !ctx.collapsedSidebar;
                window.localStorage['collapsed-sidebar'] = ctx.collapsedSidebar ? 1 : 0;
                ctx._focusPanel(0);
            }
            _resize(config) {
                this.hideError();
                ExtAPI.invoke('resize', config).catch(error => {
                    console.log(error);
                    this._handleCommonErrors(error);
                });
            }
            _preventDefault(method) {
                return (evt, ctx) => {
                    evt.preventDefault();
                    method.call(this, evt, ctx);
                };
            }
            _handleCommonErrors(error) {
                this._handleOOBError(error.errors);
                this._handleProtocolError(error);
                if (error.FILE_PROTOCOL_PERMISSION) {
                    let title = 'Insufficient permissions';
                    let message = 'You need to explicitly allow access to <em>file://</em> URLs on the extensions management page.';
                    let action = { title: 'OK', handler: () => {
                            this.dismissMessage();
                            chrome.tabs.create({ url: 'chrome://extensions/?id=' + chrome.runtime.id });
                        } };
                    this.currentMessage = this._createMessage(title, message);
                    this.currentMessage.actions.push(action);
                }
                if (error.WEBSTORE_PERMISSION) {
                    let title = 'Permissions error';
                    let message = 'The tooltip can\'t be displayed on this tab because extensions are not allowed to alter the content of the Chrome Webstore pages.';
                    let action = { title: 'OK', handler: this.dismissMessage };
                    this.currentMessage = this._createMessage(title, message);
                    this.currentMessage.actions.push(action);
                }
            }
            _handleOOBError(error) {
                if (error && error.OUT_OF_BOUNDS) {
                    this.showError(`Chrome couldn't apply the exact desired dimensions!`);
                    return;
                    // var keys = error.OUT_OF_BOUNDS.keys;
                    // var errs = [];
                    // if (keys.indexOf('MAX_HEIGHT') > -1) {
                    // 	errs.push('the target <b>height</b> is greater than the maximum allowed by your current screen resolution');
                    // }
                    // if (keys.indexOf('MAX_WIDTH') > -1) {
                    // 	errs.push('the target <b>width</b> is greater than the maximum allowed by your current screen resolution');
                    // }
                    // if (keys.indexOf('MIN_HEIGHT') > -1) {
                    // 	errs.push('the target <b>height</b> is lower than the minimum allowed by your browser window');
                    // }
                    // if (keys.indexOf('MIN_WIDTH') > -1) {
                    // 	errs.push('the target <b>width</b> is lower than the maximum allowed by your browser window');
                    // }
                    // this.showMessage('ERROR', '<ul><li>' + errs.join('</li><li>') + '</li></ul><b>HINT:</b> Adjust the zoom level then try again. (Zoom in for fewer and zoom out for more CSS pixels)');
                }
            }
            _handleProtocolError(error) {
                if (error.INVALID_PROTOCOL) {
                    var err = error.INVALID_PROTOCOL;
                    if (!err.tab.url) {
                        let title = 'Insufficient permissions';
                        let message = 'In order for the extension to work on regular windows in <em>detached</em> mode, it needs to be able to inject custom code in the context of all pages, without user interaction.';
                        this.currentMessage = this._createMessage(title, message);
                        this.currentMessage.actions.push({ title: 'Cancel', handler: this.dismissMessage });
                        this.currentMessage.actions.push({ title: 'Grant permissions', main: true, handler: () => {
                                this.dismissMessage();
                                chrome.permissions.request({ permissions: ['tabs'], origins: ['<all_urls>'] }, granted => { });
                            } });
                    }
                    else {
                        this.showMessage('Invalid protocol: <b>' + String(err.protocol) + '://</b>', 'This feature only works on pages loaded using one of the following protocols: <br /><b>http://</b>, <b>https://</b> or <b>file://</b>');
                    }
                }
            }
            _showKeys() {
                this.showKeys = true;
            }
            _hideKeys() {
                this.showKeys = false;
            }
            _initPanels() {
                this._panels.push(new ListPanel('#presetsPanel', 'wr-preset'));
                this._panels.push(new ListPanel('#toolsPanel', 'button'));
                this._panel = this._panels[0];
            }
            _focusPanel(idx) {
                if (idx === 1 && this.collapsedSidebar) {
                    return;
                }
                let panel = this._panels[idx];
                if (panel != this._panel) {
                    this._panel && this._panel.blur();
                    this._panel = panel;
                    this._panel.focus();
                }
            }
            handleBannerClick(evt, ctx) {
                const target = evt.currentTarget;
                const url = target.getAttribute('data-url');
                const action = target.getAttribute('data-action');
                if (url) {
                    ExtAPI.invoke('open-url', { url }).catch(LOG_ERROR);
                }
                else {
                    ctx[action]();
                }
            }
            handlePresetClick(evt, ctx) {
                this._focusPanel(0);
                //this._panel.reset();
                this._panel.selectItem(evt.currentTarget);
                this.resizePreset(ctx);
                this.autoClosePopup && !isStandalonePopup() && window.close();
            }
            handleToolsClick(evt, ctx) {
                if (evt.target instanceof HTMLButtonElement) {
                    this._focusPanel(1);
                    this._panel.selectItem(evt.target);
                }
            }
            handleKeyDown(evt, ctx) {
                let keyCode = evt.keyCode;
                let handled = true;
                switch (keyCode) {
                    case Keys.SHIFT:
                        if (!this.showKeys) {
                            this.showKeys = true;
                        }
                        break;
                    case Keys.SPACE:
                    case Keys.ENTER:
                        $.addClass(this._panel.currentNode(), 'active');
                        break;
                    case Keys.UP:
                        this._panel.prev();
                        break;
                    case Keys.DOWN:
                        this._panel.next();
                        break;
                    case Keys.RIGHT:
                        this._focusPanel(1);
                        break;
                    case Keys.LEFT:
                        this._focusPanel(0);
                        break;
                    default:
                        handled = false;
                        break;
                }
                let node = _getPresetByKeyCode(keyCode);
                if (node) {
                    this._panel.focus();
                    this._focusPanel(0);
                    this._panel.selectItem(node);
                    $.addClass(node, 'active');
                    handled = true;
                }
                if (!handled) {
                    let char = String.fromCharCode(keyCode);
                    let node = $.q(`[data-key="${char}"]`);
                    if (node) {
                        this._panel.focus();
                        this._focusPanel(1);
                        this._panel.selectItem(node);
                        $.addClass(node, 'active');
                        handled = true;
                    }
                }
                if (handled) {
                    evt.preventDefault();
                }
            }
            handleKeyUp(evt, ctx) {
                let keyCode = evt.keyCode;
                let handled = true;
                switch (keyCode) {
                    case Keys.SHIFT:
                        if (this.showKeys) {
                            this.showKeys = false;
                        }
                        break;
                    case Keys.SPACE:
                    case Keys.ENTER:
                        $.removeClass(this._panel.currentNode(), 'active');
                        $.trigger('click', this._panel.currentNode());
                        break;
                    default:
                        handled = false;
                        break;
                }
                let node = _getPresetByKeyCode(keyCode);
                if (node) {
                    $.removeClass(node, 'active');
                    $.trigger('click', node);
                    handled = true;
                }
                if (!handled) {
                    let char = String.fromCharCode(keyCode);
                    let node = $.q(`[data-key="${char}"]`);
                    if (node) {
                        $.removeClass(node, 'active');
                        $.trigger('click', node);
                        handled = true;
                    }
                }
                if (handled) {
                    evt.preventDefault();
                }
            }
            initNavigation() {
                let main = $.q('#main');
                $.on('keydown', main, this.handleKeyDown, true);
                $.on('keyup', main, this.handleKeyUp, true);
                let h = new FocusHandler(main);
                main.focus();
            }
        }
        Popup_1.Popup = Popup;
        class FocusHandler {
            constructor(target) {
                this.ignore = false;
                this.focused = false;
                this.target = target;
                this.__initHandlers();
                $.on('focus', this.target, this.onFocus, true);
                $.on('blur', this.target, this.onBlur, true);
                $.on('mousedown', this.target, this.onMouseDown, true);
                $.on('keydown', document, this.onKeyDown, true);
            }
            __initHandlers() {
                var handlers = ['onFocus', 'onBlur', 'onKeyDown', 'onMouseDown'];
                for (var method of handlers) {
                    this[method] = __eventHandler(this, this[method]);
                }
                function __eventHandler(context, method) {
                    return function (evt) {
                        return method.call(context, evt, this);
                    };
                }
            }
            onBlur(evt) {
                if (!this.target.contains(evt.relatedTarget)) {
                    $.removeClass(this.target, 'focused');
                }
                this.focused = false;
            }
            onFocus(evt) {
                if (!this.ignore) {
                    $.addClass(this.target, 'focused');
                }
                this.focused = true;
            }
            onKeyDown(evt) {
                this.ignore = false;
                if (this.focused) {
                    $.addClass(this.target, 'focused');
                }
            }
            onMouseDown(evt) {
                $.removeClass(this.target, 'focused');
                this.ignore = true;
            }
        }
        function _stealFocus(evt, ctx) {
            evt.preventDefault();
            evt.stopPropagation();
            this.focus();
        }
        function _getPresetByKeyCode(keyCode) {
            var node;
            if ((keyCode >= Keys.DIGITS[0] && keyCode <= Keys.DIGITS[1])
                || (keyCode >= Keys.NUMPAD[0] && keyCode <= Keys.NUMPAD[1])) {
                let idx = (keyCode % 48) || 10;
                node = $.q(`wr-preset:nth-of-type(${idx})`);
            }
            return node;
        }
        class ListPanel {
            constructor(parent, list) {
                this.parent = null;
                this.list = null;
                this.current = -1;
                this.autoInit = true;
                this._selected = 'selected';
                this._focused = 'focused';
                this.parent = $.q(parent);
                this.list = list;
            }
            next() {
                let nodes = $.qAll(this.list, this.parent);
                let next = (this.current + 1) % nodes.length;
                this.select(next, nodes);
            }
            prev() {
                let nodes = $.qAll(this.list, this.parent);
                let prev = (nodes.length + this.current - 1) % nodes.length;
                this.select(prev, nodes);
            }
            select(next, nodes, noFocus) {
                for (let i = 0, l = nodes.length; i < l; i++) {
                    let node = nodes[i];
                    node.classList.remove(this._selected);
                }
                let node = nodes[next];
                this._selectNode(node);
                this.current = next;
                if (!noFocus) {
                    this.focus();
                }
            }
            focus() {
                this.parent.classList.add('focused');
                if (this.autoInit && this.current < 0) {
                    this.next();
                }
                this._selectNode(this.currentNode());
            }
            blur() {
                this.parent.classList.remove('focused');
            }
            reset() {
                let nodes = $.qAll(this.list, this.parent);
                for (let i = 0, l = nodes.length; i < l; i++) {
                    let node = nodes[i];
                    node.classList.remove(this._selected);
                }
                this.current = -1;
            }
            selectItem(item) {
                let nodes = $.qAll(this.list, this.parent);
                let found = -1;
                for (let i = 0, l = nodes.length; i < l; i++) {
                    if (item == nodes[i]) {
                        found = i;
                    }
                }
                if (found > -1 && found != this.current) {
                    let node = nodes[found];
                    this.reset();
                    this._selectNode(node);
                    this.current = found;
                }
            }
            currentNode() {
                let nodes = $.qAll(this.list, this.parent);
                return nodes[this.current];
            }
            _selectNode(node) {
                node.classList.add(this._selected);
                node.setAttribute('tabindex', '0');
                node.focus();
                node.setAttribute('tabindex', '-1');
            }
        }
        Popup_1.view = new Popup();
        var binding = rivets.bind(document.body, Popup_1.view);
        Popup_1.view.initNavigation();
        chrome.runtime.onMessage.addListener(msg => {
            if (msg.UpdatedSettings) {
                if ('license' in msg.UpdatedSettings) {
                    Popup_1.view.currentBanner = null;
                }
                if ('presetsIconsStyle' in msg.UpdatedSettings) {
                    Popup_1.view.presetsIconsStyle = msg.UpdatedSettings.presetsIconsStyle;
                }
                if ('presetsPrimaryLine' in msg.UpdatedSettings) {
                    Popup_1.view.presetsPrimaryLine = msg.UpdatedSettings.presetsPrimaryLine;
                }
                if ('alternatePresetsBg' in msg.UpdatedSettings) {
                    Popup_1.view.alternatePresetsBg = msg.UpdatedSettings.alternatePresetsBg;
                }
                if ('autoClosePopup' in msg.UpdatedSettings) {
                    Popup_1.view.autoClosePopup = msg.UpdatedSettings.autoClosePopup;
                }
                if ('hidePresetsDescription' in msg.UpdatedSettings) {
                    Popup_1.view.hidePresetsDescription = msg.UpdatedSettings.hidePresetsDescription;
                }
                if ('hidePopupTooltips' in msg.UpdatedSettings) {
                    Popup_1.view.hidePopupTooltips = msg.UpdatedSettings.hidePopupTooltips;
                }
                if ('hideQuickResize' in msg.UpdatedSettings) {
                    Popup_1.view.hideQuickResize = msg.UpdatedSettings.hideQuickResize;
                    window.localStorage['hideQuickResize'] = msg.UpdatedSettings.hideQuickResize ? 1 : 0;
                }
                if ('presets' in msg.UpdatedSettings) {
                    Popup_1.view.presets = [];
                    for (let presetData of msg.UpdatedSettings.presets) {
                        Popup_1.view.presets.push(new Core.Preset(presetData));
                    }
                }
            }
        });
        function LOG_ERROR(err) {
            console.log(err);
        }
        function isStandalonePopup() {
            return window.location.hash.indexOf('popup-view') > -1;
        }
        function _constrainWindowSize() {
            var limit = {};
            if (window.innerWidth < 340) {
                limit.width = 340 + window.outerWidth - window.innerWidth;
            }
            if (window.innerHeight < 400) {
                limit.height = 400 + window.outerHeight - window.innerHeight;
            }
            if (limit.width || limit.height) {
                ExtAPI.invoke('limit-popup', limit);
            }
        }
        if (isStandalonePopup()) {
            window.addEventListener('resize', _constrainWindowSize);
        }
    })(Popup = Views.Popup || (Views.Popup = {}));
})(Views || (Views = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy92aWV3cy9wb3B1cC9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxREFBcUQ7QUFDckQscURBQXFEO0FBQ3JELHNEQUFzRDtBQUN0RCxxREFBcUQ7QUFFckQsSUFBTyxLQUFLLENBc3lCWDtBQXR5QkQsV0FBTyxLQUFLO0lBQUMsSUFBQSxLQUFLLENBc3lCakI7SUF0eUJZLFdBQUEsT0FBSztRQUNqQixJQUFPLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM5QixJQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUUxQixJQUFPLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUdoRDtZQUNDLFlBQ1EsR0FBVyxFQUNYLEtBQWEsRUFDYixPQUFlLEVBQ2YsU0FBaUIsTUFBTTtnQkFIdkIsUUFBRyxHQUFILEdBQUcsQ0FBUTtnQkFDWCxVQUFLLEdBQUwsS0FBSyxDQUFRO2dCQUNiLFlBQU8sR0FBUCxPQUFPLENBQVE7Z0JBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7WUFDNUIsQ0FBQztTQUNKO1FBUFksdUJBQWUsa0JBTzNCLENBQUE7UUFFRDtZQTJCQztnQkExQkEsWUFBTyxHQUFVLEVBQUUsQ0FBQztnQkFDcEIsVUFBSyxHQUFHLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztnQkFDL0MsYUFBUSxHQUFHLEtBQUssQ0FBQztnQkFLakIsdUJBQWtCLEdBQVksS0FBSyxDQUFDO2dCQUNwQyxtQkFBYyxHQUFZLEtBQUssQ0FBQztnQkFDaEMsMkJBQXNCLEdBQVksS0FBSyxDQUFDO2dCQUN4QyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7Z0JBQ25DLG9CQUFlLEdBQVksS0FBSyxDQUFDO2dCQUd2QixZQUFPLEdBQWdCLEVBQUUsQ0FBQztnQkFDMUIsZ0JBQVcsR0FB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Z0JBQWdCLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDekQsQ0FBQztJQUNGLENBQUMsRUF0eUJZLEtBQUssR0FBTCxXQUFLLEtBQUwsV0FBSyxRQXN5QmpCO0FBQUQsQ0FBQyxFQXR5Qk0sS0FBSyxLQUFMLEtBQUssUUFzeUJYIiwiZmlsZSI6InZpZXdzL3BvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3Mvcml2ZXRzLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy9FeHRBUEkuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RhYi1uYXYuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBWaWV3cy5Qb3B1cCB7XHJcblx0aW1wb3J0IEtleXMgPSBDb3JlLklucHV0LktleXM7XHJcblx0aW1wb3J0ICQgPSBDb3JlLlV0aWxzLkRPTTtcclxuXHJcblx0aW1wb3J0IE1vZGFsTWVzc2FnZSA9IFZpZXdzLkNvbW1vbi5Nb2RhbE1lc3NhZ2U7XHJcblx0aW1wb3J0IE1vZGFsTWVzc2FnZUFjdGlvbiA9IFZpZXdzLkNvbW1vbi5Nb2RhbE1lc3NhZ2VBY3Rpb247XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBBZmZpbGlhdGVCYW5uZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHB1YmxpYyB1cmw6IHN0cmluZyxcclxuXHRcdFx0cHVibGljIGltYWdlOiBzdHJpbmcsXHJcblx0XHRcdHB1YmxpYyBjYXB0aW9uOiBzdHJpbmcsXHJcblx0XHRcdHB1YmxpYyBhY2NlbnQ6IHN0cmluZyA9ICcjZWVlJ1xyXG5cdFx0KSB7fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFBvcHVwIHtcclxuXHRcdHByZXNldHM6IGFueVtdID0gW107XHJcblx0XHRxdWljayA9IHt3aWR0aDogbnVsbCwgaGVpZ2h0OiBudWxsLCB0YXJnZXQ6IDB9O1xyXG5cdFx0c2hvd0tleXMgPSBmYWxzZTtcclxuXHJcblx0XHRjdXJyZW50TWVzc2FnZTogTW9kYWxNZXNzYWdlO1xyXG5cdFx0Y3VycmVudEJhbm5lcjogQWZmaWxpYXRlQmFubmVyO1xyXG5cclxuXHRcdGFsdGVybmF0ZVByZXNldHNCZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdFx0YXV0b0Nsb3NlUG9wdXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRcdGhpZGVQcmVzZXRzRGVzY3JpcHRpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRcdGhpZGVQb3B1cFRvb2x0aXBzOiBib29sZWFuID0gZmFsc2U7XHJcblx0XHRoaWRlUXVpY2tSZXNpemU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0XHRwcm90ZWN0ZWQgX3BhbmVsOiBMaXN0UGFuZWw7XHJcblx0XHRwcm90ZWN0ZWQgX3BhbmVsczogTGlzdFBhbmVsW10gPSBbXTtcclxuXHRcdHByb3RlY3RlZCBfY2xpY2tGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRcdHB1YmxpYyBsaWNlbnNlOiBhbnkgPSBudWxsO1xyXG5cdFx0cHVibGljIGNvbGxhcHNlZFNpZGViYXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0XHRwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmcgPSBudWxsO1xyXG5cdFx0cHVibGljIGVycm9yTWVzc2FnZVRpbWVvdXQ6IGFueSA9IG51bGw7XHJcblx0XHRwdWJsaWMgc2hvd1F1aWNrVGlwczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdFx0cHVibGljIHByZXNldHNJY29uc1N0eWxlOiBzdHJpbmcgPSAnJztcclxuXHRcdHB1YmxpYyBwcmVzZXRzUHJpbWFyeUxpbmU6IHN0cmluZyA9ICcnO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0XHR0aGlzLnByZXNldHMgPSBbXTtcclxuXHRcdFx0dGhpcy5jb2xsYXBzZWRTaWRlYmFyID0gd2luZG93LmxvY2FsU3RvcmFnZVsnY29sbGFwc2VkLXNpZGViYXInXSA9PT0gJzEnO1xyXG5cdFx0XHR0aGlzLmhpZGVRdWlja1Jlc2l6ZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ2hpZGVRdWlja1Jlc2l6ZSddID09PSAnMSc7XHJcblx0XHRcdHRoaXMuc2hvd1F1aWNrVGlwcyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ3Nob3dRdWlja1RpcHMnXSAhPT0gJzAnO1xyXG5cclxuXHRcdFx0dGhpcy5faW5pdFBhbmVscygpO1xyXG5cclxuXHRcdFx0dGhpcy5xdWlja1Jlc2l6ZSA9IHRoaXMuX3ByZXZlbnREZWZhdWx0KHRoaXMucXVpY2tSZXNpemUpO1xyXG5cclxuXHRcdFx0dGhpcy5oYW5kbGVQcmVzZXRDbGljayA9IHRoaXMuaGFuZGxlUHJlc2V0Q2xpY2suYmluZCh0aGlzKTtcclxuXHRcdFx0dGhpcy5oYW5kbGVUb29sc0NsaWNrICA9IHRoaXMuaGFuZGxlVG9vbHNDbGljay5iaW5kKHRoaXMpO1xyXG5cdFx0XHR0aGlzLnRvZ2dsZVJlc2l6ZUluZm8gID0gdGhpcy50b2dnbGVSZXNpemVJbmZvLmJpbmQodGhpcyk7XHJcblx0XHRcdHRoaXMucm90YXRlVmlld3BvcnQgICAgPSB0aGlzLnJvdGF0ZVZpZXdwb3J0LmJpbmQodGhpcyk7XHJcblxyXG5cdFx0XHR0aGlzLmhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcclxuXHRcdFx0dGhpcy5oYW5kbGVLZXlVcCA9IHRoaXMuaGFuZGxlS2V5VXAuYmluZCh0aGlzKTtcclxuXHJcblx0XHRcdHRoaXMuX3Nob3dLZXlzID0gdGhpcy5fc2hvd0tleXMuYmluZCh0aGlzKTtcclxuXHRcdFx0dGhpcy5faGlkZUtleXMgPSB0aGlzLl9oaWRlS2V5cy5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdFx0dGhpcy5kaXNtaXNzTWVzc2FnZSA9IHRoaXMuZGlzbWlzc01lc3NhZ2UuYmluZCh0aGlzKTtcclxuXHRcdFx0dGhpcy5oaWRlQmFubmVyID0gdGhpcy5oaWRlQmFubmVyLmJpbmQodGhpcyk7XHJcblxyXG5cdFx0XHRFeHRBUEkuaW52b2tlKCdnZXQtYmFubmVyJykudGhlbihiID0+IHRoaXMuc2hvd0Jhbm5lcihiKSkuY2F0Y2goTE9HX0VSUk9SKTtcclxuXHRcdFx0RXh0QVBJLmludm9rZSgnZ2V0LXNldHRpbmdzJykudGhlbihzZXR0aW5ncyA9PiB7XHJcblx0XHRcdFx0dGhpcy5wcmVzZXRzSWNvbnNTdHlsZSA9IHNldHRpbmdzLnByZXNldHNJY29uc1N0eWxlO1xyXG5cdFx0XHRcdHRoaXMucHJlc2V0c1ByaW1hcnlMaW5lID0gc2V0dGluZ3MucHJlc2V0c1ByaW1hcnlMaW5lO1xyXG5cdFx0XHRcdHRoaXMuYWx0ZXJuYXRlUHJlc2V0c0JnID0gc2V0dGluZ3MuYWx0ZXJuYXRlUHJlc2V0c0JnO1xyXG5cdFx0XHRcdHRoaXMuYXV0b0Nsb3NlUG9wdXAgPSBzZXR0aW5ncy5hdXRvQ2xvc2VQb3B1cDtcclxuXHRcdFx0XHR0aGlzLmhpZGVQcmVzZXRzRGVzY3JpcHRpb24gPSBzZXR0aW5ncy5oaWRlUHJlc2V0c0Rlc2NyaXB0aW9uO1xyXG5cdFx0XHRcdHRoaXMuaGlkZVBvcHVwVG9vbHRpcHMgPSBzZXR0aW5ncy5oaWRlUG9wdXBUb29sdGlwcztcclxuXHRcdFx0XHR0aGlzLmhpZGVRdWlja1Jlc2l6ZSA9IHNldHRpbmdzLmhpZGVRdWlja1Jlc2l6ZTtcclxuXHRcdFx0XHR3aW5kb3cubG9jYWxTdG9yYWdlWydoaWRlUXVpY2tSZXNpemUnXSA9IHNldHRpbmdzLmhpZGVRdWlja1Jlc2l6ZSA/IDEgOiAwO1xyXG5cdFx0XHRcdHRoaXMubGljZW5zZSA9IHNldHRpbmdzLmxpY2Vuc2U7XHJcblxyXG5cdFx0XHRcdGZvciAobGV0IHByZXNldERhdGEgb2Ygc2V0dGluZ3MucHJlc2V0cykge1xyXG5cdFx0XHRcdFx0dGhpcy5wcmVzZXRzLnB1c2gobmV3IENvcmUuUHJlc2V0KHByZXNldERhdGEpKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRoaXMuX3Nob3dUaGVVcGRhdGVNZXNzYWdlKCk7XHJcblx0XHRcdH0pLmNhdGNoKExPR19FUlJPUik7XHJcblx0XHR9XHJcblxyXG5cdFx0X3Nob3dUaGVVcGRhdGVNZXNzYWdlKCkge1xyXG5cdFx0XHRsZXQgdXBkYXRlZCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ3dhc1VwZGF0ZWQnXTtcclxuXHJcblx0XHRcdGlmICh1cGRhdGVkKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TWVzc2FnZSgnVVBEQVRFRCcsICcnKTtcclxuXHRcdFx0XHRsZXQgbW9kYWxNc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0XHRjb25zdCBfY2xlYW51cCA9ICgpID0+IHtcclxuXHRcdFx0XHRcdG1vZGFsVmlldy51bmJpbmQoKTtcclxuXHRcdFx0XHRcdHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnd2FzVXBkYXRlZCcpO1xyXG5cdFx0XHRcdFx0Y2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHt0ZXh0IDogJyd9KTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRpZiAodXBkYXRlZCA9PSAxKSB7XHJcblx0XHRcdFx0XHRtb2RhbE1zZy5pbm5lckhUTUwgPSBgXHJcblx0XHRcdFx0XHRcdDxwPlxyXG5cdFx0XHRcdFx0XHRcdFdpbmRvdyBSZXNpemVyIGhhcyBqdXN0IHJlY2VpdmVkIGEgbWFqb3IgdXBkYXRlLCBicmluZ2luZyBsb3RzIG9mXHJcblx0XHRcdFx0XHRcdFx0Y2hhbmdlcyBsaWtlIGEgbmV3IFVJLCBhIHJvdGF0ZSB0b29sLCBiZXR0ZXIgY29udHJvbCBvZiB0aGUgcmVzaXplXHJcblx0XHRcdFx0XHRcdFx0dG9vbHRpcCBhbmQgcGxlbnR5IG1vcmUhXHJcblx0XHRcdFx0XHRcdDwvcD5cclxuXHJcblx0XHRcdFx0XHRcdDxhIHJ2LW9uLWNsaWNrPVwic2hvd1JlbGVhc2VOb3Rlc1wiIGhyZWY9XCIjXCI+JnJhcXVvOyBSZWFkIG1vcmU8L2E+XHJcblx0XHRcdFx0XHRgO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRtb2RhbE1zZy5pbm5lckhUTUwgPSBgXHJcblx0XHRcdFx0XHRcdDx1bD5cclxuXHRcdFx0XHRcdFx0XHQ8bGk+PGI+Rml4ZWQ8L2I+IGFuIGlzc3VlIHdpdGggcmUtb3JkZXJpbmcgdGhlIHByZXNldHMuPC9saT5cclxuXHRcdFx0XHRcdFx0XHQ8bGk+PGI+TW9kaWZpZWQ8L2I+IHRoZSBzZXR0aW5ncyBwYWdlIGJlaGF2aW91ciAoaXQgbm93IG9wZW5zIGFzIGEgZnVsbCBwYWdlKS48L2xpPlxyXG5cdFx0XHRcdFx0XHRcdDxsaT48Yj5SZW1vdmVkPC9iPiBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgYWJvdXQgXFxgY3JlYXRlU2hhZG93Um9vdFxcYC48L2xpPlxyXG5cdFx0XHRcdFx0XHRcdDxsaT48Yj5GaXhlZDwvYj4gc29tZSBpc3N1ZXMgd2l0aCBhY2Nlc3NpYmlsaXR5IGF1ZGl0cyAmIHN0dWZmLi4uPC9saT5cclxuXHRcdFx0XHRcdFx0PC91bD5cclxuXHJcblx0XHRcdFx0XHRcdDxhIHJ2LW9uLWNsaWNrPVwic2hvd1JlbGVhc2VOb3Rlc1wiIGhyZWY9XCIjXCI+JnJhcXVvOyBGaW5kIG91dCBtb3JlPC9hPlxyXG5cdFx0XHRcdFx0YDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICghdGhpcy5saWNlbnNlKSB7XHJcblx0XHRcdFx0XHRtb2RhbE1zZy5pbm5lckhUTUwgKz0gYFxyXG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyOyBtYXJnaW46IDE0cHggMCAtMTBweDsgcGFkZGluZzogMTRweCAwIDA7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkO1wiPlxyXG5cdFx0XHRcdFx0XHRcdDxzdHJvbmc+V2FudCB0byBzdXBwb3J0IHRoaXMgZXh0ZW5zaW9uPzwvc3Ryb25nPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PHN0eWxlPi5XUl9tb2RhbF9hY3Rpb25ze3RleHQtYWxpZ246Y2VudGVyfTwvc3R5bGU+XHJcblx0XHRcdFx0XHRgO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UuYWN0aW9uc1swXS50aXRsZSA9ICdPaywgd2hhdGV2ZXIhJztcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UuYWN0aW9uc1swXS50aXRsZSA9ICdOYWgsIElcXCdtIGdvb2QnO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UuYWN0aW9ucy51bnNoaWZ0KHt0aXRsZTogJ0J1eSBQcm8nLCBpY29uOiAnI2ljb24tY2FydCcsIG1haW46IHRydWUsIGhhbmRsZXI6ICgpID0+IHtcclxuXHRcdFx0XHRcdFx0X2NsZWFudXAoKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5zaG93UHJvUGFnZSh7fSwgdGhpcyk7XHJcblx0XHRcdFx0XHR9fSlcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGxldCBtb2RhbFZpZXcgPSByaXZldHMuYmluZChtb2RhbE1zZywgdGhpcyk7XHJcblx0XHRcdFx0JC5xKCcuV1JfbW9kYWxfbWVzc2FnZScpLmFwcGVuZENoaWxkKG1vZGFsTXNnKTtcclxuXHJcblx0XHRcdFx0dGhpcy5jdXJyZW50TWVzc2FnZS5vbkNsb3NlLmFkZExpc3RlbmVyKF9jbGVhbnVwKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGRpc21pc3NNZXNzYWdlKCkge1xyXG5cdFx0XHRUYWJOYXYucmVzZXQoKTtcclxuXHJcblx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UuaGlkZSgpLnRoZW4oeCA9PiB7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50TWVzc2FnZSA9IG51bGw7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdF9jcmVhdGVNZXNzYWdlKHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IE1vZGFsTWVzc2FnZSB7XHJcblx0XHRcdGxldCBtb2RhbCA9IG5ldyBNb2RhbE1lc3NhZ2UodGl0bGUsIG1lc3NhZ2UpO1xyXG5cclxuXHRcdFx0bW9kYWwub25DbG9zZS5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5fcGFuZWwuZm9jdXMoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gbW9kYWw7XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd01lc3NhZ2UodGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UgPSB0aGlzLl9jcmVhdGVNZXNzYWdlKHRpdGxlLCBtZXNzYWdlKTtcclxuXHRcdFx0dGhpcy5jdXJyZW50TWVzc2FnZS5hY3Rpb25zLnB1c2goe3RpdGxlOiAnT0snLCBoYW5kbGVyOiB0aGlzLmRpc21pc3NNZXNzYWdlfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd1JlbGVhc2VOb3RlcyhldnQsIGN0eCkge1xyXG5cdFx0XHRjdHguY3VycmVudE1lc3NhZ2UuaGlkZSgpLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRcdGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7dGV4dCA6ICcnfSk7XHJcblxyXG5cdFx0XHRcdEV4dEFQSS5pbnZva2UoJ29wZW4tcmVsZWFzZS1ub3RlcycpLmNhdGNoKGVycm9yID0+IHtcclxuXHRcdFx0XHRcdGN0eC5faGFuZGxlQ29tbW9uRXJyb3JzKGVycm9yKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRzaG93UHJvUGFnZShldnQsIGN0eCkge1xyXG5cdFx0XHRFeHRBUEkuaW52b2tlKCdvcGVuLXByby1wYWdlJykuY2F0Y2goZXJyb3IgPT4ge1xyXG5cdFx0XHRcdGN0eC5faGFuZGxlQ29tbW9uRXJyb3JzKGVycm9yKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd0Vycm9yKG1lc3NhZ2UpIHtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuZXJyb3JNZXNzYWdlVGltZW91dCk7XHJcblx0XHRcdHRoaXMuZXJyb3JNZXNzYWdlID0gbWVzc2FnZTtcclxuXHRcdFx0dGhpcy5lcnJvck1lc3NhZ2VUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGVFcnJvcigpLCAyMDAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRoaWRlRXJyb3IgPSAoKSA9PiB7XHJcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLmVycm9yTWVzc2FnZVRpbWVvdXQpO1xyXG5cdFx0XHR0aGlzLmVycm9yTWVzc2FnZVRpbWVvdXQgPSBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGhpZGVRdWlja1RpcHMgPSAoKSA9PiB7XHJcblx0XHRcdHRoaXMuc2hvd1F1aWNrVGlwcyA9IGZhbHNlO1xyXG5cdFx0XHR3aW5kb3cubG9jYWxTdG9yYWdlWydzaG93UXVpY2tUaXBzJ10gPSAnMCc7XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd0Jhbm5lcihiYW5uZXI6IEFmZmlsaWF0ZUJhbm5lcikge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRCYW5uZXIgPSBiYW5uZXI7XHJcblxyXG5cdFx0XHRpZiAoYmFubmVyKSB7XHJcblx0XHRcdFx0bGV0IHNoZWV0ID0gPENTU1N0eWxlU2hlZXQ+IHdpbmRvdy5kb2N1bWVudC5zdHlsZVNoZWV0c1swXTtcclxuXHRcdFx0XHRzaGVldC5pbnNlcnRSdWxlKGAjcHJvbW8gLmJhbm5lcjpob3ZlciAuZGltIHsgY29sb3I6ICR7YmFubmVyLmFjY2VudH07IH1gLCBzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xyXG5cclxuXHRcdFx0XHQkLmFkZENsYXNzKCcjcHJvbW8nLCAndmlzaWJsZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZUJhbm5lcigpIHtcclxuXHRcdFx0JC5oaWRlKCcjcHJvbW8nKTtcclxuXHRcdFx0JC5hZGRDbGFzcygnI2luZm8nLCAnZW1wdHknKTtcclxuXHRcdFx0Ly90aGlzLmN1cnJlbnRCYW5uZXIgPSBudWxsO1xyXG5cclxuXHRcdFx0RXh0QVBJLmludm9rZSgnaGlkZS1iYW5uZXInKS50aGVuKGZpcnN0VGltZSA9PiB7XHJcblx0XHRcdFx0aWYgKCFmaXJzdFRpbWUpIHJldHVybjtcclxuXHJcblx0XHRcdFx0Ly8gdGhpcy5zaG93TWVzc2FnZSgnTm90aWNlJywgJ05vIG1vcmUgcmVjb21tZW5kYXRpb25zIGZvciB5b3UgdG9kYXkhPGJyIC8+U2VlIHlvdSBhZ2FpbiB0b21vcnJvdyEgOiknKTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRxdWlja1Jlc2l6ZShldnQsIGN0eCkge1xyXG5cdFx0XHR0aGlzLl9yZXNpemUodGhpcy5xdWljayk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzaXplUHJlc2V0KGN0eCkge1xyXG5cdFx0XHR0aGlzLl9yZXNpemUoY3R4Lml0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9wZW5QcmVzZXRzU2V0dGluZ3MoZXZ0LCBjdHgpIHtcclxuXHRcdFx0RXh0QVBJLmludm9rZSgnb3Blbi1wcmVzZXRzLXNldHRpbmdzJykuY2F0Y2goZXJyb3IgPT4ge1xyXG5cdFx0XHRcdGN0eC5faGFuZGxlQ29tbW9uRXJyb3JzKGVycm9yKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0b3BlblNldHRpbmdzKGV2dCwgY3R4KSB7XHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ29wZW4tc2V0dGluZ3MnKS5jYXRjaChlcnJvciA9PiB7XHJcblx0XHRcdFx0Y3R4Ll9oYW5kbGVDb21tb25FcnJvcnMoZXJyb3IpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRidWdSZXBvcnQoZXZ0LCBjdHgpIHtcclxuXHRcdFx0RXh0QVBJLmludm9rZSgnb3Blbi11cmwnLCB7XHJcblx0XHRcdFx0dXJsOiAnaHR0cHM6Ly93aW5kb3dyZXNpemVyLnVzZXJlY2hvLmNvbS8nXHJcblx0XHRcdH0pLmNhdGNoKExPR19FUlJPUik7XHJcblx0XHR9XHJcblxyXG5cdFx0dG9nZ2xlUmVzaXplSW5mbyhldnQsIGN0eCkge1xyXG5cdFx0XHRFeHRBUEkuaW52b2tlKCd0b2dnbGUtdG9vbHRpcCcpLmNhdGNoKGVycm9yID0+IHtcclxuXHRcdFx0XHRjdHguX2hhbmRsZUNvbW1vbkVycm9ycyhlcnJvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9wZW5Bc1BvcHVwKGV2dCwgY3R4KSB7XHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ29wZW4tYXMtcG9wdXAnKS50aGVuKHJlc3BvbnNlID0+IHtcclxuXHRcdFx0XHQhaXNTdGFuZGFsb25lUG9wdXAoKSAmJiB3aW5kb3cuY2xvc2UoKTtcclxuXHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xyXG5cdFx0XHRcdGN0eC5faGFuZGxlQ29tbW9uRXJyb3JzKGVycm9yKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cm90YXRlVmlld3BvcnQoKSB7XHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ3JvdGF0ZS12aWV3cG9ydCcpLmNhdGNoKGVycm9yID0+IHtcclxuXHRcdFx0XHR0aGlzLl9oYW5kbGVDb21tb25FcnJvcnMoZXJyb3IpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHR0b2dnbGVTaWRlYmFyKGV2dCwgY3R4KSB7XHJcblx0XHRcdGN0eC5jb2xsYXBzZWRTaWRlYmFyID0gIWN0eC5jb2xsYXBzZWRTaWRlYmFyO1xyXG5cdFx0XHR3aW5kb3cubG9jYWxTdG9yYWdlWydjb2xsYXBzZWQtc2lkZWJhciddID0gY3R4LmNvbGxhcHNlZFNpZGViYXIgPyAxIDogMDtcclxuXHRcdFx0Y3R4Ll9mb2N1c1BhbmVsKDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdF9yZXNpemUoY29uZmlnKSB7XHJcblx0XHRcdHRoaXMuaGlkZUVycm9yKCk7XHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ3Jlc2l6ZScsIGNvbmZpZykuY2F0Y2goZXJyb3IgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycm9yKVxyXG5cdFx0XHRcdHRoaXMuX2hhbmRsZUNvbW1vbkVycm9ycyhlcnJvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdF9wcmV2ZW50RGVmYXVsdChtZXRob2QpIHtcclxuXHRcdFx0cmV0dXJuIChldnQsIGN0eCkgPT4ge1xyXG5cdFx0XHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdG1ldGhvZC5jYWxsKHRoaXMsIGV2dCwgY3R4KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdF9oYW5kbGVDb21tb25FcnJvcnMoZXJyb3IpIHtcclxuXHRcdFx0dGhpcy5faGFuZGxlT09CRXJyb3IoZXJyb3IuZXJyb3JzKTtcclxuXHRcdFx0dGhpcy5faGFuZGxlUHJvdG9jb2xFcnJvcihlcnJvcik7XHJcblxyXG5cdFx0XHRpZiAoZXJyb3IuRklMRV9QUk9UT0NPTF9QRVJNSVNTSU9OKSB7XHJcblx0XHRcdFx0bGV0IHRpdGxlICAgPSAnSW5zdWZmaWNpZW50IHBlcm1pc3Npb25zJztcclxuXHRcdFx0XHRsZXQgbWVzc2FnZSA9ICdZb3UgbmVlZCB0byBleHBsaWNpdGx5IGFsbG93IGFjY2VzcyB0byA8ZW0+ZmlsZTovLzwvZW0+IFVSTHMgb24gdGhlIGV4dGVuc2lvbnMgbWFuYWdlbWVudCBwYWdlLic7XHJcblx0XHRcdFx0bGV0IGFjdGlvbiAgPSB7dGl0bGU6ICdPSycsIGhhbmRsZXI6ICgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuZGlzbWlzc01lc3NhZ2UoKTtcclxuXHRcdFx0XHRcdGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsOiAnY2hyb21lOi8vZXh0ZW5zaW9ucy8/aWQ9JyArIGNocm9tZS5ydW50aW1lLmlkfSk7XHJcblx0XHRcdFx0fX1cclxuXHJcblx0XHRcdFx0dGhpcy5jdXJyZW50TWVzc2FnZSA9IHRoaXMuX2NyZWF0ZU1lc3NhZ2UodGl0bGUsIG1lc3NhZ2UpO1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UuYWN0aW9ucy5wdXNoKGFjdGlvbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChlcnJvci5XRUJTVE9SRV9QRVJNSVNTSU9OKSB7XHJcblx0XHRcdFx0bGV0IHRpdGxlICAgPSAnUGVybWlzc2lvbnMgZXJyb3InO1xyXG5cdFx0XHRcdGxldCBtZXNzYWdlID0gJ1RoZSB0b29sdGlwIGNhblxcJ3QgYmUgZGlzcGxheWVkIG9uIHRoaXMgdGFiIGJlY2F1c2UgZXh0ZW5zaW9ucyBhcmUgbm90IGFsbG93ZWQgdG8gYWx0ZXIgdGhlIGNvbnRlbnQgb2YgdGhlIENocm9tZSBXZWJzdG9yZSBwYWdlcy4nO1xyXG5cdFx0XHRcdGxldCBhY3Rpb24gID0ge3RpdGxlOiAnT0snLCBoYW5kbGVyOiB0aGlzLmRpc21pc3NNZXNzYWdlfTtcclxuXHJcblx0XHRcdFx0dGhpcy5jdXJyZW50TWVzc2FnZSA9IHRoaXMuX2NyZWF0ZU1lc3NhZ2UodGl0bGUsIG1lc3NhZ2UpO1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UuYWN0aW9ucy5wdXNoKGFjdGlvbik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRfaGFuZGxlT09CRXJyb3IoZXJyb3IpIHtcclxuXHRcdFx0aWYgKGVycm9yICYmIGVycm9yLk9VVF9PRl9CT1VORFMpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dFcnJvcihgQ2hyb21lIGNvdWxkbid0IGFwcGx5IHRoZSBleGFjdCBkZXNpcmVkIGRpbWVuc2lvbnMhYCk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHQvLyB2YXIga2V5cyA9IGVycm9yLk9VVF9PRl9CT1VORFMua2V5cztcclxuXHRcdFx0XHQvLyB2YXIgZXJycyA9IFtdO1xyXG5cclxuXHRcdFx0XHQvLyBpZiAoa2V5cy5pbmRleE9mKCdNQVhfSEVJR0hUJykgPiAtMSkge1xyXG5cdFx0XHRcdC8vIFx0ZXJycy5wdXNoKCd0aGUgdGFyZ2V0IDxiPmhlaWdodDwvYj4gaXMgZ3JlYXRlciB0aGFuIHRoZSBtYXhpbXVtIGFsbG93ZWQgYnkgeW91ciBjdXJyZW50IHNjcmVlbiByZXNvbHV0aW9uJyk7XHJcblx0XHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0XHQvLyBpZiAoa2V5cy5pbmRleE9mKCdNQVhfV0lEVEgnKSA+IC0xKSB7XHJcblx0XHRcdFx0Ly8gXHRlcnJzLnB1c2goJ3RoZSB0YXJnZXQgPGI+d2lkdGg8L2I+IGlzIGdyZWF0ZXIgdGhhbiB0aGUgbWF4aW11bSBhbGxvd2VkIGJ5IHlvdXIgY3VycmVudCBzY3JlZW4gcmVzb2x1dGlvbicpO1xyXG5cdFx0XHRcdC8vIH1cclxuXHJcblx0XHRcdFx0Ly8gaWYgKGtleXMuaW5kZXhPZignTUlOX0hFSUdIVCcpID4gLTEpIHtcclxuXHRcdFx0XHQvLyBcdGVycnMucHVzaCgndGhlIHRhcmdldCA8Yj5oZWlnaHQ8L2I+IGlzIGxvd2VyIHRoYW4gdGhlIG1pbmltdW0gYWxsb3dlZCBieSB5b3VyIGJyb3dzZXIgd2luZG93Jyk7XHJcblx0XHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0XHQvLyBpZiAoa2V5cy5pbmRleE9mKCdNSU5fV0lEVEgnKSA+IC0xKSB7XHJcblx0XHRcdFx0Ly8gXHRlcnJzLnB1c2goJ3RoZSB0YXJnZXQgPGI+d2lkdGg8L2I+IGlzIGxvd2VyIHRoYW4gdGhlIG1heGltdW0gYWxsb3dlZCBieSB5b3VyIGJyb3dzZXIgd2luZG93Jyk7XHJcblx0XHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0XHQvLyB0aGlzLnNob3dNZXNzYWdlKCdFUlJPUicsICc8dWw+PGxpPicgKyBlcnJzLmpvaW4oJzwvbGk+PGxpPicpICsgJzwvbGk+PC91bD48Yj5ISU5UOjwvYj4gQWRqdXN0IHRoZSB6b29tIGxldmVsIHRoZW4gdHJ5IGFnYWluLiAoWm9vbSBpbiBmb3IgZmV3ZXIgYW5kIHpvb20gb3V0IGZvciBtb3JlIENTUyBwaXhlbHMpJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRfaGFuZGxlUHJvdG9jb2xFcnJvcihlcnJvcikge1xyXG5cdFx0XHRpZiAoZXJyb3IuSU5WQUxJRF9QUk9UT0NPTCkge1xyXG5cdFx0XHRcdHZhciBlcnIgPSBlcnJvci5JTlZBTElEX1BST1RPQ09MO1xyXG5cclxuXHRcdFx0XHRpZiAoIWVyci50YWIudXJsKSB7XHJcblx0XHRcdFx0XHRsZXQgdGl0bGUgPSAnSW5zdWZmaWNpZW50IHBlcm1pc3Npb25zJztcclxuXHRcdFx0XHRcdGxldCBtZXNzYWdlID0gJ0luIG9yZGVyIGZvciB0aGUgZXh0ZW5zaW9uIHRvIHdvcmsgb24gcmVndWxhciB3aW5kb3dzIGluIDxlbT5kZXRhY2hlZDwvZW0+IG1vZGUsIGl0IG5lZWRzIHRvIGJlIGFibGUgdG8gaW5qZWN0IGN1c3RvbSBjb2RlIGluIHRoZSBjb250ZXh0IG9mIGFsbCBwYWdlcywgd2l0aG91dCB1c2VyIGludGVyYWN0aW9uLic7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50TWVzc2FnZSA9IHRoaXMuX2NyZWF0ZU1lc3NhZ2UodGl0bGUsIG1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50TWVzc2FnZS5hY3Rpb25zLnB1c2goe3RpdGxlOiAnQ2FuY2VsJywgaGFuZGxlcjogdGhpcy5kaXNtaXNzTWVzc2FnZX0pXHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRNZXNzYWdlLmFjdGlvbnMucHVzaCh7dGl0bGU6ICdHcmFudCBwZXJtaXNzaW9ucycsIG1haW46IHRydWUsIGhhbmRsZXI6ICgpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5kaXNtaXNzTWVzc2FnZSgpO1xyXG5cdFx0XHRcdFx0XHRjaHJvbWUucGVybWlzc2lvbnMucmVxdWVzdCh7cGVybWlzc2lvbnM6IFsndGFicyddLCBvcmlnaW5zOiBbJzxhbGxfdXJscz4nXX0sIGdyYW50ZWQgPT4ge30pO1xyXG5cdFx0XHRcdFx0fX0pXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuc2hvd01lc3NhZ2UoXHJcblx0XHRcdFx0XHRcdCdJbnZhbGlkIHByb3RvY29sOiA8Yj4nICsgU3RyaW5nKGVyci5wcm90b2NvbCkgKyAnOi8vPC9iPicsXHJcblx0XHRcdFx0XHRcdCdUaGlzIGZlYXR1cmUgb25seSB3b3JrcyBvbiBwYWdlcyBsb2FkZWQgdXNpbmcgb25lIG9mIHRoZSBmb2xsb3dpbmcgcHJvdG9jb2xzOiA8YnIgLz48Yj5odHRwOi8vPC9iPiwgPGI+aHR0cHM6Ly88L2I+IG9yIDxiPmZpbGU6Ly88L2I+J1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRfc2hvd0tleXMoKSB7XHJcblx0XHRcdHRoaXMuc2hvd0tleXMgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0X2hpZGVLZXlzKCkge1xyXG5cdFx0XHR0aGlzLnNob3dLZXlzID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0X2luaXRQYW5lbHMoKSB7XHJcblx0XHRcdHRoaXMuX3BhbmVscy5wdXNoKG5ldyBMaXN0UGFuZWwoJyNwcmVzZXRzUGFuZWwnLCAnd3ItcHJlc2V0JykpO1xyXG5cdFx0XHR0aGlzLl9wYW5lbHMucHVzaChuZXcgTGlzdFBhbmVsKCcjdG9vbHNQYW5lbCcsICdidXR0b24nKSk7XHJcblxyXG5cdFx0XHR0aGlzLl9wYW5lbCA9IHRoaXMuX3BhbmVsc1swXTtcclxuXHRcdH1cclxuXHJcblx0XHRfZm9jdXNQYW5lbChpZHg6IG51bWJlcikge1xyXG5cdFx0XHRpZiAoaWR4ID09PSAxICYmIHRoaXMuY29sbGFwc2VkU2lkZWJhcikge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHBhbmVsID0gdGhpcy5fcGFuZWxzW2lkeF07XHJcblxyXG5cdFx0XHRpZiAocGFuZWwgIT0gdGhpcy5fcGFuZWwpIHtcclxuXHRcdFx0XHR0aGlzLl9wYW5lbCAmJiB0aGlzLl9wYW5lbC5ibHVyKCk7XHJcblxyXG5cdFx0XHRcdHRoaXMuX3BhbmVsID0gcGFuZWw7XHJcblx0XHRcdFx0dGhpcy5fcGFuZWwuZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGhhbmRsZUJhbm5lckNsaWNrKGV2dCwgY3R4KSB7XHJcblx0XHRcdGNvbnN0IHRhcmdldCA9IGV2dC5jdXJyZW50VGFyZ2V0O1xyXG5cdFx0XHRjb25zdCB1cmwgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXVybCcpO1xyXG5cdFx0XHRjb25zdCBhY3Rpb24gPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicpO1xyXG5cclxuXHRcdFx0aWYgKHVybCkge1xyXG5cdFx0XHRcdEV4dEFQSS5pbnZva2UoJ29wZW4tdXJsJywge3VybH0pLmNhdGNoKExPR19FUlJPUik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y3R4W2FjdGlvbl0oKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGhhbmRsZVByZXNldENsaWNrKGV2dCwgY3R4KSB7XHJcblx0XHRcdHRoaXMuX2ZvY3VzUGFuZWwoMCk7XHJcblx0XHRcdC8vdGhpcy5fcGFuZWwucmVzZXQoKTtcclxuXHRcdFx0dGhpcy5fcGFuZWwuc2VsZWN0SXRlbShldnQuY3VycmVudFRhcmdldCk7XHJcblxyXG5cdFx0XHR0aGlzLnJlc2l6ZVByZXNldChjdHgpO1xyXG5cclxuXHRcdFx0dGhpcy5hdXRvQ2xvc2VQb3B1cCAmJiAhaXNTdGFuZGFsb25lUG9wdXAoKSAmJiB3aW5kb3cuY2xvc2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRoYW5kbGVUb29sc0NsaWNrKGV2dCwgY3R4KSB7XHJcblx0XHRcdGlmIChldnQudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuXHRcdFx0XHR0aGlzLl9mb2N1c1BhbmVsKDEpO1xyXG5cdFx0XHRcdHRoaXMuX3BhbmVsLnNlbGVjdEl0ZW0oZXZ0LnRhcmdldCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRoYW5kbGVLZXlEb3duKGV2dCwgY3R4KSB7XHJcblx0XHRcdGxldCBrZXlDb2RlID0gZXZ0LmtleUNvZGU7XHJcblx0XHRcdGxldCBoYW5kbGVkID0gdHJ1ZTtcclxuXHJcblx0XHRcdHN3aXRjaCAoa2V5Q29kZSkge1xyXG5cdFx0XHRcdGNhc2UgS2V5cy5TSElGVDpcclxuXHRcdFx0XHRcdGlmICghdGhpcy5zaG93S2V5cykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNob3dLZXlzID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSBLZXlzLlNQQUNFOlxyXG5cdFx0XHRcdGNhc2UgS2V5cy5FTlRFUjpcclxuXHRcdFx0XHRcdCQuYWRkQ2xhc3ModGhpcy5fcGFuZWwuY3VycmVudE5vZGUoKSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlIEtleXMuVVA6XHJcblx0XHRcdFx0XHR0aGlzLl9wYW5lbC5wcmV2KCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgS2V5cy5ET1dOOlxyXG5cdFx0XHRcdFx0dGhpcy5fcGFuZWwubmV4dCgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlIEtleXMuUklHSFQ6XHJcblx0XHRcdFx0XHR0aGlzLl9mb2N1c1BhbmVsKDEpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlIEtleXMuTEVGVDpcclxuXHRcdFx0XHRcdHRoaXMuX2ZvY3VzUGFuZWwoMCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRoYW5kbGVkID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBub2RlID0gX2dldFByZXNldEJ5S2V5Q29kZShrZXlDb2RlKTtcclxuXHRcdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0XHR0aGlzLl9wYW5lbC5mb2N1cygpO1xyXG5cdFx0XHRcdHRoaXMuX2ZvY3VzUGFuZWwoMCk7XHJcblx0XHRcdFx0dGhpcy5fcGFuZWwuc2VsZWN0SXRlbShub2RlKTtcclxuXHJcblx0XHRcdFx0JC5hZGRDbGFzcyhub2RlLCAnYWN0aXZlJyk7XHJcblx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghaGFuZGxlZCkge1xyXG5cdFx0XHRcdGxldCBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXlDb2RlKTtcclxuXHRcdFx0XHRsZXQgbm9kZSA9ICQucShgW2RhdGEta2V5PVwiJHtjaGFyfVwiXWApO1xyXG5cclxuXHRcdFx0XHRpZiAobm9kZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5fcGFuZWwuZm9jdXMoKTtcclxuXHRcdFx0XHRcdHRoaXMuX2ZvY3VzUGFuZWwoMSk7XHJcblx0XHRcdFx0XHR0aGlzLl9wYW5lbC5zZWxlY3RJdGVtKG5vZGUpO1xyXG5cclxuXHRcdFx0XHRcdCQuYWRkQ2xhc3Mobm9kZSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0aWYgKGhhbmRsZWQpIHtcclxuXHRcdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGhhbmRsZUtleVVwKGV2dCwgY3R4KSB7XHJcblx0XHRcdGxldCBrZXlDb2RlID0gZXZ0LmtleUNvZGU7XHJcblx0XHRcdGxldCBoYW5kbGVkID0gdHJ1ZTtcclxuXHJcblx0XHRcdHN3aXRjaCAoa2V5Q29kZSkge1xyXG5cdFx0XHRcdGNhc2UgS2V5cy5TSElGVDpcclxuXHRcdFx0XHRcdGlmICh0aGlzLnNob3dLZXlzKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2hvd0tleXMgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSBLZXlzLlNQQUNFOlxyXG5cdFx0XHRcdGNhc2UgS2V5cy5FTlRFUjpcclxuXHRcdFx0XHRcdCQucmVtb3ZlQ2xhc3ModGhpcy5fcGFuZWwuY3VycmVudE5vZGUoKSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0JC50cmlnZ2VyKCdjbGljaycsIHRoaXMuX3BhbmVsLmN1cnJlbnROb2RlKCkpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0aGFuZGxlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgbm9kZSA9IF9nZXRQcmVzZXRCeUtleUNvZGUoa2V5Q29kZSk7XHJcblx0XHRcdGlmIChub2RlKSB7XHJcblx0XHRcdFx0JC5yZW1vdmVDbGFzcyhub2RlLCAnYWN0aXZlJyk7XHJcblx0XHRcdFx0JC50cmlnZ2VyKCdjbGljaycsIG5vZGUpO1xyXG5cdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIWhhbmRsZWQpIHtcclxuXHRcdFx0XHRsZXQgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5Q29kZSk7XHJcblx0XHRcdFx0bGV0IG5vZGUgPSAkLnEoYFtkYXRhLWtleT1cIiR7Y2hhcn1cIl1gKTtcclxuXHJcblx0XHRcdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0XHRcdCQucmVtb3ZlQ2xhc3Mobm9kZSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0JC50cmlnZ2VyKCdjbGljaycsIG5vZGUpO1xyXG5cdFx0XHRcdFx0aGFuZGxlZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaGFuZGxlZCkge1xyXG5cdFx0XHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aW5pdE5hdmlnYXRpb24oKSB7XHJcblx0XHRcdGxldCBtYWluID0gJC5xKCcjbWFpbicpO1xyXG5cclxuXHRcdFx0JC5vbigna2V5ZG93bicsIG1haW4sIHRoaXMuaGFuZGxlS2V5RG93biwgdHJ1ZSk7XHJcblx0XHRcdCQub24oJ2tleXVwJywgbWFpbiwgdGhpcy5oYW5kbGVLZXlVcCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRsZXQgaCA9IG5ldyBGb2N1c0hhbmRsZXIobWFpbik7XHJcblxyXG5cdFx0XHRtYWluLmZvY3VzKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjbGFzcyBGb2N1c0hhbmRsZXIge1xyXG5cdFx0cHJvdGVjdGVkIGlnbm9yZSA9IGZhbHNlO1xyXG5cdFx0cHJvdGVjdGVkIGZvY3VzZWQgPSBmYWxzZTtcclxuXHRcdHByb3RlY3RlZCB0YXJnZXQ6IEhUTUxFbGVtZW50O1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHRhcmdldDogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0dGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdHRoaXMuX19pbml0SGFuZGxlcnMoKTtcclxuXHJcblx0XHRcdCQub24oJ2ZvY3VzJywgdGhpcy50YXJnZXQsIHRoaXMub25Gb2N1cywgdHJ1ZSk7XHJcblx0XHRcdCQub24oJ2JsdXInLCB0aGlzLnRhcmdldCwgdGhpcy5vbkJsdXIsIHRydWUpO1xyXG5cdFx0XHQkLm9uKCdtb3VzZWRvd24nLCB0aGlzLnRhcmdldCwgdGhpcy5vbk1vdXNlRG93biwgdHJ1ZSk7XHJcblx0XHRcdCQub24oJ2tleWRvd24nLCBkb2N1bWVudCwgdGhpcy5vbktleURvd24sIHRydWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdF9faW5pdEhhbmRsZXJzKCkge1xyXG5cdFx0XHR2YXIgaGFuZGxlcnMgPSBbJ29uRm9jdXMnLCAnb25CbHVyJywgJ29uS2V5RG93bicsICdvbk1vdXNlRG93biddO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgbWV0aG9kIG9mIGhhbmRsZXJzKSB7XHJcblx0XHRcdFx0dGhpc1ttZXRob2RdID0gX19ldmVudEhhbmRsZXIodGhpcywgdGhpc1ttZXRob2RdKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gX19ldmVudEhhbmRsZXIoY29udGV4dCwgbWV0aG9kKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGV2dCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG1ldGhvZC5jYWxsKGNvbnRleHQsIGV2dCwgdGhpcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b25CbHVyKGV2dCkge1xyXG5cdFx0XHRpZiAoIXRoaXMudGFyZ2V0LmNvbnRhaW5zKGV2dC5yZWxhdGVkVGFyZ2V0KSkge1xyXG5cdFx0XHRcdCQucmVtb3ZlQ2xhc3ModGhpcy50YXJnZXQsICdmb2N1c2VkJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uRm9jdXMoZXZ0KSB7XHJcblx0XHRcdGlmICghdGhpcy5pZ25vcmUpIHtcclxuXHRcdFx0XHQkLmFkZENsYXNzKHRoaXMudGFyZ2V0LCAnZm9jdXNlZCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmZvY3VzZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uS2V5RG93bihldnQpIHtcclxuXHRcdFx0dGhpcy5pZ25vcmUgPSBmYWxzZTtcclxuXHRcdFx0aWYgKHRoaXMuZm9jdXNlZCkge1xyXG5cdFx0XHRcdCQuYWRkQ2xhc3ModGhpcy50YXJnZXQsICdmb2N1c2VkJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRvbk1vdXNlRG93bihldnQpIHtcclxuXHRcdFx0JC5yZW1vdmVDbGFzcyh0aGlzLnRhcmdldCwgJ2ZvY3VzZWQnKTtcclxuXHRcdFx0dGhpcy5pZ25vcmUgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cclxuXHRmdW5jdGlvbiBfc3RlYWxGb2N1cyhldnQsIGN0eCkge1xyXG5cdFx0ZXZ0LnByZXZlbnREZWZhdWx0KClcclxuXHRcdGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdHRoaXMuZm9jdXMoKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIF9nZXRQcmVzZXRCeUtleUNvZGUoa2V5Q29kZTogbnVtYmVyKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0dmFyIG5vZGU6IEhUTUxFbGVtZW50O1xyXG5cclxuXHRcdGlmICgoa2V5Q29kZSA+PSBLZXlzLkRJR0lUU1swXSAmJiBrZXlDb2RlIDw9IEtleXMuRElHSVRTWzFdKVxyXG5cdFx0fHwgKGtleUNvZGUgPj0gS2V5cy5OVU1QQURbMF0gJiYga2V5Q29kZSA8PSBLZXlzLk5VTVBBRFsxXSkpIHtcclxuXHRcdFx0bGV0IGlkeCAgPSAoa2V5Q29kZSAlIDQ4KSB8fCAxMDtcclxuXHRcdFx0bm9kZSA9ICQucShgd3ItcHJlc2V0Om50aC1vZi10eXBlKCR7aWR4fSlgKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbm9kZTtcclxuXHR9XHJcblxyXG5cdGNsYXNzIExpc3RQYW5lbCB7XHJcblx0XHRwYXJlbnQ6IEVsZW1lbnQgPSBudWxsO1xyXG5cdFx0bGlzdDogc3RyaW5nID0gbnVsbDtcclxuXHRcdGN1cnJlbnQ6IG51bWJlciA9IC0xO1xyXG5cclxuXHRcdGF1dG9Jbml0OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0XHRfc2VsZWN0ZWQ6IHN0cmluZyA9ICdzZWxlY3RlZCc7XHJcblx0XHRfZm9jdXNlZDogc3RyaW5nID0gJ2ZvY3VzZWQnO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHBhcmVudDogc3RyaW5nLCBsaXN0OiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy5wYXJlbnQgPSA8RWxlbWVudD4gJC5xKHBhcmVudCk7XHJcblx0XHRcdHRoaXMubGlzdCA9IGxpc3Q7XHJcblx0XHR9XHJcblxyXG5cdFx0bmV4dCgpIHtcclxuXHRcdFx0bGV0IG5vZGVzID0gJC5xQWxsKHRoaXMubGlzdCwgdGhpcy5wYXJlbnQpO1xyXG5cdFx0XHRsZXQgbmV4dCA9ICh0aGlzLmN1cnJlbnQgKyAxKSAlIG5vZGVzLmxlbmd0aDtcclxuXHJcblx0XHRcdHRoaXMuc2VsZWN0KG5leHQsIG5vZGVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcmV2KCkge1xyXG5cdFx0XHRsZXQgbm9kZXMgPSAkLnFBbGwodGhpcy5saXN0LCB0aGlzLnBhcmVudCk7XHJcblx0XHRcdGxldCBwcmV2ID0gKG5vZGVzLmxlbmd0aCArIHRoaXMuY3VycmVudCAtIDEpICUgbm9kZXMubGVuZ3RoO1xyXG5cclxuXHRcdFx0dGhpcy5zZWxlY3QocHJldiwgbm9kZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGVjdChuZXh0LCBub2Rlcywgbm9Gb2N1cz8pIHtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGwgPSBub2Rlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuXHRcdFx0XHRsZXQgbm9kZSA9IDxFbGVtZW50PiBub2Rlc1tpXTtcclxuXHRcdFx0XHRub2RlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2VsZWN0ZWQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgbm9kZSA9IDxIVE1MRWxlbWVudD4gbm9kZXNbbmV4dF07XHJcblx0XHRcdHRoaXMuX3NlbGVjdE5vZGUobm9kZSk7XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnQgPSBuZXh0O1xyXG5cclxuXHRcdFx0aWYgKCFub0ZvY3VzKSB7XHJcblx0XHRcdFx0dGhpcy5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9jdXMoKSB7XHJcblx0XHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLmF1dG9Jbml0ICYmIHRoaXMuY3VycmVudCA8IDApIHtcclxuXHRcdFx0XHR0aGlzLm5leHQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fc2VsZWN0Tm9kZSh0aGlzLmN1cnJlbnROb2RlKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGJsdXIoKSB7XHJcblx0XHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2ZvY3VzZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXNldCgpIHtcclxuXHRcdFx0bGV0IG5vZGVzID0gJC5xQWxsKHRoaXMubGlzdCwgdGhpcy5wYXJlbnQpO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGwgPSBub2Rlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuXHRcdFx0XHRsZXQgbm9kZSA9IG5vZGVzW2ldO1xyXG5cdFx0XHRcdG5vZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZWxlY3RlZCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuY3VycmVudCA9IC0xO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGVjdEl0ZW0oaXRlbTogTm9kZSkge1xyXG5cdFx0XHRsZXQgbm9kZXMgPSAkLnFBbGwodGhpcy5saXN0LCB0aGlzLnBhcmVudCk7XHJcblx0XHRcdGxldCBmb3VuZCA9IC0xO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGwgPSBub2Rlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoaXRlbSA9PSBub2Rlc1tpXSkge1xyXG5cdFx0XHRcdFx0Zm91bmQgPSBpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGZvdW5kID4gLTEgJiYgZm91bmQgIT0gdGhpcy5jdXJyZW50KSB7XHJcblx0XHRcdFx0bGV0IG5vZGUgPSA8SFRNTEVsZW1lbnQ+IG5vZGVzW2ZvdW5kXTtcclxuXHRcdFx0XHR0aGlzLnJlc2V0KCk7XHJcblx0XHRcdFx0dGhpcy5fc2VsZWN0Tm9kZShub2RlKTtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnQgPSBmb3VuZDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGN1cnJlbnROb2RlKCkge1xyXG5cdFx0XHRsZXQgbm9kZXMgPSAkLnFBbGwodGhpcy5saXN0LCB0aGlzLnBhcmVudCk7XHJcblx0XHRcdHJldHVybiA8SFRNTEVsZW1lbnQ+IG5vZGVzW3RoaXMuY3VycmVudF07XHJcblx0XHR9XHJcblxyXG5cdFx0X3NlbGVjdE5vZGUobm9kZTogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0bm9kZS5jbGFzc0xpc3QuYWRkKHRoaXMuX3NlbGVjdGVkKTtcclxuXHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcclxuXHRcdFx0bm9kZS5mb2N1cygpO1xyXG5cdFx0XHRub2RlLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCB2YXIgdmlldyA9IG5ldyBQb3B1cCgpO1xyXG5cdHZhciBiaW5kaW5nID0gcml2ZXRzLmJpbmQoZG9jdW1lbnQuYm9keSwgdmlldyk7XHJcblx0dmlldy5pbml0TmF2aWdhdGlvbigpO1xyXG5cclxuXHRjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobXNnID0+IHtcclxuXHRcdGlmIChtc2cuVXBkYXRlZFNldHRpbmdzKSB7XHJcblxyXG5cdFx0XHRpZiAoJ2xpY2Vuc2UnIGluIG1zZy5VcGRhdGVkU2V0dGluZ3MpIHtcclxuXHRcdFx0XHR2aWV3LmN1cnJlbnRCYW5uZXIgPSBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoJ3ByZXNldHNJY29uc1N0eWxlJyBpbiBtc2cuVXBkYXRlZFNldHRpbmdzKSB7XHJcblx0XHRcdFx0dmlldy5wcmVzZXRzSWNvbnNTdHlsZSA9IG1zZy5VcGRhdGVkU2V0dGluZ3MucHJlc2V0c0ljb25zU3R5bGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICgncHJlc2V0c1ByaW1hcnlMaW5lJyBpbiBtc2cuVXBkYXRlZFNldHRpbmdzKSB7XHJcblx0XHRcdFx0dmlldy5wcmVzZXRzUHJpbWFyeUxpbmUgPSBtc2cuVXBkYXRlZFNldHRpbmdzLnByZXNldHNQcmltYXJ5TGluZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCdhbHRlcm5hdGVQcmVzZXRzQmcnIGluIG1zZy5VcGRhdGVkU2V0dGluZ3MpIHtcclxuXHRcdFx0XHR2aWV3LmFsdGVybmF0ZVByZXNldHNCZyA9IG1zZy5VcGRhdGVkU2V0dGluZ3MuYWx0ZXJuYXRlUHJlc2V0c0JnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoJ2F1dG9DbG9zZVBvcHVwJyBpbiBtc2cuVXBkYXRlZFNldHRpbmdzKSB7XHJcblx0XHRcdFx0dmlldy5hdXRvQ2xvc2VQb3B1cCA9IG1zZy5VcGRhdGVkU2V0dGluZ3MuYXV0b0Nsb3NlUG9wdXA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICgnaGlkZVByZXNldHNEZXNjcmlwdGlvbicgaW4gbXNnLlVwZGF0ZWRTZXR0aW5ncykge1xyXG5cdFx0XHRcdHZpZXcuaGlkZVByZXNldHNEZXNjcmlwdGlvbiA9IG1zZy5VcGRhdGVkU2V0dGluZ3MuaGlkZVByZXNldHNEZXNjcmlwdGlvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCdoaWRlUG9wdXBUb29sdGlwcycgaW4gbXNnLlVwZGF0ZWRTZXR0aW5ncykge1xyXG5cdFx0XHRcdHZpZXcuaGlkZVBvcHVwVG9vbHRpcHMgPSBtc2cuVXBkYXRlZFNldHRpbmdzLmhpZGVQb3B1cFRvb2x0aXBzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoJ2hpZGVRdWlja1Jlc2l6ZScgaW4gbXNnLlVwZGF0ZWRTZXR0aW5ncykge1xyXG5cdFx0XHRcdHZpZXcuaGlkZVF1aWNrUmVzaXplID0gbXNnLlVwZGF0ZWRTZXR0aW5ncy5oaWRlUXVpY2tSZXNpemU7XHJcblx0XHRcdFx0d2luZG93LmxvY2FsU3RvcmFnZVsnaGlkZVF1aWNrUmVzaXplJ10gPSBtc2cuVXBkYXRlZFNldHRpbmdzLmhpZGVRdWlja1Jlc2l6ZSA/IDEgOiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoJ3ByZXNldHMnIGluIG1zZy5VcGRhdGVkU2V0dGluZ3MpIHtcclxuXHRcdFx0XHR2aWV3LnByZXNldHMgPSBbXTtcclxuXHRcdFx0XHRmb3IgKGxldCBwcmVzZXREYXRhIG9mIG1zZy5VcGRhdGVkU2V0dGluZ3MucHJlc2V0cykge1xyXG5cdFx0XHRcdFx0dmlldy5wcmVzZXRzLnB1c2gobmV3IENvcmUuUHJlc2V0KHByZXNldERhdGEpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KVxyXG5cclxuXHJcblx0ZnVuY3Rpb24gTE9HX0VSUk9SKGVycjogYW55KSB7XHJcblx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaXNTdGFuZGFsb25lUG9wdXAoKSB7XHJcblx0XHRyZXR1cm4gd2luZG93LmxvY2F0aW9uLmhhc2guaW5kZXhPZigncG9wdXAtdmlldycpID4gLTE7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBfY29uc3RyYWluV2luZG93U2l6ZSgpIHtcclxuXHRcdHZhciBsaW1pdDogYW55ID0ge307XHJcblxyXG5cdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgMzQwKSB7XHJcblx0XHRcdGxpbWl0LndpZHRoID0gMzQwICsgd2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAod2luZG93LmlubmVySGVpZ2h0IDwgNDAwKSB7XHJcblx0XHRcdGxpbWl0LmhlaWdodCA9IDQwMCArIHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobGltaXQud2lkdGggfHwgbGltaXQuaGVpZ2h0KSB7XHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ2xpbWl0LXBvcHVwJywgbGltaXQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aWYgKGlzU3RhbmRhbG9uZVBvcHVwKCkpIHtcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBfY29uc3RyYWluV2luZG93U2l6ZSk7XHJcblx0fVxyXG59XHJcbiJdfQ==
