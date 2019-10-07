// Canvas component
export class Canvas {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.canvasWidth = this.canvas.width = window.innerWidth;
        this.canvasHeight = this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
    }
}