/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"config": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/pages/config/index.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/pages/config/index.js":
/*!**************************************!*\
  !*** ./src/js/pages/config/index.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/map */ "./node_modules/lodash/map.js");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/findIndex */ "./node_modules/lodash/findIndex.js");
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_findIndex__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_upperFirst__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/upperFirst */ "./node_modules/lodash/upperFirst.js");
/* harmony import */ var lodash_upperFirst__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_upperFirst__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/forEach */ "./node_modules/lodash/forEach.js");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_forEach__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var Utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! Utils */ "./src/js/utils/index.js");
/* harmony import */ var Components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! Components */ "./src/js/components/index.js");
/* harmony import */ var Libs_permissionManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! Libs/permissionManager */ "./src/js/libs/permissionManager/index.js");
/* harmony import */ var Components_configPage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! Components/configPage */ "./src/js/components/configPage/index.js");
/* harmony import */ var Styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! Styles */ "./src/styles/index.js");
/* harmony import */ var Statics_json_update_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! Statics/json/update.json */ "./src/statics/json/update.json");
var Statics_json_update_json__WEBPACK_IMPORTED_MODULE_13___namespace = /*#__PURE__*/__webpack_require__.t(/*! Statics/json/update.json */ "./src/statics/json/update.json", 1);
/* harmony import */ var Statics_json_announcement_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! Statics/json/announcement.json */ "./src/statics/json/announcement.json");
var Statics_json_announcement_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(/*! Statics/json/announcement.json */ "./src/statics/json/announcement.json", 1);
/* harmony import */ var Styles_scss_config_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! Styles/scss/config.scss */ "./src/styles/scss/config.scss");
/* harmony import */ var Styles_scss_config_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(Styles_scss_config_scss__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var Statics_json_feed_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! Statics/json/feed.json */ "./src/statics/json/feed.json");
var Statics_json_feed_json__WEBPACK_IMPORTED_MODULE_16___namespace = /*#__PURE__*/__webpack_require__.t(/*! Statics/json/feed.json */ "./src/statics/json/feed.json", 1);






var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  position: absolute;\n  top: ', 'px;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  overflow: auto;\n'], ['\n  position: absolute;\n  top: ', 'px;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  overflow: auto;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  position: absolute;\n  left: calc(50% + 380px);\n  bottom: 4px;\n  z-index: -1;\n  figcaption {\n    text-align: center;\n  }\n'], ['\n  position: absolute;\n  left: calc(50% + 380px);\n  bottom: 4px;\n  z-index: -1;\n  figcaption {\n    text-align: center;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  width: 60px;\n'], ['\n  width: 60px;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  position: relative;\n  flex-shrink: 0;\n  padding: 50px 0;\n  background-color: ', ';\n  color: #fff;\n  overflow: hidden;\n  & > * {\n    display: block;\n    margin: 0 auto;\n    padding: 0 10px;\n    max-width: 800px;\n  }\n'], ['\n  position: relative;\n  flex-shrink: 0;\n  padding: 50px 0;\n  background-color: ', ';\n  color: #fff;\n  overflow: hidden;\n  & > * {\n    display: block;\n    margin: 0 auto;\n    padding: 0 10px;\n    max-width: 800px;\n  }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  position: relative;\n  max-width: 800px;\n  width: 100%;\n  margin: 20px auto;\n  padding: 0 10px;\n  box-sizing: border-box;\n  color: #8c8c8c;\n  & a {\n    color: #8c8c8c;\n  }\n  & > a {\n    margin-right: 16px;\n  }\n  span {\n    float: right;\n  }\n'], ['\n  position: relative;\n  max-width: 800px;\n  width: 100%;\n  margin: 20px auto;\n  padding: 0 10px;\n  box-sizing: border-box;\n  color: #8c8c8c;\n  & a {\n    color: #8c8c8c;\n  }\n  & > a {\n    margin-right: 16px;\n  }\n  span {\n    float: right;\n  }\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  width: 100%;\n  line-height: 30px;\n  max-width: 800px;\n  margin: 16px auto;\n  padding: 0px 10px;\n  text-align: left;\n  color: ', ';\n'], ['\n  width: 100%;\n  line-height: 30px;\n  max-width: 800px;\n  margin: 16px auto;\n  padding: 0px 10px;\n  text-align: left;\n  color: ', ';\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n  margin: 0 4px;\n  padding: 0 3px;\n  border-radius: 4px;\n  font-size: 10px;\n  background-color: ', ';\n  color: #fff;\n'], ['\n  margin: 0 4px;\n  padding: 0 3px;\n  border-radius: 4px;\n  font-size: 10px;\n  background-color: ', ';\n  color: #fff;\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  padding: 0 6px;\n  color: ', ';\n  &:first-of-type {\n    padding-left: 0;\n  }\n'], ['\n  padding: 0 6px;\n  color: ', ';\n  &:first-of-type {\n    padding-left: 0;\n  }\n']);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }














var color = Styles__WEBPACK_IMPORTED_MODULE_12__["theme"].color;


var ConfigBody = Object(styled_components__WEBPACK_IMPORTED_MODULE_7__["default"])(Components_configPage__WEBPACK_IMPORTED_MODULE_11__["Body"]).attrs({ className: 'config-body' })(_templateObject, Styles__WEBPACK_IMPORTED_MODULE_12__["theme"].headerHeight);

var Figure = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].figure(_templateObject2);
var Alipay = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].img(_templateObject3);

var Header = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].div(_templateObject4, color('bilibili-pink'));

var Footer = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].div(_templateObject5);

var Broadcast = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].p(_templateObject6, color('bilibili-pink'));
var PermissionTag = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].span.attrs({
    title: function title(_ref) {
        var _title = _ref.title;
        return _title;
    }
})(_templateObject7, color('bilibili-blue'));

var PermissionErrorDescription = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].span(_templateObject8, color('bilibili-pink'));

