import {
    System
  } from "ecsy";
  
import { canvasWidth, canvasHeight, ctx } from "../../CanvasOne";
import { Position } from "../components/Position";
import { Shape } from "../components/Shape";
import { Renderable } from "../components/Renderable";

// RendererSystem
class RendererSystem extends System {
    // This method will get called on every frame by default
    execute(delta, time) {

        ctx.fillStyle = "#d4d4d4";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Iterate through all the entities on the query
        this.queries.renderables.results.forEach(entity => {
            var shape = entity.getComponent(Shape);
            var position = entity.getComponent(Position);

            this.drawShape(position, shape);
        });
    }

    drawShape(position, shape) {
        if (shape.primitive === 'box') {
            this.drawBox(position, shape.size, shape.halfSize());
        } else {
            this.drawCircle(position, shape.halfSize());
        }
    }

    drawCircle(position, halfSize) {
        ctx.beginPath();
        ctx.arc(position.x, position.y, halfSize, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#39c495";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#0b845b";
        ctx.stroke();
    }

    drawBox(position, size, halfSize) {
        ctx.beginPath();
        ctx.rect(position.x - halfSize, position.y - halfSize, size, size);
        ctx.fillStyle = "#e2736e";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#b74843";
        ctx.stroke();
    }
}

// Define a query of entities that have "Renderable" and "Shape" components
RendererSystem.queries = {
    renderables: {
        components: [Renderable, Shape]
    }
}

export { RendererSystem }; 