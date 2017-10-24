/******
 * Crayola - Bitmap Sprite
 * Omar Gonzalez Rocha - Copyright MIT license 2017
 */

class BitmapSprite {

    constructor(
        name,
        bitmaps,
        width = 50,
        height = 50,
        tick = 20,
        contactGroup = null,
        x = 0,
        y = 0
    ) {
        //Param Validation
        if (name === undefined) {
            console.log("CYL:Warning, no name identifier for sprite");
        }
        if (!(Array.isArray(bitmaps))) {
            console.log("CYL:[Exception]Bitmaps object must be an array");
            return;
        }
        if (bitmaps === undefined) {
            console.log("CYL:[Exception]You need at least one bitmap to initialize a sprite");
            return;
        }
        if (height === 50 && width === 50) {
            console.log("CYL:Warning, bitmap sprite dimensions set to default 50x50");
        }

        //Props Definition:
        this.kind = "bitmap";
        this.name = name;
        this.bitmaps = bitmaps;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        //animation related props
        this.tick = tick;
        this.frameCount = 0;
        //Contact detection props
        this.contactGroup = contactGroup;

        this.setAnimation()
    }

    setAnimation(named) {
        this.spriteFrames = []; //clean active frames before setting them again
        if (named === undefined) {
            this.activeAnimation = "idle";
        } else {
            this.activeAnimation = named;
        }
        let activeCount = 0;

        for (let bitmap of this.bitmaps) {
            if (bitmap.set === this.activeAnimation) {
                let img = new Image();
                img.src = bitmap.src;
                img.width = this.width;
                img.height = this.height;
                this.spriteFrames.push(img);
                activeCount++;
            }
        }
        if (activeCount === 0) {
            console.log("CYL:[Exception]No active frames in srite");
            return;
        }
        this.frameCount = activeCount;
    }

    setDimension(x, y) {
        this.spriteFrames = [];
        for (let bitmap of this.bitmaps) {
            if (bitmap.set === this.activeAnimation) {
                let img = new Image();
                img.src = bitmap.src;
                img.width = x;
                img.height = x;
                this.spriteFrames.push(img);
            }
        }
    }

    get frames() {
        return this.spriteFrames;
    }

}