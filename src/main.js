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
     */
    constructor(){
        this.iterationY = 0;
        this.iterationX = 0;
        this.pixelCount = 0;
        this.pixelIndex = 0;
    }

    get frame(){
        return {
            'width':200,
            'height':150
        }
    }

    get pixel(){
        return {
            'off': 'black',
            'on': 'white',
        }
    }

    drawFrame(){
        this.pixelCount = this.frame.width * this.frame.height;
                let gameContainer = document.getElementById('game');
        let html = "";
        for(let i = 0; i < this.pixelCount; i++){
            html = html + "<div class ='pixel' id='"+this.pixelId(i)+"'></div>";
        }
        gameContainer.innerHTML = html;
        this.iterationY++;
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
        let id = x+','+y;
        document.getElementById(id).style.backgroundColor = this.pixel.on;
    }

    pixelOff(x,y){
        let id = x+','+y;
        document.getElementById(id).style.backgroundColor = this.pixel.off;
    }

}

window.scene= new Scene();
//scene.drawFrame();

let start = 0;

var move = function () {
    scene.pixelOn(start,50);
    start++;
    if (start < 190){
        setTimeout(move,20);
    }
}

