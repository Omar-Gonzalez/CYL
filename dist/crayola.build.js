"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Utils
 * @param msg - Console Log Shortcut
 */

var l = function l(msg) {
    if (true) {
        console.log(msg);
    }
};

var Scene = function () {
    function Scene() {
        var sprites = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var pixelSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
        var screenSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
            "width": "100%",
            "height": "100%"
        };

        _classCallCheck(this, Scene);

        //Param Validation
        if (!Array.isArray(sprites)) {
            l("CYL:[Exception]Update method requires an array of sprites");
            return;
        }
        if (sprites.length < 1) {
            l("CYL:[Exception]Need at least one sprite to initialize a scene");
            return;
        }
        if (pixelSize.isInteger === false) {
            l("CYL:[Exception]PixelSize must be a interger");
            return;
        }
        if (pixelSize === 5) {
            l("CYL:Scene pixel size default of 5");
        }
        //Props
        this.screen = document.getElementById("screen");
        this.canvas = document.getElementById("game");
        this.screenSize = screenSize;
        this.pixelSize = pixelSize;
        this.ctx = this.canvas.getContext("2d");
        this.sprites = sprites;
        //Init Methods
        this._defineCanvasDimensions();
    }

    _createClass(Scene, [{
        key: "_defineCanvasDimensions",
        value: function _defineCanvasDimensions() {
            var _this = this;

            this.screen.style.width = this.screenSize.width;
            this.screen.style.height = this.screenSize.height;
            this.canvas.width = this.screen.offsetWidth;
            this.canvas.height = this.screen.offsetHeight;

            window.addEventListener("resize", function () {
                _this.canvas.width = _this.screen.offsetWidth;
                _this.canvas.height = _this.screen.offsetHeight;
                l("CYL: Canvas resize: " + _this.canvas.width);
            });
        }
    }, {
        key: "clear",
        value: function clear() {
            this.ctx.clearRect(0, 0, this.frame.width, this.frame.height);
        }
    }, {
        key: "_renderPixel",
        value: function _renderPixel(pixel) {
            var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            this.ctx.fillStyle = pixel.color;
            this.ctx.fillRect(pixel.x + x, pixel.y + y, this.pixelSize, this.pixelSize);
        }
    }, {
        key: "_renderShapeSprite",
        value: function _renderShapeSprite(sprite) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = sprite.shape[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var pixel = _step.value;

                    this._renderPixel(pixel, sprite.x, sprite.y);
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
    }, {
        key: "update",
        value: function update() {
            this.clear();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.sprites[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _sprite = _step2.value;

                    this._renderShapeSprite(_sprite);
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
    }, {
        key: "setShapeSprites",
        value: function setShapeSprites(sprites) {
            if (!Array.isArray(sprites)) {
                l("CYL:[Exception]Update method requires an array of sprites");
                return;
            }
            this.sprites = sprites;
        }
    }, {
        key: "frame",
        get: function get() {
            return {
                "width": this.canvas.width,
                "height": this.canvas.height
            };
        }
    }, {
        key: "assets",
        get: function get() {
            return {
                "spriteCount": this.sprites.length,
                "sprites": this.sprites
            };
        }
    }]);

    return Scene;
}();

var ShapeSprite = function () {
    /**
     * Sprite Properties
     * @param shape - array with filtered coordinates
     * @param width - sprite width new line in shape
     * @param x - x postion in scene
     * @param y - y position in scene
     */
    function ShapeSprite(name, shape) {
        var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
        var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

        _classCallCheck(this, ShapeSprite);

        //Param Validation
        if (name === undefined) {
            l("CYL:Warning, no name identifier for sprite");
        }
        if (width === 4) {
            l("CYL:Warning, default 4 sprite size, make sure you are passing width param");
        }
        if (shape === undefined) {
            l("CYL:[Exception]You need a shape to initialize a sprite");
            return;
        }
        if (!Array.isArray(shape)) {
            l("CYL:[Exception]Shape object must be an array");
            return;
        }
        if (pixelSize === undefined) {
            l("CYL:[Exception]Please define global pixelSize value");
            return;
        }
        //Props Definition
        this.spriteName = name;
        this.x = x;
        this.y = y;

        this.pixels = [];
        var relativeX = 0;
        var relativeY = 0;
        var index = 0;
        //Iterate Build Shape
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
                relativeX = relativeX + pixelSize;
                index++;
                if (index === width) {
                    relativeY = relativeY + pixelSize;
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

    _createClass(ShapeSprite, [{
        key: "name",
        get: function get() {
            return this.spriteName;
        }
    }, {
        key: "shape",
        get: function get() {
            return this.pixels;
        }
    }]);

    return ShapeSprite;
}();

var Game = function () {
    function Game(scenes) {
        var _this2 = this;

        var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, Game);

        this.run = function () {
            if (_this2.shouldUpdate) {
                _this2.activeScene.update();
            }
            window.requestAnimationFrame(_this2.run);
        };

        this.pause = function () {
            if (_this2.shouldUpdate) {
                _this2.shouldUpdate = false;
            } else {
                _this2.shouldUpdate = true;
            }
        };

        this.spriteNamed = function (name) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = _this2.activeScene.sprites[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _sprite2 = _step4.value;

                    if (name = _sprite2.name) {
                        return _sprite2;
                    }
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
        };

        this.mouseClick = function () {
            document.getElementById("game").addEventListener("click", function (e) {
                //handle click events... 
                _this2.spriteNamed("player").x = e.clientX;
                _this2.spriteNamed("player").y = e.clientY;
            });
        };

        this.keyPress = function () {
            window.addEventListener("keydown", function (e) {
                //handle click events... 
                if (e.key === "ArrowLeft") {
                    _this2.spriteNamed("player").x = _this2.spriteNamed("player").x - 30;
                }
                if (e.key === "ArrowRight") {
                    _this2.spriteNamed("player").x = _this2.spriteNamed("player").x + 30;
                }
                if (e.key === "ArrowUp") {
                    _this2.spriteNamed("player").y = _this2.spriteNamed("player").y - 30;
                }
                if (e.key === "ArrowDown") {
                    _this2.spriteNamed("player").y = _this2.spriteNamed("player").y + 30;
                }
            });
        };

        //Param Validations
        if (!Array.isArray(scenes)) {
            l("CYL:[Exception]Game requires an array of scenes");
            return;
        }
        if (scene === 0) {
            l("CYL:Default initial scene with index 0 is being loaded");
        }
        //Props
        this.scenes = scenes;
        this.active = active;
        this.shouldUpdate = true;
        //Init Mehtods:
        this.setActiveScene();
    }

    _createClass(Game, [{
        key: "setActiveScene",
        value: function setActiveScene(active) {
            if (active !== undefined) {
                this.active = active;
            }
            this.activeScene = this.scenes[this.active];
        }
    }, {
        key: "assets",
        get: function get() {
            return {
                'scenes': this.scenes,
                'activeScene': this.activeScene
            };
        }
    }]);

    return Game;
}();
/******
 * Crayola ES6 Game Dev Tools 
 * Omar Gonzalez Rocha - Copyright MIT license 2017
 * Conventions: 
 * _underscore for pseudo private methods 
 */

//Lib Imports
//@prepros-prepend ./lib/utils.js
//@prepros-prepend ./lib/scene.js
//@prepros-prepend ./lib/shape-sprite.js
//@prepros-prepend ./lib/game.js

//Scene Config 


var pixelSize = 5;

var screenSize = {
    "width": "100%",
    "height": "100%"
};

var sprite = new ShapeSprite("player", ["transparent", "white", "white", "transparent", "white", "red", "white", "red", "white", "white", "white", "white", "white", "red", "red", "red", "transparent", "white", "white", "transparent"], 4);

var scene = new Scene([sprite], pixelSize, screenSize);

var game = new Game([scene]);
game.mouseClick();
game.keyPress();
game.run();
//# sourceMappingURL=crayola.build.js.map