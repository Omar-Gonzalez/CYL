/******
 * CYL - Shape Sprite
 * Copyright MIT license 2017
 */
class ShapeSprite {
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
    constructor(
        name,
        shapes,
        width = 4,
        tick = 20,
        contactGroup = null,
        x = 0,
        y = 0
    ) {
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
        if (!(Array.isArray(shapes))) {
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

    setAnimation(named) {
        this.spriteFrames = []; //clean active frames before setting them again
        if (named === undefined) {
            this.activeAnimation = "idle";
        } else {
            this.activeAnimation = named;
        }
        let activeCount = 0;
        //Iterate map active frames with shapes
        for (let i = 0; i < this.shapes.length; i++) {
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

    mapFrameWith(shape) {
        let frame = [];
        let relativeX = 0;
        let relativeY = 0;
        console.log(CFG.PIXELSIZE);
        //Iterate Build Shape
        for (let i = 0; i < shape.length; i++) {
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

    get bounds() {
        return {
            "maxX": this.renderedX.max(),
            "minX": this.renderedX.min(),
            "maxY": this.renderedY.max(),
            "minY": this.renderedY.min()
        };
    }

    get frame() {
        return {
            "width": parseInt(this.renderedX.max() - this.renderedX.min()),
            "height": parseInt(this.renderedY.max() - this.renderedY.min())
        };
    }

    inContactWith(sprite) {
        let xContact = false;
        let yContact = false;
        if ((this.bounds.maxX).between(sprite.bounds.minX, sprite.bounds.maxX) ||
            (this.bounds.minX).between(sprite.bounds.minX, sprite.bounds.maxX)) {
            xContact = true;
        }
        if ((this.bounds.maxY).between(sprite.bounds.minY, sprite.bounds.maxY) ||
            (this.bounds.minY).between(sprite.bounds.minY, sprite.bounds.maxY)) {
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

    inCollisionWith(sprite) {
        let xCollision = false;
        let yCollision = false;
        if ((this.bounds.maxX).between(sprite.bounds.minX, sprite.bounds.maxX) ||
            (this.bounds.minX).between(sprite.bounds.minX, sprite.bounds.maxX)) {
            xCollision = true;
        }
        if ((this.bounds.maxY).between(sprite.bounds.minY, sprite.bounds.maxY) ||
            (this.bounds.minY).between(sprite.bounds.minY, sprite.bounds.maxY)) {
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

    get framePixels() {
        return this.spriteFrames[this.currentFrameIndex];
    }

    get frames() {
        return this.spriteFrames;
    }

    updatePos(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Action Methods 
     */

    actionWithVector(x, y) {
        this.x = this.action.computeX(x) + this.x;
        this.y = this.action.computeY(y) + this.y;
    }

    mouseActionWithClick(x, y, frame) {
        this.x = this.mouseAction.computeX(x - this.frame.width / 2, this.x, this.frame);
        this.y = this.mouseAction.computeY(y - this.frame.height / 2, this.y, this.frame);
        this.actionIsRunning(null, true);

        if (!(this.mouseAction.shouldKeepUpdating)) {
            clearInterval(this.constantUpdateInterval);
            this.actionDidStop(null, true);
        }
    }

    mouseActionUpdate(x, y) {
        clearInterval(this.constantUpdateInterval);
        this.actionDidStart(null, true);
        let _this = this;
        this.constantUpdateInterval = setInterval(function() {
            _this.mouseActionWithClick(x, y);
        }, 40);

    }

    actionDidStop(cb, shouldRun) {
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

    actionDidStart(cb, shouldRun) {
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

    actionIsRunning(cb, shouldRun) {
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

    setAction(action) {
        this.action = action;
    }

    setMouseAction(action) {
        this.mouseAction = action;
    }

    _callBackTypeError() {
        console.warn("CYL: action cb requires a function");
    }
}