var PageConfig = function (_React$Component) {
    _inherits(PageConfig, _React$Component);

    function PageConfig(props) {
        _classCallCheck(this, PageConfig);

        var _this = _possibleConstructorReturn(this, (PageConfig.__proto__ || Object.getPrototypeOf(PageConfig)).call(this, props));

        _this.handleSetSetting = function (_ref2) {
            var _ref2$kind = _ref2.kind,
                kind = _ref2$kind === undefined ? '' : _ref2$kind,
                featureName = _ref2.featureName,
                settingName = _ref2.settingName,
                _ref2$subPage = _ref2.subPage,
                subPage = _ref2$subPage === undefined ? false : _ref2$subPage,
                on = _ref2.on;

            var name = lodash_upperFirst__WEBPACK_IMPORTED_MODULE_3___default()(featureName);
            var thisKindOfFeatures = _this.state[kind];
            if (!!thisKindOfFeatures.map[name]) {
                var settingObject = thisKindOfFeatures.map[name];
                if (!settingName && !on) {
                    settingObject.on = !settingObject.on;
                } else if (settingName && settingObject.type && !subPage) {
                    if (settingObject.type === 'checkbox' && on !== undefined) {
                        var index = lodash_findIndex__WEBPACK_IMPORTED_MODULE_2___default()(settingObject.options, { key: settingName });
                        settingObject.options[index].on = on;
                    } else if (settingObject.type === 'radio') {
                        settingObject.value = settingName;
                    } else {
                        console.error('Undefined type: ' + settingObject.type + ' (\u2299\u02CD\u2299)!');
                        return;
                    }
                } else if (settingName && settingObject.subPage && subPage) {
                    if (settingObject.subPage.type === 'checkbox') {
                        var _index = lodash_findIndex__WEBPACK_IMPORTED_MODULE_2___default()(settingObject.subPage.options, { key: settingName });
                        settingObject.subPage.options[_index].on = on;
                    } else if (settingObject.subPage.type === 'radio') {
                        settingObject.subPage.value = settingName;
                    } else {
                        console.error('Undefined type: ' + settingObject.subPage.type + ' (\u2299\u02CD\u2299)!');
                        return;
                    }
                } else {
                    console.error('Error Setting Object \u03A3(o\uFF9F\u0434\uFF9Fo\uFF89)!');
                    return;
                }
                chrome.runtime.sendMessage({
                    commend: 'setSetting',
                    feature: name,
                    settings: settingObject
                }, function (res) {
                    if (res) {
                        chrome.runtime.sendMessage({
                            commend: 'setGAEvent',
                            action: 'click',
                            category: 'config',
                            label: featureName + ' ' + (settingName !== undefined ? settingName + ' ' + settingObject.on : settingObject.on)
                        });
                        thisKindOfFeatures.map[name] = settingObject;
                        _this.setState(_defineProperty({}, kind, thisKindOfFeatures));
                    }
                });
            } else console.error('Not find kind[' + kind + ']\'s setting (*\uFF9F\u0414\uFF9F*)!');
        };

        _this.createSettingDOM = function () {
            var _this$state = _this.state,
                permissionMap = _this$state.permissionMap,
                debug = _this$state.debug;

            return lodash_map__WEBPACK_IMPORTED_MODULE_1___default()(_this.settings, function (e, kind) {
                var list = _this.state[kind];
                return !lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(list.map) ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                    Components_configPage__WEBPACK_IMPORTED_MODULE_11__["List"],
                    { key: kind, title: list.title, ref: function ref(i) {
                            return _this[kind + 'Ref'] = i;
                        } },
                    lodash_map__WEBPACK_IMPORTED_MODULE_1___default()(list.map, function (settings, featureName) {
                        var on = settings.on,
                            description = settings.description,
                            title = settings.title,
                            subPage = settings.subPage,
                            toggle = settings.toggle,
                            permissions = settings.permissions;

                        var SubListChildren = _this.createSubListComponent({ kind: kind, featureName: featureName, settings: settings });
                        var toggleMode = toggle === undefined || subPage ? true : toggle;

                        var handleOpenSubPage = function handleOpenSubPage() {
                            return _this.handleSetSubPage({ parent: _this[kind + 'Ref'], settings: settings });
                        };
                        var onClick = subPage ? handleOpenSubPage : function () {
                            return _this.handleSetSetting({ kind: kind, featureName: featureName });
                        };
                        var operation = subPage ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_9__["Button"], { icon: 'arrowRight' }) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_9__["CheckBoxButton"], { disable: !toggleMode,
                            on: on });

                        var errorDescription = [];
                        var permissionList = lodash_map__WEBPACK_IMPORTED_MODULE_1___default()(permissions, function (name) {
                            if (name in permissionMap && !permissionMap[name]) {
                                errorDescription.push(react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                                    PermissionErrorDescription,
                                    null,
                                    Libs_permissionManager__WEBPACK_IMPORTED_MODULE_10__["PERMISSION_STATUS"][name].description
                                ));
                            }
                            return debug ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                                PermissionTag,
                                { title: Libs_permissionManager__WEBPACK_IMPORTED_MODULE_10__["PERMISSION_STATUS"][name].description },
                                lodash_upperFirst__WEBPACK_IMPORTED_MODULE_3___default()(name)
                            ) : null;
                        });
                        var twoLine = description !== undefined || errorDescription.length > 0;
                        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                            Components_configPage__WEBPACK_IMPORTED_MODULE_11__["ListItem"],
                            {
                                key: featureName,
                                toggle: toggleMode,
                                onClick: on !== undefined && toggleMode !== false ? onClick : null,
                                operation: on !== undefined ? operation : null,
                                subList: SubListChildren ? {
                                    hide: on === undefined ? false : !on,
                                    children: SubListChildren
                                } : null,
                                twoLine: twoLine,
                                first: twoLine ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                                    react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment,
                                    null,
                                    title,
                                    permissionList
                                ) : '',
                                second: twoLine ? errorDescription.length > 0 ? errorDescription : description : ''
                            },
                            twoLine ? null : title,
                            permissionList
                        );
                    })
                ) : null;
            });
        };

        _this.createSubListComponent = function (_ref3) {
            var _ref3$kind = _ref3.kind,
                kind = _ref3$kind === undefined ? '' : _ref3$kind,
                _ref3$featureName = _ref3.featureName,
                featureName = _ref3$featureName === undefined ? '' : _ref3$featureName,
                _ref3$settings = _ref3.settings,
                settings = _ref3$settings === undefined ? {} : _ref3$settings,
                _ref3$subPage = _ref3.subPage,
                subPage = _ref3$subPage === undefined ? false : _ref3$subPage;

            var SubListChildren = null;
            var options = settings.options,
                type = settings.type,
                value = settings.value;

            if (!!options && !!type) {
                switch (settings.type) {
                    case 'checkbox':
                        SubListChildren = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components_configPage__WEBPACK_IMPORTED_MODULE_11__["CheckBoxGroup"], {
                            data: options,
                            onClick: function onClick(settingName, on) {
                                return _this.handleSetSetting({
                                    kind: kind, featureName: featureName, settingName: settingName, on: on, subPage: subPage
                                });
                            }
                        });
                        break;
                    case 'radio':
                        SubListChildren = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components_configPage__WEBPACK_IMPORTED_MODULE_11__["RadioButtonGroup"], {
                            value: value,
                            data: options,
                            onClick: function onClick(settingName) {
                                return _this.handleSetSetting({ kind: kind, featureName: featureName, settingName: settingName, subPage: subPage });
                            }
                        });
                        break;
                }
            }
            return SubListChildren;
        };

        _this.handleSetSubPage = function (_ref4) {
            var _ref4$parent = _ref4.parent,
                parent = _ref4$parent === undefined ? null : _ref4$parent,
                _ref4$settings = _ref4.settings,
                settings = _ref4$settings === undefined ? null : _ref4$settings,
                _ref4$subPageList = _ref4.subPageList,
                subPageList = _ref4$subPageList === undefined ? false : _ref4$subPageList,
                _ref4$subPageTitle = _ref4.subPageTitle,
                subPageTitle = _ref4$subPageTitle === undefined ? null : _ref4$subPageTitle,
                pageType = _ref4.pageType;
            var _this$state2 = _this.state,
                subPageOn = _this$state2.subPageOn,
                currentParent = _this$state2.parent;

            var newState = {
                subPageOn: !subPageOn,
                subPageTitle: settings ? settings.title : subPageTitle,
                subPageParent: currentParent !== parent && parent && parent.ListWrapper ? parent.ListWrapper.querySelector('.list-body') : null,
                subPageSettings: settings,
                subPageList: subPageList,
                pageType: pageType
            };

            _this.setState(newState);
        };

        _this.createSubPage = function (pageType) {
            var _this$state3 = _this.state,
                subPageSettings = _this$state3.subPageSettings,
                subPageList = _this$state3.subPageList;

            switch (pageType) {
                case 'feed':
                    return lodash_map__WEBPACK_IMPORTED_MODULE_1___default()(subPageList, function (feedData, index) {
                        var _feedData = _slicedToArray(feedData, 4),
                            time = _feedData[0],
                            name = _feedData[1],
                            num = _feedData[2],
                            ps = _feedData[3];

                        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components_configPage__WEBPACK_IMPORTED_MODULE_11__["ListItem"], {
                            key: index,
                            operation: '\uFFE5' + (+num).toFixed(2),
                            twoLine: true,
                            first: name,
                            second: time + ' - ' + (ps || '没有留言')
                        });
                    });
                case 'update':
                    return lodash_map__WEBPACK_IMPORTED_MODULE_1___default()(subPageList, function (list, title) {
                        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components_configPage__WEBPACK_IMPORTED_MODULE_11__["UpdateList"], { key: title, title: title, data: list });
                    });
                default:
                    {
                        var kind = subPageSettings.kind,
                            featureName = subPageSettings.name,
                            on = subPageSettings.on,
                            toggle = subPageSettings.toggle,
                            subPage = subPageSettings.subPage;

                        var subList = _this.createSubListComponent({ kind: kind, featureName: featureName, settings: subPage, subPage: true });
                        var twoLine = subPage.description !== undefined;
                        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                            Components_configPage__WEBPACK_IMPORTED_MODULE_11__["ListItem"],
                            {
                                toggle: toggle,
                                onClick: function onClick() {
                                    return _this.handleSetSetting({ kind: kind, featureName: featureName });
                                },
                                operation: react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_9__["CheckBoxButton"], { on: on }),
                                twoLine: twoLine,
                                first: twoLine ? subPage.title : '',
                                second: twoLine ? subPage.description : '',
                                subList: {
                                    hide: on === undefined ? false : !on,
                                    children: subList
                                }
                            },
                            twoLine ? null : subPage.title
                        );
                    }
            }
        };

        _this.handleOpenFeedList = function () {
            _this.handleSetSubPage({
                parent: _this.aboutRef,
                subPageList: Statics_json_feed_json__WEBPACK_IMPORTED_MODULE_16__,
                subPageTitle: '用户投喂列表',
                pageType: 'feed'
            });
        };

        _this.handleOpenUpdateList = function () {
            _this.handleSetSubPage({
                parent: _this.aboutRef,
                subPageList: Statics_json_update_json__WEBPACK_IMPORTED_MODULE_13__,
                subPageTitle: '版本更新日志',
                pageType: 'update'
            });
        };

        _this.handleCheckVersion = function () {
            var checkingVersion = _this.state.checkingVersion;

            if (checkingVersion) return;else _this.setState({ checkingVersion: true });
            chrome.runtime.sendMessage({
                commend: 'checkVersion'
            }, function () {
                setTimeout(function () {
                    return _this.setState({ checkingVersion: false });
                }, 500);
            });
        };

        _this.settings = {
            video: { title: '主站', map: {} },
            live: { title: '直播', map: {} },
            popup: { title: '菜单栏', map: {} },
            other: { title: '其他', map: {} }
        };
        _this.defaultBroadcast = '如果您的版本显示为测试版或者出现了问题，请尝试卸载本扩展后重新安装';
        _this.state = _extends({
            modalTitle: null,
            modalBody: null,
            modalButtons: null,
            modalOn: false,

            subPageTitle: null,
            subPageParent: null,
            subPageOn: false,
            subPageSettings: null,
            subPageList: false }, _this.settings, {

            debug: false,

            broadcast: _this.defaultBroadcast,

            permissionMap: {},

            checkingVersion: false,

            version: null
        });

        chrome.runtime.onMessage.addListener(function (message) {
            if (message.commend === 'debugMode') {
                _this.setState({ debug: message.value });
            }
        });
        return _this;
    }

    _createClass(PageConfig, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            chrome.runtime.sendMessage({ commend: 'getSettings', checkHide: true }, function (settings) {
                lodash_forEach__WEBPACK_IMPORTED_MODULE_4___default()(settings, function (setting) {
                    var kind = setting.kind,
                        name = setting.name;

                    _this2.settings[kind].map[lodash_upperFirst__WEBPACK_IMPORTED_MODULE_3___default()(name)] = setting;
                });
                _this2.setState(_this2.settings);
            });

            chrome.runtime.sendMessage({ commend: 'getSetting', feature: 'Debug' }, function (setting) {
                _this2.setState({ debug: setting.on });
            });

            chrome.runtime.sendMessage({ commend: 'inIncognitoContext' }, function (inIncognitoContext) {
                if (inIncognitoContext) {
                    _this2.setState({ broadcast: '您正在使用隐身模式，该模式下部分功能将无法正常启用' });
                } else {
                    _this2.setState({ broadcast: _this2.defaultBroadcast });
                }
            });
            chrome.runtime.sendMessage({ commend: 'getPermissionMap' }, function (permissionMap) {
                _this2.setState({ permissionMap: permissionMap });
            });
            chrome.runtime.sendMessage({ commend: 'getFeatureStore', feature: 'versionManager' }, function (featureStore) {
                _this2.setState({ version: featureStore.version });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                modalOn = _state.modalOn,
                modalTitle = _state.modalTitle,
                modalBody = _state.modalBody,
                modalButtons = _state.modalButtons,
                subPageOn = _state.subPageOn,
                subPageTitle = _state.subPageTitle,
                subPageParent = _state.subPageParent,
                pageType = _state.pageType,
                debug = _state.debug,
                broadcast = _state.broadcast,
                checkingVersion = _state.checkingVersion,
                version = _state.version;

            return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment,
                null,
                react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                    ConfigBody,
                    null,
                    react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                        Header,
                        null,
                        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                            'h1',
                            null,
                            'BILIBILI HELPER'
                        ),
                        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                            'sub',
                            null,
                            'version ' + version + '\uFF08' + (debug === true ? '测试' : '正式') + '\u7248\uFF09'
                        )
                    ),
                    react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                        Broadcast,
                        null,
                        broadcast,
                        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement('br', null)
                    ),
                    react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                        Components_configPage__WEBPACK_IMPORTED_MODULE_11__["SubPage"],
                        {
                            on: subPageOn,
                            title: subPageTitle,
                            parent: subPageParent,
                            onClose: function onClose() {
                                return _this3.handleSetSubPage(subPageParent);
                            }
                        },
                        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                            Components_configPage__WEBPACK_IMPORTED_MODULE_11__["List"],
                            null,
                            subPageOn && this.createSubPage(pageType)
                        )
                    ),
                    this.createSettingDOM(),
                    react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                        Components_configPage__WEBPACK_IMPORTED_MODULE_11__["List"],
                        { title: '\u5173\u4E8E', ref: function ref(i) {
                                return _this3.aboutRef = i;
                            } },
                        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components_configPage__WEBPACK_IMPORTED_MODULE_11__["ListItem"], {
                            icon: react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_9__["Icon"], { iconfont: 'cat', image: true }),
                            twoLine: true,
                            first: chrome.i18n.getMessage('extensionName'),
                            second: '\u7248\u672C ' + version + '\uFF08' + (debug ? '测试' : '正式') + '\u7248\uFF09',
                            separator: true,
                            operation: react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                                Components__WEBPACK_IMPORTED_MODULE_9__["Button"],
                                { loading: checkingVersion, normal: true, onClick: this.handleCheckVersion },
                                '\u68C0\u67E5\u66F4\u65B0'
                            )
                        }),
                        lodash_map__WEBPACK_IMPORTED_MODULE_1___default()(Statics_json_announcement_json__WEBPACK_IMPORTED_MODULE_14__, function (list, title) {
                            return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components_configPage__WEBPACK_IMPORTED_MODULE_11__["UpdateList"], { key: title, title: title, data: list });
                        }),
                        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components_configPage__WEBPACK_IMPORTED_MODULE_11__["ListItem"], {
                            twoLine: true,
                            first: '\u66F4\u65B0\u65E5\u5FD7',
                            second: '\u5305\u542B ' + Object.keys(Statics_json_update_json__WEBPACK_IMPORTED_MODULE_13__).length + ' \u6B21\u66F4\u65B0',
                            onClick: this.handleOpenUpdateList,
                            operation: react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_9__["Button"], { icon: 'arrowRight' })
                        }),
                        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components_configPage__WEBPACK_IMPORTED_MODULE_11__["ListItem"], {
                            twoLine: true,
                            first: '\u6295\u5582\u5217\u8868 - ' + Statics_json_feed_json__WEBPACK_IMPORTED_MODULE_16__.length + '\u6761',
                            second: '\u624B\u52A8\u66F4\u65B0\uFF0C\u4EC5\u4E3A\u8089\u8089\u6536\u5230\u7684\u6295\u5582\uFF0C\u53EF\u80FD\u5305\u542B\u751F\u6D3B\u4E2D\u7684\u975E\u6295\u5582\u4FE1\u606F',
                            onClick: this.handleOpenFeedList,
                            operation: react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_9__["Button"], { icon: 'arrowRight' })
                        })
                    ),
                    react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                        Footer,
                        null,
                        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                            'a',
                            { href: 'https://github.com/zacyu/bilibili-helper' },
                            'Github'
                        ),
                        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                            'a',
                            { href: 'https://bilihelper.guguke.net' },
                            'Website'
                        ),
                        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                            'a',
                            { href: 'https://chrome.google.com/webstore/detail/kpbnombpnpcffllnianjibmpadjolanh' },
                            'Chrome WebStore'
                        ),
                        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                            'span',
                            null,
                            'Copyright (c) 2018 ',
                            react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                                'a',
                                { href: 'mailto:me@zacyu.com' },
                                'Zac Yu'
                            ),
                            ', Google LLC, ',
                            react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                                'a',
                                {
                                    href: 'mailto:jjj201200@gmail.com' },
                                'Drowsy Flesh'
                            )
                        ),
                        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                            Figure,
                            null,
                            react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Alipay, { src: './statics/imgs/alipay-df.png', alt: 'alipay' }),
                            react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(
                                'figcaption',
                                null,
                                '\u611F\u8C22\u652F\u6301'
                            )
                        )
                    )
                ),
                react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Components__WEBPACK_IMPORTED_MODULE_9__["Modal"], { on: modalOn, title: modalTitle, body: modalBody, buttons: modalButtons })
            );
        }
    }]);

    return PageConfig;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

