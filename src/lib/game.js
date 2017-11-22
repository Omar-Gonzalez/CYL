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
        this.patterns = [];
        this.collisionCb = null;
        this.contactCb = null; 
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
            this.updatePatterns();
            this.activeScene.update();
            if(this.collisionCb !== null){
                this.collisionCb();
            }
            if(this.contactCb !== null){
                this.contactCb();
            }
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

    removeSprite(sprite) {
        for (let i = 0; i < this.activeScene.sprites.length; i++) {
            if (this.activeScene.sprites[i] === sprite) {
                this.activeScene.sprites.removeIndex(i);
            }
        }
    }

    removeSpritesNamed(name) {
        for (let i = 0; i < this.activeScene.sprites.length; i++) {
            if (this.activeScene.sprites[i].name === sprite.name) {
                this.activeScene.sprites.removeIndex(i);
            }
        }
    }

    removeSpriteIndex(i){
        this.activeScene.sprites.removeIndex(i);
    }

    setContactMethod(cb) {
        if(typeof cb !== "function"){
            console.error("CYL:[Exception] contact methods must be a function");
        }
        this.contactCb = cb;
    }

    setCollisionMethod(cb) {
        //set your collision logic
        if(typeof cb !== "function"){
            console.error("CYL:[Exception] collision methods must be a function");
        }
        this.collisionCb = cb;
    }

    addPatternToScene(pattern, scene){
        let p = {
            "pattern":pattern,
            "scene":scene
        };
        this.patterns.push(p);
    }

    updatePatterns(){
        for(let i = 0; i < this.patterns.length; i++){
            if(this.patterns[i].pattern.scene === this.activeScene.name){
                this.patterns[i].pattern.update();
                let applyFor = this.patterns[i].pattern.applyFor;
                for(let j = 0; j < this.spritesNamed(applyFor).length; j++){
                    this.spritesNamed(applyFor)[j].x = this.spritesNamed(applyFor)[j].x + this.patterns[i].pattern.pos.x;
                    this.spritesNamed(applyFor)[j].y = this.spritesNamed(applyFor)[j].y + this.patterns[i].pattern.pos.y;
                }
            }
        }
    }
}