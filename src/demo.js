/**
 * Created by Omar Gonzalez on 7/30/2017.
 */

window.game = new Game();
game.run();

let ghost = new Sprite(
    [
        0, 1, 1, 1, 0,
        1, 0, 1, 0, 1,
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1,
    ], 5
)

let c = new Sprite(
    [
        0, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 1,
        1, 1, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1,
        0, 1, 1, 1, 1, 0
    ], 6
)

let y = new Sprite(
    [
        1, 1, 0, 0, 1, 1,
        1, 1, 0, 0, 1, 1,
        1, 1, 0, 0, 1, 1,
        1, 1, 0, 0, 1, 1,
        0, 1, 0, 0, 1, 0,
        0, 0, 1, 1, 0, 0,
        0, 0, 1, 1, 0, 0,
        0, 0, 1, 1, 0, 0,
        0, 1, 1, 1, 1, 0
    ], 6
)


let l = new Sprite(
    [
        1, 1, 1, 0, 0, 0,
        1, 1, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1
    ], 6
)

let baseY = parseInt((scene.height / 3) - 6);
let baseX = parseInt(scene.width / 5);

c.y = baseY;
c.x = baseX;
y.y = baseY;
y.x = baseX + (12*scene.pixelSize);
l.y = baseY;
l.x = baseX + (24*scene.pixelSize);

game.sprites = [c, y, l];

let up = true;

function moveStuff() {
    if (up) {
        c.y = c.y - (3 * scene.pixelSize);
        l.y = l.y - (3 * scene.pixelSize);
        y.y = y.y + (3 * scene.pixelSize);
        up = false;
    } else {
        c.y = c.y + (3 * scene.pixelSize);
        l.y = l.y + (3 * scene.pixelSize);
        y.y = y.y - (3 * scene.pixelSize);
        up = true;
    }
    setTimeout(moveStuff, 500);
}
moveStuff();

game.sprites.push(ghost)

ghost.y = baseY
ghost.x = baseX + 150;


