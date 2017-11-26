/******
 * CYL - Pattern
 * Copyright MIT license 2017
 */

class Pattern {
    constructor(
        scene,
        applyFor,
        xMovement = 0,
        yMovement = 0,
        xProgression = 0,
        yProgression = 0
    ) {
        if (xMovement === undefined || yMovement === undefined) {
            console.warn("CYL:[Warning] X and Y displacemente where set to default of 0");
        }
        if (xProgression === undefined || yProgression === undefined) {
            console.warn("CYL:[Warning] X and Y displacemente where set to default of 0");
        }
        this.scene = scene;
        this.xMovement = xMovement;
        this.yMovement = yMovement;
        this.xProgression = 0;
        this.yProgression = 0;
        this.xMax = 0;
        this.yMax = 0;
        this.cycle = true;
        this.applyFor = applyFor;

        if (this.update === undefined) {
            console.error("CYL:[Exception]Pattern requires a update method to initialize");
        }
    }

    /**
     * Extends requires Update() Method
     */

    get pos() {
        return {
            "x": this.xMovement,
            "y": this.yMovement
        };
    }
}