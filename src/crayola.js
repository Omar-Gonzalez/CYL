/******
 * Crayola ES6 Game Dev Tools 
 * Omar Gonzalez Rocha - Copyright MIT license 2017
 * Conventions: 
 * _underscore for pseudo private methods 
 */

//Lib Imports
//@prepros-prepend ./lib/utils.js
//@prepros-prepend ./lib/scene.js
//@prepros-prepend ./lib/shape-sprite.js
//@prepros-prepend ./lib/game.js

//Scene Config 
let pixelSize = 10;

let screenSize = {
    "width": "100%",
    "height": "100%"
};

let idle1 = {
    "set": "idle",
    "shape": [
        "transparent", "white", "white", "transparent",
        "red", "white", "red", "white",
        "white", "white", "white", "white",
        "red", "red", "red", "white",
        "transparent", "white", "white", "transparent",
    ]
}

let idle2 = {
    "set": "idle",
    "shape": [
        "transparent", "white", "white", "transparent",
        "white", "red", "white", "red",
        "white", "white", "white", "white",
        "white", "red", "red", "red",
        "transparent", "white", "white", "transparent",
    ]

}

let moving1 = {
    "set": "moving",
    "shape": [
        "transparent", "white", "white", "transparent",
        "white", "red", "white", "red",
        "white", "white", "white", "white",
        "white", "red", "red", "red",
        "white", "white", "white", "white",
    ]
}

let moving2 = {
    "set": "moving",
    "shape": [
        "white", "white", "white", "white",
        "red", "white", "red", "white",
        "white", "white", "white", "white",
        "red", "red", "red", "white",
        "transparent", "white", "white", "transparent",
    ]
}

let player = new ShapeSprite(
    "player", [idle1, idle2, moving1, moving2], 4, 20, "A"
)

let eIdle1 = {
    "set": "idle",
    "shape": [
        "orange", "red", "red", "orange",
        "orange", "red", "red", "orange",
        "red", "orange", "orange", "red",
        "red", "red", "red", "red",
        "red", "red", "red", "red",
    ]
}

let eIdle2 = {
    "set": "idle",
    "shape": [
        "red", "red", "red", "red",
        "red", "red", "red", "red",
        "red", "orange", "orange", "red",
        "orange", "red", "red", "orange",
        "orange", "red", "red", "orange",
    ]
}

let enemy = new ShapeSprite(
    "enemy", [eIdle1, eIdle2], 4, 10, "A"
)

let scene = new Scene([player, enemy], pixelSize, screenSize);

player.x = scene.frame.width / 2;
player.y = scene.frame.height / 2;

enemy.x = scene.frame.width / 3;
enemy.y = scene.frame.height / 3;

docReady(function() {
    let game = new Game([scene]);
    game.mouseClick();
    game.keyPress();
    game.run();
});