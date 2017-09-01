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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Omar Gonzalez on 8/1/2017.
 */

/**
 * Utils
 * @param msg - Console Log Shortcut
 */
window.log = function (msg) {
    console.log(msg);
};

var Scene = function () {
    _createClass(Scene, [{
        key: "msg",
        get: function get() {
            return {
                "noGameContainer": "CYL : No div with id game available to place canvas",
                "wrongAlign": "CYL : Game container set to default center due to wrong alignment parameter",
                "noSprites": "CYL : Update method requires an array of sprites"
            };
        }
        /***
         * Scene
         * As per convention _method is intended to warn for a "private" method
         * @param width
         * @param height
         * @param alignment
         * @param bgColor
         * @param pixelSize
         */

    }]);

    function Scene() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 800;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 600;
        var alignment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "center";
        var bgColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "#393f4c";
        var pixelSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 4;

        _classCallCheck(this, Scene);

        this.width = width;
        this.height = height;
        this.pixelSize = pixelSize;
        this.alingment = alignment;
        this.bgColor = bgColor;
        this.ctx = {};
        /**Run Initialization Methods**/
        this._placeGameContainer();
    }

    _createClass(Scene, [{
        key: "_placeGameContainer",
        value: function _placeGameContainer() {
            /**Validate HTML Set Up**/
            var gameContainer = document.getElementById("game");
            if (gameContainer === null) {
                log(this.msg.noGameContainer);
                return;
            }
            /**Configure Game Container**/
            gameContainer.style.width = this.width + "px";
            gameContainer.style.height = this.height + "px";
            gameContainer.style.backgroundColor = "black";
            switch (this.alingment.toLowerCase()) {
                case 'center':
                    gameContainer.style.marginLeft = "auto";
                    gameContainer.style.marginRight = "auto";
                    break;
                case 'left':
                    gameContainer.style.marginLeft = "0px";
                    break;
                case 'right':
                    gameContainer.style.marginRight = "0px";
                    gameContainer.style.float = "right";
                    break;
                default:
                    gameContainer.style.marginLeft = "auto";
                    gameContainer.style.marginRight = "auto";
                    log(this.msg.wrongAlign);
                    break;
            }
            this._placeCanvas();
        }
    }, {
        key: "_placeCanvas",
        value: function _placeCanvas() {
            var canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            canvas.style.position = 'absolute';
            canvas.style.backgroundColor = this.bgColor;
            document.getElementById("game").appendChild(canvas);
            this.ctx = canvas.getContext("2d");
        }

        /**
         * Setup Color Pallet
         * @param i - pixel.color - numeric value of color
         * @returns {"Color String"}
         */

    }, {
        key: "color",
        value: function color(i) {
            switch (i) {
                case 0:
                    return "transparent";
                    break;
                case 1:
                    return "white";
                    break;
            }
        }
    }, {
        key: "_drawPixel",
        value: function _drawPixel(pixel) {
            var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            this.ctx.fillStyle = this.color(pixel.color);
            this.ctx.fillRect(parseInt(pixel.x + x), parseInt(pixel.y + y), this.pixelSize, this.pixelSize);
        }
    }, {
        key: "_drawSprite",
        value: function _drawSprite(sprite) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = sprite.shape[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var pixel = _step.value;

                    this._drawPixel(pixel, sprite.x, sprite.y);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         * Clear clear the canvax context
         */

    }, {
        key: "clear",
        value: function clear() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }

        /**
         * Update Canvas with a sprites array
         * @param sprites
         */

    }, {
        key: "update",
        value: function update(sprites) {
            if (sprites === undefined) {
                console.log(this.msg.noShape);
                return;
            }
            if (!Array.isArray(sprites)) {
                log(this.msg.wrongShape);
                return;
            }
            this.clear();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = sprites[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var sprite = _step2.value;

                    this._drawSprite(sprite);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }]);

    return Scene;
}();

/**
 * Due to co-dependant properties Scene Must be always initialized before sprites
 * @type {Scene}
 */


window.scene = new Scene();

var Sprite = function () {
    _createClass(Sprite, [{
        key: "msg",
        get: function get() {
            return {
                "noShape": "CYL : You need a shape to initialize a sprite",
                "wrongShape": "CYL : Shape object must be an array"
            };
        }
        /**
         * Sprite Properties
         * @param shape - array with filtered coordinates
         * @param width - new line in shape
         * @param x - x postion in scene
         * @param y - y position in scene
         */

    }]);

    function Sprite(shape) {
        var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
        var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        _classCallCheck(this, Sprite);

        if (shape === undefined) {
            console.log(this.msg.noArray);
            return;
        }
        if (!Array.isArray(shape)) {
            log(this.msg.wrongShape);
            return;
        }

        this.x = x;
        this.y = y;

        this.pixels = [];
        var relativeX = 0;
        var relativeY = 0;
        var index = 0;

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = shape[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var colorCode = _step3.value;

                this.pixels.push({
                    x: relativeX,
                    y: relativeY,
                    color: colorCode
                });
                relativeX = relativeX + scene.pixelSize;
                index++;
                if (index === width) {
                    relativeY = relativeY + scene.pixelSize;
                    relativeX = 0;
                    index = 0;
                }
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    }

    _createClass(Sprite, [{
        key: "shape",
        get: function get() {
            return this.pixels;
        }
    }]);

    return Sprite;
}();

var Game = function () {
    _createClass(Game, [{
        key: "msg",
        get: function get() {
            return {
                "pause": "CYL : Request Animation Frame is not updating",
                "updating": "CYL : Request Animation Frame is updating",
                "spritesParam": "CYL : Set sprites params can only take an array of sprites"
            };
        }
        /**
         * Class Properties;
         * - shouldUpdate - Should the loop update the scene
         * - sprites - array of sprites you want to draw for each cycle
         */

    }]);

    function Game() {
        _classCallCheck(this, Game);

        this.shouldUpdate = true;
        this.sprites = [];
    }

    _createClass(Game, [{
        key: "run",
        value: function run() {
            (function () {
                if (game.shouldUpdate) {
                    var cycleSprites = [];
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = game.sprites[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var update = _step4.value;

                            cycleSprites.push(update);
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    if (cycleSprites.length !== 0) {
                        scene.update(cycleSprites);
                    }
                }
                window.requestAnimationFrame(game.run);
            })();
        }
    }, {
        key: "pause",
        value: function pause() {
            if (this.shouldUpdate) {
                this.shouldUpdate = false;
                console.log(this.msg.pause);
            } else {
                this.shouldUpdate = true;
                console.log(this.msg.updating);
            }
        }
    }]);

    return Game;
}();

module.exports = {
    Scene: Scene,
    Sprite: Sprite,
    Game: Game
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Omar Gonzalez on 7/30/2017.
 */

var Game = __webpack_require__(0).Game;
var Sprite = __webpack_require__(0).Sprite;

window.game = new Game();
game.run();

var ghost = new Sprite([0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], 5);

var c = new Sprite([0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0], 6);

var y = new Sprite([1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 6);

var l = new Sprite([1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 6);

var baseY = parseInt(scene.height / 3 - 6);
var baseX = parseInt(scene.width / 5);

c.y = baseY;
c.x = baseX;
y.y = baseY;
y.x = baseX + 12 * scene.pixelSize;
l.y = baseY;
l.x = baseX + 24 * scene.pixelSize;

game.sprites = [c, y, l];

var up = true;

function moveStuff() {
    if (up) {
        c.y = c.y - 3 * scene.pixelSize;
        l.y = l.y - 3 * scene.pixelSize;
        y.y = y.y + 3 * scene.pixelSize;
        up = false;
    } else {
        c.y = c.y + 3 * scene.pixelSize;
        l.y = l.y + 3 * scene.pixelSize;
        y.y = y.y - 3 * scene.pixelSize;
        up = true;
    }
    setTimeout(moveStuff, 500);
}
moveStuff();

game.sprites.push(ghost);

ghost.y = baseY;
ghost.x = baseX + 150;

/***/ })
/******/ ]);