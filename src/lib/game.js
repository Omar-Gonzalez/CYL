/******
 * Crayola - Game
 * Omar Gonzalez Rocha - Copyright MIT license 2017
 */
class Game {
    constructor(scenes, active = 0) {
        //Param Validations
        if (!(Array.isArray(scenes))) {
            console.error("CYL:[Exception]Game requires an array of scenes");
            return;
        }
        if (scene === 0) {
            console.warn("CYL:Default initial scene with index 0 is being loaded");
        }
        //Props
        this.scenes = scenes
        this.active = active
        this.shouldUpdate = true;
        //Init Mehtods:
        this.setActiveScene();
        //Bind run method - animation request frame call back
        this.run = this.run.bind(this);
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
    run() {
        if (this.shouldUpdate) {
            this.activeScene.update();
            this.detectContact();
        }
        window.requestAnimationFrame(this.run);
    }
    pause() {
        if (this.shouldUpdate) {
            this.shouldUpdate = false;
        } else {
            this.shouldUpdate = true;
        }
    }
    spriteNamed(name) {
        for (let sprite of this.activeScene.sprites) {
            if (name === sprite.name) {
                return sprite;
            }
        }
    }
    detectContact() {
        //set your contact logic
        let contact = this.spriteNamed("player").inContactWith(this.spriteNamed("enemy"));
        if (contact.inContact) {
            console.log(contact.contactWith);
        }
    }
    detectCollision() {
        //set your collision logic
        let collision = this.spriteNamed("player").inCollisionWith(this.spriteNamed("enemy")).inCollision;
        if (collision.inCollision) {
            console.log(collision.collisionWith);
        }
    }
    mouseClick() {
        document.getElementById("game").addEventListener("click", (e) => {
            //handle click events...
            this.spriteNamed("cat").x = e.clientX;
            this.spriteNamed("cat").y = e.clientY;
        });
    }
    keyDown() {
        window.addEventListener("keydown", (e) => {
            //handle click events...
            if (e.key === "ArrowLeft") {
                this.spriteNamed("player").x = this.spriteNamed("player").x - 30;
            }
            if (e.key === "ArrowRight") {
                this.spriteNamed("player").x = this.spriteNamed("player").x + 30;
            }
            if (e.key === "ArrowUp") {
                this.spriteNamed("player").y = this.spriteNamed("player").y - 30;
            }
            if (e.key === "ArrowDown") {
                this.spriteNamed("player").y = this.spriteNamed("player").y + 30;
            }
            if (e.key === "a") {
                this.spriteNamed("player").setAnimation("moving");
            }
            if (e.key === "s") {
                this.spriteNamed("player").setAnimation("idle");
            }
            if (e.key === " ") {
                this.activeScene.detectCollision();
            }
            if (e.key === "p") {
                this.pause();
            }
        });
    }
}