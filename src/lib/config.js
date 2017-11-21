/******
 * CYL - Config Globals
 * Copyright MIT license 2017
 */

var CFG = CFG || {};

//Device
CFG.DEVICE = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return "mobile";
    }else{
        return "desktop";
    }
};

//Screen Config 
CFG.SCREEN = function() {
    //Set Accordingily 
    let pixelSize = 10;
    let predefinedPixel = "L" //S,M,L //set to null if you want a fixed dimension
    let apectRatio = null; //[16, 9];
    let percentual = [100, 100]; //null or ser w % or h &

    if (predefinedPixel === "S") {
        pixelSize = window.innerWidth / 200;
    }
    if (predefinedPixel === "M") {
        pixelSize = window.innerWidth / 150;
    }
    if (predefinedPixel === "L") {
        pixelSize = window.innerWidth / 100;
    }

    let width;
    let height;

    if (percentual) {
        let verticalMargin = (100 - percentual[1]) / 2;
        document.getElementById('screen').style.marginTop = verticalMargin + "%";
        width = percentual[0] + "%";
        height = percentual[1] + "%"
    }

    if (apectRatio) {
        width = window.innerWidth;
        height = parseFloat((width / apectRatio[0]) * apectRatio[1]);
        let verticalMargin = (window.innerHeight - height) / 2;
        document.getElementById('screen').style.marginTop = verticalMargin + "px";
        width = width + "px";
        height = height + "px";
    }

    return {
        'pixelSize': pixelSize,
        'screen': {
            'width': width,
            'height': height
        }
    };
};

CFG.FONTSIZE = function(fontSize){
    let width = window.innerWidth;

    if(fontSize === "small"){
        if(width < 768){
            return "12px";
        }
        if(width > 768 && width < 1028){
            return "16px";
        }
        if(width > 1028){
            return "20px";
        }       
    }
    if(fontSize === "medium"){
        if(width < 768){
            return "20px";
        }
        if(width > 768 && width < 1028){
            return "40px";
        }
        if(width > 1028){
            return "50px";
        }
    }
    if(fontSize === "large"){
        if(width < 768){
            return "28px";
        }
        if(width > 768 && width < 1028){
            return "50px";
        }
        if(width > 1028){
            return "70px";
        }
    }
};

window.addEventListener("resize", () => {
    window.CFG.SCREEN();
});