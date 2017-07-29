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
     * this.sprites = current sprites on scene
     */
    get msg(){
        return {
            "noDpi":"CYL: you didn't set up pixel dimension, it's been set to 5px default",
            "noContainer":"CYL:Unable to retrieve Game Container (800x600)",
            "noArgs":"CYL: You are missing the riht number of arguments for this method"
        }
    }

    constructor(dpi){
        if (dpi !== undefined){
            this.dpi = dpi;
        }else{
            this.dpi = 5;
            console.log(this.msg.noDpi);
        }
        this.iterationY = 0;
        this.iterationX = 0;
        this.pixelCount = 0;
        this.pixelIndex = 0;
        this.sprites = [];
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

    renderSprite(sprite){
        for (let pixel of sprite){
            if (pixel[2] === 1){
                /**Turn pixel On**/
                this.pixelOn(pixel[0],pixel[1]);
            }else{
                /**Pixel is off**/
            }
        }
    }

    cleanSprites(){
        for (let savedSprite of this.sprites){
            /**Turn Off Pixels**/
            for (let sprite of savedSprite[0]){
                this.pixelOff(sprite[0] + savedSprite[1], sprite[1] + savedSprite[2])
            }
        }
    }

    updateSprite(sprite,x,y){
        this.cleanSprites();
        if (arguments.length === 3 && this.validateCoordinates(x,y)){
            /**Save Current Sprite**/
            let currentSprite = [sprite,x,y];
            this.sprites.push(currentSprite);
            /**Draw Current Sprite**/
            for (let pixel of sprite){
                if (pixel[2] === 1) {
                    /**Turn pixel On**/
                    this.pixelOn(pixel[0] + x, pixel[1] + y);
                }else{
                    /**Pixel is off**/
                }
            }
        }else{
            console.log(this.msg.noArgs)
            return;
        }
    }
}

class Sprite{
    /**
     * Class properties
     *  - this.shape : array with filtered coordinates
     *  - this.width : new line in shape
     */
    constructor(width){
        this.coordinates = [
            1,1,1,1,
            1,0,0,1,
            1,0,0,1,
            1,1,1,1,
        ]

        let index = 0;
        let x = 0;
        let y = 1;
        this.pixels = [];
        for(let state of this.coordinates){
            let pixel = [x,y,state];
            x++;
            index++;
            if(index % width === 0){
                y++;
                x = 0;
            }
            this.pixels.push(pixel);
        }
    }

    get shape(){
        return this.pixels
    }
}

let block = new Sprite(4);

window.scene= new Scene(10);
//scene.drawFrame();
//scene.renderSprite(block.shape)

let start = 5;

var move = function () {
    scene.updateSprite(block.shape,start,10);
    start++;
    if (start < 40){
        setTimeout(move,100);
    }
}

