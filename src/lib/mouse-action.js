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

    computeX(x, currentX) {
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
            console.log(" X : "+parseInt(x) + " -- " +parseInt(currentX));
            if(currentX.between(x - 40, x + 40)){
                this.reachedTargetX = true;
            }
            return currentX.getCloseTo(x, this.movementRate);
        }
    }

    computeY(y, currentY) {
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
            console.log(" Y : "+parseInt(y) + " -- " +parseInt(currentY));
            if(currentY.between(y - 40, y + 40)){
                this.reachedTargetY = true;
            }
            return currentY.getCloseTo(y, this.movementRate);
        }
    }

    get shouldKeepUpdating() {
        if (this.reachedTargetX && this.reachedTargetY){
            this.reachedTargetX = false;
            this.reachedTargetY = false;
            return false;
        }
        return true; 
    }
}