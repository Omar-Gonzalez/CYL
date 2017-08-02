/**
 * Created by Omar Gonzalez on 8/1/2017.
 */

/**
 * Utils
 * @param msg - Console Log Shortcut
 */
window.log = function (msg) {
    console.log(msg)
}

class Scene {

    get msg() {
        return {
            "noGameContainer": "CYL : No div with id game available to place canvas",
            "wrongAlign": "CYL : Game container set to default center due to wrong alignment parameter",
            "noSprites": "CYL : Update method requires an array of sprites",
        }
    }
    /***
     * Scene
     * As per convention _method is intended to warn for a "private" method
     * @param width
     * @param height
     * @param alignment
     * @param bgColor
     * @param pixelSize
     */
    constructor(width = 800, height = 600, alignment = "center", bgColor = "#393f4c", pixelSize = 4) {
        this.width = width;
        this.height = height;
        this.pixelSize = pixelSize;
        this.alingment = alignment;
        this.bgColor = bgColor;
        this.ctx = {};
        /**Run Initialization Methods**/
        this._placeGameContainer();
    }

    _placeGameContainer() {
        /**Validate HTML Set Up**/
        let gameContainer = document.getElementById("game");
        if (gameContainer === null) {
            log(this.msg.noGameContainer);
            return;
        }
        /**Configure Game Container**/
        gameContainer.style.width = this.width + "px";
        gameContainer.style.height = this.height + "px";
        gameContainer.style.backgroundColor = "black";
        switch (this.alingment.toLowerCase()) {
            case 'center':
                gameContainer.style.marginLeft = "auto";
                gameContainer.style.marginRight = "auto";
                break;
            case 'left':
                gameContainer.style.marginLeft = "0px";
                break;
            case 'right':
                gameContainer.style.marginRight = "0px";
                gameContainer.style.float = "right";
                break;
            default:
                gameContainer.style.marginLeft = "auto";
                gameContainer.style.marginRight = "auto";
                log(this.msg.wrongAlign);
                break;
        }
        this._placeCanvas();
    }

    _placeCanvas() {
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.position = 'absolute';
        canvas.style.backgroundColor = this.bgColor;
        document.getElementById("game").appendChild(canvas);
        this.ctx = canvas.getContext("2d");
    }

    /**
     * Setup Color Pallet
     * @param i - pixel.color - numeric value of color
     * @returns {"Color String"}
     */
    color(i) {
        switch (i) {
            case 0:
                return "transparent";
                break;
            case 1:
                return "white";
                break;
        }
    }

    _drawPixel(pixel, x = 0, y = 0) {
        this.ctx.fillStyle = this.color(pixel.color);
        this.ctx.fillRect(parseInt(pixel.x + x), parseInt(pixel.y + y), this.pixelSize, this.pixelSize);
    }

    _drawSprite(sprite) {
        for (let pixel of sprite.shape) {
            this._drawPixel(pixel, sprite.x, sprite.y);
        }
    }

    /**
     * Clear clear the canvax context
     */
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    /**
     * Update Canvas with a sprites array
     * @param sprites
     */
    update(sprites) {
        if (sprites === undefined) {
            console.log(this.msg.noShape);
            return;
        }
        if (!(Array.isArray(sprites))) {
            log(this.msg.wrongShape);
            return;
        }
        this.clear();
        for (let sprite of sprites) {
            this._drawSprite(sprite);
        }
    }
}

/**
 * Due to co-dependant properties Scene Must be always initialized before sprites
 * @type {Scene}
 */
window.scene = new Scene();

class Sprite {

    get msg() {
        return {
            "noShape": "CYL : You need a shape to initialize a sprite",
            "wrongShape": "CYL : Shape object must be an array"
        }
    }
    /**
     * Sprite Properties
     * @param shape - array with filtered coordinates
     * @param width - new line in shape
     * @param x - x postion in scene
     * @param y - y position in scene
     */
    constructor(shape, width = 4, x = 0, y = 0) {
        if (shape === undefined) {
            console.log(this.msg.noArray);
            return;
        }
        if (!(Array.isArray(shape))) {
            log(this.msg.wrongShape);
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

class Game {

    get msg() {
        return {
            "pause": "CYL : Request Animation Frame is not updating",
            "updating": "CYL : Request Animation Frame is updating",
            "spritesParam": "CYL : Set sprites params can only take an array of sprites"
        }
    }
    /**
     * Class Properties;
     * - shouldUpdate - Should the loop update the scene
     * - sprites - array of sprites you want to draw for each cycle
     */
    constructor() {
        this.shouldUpdate = true;
        this.sprites = [];
    }

    run() {
        (() => {
            if (game.shouldUpdate) {
                let cycleSprites = [];
                for (let update of game.sprites) {
                    cycleSprites.push(update);
                }
                if(cycleSprites.length !== 0){
                    scene.update(cycleSprites);
                }
            }
            window.requestAnimationFrame(game.run)
        })();
    }

    pause() {
        if (this.shouldUpdate) {
            this.shouldUpdate = false;
            console.log(this.msg.pause);
        } else {
            this.shouldUpdate = true;
            console.log(this.msg.updating);
        }
    }
}




