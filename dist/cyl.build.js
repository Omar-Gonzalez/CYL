"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    var consider = " - Please consider getting a recent version of Firefox, Chrome or Safari";
    if (!(window.console.error && window.console.warn)) {
        alert("Your browser doesn't suppor the console.error and console.warn debug tools" + consider);
        console.error("Your browser doesn't suppor the console.error and console.warn debug tools" + consider);
    }
    var canvasSupport = !!window.CanvasRenderingContext2D;
    if (canvasSupport === false) {
        alert("Your browser doesn't suppor Canvas 2D rendering context" + consider);
        console.error("Your browser doesn't suppor Canvas 2D rendering context" + consider);
    }
    if (!window.requestAnimationFrame) {
        alert("Your browser doesn't suppor the requestAnimationFrame API" + consider);
        console.error("Your browser doesn't suppor equestAnimationFrame API" + consider);
    }
    if (!window.addEventListener) {
        alert("Your browser doesn't suppor the addEventListener API" + consider);
        console.error("Your browser doesn't suppor addEventListener API" + consider);
    }
})();

console.log(requestAnimationFrame);

/**
 * Custom Document Ready 
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

//Array Prototype Utility Methods

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

//Number Prototype Utility Methods

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

Number.prototype.between = function (min, max) {
    return this > min && this < max;
};

Number.prototype.positivity = function () {
    if (this > 0) {
        return "positive";
    } else {
        return "negative";
    }
};

Number.prototype.getCloseTo = function (n, rate) {
    if (this < n) {
        return this + rate;
    } else {
        return this - rate;
    }
};

Array.prototype.removeVal = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};

Array.prototype.removeIndex = function (i) {
    this.splice(i, 1);
    return this;
};

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);

        this.logs = [];
    }

    _createClass(Logger, [{
        key: "print",
        value: function print() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.logs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    log = _step.value;

                    console.log("CYL:Log - " + log);
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
        key: "add",
        value: function add(log) {
            this.logs.push(log);
        }
    }, {
        key: "delete",
        value: function _delete() {
            this.logs = [];
        }
    }, {
        key: "dump",
        get: function get() {
            return this.logs;
        }
    }]);

    return Logger;
}();
/******
 * CYL - Config Globals
 * Copyright MIT license 2017
 */

var Config = function () {
    function Config() {
        _classCallCheck(this, Config);

        this.predefinedPixel = "l";
        this.screenKind = "full";
        this.dimension = [100, 100];
    }

    _createClass(Config, [{
        key: "setScreen",
        value: function setScreen(kind, dimension) {
            if (kind === undefined) {
                console.error("CYL:[Exception]CFG.setScreen requires kind fixed | full | percentual] parameter");
                return;
            }
            if (dimension === undefined) {
                console.error("CYL:[Warning]CFG.setScreen no dimension parameter, dimesion will set to default 100x100");
            }

            this.dimension = dimension;
            this.screenKind = kind;
            var sDiv = document.getElementById("screen");
            sDiv.style.width = this.dimension[0] + "px";
            sDiv.style.height = this.dimension[1] + "px";
        }
    }, {
        key: "FONTSIZE",
        value: function FONTSIZE(fontSize) {
            var width = document.getElementById('screen').offsetWidth;

            if (fontSize === "small") {
                if (width < 768) {
                    return "12px";
                }
                if (width > 768 && width < 1028) {
                    return "16px";
                }
                if (width > 1028) {
                    return "20px";
                }
            }
            if (fontSize === "medium") {
                if (width < 768) {
                    return "20px";
                }
                if (width > 768 && width < 1028) {
                    return "40px";
                }
                if (width > 1028) {
                    return "50px";
                }
            }
            if (fontSize === "large") {
                if (width < 768) {
                    return "28px";
                }
                if (width > 768 && width < 1028) {
                    return "50px";
                }
                if (width > 1028) {
                    return "70px";
                }
            }
        }
    }, {
        key: "DEVICE",
        get: function get() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return "mobile";
            } else {
                return "desktop";
            }
        }
    }, {
        key: "SCREEN",
        get: function get() {

            var width = void 0;
            var height = void 0;
            var verticalMargin = 0;

            if (this.screenKind === "percentual") {
                verticalMargin = (100 - this.dimension[1]) / 2;
                document.getElementById('screen').style.marginTop = verticalMargin + "%";
                width = this.dimension[0] + "%";
                height = this.dimension[1] + "%";
            }

            if (this.screenKind === "aspect-ratio") {
                width = window.innerWidth;
                height = parseFloat(width / this.dimension[0] * this.dimension[1]);
                verticalMargin = (window.innerHeight - height) / 2;
                document.getElementById('screen').style.marginTop = verticalMargin + "px";
                width = width + "px";
                height = height + "px";
            }

            if (this.screenKind === "fixed") {
                width = this.dimension[0] + "px";
                height = this.dimension[1] + "px";

                if (this.predefinedPixel === "s") {
                    this.pixelSize = document.getElementById("screen").offsetWidth / 200;
                }
                if (this.predefinedPixel === "m") {
                    this.pixelSize = document.getElementById("screen").offsetWidth / 150;
                }
                if (this.predefinedPixel === "l") {
                    this.pixelSize = document.getElementById("screen").offsetWidth / 100;
                }
            }

            if (this.screenKind === "full") {
                width = "100%";
                height = "100%";
            }

            return {
                "width": width,
                "height": height,
                "verticalMargin": verticalMargin,
                "horizontalMargin": (window.innerWidth - document.getElementById("game").offsetWidth) / 2
            };
        }
    }, {
        key: "PIXELSIZE",
        get: function get() {
            if (this.predefinedPixel === "s") {
                this.pixelSize = document.getElementById('screen').offsetWidth / 200;
            }
            if (this.predefinedPixel === "m") {
                this.pixelSize = document.getElementById('screen').offsetWidth / 150;
            }
            if (this.predefinedPixel === "l") {
                this.pixelSize = document.getElementById('screen').offsetWidth / 100;
            }
            return this.pixelSize;
        }
    }]);

    return Config;
}();

