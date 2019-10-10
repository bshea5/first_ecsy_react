import { World } from "ecsy";

import { Renderable } from "./ecs/components/Renderable";
import { Velocity } from "./ecs/components/Velocity";
import { Position } from "./ecs/components/Position";
import { Shape } from "./ecs/components/Shape";
import { BoundingCircle } from "./ecs/components/BoundingCircle";
import { Selectable } from "./ecs/components/Selectable";
import { SelectSystem } from "./ecs/systems/SelectSystem.js";
import { MovableSystem } from "./ecs/systems/MovableSystem.js";
import { RendererSystem } from "./ecs/systems/RendererSystem.js";

const NUM_ELEMENTS = 50;
const SPEED_MULTIPLIER = 0.3;
const SHAPE_SIZE = 50;
const TEMP_SIZE = 500;

// Create world and register the systems on it
var world = new World();
world
    .registerSystem(SelectSystem)
    .registerSystem(MovableSystem)
    .registerSystem(RendererSystem);

// Some helper functions when creating the components
function getRandomVelocity() {
    return {
        x: SPEED_MULTIPLIER * (2 * Math.random() - 1),
        y: SPEED_MULTIPLIER * (2 * Math.random() - 1)
    };
}

function getRandomPosition() {
    return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
    };
}

function getRandomShape() {
    return {
        primitive: Math.random() >= 0.5 ? 'circle' : 'box'
    };
}

for (let i = 0; i < NUM_ELEMENTS; i++) {
    world
        .createEntity()
        .addComponent(Velocity, getRandomVelocity())
        .addComponent(Shape, getRandomShape())
        .addComponent(Position, getRandomPosition())
        .addComponent(Renderable)
        .addComponent(BoundingCircle, { radius: SHAPE_SIZE / 2})
        .addComponent(Selectable, { selected: i > 40 })
}

// create one triangle
world
    .createEntity()
    .addComponent(Velocity, getRandomVelocity())
    .addComponent(Shape, {primitive: "triangle"})
    .addComponent(Position, getRandomPosition())
    .addComponent(Renderable)
    .addComponent(BoundingCircle, { radius: SHAPE_SIZE / 2})
    .addComponent(Selectable, { selected: false })

// Run!
function run() {
    // Compute delta and elapsed time
    var time = performance.now();
    var delta = time - lastTime;

    // Run all the systems
    world.execute(delta, time);

    lastTime = time;
    requestAnimationFrame(run);
}

var lastTime = performance.now();
run();