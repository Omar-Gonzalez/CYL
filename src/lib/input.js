/******
 * CYL - Class Input + Event Polyfills
 * Copyright MIT license 2017
 */

class Input {
    constructor() {
        this._registerKeyDown();
        this.events = 0;
    }

    get clickForDevice() {
        if (DEVICE() === "desktop") {
            return "click";
        } else {
            return "touchstart";
        }
    }

    _registerKeyDown() {
        let _this = this;
        window.addEventListener("keydown", function(e) {
            return _this._filterKeyDown(e);
        });
        document.getElementById('game').addEventListener(this.clickForDevice, function(e) {
            return _this.click(null, e);
        });
    }

    click(action, e) {
        /**
         * Mouse - Touchpad Event  
         */
        if (action) {
            this.mouseAction = action;
        }
        if (typeof this.mouseAction === "function" && e !== undefined) {
            if (DEVICE() === "mobile") {
                e.x = e.touches[0].clientX;
                e.y = e.touches[0].clientY;
            }
            this.mouseAction(e);
        } else {
            console.warn("CYL: Click action must be a function");
        }
    }

    _filterKeyDown(e) {
        /**
         * KeyDown Event Polyfill 
         */
        //Arrow Keys
        if (e.key === "ArrowUp" || e.code === "ArrowUp" ||
            e.keyCode === 38) {
            this.arrowUp(null, true);
        }
        if (e.key === "ArrowDown" || e.code === "ArrowDown" ||
            e.keyCode === 40) {
            this.arrowDown(null, true);
        }
        if (e.key === "ArrowLeft" || e.code === "ArrowLeft" ||
            e.keyCode === 37) {
            this.arrowLeft(null, true);
        }
        if (e.key === "ArrowRight" || e.code === "ArrowRight" ||
            e.keyCode === 39) {
            this.arrowRight(null, true);
        }
        //Escape + Space 
        if (e.key === " " || e.code === "Space" ||
            e.keyCode === 32) {
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

    p(keyAction, shouldRun) {
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

    f(keyAction, shouldRun) {
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

    d(keyAction, shouldRun) {
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

    s(keyAction, shouldRun) {
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

    a(keyAction, shouldRun) {
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

    escape(keyAction, shouldRun) {
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

    spaceBar(keyAction, shouldRun) {
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

    arrowUp(keyAction, shouldRun) {
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

    arrowDown(keyAction, shouldRun) {
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

    arrowLeft(keyAction, shouldRun) {
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

    arrowRight(keyAction, shouldRun) {
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

    _callBackTypeError() {
        console.warn("CYL: Input action requires a function");
    }
}