var CFG = new Config();

// window.addEventListener("resize", () => {
//     window.CFG.SCREEN;
// });
/******
 * CYL - Action Sprite
 * Copyright MIT license 2017
 */

var Action = function () {
    function Action() {
        var kind = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "default";

        _classCallCheck(this, Action);

        //Param Validation
        if (kind === "default") {
            console.warn("CYL:Warning, Initialicing Action with default parameter");
        }
        this.kind = kind;
        //Animation Cycle 
        this.cycleX = true;
        this.cycleY = true;
        //Acceleration 
        this.accelRatio = 1.7;
        this.xCurrentSpeed = 0;
        this.yCurrentSpeed = 0;
        this.prevXSpeed = 0;
        this.prevYSpeed = 0;
        this.maxSpeedFactor = 12;
    }

    _createClass(Action, [{
        key: "computeX",
        value: function computeX(x) {
            /***
             * Default Vector X displacement x + value 
             */
            if (this.kind === "default") {
                return x;
            }

            /***
             * Linear Acceleration X
             */

            if (this.kind === "accel") {
                if (x.positivity() !== this.prevXSpeed.positivity()) {
                    this.xCurrentSpeed = 0;
                }
                this.prevXSpeed = x;
                var max = void 0;
                if (x.positivity() === "positive") {
                    max = x * this.maxSpeedFactor;
                    if (this.xCurrentSpeed < max) {
                        this.xCurrentSpeed = this.xCurrentSpeed + x * this.accelRatio;
                    }
                } else {
                    max = -Math.abs(x * this.maxSpeedFactor);
                    if (this.xCurrentSpeed > max) {
                        this.xCurrentSpeed = this.xCurrentSpeed + x * this.accelRatio;
                    }
                }
                return this.xCurrentSpeed;
            }

            /***
             * Shake X - random displacement  
             */

            if (this.kind === "shake") {
                if (this.cycleX) {
                    this.cycleX = false;
                    return -Math.abs(this._shake(x));
                } else {
                    this.cycleX = true;
                    return this._shake(x);
                }
            }

            /***
             * Vertical Shake X - random displacement  
             */

            if (this.kind === "shake-vertical") {
                return 0;
            }
        }
    }, {
        key: "computeY",
        value: function computeY(y) {
            /***
             * Default Vector Y displacement y + value 
             */
            if (this.kind === "default") {
                return y;
            }

            /***
             * Linear Acceleration Y
             */

            if (this.kind === "accel") {
                if (y.positivity() !== this.prevYSpeed.positivity()) {
                    this.yCurrentSpeed = 0;
                }
                this.prevYSpeed = y;
                var max = void 0;
                if (y.positivity() === "positive") {
                    max = y * this.maxSpeedFactor;
                    if (this.yCurrentSpeed < max) {
                        this.yCurrentSpeed = this.yCurrentSpeed + y * this.accelRatio;
                    }
                } else {
                    max = -Math.abs(y * this.maxSpeedFactor);
                    if (this.yCurrentSpeed > max) {
                        this.yCurrentSpeed = this.yCurrentSpeed + y * this.accelRatio;
                    }
                }
                return this.yCurrentSpeed;
            }

            /***
             * Shake Y - random displacement  
             */

            if (this.kind === "shake") {
                if (this.cycleY) {
                    this.cycleY = false;
                    return this._shake(y);
                } else {
                    this.cycleY = true;
                    return -Math.abs(this._shake(y));
                }
            }

            /***
             * Vertical Shake Y - random displacement  
             */

            if (this.kind === "shake-vertical") {
                if (this.cycleY) {
                    this.cycleY = false;
                    return this._shake(y);
                } else {
                    this.cycleY = true;
                    return -Math.abs(this._shake(y));
                }
            }
        }

        /**
         * Complementary Methods
         */

    }, {
        key: "_shake",
        value: function _shake() {
            var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;

            return Math.floor(Math.random() * max) + 1;
        }
    }]);

    return Action;
}();
/******
 * CYL - Mouse Action Sprite
 * Copyright MIT license 2017
 */

