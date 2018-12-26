/**
 * Wraps the proxy configuration form, binding proper handlers to its various
 * `change`, `click`, etc. events in order to take appropriate action in
 * response to user events.
 *
 * @param {string} id The form's DOM ID.
 * @constructor
 */
var ProxyFormController = function(id) {
  /**
   * The wrapped form element
   * @type {Node}
   * @private
   */
  this.form_ = document.getElementById(id);

  // Throw an error if the element either doesn't exist, or isn't a form.
  if (!this.form_)
    throw chrome.i18n.getMessage('errorIdNotFound', id);
  else if (this.form_.nodeName !== 'FORM')
    throw chrome.i18n.getMessage('errorIdNotForm', id);

  /**
   * Cached references to the `fieldset` groups that define the configuration
   * options presented to the user.
   *
   * @type {NodeList}
   * @private
   */
  this.configGroups_ = document.querySelectorAll('#' + id + ' > fieldset');

  this.bindEventHandlers_();
  this.readCurrentState_();

  // Handle errors
  this.handleProxyErrors_();
};

///////////////////////////////////////////////////////////////////////////////

// The built-in proxy.
ProxyFormController.DEFAULT_PAC_DATA = `
var white_list = ['google.com', 'google.com.hk', 'gmail.com', 'gstatic.com', 'googleapis.com', 'googleusercontent.com', 'wikipedia.org', '1e100.net', 'appspot.com', 'googlesource.com', 'chromium.org',
                  'google-analytics.com', 'doubleclick.net', 'gvt1.com', 'ggpht.com', 'googletagmanager.com', 'android.com', 'jquery.com'];

function FindProxyForURL(url, host) {
//  if (dnsDomainIs(host, 'google.com') && !dnsDomainIs(host, 'www.google.com') && !dnsDomainIs(host, 'news.google.com')) {
//    return 'HTTPS www.chrome-helper.cc:21830';
//  } else {
//    for (var i=0; i<white_list.length; i++) {
//      if (dnsDomainIs(host, white_list[i])) {
//        return 'HTTPS www.chrome-helper.cc:21830';
//      }
//    }
//  }
  for (var i=0; i<white_list.length; i++) {
    if (dnsDomainIs(host, white_list[i])) {
      return 'HTTPS www.chrome-helper.cc:21830';
    }
  }
  return 'DIRECT';
}
`;

/**
 * The proxy types we're capable of handling.
 * @enum {string}
 */
ProxyFormController.ProxyTypes = {
  SYSTEM: 'system',
  PAC: 'pac_script',
  AUTO: 'auto_detect'
};

/**
 * The window types we're capable of handling.
 * @enum {int}
 */
ProxyFormController.WindowTypes = {
  REGULAR: 1,
  INCOGNITO: 2
};

/**
 * The extension's level of control of Chrome's roxy setting
 * @enum {string}
 */
ProxyFormController.LevelOfControl = {
  NOT_CONTROLLABLE: 'not_controllable',
  OTHER_EXTENSION: 'controlled_by_other_extension',
  AVAILABLE: 'controllable_by_this_extension',
  CONTROLLING: 'controlled_by_this_extension'
};

/**
 * The response type from 'proxy.settings.get'
 *
 * @typedef {{value: ProxyConfig,
 *     levelOfControl: ProxyFormController.LevelOfControl}}
 */
ProxyFormController.WrappedProxyConfig;

///////////////////////////////////////////////////////////////////////////////

/**
 * Retrieves proxy settings that have been persisted across restarts.
 *
 * @return {?ProxyConfig} The persisted proxy configuration, or null if no
 *     value has been persisted.
 * @static
 */
