export default class Particle {
    constructor(s) {
        this.s = s;
        this.age = 0;
        [this.x, this.y] = this.restart()
    }

    pos(vs) {
        this.age++;
        if(this.age > 1000) this.restart();
        if(this.x<=0||this.y<=0||this.x>=this.s.w||this.y>=this.s.h) {
            [this.x,this.y] = this.restart();
        }
        const xn = (Math.floor((this.x/this.s.w)*this.s.f))
        const yn = (Math.floor((this.y/this.s.h)*this.s.f))
        this.x += Math.sin(vs[yn][xn]);
        this.y += Math.cos(vs[yn][xn]);
    }

    restart() {
        this.age = 0;
        return [(((Math.random()-.5)*this.s.w)+this.s.w/2),(((Math.random()-.5)*this.s.h)+this.s.h/2)];
    }
}