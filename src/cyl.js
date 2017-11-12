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
//@prepros-prepend ./lib/game.js

/***
 __      _____| |__   (_)_ ____   ____ _  __| | ___ _ __ ___ 
 \ \ /\ / / _ \ '_ \  | | '_ \ \ / / _` |/ _` |/ _ \ '__/ __|
  \ V  V /  __/ |_) | | | | | \ V / (_| | (_| |  __/ |  \__ \
   \_/\_/ \___|_.__/  |_|_| |_|\_/ \__,_|\__,_|\___|_|  |___/ 
   -----
   Sample Game:
*/

// 1 - Initialize components

let invShape = {};

let c = {
    t: "transparent",
    p: "#6A1B9A",
    o: "#FF9800",
    r: "#FF5722"
};

invShape.idle1 = {
    "set": "idle",
    "shape": [
        c.t, c.p, c.t, c.t, c.t, c.t, c.p, c.t,
        c.t, c.t, c.p, c.t, c.t, c.p, c.t, c.t,
        c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.t,
        c.p, c.p, c.t, c.p, c.p, c.t, c.p, c.p,
        c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p,
        c.p, c.t, c.p, c.p, c.p, c.p, c.t, c.p,
        c.p, c.t, c.p, c.t, c.t, c.p, c.t, c.p,
    ]
};

invShape.idle2 = {
    "set": "idle",
    "shape": [
        c.p, c.p, c.t, c.t, c.t, c.t, c.p, c.p,
        c.t, c.t, c.p, c.t, c.t, c.p, c.t, c.t,
        c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.t,
        c.p, c.p, c.t, c.p, c.p, c.t, c.p, c.p,
        c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p,
        c.p, c.t, c.t, c.t, c.t, c.t, c.t, c.p,
        c.p, c.p, c.p, c.t, c.t, c.p, c.p, c.p,
    ]
};

invShape.moving1 = {
    "set": "moving",
    "shape": [
        c.p, c.t, c.t, c.t, c.t, c.t, c.t, c.p,
        c.t, c.p, c.t, c.t, c.t, c.t, c.p, c.t,
        c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.t,
        c.p, c.p, c.o, c.p, c.p, c.o, c.p, c.p,
        c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p,
        c.p, c.t, c.p, c.p, c.p, c.p, c.t, c.p,
        c.p, c.t, c.p, c.t, c.t, c.p, c.t, c.p,
    ]
};

invShape.moving2 = {
    "set": "moving",
    "shape": [
        c.p, c.p, c.t, c.t, c.t, c.t, c.p, c.p,
        c.t, c.t, c.p, c.t, c.t, c.p, c.t, c.t,
        c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.t,
        c.p, c.p, c.o, c.p, c.p, c.o, c.p, c.p,
        c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p,
        c.p, c.o, c.o, c.o, c.o, c.o, c.o, c.p,
        c.p, c.p, c.p, c.t, c.t, c.p, c.p, c.p,
    ]
};

let pShape = {};

pShape.idle1 = {
    "set": "idle",
    "shape": [
        c.t, c.t, c.t, c.t, c.o, c.t, c.t,
        c.t, c.t, c.t, c.o, c.o, c.o, c.t,
        c.t, c.t, c.o, c.o, c.o, c.o, c.o,
    ]
};

pShape.idle2 = {
    "set": "idle",
    "shape": [
        c.t, c.t, c.o, c.t, c.t, c.t, c.t,
        c.t, c.o, c.o, c.o, c.t, c.t, c.t,
        c.o, c.o, c.o, c.o, c.o, c.t, c.t,
    ]
};

pShape.mLeft1 = {
    "set": "moving-left",
    "shape": [
        c.t, c.t, c.o, c.t, c.t, c.t, c.t,
        c.t, c.o, c.o, c.o, c.t, c.r, c.t,
        c.o, c.o, c.o, c.o, c.o, c.t, c.r,
    ]
};

pShape.mLeft2 = {
    "set": "moving-left",
    "shape": [
        c.t, c.t, c.o, c.t, c.t, c.t, c.t,
        c.t, c.o, c.o, c.o, c.r, c.t, c.r,
        c.o, c.o, c.o, c.o, c.o, c.r, c.t,
    ]
};

pShape.mRight1 = {
    "set": "moving-right",
    "shape": [
        c.t, c.t, c.t, c.t, c.o, c.t, c.t,
        c.r, c.t, c.r, c.o, c.o, c.o, c.t,
        c.t, c.r, c.o, c.o, c.o, c.o, c.o,
    ]
};

pShape.mRight2 = {
    "set": "moving-right",
    "shape": [
        c.t, c.t, c.t, c.t, c.o, c.t, c.t,
        c.t, c.r, c.t, c.o, c.o, c.o, c.t,
        c.r, c.t, c.o, c.o, c.o, c.o, c.o,
    ]
};

let invader = new ShapeSprite("invadder", [invShape.idle1, invShape.idle2, invShape.moving1, invShape.moving2], 8, 15);
let player = new ShapeSprite("player", [pShape.idle1, pShape.idle2, pShape.mLeft1, pShape.mLeft2, pShape.mRight1, pShape.mRight2], 7, 12);
let notice = new LabelSprite("CYL:Game Development Tools 2017", 15);
let title = new LabelSprite("WEB INVADERS", 60);
let start = new LabelSprite("Start", 30);
let topScores = new LabelSprite("Top Scores", 30);
let dialogue = new Dialogue([start, topScores]);
let menu = new Scene("menu", [invader, notice, title, dialogue, player]);
let level = new Scene("level", [notice]);
let game = new Game([menu, level]);
game.run();

// 2 - Set up scene
// Start Screen
notice.y = menu.frame.height - 50;
notice.x = menu.frame.width / 2 - notice.frame.width / 2;
title.y = menu.frame.height / 2;
title.x = menu.frame.width / 2 - title.frame.width / 2;
invader.y = menu.frame.height / 2 - invader.frame.height;
invader.x = title.x - 140;
player.x = menu.frame.width / 2 - player.frame.width / 2;
player.y = menu.frame.height - 150;
dialogue.updatePos(title.x, menu.frame.height / 2);

// Game Scene

class InvaderPattern {
    constructor(level) {
        this.xOffset = level.frame.width / 4;
        this.yOffset = level.frame.height / 6;

        let yRow = 0;
        let xRow = 0;
        for (let i = 0; i < 12; i++) {
            let invader = new ShapeSprite("invader", [invShape.idle1, invShape.idle2, invShape.moving1, invShape.moving2], 8, 15);
            invader.x = this.xOffset * i;
            if(i === 4 || i === 8){
                yRow++;
                xRow = 0;
            }
            invader.x = this.xOffset * xRow;
            invader.y = this.yOffset * yRow;
            xRow++;
            game.getSceneNamed("level").addSprite(invader);
        }
    }
}

let invPattern = new InvaderPattern(level);


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

input.escape(function(){
    game.setActiveSceneNamed("menu");
});

input.click(function(e) {
    invader.mouseActionUpdate(e.x, e.y);
    player.mouseActionUpdate(e.x, e.y);
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

