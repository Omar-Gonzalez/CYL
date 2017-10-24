/******
 * Crayola - Shape Sprite
 * Omar Gonzalez Rocha - Copyright MIT license 2017
 */

class Scene {
    /**
     * Scene Properties
     * @param sprites - array with sprites to load into scene
     * @param pixelSize - taken from CONFIG.pixelSize global
     * @param Screen Size - W x H - defaults to 100% 
     */
    constructor(
        sprites = [],
        pixelSize = 5,
        screenSize = {
            "width": "100%",
            "height": "100%"
        }
    ) {
        //Param Validation
        if (!(Array.isArray(sprites))) {
            console.log("CYL:[Exception]Update method requires an array of sprites");
            return;
        }
        if (sprites.length < 1) {
            console.log("CYL:[Exception]Need at least one sprite to initialize a scene");
            return;
        }
        if (pixelSize.isInteger === false) {
            console.log("CYL:[Exception]PixelSize must be a interger");
            return;
        }
        if (pixelSize === 5) {
            console.log("CYL:Scene pixel size default of 5");
        }
        //Props
        this.screen = document.getElementById("screen");
        this.canvas = document.getElementById("game");
        this.screenSize = screenSize;
        this.pixelSize = pixelSize;
        this.ctx = this.canvas.getContext("2d");
        this.sprites = sprites;
        //Init Methods
        this._defineCanvasDimensions();
    }

    get frame() {
        return {
            "width": this.canvas.width,
            "height": this.canvas.height
        }
    }

    get assets() {
        return {
            "spriteCount": this.sprites.length,
            "sprites": this.sprites
        }
    }

    _defineCanvasDimensions() {
        this.screen.style.width = this.screenSize.width;
        this.screen.style.height = this.screenSize.height;
        this.canvas.width = this.screen.offsetWidth;
        this.canvas.height = this.screen.offsetHeight;

        window.addEventListener("resize", () => {
            this.canvas.width = this.screen.offsetWidth;
            this.canvas.height = this.screen.offsetHeight;
            console.log("CYL: Canvas resize: " + this.canvas.width);
        });
    }

    clear() {
        this.ctx.clearRect(0, 0, this.frame.width, this.frame.height);
    }

    _renderPixel(sprite, pixel, x = 0, y = 0) {
        this.ctx.fillStyle = pixel.color;
        this.ctx.fillRect(pixel.x + x, pixel.y + y, this.pixelSize, this.pixelSize);
    }

    _renderShapeWith(sprite) {
        for (let pixel of sprite.currentFrame) {
            this._renderPixel(sprite, pixel, sprite.x, sprite.y);
        }
    }

    _sortShapeFrameWith(sprite) {
        //Update frame to render on update
        if (sprite.tickCounter > sprite.tick) {
            sprite.tickCounter = 0;
            sprite.currentFrameIndex++;
            if (sprite.currentFrameIndex >= sprite.frameCount) {
                sprite.currentFrameIndex = 0;
            }
        }
        sprite.tickCounter++;
        //Render currentFrame
        this._renderShapeWith(sprite);
    }

    _renderBitmapFrame(sprite) {
        this.ctx.drawImage(sprite.currentFrame, sprite.x , sprite.y , sprite.currentFrame.width, sprite.currentFrame.height)
    }

    _sortBitmapFrameWith(sprite) {
        //Update frame to render on update
        if (sprite.tickCounter > sprite.tick) {
            sprite.tickCounter = 0;
            sprite.currentFrameIndex++;
            if (sprite.currentFrameIndex >= sprite.frameCount) {
                sprite.currentFrameIndex = 0;
            }
        }
        sprite.tickCounter++;
        this._renderBitmapFrame(sprite);   
    }

    update() {
        this.clear();
        for (let sprite of this.sprites) {
            if (sprite.kind === "shape") {
                this._sortShapeFrameWith(sprite);
            }
            if (sprite.kind === "bitmap") {
                this._sortBitmapFrameWith(sprite);
            }
        }
    }

    setSprites(sprites) {
        if (!(Array.isArray(sprites))) {
            console.log("CYL:[Exception]Update method requires an array of sprites");
            return;
        }
        this.sprites = sprites;
    }
}