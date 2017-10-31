"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******
 * CYL - Utilities
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
        alert("Your browser doesn't suppor Canvas 2D rendering context - Please consider get a recent version of Firefox, Chrome or Safari");
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
 * CYL - Config Globals
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
 * CYL - Class Input + Event Polyfills
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
 * CYL - Shape Sprite
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
            for (var i = 0; i < this.sprites.length; i++) {
                this.sprites[i].renderedX = [];
                this.sprites[i].renderedY = [];
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
            for (var i = 0; i < sprite.framePixels.length; i++) {
                this._renderPixel(sprite, sprite.framePixels[i], sprite.x, sprite.y);
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
        value: function _renderLabelSprite(sprite) {
            this.ctx.font = sprite.ctxFont;
            this.ctx.fillStyle = sprite.color;
            sprite.width = this.ctx.measureText(sprite.text).width;
            this.ctx.fillText(sprite.text, sprite.x, sprite.y);
        }
    }, {
        key: "_renderDialogue",
        value: function _renderDialogue(sprite) {
            for (var i = 0; i < sprite.options.length; i++) {
                this._renderLabelSprite(sprite.options[i]);
            }
        }

        /**
         *Scene Update, sort sprite kind for render
         */

    }, {
        key: "update",
        value: function update() {
            this.clear();
            for (var i = 0; i < this.sprites.length; i++) {
                if (this.sprites[i].kind === "shape") {
                    this._sortShapeFrameWith(this.sprites[i]);
                }
                if (this.sprites[i].kind === "bitmap") {
                    this._sortBitmapFrameWith(this.sprites[i]);
                }
                if (this.sprites[i].kind === "label") {
                    this._renderLabelSprite(this.sprites[i]);
                }
                if (this.sprites[i].kind === "dialogue") {
                    this._renderDialogue(this.sprites[i]);
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
                "width": parseInt(this.canvas.width),
                "height": parseInt(this.canvas.height)
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
 * CYL - Shape Sprite
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
            for (var i = 0; i < this.shapes.length; i++) {
                if (this.shapes[i].set === this.activeAnimation) {
                    this.mapFrameWith(this.shapes[i].shape);
                    activeCount++;
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
            //Iterate Build Shape
            for (var i = 0; i < shape.length; i++) {
                frame.push({
                    x: relativeX,
                    y: relativeY,
                    color: shape[i]
                });
                relativeX = relativeX + SCREEN().pixelSize;
                if ((i + 1) % this.width === 0) {
                    relativeY = relativeY + SCREEN().pixelSize;
                    relativeX = 0;
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
        key: "framePixels",
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
 * CYL - Bitmap Sprite
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
            for (var i = 0; i < this.bitmaps.length; i++) {
                if (this.bitmaps[i].set === this.activeAnimation) {
                    var img = new Image();
                    img.src = this.bitmaps[i].src;
                    img.width = this.width;
                    img.height = this.height;
                    this.spriteFrames.push(img);
                    activeCount++;
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
            for (var i = 0; i < this.bitmaps.length; i++) {
                if (this.bitmaps[i].set === this.activeAnimation) {
                    var img = new Image();
                    img.src = this.bitmaps[i].src;
                    img.width = x;
                    img.height = x;
                    this.spriteFrames.push(img);
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
 * CYL - Label Sprite
 * Copyright MIT license 2017
 */

var LabelSprite = function () {
    function LabelSprite(text) {
        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;
        var font = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Verdana";
        var weight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "normal";
        var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "white";
        var textAligment = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "centered";
        var x = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 5;
        var y = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 30;

        _classCallCheck(this, LabelSprite);

        //Param Validations
        if (text === undefined) {
            console.error("CYL:[Exception] You need a string to initalize a label sprite");
        }

        this.kind = "label";
        //Font properties
        this.text = text;
        this.font = font;
        this.size = size + "px";
        this.weight = weight;
        this.color = color;
        //Container properties
        this.width;
        this.x = x;
        this.y = y;
    }

    _createClass(LabelSprite, [{
        key: "ctxFont",
        get: function get() {
            return this.weight + " " + this.size + " " + this.font;
        }
    }, {
        key: "frame",
        get: function get() {
            return {
                'width': parseInt(this.width),
                'height': parseInt(this.size)
            };
        }
    }]);

    return LabelSprite;
}();
/******
 * CYL - Dialogue Class
 * Copyright MIT license 2017
 */

var Dialogue = function () {
    function Dialogue(labels) {
        var lineSpace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 55;
        var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "menu";
        var focusColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "orange";
        var defaultColor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "white";
        var focusZoom = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 2;
        var x = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 50;
        var y = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 300;

        _classCallCheck(this, Dialogue);

        //Param Validation
        if (!Array.isArray(labels)) {
            console.error("CYL:[Exception]Labbels object must be an array of LabelSprites");
            return;
        }
        this.name = name;
        this.kind = "dialogue";
        this.x = x;
        this.y = y;
        this.lineSpace = lineSpace;
        this.labels = labels;
        this.focusIndex = 0;
        this.focusSize = parseInt(labels[0].size) * focusZoom + "px";
        this.focusColor = focusColor;
        this.defaultFontSize = labels[0].size;
        this.defaultColor = defaultColor;

        this._placeGrid();
    }

    _createClass(Dialogue, [{
        key: "_placeGrid",
        value: function _placeGrid() {
            for (var i = 0; i < this.labels.length; i++) {
                this.labels[i].y = this.y + this.lineSpace + parseInt(i * this.lineSpace);
                this.labels[i].x = this.labels[i].x + this.x;
            }
            this._processFocus();
        }
    }, {
        key: "_processFocus",
        value: function _processFocus() {
            for (var i = 0; i < this.labels.length; i++) {
                if (i === this.focusIndex) {
                    this.labels[i].size = this.focusSize;
                    this.labels[i].color = this.focusColor;
                } else {
                    this.labels[i].size = this.defaultFontSize;
                    this.labels[i].color = this.defaultColor;
                }
            }
        }
    }, {
        key: "setFocus",
        value: function setFocus(index) {
            if (index < 0 || index > this.labels.length) {
                console.warn("CYL:[Warning] - The focus you are setting is out of range");
                return;
            }
            this.focusIndex = index;
            this._processFocus();
        }
    }, {
        key: "focusDown",
        value: function focusDown() {
            if (this.focusIndex >= this.labels.length - 1) {
                this.focusIndex = 0;
            } else {
                this.focusIndex++;
            }
            this._processFocus();
        }
    }, {
        key: "focusUp",
        value: function focusUp() {
            if (0 >= this.focusIndex) {
                this.focusIndex = this.labels.length - 1;
            } else {
                this.focusIndex--;
            }
            this._processFocus();
        }
    }, {
        key: "options",
        get: function get() {
            return this.labels;
        }
    }]);

    return Dialogue;
}();
/******
 * CYL - Game
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
            for (var i = 0; i < this.activeScene.sprites.length; i++) {
                if (this.activeScene.sprites[i].name === name) {
                    return this.activeScene.sprites[i];
                }
            }
        }
    }, {
        key: "spritesNamed",
        value: function spritesNamed(name) {
            return this.activeScene.sprites.filter(function (sprite) {
                return sprite.name === name;
            });
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
 * CYL ES6 Game Dev Tools 
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
//@prepros-prepend ./lib/label-sprite.js
//@prepros-prepend ./lib/dialogue.js
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

var title = new LabelSprite("CYL:Game Development Tools", 17);
var newGame = new LabelSprite("New Game");
var start = new LabelSprite("Start");
var options = new LabelSprite("Options");
var dialogue = new Dialogue([newGame, start, options]);
var scene = new Scene([player, enemy, cat, title, dialogue]);

var game = new Game([scene]);
game.run();

player.x = scene.frame.width / 2;
player.y = scene.frame.height / 2;

enemy.x = scene.frame.width / 3;
enemy.y = scene.frame.height / 3;

cat.x = scene.frame.width * .7;
cat.y = scene.frame.height / 3;

title.x = scene.frame.width / 2 - title.frame.width / 2;

var input = new Input();

input.click(function (e) {
    game.spriteNamed("cat").x = e.clientX;
    game.spriteNamed("cat").y = e.clientY;
});

input.arrowUp(function () {
    game.spriteNamed("player").y = game.spriteNamed("player").y - 20;
    game.spriteNamed("menu").focusUp();
});

input.arrowDown(function () {
    game.spriteNamed("player").y = game.spriteNamed("player").y + 20;
    game.spriteNamed("menu").focusDown();
});

input.arrowLeft(function () {
    game.spriteNamed("player").x = game.spriteNamed("player").x - 20;
});

input.arrowRight(function () {
    game.spriteNamed("player").x = game.spriteNamed("player").x + 20;
});
//# sourceMappingURL=cyl.build.js.map