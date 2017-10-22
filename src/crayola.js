/******
 * Crayola ES6 Game Dev Tools 
 * Omar Gonzalez Rocha - Copyright MIT license 2017
 * Conventions: 
 * _underscore for pseudo private methods 
 */

//Lib Imports
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

let sprite = new ShapeSprite(
    "player", [idle1, idle2, moving1, moving2], 4
)

let scene = new Scene([sprite], pixelSize, screenSize);

let game = new Game([scene]);
game.mouseClick();
game.keyPress();
game.run();