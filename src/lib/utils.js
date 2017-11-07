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

(function() {
    let consider = " - Please consider getting a recent version of Firefox, Chrome or Safari";
    if (!(window.console.error && window.console.warn)) {
        alert("Your browser doesn't suppor the console.error and console.warn debug tools" + consider);
        console.error("Your browser doesn't suppor the console.error and console.warn debug tools" + consider);
    }
    let canvasSupport = !!window.CanvasRenderingContext2D;
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
}());

console.log(requestAnimationFrame);

/**
 * Custom Document Ready 
 */
(function(funcName, baseObj) {
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

    baseObj[funcName] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }

        if (readyFired) {
            setTimeout(function() {
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

Array.prototype.min = function(evaluate) {

    if (this.length === 0) return null;
    if (this.length === 1) return this[0];

    evaluate = (evaluate || Math.min);

    var v = this[0];
    for (var i = 1; i < this.length; i++) {
        v = evaluate(this[i], v);
    }

    return v;
};

//Number Prototype Utility Methods

Array.prototype.max = function(evaluate) {

    if (this.length === 0) return null;
    if (this.length === 1) return this[0];

    evaluate = (evaluate || Math.max);

    var v = this[0];
    for (var i = 1; i < this.length; i++) {
        v = evaluate(this[i], v);
    }

    return v;
};

Number.prototype.between = function(min, max) {
    return this > min && this < max;
};

Number.prototype.positivity = function() {
    if (this > 0) {
        return "positive";
    } else {
        return "negative";
    }
};

Number.prototype.getCloseTo = function(n, rate) {
    if (this < n) {
        return this + rate;
    } else {
        return this - rate;
    }
};