import {
    System
} from "ecsy";

import { Position } from "../components/Position";
import { Shape } from "../components/Shape";
import { Renderable } from "../components/Renderable";
import { Selectable } from "../components/Selectable";
import { BoundingCircle } from "../components/BoundingCircle";

// SelectSystem
class SelectSystem extends System {
    // This method will get called on every frame by default
    execute(delta, time) {
        // Iterate through all the entities on the query
        this.queries.selectable.results.forEach(entity => {
        var position = entity.getComponent(Position);
        var shape = entity.getComponent(Shape);
        var selectable = entity.getMutableComponent(Selectable);

        // placeholder, randomize selections, to test toggling
        // selectable.selected = selectable.selected 
        //     ? Math.random() >= 0.05
        //     : Math.random() >= 0.90;
        });
    }
}

// 
SelectSystem.queries = {
    selectable: {
        components: [Position, Renderable, Selectable, BoundingCircle]
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

export { SelectSystem }