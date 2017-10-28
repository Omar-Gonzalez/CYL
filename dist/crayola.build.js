"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******
 * Crayola - Utilities
 * Copyright MIT license 2017
 */

/**
 * Key Browser Features Check
 * - check for canvas
 * - check for addEventListener
 * - check for requestAnimationFrame
 */

(function () {
    var canvasSupport = !!window.CanvasRenderingContext2D;
    if (canvasSupport === false) {
        alert("Your browser doesn't suppor Canvas 2D rendering context - Please, get a recent version of Firefox, Chrome or Safari");
        console.error("Your browser doesn't suppor Canvas 2D rendering context. Please consider get a recent version of Firefox, Chrome or Safari");
    }
    if (!window.requestAnimationFrame) {
        alert("Your browser doesn't suppor the requestAnimationFrame API - Please, get a recent version of Firefox, Chrome or Safari");
        console.error("Your browser doesn't suppor equestAnimationFrame API. Please consider get a recent version of Firefox, Chrome or Safari");
    }
    if (!window.addEventListener) {
        alert("Your browser doesn't suppor the addEventListener API - Please, get a recent version of Firefox, Chrome or Safari");
        console.error("Your browser doesn't suppor addEventListener API - Please consider get a recent version of Firefox, Chrome or Safari");
    }
})();

console.log(requestAnimationFrame);

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
 * Crayola - Config Globals
 * Copyright MIT license 2017
 */

//Scene Config 
window.SCREEN = function () {
    //Set Accordingily 
    var pixelSize = 10;
    var predefinedPixel = "L"; //S,M,L //set to null if you want a fixed dimension
    var apectRatio = null; //[16, 9];
    var percentual = [100, 100]; //null or ser w % or h &

    if (predefinedPixel === "S") {
        pixelSize = window.innerWidth / 200;
    }
    if (predefinedPixel === "M") {
        pixelSize = window.innerWidth / 150;
    }
    if (predefinedPixel === "L") {
        pixelSize = window.innerWidth / 100;
    }

    var width = void 0;
    var height = void 0;

    if (percentual) {
        var verticalMargin = (100 - percentual[1]) / 2;
        document.getElementById('screen').style.marginTop = verticalMargin + "%";
        width = percentual[0] + "%";
        height = percentual[1] + "%";
    }

    if (apectRatio) {
        width = window.innerWidth;
        height = parseFloat(width / apectRatio[0] * apectRatio[1]);
        var _verticalMargin = (window.innerHeight - height) / 2;
        document.getElementById('screen').style.marginTop = _verticalMargin + "px";
        width = width + "px";
        height = height + "px";
    }

    return {
        'pixelSize': pixelSize,
        'screen': {
            'width': width,
            'height': height
        }
    };
};

window.addEventListener("resize", function () {
    window.SCREEN();
});
/******
 * Crayola - Class Input + Event Polyfills
 * Copyright MIT license 2017
 */

