import {
    System
  } from "ecsy";
  
import { canvasWidth, canvasHeight, ctx } from "../../CanvasOne";
import { Position } from "../components/Position";
import { Shape } from "../components/Shape";
import { Selectable } from "../components/Selectable";
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

            // get if has component selectable and if selected
            var select = entity.getComponent(Selectable) || false;
                select = select.selected || false;

            this.drawShape(position, shape, select);
        });
    }

    drawShape(position, shape, selected=false) {
        if (shape.primitive === 'box') {
            this.drawBox(position, shape.size, shape.halfSize(), selected);
        } else {
            this.drawCircle(position, shape.halfSize(), selected);
        }
    }

    drawCircle(position, halfSize, selected=false) {
        ctx.beginPath();
        ctx.arc(position.x, position.y, halfSize, 0, 2 * Math.PI, false);
        ctx.fillStyle = selected ? "#0000FF" : "#39c495";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#0b845b";
        ctx.stroke();
    }

    drawBox(position, size, halfSize, selected=false) {
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