class Game {

    constructor(scenes, active = 0) {
        //Param Validations
        if (!(Array.isArray(scenes))) {
            console.log("CYL:[Exception]Game requires an array of scenes");
            return;
        }
        if (scene === 0) {
            console.log("CYL:Default initial scene with index 0 is being loaded");
        }
        //Props
        this.scenes = scenes
        this.active = active
        this.shouldUpdate = true;
        //Init Mehtods:
        this.setActiveScene();
    }

    setActiveScene(active) {
        if (active !== undefined) {
            this.active = active
        }
        this.activeScene = this.scenes[this.active];
    }

    get assets() {
        return {
            'scenes': this.scenes,
            'activeScene': this.activeScene
        }
    }

    run = () => {
        if (this.shouldUpdate) {
            this.activeScene.update();
        }
        window.requestAnimationFrame(this.run);
    }

    pause = () => {
        if (this.shouldUpdate) {
            this.shouldUpdate = false;
        } else {
            this.shouldUpdate = true;
        }
    }

    spriteNamed = (name) => {
        for (let sprite of this.activeScene.sprites){
            if(name = sprite.name){
                return sprite;
            }
        }
    }

    mouseClick = () =>  {
        document.getElementById("game").addEventListener("click", (e) => {
            //handle click events... 
            this.spriteNamed("player").x = e.clientX;
            this.spriteNamed("player").y = e.clientY;
        });
    }

    keyPress = () => {
        window.addEventListener("keydown", (e) => {
            //handle click events... 
            if (e.key === "ArrowLeft"){
                this.spriteNamed("player").x = this.spriteNamed("player").x - 30;
            }
            if (e.key === "ArrowRight"){
                this.spriteNamed("player").x = this.spriteNamed("player").x + 30;
            }
            if (e.key === "ArrowUp"){
                this.spriteNamed("player").y = this.spriteNamed("player").y - 30;
            }
            if (e.key === "ArrowDown"){
                this.spriteNamed("player").y = this.spriteNamed("player").y + 30;
            }
        });
    }
}