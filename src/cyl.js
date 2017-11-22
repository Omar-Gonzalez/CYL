/******
 * CYL ES6 Game Dev Tools 
 * Copyright MIT license 2017
 * Conventions: 
 * _underscore for pseudo private methods 
 */

//Lib Concatenation
//@prepros-prepend ./lib/utils.js
//@prepros-prepend ./lib/config.js
//@prepros-prepend ./lib/action.js
//@prepros-prepend ./lib/mouse-action.js
//@prepros-prepend ./lib/input.js
//@prepros-prepend ./lib/scene.js
//@prepros-prepend ./lib/shape-sprite.js
//@prepros-prepend ./lib/bitmap-sprite.js
//@prepros-prepend ./lib/label-sprite.js
//@prepros-prepend ./lib/dialogue.js
//@prepros-prepend ./lib/pattern.js
//@prepros-prepend ./lib/game.js
//@prepros-prepend ./sprites.js

/***
 __      _____| |__   (_)_ ____   ____ _  __| | ___ _ __ ___ 
 \ \ /\ / / _ \ '_ \  | | '_ \ \ / / _` |/ _` |/ _ \ '__/ __|
  \ V  V /  __/ |_) | | | | | \ V / (_| | (_| |  __/ |  \__ \
   \_/\_/ \___|_.__/  |_|_| |_|\_/ \__,_|\__,_|\___|_|  |___/ 
   -----
   Sample Game:
*/

let invader = new ShapeSprite("invadder", [invShape.idle1, invShape.idle2, invShape.moving1, invShape.moving2], 8, 15);
let player = new ShapeSprite("player", [pShape.idle1, pShape.idle2, pShape.mLeft1, pShape.mLeft2, pShape.mRight1, pShape.mRight2], 7, 12);
let notice = new LabelSprite("CYL:Game Development Tools 2017", "small");
let title = new LabelSprite("WEB INVADERS", "large");
let start = new LabelSprite("Start", "medium");
let topScores = new LabelSprite("Top Scores", "medium");
let dialogue = new Dialogue([start, topScores]);
let menu = new Scene("menu", [invader, notice, title, dialogue, player]);
let level = new Scene("level", [notice,player]);
let game = new Game([menu, level]);
game.run();

// 2 - Set up scene
// Start Screen
notice.y = menu.frame.height - 50;
notice.x = menu.frame.width / 2 - notice.frame.width / 2;
title.y = menu.frame.height / 2;
title.x = menu.frame.width / 2 - title.frame.width / 2;
invader.y = menu.frame.height / 2 - invader.frame.height;
invader.x = title.x - invader.frame.width - 20;
player.x = menu.frame.width / 2 - player.frame.width / 2;
player.y = menu.frame.height - 150;
dialogue.updatePos(title.x, menu.frame.height / 2);
// Game Scene
function placeInvadersWith(level) {
    let xOffset = level.frame.width / 4;
    let yOffset = level.frame.height / 6;

    let yRow = 0;
    let xRow = 0;
    for (let i = 0; i < 12; i++) {
        let invader = new ShapeSprite("invader", [invShape.idle1, invShape.idle2, invShape.moving1, invShape.moving2], 8, 15);
        invader.x = xOffset * i;
        if (i === 4 || i === 8) {
            yRow++;
            xRow = 0;
        }
        invader.x = xOffset * xRow;
        invader.y = yOffset * yRow;
        xRow++;
        game.getSceneNamed("level").addSprite(invader);
    }
}

placeInvadersWith(level);

class InvaderPattern extends Pattern {
    update() {
        if (this.cycle) {
            this.xMovement = Math.abs(this.xMovement);
            this.xProgression = this.xProgression + this.xMovement;
            //this.yMovement = 0;
            if (this.xProgression > this.xMax) {
                //this.yMovement = 0;
                this.cycle = false;
            }
        } else {
            this.xMovement = -Math.abs(this.xMovement);
            //this.yMovement = 0;
            this.xProgression = this.xProgression + this.xMovement;
            if (this.xProgression < 0) {
                //this.yMovement = 50;
                this.cycle = true;
            }
        }

    }
}

let invaderPattern = new InvaderPattern("level","invader",3,1);
invaderPattern.xMax = 50;
game.addPatternToScene(invaderPattern);

//3- Set Input  + Actions
let input = new Input();
let action = new Action("shake");
let mAction = new MouseAction("click-move");
let pMAction = new MouseAction("click-move-x");
invader.setAction(action);
invader.setMouseAction(mAction);
player.setMouseAction(pMAction);

input.arrowLeft(function() {
    invader.actionWithVector();
});

input.arrowRight(function() {
    invader.actionWithVector();
});

input.arrowUp(function() {
    invader.actionWithVector();
    dialogue.focusUp();
});

input.arrowDown(function() {
    dialogue.focusDown();
    invader.actionWithVector();
});

input.spaceBar(function() {
    if (dialogue.focusIndex === 0) {
        //game start
        game.setActiveSceneNamed("level");
    }
    if (dialogue.focusIndex === 1) {
        //show top scores
        alert("Not yet implemented ;)");
    }
});

input.escape(function() {
    game.setActiveSceneNamed("menu");
});

input.click(function(e) {
    invader.mouseActionUpdate(e.x, e.y);
    player.mouseActionUpdate(e.x, e.y);
    shoot();
});

invader.actionDidStart(function() {
    invader.setAnimation("moving");
});

invader.actionDidStop(function() {
    invader.setAnimation("idle");
});

player.actionIsRunning(function() {
    if (player.mouseAction.vectorDirection) {
        player.setAnimation("moving-right");
    } else {
        player.setAnimation("moving-left");
    }
});

player.actionDidStop(function() {
    player.setAnimation("idle");
});

class BulletPattern extends Pattern {
    update(){}
}

let bulletPattern = new BulletPattern("level","bullet",0,-4);
game.addPatternToScene(bulletPattern);

function shoot(){
    let bullet = new ShapeSprite("bullet",[bulletShape.frame1, bulletShape.frame2],1,4);
    let p = game.spriteNamed("player");
    bullet.x = p.x;
    bullet.y = p.y;
    game.getSceneNamed("level").addSprite(bullet);
}

game.setCollisionMethod(function(){
    if(game.spriteNamed("bullet") === undefined){return}
});

game.setActiveSceneNamed("level");

