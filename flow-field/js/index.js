import Particle from "./particle.js";

let s = {
    w: window.innerWidth,
    h: window.innerHeight,
    //  frequency of vector map
    f: 100
}

let pcount = 100
let a = 0;

let vs = [];

const canvas = document.getElementById('canvas');

canvas.width = s.w;
canvas.height = s.h;

const c = canvas.getContext('2d');

let part = []
for (let i = 0; i < pcount; i++) {
    part.push(new Particle(s))
}

animate();

function animate() {

    a += .01

    c.clearRect(0, 0, s.w, s.h);

    for (let y = 0; y < s.f; y++) {
        vs.push([])
        for (let x = 0; x < s.f; x++) {
            vs[y][x] = a
            c.beginPath()
            const px = x * (s.w / s.f) + ((s.w / s.f) / 2)
            const py = y * (s.h / s.f) + ((s.h / s.f) / 2)
            c.moveTo(px, py)
            c.lineTo(px + Math.sin(vs[y][x]) * ((s.w / s.f) / 2), py + Math.cos(vs[y][x]) * ((s.h / s.f) / 2))
            c.stroke()
        }
    }

    part.forEach(item => {
        item.pos(vs)
        c.fillRect(item.x - 5, item.y - 5, 10, 10)
    })


    requestAnimationFrame(animate)
}