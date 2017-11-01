/******
 * CYL - Action Sprite
 * Copyright MIT license 2017
 */

class Action {
    constructor(kind = "default") {
        //Param Validation
        if (kind === "default") {
            console.warn("CYL:Warning, Initialicing Action with default parameter");
        }
        this.kind = kind;
        //Animation Cycle 
        this.cycleX = true;
        this.cycleY = true;
        //Acceleration 
        this.accelRatio = 1.25;
        this.xCurrentSpeed = 0;
        this.yCurrentSpeed = 0;
    }

    computeX(x) {
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
            if(this.xCurrentSpeed.between(-Math.abs(x * 10),(x * 10))){
                //TODO
            }else{
                //TODO
            }
            this.xCurrentSpeed = this.xCurrentSpeed + (x * this.accelRatio);
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

    computeY(y) {
        /***
         * Default Vector U displacement y + value 
         */
        if (this.kind === "default") {
            return y;
        }

        /***
         * Linear Acceleration Y
         */

        if (this.kind === "accel") {
            this.yCurrentSpeed = this.yCurrentSpeed + (y * this.accelRatio);
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

    _shake(max = 20) {
        return Math.floor(Math.random() * max) + 1;
    }
}