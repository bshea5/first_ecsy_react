/**
 *  Create a triangle and move it vertically continuously
 */

import { World } from "ecsy";

import { Renderable } from "../components/Renderable";
import { Velocity } from "../components/Velocity";
import { Position } from "../components/Position";
import { Shape } from "../components/Shape";
import { SelectSystem } from "../systems/SelectSystem.js";
import { MovableSystem } from "../systems/MovableSystem.js";
import { RendererSystem } from "../systems/RendererSystem.js";

// Create world and register the systems on it
export var world = new World();

world
    .registerSystem(SelectSystem)
    .registerSystem(MovableSystem)
    .registerSystem(RendererSystem);

// create one triangle
world
    .createEntity()
    .addComponent(Velocity, {x: 0.0, y: 0.75})
    .addComponent(Shape, {primitive: "triangle", size: 500})
    .addComponent(Position, {x: window.innerWidth / 2, y: 0})
    .addComponent(Renderable)