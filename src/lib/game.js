/******
 * CYL - Game
 * Copyright MIT license 2017
 */
class Game {
    constructor(scenes, active = 0) {
        //Param Validations
        if (!(Array.isArray(scenes))) {
            console.error("CYL:[Exception]Game requires an array of scenes");
            return;
        }
        if (scenes.length === 0) {
            console.warn("CYL:Default initial scene with index 0 is being loaded");
        }
        //Props
        this.scenes = scenes;
        this.active = active;
        this.shouldUpdate = true;
        //Init Mehtods:
        this.setActiveScene();
        //Bind run method - animation request frame call back
        this.run = this.run.bind(this);
    }

    setActiveScene(active) {
        if (active !== undefined) {
            this.active = active;
        }
        this.activeScene = this.scenes[this.active];
    }

    setActiveSceneNamed(name){
        for(let scene of this.scenes){
            if (scene.name === name){
                this.activeScene = scene;
            }
        }
    }

    getSceneNamed(name){
        for(let scene of this.scenes){
            if (scene.name === name){
                return scene;
            }
        }
    }

    get assets() {
        return {
            'scenes': this.scenes,
            'activeScene': this.activeScene
        };
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
        for (let i = 0; i < this.activeScene.sprites.length; i++) {
            if (this.activeScene.sprites[i].name === name) {
                return this.activeScene.sprites[i];
            }
        }
    }

    spritesNamed(name) {
        return this.activeScene.sprites.filter(function(sprite) {
            return sprite.name === name;
        });
    }

    spritesWithKind(kind){
        return this.activeScene.sprites.filter(function(sprite) {
            return sprite.kind === kind;
        });
    }

    detectContact() {
        //set your contact logic

    }

    detectCollision() {
        //set your collision logic

    }
}