react_dom__WEBPACK_IMPORTED_MODULE_6___default.a.render(react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(PageConfig, null), document.getElementById('root'), Utils__WEBPACK_IMPORTED_MODULE_8__["consoleLogo"]);

/***/ }),

/***/ "./src/statics/json/announcement.json":
/*!********************************************!*\
  !*** ./src/statics/json/announcement.json ***!
  \********************************************/
/*! exports provided: 功能删除须知, 第三方引用声明, default */
/***/ (function(module) {

module.exports = {"功能删除须知":["从0.8.16.13版本开始不再提供<i>区域限制解锁</i>和<i>自动抽奖</i>功能","从0.8.16.20版本开始不再提供<i>播放器切换</i>功能","从1.0.0版本开始不再提供<i>礼物包裹增强</i>和主站播放器的<i>自动定位</i>功能"],"第三方引用声明":["本项目中使用的 ASS 格式弹幕转换脚本修改自 tiansh 以 <a href\"http://www.mozilla.org/MPL/2.0/\" target=\"_blank\">Mozilla Public License 2.0</a> 发布的开源项目 <a href=\"https://github.com/tiansh/us-danmaku\" target=\"_blank\">us-danmaku</a>","本项目中使用的本地 CRC32 反查脚本修改自 xmcp 以 <a href=\"https://github.com/xmcp/pakku.js/blob/master/LICENSE.txt\" target=\"_blank\">GPL 许可协议</a> 发布的开源项目 <a href=\"https://github.com/xmcp/pakku.js\" target=\"_blank\">pakku.js</a> 中的 CRC32 Cracker"]};

/***/ }),

/***/ "./src/statics/json/feed.json":
/*!************************************!*\
  !*** ./src/statics/json/feed.json ***!
  \************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, default */
