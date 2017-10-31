/******
 * CYL ES6 Game Dev Tools 
 * Copyright MIT license 2017
 * Conventions: 
 * _underscore for pseudo private methods 
 */

//Lib Concatenation
//@prepros-prepend ./lib/utils.js
//@prepros-prepend ./lib/config.js
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

let c = {
    t: "transparent",
    p: "#6A1B9A"
};

let idle1 = {
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

let idle2 = {
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


let invader = new ShapeSprite("invadder", [idle1, idle2], 8, 15);
let notice = new LabelSprite("CYL:Game Development Tools 2017", 15);
let title = new LabelSprite("WEB INVADERS", 60);
let start = new LabelSprite("Start", 30);
let topScores = new LabelSprite("Top Scores", 30);
let dialogue = new Dialogue([start,topScores]);
let menu = new Scene([invader, notice, title,dialogue]);
let level = new Scene([notice]);
let game = new Game([menu,level]);
game.run();

// 2 - Set up scene
notice.y = menu.frame.height - 50;
notice.x = menu.frame.width / 2 - notice.frame.width / 2;
title.y = menu.frame.height / 2;
title.x = menu.frame.width / 2 - title.frame.width / 2;
invader.y = menu.frame.height / 2 - invader.frame.height;
invader.x = title.x - 140;
dialogue.updatePos(title.x, menu.frame.height / 2 );

//3- Set Input 
let input = new Input();

input.arrowUp(function(){
    dialogue.focusUp();
});

input.arrowDown(function(){
    dialogue.focusDown();
});

input.spaceBar(function(){
    if (dialogue.focusIndex === 0){
        //game start
        alert("Not yet implemented ;)");
    }
    if (dialogue.focusIndex === 1){
        //show top scores
        alert("Not yet implemented ;)");
    }
});


