/**
 * Created by Omar Gonzalez on 7/30/2017.
 */
window.scene= new Scene(8);
window.scene.drawFrame();
window.game = new Game();
game.run();

let ghost = new Sprite(
    5,
    [
        0,1,1,1,0,
        1,0,1,0,1,
        1,1,1,1,1,
        1,0,0,0,1,
        1,1,1,1,1,
    ]
)

let c = new Sprite(
    6,
    [
        0,1,1,1,1,0,
        1,1,1,1,1,1,
        1,1,0,0,0,1,
        1,1,0,0,0,0,
        1,1,0,0,0,0,
        1,1,0,0,0,0,
        1,1,0,0,0,1,
        1,1,1,1,1,1,
        0,1,1,1,1,0
    ]
)

let y = new Sprite(
    6,
    [
        1,1,0,0,1,1,
        1,1,0,0,1,1,
        1,1,0,0,1,1,
        1,1,0,0,1,1,
        0,1,0,0,1,0,
        0,0,1,1,0,0,
        0,0,1,1,0,0,
        0,0,1,1,0,0,
        0,1,1,1,1,0
    ]
)


let l = new Sprite(
    6,
    [
        1,1,1,0,0,0,
        1,1,0,0,0,0,
        1,1,0,0,0,0,
        1,1,0,0,0,0,
        1,1,0,0,0,0,
        1,1,0,0,0,0,
        1,1,0,0,0,1,
        1,1,1,1,1,1,
        1,1,1,1,1,1
    ]
)

let baseY = parseInt((scene.frame.height / 2) - 6);
let baseX = parseInt(scene.frame.width / 3);

c.y = baseY;
c.x = baseX
y.y = baseY;
y.x = baseX + 12;
l.y = baseY;
l.x = baseX + 24;

game.sprites = [c,y,l];

let up = true;

function moveStuff(){
    if (up){
        c.y = c.y - 3;
        l.y = l.y - 3;
        y.y = y.y + 3;
        up = false;
    }else{
        c.y = c.y + 3;
        l.y = l.y + 3;
        y.y = y.y - 3;
        up = true;
    }
    setTimeout(moveStuff,500);
}
moveStuff();