ProxyFormController.getPersistedSettings = function() {
  chrome.storage.sync.get('proxyConfigX', function(data) {
    //alert(JSON.stringify(data.proxyConfigX));
    if (data.proxyConfigX) {
      if (data.proxyConfigX.regular.pacScript && data.proxyConfigX.pac_input_text === '') {
        chrome.proxy.settings.set(
          {'value': {mode: 'pac_script', pacScript: {data: ProxyFormController.DEFAULT_PAC_DATA, mandatory: true}}});
        return;
      }
      chrome.proxy.settings.set(
        {'value': data.proxyConfigX.regular});
    } else {
      chrome.proxy.settings.set(
        {'value': {mode: 'pac_script', pacScript: {data: ProxyFormController.DEFAULT_PAC_DATA, mandatory: true}}});
    }
  });
};

/**
 * Persists proxy settings across restarts.
 *
 * @param {!ProxyConfig} config The proxy config to persist.
 * @static
 */
ProxyFormController.setPersistedSettings = function(config) {
//  window.localStorage['proxyConfigX'] = JSON.stringify(config);
  chrome.storage.sync.set({ proxyConfigX: config });
};

///////////////////////////////////////////////////////////////////////////////

ProxyFormController.prototype = {
  /**
   * The form's current state.
   * @type {regular: ?ProxyConfig, incognito: ?ProxyConfig}
   * @private
   */
  config_: {regular: null, incognito: null, pac_input_text: ''},

  /**
   * Do we have access to incognito mode?
   * @type {boolean}
   * @private
   */
  isAllowedIncognitoAccess_: false,

  /**
   * @return {string} The PAC file URL (or an empty string).
   */
  get pacURL() {
    return document.getElementById('autoconfigURL').value;
  },

  /**
   * @param {!string} value The PAC file URL.
   */
  set pacURL(value) {
    document.getElementById('autoconfigURL').value = value;
  },

///////////////////////////////////////////////////////////////////////////////

  /**
   * Calls the proxy API to read the current settings, and populates the form
   * accordingly.
   *
   * @private
   */
  readCurrentState_: function() {
    chrome.proxy.settings.get({incognito: false},
      this.handleRegularState_.bind(this));
    chrome.extension.isAllowedIncognitoAccess(
      function(state) {
        this.isAllowedIncognitoAccess_ = state;
        if (this.isAllowedIncognitoAccess_) {
          chrome.proxy.settings.get({incognito: true},
            this.handleIncognitoState_.bind(this));
        }
      }.bind(this));
  },

  /**
   * Handles the response from 'proxy.settings.get' for regular
   * settings.
   *
   * @param {ProxyFormController.WrappedProxyConfig} c The proxy data and
   *     extension's level of control thereof.
   * @private
   */
  handleRegularState_: function(c) {
    if (c.levelOfControl === ProxyFormController.LevelOfControl.AVAILABLE ||
        c.levelOfControl === ProxyFormController.LevelOfControl.CONTROLLING) {
      this.recalcFormValues_(c.value);
      this.config_.regular = c.value;
    } else {
      this.handleLackOfControl_(c.levelOfControl);
    }
  },

  /**
   * Handles the response from 'proxy.settings.get' for incognito
   * settings.
   *
   * @param {ProxyFormController.WrappedProxyConfig} c The proxy data and
   *     extension's level of control thereof.
   * @private
   */
  handleIncognitoState_: function(c) {
    if (c.levelOfControl === ProxyFormController.LevelOfControl.AVAILABLE ||
        c.levelOfControl === ProxyFormController.LevelOfControl.CONTROLLING) {
      this.config_.incognito = c.value;
    } else {
      this.handleLackOfControl_(c.levelOfControl);
    }
  },

  /**
   * Binds event handlers for the various bits and pieces of the form that
   * are interesting to the controller.
   *
   * @private
   */
  bindEventHandlers_: function() {
    this.form_.addEventListener('click', this.dispatchFormClick_.bind(this));
  },

  /**
   * When a `click` event is triggered on the form, this function handles it by
   * analyzing the context, and dispatching the click to the correct handler.
   *
   * @param {Event} e The event to be handled.
   * @private
   * @return {boolean} True if the event should bubble, false otherwise.
   */
  dispatchFormClick_: function(e) {
    var t = e.target;

    if (t.nodeName === 'INPUT' && t.getAttribute('type') === 'submit') {
      return this.applyChanges_(e);
    } else {
      // Walk up the tree until we hit `form > fieldset` or fall off the top
      while (t && (t.nodeName !== 'FIELDSET' ||
             t.parentNode.nodeName !== 'FORM')) {
        t = t.parentNode;
      }
      if (t) {
        this.changeActive_(t);
        return false;
      }
    }
    return true;
  },

  /**
   * Sets the form's active config group.
   *
   * @param {DOMElement} fieldset The configuration group to activate.
   * @private
   */
  changeActive_: function(fieldset) {
    //debugger;
    for (var i = 0; i < this.configGroups_.length; i++) {
      var el = this.configGroups_[i];
      var radio = el.querySelector("input[type='radio']");
      if (el === fieldset) {
        el.classList.add('active');
        radio.checked = true;
      } else {
        el.classList.remove('active');
      }
    }
    var i, j;
    for (i = 0; i < this.configGroups_.length; i++) {
      var el = this.configGroups_[i];
      var inputs = el.querySelectorAll(
          "input:not([type='radio']), select, textarea");
      if (el.classList.contains('active')) {
          for (j = 0; j < inputs.length; j++) {
              inputs[j].removeAttribute('disabled');
          }
      } else {
          for (j = 0; j < inputs.length; j++) {
              inputs[j].setAttribute('disabled', 'disabled');
          }
      }
    }
  },


  /**
   * Handler called in response to click on form's submission button. Generates
   * the proxy configuration and passes it to `useCustomProxySettings`, or
   * handles errors in user input.
   *
   * Proxy errors (and the browser action's badge) are cleared upon setting new
   * values.
   *
   * @param {Event} e DOM event generated by the user's click.
   * @private
   */
  applyChanges_: function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.config_.regular = this.generateProxyConfig_();
    this.config_.incognito = this.generateProxyConfig_();
    this.config_.pac_input_text = document.getElementById('autoconfigURL').value;
    chrome.proxy.settings.set(
      {value: this.config_.regular, scope: 'regular'},
      this.callbackForRegularSettings_.bind(this));
    chrome.extension.sendRequest({type: 'clearError'});
  },

  /**
   * Called in response to setting a regular window's proxy settings: checks
   * for `lastError`, and then sets incognito settings (if they exist).
   *
   * @private
   */
  callbackForRegularSettings_: function() {
    if (chrome.runtime.lastError) {
      this.generateAlert_(chrome.i18n.getMessage('errorSettingRegularProxy'));
      return;
    }
    ProxyFormController.setPersistedSettings(this.config_);
    //this.generateAlert_(chrome.i18n.getMessage('successfullySetProxy'));
    chrome.extension.isAllowedIncognitoAccess(
      function(state) {
        this.isAllowedIncognitoAccess_ = state;
        if (this.isAllowedIncognitoAccess_) {
          chrome.proxy.settings.set(
            {value: this.config_.regular, scope: 'incognito_persistent'},
            this.callbackForIncognitoSettings_.bind(this));
        } else {
          this.generateAlert_(chrome.i18n.getMessage('errorNotAllowedForIncognito'));
        }
      }.bind(this));
  },

  /**
   * Called in response to setting an incognito window's proxy settings: checks
   * for `lastError` and sets a success message.
   *
   * @private
   */
  callbackForIncognitoSettings_: function() {
    if (chrome.runtime.lastError) {
      this.generateAlert_(chrome.i18n.getMessage('errorSettingIncognitoProxy'));
      return;
    }
    ProxyFormController.setPersistedSettings(this.config_);
    this.generateAlert_(chrome.i18n.getMessage('successfullySetProxy'));
  },

  /**
   * Generates an alert overlay inside the proxy's popup, then closes the popup
   * after a short delay.
   *
   * @param {string} msg The message to be displayed in the overlay.
   * @param {?boolean} close Should the window be closed?  Defaults to true.
   * @private
   */
  generateAlert_: function(msg, close) {
    var success = document.createElement('div');
    success.classList.add('overlay');
    success.setAttribute('role', 'alert');
    success.textContent = msg;
    document.body.appendChild(success);

    setTimeout(function() { success.classList.add('visible'); }, 10);
    setTimeout(function() {
      if (close === false) {
        success.classList.remove('visible');
      } else {
        window.close();
      }
    }, 4000);
  },

  /**
   * Parses the proxy configuration form, and generates a ProxyConfig object
   * that can be passed to `useCustomProxyConfig`.
   *
   * @see http://code.google.com/chrome/extensions/trunk/proxy.html
   * @return {ProxyConfig} The proxy configuration represented by the form.
   * @private
   */
  generateProxyConfig_: function() {
  var active = document.getElementsByClassName('active')[0];
  switch (active.id) {
    case ProxyFormController.ProxyTypes.SYSTEM:
      return {mode: 'system'};
    case ProxyFormController.ProxyTypes.PAC:
      var pacScriptURL = this.pacURL;
      if (pacScriptURL) {
        return {mode: 'pac_script',
          pacScript: {url: pacScriptURL, mandatory: true}};
      } else {
        return {mode: 'pac_script',
          pacScript: {data: ProxyFormController.DEFAULT_PAC_DATA, mandatory: true}};
      }
    }
  },

  /**
   * Sets the form's values based on a ProxyConfig.
   *
   * @param {!ProxyConfig} c The ProxyConfig object.
   * @private
   */
  recalcFormValues_: function(c) {
    // Normalize `auto_detect`
    if (c.mode === 'auto_detect')
      c.mode = 'pac_script';
    // Activate one of the groups, based on `mode`.
    this.changeActive_(document.getElementById(c.mode));
    // Populate the PAC script
    this.pacURL = '';
    if (c.pacScript) {
      if (c.pacScript.url)
        this.pacURL = c.pacScript.url;
    } else {
      // pac_input_text is not part of proxy settings.
      chrome.storage.sync.get('proxyConfigX', function(data) {
        if (data.proxyConfigX)
          this.pacURL = data.proxyConfigX.pac_input_text;
      }.bind(this));
    }
  },

  /**
   * Handles the case in which this extension doesn't have the ability to
   * control the Proxy settings, either because of an overriding policy
   * or an extension with higher priority.
   *
   * @param {ProxyFormController.LevelOfControl} l The level of control this
   *     extension has over the proxy settings.
   * @private
   */
  handleLackOfControl_: function(l) {
    var msg;
    if (l === ProxyFormController.LevelOfControl.NO_ACCESS)
      msg = chrome.i18n.getMessage('errorNoExtensionAccess');
    else if (l === ProxyFormController.LevelOfControl.OTHER_EXTENSION)
      msg = chrome.i18n.getMessage('errorOtherExtensionControls');
    this.generateAlert_(msg);
  },


  /**
   * Handle the case in which errors have been generated outside the context
   * of this popup.
   *
   * @private
   */
  handleProxyErrors_: function() {
    chrome.extension.sendRequest(
        {type: 'getError'},
        this.handleProxyErrorHandlerResponse_.bind(this));
  },

  /**
   * Handles response from ProxyErrorHandler
   *
   * @param {{result: !string}} response The message sent in response to this
   *     popup's request.
   */
  handleProxyErrorHandlerResponse_: function(response) {
    if (response.result !== null) {
      var error = JSON.parse(response.result);
      console.log(error);
      // TODO(mkwst): Do something more interesting
      this.generateAlert_(
          chrome.i18n.getMessage(
              error.details ? 'errorProxyDetailedError' : 'errorProxyError',
              [error.error, error.details]),
          false);
    }
  }
};
