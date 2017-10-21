class ShapeSprite {
    /**
     * Sprite Properties
     * @param shape - array with filtered coordinates
     * @param width - sprite width new line in shape
     * @param x - x postion in scene
     * @param y - y position in scene
     */
    constructor(name, shape, width = 4, x = 0, y = 0) {
        //Param Validation
        if (name === undefined) {
            l("CYL:Warning, no name identifier for sprite");
        }
        if (width === 4) {
            l("CYL:Warning, default 4 sprite size, make sure you are passing width param");
        }
        if (shape === undefined) {
            l("CYL:[Exception]You need a shape to initialize a sprite");
            return;
        }
        if (!(Array.isArray(shape))) {
            l("CYL:[Exception]Shape object must be an array");
            return;
        }
        if(pixelSize === undefined){
            l("CYL:[Exception]Please define global pixelSize value");
            return;
        }
        //Props Definition
        this.spriteName = name;
        this.x = x;
        this.y = y;

        this.pixels = [];
        let relativeX = 0;
        let relativeY = 0;
        let index = 0;
        //Iterate Build Shape
        for (let colorCode of shape) {
            this.pixels.push({
                x: relativeX,
                y: relativeY,
                color: colorCode
            });
            relativeX = relativeX + pixelSize;
            index++;
            if (index === width) {
                relativeY = relativeY + pixelSize;
                relativeX = 0;
                index = 0;
            }
        }
    }

    get name(){
        return this.spriteName;
    }

    get shape() {
        return this.pixels;
    }
}