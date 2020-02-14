/**
 *  Create a 3d box via three js
 */
import {
    World
} from "ecsy";

import {
    Renderable
} from "../components/Renderable";
import {
    ThreeRendererSystem
} from "../systems/ThreeRendererSystem.js";
import {
    Shape
} from "../components/Shape";
import {
    Position
} from "../components/Position";
import {
    MovableSystem
} from "../systems/MovableSystem";
import {
    Rotation
} from "../components/Rotation";
import {
    Velocity
} from "../components/Velocity";

import {
    getRandomVelocity,
    getRandomPosition
} from "../../global/functions.js";

const NUM_ELEMENTS = 5;

// Create world and register the systems on it
export var world = new World();

world
    .registerSystem(MovableSystem)
    .registerSystem(ThreeRendererSystem);

// create one 3d box via three js
// world
//     .createEntity()
//     .addComponent(Shape, {primitive: "box", size: 50})
//     .addComponent(Position)
//     .addComponent(Rotation)
//     .addComponent(Velocity, getRandomVelocity())
//     .addComponent(Renderable)

for (let i = 0; i < NUM_ELEMENTS; i++) {
    world
        .createEntity()
        .addComponent(Shape, {
            primitive: "box",
            size: 50
        })
        .addComponent(Position, getRandomPosition())
        .addComponent(Rotation)
        .addComponent(Velocity, getRandomVelocity())
        .addComponent(Renderable)
}