/**
 * Created by Omar Gonzalez on 7/26/2017.
 */

class Scene{
    /**
     * Class Properties
     * this.width
     * this.height
     * this.frame[width,height]
     * this.pixelCount = total pixel density
     * this.container = Real px dimension of game container
     * this.framePixels = Current pixels ids in frame
     */
    get msg(){
        return {
            "noDpi":"CYL: you didn't set up pixel dimension, it's been set to 5px default",
            "noContainer":"CYL:Unable to retrieve Game Container (800x600)",
            "noArgs":"CYL: You are missing the riht number of arguments for this method",
            "updateParam": "CYL: to update a scene you need an array of sprites"
        }
    }

    constructor(dpi) {
        if (dpi !== undefined) {
            this.dpi = dpi;
        } else {
            this.dpi = 8;
            console.log(this.msg.noDpi);
        }
        this.iterationY = 0;
        this.iterationX = 0;
        this.pixelCount = 0;
        this.pixelIndex = 0;
        this.sprites = [];
        this.framePixelsIds = [];
    }

    get container(){
        return {
            'width':800,
            'height':600
        }
    }

    get frame(){
        return {
            'width':this.container.width/this.dpi,
            'height':this.container.height/this.dpi
        }
    }

    get pixel(){
        return {
            'dimension':this.dpi,
            'off': 'black',
            'on': 'white',
        }
    }

    drawFrame(){
        /**Pixel Properties*/
        let pixelClass = document.createElement('style');
        pixelClass.type = 'text/css';
        pixelClass.innerHTML = ".pixel{width:"+this.pixel.dimension+"px;height:"+this.pixel.dimension+"px;background-color:#000;display:inline-grid;float:left}"
        document.getElementsByTagName('head')[0].appendChild(pixelClass);

        /**Render Pixesl**/
        this.pixelCount = this.frame.width * this.frame.height;
        let gameContainer = document.getElementById('game');
        if (gameContainer === null){
            console.log(this.msg.noContainer);
            return;
        }
        let html = "";
        for(let i = 0; i < this.pixelCount; i++){
            html = html + "<div class ='pixel' id='"+this.pixelId(i)+"'></div>";
        }
        gameContainer.innerHTML = html;
    }

    pixelId(i){
        this.iterationX++;
        if (i % this.frame.width === 0){
            this.iterationY++;
            this.iterationX = 0;
        }
        return(this.iterationX+','+this.iterationY);
    }

    pixelOn(x,y){
        if(this.validateCoordinates(x,y)){
            let id = x+','+y;
            this.framePixelsIds.push(id);
            document.getElementById(id).style.backgroundColor = this.pixel.on;
        }
    }

    pixelOff(x,y){
        if(this.validateCoordinates(x,y)){
            let id = x+','+y;
            document.getElementById(id).style.backgroundColor = this.pixel.off;
        }
    }

    validateCoordinates(x,y){
        if(x > this.frame.width || x < 0){
            console.log('CYL: x('+x+') coordinate is no valid, must in the range of 0 and '+this.frame.width);
            return false;
        }
        if(y > this.frame.height || y < 0){
            console.log('CYL: y('+y+') coordinate is no valid, must in the range of 0 and '+this.frame.height);
            return false;
        }
        return true;
    }

    cleanSprites(){
        for(let id of this.framePixelsIds){
            document.getElementById(id).style.backgroundColor = this.pixel.off;
        }
        this.framePixelsIds = [];
    }

    updateSprite(sprite){
        if (arguments.length === 1){
            /**Draw Current Sprite**/
            for (let pixel of sprite.shape){
                if (pixel[2] === 1){
                    /**Turn pixel On**/
                    this.pixelOn(pixel[0] + sprite.x, pixel[1] + sprite.y);
                }else{
                    /**Pixel is off**/
                }
            }
        }else{
            console.log(this.msg.noArgs)
            return;
        }
    }

    update(sprites){
        if(Array.isArray(sprites)){
            this.cleanSprites();
            for (let sprite of sprites){
                this.updateSprite(sprite);
            }
        }else{
            console.log(this.msg.updateParam)
        }
    }
}

class Sprite{
    /**
     * Class properties
     *  - this.coordintes : the shape you want to make
     *  - this.shape : array with filtered coordinates
     *  - this.width : new line in shape
     *  - this.x : x postion in scene
     *  - this.y : y position in scene
     *  - pixel : array[x,y,color
     */
    get msg(){
        return {
            "noWidth":"CYL : You need to define width to initialize a sprite",
            "noShape":"CYL : You need a shape to initialize a sprite"
        }
    }
    constructor(width,shape,x,y){

        if (width === undefined){
            console.log(this.msg.noWidth);
            return;
        }

        if(shape === undefined){
            console.log(this.msg.noShape);
            return;
        }

        if(x !== undefined && y !== undefined){
            this.x = x;
            this.y = y;
        }else{
            this.x = 0;
            this.y = 1;
        }

        this.coordinates = shape;

        let index = 0;
        this.pixels = [];
        let relativeX = 0;
        let relativeY = 0;
        for(let state of this.coordinates){
            let pixel = [relativeX, relativeY, state];
            relativeX++;
            index++;
            if(index % width === 0){
                relativeY++;
                relativeX = 0;
            }
            this.pixels.push(pixel);
        }
    }

    get shape(){
        return this.pixels
    }
}

class Game{

    /**
     * Class Properties;
     * - shouldUpdate - Should the loop update the scene
     * - sprites - array of sprites you want to draw for each cycle
     */

    get msg(){
        return {
            "pause":"CYL : Request Animation Frame is not updating",
            "updating":"CYL : Request Animation Frame is updating",
            "spritesParam" : "CYL : Set sprites params can only take an array of sprites"
        }
    }

    constructor(){
        this.shouldUpdate= true;
        this.sprites = [];
    }

    run(){
        (()=>{
            if (game.shouldUpdate){
                let cycleSprites = [];
                for(let update of game.sprites){
                    cycleSprites .push(update);
                }
                scene.update(cycleSprites);
            }
            window.requestAnimationFrame(game.run)
        })();
    }

    pause(){
        if (this.shouldUpdate){
            this.shouldUpdate = false;
            console.log(this.msg.pause);
        }else{
            this.shouldUpdate = true;
            console.log(this.msg.updating);
        }
    }
}

