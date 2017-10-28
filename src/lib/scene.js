/******
 * CYL - Shape Sprite
 * Copyright MIT license 2017
 */
class Scene {
    /**
     * Scene Properties
     * @param sprites - array with sprites to load into scene
     * @param Screen Size - W x H - defaults to 100%
     */
    constructor(
        sprites = [],
    ) {
        //Param Validation
        if (!(Array.isArray(sprites))) {
            console.error("CYL:[Exception]Update method requires an array of sprites");
            return;
        }
        if (sprites.length < 1) {
            console.error("CYL:[Exception]Need at least one sprite to initialize a scene");
            return;
        }
        //Props
        this.screen = document.getElementById("screen");
        this.canvas = document.getElementById("game");
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
        this.screen.style.width = SCREEN().screen.width;
        this.screen.style.height = SCREEN().screen.height;
        this.canvas.width = this.screen.offsetWidth;
        this.canvas.height = this.screen.offsetHeight;

        window.addEventListener("resize", () => {
            this.screen.style.width = SCREEN().screen.width;
            this.screen.style.height = SCREEN().screen.height;
            this.canvas.width = this.screen.offsetWidth;
            this.canvas.height = this.screen.offsetHeight;
        });
    }
    clear() {
        this.ctx.clearRect(0, 0, this.frame.width, this.frame.height);
        for (let sprite of this.sprites) {
            sprite.renderedX = [];
            sprite.renderedY = [];
        }
    }
    /**
    *Shapre srite render methods
    */
    _renderPixel(sprite, pixel, x = 0, y = 0) {
        this.ctx.fillStyle = pixel.color;
        this.ctx.fillRect(pixel.x + x, pixel.y + y, SCREEN().pixelSize , SCREEN().pixelSize);
        sprite.renderedX.push(pixel.x + x);
        sprite.renderedY.push(pixel.y + y);
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
    /**
    * Bitam sprites render methods
    */
    _renderBitmapFrame(sprite) {
        this.ctx.drawImage(sprite.currentFrame, sprite.x, sprite.y, sprite.currentFrame.width, sprite.currentFrame.height)
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
    /**
    * Label sprite render methods
    */
    _renderLabelSprite(){
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Hello World", 200,200);
    }
    /**
    *Scene Update, sort sprite kind for render
    */
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
            console.error("CYL:[Exception]Update method requires an array of sprites");
            return;
        }
        this.sprites = sprites;
    }
}