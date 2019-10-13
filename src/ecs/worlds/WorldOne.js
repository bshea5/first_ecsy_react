/**
 *  Create a random scattering of shapes moving randomly.
 */

import { World } from "ecsy";

import { Renderable } from "../components/Renderable";
import { Velocity } from "../components/Velocity";
import { Position } from "../components/Position";
import { Shape } from "../components/Shape";
import { BoundingCircle } from "../components/BoundingCircle";
import { Selectable } from "../components/Selectable";
import { SelectSystem } from "../systems/SelectSystem.js";
import { MovableSystem } from "../systems/MovableSystem.js";
import { RendererSystem } from "../systems/RendererSystem.js";

import { 
    getRandomPosition, getRandomShape, getRandomVelocity 
} from "../../global/functions.js";

const NUM_ELEMENTS = 100;
const SHAPE_SIZE = 50;

// Create world and register the systems on it
export var world = new World();

world
    .registerSystem(SelectSystem)
    .registerSystem(MovableSystem)
    .registerSystem(RendererSystem);

for (let i = 0; i < NUM_ELEMENTS; i++) {
    world
        .createEntity()
        .addComponent(Velocity, getRandomVelocity())
        .addComponent(Shape, getRandomShape())
        .addComponent(Position, getRandomPosition())
        .addComponent(Renderable)
        .addComponent(BoundingCircle, { radius: SHAPE_SIZE / 2})
        .addComponent(Selectable, { selected: i > 95 })
}

// create one triangle
world
    .createEntity()
    .addComponent(Velocity, getRandomVelocity())
    .addComponent(Shape, {primitive: "triangle"})
    .addComponent(Position, getRandomPosition())
    .addComponent(Renderable)
    .addComponent(BoundingCircle, { radius: SHAPE_SIZE / 2})
    .addComponent(Selectable, { selected: true })