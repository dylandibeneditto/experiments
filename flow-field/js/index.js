import Particle from "./particle.js";

import perlinVectors from "./perlin.js";

let s = {
    w: window.innerWidth,
    h: window.innerHeight,
    //  frequency of vector map
    f: Math.min(window.innerWidth/2, window.innerHeight/2)
}

let pcount = 10000;
//let a = 0;

const colors = [
    (c)=>{return [255,c*240,c*240,c]}, // red
    (c)=>{return [255,(c*100)+155,c*255,c]}, // orange
    (c)=>{return [255,255,c*255,c]}, // yellow
    (c)=>{return [(c*100)+155,255,c*255,c]}, // green
    (c)=>{return [c*255,(c*100)+155,255,c]}, // blue
    (c)=>{return [(c*150)+105,c*255,255,c]}, // indigo
    (c)=>{return [255,(c*200)+55,255,c]}, // purple
]

let curColor = 0;

let vs = perlinVectors(s.w,s.h);

const canvas = document.getElementById('canvas');

canvas.width = s.w;
canvas.height = s.h;
canvas.addEventListener('click', ()=> {
    curColor = (curColor+1)%colors.length;
})


const c = canvas.getContext('2d');

let part = []
for (let i = 0; i < pcount; i++) {
    part.push(new Particle(s))
}

c.fillRect(0,0,s.w,s.h)

animate();

function animate() {

    //a += .01

    //c.clearRect(0, 0, s.w, s.h);

    /*for (let y = 0; y < s.f; y++) {
        vs.push([])
        for (let x = 0; x < s.f; x++) {
            //vs[y][x] = Math.random()*(2*Math.PI)
            //vs[y][x] = a
            //vs[y][x] = a + x + y
            vs[y][x] = a
            /*c.beginPath()
            const px = x * (s.w / s.f) + ((s.w / s.f) / 2)
            const py = y * (s.h / s.f) + ((s.h / s.f) / 2)
            c.moveTo(px, py)
            c.lineTo(px + Math.sin(vs[y][x]) * ((s.w / s.f) / 2), py + Math.cos(vs[y][x]) * ((s.h / s.f) / 2))
            c.stroke()
        }
    }*/

    part.forEach(item => {
        item.pos(vs)
        const color = Math.min(item.age/10000,1);
        c.fillStyle = `rgba(${colors[curColor](color)[0]}, ${colors[curColor](color)[1]}, ${colors[curColor](color)[2]}, ${colors[curColor](color)[3]})`;
        c.fillRect(item.x, item.y, 1, 1)
    })

    requestAnimationFrame(animate)
}