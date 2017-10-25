/******
 * Crayola - Utilities
 * Copyright MIT license 2017
 */

/**
 * Custom Document Ready Credits to : jfriend00 - https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t
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
    }
})("docReady", window);

//Array Prototype Min - Max, credits to Chaospandion - https://stackoverflow.com/questions/1669190/find-the-min-max-element-of-an-array-in-javascript

Array.prototype.min = function(evaluate) {

    if (this.length === 0) return null;
    if (this.length === 1) return this[0];

    evaluate = (evaluate || Math.min);

    var v = this[0];
    for (var i = 1; i < this.length; i++) {
        v = evaluate(this[i], v);
    }

    return v;
}

Array.prototype.max = function(evaluate) {

    if (this.length === 0) return null;
    if (this.length === 1) return this[0];

    evaluate = (evaluate || Math.max);

    var v = this[0];
    for (var i = 1; i < this.length; i++) {
        v = evaluate(this[i], v);
    }

    return v;
}

//Number Range Prototype - credits to jbabey - https://stackoverflow.com/questions/12806304/shortest-code-to-check-if-a-number-is-in-a-range-in-javascript

Number.prototype.between = function (min, max) {
    return this > min && this < max;
}