/***/ (function(module) {

module.exports = [["2018/12/07","*鑫",2,"加油哇"],["2018/12/07","*熙",10,""],["2018/12/06","*吴越",6.66,"加油！"],["2018/12/04","*路",20,""],["2018/12/04","*傲宇",20,"大大加油哦，白嫖那么久，支持一波？"],["2018/12/04","*烨枫",10,"请你吃薯片"],["2018/12/01","*思玮",10,"请继续加油"],["2018/11/30","*涛",23.33,""],["2018/11/29","*骥",6.66,"一直很喜欢"],["2018/11/28","*毓晖",2.33,"加油老哥"],["2018/11/28","*沚昂",2.33,""],["2018/11/27","*清岚",2.33,""],["2018/11/26","*果",5,""],["2018/11/26","*舟",2,"吸鑫鑫"],["2018/11/26","*含",5,"用到了就表示一下吧"],["2018/11/25","*萌",10,""],["2018/11/25","*双钦",1,""],["2018/11/25","*岩岑",1.5,"感谢插件的制作！"],["2018/11/23","*雷",2.33,"支持一下"],["2018/11/22","*涵",15,"加油"],["2018/11/22","*锰",0.99,"加油"],["2018/11/22","*雨",10,"rua，感觉喂食记录好穷酸啊"],["2018/11/22","*龙",10,""],["2018/11/22","*俊毅",5,"最近更新的好勤快，支持"],["2018/11/22","*汝鑫",13,""],["2018/11/21","*韫智",5,"肥肠好用，感谢开发者"],["2018/11/21","*当杨",5,"支持！"],["2018/11/21","*润天",10,"支持！"],["2018/11/20","*相阳",5,"开浏览器第一件事就是点击它"],["2018/11/20","*延镇",5,"助手新界面很棒，谢谢维护！"],["2018/11/20","*亭萱",20,"感谢，一如既往地好用"],["2018/11/16","*志斌",10,"助手很好用，支持一下！"],["2018/11/13","*梦龙",10,"小穷逼，感谢大大啦！大大等我赚钱啊！"],["2018/11/11","*政文",6.66,"支持"],["2018/11/10","*鹏杰",2,""],["2018/11/10","*郅祺",5,""],["2018/11/09","*朋轩",30,""],["2018/11/08","*梓明",18.88,"用了一段时间，真的比较好用，舒服"],["2018/11/07","*海潮",3,""],["2018/10/31","*丰铭",1,"感谢！"],["2018/10/28","*志琛",10,""],["2018/10/27","*少帅",0.66,"支持一下咯"],["2018/10/23","*晋珏",5,"好的拓展，必须资瓷"],["2018/10/22","*鑫",5,"我能自己投喂自己吗？"],["2018/10/21","*智超",5,"加油"],["2018/09/26","*小红",1,"支持一下"],["2018/09/22","*语馨",1,""],["2018/09/20","*瑞雪",33.33,"求更新匹配新版网页，很怕哪天旧版突然没了"],["2018/09/15","*涵",6,""],["2018/09/14","*一帆",0.1,"测试测试"],["2018/09/10","*永慷",25,"用助手不能送银瓜子辣条了"],["2018/08/27","*文秋",4.92,"emmmm催更！（啥玩意）"],["2018/08/26","*智毅",10,"滋磁一下"],["2018/08/25","*振中",6.66,"滋磁一下"],["2018/08/20","*虹旭",5,"支持下"],["2018/08/19","*天迈",2,"送dalao俩硬币"],["2018/08/16","*皓若",12.33,"用了插件很久，非常实用！滋瓷一下"],["2018/08/14","*子超",6,"请你俩喝瓶肥宅快乐水"],["2018/08/11","*炜",2.33,""],["2018/08/10","*世圆",2.33,"谢谢大佬，bilibili干杯"],["2018/08/06","*伟",1,""],["2018/08/04","*楚",1,""],["2018/08/04","*钡钡",0.2,""],["2018/08/04","*瑞雪",10,"用了很久了嘻嘻~就是最近获取地址失败嘤嘤"],["2018/07/31","*野",3,""],["2018/07/28","*向南",8,"能支持就支持下啦"],["2018/07/28","*育欣",3,"扩展不错，谢谢大佬奉献"],["2018/07/27","*涵",10,"加油~"],["2018/07/20","*伟宁",2.33,""],["2018/07/19","*飞霰",2.33,"抢占头条"],["2018/07/16","*镇铭",2.33,"这个投喂记录也太寒酸了吧"],["2018/07/11","*蔚然",2.33,"吃肉肉基金"],["2018/07/11","*玮琳",6.06,""],["2018/06/29","*琦桢",2,"用了那么久扩展 还是投喂个2.33吧"],["2018/06/29","*森",2.33,"用了那么久扩展 还是投喂个2.33吧"],["2018/06/28","*凯",0.02,""],["2018/06/27","*少英",1.99,"感谢"],["2018/06/27","*琛",10,"谢谢大佬~"],["2018/06/26","*凯",0.02,""],["2018/06/26","*杨军",5,"加油"],["2018/06/25","*弘毅",22.33,"既然用到了就支持一下"],["2018/06/21","*文庆",2.58,"做兄弟在心中，有分p的视频查询不了弹幕"],["2018/06/20","*君臣",6.66,"投喂好少 ~ 凑个数"],["2018/06/20","*敏",10,"感谢作者的无私奉献和坚持，支持一下"],["2018/06/18","*祺迪",8.88,""],["2018/06/18","*雨赫",1,"学生一只，看见穷酸的投喂记录就想投喂一下"],["2018/06/17","*庆生",5,"非常感谢你们的插件"],["2018/06/16","*闻简",1,"视频下载不了，不知道是不是我这边的问题"],["2018/06/15","*悠",3,"没多少钱，作者辛苦了"],["2018/06/14","*砚",4.4,""],["2018/06/13","*洋",0.57,""],["2018/06/06","*明明",1,""],["2018/06/05","*沈燕",2.33,""],["2018/06/04","*一鹤",12.33,"投喂"],["2018/06/03","*健",10,"晚餐加个鸡腿吧"],["2018/06/03","*金波",8.88,""],["2018/06/03","*国栋",6.9,"B站投喂 谢谢你的辛苦更新"],["2018/06/03","*长青",2,""],["2018/06/01","*世博",10,"赞助一下以示支持"],["2018/05/31","*旭晨",1,""],["2018/05/31","*长丞",6,""],["2018/05/31","*昕之",2.33,""],["2018/05/30","*延章",10,""],["2018/05/29","*繇",10,""],["2018/05/28","*楚成",10,"加油加油"],["2018/05/28","*皓辰",9.99,"初次投喂请多指教~"],["2018/05/26","*立岩",6.66,"助手超方便，谢谢！"],["2018/05/25","*为岩",3,""],["2018/05/25","*哲",5,""],["2018/05/18","*奇泓",6,"既然用到了，就表示一下吧，一点心意"],["2018/05/17","*超群",3,"加油"],["2018/05/13","*耀琦",10,"用你们的扩展用了很久了，现在终于不算白嫖了"],["2018/05/12","*明霖",1.99,"作者，视频自动宽屏用不了啊啊？"],["2018/05/11","*清怡",3,"加油哦"],["2018/05/10","*英东",1,"谢谢大佬"],["2018/05/09","*曾",66.66,"吃肉肉"],["2018/05/08","*立",10,""],["2018/05/08","*其麟",10,"直播开播功能为什么不行，好像没法设置主播"],["2018/05/06","*鑫",5,"感谢！"],["2018/05/05","*俊贤",6.66,"支持一下啦"],["2018/05/04","*健",2.33,"看到穷酸的喂食记录就想赞助一下"],["2018/05/02","*德禄",1.68,""],["2018/05/02","*海旭",6.66,"滋瓷一下"],["2018/04/30","*文昕",1,"一个硬币"],["2018/04/28","*佛喜",5,"视频下载有时候获取不出来，没有mp4"],["2018/04/28","*珩锋",20,"吃土大学生，一点心意表示感谢"],["2018/04/26","*益辰",5,""],["2018/04/25","*彦捷",2,"一个穷学生，这是一点小小心意"],["2018/04/25","*航",10,"支持一下"],["2018/04/25","*晓",2.33,"信仰充值"],["2018/04/24","*韩寒",6.66,"谢谢一直更新"],["2018/04/24","*伟杰",2.33,"mua"],["2018/04/23","*路驰",6.66,""],["2018/04/23","*雨晨",2,""],["2018/04/22","*翼",10,""],["2018/04/21","*璋德",0.66,""],["2018/04/20","*月锐",10,"有时候自动领瓜子会没有反应。。"],["2018/04/20","*澳",8,"电脑端的视频播放页面上下都没有播放助手了"],["2018/04/20","*鸣",1,"很好用"],["2018/04/19","*帅",10,"好用，加油"],["2018/04/17","*沈宁",10,"加油^ 0 ^ ~"],["2018/04/14","*秉监",1,"可以加一个自动关闭弹幕的功能吗？"],["2018/04/14","*星齐",5,""],["2018/04/13","*贤富",20,"感觉很不错，继续加油，不违法就好。"],["2018/04/13","*天罡",10,""],["2018/04/12","*佳奇","",""],["2018/04/12","*承沛",1,"人穷，一点心意"],["2018/04/11","*平强",6.66,""],["2018/04/09","*福通",30,"很惭愧，只能支持一点微笑的心意，谢谢大佬"],["2018/04/09","*小东",10,""],["2018/04/07","*早鸣",2.33,"大佬加油"],["2018/04/06","*文镇",5,"吃土学生的感谢"],["2018/04/05","*宁",10,"多谢！"],["2018/03/30","*威",10,""],["2018/03/30","*晨杰",2.33,"有了助手银瓜子没缺过？"],["2018/03/30","*政",10,"加油"],["2018/03/30","*国强",10,""],["2018/03/25","*燚",5,"感谢各位作者在开发过程中的付出"],["2018/03/25","*杰",20,""],["2018/03/24","*金华",10,""],["2018/03/24","*石子",5.2,"超棒的插件~爱你们-by绵木"],["2018/03/23","*德军",5,"辛苦了，用了很久了"],["2018/03/20","*鼎",10,"感谢插件，请继续更新"],["2018/03/20","*文韬",1,"现在领瓜子自动领不了了。V0.9.4"],["2018/03/19","*晨旸",10.61,"感谢，提一个建设性意见去污粉会档弹幕"],["2018/03/18","*帅",10,"加油↖（^ω^）↗"],["2018/03/18","*硕",10,"一点心意"],["2018/03/18","*婧雯",30,"感谢"],["2018/03/17","*博强",1.23,""],["2018/03/17","*宜",6.66,"谢谢作者重新添加自动宽屏功能啦！很实用！"],["2018/03/14","*一铭",10,"谢谢作者"],["2018/03/12","*茵茵",5,"穷人的一点心意？"],["2018/03/11","*浩",0.59,"在非洲，每60秒就有1分钟过去"],["2018/03/09","*杰",5,"看直播的时候，领瓜子倒计时会停住"],["2018/03/09","*少杰",2.33,""],["2018/03/08","*伟",2.33,""],["2018/03/05","*子溦",10,""],["2018/03/04","*浩鑫",1,""],["2018/03/04","*振启",2.33,"希望大大可以一直更新哔哩哔哩助手，感谢"],["2018/03/03","*晨灏",5,"很好用，感谢"],["2018/03/02","*洪源",12,"感谢~"],["2018/02/26","*晓明",3,""],["2018/02/24","*文阳",10,"辛苦了"],["2018/02/23","*浩",66.66,"助手很好用，赞助一下。最近自动签到不能用"],["2018/02/22","*焕宇",6.66,"感谢作者更新，我们支持你"],["2018/02/21","*泉铭",22.33,"感谢有你"],["2018/02/21","*汉宁",6.66,666],["2018/02/20","*嘉亮",1,""],["2018/02/20","*秋鸿",0.01,""],["2018/02/20","*顺池",0.55,""],["2018/02/19","*康男",50,"感谢助手帮我解决懒癌2333"],["2018/02/18","*政浩",5,"新年快乐"],["2018/02/13","*依凡",2.33,"期待0.9.4"],["2018/02/13","*潮涛","","助手为什么不自动宽屏了，咕咕咕"],["2018/02/12","*茜",0.52,""],["2018/02/12","*茜",0.52,""],["2018/02/11","*涵瑒",5,"拜个早年 支持一下"],["2018/02/07","*晓",1,""],["2018/02/06","*志宁",10,"咕咕咕"],["2018/02/06","*佳澳",0.11,""],["2018/02/06","*睿彬",50,"感恩的心，感谢有你，srb0302"],["2018/02/04","*依琳",28.88,"支持一下 新年快乐"],["2018/02/01","*益",10,"新年快乐"],["2018/01/29","*尧",2.33,"b站有你们更可爱"],["2018/01/29","*尧",8.88,"感谢作者"],["2018/01/28","*为岩",3,""],["2018/01/28","*越扬",2.33,""],["2018/01/28","*佳澳",6.88,"Helper加油"],["2018/01/28","*承龙",6.66,""],["2018/01/28","*章德",1,""],["2018/01/27","*仲政",10,"多谢作者，码代码不易注意头发"],["2018/01/26","*波宏",5,"加油！支持一下"],["2018/01/25","*双华",1,""],["2018/01/22","*家城",1.8,"小给力，支持到底！"],["2018/01/20","*艺瑾",5,"谢谢插件"],["2018/01/19","*文涛",6.66,""],["2018/01/15","*军",6.66,"陪伴了我很久，支持一下"],["2018/01/15","*嘉荣",6.66,"(:3[__]就是懒得领瓜子和签到"],["2018/01/14","*雨轩",5,""],["2018/01/14","*富奇",10,"感谢大佬回来更新"],["2018/01/13","*丰毅",30,"感谢更新助手？"],["2018/01/13","*帆",2.33,"bilibili"],["2018/01/12","*庆锋",2.33,"感谢"],["2018/01/11","*文浩",2.33,""],["2018/01/11","*世森",5,"？"],["2018/01/10","*艺",3,"火狐不能添加未经认证的拓展~呜呜呜"],["2018/01/10","*艺",3,"建议在Firefox扩展商发布拓展"],["2018/01/10","*旭嫒",6.66,"一点小心意"],["2018/01/10","*中敬",5,"支持 & 感谢！下载视频太方便了！"],["2018/01/09","*苏尧",10,"0.9.3版取消自动宽屏了吗？找不到了？肉肉：是的，找不到了"],["2018/01/09","*维良",10,"拍打喂食"],["2018/01/09","*明俊",2.33,""],["2018/01/09","*欣",10,""],["2018/01/07","*宏佳",8,"支持感谢"],["2018/01/07","*煜航",18.88,"咕咕咕咕咕咕咕咕咕咕咕"],["2018/01/03","*旭东",10,""],["2017/12/31","*帅",5,""],["2017/12/27","*有为",6,""],["2017/12/27","*梦阳",2.33,""],["2017/12/15","刘",30,""],["2017/12/15","*少举",29.99,""],["2017/12/14","*适雅",10,""],["2017/02/04","*宇",2.33,""],["2017/11/25","*胜铭",1,""],["2017/01/09","*航",3,""],["2017/01/03","冰少",20,"Helper很好用！该更新啦！"],["2017/01/01","*雨阳",0.38,""],["2017/09/14","汉林",0.5,""],["2017/09/11","刘",10,""],["2017/08/03","赵子祺",50,"感谢?(q??q?)?"],["2017/07/27","见见",50,""],["2017/07/26","夜夜申哥",6.66,"肉肉么么哒，你猜我是谁"],["2017/07/23","Kanami",1,""],["2017/07/20","四时昕夕",10,"谢谢肉肉给群里做的特别版=3="],["2017/07/18","松花小赌",1,"谢谢您"],["2017/07/15","梦界",10,"哔哩哔哩助手"],["2017/07/13","青花鱼",23.33,"助手简介里有错字的说。这些改动被【称为】"],["2017/06/07","haha",3,""],["2017/05/30","路",50,"∠(?」∠)＿"],["2017/05/14","Lucis",5,"助手项目"],["2017/05/14","绯丶",2.33,""],["2017/05/14","风云",20,""],["2017/05/14","NIF",1,"支持一下"],["2017/05/13","习习蛤蛤",10,"助手"],["2017/05/12","郑州",2.33,"吃个糖吧！"],["2017/05/11","考拉",2,""],["2017/05/11","黑夜的追踪者",3,""],["2017/05/11","maghsk",3,"主持哔哩哔哩助手！"],["2017/05/11","旭平",5,"喝瓶♂脉动♂压压惊;)"],["2017/05/10","我是吃多君",2.33,""],["2017/05/10","贶家",10,""],["2017/04/19","蔚",10,""],["2017/04/14","lulu",20,""],["2017/04/12","悦楠诗",1,""],["2017/04/11","李安",10,""],["2017/04/08","mingtime",5,""],["2017/04/05","放洋屁的玉米芯",2.33,"谢谢你们提供的方便"],["2017/04/04","璐",2.33,""],["2017/04/04","Null",1,""],["2017/03/31","周 D",5,"感谢对哔哩哔哩助手的开发与维护"],["2017/03/30","慕风",10,"很好用，我喜欢"],["2017/03/25","五元",5,"希望越做越好(??????)??"],["2017/03/22","文淼",10,"助手真是神器啊，很好用，来自学生党的投喂"],["2017/03/21","唐小小",0.01,""],["2017/03/19","Null",1.14,"有时候领不了瓜子，提示过期0.0"],["2017/03/18","Hyalincry",13.14,""],["2017/03/17","王国沣",5,"学生党一枚，没啥钱，不过还是尽量支持蛤"],["2017/03/16","Dream",2.33,""],["2017/03/13","塔菲",10,""],["2017/03/04","航泽",5,""],["2017/03/01","孙彦韬",5,""],["2017/02/18","俊廷",5,""],["2017/02/17","岩",10,""],["2017/02/11","oo0oo",1,""],["2017/02/09","兔砸",5,""],["2017/02/04","胖子一号",10,""],["2017/01/29","法英",2.33,""],["2017/01/28","狮之心",10,""],["2017/01/27","见见",1.68,""],["2017/01/25","PureWhite",1,""],["2017/01/21","俊彦","",""],["2017/01/17","绯色刀锋",1,""],["2017/01/17","宇翔","",""],["2017/01/13","思玮",20,""],["2017/01/06","CZM",10,""],["2017/01/06","王朋",2.33,""],["2017/01/05","sun of beach",5,"学生狗，愿为哔哩哔哩助手贡献一顿早饭钱"],["2017/01/04","娘化虚子",5,""],["2017/01/01","湫去椿来",1,""],["2016/12/31","思越",5,"很好用"],["2016/12/30","千瓦大灯泡",5,""],["2016/12/29","我是火车王",3,""],["2016/12/25","昭函",1,"视频下载地址好像获取不了，一直获取中"],["2016/12/25","昭函",2.33,"感谢"],["2016/12/18","四万个壮汉突然",5,"Bilibili，乾杯！"],["2016/11/17","叶涛",20,""],["2016/11/17","骁",5,"用了助手后方便了很多，一点小心意不成敬意"],["2016/11/14","涛",1,"支持"],["2016/01/04","杀人腊肉",10,"一点小心意"],["2016/10/29","X",3,"感谢~"],["2016/10/28","汪汪汪",10,""],["2016/10/28","キセキ",5,"哔哩哔哩助手用很久了，小小诚意"],["2016/10/25","自古以来",2.36,"插件投喂，多3分是因为名字里同样有个鑫"],["2016/10/22","栗子",20,"ご苦氦丹箜(_ _)m"],["2016/10/21","大树",2.33,"感谢您提供哔哩哔哩插件"],["2016/10/21","木瓜",0.1,""],["016/10/15","death fish",5,"加油t(*?︶`*)s"],["2016/10/11","lzj",15,""],["2016/10/10","典",5,"学生党，投食不多，聊表心意"],["2016/10/07","微の柯尼",5,"哔哩哔哩助手投喂 作者加油"],["2016/10/03","刨",10,"祝bilibili Helper越做越好"],["2016/09/30","挚宝呀",5,"蟹蟹blbl助手，炒鸡好用"],["2016/09/25","雨兮",30,"感谢开发助手QVQ"],["2016/09/24","扯",5,""],["2016/09/15","未来的两人",5.2,"感谢你们的付出(/ω＼)"],["2016/09/09","擀人肺腑",3,""],["2016/09/07","见见",55.55,""],["2016/09/07","见见",66.66,""],["2016/09/02","Yeqing",2,""],["2016/08/28","洁",10,""],["2016/08/28","叶子",50,""],["2016/08/27","零部件",6.66,"感谢开发〜"],["2016/08/27","prprpr",0.5,""],["2016/08/26","戈登走过去",1,"为了支持B站助手尽我的微薄之力"],["2016/08/25","Moon",2.33,"投食一波"],["2016/08/25","哟哟切克包",5,"蟹蟹聚聚 托你们的福领了好多礼物啊 〜"],["2016/08/25","思铭",5,""],["2016/08/25","Dante",2,""],["2016/08/24","枫叶",3,""],["2016/08/23","不得知晓",12,""],["2016/08/22","静",50,"既然不要抱枕"],["2016/08/22","Pitt",0.66,"求b站py交易阿！！！重要！！"],["2016/08/22","Pitt",6.66,""],["2016/08/21","DiorDing",1,""],["2016/08/20","卖人的小行家",20,"希望助手越做越好"],["2016/08/19","见见",8.88,""],["2016/08/19","见见",6.66,"补补"],["2016/08/18","心缘",20,""],["2016/08/16","契卡",10,"哔哩哔哩助手赞助"],["2016/08/15","sole.L",16.6,""],["2016/08/14","夏木",5,"继续加油?(?^o^?)?"],["2016/08/09","渔夫先生",5,""],["2016/08/06","梦明清",20,"感谢维护b站助手"],["2016/08/06","┲╅sǐㄈ&孤╊☆",10,"感谢开发软件"],["2016/08/06","剑艺",10,"+1s"],["2016/08/05","希望のh",50,""],["2016/08/03","lika酱dayo",5,"更新了 亦可赛艇！"],["2016/08/02","Unfold★",1,""],["2016/08/01","直king",5,""],["2016/08/01","肯",5.14,"海外功能帮大忙了，感谢，持续更新希望"],["2016/07/31","LARRY频道",6.66,""],["2016/07/31","苗",23.33,""],["2016/07/29","斌",5,"B站插件海外看番功能支持"],["2016/07/29","秣翔的",5,"谢谢"],["2016/07/24","闪电",5,""],["2016/07/22","琥珀",12,""],["2016/07/21","酥耳狸",2.33,"代捐助"],["2016/07/20","静",20,"感谢科技解放双手，感谢您的汗水"],["2016/07/20","Naiad",6.66,"助手很好用〜感谢〜"],["2016/07/20","WFFFF",2.33,""],["2016/07/19","泽润",5,"助手非常实用，作者大大加油！"],["2016/07/17","沈栋",5,"加油"],["2016/07/17","我是萌萌又可爱的水果店老板",1,"没什么钱一片心意感谢你的助手希望越做越好"],["2016/07/16","壮",16,"bilibili helper"],["2016/07/16","牛奶",10,"领瓜子好像失效了，修复一下吧，辛苦了"],["2016/07/16","幻梦落尘",2.33,"感谢dalao的插件，区区零钱不成敬意"],["2016/07/16","光速绕树",2.95,""],["2016/07/15","倪晨",13,"支持"],["2016/07/11","罗礼勇",5,"哈哈，能力有限，还是来支持一下吧。"],["2016/07/10","Paulbu",2,"b站助手〜祝越做越好！棒棒的"],["2016/07/08","浩然",10,"感觉发热量还是有点高"],["2016/07/03","泽",50,"bilibili插件赞一个〜"],["2016/06/29","红A","",""],["2016/06/23","厚颜陈",0.75,""],["2016/06/23","嘉宁",1,"很少用bili，所以只给一块，不过辛苦了"],["2016/06/23","磊",20,"感谢助手插件的开发"],["2016/06/22","飞虎",0.1,"一毛不拔"],["2016/06/22","西贝",10,""],["2016/06/22","酥耳狸",30,"黑科技大感谢。"],["2016/06/22","恐龙君",4.89,"滋瓷一下"],["2016/06/21","文骞",10,"喂食，更新辛苦"],["2016/06/21","Marcods",1,"升级提醒太骚扰人了吧喂"],["2016/06/21","捷",5,"加油>3<"],["2016/06/21","施展",5,"感谢bilibili助手"],["2016/06/20","剪剪",2.33,"助手加油"],["2016/06/20","翔介",20,""],["2016/06/18","黑羽星空",1,"廖表心意"],["2016/06/18","starP",5,"哔哩哔哩！"],["2016/06/17","小文锡",10,"稍微支持一下插件:)"],["2016/06/16","EagerVzr",20,"感谢开发这个插件！加油！！！"],["2016/05/14","溱",35,""]];

/***/ }),

