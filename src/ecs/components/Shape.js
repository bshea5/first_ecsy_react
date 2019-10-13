const SHAPE_SIZE = 50;

// Shape component
export class Shape {
    constructor() {
        this.primitive = 'box';
        this.size = SHAPE_SIZE;
        this.halfSize = () => this.size / 2;
        this.color = 0x39c495;
        this.borderColor = 0x0b845b;
    }
}