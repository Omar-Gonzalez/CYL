/******
 * CYL - Class Input + Event Polyfills
 * Copyright MIT license 2017
 */

class Input {
    constructor() {
        this._registerKeyDown();
    }

    _registerKeyDown() {
        let self = this;
        window.addEventListener("keydown", function(e) {
            return self._filterKeyDown(e)
        });
        window.addEventListener("click", function(e) {
            return self.click(null,e);
        });
    }

    click(action,e) {
        /**
         * Mouse - Touchpad Event  
         */
        if (action){
            this.mouseAction = action
        }
        if(typeof this.mouseAction === "function" && e !== undefined){
            this.mouseAction(e);
        }else{
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
            this.arrowUp();
        }
        if (e.key === "ArrowDown" || e.code === "ArrowDown" || 
            e.keyCode === 40) {
            this.arrowDown();
        }
        if (e.key === "ArrowLeft" || e.code === "ArrowLeft" || 
            e.keyCode === 37) {
            this.arrowLeft();
        }
        if (e.key === "ArrowRight" || e.code === "ArrowRight" || 
            e.keyCode === 39) {
            this.arrowRight();
        }
        //Escape + Space 
        if (e.key === " " || e.code === "Space" || 
            e.keyCode === 32) {
            this.spaceBar();
        }
        if (e.key === "Escape" || e.code === "Escape" || e.keyCode === 27) {
            this.escape();
        }
        //Characters
        if (e.key === "a" || e.key === "A" || 
            e.code === "KeyA" || e.keyCode === 65) {
            this.a();
        }
        if (e.key === "s" || e.key === "S" || 
            e.code === "KeyS" || e.keyCode === 83) {
            this.s();
        }
        if (e.key === "d" || e.key === "D" || 
            e.code === "KeyD" || e.keyCode === 68) {
            this.d();
        }
        if (e.key === "f" || e.key === "F" || 
            e.code === "KeyF" || e.keyCode === 70) {
            this.f();
        }
        if (e.key === "p" || e.key === "P" || 
            e.code === "KeyP" || e.keyCode === 80) {
            this.p();
        }
    }

    p(keyAction) {
        if (keyAction) {
            this.pAction = keyAction;
        }
        if (typeof this.pAction === "function") {
            this.pAction();
        } else {
            this._callBackTypeError()
        }
    }

    f(keyAction) {
        if (keyAction) {
            this.fAction = keyAction;
        }
        if (typeof this.fAction === "function") {
            this.fAction();
        } else {
            this._callBackTypeError()
        }
    }

    d(keyAction) {
        if (keyAction) {
            this.dAction = keyAction;
        }
        if (typeof this.dAction === "function") {
            this.dAction();
        } else {
            this._callBackTypeError()
        }
    }

    s(keyAction) {
        if (keyAction) {
            this.sAction = keyAction;
        }
        if (typeof this.sAction === "function") {
            this.sAction();
        } else {
            this._callBackTypeError()
        }
    }

    a(keyAction) {
        if (keyAction) {
            this.aAction = keyAction;
        }
        if (typeof this.aAction === "function") {
            this.aAction();
        } else {
            this._callBackTypeError()
        }
    }

    escape(keyAction) {
        if (keyAction) {
            this.escapeAction = keyAction;
        }
        if (typeof this.escapeAction === "function") {
            this.escapeAction();
        } else {
            this._callBackTypeError()
        }
    }

    spaceBar(keyAction) {
        if (keyAction) {
            this.spaceBarAction = keyAction;
        }
        if (typeof this.spaceBarAction === "function") {
            this.spaceBarAction();
        } else {
            this._callBackTypeError()
        }
    }

    arrowUp(keyAction) {
        if (keyAction) {
            this.arrowUpAction = keyAction;
        }
        if (typeof this.arrowUpAction === "function") {
            this.arrowUpAction();
        } else {
            this._callBackTypeError()
        }
    }

    arrowDown(keyAction) {
        if (keyAction) {
            this.keyDownAction = keyAction;
        }
        if (typeof this.keyDownAction === "function") {
            this.keyDownAction();
        } else {
            this._callBackTypeError()
        }
    }

    arrowLeft(keyAction) {
        if (keyAction) {
            this.keyLeftAction = keyAction;
        }
        if (typeof this.keyLeftAction === "function") {
            this.keyLeftAction();
        } else {
            this._callBackTypeError()
        }
    }

    arrowRight(keyAction) {
        if (keyAction) {
            this.keyRightAction = keyAction;
        }
        if (typeof this.keyRightAction === "function") {
            this.keyRightAction();
        } else {
            this._callBackTypeError()
        }
    }
    
    _callBackTypeError() {
        console.warn("CYL: Input action requires a function");
    }
}