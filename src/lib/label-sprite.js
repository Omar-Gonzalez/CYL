/******
 * CYL - Label Sprite
 * Copyright MIT license 2017
 */

class LabelSprite {
    constructor(
        text,
        size = 25,
        font = "Verdana",
        weight = "normal",
        color = "white",
        textAligment = "centered",
        x = 5,
        y = 30
    ) {
        //Param Validations
        if (text === undefined) {
            console.error("CYL:[Exception] You need a string to initalize a label sprite");
        }

        this.kind = "label";
        //Font properties
        this.text = text;
        this.font = font;
        this.size = size + "px";
        this.weight = weight;
        this.color = color;
        //Container properties
        this.width;
        this.x = x;
        this.y = y;
    }

    get ctxFont() {
        return this.weight + " " + this.size + " " + this.font;
    }

    get frame() {
        return {
            'width': parseInt(this.width),
            'height': parseInt(this.size)
        }
    }
}