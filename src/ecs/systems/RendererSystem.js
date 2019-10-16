import { System } from "ecsy";
import * as PIXI from 'pixi.js'
// import { canvasWidth, canvasHeight, ctx } from "../../CanvasOne";
import { Position } from "../components/Position";
import { Shape } from "../components/Shape";
import { Selectable } from "../components/Selectable";
import { Renderable } from "../components/Renderable";
import { Sprite } from "../components/Sprite";

const app = new PIXI.Application({ 
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true 
});
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();

const selectedColor = 0xade6e6;
const selectedBorderColor = 0xadd8e6;

// RendererSystem
class RendererSystem extends System {
    // This method will get called on every frame by default
    execute(delta, time) {
        graphics.clear();

        // Iterate through all the entities on the query
        this.queries.shapes.results.forEach(entity => {
            var shape = entity.getComponent(Shape);
            var position = entity.getComponent(Position);

            // get if has component selectable and if selected
            var select = entity.getComponent(Selectable) || false;
                select = select.selected || false;

            this.drawShape(position, shape, select);
        });

        app.stage.addChild(graphics);
    }

    drawShape(position, shape, selected=false) {
        var color = !selected ? shape.color : selectedColor;
        var borderColor = !selected ? shape.borderColor : selectedBorderColor;
        
        if (shape.primitive === 'box') {
            this.drawBox(position, shape.size, shape.halfSize(), color, borderColor, selected);
        } else if (shape.primitive === 'triangle') {
            this.drawTriangle(position, shape.size, shape.halfSize(), color, borderColor, selected);
        } else {
            this.drawCircle(position, shape.halfSize(), color, borderColor, selected);
        }
    }

    // NOTE: There seems to be a bug when drawing a large number of circles.
    //       Drawing a large number of them will cause tearing in many of them.
    drawCircle(position, halfSize, color, borderColor, selected=false) {
        graphics.lineStyle(10, borderColor, 1);
        graphics.beginFill(color);
        graphics.drawCircle(
            position.x, position.y, halfSize
        );
        graphics.endFill();
    }

    drawBox(position, size, halfSize, color, borderColor, selected=false) {
        graphics.lineStyle(10, borderColor, 1);
        graphics.beginFill(color);
        graphics.drawRect(
            position.x - halfSize, position.y - halfSize,
            size, size
        );
        graphics.endFill();
    }

    drawTriangle(position, size, halfSize, color, borderColor, selected=false) {
        graphics.lineStyle(5, borderColor, 1);
        graphics.beginFill(color);
        graphics.moveTo(position.x, position.y + halfSize);
        graphics.lineTo(position.x - halfSize, position.y - halfSize);
        graphics.lineTo(position.x + halfSize, position.y - halfSize);
        graphics.endFill();
    }
}

// Define a query of entities that have "Renderable" and "Shape" components
RendererSystem.queries = {
    shapes: {
        components: [Renderable, Shape, Position]
    },
    sprites: {
        components: [Renderable, Sprite, Position]
    }
}

// We're gonna assume circle for now.
// This will cause some incorrect clicks for boxes and triangles,
// but this is acceptable for testing purposes.
// (xp−xc)2+(yp−yc)2 < r
function inBoundingCircle(br, bx, by, x, y) {
    return Math.sqrt(
        Math.abs(bx - x)^2 + Math.abs(by - y)^2 
    ) < br
}

export { RendererSystem }; 