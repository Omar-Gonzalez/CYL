"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
            console.log("CYL:[Exception]Update method requires an array of sprites");
            return;
        }
        if (sprites.length < 1) {
            console.log("CYL:[Exception]Need at least one sprite to initialize a scene");
            return;
        }
        if (pixelSize.isInteger === false) {
            console.log("CYL:[Exception]PixelSize must be a interger");
            return;
        }
        if (pixelSize === 5) {
            console.log("CYL:Scene pixel size default of 5");
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
                console.log("CYL: Canvas resize: " + _this.canvas.width);
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
        key: "_renderShapeWith",
        value: function _renderShapeWith(frame) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = frame[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
        key: "_sortFrameWith",
        value: function _sortFrameWith(sprite) {
            //Update frame to render on update
            if (sprite.tickCounter > sprite.tick) {
                sprite.tickCounter = 0;
                sprite.currentFrame++;
                if (sprite.currentFrame >= sprite.frameCount) {
                    sprite.currentFrame = 0;
                }
            }
            sprite.tickCounter++;
            //Render currentFrame
            this._renderShapeWith(sprite.frames[sprite.currentFrame]);
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

                    this._sortFrameWith(_sprite);
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
                console.log("CYL:[Exception]Update method requires an array of sprites");
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
    function ShapeSprite(name, shapes) {
        var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
        var tick = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
        var x = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        var y = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

        _classCallCheck(this, ShapeSprite);

        //Param Validation
        if (name === undefined) {
            console.log("CYL:Warning, no name identifier for sprite");
        }
        if (width === 4) {
            console.log("CYL:Warning, default 4 sprite size, make sure you are passing width param");
        }
        if (shapes === undefined) {
            console.log("CYL:[Exception]You need a shape to initialize a sprite");
            return;
        }
        if (!Array.isArray(shapes)) {
            console.log("CYL:[Exception]Shape object must be an array");
            return;
        }
        if (pixelSize === undefined) {
            console.log("CYL:[Exception]Please define global pixelSize value");
            return;
        }
        //Props Definition
        this.spriteName = name;
        this.spriteFrames = [];
        this.width = width;
        this.x = x;
        this.y = y;
        this.currentFrame = 0;
        this.tick = tick;
        this.tickCounter = 0;
        this.shapes = shapes;
        this.activeFrames = "";

        //Init Methods
        this.setAnimation();
    }

    _createClass(ShapeSprite, [{
        key: "setAnimation",
        value: function setAnimation(named) {
            this.spriteFrames = [];
            if (named === undefined) {
                this.activeFrames = "idle";
            } else {
                this.activeFrames = named;
            }
            var activeCount = 0;
            //Iterate map active frames with shapes
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.shapes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var shape = _step3.value;

                    if (shape.set === this.activeFrames) {
                        this.mapFrameWith(shape.shape);
                        activeCount++;
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

            if (activeCount === 0) {
                console.log("CYL:[Exception]No active sets in srite");
                return;
            }
            this.frameCount = activeCount;
        }
    }, {
        key: "mapFrameWith",
        value: function mapFrameWith(shape) {
            var frame = [];
            var relativeX = 0;
            var relativeY = 0;
            var index = 0;

            //Iterate Build Shape
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = shape[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var colorCode = _step4.value;

                    frame.push({
                        x: relativeX,
                        y: relativeY,
                        color: colorCode
                    });
                    relativeX = relativeX + pixelSize;
                    index++;
                    if (index === this.width) {
                        relativeY = relativeY + pixelSize;
                        relativeX = 0;
                        index = 0;
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

            this.spriteFrames.push(frame);
        }
    }, {
        key: "name",
        get: function get() {
            return this.spriteName;
        }
    }, {
        key: "frames",
        get: function get() {
            return this.spriteFrames;
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
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = _this2.activeScene.sprites[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _sprite2 = _step5.value;

                    if (name = _sprite2.name) {
                        return _sprite2;
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
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
                if (e.key === "a") {
                    _this2.spriteNamed("player").setAnimation("moving");
                }
                if (e.key === "s") {
                    _this2.spriteNamed("player").setAnimation("idle");
                }
            });
        };

        //Param Validations
        if (!Array.isArray(scenes)) {
            console.log("CYL:[Exception]Game requires an array of scenes");
            return;
        }
        if (scene === 0) {
            console.log("CYL:Default initial scene with index 0 is being loaded");
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
//@prepros-prepend ./lib/scene.js
//@prepros-prepend ./lib/shape-sprite.js
//@prepros-prepend ./lib/game.js

//Scene Config 


var pixelSize = 10;

var screenSize = {
    "width": "100%",
    "height": "100%"
};

var idle1 = {
    "set": "idle",
    "shape": ["transparent", "white", "white", "transparent", "red", "white", "red", "white", "white", "white", "white", "white", "red", "red", "red", "white", "transparent", "white", "white", "transparent"]
};

var idle2 = {
    "set": "idle",
    "shape": ["transparent", "white", "white", "transparent", "white", "red", "white", "red", "white", "white", "white", "white", "white", "red", "red", "red", "transparent", "white", "white", "transparent"]

};

var moving1 = {
    "set": "moving",
    "shape": ["transparent", "white", "white", "transparent", "white", "red", "white", "red", "white", "white", "white", "white", "white", "red", "red", "red", "white", "white", "white", "white"]
};

var moving2 = {
    "set": "moving",
    "shape": ["white", "white", "white", "white", "red", "white", "red", "white", "white", "white", "white", "white", "red", "red", "red", "white", "transparent", "white", "white", "transparent"]
};

var sprite = new ShapeSprite("player", [idle1, idle2, moving1, moving2], 4);

var scene = new Scene([sprite], pixelSize, screenSize);

var game = new Game([scene]);
game.mouseClick();
game.keyPress();
game.run();
//# sourceMappingURL=crayola.build.js.map