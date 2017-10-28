/******
 * CYL - Label Sprite
 * Copyright MIT license 2017
 */

class LabelSprite {
    constructor(text, font, size, color) {
        //Param Validations
        if (text === undefined) {
            console.error("CYL:[Exception] You need a string to initalize a label sprite");
        }
        if (font === undefined) {
            console.error("CYL:[Exception] You need a font to initalize a label sprite");
        }
        if (size === undefined) {
            console.error("CYL:[Exception] You need font size to initalize a label sprite");
        }
        if(text === undefined){
            console.error("CYL:[Exception] You need a font color to initalize a label sprite");
        }

        this.text = text;
        this.font = font;
        this.size = size;
        this.color = color;
    }

    get ctxFont(){
        return this.size + " " + this.font;
    }
}