var Input = function () {
    function Input() {
        _classCallCheck(this, Input);

        this._registerKeyDown();
    }

    _createClass(Input, [{
        key: "_registerKeyDown",
        value: function _registerKeyDown() {
            var self = this;
            window.addEventListener("keydown", function (e) {
                return self._filterKeyDown(e);
            });
            window.addEventListener("click", function (e) {
                return self.click(null, e);
            });
        }
    }, {
        key: "click",
        value: function click(action, e) {
            /**
             * Mouse - Touchpad Event  
             */
            if (action) {
                this.mouseAction = action;
            }
            if (typeof this.mouseAction === "function" && e !== undefined) {
                this.mouseAction(e);
            } else {
                console.warn("CYL: Click action must be a function");
            }
        }
    }, {
        key: "_filterKeyDown",
        value: function _filterKeyDown(e) {
            /**
             * KeyDown Event Polyfill 
             */
            //Arrow Keys
            if (e.key === "ArrowUp" || e.code === "ArrowUp" || e.keyCode === 38) {
                this.arrowUp();
            }
            if (e.key === "ArrowDown" || e.code === "ArrowDown" || e.keyCode === 40) {
                this.arrowDown();
            }
            if (e.key === "ArrowLeft" || e.code === "ArrowLeft" || e.keyCode === 37) {
                this.arrowLeft();
            }
            if (e.key === "ArrowRight" || e.code === "ArrowRight" || e.keyCode === 39) {
                this.arrowRight();
            }
            //Escape + Space 
            if (e.key === " " || e.code === "Space" || e.keyCode === 32) {
                this.spaceBar();
            }
            if (e.key === "Escape" || e.code === "Escape" || e.keyCode === 27) {
                this.escape();
            }
            //Characters
            if (e.key === "a" || e.key === "A" || e.code === "KeyA" || e.keyCode === 65) {
                this.a();
            }
            if (e.key === "s" || e.key === "S" || e.code === "KeyS" || e.keyCode === 83) {
                this.s();
            }
            if (e.key === "d" || e.key === "D" || e.code === "KeyD" || e.keyCode === 68) {
                this.d();
            }
            if (e.key === "f" || e.key === "F" || e.code === "KeyF" || e.keyCode === 70) {
                this.f();
            }
            if (e.key === "p" || e.key === "P" || e.code === "KeyP" || e.keyCode === 80) {
                this.p();
            }
        }
    }, {
        key: "p",
        value: function p(keyAction) {
            if (keyAction) {
                this.pAction = keyAction;
            }
            if (typeof this.pAction === "function") {
                this.pAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "f",
        value: function f(keyAction) {
            if (keyAction) {
                this.fAction = keyAction;
            }
            if (typeof this.fAction === "function") {
                this.fAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "d",
        value: function d(keyAction) {
            if (keyAction) {
                this.dAction = keyAction;
            }
            if (typeof this.dAction === "function") {
                this.dAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "s",
        value: function s(keyAction) {
            if (keyAction) {
                this.sAction = keyAction;
            }
            if (typeof this.sAction === "function") {
                this.sAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "a",
        value: function a(keyAction) {
            if (keyAction) {
                this.aAction = keyAction;
            }
            if (typeof this.aAction === "function") {
                this.aAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "escape",
        value: function escape(keyAction) {
            if (keyAction) {
                this.escapeAction = keyAction;
            }
            if (typeof this.escapeAction === "function") {
                this.escapeAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "spaceBar",
        value: function spaceBar(keyAction) {
            if (keyAction) {
                this.spaceBarAction = keyAction;
            }
            if (typeof this.spaceBarAction === "function") {
                this.spaceBarAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "arrowUp",
        value: function arrowUp(keyAction) {
            if (keyAction) {
                this.arrowUpAction = keyAction;
            }
            if (typeof this.arrowUpAction === "function") {
                this.arrowUpAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "arrowDown",
        value: function arrowDown(keyAction) {
            if (keyAction) {
                this.keyDownAction = keyAction;
            }
            if (typeof this.keyDownAction === "function") {
                this.keyDownAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "arrowLeft",
        value: function arrowLeft(keyAction) {
            if (keyAction) {
                this.keyLeftAction = keyAction;
            }
            if (typeof this.keyLeftAction === "function") {
                this.keyLeftAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "arrowRight",
        value: function arrowRight(keyAction) {
            if (keyAction) {
                this.keyRightAction = keyAction;
            }
            if (typeof this.keyRightAction === "function") {
                this.keyRightAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "_callBackTypeError",
        value: function _callBackTypeError() {
            console.warn("CYL: Input action requires a function");
        }
    }]);

    return Input;
}();
/******
 * Crayola - Shape Sprite
 * Copyright MIT license 2017
 */


var Scene = function () {
    /**
     * Scene Properties
     * @param sprites - array with sprites to load into scene
     * @param Screen Size - W x H - defaults to 100%
     */
    function Scene() {
        var sprites = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, Scene);

        //Param Validation
        if (!Array.isArray(sprites)) {
            console.error("CYL:[Exception]Update method requires an array of sprites");
            return;
        }
        if (sprites.length < 1) {
            console.error("CYL:[Exception]Need at least one sprite to initialize a scene");
            return;
        }
        //Props
        this.screen = document.getElementById("screen");
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        this.sprites = sprites;
        //Init Methods
        this._defineCanvasDimensions();
    }

    _createClass(Scene, [{
        key: "_defineCanvasDimensions",
        value: function _defineCanvasDimensions() {
            var _this = this;

            this.screen.style.width = SCREEN().screen.width;
            this.screen.style.height = SCREEN().screen.height;
            this.canvas.width = this.screen.offsetWidth;
            this.canvas.height = this.screen.offsetHeight;

            window.addEventListener("resize", function () {
                _this.screen.style.width = SCREEN().screen.width;
                _this.screen.style.height = SCREEN().screen.height;
                _this.canvas.width = _this.screen.offsetWidth;
                _this.canvas.height = _this.screen.offsetHeight;
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
        /**
        *Shapre srite render methods
        */

    }, {
        key: "_renderPixel",
        value: function _renderPixel(sprite, pixel) {
            var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            this.ctx.fillStyle = pixel.color;
            this.ctx.fillRect(pixel.x + x, pixel.y + y, SCREEN().pixelSize, SCREEN().pixelSize);
            sprite.renderedX.push(pixel.x + x);
            sprite.renderedY.push(pixel.y + y);
        }
    }, {
        key: "_renderShapeWith",
        value: function _renderShapeWith(sprite) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = sprite.currentFrame[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
        key: "_sortShapeFrameWith",
        value: function _sortShapeFrameWith(sprite) {
            //Update frame to render on update
            if (sprite.tickCounter > sprite.tick) {
                sprite.tickCounter = 0;
                sprite.currentFrameIndex++;
                if (sprite.currentFrameIndex >= sprite.frameCount) {
                    sprite.currentFrameIndex = 0;
                }
            }
            sprite.tickCounter++;
            //Render currentFrame
            this._renderShapeWith(sprite);
        }
        /**
        * Bitam sprites render methods
        */

    }, {
        key: "_renderBitmapFrame",
        value: function _renderBitmapFrame(sprite) {
            this.ctx.drawImage(sprite.currentFrame, sprite.x, sprite.y, sprite.currentFrame.width, sprite.currentFrame.height);
        }
    }, {
        key: "_sortBitmapFrameWith",
        value: function _sortBitmapFrameWith(sprite) {
            //Update frame to render on update
            if (sprite.tickCounter > sprite.tick) {
                sprite.tickCounter = 0;
                sprite.currentFrameIndex++;
                if (sprite.currentFrameIndex >= sprite.frameCount) {
                    sprite.currentFrameIndex = 0;
                }
            }
            sprite.tickCounter++;
            this._renderBitmapFrame(sprite);
        }
        /**
        * Label sprite render methods
        */

    }, {
        key: "_renderLabelSprite",
        value: function _renderLabelSprite() {
            this.ctx.font = "30px Comic Sans MS";
            this.ctx.fillStyle = "red";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Hello World", 200, 200);
        }
        /**
        *Scene Update, sort sprite kind for render
        */

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

                    if (sprite.kind === "shape") {
                        this._sortShapeFrameWith(sprite);
                    }
                    if (sprite.kind === "bitmap") {
                        this._sortBitmapFrameWith(sprite);
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
    }, {
        key: "setSprites",
        value: function setSprites(sprites) {
            if (!Array.isArray(sprites)) {
                console.error("CYL:[Exception]Update method requires an array of sprites");
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
/******
 * Crayola - Shape Sprite
 * Copyright MIT license 2017
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
     * @param Contact group - defines Contact groups
     */
    function ShapeSprite(name, shapes) {
        var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
        var tick = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
        var contactGroup = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
        var x = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
        var y = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

        _classCallCheck(this, ShapeSprite);

        //Param Validation
        if (name === undefined) {
            console.warn("CYL:Warning, no name identifier for sprite");
        }
        if (width === 4) {
            console.warn("CYL:Warning, default 4 sprite size");
        }
        if (shapes === undefined) {
            console.error("CYL:[Exception]You need a shape to initialize a sprite");
            return;
        }
        if (!Array.isArray(shapes)) {
            console.error("CYL:[Exception]Shape object must be an array");
            return;
        }
        //Props Definition
        this.kind = "shape";
        this.name = name;
        this.spriteFrames = [];
        this.width = width;
        this.x = x;
        this.y = y;
        //animation related props
        this.currentFrameIndex = 0;
        this.tick = tick;
        this.tickCounter = 0;
        this.shapes = shapes;
        this.activeAnimation = "";
        //Contact detection props
        this.renderedX = [];
        this.renderedY = [];
        this.contactGroup = contactGroup;
        //Init Methods
        this.setAnimation();
    }

    _createClass(ShapeSprite, [{
        key: "setAnimation",
        value: function setAnimation(named) {
            this.spriteFrames = []; //clean active frames before setting them again
            if (named === undefined) {
                this.activeAnimation = "idle";
            } else {
                this.activeAnimation = named;
            }
            var activeCount = 0;
            //Iterate map active frames with shapes
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.shapes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var shape = _step4.value;

                    if (shape.set === this.activeAnimation) {
                        this.mapFrameWith(shape.shape);
                        activeCount++;
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

            if (activeCount === 0) {
                console.error("CYL:[Exception]No active sets in srite");
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
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = shape[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var colorCode = _step5.value;

                    frame.push({
                        x: relativeX,
                        y: relativeY,
                        color: colorCode
                    });
                    relativeX = relativeX + SCREEN().pixelSize;
                    index++;
                    if (index === this.width) {
                        relativeY = relativeY + SCREEN().pixelSize;
                        relativeX = 0;
                        index = 0;
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

            this.spriteFrames.push(frame);
        }
    }, {
        key: "inContactWith",
        value: function inContactWith(sprite) {
            var xContact = false;
            var yContact = false;
            if (this.bounds.maxX.between(sprite.bounds.minX, sprite.bounds.maxX) || this.bounds.minX.between(sprite.bounds.minX, sprite.bounds.maxX)) {
                xContact = true;
            }
            if (this.bounds.maxY.between(sprite.bounds.minY, sprite.bounds.maxY) || this.bounds.minY.between(sprite.bounds.minY, sprite.bounds.maxY)) {
                yContact = true;
            }
            if (xContact === true && yContact === true) {
                return {
                    'inContact': true,
                    'contactWith': this.name + " in contact with " + sprite.name
                };
            } else {
                return {
                    'inContact': false
                };
            }
        }
    }, {
        key: "inCollisionWith",
        value: function inCollisionWith(sprite) {
            var xCollision = false;
            var yCollision = false;
            if (this.bounds.maxX.between(sprite.bounds.minX, sprite.bounds.maxX) || this.bounds.minX.between(sprite.bounds.minX, sprite.bounds.maxX)) {
                xCollision = true;
            }
            if (this.bounds.maxY.between(sprite.bounds.minY, sprite.bounds.maxY) || this.bounds.minY.between(sprite.bounds.minY, sprite.bounds.maxY)) {
                yCollision = true;
            }
            if (xCollision === true && yCollision === true) {
                //if in collision prevent futher movement
                return {
                    'inCollision': true,
                    'collisionWith': this.name + " in collision with " + sprite.name
                };
            } else {
                return {
                    'inCollision': false
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
        key: "currentFrame",
        get: function get() {
            return this.spriteFrames[this.currentFrameIndex];
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
 * Crayola - Bitmap Sprite
 * Copyright MIT license 2017
 */


var BitmapSprite = function () {
    function BitmapSprite(name, bitmaps) {
        var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
        var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
        var tick = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 20;
        var contactGroup = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
        var x = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
        var y = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;

        _classCallCheck(this, BitmapSprite);

        //Param Validation
        if (name === undefined) {
            console.warn("CYL:Warning, no name identifier for sprite");
        }
        if (!Array.isArray(bitmaps)) {
            console.error("CYL:[Exception]Bitmaps object must be an array");
            return;
        }
        if (bitmaps === undefined) {
            console.error("CYL:[Exception]You need at least one bitmap to initialize a sprite");
            return;
        }
        if (height === 50 && width === 50) {
            console.warn("CYL:Warning, bitmap sprite dimensions set to default 50x50");
        }
        //Props Definition:
        this.kind = "bitmap";
        this.name = name;
        this.bitmaps = bitmaps;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        //animation related props
        this.tick = tick;
        this.tickCounter = 0;
        this.frameCount = 0;
        this.currentFrameIndex = 0;
        //Contact detection props
        this.contactGroup = contactGroup;
        this.setAnimation();
    }

    _createClass(BitmapSprite, [{
        key: "setAnimation",
        value: function setAnimation(named) {
            this.spriteFrames = []; //clean active frames before setting them again
            if (named === undefined) {
                this.activeAnimation = "idle";
            } else {
                this.activeAnimation = named;
            }
            var activeCount = 0;
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.bitmaps[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var bitmap = _step6.value;

                    if (bitmap.set === this.activeAnimation) {
                        var img = new Image();
                        img.src = bitmap.src;
                        img.width = this.width;
                        img.height = this.height;
                        this.spriteFrames.push(img);
                        activeCount++;
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

            if (activeCount === 0) {
                console.error("CYL:[Exception]No active frames in srite");
                return;
            }
            this.frameCount = activeCount;
        }
    }, {
        key: "inContactWith",
        value: function inContactWith(sprite) {
            var xContact = false;
            var yContact = false;
            if (this.bounds.maxX.between(sprite.bounds.minX, sprite.bounds.maxX) || this.bounds.minX.between(sprite.bounds.minX, sprite.bounds.maxX)) {
                xContact = true;
            }
            if (this.bounds.maxY.between(sprite.bounds.minY, sprite.bounds.maxY) || this.bounds.minY.between(sprite.bounds.minY, sprite.bounds.maxY)) {
                yContact = true;
            }
            if (xContact === true && yContact === true) {
                return {
                    'inContact': true,
                    'contactWith': this.name + " in contact with " + sprite.name
                };
            } else {
                return {
                    'inContact': false
                };
            }
        }
    }, {
        key: "inCollisionWith",
        value: function inCollisionWith(sprite) {
            var xCollision = false;
            var yCollision = false;
            if (this.bounds.maxX.between(sprite.bounds.minX, sprite.bounds.maxX) || this.bounds.minX.between(sprite.bounds.minX, sprite.bounds.maxX)) {
                xCollision = true;
            }
            if (this.bounds.maxY.between(sprite.bounds.minY, sprite.bounds.maxY) || this.bounds.minY.between(sprite.bounds.minY, sprite.bounds.maxY)) {
                yCollision = true;
            }
            if (xCollision === true && yCollision === true) {
                //if in collision prevent futher movement
                return {
                    'inCollision': true,
                    'collisionWith': this.name + " in collision with " + sprite.name
                };
            } else {
                return {
                    'inCollision': false
                };
            }
        }
    }, {
        key: "setDimension",
        value: function setDimension(x, y) {
            this.spriteFrames = [];
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.bitmaps[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var bitmap = _step7.value;

                    if (bitmap.set === this.activeAnimation) {
                        var img = new Image();
                        img.src = bitmap.src;
                        img.width = x;
                        img.height = x;
                        this.spriteFrames.push(img);
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
        }
    }, {
        key: "bounds",
        get: function get() {
            return {
                "maxX": this.width + this.x,
                "minX": this.x,
                "minY": this.y,
                "maxY": this.height + this.y
            };
        }
    }, {
        key: "currentFrame",
        get: function get() {
            return this.spriteFrames[this.currentFrameIndex];
        }
    }, {
        key: "frames",
        get: function get() {
            return this.spriteFrames;
        }
    }]);

    return BitmapSprite;
}();
/******
 * Crayola - Game
 * Copyright MIT license 2017
 */


var Game = function () {
    function Game(scenes) {
        var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, Game);

        //Param Validations
        if (!Array.isArray(scenes)) {
            console.error("CYL:[Exception]Game requires an array of scenes");
            return;
        }
        if (scene === 0) {
            console.warn("CYL:Default initial scene with index 0 is being loaded");
        }
        //Props
        this.scenes = scenes;
        this.active = active;
        this.shouldUpdate = true;
        //Init Mehtods:
        this.setActiveScene();
        //Bind run method - animation request frame call back
        this.run = this.run.bind(this);
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
        key: "run",
        value: function run() {
            if (this.shouldUpdate) {
                this.activeScene.update();
                this.detectContact();
            }
            window.requestAnimationFrame(this.run);
        }
    }, {
        key: "pause",
        value: function pause() {
            if (this.shouldUpdate) {
                this.shouldUpdate = false;
            } else {
                this.shouldUpdate = true;
            }
        }
    }, {
        key: "spriteNamed",
        value: function spriteNamed(name) {
            return this.activeScene.sprites.filter(function (sprite) {
                return sprite.name === name;
            })[0];
        }
    }, {
        key: "detectContact",
        value: function detectContact() {
            //set your contact logic
            var contact = this.spriteNamed("cat").inContactWith(this.spriteNamed("enemy"));
            if (contact.inContact) {
                console.log(contact.contactWith);
            }
        }
    }, {
        key: "detectCollision",
        value: function detectCollision() {
            //set your collision logic
            var collision = this.spriteNamed("player").inCollisionWith(this.spriteNamed("enemy")).inCollision;
            if (collision.inCollision) {
                console.log(collision.collisionWith);
            }
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
 * Copyright MIT license 2017
 * Conventions: 
 * _underscore for pseudo private methods 
 */

//Lib Concatenation
//@prepros-prepend ./lib/utils.js
//@prepros-prepend ./lib/config.js
//@prepros-prepend ./lib/input.js
//@prepros-prepend ./lib/scene.js
//@prepros-prepend ./lib/shape-sprite.js
//@prepros-prepend ./lib/bitmap-sprite.js
//@prepros-prepend ./lib/game.js

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
    "shape": ["orange", "transparent", "transparent", "orange", "orange", "transparent", "transparent", "orange", "transparent", "orange", "orange", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"]
};

var eIdle2 = {
    "set": "idle",
    "shape": ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "orange", "orange", "transparent", "orange", "transparent", "transparent", "orange", "orange", "transparent", "transparent", "orange"]
};

var enemy = new ShapeSprite("enemy", [eIdle1, eIdle2], 4, 10, "A");

var catImg = {
    "set": "idle",
    "src": "assets/cat-bat.png"
};

var catImg2 = {
    "set": "idle",
    "src": "assets/cat-bat-alt.png"
};

var cat = new BitmapSprite("cat", [catImg, catImg2], 100, 100);

var scene = new Scene([player, enemy, cat]);

player.x = scene.frame.width / 2;
player.y = scene.frame.height / 2;

enemy.x = scene.frame.width / 3;
enemy.y = scene.frame.height / 3;

cat.x = scene.frame.width * .7;
cat.y = scene.frame.height / 3;

var game = new Game([scene]);
game.run();

var input = new Input();

input.click(function (e) {
    game.spriteNamed("cat").x = e.clientX;
    game.spriteNamed("cat").y = e.clientY;
});

input.arrowUp(function () {
    game.spriteNamed("player").y = game.spriteNamed("player").y - 20;
});

input.arrowDown(function () {
    game.spriteNamed("player").y = game.spriteNamed("player").y + 20;
});

input.arrowLeft(function () {
    game.spriteNamed("player").x = game.spriteNamed("player").x - 20;
});

input.arrowRight(function () {
    game.spriteNamed("player").x = game.spriteNamed("player").x + 20;
});

input.spaceBar(function () {
    console.log("space bar");
});

input.escape(function () {
    console.log("escape");
});

input.a(function () {
    console.log("a key");
});

input.s(function () {
    console.log("s key");
});

input.d(function () {
    console.log("d key");
});

input.f(function () {
    console.log("f key");
});

input.p(function () {
    console.log("p key");
});
//# sourceMappingURL=crayola.build.js.map