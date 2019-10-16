/**
 *  Create a 3d box via three js
 */
import { World } from "ecsy";

import { Renderable } from "../components/Renderable";
import { ThreeRendererSystem } from "../systems/ThreeRendererSystem.js";
import { ThreeShape } from "../components/ThreeShape";
import { Position } from "../components/Position";

// Create world and register the systems on it
export var world = new World();

world
    .registerSystem(ThreeRendererSystem);

// create one 3d box via three js
world
    .createEntity()
    .addComponent(ThreeShape, {primitive: "box", size: 500})
    .addComponent(Position)
    .addComponent(Renderable)