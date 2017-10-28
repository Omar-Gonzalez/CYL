/******
 * CYL - Bitmap Sprite
 * Copyright MIT license 2017
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
            console.warn("CYL:Warning, no name identifier for sprite");
        }
        if (!(Array.isArray(bitmaps))) {
            console.error("CYL:[Exception]Bitmaps object must be an array");
            return;
        }
        if (bitmaps === undefined) {
            console.error("CYL:[Exception]You need at least one bitmap to initialize a sprite");
            return;
        }
        if (height === 50 && width === 50) {
            console.warn("CYL:Warning, bitmap sprite dimensions set to default 50x50");
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
        this.tickCounter = 0;
        this.frameCount = 0;
        this.currentFrameIndex = 0;
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
            console.error("CYL:[Exception]No active frames in srite");
            return;
        }
        this.frameCount = activeCount;
    }
    get bounds() {
        return {
            "maxX": this.width + this.x,
            "minX": this.x,
            "minY": this.y,
            "maxY": this.height + this.y
        }
    }
    inContactWith(sprite) {
        let xContact = false;
        let yContact = false;
        if ((this.bounds.maxX).between(sprite.bounds.minX, sprite.bounds.maxX) ||
            (this.bounds.minX).between(sprite.bounds.minX, sprite.bounds.maxX)) {
            xContact = true;
        }
        if ((this.bounds.maxY).between(sprite.bounds.minY, sprite.bounds.maxY) ||
            (this.bounds.minY).between(sprite.bounds.minY, sprite.bounds.maxY)) {
            yContact = true;
        }
        if (xContact === true && yContact === true) {
            return {
                'inContact': true,
                'contactWith': this.name + " in contact with " + sprite.name
            }
        } else {
            return {
                'inContact': false
            }
        }
    }
    inCollisionWith(sprite) {
        let xCollision = false;
        let yCollision = false;
        if ((this.bounds.maxX).between(sprite.bounds.minX, sprite.bounds.maxX) ||
            (this.bounds.minX).between(sprite.bounds.minX, sprite.bounds.maxX)) {
            xCollision = true;
        }
        if ((this.bounds.maxY).between(sprite.bounds.minY, sprite.bounds.maxY) ||
            (this.bounds.minY).between(sprite.bounds.minY, sprite.bounds.maxY)) {
            yCollision = true;
        }
        if (xCollision === true && yCollision === true) {
            //if in collision prevent futher movement
            return {
                'inCollision': true,
                'collisionWith': this.name + " in collision with " + sprite.name
            }
        } else {
            return {
                'inCollision': false
            }
        }
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
    get currentFrame() {
        return this.spriteFrames[this.currentFrameIndex];
    }
    get frames() {
        return this.spriteFrames;
    }
}