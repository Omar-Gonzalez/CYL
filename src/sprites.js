// 1 - Initialize Sprites

let invShape = {};
let bulletShape = {};
let c = {
    t: "transparent",
    p: "#6A1B9A",
    o: "#FF9800",
    r: "#FF5722"
};

bulletShape.frame1 = {
    "set": "idle",
    "shape": [
        c.r,
        c.o,
        c.r,
    ] 
};

bulletShape.frame2 = {
    "set": "idle",
    "shape": [
        c.o,
        c.r,
        c.o,
    ] 
};

invShape.idle1 = {
    "set": "idle",
    "shape": [
        c.t, c.p, c.t, c.t, c.t, c.t, c.p, c.t,
        c.t, c.t, c.p, c.t, c.t, c.p, c.t, c.t,
        c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.t,
        c.p, c.p, c.t, c.p, c.p, c.t, c.p, c.p,
        c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p,
        c.p, c.t, c.p, c.p, c.p, c.p, c.t, c.p,
        c.p, c.t, c.p, c.t, c.t, c.p, c.t, c.p,
    ]
};

invShape.idle2 = {
    "set": "idle",
    "shape": [
        c.p, c.p, c.t, c.t, c.t, c.t, c.p, c.p,
        c.t, c.t, c.p, c.t, c.t, c.p, c.t, c.t,
        c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.t,
        c.p, c.p, c.t, c.p, c.p, c.t, c.p, c.p,
        c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p,
        c.p, c.t, c.t, c.t, c.t, c.t, c.t, c.p,
        c.p, c.p, c.p, c.t, c.t, c.p, c.p, c.p,
    ]
};

invShape.moving1 = {
    "set": "moving",
    "shape": [
        c.p, c.t, c.t, c.t, c.t, c.t, c.t, c.p,
        c.t, c.p, c.t, c.t, c.t, c.t, c.p, c.t,
        c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.t,
        c.p, c.p, c.o, c.p, c.p, c.o, c.p, c.p,
        c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p,
        c.p, c.t, c.p, c.p, c.p, c.p, c.t, c.p,
        c.p, c.t, c.p, c.t, c.t, c.p, c.t, c.p,
    ]
};

invShape.moving2 = {
    "set": "moving",
    "shape": [
        c.p, c.p, c.t, c.t, c.t, c.t, c.p, c.p,
        c.t, c.t, c.p, c.t, c.t, c.p, c.t, c.t,
        c.t, c.p, c.p, c.p, c.p, c.p, c.p, c.t,
        c.p, c.p, c.o, c.p, c.p, c.o, c.p, c.p,
        c.p, c.p, c.p, c.p, c.p, c.p, c.p, c.p,
        c.p, c.o, c.o, c.o, c.o, c.o, c.o, c.p,
        c.p, c.p, c.p, c.t, c.t, c.p, c.p, c.p,
    ]
};

let pShape = {};

pShape.idle1 = {
    "set": "idle",
    "shape": [
        c.t, c.t, c.t, c.t, c.o, c.t, c.t,
        c.t, c.t, c.t, c.o, c.o, c.o, c.t,
        c.t, c.t, c.o, c.o, c.o, c.o, c.o,
    ]
};

pShape.idle2 = {
    "set": "idle",
    "shape": [
        c.t, c.t, c.o, c.t, c.t, c.t, c.t,
        c.t, c.o, c.o, c.o, c.t, c.t, c.t,
        c.o, c.o, c.o, c.o, c.o, c.t, c.t,
    ]
};

pShape.mLeft1 = {
    "set": "moving-left",
    "shape": [
        c.t, c.t, c.o, c.t, c.t, c.t, c.t,
        c.t, c.o, c.o, c.o, c.t, c.r, c.t,
        c.o, c.o, c.o, c.o, c.o, c.t, c.r,
    ]
};

pShape.mLeft2 = {
    "set": "moving-left",
    "shape": [
        c.t, c.t, c.o, c.t, c.t, c.t, c.t,
        c.t, c.o, c.o, c.o, c.r, c.t, c.r,
        c.o, c.o, c.o, c.o, c.o, c.r, c.t,
    ]
};

pShape.mRight1 = {
    "set": "moving-right",
    "shape": [
        c.t, c.t, c.t, c.t, c.o, c.t, c.t,
        c.r, c.t, c.r, c.o, c.o, c.o, c.t,
        c.t, c.r, c.o, c.o, c.o, c.o, c.o,
    ]
};

pShape.mRight2 = {
    "set": "moving-right",
    "shape": [
        c.t, c.t, c.t, c.t, c.o, c.t, c.t,
        c.t, c.r, c.t, c.o, c.o, c.o, c.t,
        c.r, c.t, c.o, c.o, c.o, c.o, c.o,
    ]
};