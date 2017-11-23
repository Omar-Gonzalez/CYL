/******
 * CYL - Config Globals
 * Copyright MIT license 2017
 */

class Config {
    constructor() {
        this.predefinedPixel = "l";
        this.screenKind = "full";
        this.dimension = [100, 100];
    }

    get DEVICE() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return "mobile";
        } else {
            return "desktop";
        }
    }

    setScreen(kind,dimension){
        if(kind === undefined){
            console.error("CYL:[Exception]CFG.setScreen requires kind fixed | full | percentual] parameter");
            return;
        }
        if(dimension === undefined){
            console.error("CYL:[Warning]CFG.setScreen no dimension parameter, dimesion will set to default 100x100");
        }

        this.dimension = dimension;
        this.screenKind = kind;
        let sDiv = document.getElementById("screen");
        sDiv.style.width = this.dimension[0]+"px";
        sDiv.style.height = this.dimension[1]+"px";
    }

    get SCREEN() {

        let width;
        let height;
        let verticalMargin = 0;

        if (this.screenKind === "percentual") {
            verticalMargin = (100 - this.dimension[1]) / 2;
            document.getElementById('screen').style.marginTop = verticalMargin + "%";
            width = this.dimension[0] + "%";
            height = this.dimension[1] + "%"
        }

        if (this.screenKind === "aspect-ratio") {
            width = window.innerWidth;
            height = parseFloat((width / this.dimension[0]) * this.dimension[1]);
            verticalMargin = (window.innerHeight - height) / 2;
            document.getElementById('screen').style.marginTop = verticalMargin + "px";
            width = width + "px";
            height = height + "px";
        }

        if (this.screenKind === "fixed") {
            width = this.dimension[0]+"px";
            height = this.dimension[1]+"px";

            if (this.predefinedPixel === "s") {
                this.pixelSize = document.getElementById("screen").offsetWidth / 200;
            }
            if (this.predefinedPixel === "m") {
                this.pixelSize = document.getElementById("screen").offsetWidth / 150;
            }
            if (this.predefinedPixel === "l") {
                this.pixelSize = document.getElementById("screen").offsetWidth / 100;
            }
        }

        if (this.screenKind === "full") {
            width = "100%";
            height = "100%";
        }

        return {
            "width": width,
            "height": height,
            "verticalMargin":verticalMargin,
            "horizontalMargin":(window.innerWidth - document.getElementById("game").offsetWidth)/2
        };
    }

    get PIXELSIZE() {
        if (this.predefinedPixel === "s") {
            this.pixelSize = document.getElementById('screen').offsetWidth / 200;
        }
        if (this.predefinedPixel === "m") {
            this.pixelSize = document.getElementById('screen').offsetWidth / 150;
        }
        if (this.predefinedPixel === "l") {
            this.pixelSize = document.getElementById('screen').offsetWidth / 100;
        }
        return this.pixelSize;
    }

    FONTSIZE(fontSize) {
        let width = document.getElementById('screen').offsetWidth;

        if (fontSize === "small") {
            if (width < 768) {
                return "12px";
            }
            if (width > 768 && width < 1028) {
                return "16px";
            }
            if (width > 1028) {
                return "20px";
            }
        }
        if (fontSize === "medium") {
            if (width < 768) {
                return "20px";
            }
            if (width > 768 && width < 1028) {
                return "40px";
            }
            if (width > 1028) {
                return "50px";
            }
        }
        if (fontSize === "large") {
            if (width < 768) {
                return "28px";
            }
            if (width > 768 && width < 1028) {
                return "50px";
            }
            if (width > 1028) {
                return "70px";
            }
        }
    }
}

let CFG = new Config();

// window.addEventListener("resize", () => {
//     window.CFG.SCREEN;
// });