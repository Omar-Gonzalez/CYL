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
let pixelSize = 5;

let screenSize = {
    "width": "100%",
    "height": "100%"
};

let sprite = new ShapeSprite(
    "player", [
        "transparent", "white", "white", "transparent",
        "white", "red", "white", "red",
        "white", "white", "white", "white",
        "white", "red", "red", "red",
        "transparent", "white", "white", "transparent",
    ], 4
)

let scene = new Scene([sprite], pixelSize, screenSize);

let game = new Game([scene]);
game.mouseClick();
game.keyPress();
game.run();