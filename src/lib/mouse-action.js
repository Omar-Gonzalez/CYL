/******
 * CYL - Mouse Action Sprite
 * Copyright MIT license 2017
 */

class MouseAction {
    constructor(kind = "default") {
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

    computeX(x, currentX, frame) {
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

    computeY(y, currentY, frame) {
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

    get shouldKeepUpdating() {
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

    get vectorDirection() {
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
}