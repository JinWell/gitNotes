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
/******/ 		"popup": 0
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
/******/ 	deferredModules.push(["./src/js/pages/popup/index.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/pages/popup/index.js":
/*!*************************************!*\
  !*** ./src/js/pages/popup/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Libs_UIManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Libs/UIManager */ "./src/js/libs/UIManager.js");



new Libs_UIManager__WEBPACK_IMPORTED_MODULE_0__["UIManager"]('popup');

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