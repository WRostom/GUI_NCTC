/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var listener = function () {
    function listener() {
        _classCallCheck(this, listener);

        // document.addEventListener('click', function (e) {
        //     console.log(e);
        // });
        this.initializedButton = this.initializedButton.bind(this);
        this.addActionBlock = this.addActionBlock.bind(this);
    }

    _createClass(listener, [{
        key: 'addActionBlock',
        value: function addActionBlock(e) {
            if (e.target.parentNode.nodeName.toLowerCase() == 'tr') {
                var actionFirstLetter = buttonClick.substring(0, 1);
                var actionBlock = document.createElement('div');
                var p = document.createElement('p');
                p.innerHTML = buttonClick;
                actionBlock.className = className;;
                actionBlock.classList.add(actionFirstLetter + '_' + e.target.className);
                actionBlock.appendChild(p);
                e.target.appendChild(actionBlock);
                if (className == "loopBlock") {
                    var grid = document.querySelectorAll('td');
                    var color = document.querySelector('.loopButton').classList[1];
                    for (var i = 0; i < 6; i++) {
                        grid[i].style.backgroundColor = color;
                    }
                } else if (className == "functionBlock") {
                    var _grid = document.querySelectorAll('td');
                    var _color = document.querySelector('.functionButton').classList[1];
                    for (var i = 0; i < 6; i++) {
                        _grid[i].style.backgroundColor = _color;
                    }
                }
            }
            table.removeEventListener('click', this.addActionBlock);
        }
    }, {
        key: 'scanAndSave',
        value: function scanAndSave() {
            var grid = document.querySelectorAll('td');
            var scan = [];
            grid.forEach(function (element) {
                if (element.childNodes[0] != null) {
                    scan.push(element);
                    // element.style.backgroundColor = '#2ecc71';
                } else {
                        // element.style.backgroundColor = '#FFEB3B';
                    }
            }, this);
            return scan;
        }
    }, {
        key: 'initializedButton',
        value: function initializedButton(i, noItems) {
            var table = document.querySelector('.table');
            var tr = document.createElement('tr');
            tr.className = 'tr' + i;
            for (var _i = 0; _i < noItems; _i++) {
                var td = document.createElement('td');
                td.className = tr.className + '_td' + (_i + 1);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }, {
        key: 'getScanandsave',
        get: function get() {
            return this.scanAndSave();
        }
    }]);

    return listener;
}();

var codeBlocks = [];
var op = new listener();
var table;
var buttonClick;
var className;

window.addEventListener('load', function (e) {
    table = document.querySelector('table');
    var noItems = 12;
    for (var index = 0; index < 20; index++) {
        op.initializedButton(index + 1, noItems);
    }
    document.querySelector('.loopButton').classList.add("#7C4DFF");
    document.querySelector('.functionButton').classList.add("#FF3D00");
    document.addEventListener('click', function (e) {
        if (e.target.type == 'button' || e.target.tagName == 'BUTTON') {
            if (e.target.classList[0] == 'actionButton') {
                className = "actionBlock";
                buttonClick = e.target.value;
                table.addEventListener('click', op.addActionBlock);
            } else if (e.target.classList[0] == 'loopButton') {
                className = "loopBlock";
                buttonClick = e.target.value;
                table.addEventListener('click', op.addActionBlock);
            } else if (e.target.classList[0] == 'functionButton') {
                className = "functionBlock";
                buttonClick = e.target.value;
                table.addEventListener('click', op.addActionBlock);
            } else if (e.target.className == 'runButton') {
                codeBlocks = [];
                op.getScanandsave.forEach(function (element) {
                    var split = element.childNodes[0].classList[1].split('_');
                    codeBlocks.push(split[0]);
                }, this);

                //Send moves to PHP File using AJAX
                if (codeBlocks.length == 0) {
                    alert('Please insert Action Block');
                } else {
                    $.ajax({
                        type: "POST",
                        url: "../response.php",
                        data: {
                            codeBlock: codeBlocks
                        },
                        success: function success(response) {
                            console.log(response);
                        }
                    });
                }
            } else if (e.target.className == 'uploadButton') {
                $.ajax({
                    type: "GET",
                    url: "../mqtt/getActionandSend.php",
                    data: {
                        message: 'U'
                    },
                    success: function success(response) {
                        console.log(response);
                    }
                });
            } else if (e.target.className == 'bootButton') {
                $.ajax({
                    type: "GET",
                    url: "../mqtt/getActionandSend.php",
                    data: {
                        message: 'V'
                    },
                    success: function success(response) {
                        console.log(response);
                    }
                });
            }
        }
    });
});

/***/ })
/******/ ]);