/***/ "./src/statics/json/update.json":
/*!**************************************!*\
  !*** ./src/statics/json/update.json ***!
  \**************************************/
/*! exports provided: 版本 1.1.8, 版本 1.1.7, 版本 1.1.6, 版本 1.1.5, 版本 1.1.4, 版本 1.1.3, 版本 1.1.0 - 1.1.2, 版本 1.0.9 - 1.0.10, 版本 1.0.8, 版本 1.0.7, 版本 1.0.5 - 1.0.6, 版本 1.0.4, 版本 1.0.0 - 1.0.3, default */
/***/ (function(module) {

module.exports = {"版本 1.1.8":["修复<i>视频下载</i>功能中切换分P后下载链接不变的问题","修复<i>自动领瓜子</i>功能关闭推送后仍旧进行推送的问题","优化<i>自动检测更新</i>，<i>自动签到</i>和<i>银瓜子自动换硬币</i>功能执行时间","增加<i>自动签到</i>和<i>银瓜子自动换硬币</i>功能的推送选项","增加<i>手动检测更新</i>按钮","优化代码，解决因为版本更新后配置格式不兼容导致的各种问题","更新投喂信息"],"版本 1.1.7":["修复<i>银瓜子兑换硬币</i>功能存在的BUG，执行逻辑改为和<i>自动签到</i>功能一样","修复由于部分视频标题存在非法字符而导致<i>弹幕下载</i>和<i>视频下载</i>功能无法正常使用的问题","修复主站视频播放页面中助手有时加载失败的问题，在此特别鸣谢“巫师”和“04”等网友的帮助，非常感谢","修复<i>去污粉</i>有时加载失败的问题","优化<i>自动签到</i>功能的执行时间，从原来每次打开直播就签到一次改为每次打开浏览器立即执行一次和每天至少一次"],"版本 1.1.6":["修复<i>自动宽屏</i>功能在后台打开页面时失效的问题","修复<i>快速跳转</i>功能中数字ID至少为4位和sID检索错误的问题，并增加检索种类：epID","修复<i>字幕下载</i>功能","增加1条投喂信息"],"版本 1.1.5":["修复了<i>外挂字幕下载</i>功能会在后台不停发送请求的问题","修复了在未登录情况下<i>设置页面</i>部分功能无法启用的问题","修复在<i>扩展管理页面</i>-<i>详细信息</i>-<i>扩展程序选项</i>点击无反应的问题","优化<i>弹幕查询</i>功能中的查询结果，现在可以列出多个可能的结果，排除等级0的用户","优化<i>快速跳转</i>功能，现在只输入数字的情况即表示avid","优化<i>动态推送</i>功能，现在会显示作者了","增加12条投喂信息"],"版本 1.1.4":["修复<i>视频下载</i>，<i>外挂字幕下载</i>和<i>自动更新检测</i>功能的bug","优化设置页面交互，调整部分功能UI样式","视频推送现在同时显示封面了（MacOS不支持）","增加主站视频<i>默认关闭弹幕显示</i>功能，支持换P和新播放页面切换其他视频的场景","<i>宽屏模式</i>功能现在也支持换P和新播放页面切换其他视频的场景"],"版本 1.1.3":["修复<i>弹幕查询</i>功能中查询同一作者弹幕时弹幕列表显示异常的问题","优化<i>画中画</i>功能的实现逻辑，现在可以支持未关闭画中画窗口时切换分P或其他视频","增加对浏览器在<i>隐身模式</i>下的兼容性，隐身模式下<i>自动领瓜子</i>，<i>银瓜子字段兑换硬币</i>和<i>自动签到</i>将无法启用","修复模块依赖加载中的逻辑问题"],"版本 1.1.0 - 1.1.2":["增加<i>自动检测更新</i>功能，可关闭","增加<i>自动跳转</i>功能","增加<i>银瓜子自动换硬币</i>功能","增加<i>右键用哔哩哔哩搜索</i>功能"],"版本 1.0.9 - 1.0.10":["增加主站视频<i>字幕下载</i>功能","增加<i>弹幕下载</i>功能中对历史弹幕的支持","增加对<i>Pakku v9.2</i>扩展的兼容","调整<i>宽屏模式</i>设置到二级页面","增加模块的i18n支持(en, zh_CN, zh_TW), 可扩展其他语言","增加1条投喂信息"],"版本 1.0.8":["更新设置页面排版样式","增加主站视频<i>画中画</i>功能","增加主站视频<i>宽屏模式</i>功能","增加<i>弹幕下载</i>功能，支持XML格式"],"版本 1.0.7":["添加<i>MessageStore</i>模块","增加<i>视频下载<i>功能(还不稳定)","重新添加<i>自动签到</i>功能","增加部分功能的数据统计代码，我们将匿名收集您对我们软件的使用情况，请尽可能不要关闭<i>数据统计</i>功能","增加部分功能的说明文字","增加77条投喂信息"],"版本 1.0.5 - 1.0.6":["增加<i>去污粉</i>功能","增加<i>菜单显示最近推送</i>功能的配置","增加配置<i>设置页面</i>-<i>菜单栏</i>-<i>扩展程序菜单栏</i>配置按钮","修复仍然存在的反复推送相同讯息的问题","重写模组依赖加载"],"版本 1.0.4":["修复推送窗口点击观看不打开页面的问题","修复反复推送相同讯息的问题","增加<i>数据统计</i>功能","增加模块化依赖加载"],"版本 1.0.0 - 1.0.3":["增加<i>自动领瓜子</i>功能","增加<i>自动签到</i>功能","增加<i>弹幕查询</i>（支持新播放页面，视频切换，分P切换，历史弹幕）功能","增加<i>Debug</i>模块"]};

/***/ }),

