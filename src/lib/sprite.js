class Sprite {
    /**
     * Sprite Properties
     * @param shape - array with filtered coordinates
     * @param width - sprite width new line in shape
     * @param x - x postion in scene
     * @param y - y position in scene
     */
    constructor(shape, width = 4, x = 0, y = 0) {
        if(width === 4){
            l("CYL:Warning, default 4 sprite size, make sure you are passing width param");
        }
        if (shape === undefined) {
            l("CYL : You need a shape to initialize a sprite");
            return;
        }
        if (!(Array.isArray(shape))) {
            l("CYL : Shape object must be an array");
            return;
        }

        this.x = x;
        this.y = y;

        this.pixels = [];
        let relativeX = 0;
        let relativeY = 0;
        let index = 0;

        for (let colorCode of shape){
            this.pixels.push({
                x:relativeX,
                y:relativeY,
                color:colorCode
            });
            relativeX = relativeX + scene.pixelSize;
            index++;
            if (index === width){
                relativeY = relativeY + scene.pixelSize;
                relativeX = 0;
                index = 0;
            }
        }
    }

    get shape() {
        return this.pixels;
    }
}

let ghost = new Sprite(
    [
        0, 1, 1, 1, 0,
        1, 0, 1, 0, 1,
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1,
    ], 5
)

console.log(ghost.shape);