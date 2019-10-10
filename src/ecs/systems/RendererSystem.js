import { System } from "ecsy";
import * as PIXI from 'pixi.js'
// import { canvasWidth, canvasHeight, ctx } from "../../CanvasOne";
import { Position } from "../components/Position";
import { Shape } from "../components/Shape";
import { Selectable } from "../components/Selectable";
import { Renderable } from "../components/Renderable";

const app = new PIXI.Application({ 
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true 
});
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();

// RendererSystem
class RendererSystem extends System {
    // This method will get called on every frame by default
    execute(delta, time) {
        graphics.clear();

        // Iterate through all the entities on the query
        this.queries.renderables.results.forEach(entity => {
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
        if (shape.primitive === 'box') {
            this.drawBox(position, shape.size, shape.halfSize(), selected);
        } else if (shape.primitive === 'triangle') {
            this.drawTriangle(position, shape.size, shape.halfSize(), selected);
        } else {
            this.drawCircle(position, shape.halfSize(), selected);
        }
    }

    drawCircle(position, halfSize, selected=false) {
        graphics.lineStyle(10, 0x0b845b, 1);
        graphics.beginFill(0x39c495);
        graphics.drawCircle(
            position.x, position.y, halfSize
        );
        graphics.endFill();
    }

    drawBox(position, size, halfSize, selected=false) {
        graphics.lineStyle(10, 0xb74843, 1);
        graphics.beginFill(0xe2736e);
        graphics.drawRect(
            position.x - halfSize, position.y - halfSize,
            size, size
        );
        graphics.endFill();
    }

    drawTriangle(position, size, halfSize, selected=false) {
        graphics.lineStyle(5, 0x5F9EA0, 1);
        graphics.beginFill(0x00FFFF);
        graphics.moveTo(position.x, position.y + halfSize);
        graphics.lineTo(position.x - halfSize, position.y - halfSize);
        graphics.lineTo(position.x + halfSize, position.y - halfSize);
        graphics.endFill();
    }
}

// Define a query of entities that have "Renderable" and "Shape" components
RendererSystem.queries = {
    renderables: {
        components: [Renderable, Shape]
    }
}

export { RendererSystem }; 