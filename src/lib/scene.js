class Scene {

    constructor(pixelSize = pixelSize) {
        //Props
        this.screen = document.getElementById("screen");
        this.canvas = document.getElementById("game");
        this.pixelSize = pixelSize;
        this.ctx = this.canvas.getContext("2d")
        //Init Methods
        this._canvasDimensions();
    }

    _canvasDimensions() {
        this.canvas.width = this.screen.offsetWidth;
        this.canvas.height = this.screen.offsetHeight;

        window.addEventListener("resize", () => {
            this.canvas.width = this.screen.offsetWidth;
            this.canvas.height = this.screen.offsetHeight;
            l("CYL: Canvas resize: " + this.canvas.width);
        });
    }

    get maxXPos(){
        return this.canvas.width - this.pixelSize;
    }

    get maxYPos(){
        return this.canvas.height - this.pixelSize;
    }

    _drawPixel(pixel) {
        let error = "";
        if(pixel.x > this.maxXPos || pixel.x < 0){
            error = "CYL: attempting to render pixel.x outside canvas";
        }
        if(pixel.y > this.maxYPos || pixel.y < 0){
            error = error + "\nCYL: attempting to render pixel.y outside canvas";
        }
        if (error.length > 0 ){
            l(error);
            return;
        }
        this.ctx.fillStyle = pixel.color;
        this.ctx.fillRect(pixel.x, pixel.y, this.pixelSize, this.pixelSize);
    }
}

let scene = new Scene(pixelSize);

let pixel = {
    'x':400,
    'y':200,
    'color':'white'
}
scene._drawPixel(pixel);