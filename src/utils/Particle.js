export class Particle {
    constructor(cantainer, radiux, options) {
        this.radiux = radiux;
        this.options = options || {};
        this.cantainer = document.getElementById(cantainer);

        this.canvas = this.initCanvas();
        this.cantainer.insertBefore(this.canvas, this.cantainer.firstChild);

        this.ctx = this.canvas.getContext('2d');
        this.colors = ['#ed1941', '#f05b72', '#ef4136', '#f15a22', '#8e3e1f', '#fcaf17', '#b76f40', '#00ae9d', '#009ad6', '#1d953f', '#426ab3', '#6950a1', '#74787c', '#2a5caa'];
    }
    initCanvas() {
        const canvas = document.createElement('canvas');
        this.width = this.options.width || this.cantainer.clientWidth;
        this.height = this.options.height || this.cantainer.clientHeight;
        canvas.setAttribute('display', `block`);
        canvas.setAttribute('width', `100%`);
        canvas.setAttribute('height', `100%`);

        return canvas;
    }

    setSize(width, height) {

    }
}