/***/ "./src/styles/colorValues.js":
/*!***********************************!*\
  !*** ./src/styles/colorValues.js ***!
  \***********************************/
/*! exports provided: colorValues */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorValues", function() { return colorValues; });


var colorValues = {
    'google-red-100': '#f4c7c3',
    'google-red-300': '#e67c73',
    'google-red-500': '#db4437',
    'google-red-700': '#c53929',
    'google-blue-100': '#c6dafc',
    'google-blue-300': '#7baaf7',
    'google-blue-500': '#4285f4',
    'google-blue-600': '#1a73e8',
    'google-blue-700': '#3367d6',
    'google-green-100': '#b7e1cd',
    'google-green-300': '#57bb8a',
    'google-green-500': '#0f9d58',
    'google-green-700': '#0b8043',
    'google-yellow-100': '#fce8b2',
    'google-yellow-300': '#f7cb4d',
    'google-yellow-500': '#f4b400',
    'google-yellow-700': '#f09300',
    'google-grey-50': '#f8f9fa',
    'google-grey-100': '#f5f5f5',
    'google-grey-300': '#e0e0e0',
    'google-grey-400': '#bdc1c6',
    'google-grey-500': '#9e9e9e',
    'google-grey-700': '#616161',
    'paper-red-50': '#ffebee',
    'paper-red-100': '#ffcdd2',
    'paper-red-200': '#ef9a9a',
    'paper-red-300': '#e57373',
    'paper-red-400': '#ef5350',
    'paper-red-500': '#f44336',
    'paper-red-600': '#e53935',
    'paper-red-700': '#d32f2f',
    'paper-red-800': '#c62828',
    'paper-red-900': '#b71c1c',
    'paper-red-a100': '#ff8a80',
    'paper-red-a200': '#ff5252',
    'paper-red-a400': '#ff1744',
    'paper-red-a700': '#d50000',
    'paper-pink-50': '#fce4ec',
    'paper-pink-100': '#f8bbd0',
    'paper-pink-200': '#f48fb1',
    'paper-pink-300': '#f06292',
    'paper-pink-400': '#ec407a',
    'paper-pink-500': '#e91e63',
    'paper-pink-600': '#d81b60',
    'paper-pink-700': '#c2185b',
    'paper-pink-800': '#ad1457',
    'paper-pink-900': '#880e4f',
    'paper-pink-a100': '#ff80ab',
    'paper-pink-a200': '#ff4081',
    'paper-pink-a400': '#f50057',
    'paper-pink-a700': '#c51162',
    'paper-purple-50': '#f3e5f5',
    'paper-purple-100': '#e1bee7',
    'paper-purple-200': '#ce93d8',
    'paper-purple-300': '#ba68c8',
    'paper-purple-400': '#ab47bc',
    'paper-purple-500': '#9c27b0',
    'paper-purple-600': '#8e24aa',
    'paper-purple-700': '#7b1fa2',
    'paper-purple-800': '#6a1b9a',
    'paper-purple-900': '#4a148c',
    'paper-purple-a100': '#ea80fc',
    'paper-purple-a200': '#e040fb',
    'paper-purple-a400': '#d500f9',
    'paper-purple-a700': '#aa00ff',
    'paper-deep-purple-50': '#ede7f6',
    'paper-deep-purple-100': '#d1c4e9',
    'paper-deep-purple-200': '#b39ddb',
    'paper-deep-purple-300': '#9575cd',
    'paper-deep-purple-400': '#7e57c2',
    'paper-deep-purple-500': '#673ab7',
    'paper-deep-purple-600': '#5e35b1',
    'paper-deep-purple-700': '#512da8',
    'paper-deep-purple-800': '#4527a0',
    'paper-deep-purple-900': '#311b92',
    'paper-deep-purple-a100': '#b388ff',
    'paper-deep-purple-a200': '#7c4dff',
    'paper-deep-purple-a400': '#651fff',
    'paper-deep-purple-a700': '#6200ea',
    'paper-indigo-50': '#e8eaf6',
    'paper-indigo-100': '#c5cae9',
    'paper-indigo-200': '#9fa8da',
    'paper-indigo-300': '#7986cb',
    'paper-indigo-400': '#5c6bc0',
    'paper-indigo-500': '#3f51b5',
    'paper-indigo-600': '#3949ab',
    'paper-indigo-700': '#303f9f',
    'paper-indigo-800': '#283593',
    'paper-indigo-900': '#1a237e',
    'paper-indigo-a100': '#8c9eff',
    'paper-indigo-a200': '#536dfe',
    'paper-indigo-a400': '#3d5afe',
    'paper-indigo-a700': '#304ffe',
    'paper-blue-50': '#e3f2fd',
    'paper-blue-100': '#bbdefb',
    'paper-blue-200': '#90caf9',
    'paper-blue-300': '#64b5f6',
    'paper-blue-400': '#42a5f5',
    'paper-blue-500': '#2196f3',
    'paper-blue-600': '#1e88e5',
    'paper-blue-700': '#1976d2',
    'paper-blue-800': '#1565c0',
    'paper-blue-900': '#0d47a1',
    'paper-blue-a100': '#82b1ff',
    'paper-blue-a200': '#448aff',
    'paper-blue-a400': '#2979ff',
    'paper-blue-a700': '#2962ff',
    'paper-light-blue-50': '#e1f5fe',
    'paper-light-blue-100': '#b3e5fc',
    'paper-light-blue-200': '#81d4fa',
    'paper-light-blue-300': '#4fc3f7',
    'paper-light-blue-400': '#29b6f6',
    'paper-light-blue-500': '#03a9f4',
    'paper-light-blue-600': '#039be5',
    'paper-light-blue-700': '#0288d1',
    'paper-light-blue-800': '#0277bd',
    'paper-light-blue-900': '#01579b',
    'paper-light-blue-a100': '#80d8ff',
    'paper-light-blue-a200': '#40c4ff',
    'paper-light-blue-a400': '#00b0ff',
    'paper-light-blue-a700': '#0091ea',
    'paper-cyan-50': '#e0f7fa',
    'paper-cyan-100': '#b2ebf2',
    'paper-cyan-200': '#80deea',
    'paper-cyan-300': '#4dd0e1',
    'paper-cyan-400': '#26c6da',
    'paper-cyan-500': '#00bcd4',
    'paper-cyan-600': '#00acc1',
    'paper-cyan-700': '#0097a7',
    'paper-cyan-800': '#00838f',
    'paper-cyan-900': '#006064',
    'paper-cyan-a100': '#84ffff',
    'paper-cyan-a200': '#18ffff',
    'paper-cyan-a400': '#00e5ff',
    'paper-cyan-a700': '#00b8d4',
    'paper-teal-50': '#e0f2f1',
    'paper-teal-100': '#b2dfdb',
    'paper-teal-200': '#80cbc4',
    'paper-teal-300': '#4db6ac',
    'paper-teal-400': '#26a69a',
    'paper-teal-500': '#009688',
    'paper-teal-600': '#00897b',
    'paper-teal-700': '#00796b',
    'paper-teal-800': '#00695c',
    'paper-teal-900': '#004d40',
    'paper-teal-a100': '#a7ffeb',
    'paper-teal-a200': '#64ffda',
    'paper-teal-a400': '#1de9b6',
    'paper-teal-a700': '#00bfa5',
    'paper-green-50': '#e8f5e9',
    'paper-green-100': '#c8e6c9',
    'paper-green-200': '#a5d6a7',
    'paper-green-300': '#81c784',
    'paper-green-400': '#66bb6a',
    'paper-green-500': '#4caf50',
    'paper-green-600': '#43a047',
    'paper-green-700': '#388e3c',
    'paper-green-800': '#2e7d32',
    'paper-green-900': '#1b5e20',
    'paper-green-a100': '#b9f6ca',
    'paper-green-a200': '#69f0ae',
    'paper-green-a400': '#00e676',
    'paper-green-a700': '#00c853',
    'paper-light-green-50': '#f1f8e9',
    'paper-light-green-100': '#dcedc8',
    'paper-light-green-200': '#c5e1a5',
    'paper-light-green-300': '#aed581',
    'paper-light-green-400': '#9ccc65',
    'paper-light-green-500': '#8bc34a',
    'paper-light-green-600': '#7cb342',
    'paper-light-green-700': '#689f38',
    'paper-light-green-800': '#558b2f',
    'paper-light-green-900': '#33691e',
    'paper-light-green-a100': '#ccff90',
    'paper-light-green-a200': '#b2ff59',
    'paper-light-green-a400': '#76ff03',
    'paper-light-green-a700': '#64dd17',
    'paper-lime-50': '#f9fbe7',
    'paper-lime-100': '#f0f4c3',
    'paper-lime-200': '#e6ee9c',
    'paper-lime-300': '#dce775',
    'paper-lime-400': '#d4e157',
    'paper-lime-500': '#cddc39',
    'paper-lime-600': '#c0ca33',
    'paper-lime-700': '#afb42b',
    'paper-lime-800': '#9e9d24',
    'paper-lime-900': '#827717',
    'paper-lime-a100': '#f4ff81',
    'paper-lime-a200': '#eeff41',
    'paper-lime-a400': '#c6ff00',
    'paper-lime-a700': '#aeea00',
    'paper-yellow-50': '#fffde7',
    'paper-yellow-100': '#fff9c4',
    'paper-yellow-200': '#fff59d',
    'paper-yellow-300': '#fff176',
    'paper-yellow-400': '#ffee58',
    'paper-yellow-500': '#ffeb3b',
    'paper-yellow-600': '#fdd835',
    'paper-yellow-700': '#fbc02d',
    'paper-yellow-800': '#f9a825',
    'paper-yellow-900': '#f57f17',
    'paper-yellow-a100': '#ffff8d',
    'paper-yellow-a200': '#ffff00',
    'paper-yellow-a400': '#ffea00',
    'paper-yellow-a700': '#ffd600',
    'paper-amber-50': '#fff8e1',
    'paper-amber-100': '#ffecb3',
    'paper-amber-200': '#ffe082',
    'paper-amber-300': '#ffd54f',
    'paper-amber-400': '#ffca28',
    'paper-amber-500': '#ffc107',
    'paper-amber-600': '#ffb300',
    'paper-amber-700': '#ffa000',
    'paper-amber-800': '#ff8f00',
    'paper-amber-900': '#ff6f00',
    'paper-amber-a100': '#ffe57f',
    'paper-amber-a200': '#ffd740',
    'paper-amber-a400': '#ffc400',
    'paper-amber-a700': '#ffab00',
    'paper-orange-50': '#fff3e0',
    'paper-orange-100': '#ffe0b2',
    'paper-orange-200': '#ffcc80',
    'paper-orange-300': '#ffb74d',
    'paper-orange-400': '#ffa726',
    'paper-orange-500': '#ff9800',
    'paper-orange-600': '#fb8c00',
    'paper-orange-700': '#f57c00',
    'paper-orange-800': '#ef6c00',
    'paper-orange-900': '#e65100',
    'paper-orange-a100': '#ffd180',
    'paper-orange-a200': '#ffab40',
    'paper-orange-a400': '#ff9100',
    'paper-orange-a700': '#ff6500',
    'paper-deep-orange-50': '#fbe9e7',
    'paper-deep-orange-100': '#ffccbc',
    'paper-deep-orange-200': '#ffab91',
    'paper-deep-orange-300': '#ff8a65',
    'paper-deep-orange-400': '#ff7043',
    'paper-deep-orange-500': '#ff5722',
    'paper-deep-orange-600': '#f4511e',
    'paper-deep-orange-700': '#e64a19',
    'paper-deep-orange-800': '#d84315',
    'paper-deep-orange-900': '#bf360c',
    'paper-deep-orange-a100': '#ff9e80',
    'paper-deep-orange-a200': '#ff6e40',
    'paper-deep-orange-a400': '#ff3d00',
    'paper-deep-orange-a700': '#dd2c00',
    'paper-brown-50': '#efebe9',
    'paper-brown-100': '#d7ccc8',
    'paper-brown-200': '#bcaaa4',
    'paper-brown-300': '#a1887f',
    'paper-brown-400': '#8d6e63',
    'paper-brown-500': '#795548',
    'paper-brown-600': '#6d4c41',
    'paper-brown-700': '#5d4037',
    'paper-brown-800': '#4e342e',
    'paper-brown-900': '#3e2723',
    'paper-grey-50': '#fafafa',
    'paper-grey-100': '#f5f5f5',
    'paper-grey-200': '#eeeeee',
    'paper-grey-300': '#e0e0e0',
    'paper-grey-400': '#bdbdbd',
    'paper-grey-500': '#9e9e9e',
    'paper-grey-600': '#757575',
    'paper-grey-700': '#616161',
    'paper-grey-800': '#424242',
    'paper-grey-900': '#212121',
    'paper-blue-grey-50': '#eceff1',
    'paper-blue-grey-100': '#cfd8dc',
    'paper-blue-grey-200': '#b0bec5',
    'paper-blue-grey-300': '#90a4ae',
    'paper-blue-grey-400': '#78909c',
    'paper-blue-grey-500': '#607d8b',
    'paper-blue-grey-600': '#546e7a',
    'paper-blue-grey-700': '#455a64',
    'paper-blue-grey-800': '#37474f',
    'bilibili-blue': '#23ADE5',
    'bilibili-pink': '#FB7299',
    'bilibili-gray': '#F4F4F4'
};

