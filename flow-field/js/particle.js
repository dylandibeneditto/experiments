export default class Particle {
    constructor(x, y, positionFunc, s) {
        this.x = x;
        this.y = y;
        this.start = positionFunc;
        this.s = s;
    }

    pos(vs) {
        const xn = (Math.floor(this.x/this.s.w)/this.s.f)
        const yn = (Math.floor(this.y/this.s.h)/this.s.f)
        this.x += Math.sin(vs[yn][xn]);
        this.y += Math.cos(vs[yn][xn]);
    }

    destroy() {
        [this.x,this.y] = this.start();
    }
}