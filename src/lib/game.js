/******
 * Crayola - Game
 * Copyright MIT license 2017
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
    spriteNamed(name){
        return this.activeScene.sprites.filter(function(sprite) {
            return sprite.name === name;
        })[0];
    }
    detectContact() {
        //set your contact logic
        let contact = this.spriteNamed("cat").inContactWith(this.spriteNamed("enemy"));
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
}