var MouseAction = function () {
    function MouseAction() {
        var kind = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "default";

        _classCallCheck(this, MouseAction);

        //Param Validation
        if (kind === "default") {
            console.warn("CYL:Warning, Initializing Mouse Action with default parameter");
        }
        this.kind = kind;
        this.movementRate = 10;
        //Click Move Props
        this.originX = 0;
        this.originY = 0;

        this.targetX = 0;
        this.targetY = 0;

        this.reachedTargetX = false;
        this.reachedTargetY = false;
    }

    _createClass(MouseAction, [{
        key: "computeX",
        value: function computeX(x, currentX, frame) {
            /***
             * Default X Click Render Pos 
             */
            if (this.kind === "default") {
                return x;
            }

            /***
             * Click Move Vector X 
             */
            if (this.kind === "click-move") {
                if (currentX.between(x - frame.width / 2, x + frame.width / 2)) {
                    this.reachedTargetX = true;
                    return currentX;
                }
                return currentX.getCloseTo(x, this.movementRate);
            }

            /***
             * Click Move X Vector X Only
             */
            if (this.kind === "click-move-x") {
                this.targetX = x;
                this.originX = currentX;
                if (currentX.between(x - frame.width / 2, x + frame.width / 2)) {
                    this.reachedTargetX = true;
                    return currentX;
                }
                return currentX.getCloseTo(x, this.movementRate);
            }

            /***
             * Click Move X Vector Y Only
             */
            if (this.kind === "click-move-y") {
                return currentX;
            }
        }
    }, {
        key: "computeY",
        value: function computeY(y, currentY, frame) {
            /***
             * Default Y  Click Render Pos 
             */
            if (this.kind === "default") {
                return y;
            }

            /***
             * Click Move Vector Y 
             */

            if (this.kind === "click-move") {
                if (currentY.between(y - frame.height / 2, y + frame.height / 2)) {
                    this.reachedTargetY = true;
                    return currentY;
                }
                return currentY.getCloseTo(y, this.movementRate);
            }

            /***
             * Click Move Vector Y - X Only 
             */

            if (this.kind === "click-move-x") {
                return currentY;
            }

            /***
             * Click Move Vector Y - Y Only
             */

            if (this.kind === "click-move-y") {
                if (currentY.between(y - frame.height / 2, y + frame.height / 2)) {
                    this.reachedTargetY = true;
                    return currentY;
                }
                return currentY.getCloseTo(y, this.movementRate);
            }
        }
    }, {
        key: "shouldKeepUpdating",
        get: function get() {
            if (this.kind === "click-move-x" && this.reachedTargetX) {
                this.reachedTargetX = false;
                return false;
            }
            if (this.kind === "click-move-y" && this.reachedTargetY) {
                this.reachedTargetY = false;
                return false;
            }
            if (this.reachedTargetX && this.reachedTargetY) {
                this.reachedTargetX = false;
                this.reachedTargetY = false;
                return false;
            }
            return true;
        }
    }, {
        key: "vectorDirection",
        get: function get() {
            if (this.kind === "click-move-x") {
                if (this.originX < this.targetX) {
                    return true;
                } else {
                    return false;
                }
            }
            if (this.kind === "click-move-y") {
                if (this.originY < this.targetY) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }]);

    return MouseAction;
}();
/******
 * CYL - Class Input + Event Polyfills
 * Copyright MIT license 2017
 */

var Input = function () {
    function Input() {
        _classCallCheck(this, Input);

        this._registerKeyDown();
        this.events = 0;
    }

    _createClass(Input, [{
        key: "_registerKeyDown",
        value: function _registerKeyDown() {
            var _this = this;
            window.addEventListener("keydown", function (e) {
                return _this._filterKeyDown(e);
            });
            document.getElementById("game").addEventListener(this.clickForDevice, function (e) {
                return _this.click(null, e);
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
                if (CFG.DEVICE === "mobile") {
                    e.x = e.touches[0].clientX;
                    e.y = e.touches[0].clientY;
                }
                //e.x e.y coords polyfill
                var cords = {};
                cords.x = e.x - CFG.SCREEN.horizontalMargin;
                cords.y = e.y - CFG.SCREEN.verticalMargin;
                this.mouseAction(cords);
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
                this.arrowUp(null, true);
            }
            if (e.key === "ArrowDown" || e.code === "ArrowDown" || e.keyCode === 40) {
                this.arrowDown(null, true);
            }
            if (e.key === "ArrowLeft" || e.code === "ArrowLeft" || e.keyCode === 37) {
                this.arrowLeft(null, true);
            }
            if (e.key === "ArrowRight" || e.code === "ArrowRight" || e.keyCode === 39) {
                this.arrowRight(null, true);
            }
            //Escape + Space 
            if (e.key === " " || e.code === "Space" || e.keyCode === 32) {
                this.spaceBar(null, true);
            }
            if (e.key === "Escape" || e.code === "Escape" || e.keyCode === 27) {
                this.escape(null, true);
            }
            //Characters
            if (e.key === "a" || e.key === "A" || e.code === "KeyA" || e.keyCode === 65) {
                this.a(null, true);
            }
            if (e.key === "s" || e.key === "S" || e.code === "KeyS" || e.keyCode === 83) {
                this.s(null, true);
            }
            if (e.key === "d" || e.key === "D" || e.code === "KeyD" || e.keyCode === 68) {
                this.d(null, true);
            }
            if (e.key === "f" || e.key === "F" || e.code === "KeyF" || e.keyCode === 70) {
                this.f(null, true);
            }
            if (e.key === "p" || e.key === "P" || e.code === "KeyP" || e.keyCode === 80) {
                this.p(null, true);
            }
        }
    }, {
        key: "p",
        value: function p(keyAction, shouldRun) {
            if (keyAction) {
                this.pAction = keyAction;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.pAction === "function") {
                this.pAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "f",
        value: function f(keyAction, shouldRun) {
            if (keyAction) {
                this.fAction = keyAction;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.fAction === "function") {
                this.fAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "d",
        value: function d(keyAction, shouldRun) {
            if (keyAction) {
                this.dAction = keyAction;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.dAction === "function") {
                this.dAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "s",
        value: function s(keyAction, shouldRun) {
            if (keyAction) {
                this.sAction = keyAction;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.sAction === "function") {
                this.sAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "a",
        value: function a(keyAction, shouldRun) {
            if (keyAction) {
                this.aAction = keyAction;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.aAction === "function") {
                this.aAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "escape",
        value: function escape(keyAction, shouldRun) {
            if (keyAction) {
                this.escapeAction = keyAction;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.escapeAction === "function") {
                this.escapeAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "spaceBar",
        value: function spaceBar(keyAction, shouldRun) {
            if (keyAction) {
                this.spaceBarAction = keyAction;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.spaceBarAction === "function") {
                this.spaceBarAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "arrowUp",
        value: function arrowUp(keyAction, shouldRun) {
            if (keyAction) {
                this.arrowUpAction = keyAction;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.arrowUpAction === "function") {
                this.events++;
                this.arrowUpAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "arrowDown",
        value: function arrowDown(keyAction, shouldRun) {
            if (keyAction) {
                this.keyDownAction = keyAction;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.keyDownAction === "function") {
                this.events++;
                this.keyDownAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "arrowLeft",
        value: function arrowLeft(keyAction, shouldRun) {
            if (keyAction) {
                this.keyLeftAction = keyAction;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.keyLeftAction === "function") {
                this.keyLeftAction();
            } else {
                this._callBackTypeError();
            }
        }
    }, {
        key: "arrowRight",
        value: function arrowRight(keyAction, shouldRun) {
            if (keyAction) {
                this.keyRightAction = keyAction;
            }
            if (shouldRun === undefined) {
                return;
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
    }, {
        key: "clickForDevice",
        get: function get() {
            if (CFG.DEVICE === "desktop") {
                return "click";
            } else {
                return "touchstart";
            }
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
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var sprites = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

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
        this.name = name;
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
            var _this2 = this;

            this.screen.style.width = CFG.SCREEN.width;
            this.screen.style.height = CFG.SCREEN.height;
            this.canvas.width = this.screen.offsetWidth;
            this.canvas.height = this.screen.offsetHeight;

            window.addEventListener("resize", function () {
                _this2.screen.style.width = CFG.SCREEN.width;
                _this2.screen.style.height = CFG.SCREEN.height;
                _this2.canvas.width = _this2.screen.offsetWidth;
                _this2.canvas.height = _this2.screen.offsetHeight;
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
            this.ctx.fillRect(pixel.x + x, pixel.y + y, CFG.PIXELSIZE, CFG.PIXELSIZE);
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
        key: "addSprite",
        value: function addSprite(sprite) {
            this.sprites.push(sprite);
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
        //Sprite Actions 
        this.action = null;
        this.constantUpdateInterval = ";)";
        this.actionStoppedCB = null;
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
                relativeX = relativeX + CFG.PIXELSIZE;
                if ((i + 1) % this.width === 0) {
                    relativeY = relativeY + CFG.PIXELSIZE;
                    relativeX = 0;
                }
            }
            this.spriteFrames.push(frame);
        }
    }, {
        key: "inCollisionWith",
        value: function inCollisionWith(sprite) {
            var xContact = false;
            var yContact = false;
            if (this.bounds.maxX.between(sprite.bounds.minX, sprite.bounds.maxX) || this.bounds.minX.between(sprite.bounds.minX, sprite.bounds.maxX)) {
                xContact = true;
            }
            if (this.bounds.maxY.between(sprite.bounds.minY, sprite.bounds.maxY) || this.bounds.minY.between(sprite.bounds.minY, sprite.bounds.maxY)) {
                yContact = true;
            }
            if (xContact === true && yContact === true) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "updatePos",
        value: function updatePos(x, y) {
            this.x = x;
            this.y = y;
        }

        /**
         * Action Methods 
         */

    }, {
        key: "actionWithVector",
        value: function actionWithVector(x, y) {
            this.x = this.action.computeX(x) + this.x;
            this.y = this.action.computeY(y) + this.y;
        }
    }, {
        key: "mouseActionWithClick",
        value: function mouseActionWithClick(x, y, frame) {
            this.x = this.mouseAction.computeX(x - this.frame.width / 2, this.x, this.frame);
            this.y = this.mouseAction.computeY(y - this.frame.height / 2, this.y, this.frame);
            this.actionIsRunning(null, true);

            if (!this.mouseAction.shouldKeepUpdating) {
                clearInterval(this.constantUpdateInterval);
                this.actionDidStop(null, true);
            }
        }
    }, {
        key: "mouseActionUpdate",
        value: function mouseActionUpdate(e) {
            clearInterval(this.constantUpdateInterval);
            this.actionDidStart(null, true);
            var _this = this;
            this.constantUpdateInterval = setInterval(function () {
                _this.mouseActionWithClick(e.x, e.y);
            }, 40);
        }
    }, {
        key: "actionDidStop",
        value: function actionDidStop(cb, shouldRun) {
            if (cb) {
                this.actionStoppedCB = cb;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.actionStoppedCB === "function") {
                this.actionStoppedCB();
            }
        }
    }, {
        key: "actionDidStart",
        value: function actionDidStart(cb, shouldRun) {
            if (cb) {
                this.actionStartCB = cb;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.actionStartCB === "function") {
                this.actionStartCB();
            }
        }
    }, {
        key: "actionIsRunning",
        value: function actionIsRunning(cb, shouldRun) {
            if (cb) {
                this.actionIsRunning = cb;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.actionIsRunning === "function") {
                this.actionIsRunning();
            }
        }
    }, {
        key: "setAction",
        value: function setAction(action) {
            this.action = action;
        }
    }, {
        key: "setMouseAction",
        value: function setMouseAction(action) {
            this.mouseAction = action;
        }
    }, {
        key: "onClick",
        value: function onClick(e, cb) {
            if (cb !== undefined && typeof cb === "function" && this._isClickTarget(e)) {
                cb();
            }
        }
    }, {
        key: "_isClickTarget",
        value: function _isClickTarget(e) {
            //Touch between x,y range
            if (e.x.between(this.x, this.x + this.frame.width) && e.y.between(this.y, this.y + this.frame.height)) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "_callBackTypeError",
        value: function _callBackTypeError() {
            console.warn("CYL: action cb requires a function");
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
        key: "frame",
        get: function get() {
            return {
                "width": parseInt(this.renderedX.max() - this.renderedX.min()),
                "height": parseInt(this.renderedY.max() - this.renderedY.min())
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
        key: "inCollisionWith",
        value: function inCollisionWith(sprite) {
            var xContact = false;
            var yContact = false;
            if (this.bounds.maxX.between(sprite.bounds.minX, sprite.bounds.maxX) || this.bounds.minX.between(sprite.bounds.minX, sprite.bounds.maxX)) {
                xContact = true;
            }
            if (this.bounds.maxY.between(sprite.bounds.minY, sprite.bounds.maxY) || this.bounds.minY.between(sprite.bounds.minY, sprite.bounds.maxY)) {
                yContact = true;
            }
            if (xContact === true && yContact === true) {
                return true;
            } else {
                return false;
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
        key: "updatePos",
        value: function updatePos(x, y) {
            this.x = x;
            this.y = y;
        }

        /**
         * Action Methods 
         */

    }, {
        key: "actionWithVector",
        value: function actionWithVector(x, y) {
            this.x = this.action.computeX(x) + this.x;
            this.y = this.action.computeY(y) + this.y;
        }
    }, {
        key: "mouseActionWithClick",
        value: function mouseActionWithClick(x, y, frame) {
            this.x = this.mouseAction.computeX(x - this.frame.width / 2, this.x, this.frame);
            this.y = this.mouseAction.computeY(y - this.frame.height / 2, this.y, this.frame);
            this.actionIsRunning(null, true);

            if (!this.mouseAction.shouldKeepUpdating) {
                clearInterval(this.constantUpdateInterval);
                this.actionDidStop(null, true);
            }
        }
    }, {
        key: "mouseActionUpdate",
        value: function mouseActionUpdate(e) {
            clearInterval(this.constantUpdateInterval);
            this.actionDidStart(null, true);
            var _this = this;
            this.constantUpdateInterval = setInterval(function () {
                _this.mouseActionWithClick(e.x, e.y);
            }, 40);
        }
    }, {
        key: "actionDidStop",
        value: function actionDidStop(cb, shouldRun) {
            if (cb) {
                this.actionStoppedCB = cb;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.actionStoppedCB === "function") {
                this.actionStoppedCB();
            }
        }
    }, {
        key: "actionDidStart",
        value: function actionDidStart(cb, shouldRun) {
            if (cb) {
                this.actionStartCB = cb;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.actionStartCB === "function") {
                this.actionStartCB();
            }
        }
    }, {
        key: "actionIsRunning",
        value: function actionIsRunning(cb, shouldRun) {
            if (cb) {
                this.actionIsRunning = cb;
            }
            if (shouldRun === undefined) {
                return;
            }
            if (typeof this.actionIsRunning === "function") {
                this.actionIsRunning();
            }
        }
    }, {
        key: "setAction",
        value: function setAction(action) {
            this.action = action;
        }
    }, {
        key: "setMouseAction",
        value: function setMouseAction(action) {
            this.mouseAction = action;
        }
    }, {
        key: "onClick",
        value: function onClick(e, cb) {
            if (cb !== undefined && typeof cb === "function" && this._isClickTarget(e)) {
                cb();
            }
        }
    }, {
        key: "_isClickTarget",
        value: function _isClickTarget(e) {
            //Touch between x,y range
            if (e.x.between(this.x, this.x + this.frame.width) && e.y.between(this.y, this.y + this.frame.height)) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "_callBackTypeError",
        value: function _callBackTypeError() {
            console.warn("CYL: action cb requires a function");
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
        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "medium";
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
        this.fontSize = size;
        this.weight = weight;
        this.color = color;
        //Container properties
        this.width;
        this.x = x;
        this.y = y;
    }

    _createClass(LabelSprite, [{
        key: "onClick",
        value: function onClick(e, cb) {
            if (cb !== undefined && typeof cb === "function" && this._isClickTarget(e)) {
                cb();
            }
        }
    }, {
        key: "_isClickTarget",
        value: function _isClickTarget(e) {
            //Touch between x,y range
            if (e.x.between(this.x, this.x + this.frame.width) && e.y.between(this.y - this.frame.height, this.y)) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "updatePos",
        value: function updatePos(x, y) {
            this.x = x;
            this.y = y;
        }
    }, {
        key: "size",
        get: function get() {
            if (this.fontSize === "small" || this.fontSize === "medium" || this.fontSize === "large") {
                return CFG.FONTSIZE(this.fontSize);
            } else {
                return this.fontSize + "px";
            }
        }
    }, {
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
        var focusColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "#6A1B9A";
        var defaultColor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "white";
        var focusZoom = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1.5;
        var x = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 10;
        var y = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 10;

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
                    this.labels[i].color = this.focusColor;
                } else {
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
        key: "updatePos",
        value: function updatePos(x, y) {
            this.x = x;
            this.y = y;
            this._placeGrid();
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
 * CYL - Pattern
 * Copyright MIT license 2017
 */

var Pattern = function () {
    function Pattern(scene, applyFor) {
        var xMovement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var yMovement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var xProgression = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        var yProgression = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

        _classCallCheck(this, Pattern);

        if (xMovement === undefined || yMovement === undefined) {
            console.warn("CYL:[Warning] X and Y displacemente where set to default of 0");
        }
        if (xProgression === undefined || yProgression === undefined) {
            console.warn("CYL:[Warning] X and Y displacemente where set to default of 0");
        }
        this.scene = scene;
        this.xMovement = xMovement;
        this.yMovement = yMovement;
        this.xProgression = 0;
        this.yProgression = 0;
        this.xMax = 0;
        this.yMax = 0;
        this.cycle = true;
        this.applyFor = applyFor;

        if (this.update === undefined) {
            console.error("CYL:[Exception]Pattern requires a update method to initialize");
        }
    }

    /**
     * Extends requires Update() Method
     */

    _createClass(Pattern, [{
        key: "pos",
        get: function get() {
            return {
                "x": this.xMovement,
                "y": this.yMovement
            };
        }
    }]);

    return Pattern;
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
        if (scenes.length === 0) {
            console.warn("CYL:Default initial scene with index 0 is being loaded");
        }
        //Props
        this.scenes = scenes;
        this.active = active;
        this.shouldUpdate = true;
        this.patterns = [];
        this.onUpdateCb = null;
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
        key: "setActiveSceneNamed",
        value: function setActiveSceneNamed(name) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.scenes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var scene = _step2.value;

                    if (scene.name === name) {
                        this.activeScene = scene;
                    }
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
        key: "getSceneNamed",
        value: function getSceneNamed(name) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.scenes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var scene = _step3.value;

                    if (scene.name === name) {
                        return scene;
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
        key: "run",
        value: function run() {
            if (this.shouldUpdate) {
                this.updatePatterns();
                this.activeScene.update();
                if (this.onUpdateCb !== null) {
                    this.onUpdateCb();
                }
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
        key: "onUpdate",
        value: function onUpdate(cb) {
            if (typeof cb !== "function") {
                console.error("CYL:[Exception] contact methods must be a function");
            }
            this.onUpdateCb = cb;
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
        key: "spritesWithKind",
        value: function spritesWithKind(kind) {
            return this.activeScene.sprites.filter(function (sprite) {
                return sprite.kind === kind;
            });
        }
    }, {
        key: "removeSprite",
        value: function removeSprite(sprite) {
            for (var i = 0; i < this.activeScene.sprites.length; i++) {
                if (this.activeScene.sprites[i] === sprite) {
                    this.activeScene.sprites.removeIndex(i);
                }
            }
        }
    }, {
        key: "removeSpritesNamed",
        value: function removeSpritesNamed(name) {
            for (var i = 0; i < this.activeScene.sprites.length; i++) {
                if (this.activeScene.sprites[i].name === sprite.name) {
                    this.activeScene.sprites.removeIndex(i);
                }
            }
        }
    }, {
        key: "removeSpriteIndex",
        value: function removeSpriteIndex(i) {
            this.activeScene.sprites.removeIndex(i);
        }
    }, {
        key: "addPatternToScene",
        value: function addPatternToScene(pattern, scene) {
            var p = {
                "pattern": pattern,
                "scene": scene
            };
            this.patterns.push(p);
        }
    }, {
        key: "updatePatterns",
        value: function updatePatterns() {
            for (var i = 0; i < this.patterns.length; i++) {
                if (this.patterns[i].pattern.scene === this.activeScene.name) {
                    this.patterns[i].pattern.update();
                    var applyFor = this.patterns[i].pattern.applyFor;
                    for (var j = 0; j < this.spritesNamed(applyFor).length; j++) {
                        this.spritesNamed(applyFor)[j].x = this.spritesNamed(applyFor)[j].x + this.patterns[i].pattern.pos.x;
                        this.spritesNamed(applyFor)[j].y = this.spritesNamed(applyFor)[j].y + this.patterns[i].pattern.pos.y;
                    }
                }
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
    }, {
        key: "numberOfActiveSprites",
        get: function get() {
            return this.activeScene.sprites.length;
        }
    }]);

    return Game;
}();
// 1 - Initialize Sprites

var invShape = {};
var bulletShape = {};
var c = {
    t: "transparent",
    p: "#6A1B9A",
    o: "#FF9800",
    r: "#FF5722"
};

bulletShape.frame1 = {
    "set": "idle",
    "shape": [c.r, c.o, c.r]
};

bulletShape.frame2 = {
    "set": "idle",
    "shape": [c.o, c.r, c.o]
};

invShape.idle1 = {
    "set": "idle",
    "shape": [c.t, c.p, c.t, c.t, c.t, c.t, c.p, c.t, c.t, c.t, c.p, c.t, c.t, c.p, c.t, c.t, c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.t, c.p, c.p, c.t, c.p, c.p, c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.t, c.p, c.p, c.p, c.p, c.t, c.p, c.p, c.t, c.p, c.t, c.t, c.p, c.t, c.p]
};

invShape.idle2 = {
    "set": "idle",
    "shape": [c.p, c.p, c.t, c.t, c.t, c.t, c.p, c.p, c.t, c.t, c.p, c.t, c.t, c.p, c.t, c.t, c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.t, c.p, c.p, c.t, c.p, c.p, c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.t, c.t, c.t, c.t, c.t, c.t, c.p, c.p, c.p, c.p, c.t, c.t, c.p, c.p, c.p]
};

invShape.moving1 = {
    "set": "moving",
    "shape": [c.p, c.t, c.t, c.t, c.t, c.t, c.t, c.p, c.t, c.p, c.t, c.t, c.t, c.t, c.p, c.t, c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.t, c.p, c.p, c.o, c.p, c.p, c.o, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.t, c.p, c.p, c.p, c.p, c.t, c.p, c.p, c.t, c.p, c.t, c.t, c.p, c.t, c.p]
};

invShape.moving2 = {
    "set": "moving",
    "shape": [c.p, c.p, c.t, c.t, c.t, c.t, c.p, c.p, c.t, c.t, c.p, c.t, c.t, c.p, c.t, c.t, c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.t, c.p, c.p, c.o, c.p, c.p, c.o, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.o, c.o, c.o, c.o, c.o, c.o, c.p, c.p, c.p, c.p, c.t, c.t, c.p, c.p, c.p]
};

var pShape = {};

pShape.idle1 = {
    "set": "idle",
    "shape": [c.t, c.t, c.t, c.t, c.o, c.t, c.t, c.t, c.t, c.t, c.o, c.o, c.o, c.t, c.t, c.t, c.o, c.o, c.o, c.o, c.o]
};

pShape.idle2 = {
    "set": "idle",
    "shape": [c.t, c.t, c.o, c.t, c.t, c.t, c.t, c.t, c.o, c.o, c.o, c.t, c.t, c.t, c.o, c.o, c.o, c.o, c.o, c.t, c.t]
};

pShape.mLeft1 = {
    "set": "moving-left",
    "shape": [c.t, c.t, c.o, c.t, c.t, c.t, c.t, c.t, c.o, c.o, c.o, c.t, c.r, c.t, c.o, c.o, c.o, c.o, c.o, c.t, c.r]
};

pShape.mLeft2 = {
    "set": "moving-left",
    "shape": [c.t, c.t, c.o, c.t, c.t, c.t, c.t, c.t, c.o, c.o, c.o, c.r, c.t, c.r, c.o, c.o, c.o, c.o, c.o, c.r, c.t]
};

pShape.mRight1 = {
    "set": "moving-right",
    "shape": [c.t, c.t, c.t, c.t, c.o, c.t, c.t, c.r, c.t, c.r, c.o, c.o, c.o, c.t, c.t, c.r, c.o, c.o, c.o, c.o, c.o]
};

pShape.mRight2 = {
    "set": "moving-right",
    "shape": [c.t, c.t, c.t, c.t, c.o, c.t, c.t, c.t, c.r, c.t, c.o, c.o, c.o, c.t, c.r, c.t, c.o, c.o, c.o, c.o, c.o]
};
/******
 * CYL ES6 Game Dev Tools 
 * Copyright MIT license 2017
 */

//Lib Concatenation
//@prepros-prepend ./lib/utils.js
//@prepros-prepend ./lib/config.js
//@prepros-prepend ./lib/action.js
//@prepros-prepend ./lib/mouse-action.js
//@prepros-prepend ./lib/input.js
//@prepros-prepend ./lib/scene.js
//@prepros-prepend ./lib/shape-sprite.js
//@prepros-prepend ./lib/bitmap-sprite.js
//@prepros-prepend ./lib/label-sprite.js
//@prepros-prepend ./lib/dialogue.js
//@prepros-prepend ./lib/pattern.js
//@prepros-prepend ./lib/game.js
//@prepros-prepend ./sprites.js

/***
 __      _____| |__   (_)_ ____   ____ _  __| | ___ _ __ ___ 
 \ \ /\ / / _ \ '_ \  | | '_ \ \ / / _` |/ _` |/ _ \ '__/ __|
  \ V  V /  __/ |_) | | | | | \ V / (_| | (_| |  __/ |  \__ \
   \_/\_/ \___|_.__/  |_|_| |_|\_/ \__,_|\__,_|\___|_|  |___/ 
   -----
   Sample Game:
*/

CFG.setScreen("fixed", [375, 667]);

var bg1 = {
    "set": "idle",
    "src": "assets/bg-menu.jpg"
};

var bg2 = {
    "set": "idle",
    "src": "assets/bg-level.jpg"
};

var bgMenu = new BitmapSprite("bg", [bg1], 375, 667);
var bgLevel = new BitmapSprite("bg", [bg2], 375, 667);
var invader = new ShapeSprite("invader", [invShape.idle1, invShape.idle2, invShape.moving1, invShape.moving2], 8, 15);
var player = new ShapeSprite("player", [pShape.idle1, pShape.idle2, pShape.mLeft1, pShape.mLeft2, pShape.mRight1, pShape.mRight2], 7, 12);
var notice = new LabelSprite("CYL:Game Development Tools 2017", "small");
var title = new LabelSprite("WEB INVADERS", "large");
var start = new LabelSprite("Start", "medium");
var topScores = new LabelSprite("Top Scores", "medium");
var dialogue = new Dialogue([start, topScores]);
var menu = new Scene("menu", [bgMenu, invader, notice, title, dialogue, player]);
var level = new Scene("level", [bgLevel, notice, player]);
var game = new Game([menu, level]);
game.run();

// 2 - Set up scene
// Menu
notice.y = menu.frame.height - 50;
notice.x = menu.frame.width / 2 - notice.frame.width / 2;
title.y = menu.frame.height / 2;
title.x = menu.frame.width / 2 - title.frame.width / 2;
invader.y = menu.frame.height / 2 - invader.frame.height;
invader.x = title.x - invader.frame.width - 20;
player.x = menu.frame.width / 2 - player.frame.width / 2;
player.y = menu.frame.height - 150;
dialogue.updatePos(title.x, menu.frame.height / 2);
// Level
function placeInvadersWith(level) {
    var xOffset = level.frame.width / 4;
    var yOffset = level.frame.height / 6;

    var yRow = 0;
    var xRow = 0;
    for (var i = 0; i < 4; i++) {
        var _invader = new ShapeSprite("invader", [invShape.idle1, invShape.idle2, invShape.moving1, invShape.moving2], 8, 15);
        _invader.x = xOffset * i;
        if (i === 4 || i === 8) {
            yRow++;
            xRow = 40;
        }
        _invader.x = xOffset * xRow + 40;
        _invader.y = yOffset * yRow;
        xRow++;
        game.getSceneNamed("level").addSprite(_invader);
    }
}

// setInterval(()=>{
//     if(game.activeScene.name === "level"){
//         placeInvadersWith(level);
//     }
// },1500);

var waveDelay = 1500;

function newInvaderWave() {
    if (game.activeScene.name === "level") {
        placeInvadersWith(level);
    }
    setTimeout(newInvaderWave, waveDelay);
}

newInvaderWave();

var InvaderPattern = function (_Pattern) {
    _inherits(InvaderPattern, _Pattern);

    function InvaderPattern() {
        _classCallCheck(this, InvaderPattern);

        return _possibleConstructorReturn(this, (InvaderPattern.__proto__ || Object.getPrototypeOf(InvaderPattern)).apply(this, arguments));
    }

    _createClass(InvaderPattern, [{
        key: "update",
        value: function update() {
            if (this.cycle) {
                this.xMovement = Math.abs(this.xMovement);
                this.xProgression = this.xProgression + this.xMovement;
                //this.yMovement = 0;
                if (this.xProgression > this.xMax) {
                    //this.yMovement = 0;
                    this.cycle = false;
                }
            } else {
                this.xMovement = -Math.abs(this.xMovement);
                //this.yMovement = 0;
                this.xProgression = this.xProgression + this.xMovement;
                if (this.xProgression < 0) {
                    //this.yMovement = 50;
                    this.cycle = true;
                }
            }
        }
    }]);

    return InvaderPattern;
}(Pattern);

var invaderPattern = new InvaderPattern("level", "invader", 3, 1);
invaderPattern.xMax = 80;
game.addPatternToScene(invaderPattern);

//3- Set Input  + Actions
var input = new Input();
var action = new Action("shake");
var mAction = new MouseAction("click-move");
var pMAction = new MouseAction("click-move-x");
invader.setAction(action);
invader.setMouseAction(mAction);
player.setMouseAction(pMAction);

input.arrowLeft(function () {
    invader.actionWithVector();
});

input.arrowRight(function () {
    invader.actionWithVector();
});

input.arrowUp(function () {
    invader.actionWithVector();
    dialogue.focusUp();
});

input.arrowDown(function () {
    dialogue.focusDown();
    invader.actionWithVector();
});

input.spaceBar(function () {
    if (dialogue.focusIndex === 0) {
        //game start
        game.setActiveSceneNamed("level");
    }
    if (dialogue.focusIndex === 1) {
        //show top scores
        alert("Not yet implemented ;)");
    }
});

input.escape(function () {
    game.setActiveSceneNamed("menu");
});

input.click(function (e) {
    if (game.activeScene.name === "menu") {
        invader.mouseActionUpdate(e);
        start.onClick(e, function () {
            game.setActiveSceneNamed("level");
        });
        topScores.onClick(e, function () {
            alert("Not yet implemented ;)");
        });
    }

    if (game.activeScene.name === "level") {
        shoot();
    }

    player.mouseActionUpdate(e);
});

invader.actionDidStart(function () {
    invader.setAnimation("moving");
});

invader.actionDidStop(function () {
    invader.setAnimation("idle");
});

player.actionIsRunning(function () {
    if (player.mouseAction.vectorDirection) {
        player.setAnimation("moving-right");
    } else {
        player.setAnimation("moving-left");
    }
});

player.actionDidStop(function () {
    player.setAnimation("idle");
});

var BulletPattern = function (_Pattern2) {
    _inherits(BulletPattern, _Pattern2);

    function BulletPattern() {
        _classCallCheck(this, BulletPattern);

        return _possibleConstructorReturn(this, (BulletPattern.__proto__ || Object.getPrototypeOf(BulletPattern)).apply(this, arguments));
    }

    _createClass(BulletPattern, [{
        key: "update",
        value: function update() {}
    }]);

    return BulletPattern;
}(Pattern);

var bulletPattern = new BulletPattern("level", "bullet", 0, -4);
game.addPatternToScene(bulletPattern);

function shoot() {
    var bullet = new ShapeSprite("bullet", [bulletShape.frame1, bulletShape.frame2], 1, 4);
    var p = game.spriteNamed("player");
    bullet.x = p.x;
    bullet.y = p.y;
    game.getSceneNamed("level").addSprite(bullet);
}

game.onUpdate(function () {
    try {
        if (game.activeScene.name === "level") {
            for (var i = 0; i < this.spritesNamed("bullet").length; i++) {
                for (var j = 0; j < this.spritesNamed("invader").length; j++) {
                    if (this.spritesNamed("bullet")[i].inCollisionWith(this.spritesNamed("invader")[j])) {
                        this.removeSprite(this.spritesNamed("invader")[j]);
                        this.removeSprite(this.spritesNamed("bullet")[i]);
                    }
                }
                if (this.spritesNamed("bullet")[i].y < 0) {
                    this.removeSprite(this.spritesNamed("bullet")[i]);
                }
            }
        }
    } catch (e) {
        //out of index, but whatevs
    }
});
//# sourceMappingURL=cyl.build.js.map