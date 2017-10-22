class ShapeSprite {
    /**
     * Sprite Properties
     * @param shape - array with filtered coordinates
     * @param width - sprite width new line in shape
     * @param x - x postion in scene
     * @param y - y position in scene
     */
    constructor(name, shapes, width = 4, tick = 20, x = 0, y = 0) {
        //Param Validation
        if (name === undefined) {
            console.log("CYL:Warning, no name identifier for sprite");
        }
        if (width === 4) {
            console.log("CYL:Warning, default 4 sprite size, make sure you are passing width param");
        }
        if (shapes === undefined) {
            console.log("CYL:[Exception]You need a shape to initialize a sprite");
            return;
        }
        if (!(Array.isArray(shapes))) {
            console.log("CYL:[Exception]Shape object must be an array");
            return;
        }
        if (pixelSize === undefined) {
            console.log("CYL:[Exception]Please define global pixelSize value");
            return;
        }
        //Props Definition
        this.spriteName = name;
        this.spriteFrames = [];
        this.width = width;
        this.x = x;
        this.y = y;
        this.currentFrame = 0;
        this.tick = tick;
        this.tickCounter = 0;
        this.shapes = shapes;
        this.activeFrames = "";

        //Init Methods
        this.setAnimation();
    }

    setAnimation(named) {
        this.spriteFrames = [];
        if (named === undefined) {
            this.activeFrames = "idle";
        } else {
            this.activeFrames = named;
        }
        let activeCount = 0;
        //Iterate map active frames with shapes
        for (let shape of this.shapes) {
            if (shape.set === this.activeFrames) {
                this.mapFrameWith(shape.shape);
                activeCount++;
            }
        }
        if (activeCount === 0) {
            console.log("CYL:[Exception]No active sets in srite");
            return;
        }
        this.frameCount = activeCount;
    }

    mapFrameWith(shape) {
        let frame = [];
        let relativeX = 0;
        let relativeY = 0;
        let index = 0;

        //Iterate Build Shape
        for (let colorCode of shape) {
            frame.push({
                x: relativeX,
                y: relativeY,
                color: colorCode
            });
            relativeX = relativeX + pixelSize;
            index++;
            if (index === this.width) {
                relativeY = relativeY + pixelSize;
                relativeX = 0;
                index = 0;
            }
        }
        this.spriteFrames.push(frame);
    }

    get name() {
        return this.spriteName;
    }

    get frames() {
        return this.spriteFrames;
    }
}