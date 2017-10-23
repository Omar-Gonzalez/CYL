"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******
 * Crayola - Utilities
 * Omar Gonzalez Rocha - Copyright MIT license 2017
 */

/**
 * Custom Document Ready Credits to : jfriend00 - https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t
 */
(function (funcName, baseObj) {
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }

    function readyStateChange() {
        if (document.readyState === "complete") {
            ready();
        }
    }

    baseObj[funcName] = function (callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }

        if (readyFired) {
            setTimeout(function () {
                callback(context);
            }, 1);
            return;
        } else {
            readyList.push({
                fn: callback,
                ctx: context
            });
        }
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    };
})("docReady", window);

//Array Prototype Min - Max, credits to Chaospandion - https://stackoverflow.com/questions/1669190/find-the-min-max-element-of-an-array-in-javascript

Array.prototype.min = function (evaluate) {

    if (this.length === 0) return null;
    if (this.length === 1) return this[0];

    evaluate = evaluate || Math.min;

    var v = this[0];
    for (var i = 1; i < this.length; i++) {
        v = evaluate(this[i], v);
    }

    return v;
};

Array.prototype.max = function (evaluate) {

    if (this.length === 0) return null;
    if (this.length === 1) return this[0];

    evaluate = evaluate || Math.max;

    var v = this[0];
    for (var i = 1; i < this.length; i++) {
        v = evaluate(this[i], v);
    }

    return v;
};

//Number Range Prototype - credits to jbabey - https://stackoverflow.com/questions/12806304/shortest-code-to-check-if-a-number-is-in-a-range-in-javascript

Number.prototype.between = function (min, max) {
    return this > min && this < max;
};
/******
 * Crayola - Shape Sprite
 * Omar Gonzalez Rocha - Copyright MIT license 2017
 */

var Scene = function () {
    /**
     * Scene Properties
     * @param sprites - array with sprites to load into scene
     * @param pixelSize - taken from CONFIG.pixelSize global
     * @param Screen Size - W x H - defaults to 100% 
     */
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
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.sprites[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var sprite = _step.value;

                    sprite.renderedX = [];
                    sprite.renderedY = [];
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
        key: "_renderPixel",
        value: function _renderPixel(sprite, pixel) {
            var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            this.ctx.fillStyle = pixel.color;
            this.ctx.fillRect(pixel.x + x, pixel.y + y, this.pixelSize, this.pixelSize);
            sprite.renderedX.push(pixel.x + x);
            sprite.renderedY.push(pixel.y + y);
        }
    }, {
        key: "_renderShapeWith",
        value: function _renderShapeWith(sprite, frame) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = frame[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var pixel = _step2.value;

                    this._renderPixel(sprite, pixel, sprite.x, sprite.y);
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
            this._renderShapeWith(sprite, sprite.frames[sprite.currentFrame]);
        }
    }, {
        key: "update",
        value: function update() {
            this.clear();
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.sprites[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var sprite = _step3.value;

                    this._sortFrameWith(sprite);
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
        key: "detectCollision",
        value: function detectCollision() {
            /***
             * Default Support for 3 collision groups A,B,C
             * Add More if required
             */
            var groupA = [];

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.sprites[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var sprite = _step4.value;

                    if (sprite.collisionGroup === "A") {
                        groupA.push(sprite);
                    }
                    if (sprite.collisionGroup === "B") {
                        groupB.push(sprite);
                    }
                    if (sprite.collisionGroup === "C") {
                        groupC.push(sprite);
                    }
                }
                //TODO:Iterate trough all possible collision - handle result
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

            if (groupA[0].isCollindingWith(groupA[1]).colliding) {
                console.log(groupA[0].isCollindingWith(groupA[1]).inCollision);
            }
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
/******
 * Crayola - Shape Sprite
 * Omar Gonzalez Rocha - Copyright MIT license 2017
 */

var ShapeSprite = function () {
    /**
     * Sprite Properties
     * @param shapes - array with filtered shapes
     * @param width - sprite width new line in shape
     * @param x - x postion in scene
     * @param y - y position in scene
     * @param current frame - frame tornder on tick
     * @param tick - number of ticks before frame update
     * @param collision group - defines collision groups
     */
    function ShapeSprite(name, shapes) {
        var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
        var tick = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
        var collisionGroup = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
        var x = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
        var y = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

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
        //Collision detection props
        this.renderedX = [];
        this.renderedY = [];
        this.collisionGroup = collisionGroup;

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
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.shapes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var shape = _step5.value;

                    if (shape.set === this.activeFrames) {
                        this.mapFrameWith(shape.shape);
                        activeCount++;
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
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = shape[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var colorCode = _step6.value;

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
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            this.spriteFrames.push(frame);
        }
    }, {
        key: "isCollindingWith",
        value: function isCollindingWith(sprite) {
            var xCollision = false;
            var yCollision = false;
            if (this.bounds.maxX.between(sprite.bounds.minX, sprite.bounds.maxX) || this.bounds.minX.between(sprite.bounds.minX, sprite.bounds.maxX)) {
                xCollision = true;
            }
            if (this.bounds.maxY.between(sprite.bounds.minY, sprite.bounds.maxY) || this.bounds.minY.between(sprite.bounds.minY, sprite.bounds.maxY)) {
                yCollision = true;
            }
            if (xCollision === true && yCollision === true) {
                return {
                    'colliding': true,
                    'inCollision': this.name + " in collision with " + sprite.name
                };
            } else {
                return {
                    'colliding': false
                };
            }
        }
    }, {
        key: "bounds",
        get: function get() {
            return {
                "maxX": this.renderedX.max(),
                "minX": this.renderedX.min(),
                "maxY": this.renderedY.max(),
                "minY": this.renderedY.min()
            };
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
/******
 * Crayola - Game
 * Omar Gonzalez Rocha - Copyright MIT license 2017
 */

var Game = function () {
    function Game(scenes) {
        var _this2 = this;

        var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, Game);

        this.run = function () {
            if (_this2.shouldUpdate) {
                _this2.activeScene.update();
                _this2.activeScene.detectCollision();
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
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = _this2.activeScene.sprites[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var sprite = _step7.value;

                    if (name = sprite.name) {
                        return sprite;
                    }
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
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
                if (e.key === " ") {
                    _this2.activeScene.detectCollision();
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
        key: "detectCollision",
        value: function detectCollision() {}
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

//Lib Concatenation
//@prepros-prepend ./lib/utils.js
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

var player = new ShapeSprite("player", [idle1, idle2, moving1, moving2], 4, 20, "A");

var eIdle1 = {
    "set": "idle",
    "shape": ["orange", "red", "red", "orange", "orange", "red", "red", "orange", "red", "orange", "orange", "red", "red", "red", "red", "red", "red", "red", "red", "red"]
};

var eIdle2 = {
    "set": "idle",
    "shape": ["red", "red", "red", "red", "red", "red", "red", "red", "red", "orange", "orange", "red", "orange", "red", "red", "orange", "orange", "red", "red", "orange"]
};

var enemy = new ShapeSprite("enemy", [eIdle1, eIdle2], 4, 10, "A");

var scene = new Scene([player, enemy], pixelSize, screenSize);

player.x = scene.frame.width / 2;
player.y = scene.frame.height / 2;

enemy.x = scene.frame.width / 3;
enemy.y = scene.frame.height / 3;

docReady(function () {
    var game = new Game([scene]);
    game.mouseClick();
    game.keyPress();
    game.run();
});
//# sourceMappingURL=crayola.build.js.map