/***/ }),

/***/ "./src/styles/globalInject.js":
/*!************************************!*\
  !*** ./src/styles/globalInject.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _var__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./var */ "./src/styles/var.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./theme */ "./src/styles/theme.js");
var _templateObject = _taggedTemplateLiteral(['\n  html,body {\n    font-family: Cereal, "PingFang SC", Roboto, system-ui, STHeiti, "Microsoft YaHei", system, -apple-system, ".SFNSDisplay-Regular", HelveticaNeue, LucidaGrande, "Hiragino Sans GB", sans-serif;\n    -ms-text-size-adjust: 100%; // 2\n    -webkit-text-size-adjust: 100%; // 2\n    -webkit-font-smoothing: antialiased;\n    font-size: ', 'px;\n  }\n  body {\n    margin: 0;\n    ', ';\n  }\n'], ['\n  html,body {\n    font-family: Cereal, "PingFang SC", Roboto, system-ui, STHeiti, "Microsoft YaHei", system, -apple-system, ".SFNSDisplay-Regular", HelveticaNeue, LucidaGrande, "Hiragino Sans GB", sans-serif;\n    -ms-text-size-adjust: 100%; // 2\n    -webkit-text-size-adjust: 100%; // 2\n    -webkit-font-smoothing: antialiased;\n    font-size: ', 'px;\n  }\n  body {\n    margin: 0;\n    ', ';\n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





Object(styled_components__WEBPACK_IMPORTED_MODULE_0__["injectGlobal"])(_templateObject, _theme__WEBPACK_IMPORTED_MODULE_2__["theme"].baseFontSize, Object(_var__WEBPACK_IMPORTED_MODULE_1__["fontFamily"])());

/***/ }),

