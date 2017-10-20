"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******
 * Crayola ES6 Game Dev Tools 
 * Omar Gonzalez Rocha - Copyright MIT license 2017
 * Conventions: 
 * _underscore for pseudo private methods 
 */

//Global Settings
var DEBUG = true;

//Scene Config 
var pixelSize = 5;

//Lib 
//@prepros-append ./lib/utils.js
//@prepros-append ./lib/scene.js
//@prepros-append ./lib/sprite.js

/**
 * Utils
 * @param msg - Console Log Shortcut
 */

window.l = function (msg) {
    if (DEBUG) {
        console.log(msg);
    }
};

var Scene = function () {
    function Scene() {
        var pixelSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : pixelSize;

        _classCallCheck(this, Scene);

        //Props
        this.screen = document.getElementById("screen");
        this.canvas = document.getElementById("game");
        this.pixelSize = pixelSize;
        this.ctx = this.canvas.getContext("2d");
        //Init Methods
        this._canvasDimensions();
    }

    _createClass(Scene, [{
        key: "_canvasDimensions",
        value: function _canvasDimensions() {
            var _this = this;

            this.canvas.width = this.screen.offsetWidth;
            this.canvas.height = this.screen.offsetHeight;

            window.addEventListener("resize", function () {
                _this.canvas.width = _this.screen.offsetWidth;
                _this.canvas.height = _this.screen.offsetHeight;
                l("CYL: Canvas resize: " + _this.canvas.width);
            });
        }
    }, {
        key: "_drawPixel",
        value: function _drawPixel(pixel) {
            var error = "";
            if (pixel.x > this.maxXPos || pixel.x < 0) {
                error = "CYL: attempting to render pixel.x outside canvas";
            }
            if (pixel.y > this.maxYPos || pixel.y < 0) {
                error = error + "\nCYL: attempting to render pixel.y outside canvas";
            }
            if (error.length > 0) {
                l(error);
                return;
            }
            this.ctx.fillStyle = pixel.color;
            this.ctx.fillRect(pixel.x, pixel.y, this.pixelSize, this.pixelSize);
        }
    }, {
        key: "maxXPos",
        get: function get() {
            return this.canvas.width - this.pixelSize;
        }
    }, {
        key: "maxYPos",
        get: function get() {
            return this.canvas.height - this.pixelSize;
        }
    }]);

    return Scene;
}();

var scene = new Scene(pixelSize);

var pixel = {
    'x': 400,
    'y': 200,
    'color': 'white'
};
scene._drawPixel(pixel);

var Sprite = function () {
    /**
     * Sprite Properties
     * @param shape - array with filtered coordinates
     * @param width - sprite width new line in shape
     * @param x - x postion in scene
     * @param y - y position in scene
     */
    function Sprite(shape) {
        var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
        var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        _classCallCheck(this, Sprite);

        if (width === 4) {
            l("CYL:Warning, default 4 sprite size, make sure you are passing width param");
        }
        if (shape === undefined) {
            l("CYL : You need a shape to initialize a sprite");
            return;
        }
        if (!Array.isArray(shape)) {
            l("CYL : Shape object must be an array");
            return;
        }

        this.x = x;
        this.y = y;

        this.pixels = [];
        var relativeX = 0;
        var relativeY = 0;
        var index = 0;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = shape[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var colorCode = _step.value;

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

    _createClass(Sprite, [{
        key: "shape",
        get: function get() {
            return this.pixels;
        }
    }]);

    return Sprite;
}();

var ghost = new Sprite([0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], 5);

console.log(ghost.shape);
//# sourceMappingURL=crayola.build.js.map