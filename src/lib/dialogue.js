/******
 * CYL - Dialogue Class
 * Copyright MIT license 2017
 */

class Dialogue  {
    constructor(
        labels,
        lineSpace = 55,
        name = "menu",
        focusColor = "orange",
        defaultColor = "white",
        focusZoom = 2,
        x = 50,
        y = 300
    ) {
        //Param Validation
        if (!(Array.isArray(labels))) {
            console.error("CYL:[Exception]Labbels object must be an array of LabelSprites");
            return;
        }
        this.name = name;
        this.kind = "dialogue";
        this.x = x;
        this.y = y;
        this.lineSpace = lineSpace;
        this.labels = labels;
        this.focusIndex = 0;
        this.focusSize = (parseInt(labels[0].size) * focusZoom) + "px"
        this.focusColor = focusColor;
        this.defaultFontSize = labels[0].size;
        this.defaultColor = defaultColor;

        this._placeGrid();
    }

    _placeGrid() {
        for (let i = 0; i < this.labels.length; i++) {
            this.labels[i].y = (this.y + this.lineSpace) + parseInt(i * this.lineSpace);
            this.labels[i].x = this.labels[i].x + this.x;
        }
        this._processFocus();
    }

    _processFocus() {
        for (let i = 0; i < this.labels.length; i++) {
            if (i === this.focusIndex) {
                this.labels[i].size = this.focusSize;
                this.labels[i].color = this.focusColor;
            } else {
                this.labels[i].size = this.defaultFontSize;
                this.labels[i].color = this.defaultColor;
            }
        }
    }

    setFocus(index) {
        if (index < 0 || index > this.labels.length) {
            console.warn("CYL:[Warning] - The focus you are setting is out of range");
            return;
        }
        this.focusIndex = index;
        this._processFocus()
    }

    focusDown() {
        if (this.focusIndex >= this.labels.length - 1) {
            this.focusIndex = 0;
        } else {
            this.focusIndex++;
        }
        this._processFocus();
    }

    focusUp() {
        if (0 >= this.focusIndex) {
            this.focusIndex = this.labels.length - 1;
        } else {
            this.focusIndex--;
        }
        this._processFocus();
    }

    get options() {
        return this.labels;
    }
}