/***/ "./src/styles/index.js":
/*!*****************************!*\
  !*** ./src/styles/index.js ***!
  \*****************************/
/*! exports provided: rem, fontFamily, fontSize, textOverflow, color, boxShadow, transition, marginTrim, hideScrollbar, baseFontSize, theme, opacity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _globalInject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalInject */ "./src/styles/globalInject.js");
/* empty/unused harmony star reexport *//* harmony import */ var _var__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./var */ "./src/styles/var.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rem", function() { return _var__WEBPACK_IMPORTED_MODULE_1__["rem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fontFamily", function() { return _var__WEBPACK_IMPORTED_MODULE_1__["fontFamily"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fontSize", function() { return _var__WEBPACK_IMPORTED_MODULE_1__["fontSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "textOverflow", function() { return _var__WEBPACK_IMPORTED_MODULE_1__["textOverflow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "color", function() { return _var__WEBPACK_IMPORTED_MODULE_1__["color"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "boxShadow", function() { return _var__WEBPACK_IMPORTED_MODULE_1__["boxShadow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transition", function() { return _var__WEBPACK_IMPORTED_MODULE_1__["transition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "marginTrim", function() { return _var__WEBPACK_IMPORTED_MODULE_1__["marginTrim"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hideScrollbar", function() { return _var__WEBPACK_IMPORTED_MODULE_1__["hideScrollbar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "opacity", function() { return _var__WEBPACK_IMPORTED_MODULE_1__["opacity"]; });

/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./theme */ "./src/styles/theme.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "baseFontSize", function() { return _theme__WEBPACK_IMPORTED_MODULE_2__["baseFontSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "theme", function() { return _theme__WEBPACK_IMPORTED_MODULE_2__["theme"]; });







/***/ }),

/***/ "./src/styles/opacity.js":
/*!*******************************!*\
  !*** ./src/styles/opacity.js ***!
  \*******************************/
/*! exports provided: opacity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opacity", function() { return opacity; });


var opacity = {
    'paper-blue-grey-900': '#263238',
    'dark-divider-opacity': '0.12',
    'dark-disabled-opacity': '0.38',
    'dark-secondary-opacity': '0.54',
    'dark-primary-opacity': '0.87',
    'light-divider-opacity': '0.12',
    'light-disabled-opacity': '0.3',
    'light-secondary-opacity': '0.7',
    'light-primary-opacity': '1.0'
};

/***/ }),

/***/ "./src/styles/scss/config.scss":
/*!*************************************!*\
  !*** ./src/styles/scss/config.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/styles/theme.js":
/*!*****************************!*\
  !*** ./src/styles/theme.js ***!
  \*****************************/
/*! exports provided: baseFontSize, theme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseFontSize", function() { return baseFontSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "theme", function() { return theme; });
/* harmony import */ var _var__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./var */ "./src/styles/var.js");



var bodyMinWidth = 1000;
var sidebarWidth = 204;
var baseFontSize = 12;

var theme = {
    color: _var__WEBPACK_IMPORTED_MODULE_0__["color"],
    logoHeight: 50,
    bodyMinWidth: bodyMinWidth,
    headerHeight: 0,
    sidebarWidth: sidebarWidth,
    mainWidth: bodyMinWidth - sidebarWidth,
    baseFontSize: baseFontSize,
    fontFamily: _var__WEBPACK_IMPORTED_MODULE_0__["fontFamily"],
    fontSize: _var__WEBPACK_IMPORTED_MODULE_0__["fontSize"],
    rem: _var__WEBPACK_IMPORTED_MODULE_0__["rem"],
    textOverflow: _var__WEBPACK_IMPORTED_MODULE_0__["textOverflow"],
    transition: _var__WEBPACK_IMPORTED_MODULE_0__["transition"],
    boxShadow: _var__WEBPACK_IMPORTED_MODULE_0__["boxShadow"],
    marginTrim: _var__WEBPACK_IMPORTED_MODULE_0__["marginTrim"],
    hideScrollbar: _var__WEBPACK_IMPORTED_MODULE_0__["hideScrollbar"],
    opacity: _var__WEBPACK_IMPORTED_MODULE_0__["opacity"] };

/***/ }),

/***/ "./src/styles/var.js":
/*!***************************!*\
  !*** ./src/styles/var.js ***!
  \***************************/
/*! exports provided: rem, fontFamily, fontSize, textOverflow, color, boxShadow, transition, marginTrim, hideScrollbar, opacity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rem", function() { return rem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fontFamily", function() { return fontFamily; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fontSize", function() { return fontSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "textOverflow", function() { return textOverflow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "color", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boxShadow", function() { return boxShadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transition", function() { return transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "marginTrim", function() { return marginTrim; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideScrollbar", function() { return hideScrollbar; });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! color */ "./node_modules/color/index.js");
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(color__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _colorValues__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./colorValues */ "./src/styles/colorValues.js");
/* harmony import */ var _opacity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./opacity */ "./src/styles/opacity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "opacity", function() { return _opacity__WEBPACK_IMPORTED_MODULE_4__["opacity"]; });



var _templateObject = _taggedTemplateLiteral(['\n    font-family: ', ' Cereal, "PingFang SC", "Microsoft YaHei", system, -apple-system, ".SFNSDisplay-Regular", HelveticaNeue, LucidaGrande, "Hiragino Sans GB", "sans-serif";\n'], ['\n    font-family: ', ' Cereal, "PingFang SC", "Microsoft YaHei", system, -apple-system, ".SFNSDisplay-Regular", HelveticaNeue, LucidaGrande, "Hiragino Sans GB", "sans-serif";\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    font-size: ', ';\n'], ['\n    font-size: ', ';\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n    overflow: hidden;\n    text-overflow:ellipsis;\n    white-space: nowrap;\n'], ['\n    overflow: hidden;\n    text-overflow:ellipsis;\n    white-space: nowrap;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: ', ';\n    overflow: hidden;\n'], ['\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: ', ';\n    overflow: hidden;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n        box-shadow: ', ';\n    '], ['\n        box-shadow: ', ';\n    ']),
    _templateObject6 = _taggedTemplateLiteral(['transition: ', ' ', 's;'], ['transition: ', ' ', 's;']),
    _templateObject7 = _taggedTemplateLiteral(['\n  &:first-of-type {\n    ', ';\n    ', ';\n  }\n  &:last-of-type {\n    ', ';\n    ', ';\n  }\n'], ['\n  &:first-of-type {\n    ', ';\n    ', ';\n  }\n  &:last-of-type {\n    ', ';\n    ', ';\n  }\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n    &::-webkit-scrollbar {\n        width: 0;\n        display: none;\n    }\n    & {\n        -ms-overflow-style: none;\n        overflow: -moz-scrollbars-none;\n    }\n'], ['\n    &::-webkit-scrollbar {\n        width: 0;\n        display: none;\n    }\n    & {\n        -ms-overflow-style: none;\n        overflow: -moz-scrollbars-none;\n    }\n']);

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var rem = function rem(size) {
    var baseFontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
    return size / baseFontSize + 'rem';
};

var fontFamily = function fontFamily() {
    var myFontName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject, lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(myFontName) ? null : '\'' + myFontName + '\',');
};

var fontSize = function fontSize() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    return Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2, rem(size));
};

var textOverflow = function textOverflow() {
    var lineNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return lineNum === 1 ? Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3) : Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4, lineNum);
};

var color = function color(colorName) {
    var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return _colorValues__WEBPACK_IMPORTED_MODULE_3__["colorValues"][colorName] ? color__WEBPACK_IMPORTED_MODULE_2___default()(_colorValues__WEBPACK_IMPORTED_MODULE_3__["colorValues"][colorName]).alpha(alpha).rgb().string() : undefined;
};

var boxShadow = function boxShadow(_ref) {
    var _ref2 = _toArray(_ref),
        rest = _ref2.slice(0);

    var dp = 1,
        shadowColor = '#000000',
        alpha = 0.5;
    var boxShadowString = '';
    for (var i in rest) {
        var _rest$i = rest[i],
            h = _rest$i.h,
            v = _rest$i.v,
            blur = _rest$i.blur,
            spread = _rest$i.spread,
            _rest$i$color = _rest$i.color,
            _color = _rest$i$color === undefined ? color__WEBPACK_IMPORTED_MODULE_2___default()(shadowColor).alpha(alpha).rgb().string() : _rest$i$color,
            _rest$i$inset = _rest$i.inset,
            inset = _rest$i$inset === undefined ? '' : _rest$i$inset;

        boxShadowString += h * dp + 'px ' + v * dp + 'px ' + blur * 5 + 'px ' + spread * 5 + 'px ' + _color + ' ' + inset + ',';
    }
    return Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject5, boxShadowString);
};

var transition = function transition(_ref3) {
    var _ref3$target = _ref3.target,
        target = _ref3$target === undefined ? 'all' : _ref3$target,
        _ref3$duration = _ref3.duration,
        duration = _ref3$duration === undefined ? 0.3 : _ref3$duration;
    return Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject6, target, duration);
};

var marginTrim = function marginTrim(_ref4) {
    var _ref4$direction = _ref4.direction,
        direction = _ref4$direction === undefined ? 'h' : _ref4$direction,
        _ref4$value = _ref4.value,
        value = _ref4$value === undefined ? 0 : _ref4$value;
    return Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject7, direction === 'h' ? 'margin-left:' + value : direction === 'v' ? 'margin-top: ' + value : null, direction === 'all' ? 'margin-left:' + value + ';margin-top:' + value : null, direction === 'h' ? 'margin-right:' + value : direction === 'v' ? 'margin-bottom: ' + value : null, direction === 'all' ? 'margin-right:' + value + ';margin-bottom:' + value : null);
};

var hideScrollbar = Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject8);

/***/ })

/******/ });