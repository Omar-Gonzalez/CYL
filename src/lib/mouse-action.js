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
            //this.targetX = x;
            if (currentX.between(x - frame.width / 2, x + frame.width / 2)) {
                this.reachedTargetX = true;
                return currentX;
            }
            return currentX.getCloseTo(x, this.movementRate);
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
            //this.targetY = y;
            if (currentY.between(y - frame.height / 2, y + frame.height / 2)) {
                this.reachedTargetY = true;
                return currentY;
            }
            return currentY.getCloseTo(y, this.movementRate);
        }
    }

    get shouldKeepUpdating() {
        if (this.reachedTargetX && this.reachedTargetY) {
            this.reachedTargetX = false;
            this.reachedTargetY = false;
            return false;
        }
        return true;
    }
}