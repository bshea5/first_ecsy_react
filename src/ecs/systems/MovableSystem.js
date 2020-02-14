import {
  System
} from "ecsy";
import {
  Velocity
} from "../components/Velocity";
import {
  Position
} from "../components/Position";
import {
  Shape
} from "../components/Shape";

const BOUNDS_WIDTH = window.innerWidth;
const BOUNDS_HEIGHT = window.innerHeight;

// MovableSystem
class MovableSystem extends System {
  // This method will get called on every frame by default
  execute(delta, time) {
    // Iterate through all the entities on the query
    this.queries.moving.results.forEach(entity => {
      var velocity = entity.getComponent(Velocity);
      var position = entity.getMutableComponent(Position);
      var shape = entity.getComponent(Shape);

      const SHAPE_HALF_SIZE = shape.halfSize();

      position.x += velocity.x * delta;
      position.y += velocity.y * delta;

      if (position.x > BOUNDS_WIDTH + SHAPE_HALF_SIZE) position.x = -SHAPE_HALF_SIZE;
      if (position.x < -SHAPE_HALF_SIZE) position.x = BOUNDS_WIDTH + SHAPE_HALF_SIZE;
      if (position.y > BOUNDS_HEIGHT + SHAPE_HALF_SIZE) position.y = -SHAPE_HALF_SIZE;
      if (position.y < -SHAPE_HALF_SIZE) position.y = BOUNDS_HEIGHT + SHAPE_HALF_SIZE;
    });
  }
}

// Define a query of entities that have "Velocity" and "Position" components
MovableSystem.queries = {
  moving: {
    components: [Velocity, Position, Shape]
  }
}

export {
  MovableSystem
}