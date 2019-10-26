/**
 *  Create a 3d box via three js
 */
import { World } from "ecsy";
import * as THREE from "three";

import { ThreeRendererSystem } from "../systems/ThreeRendererSystem.js";
import { ThreeShape } from "../components/ThreeShape";
import { MovableSystem } from "../systems/MovableSystem";

import { getRandomVelocity } from "../../global/functions";

const NUM_ELEMENTS = 5;

let camera = new THREE.PerspectiveCamera( 
    90, window.innerWidth / window.innerHeight, 0.01, 2000
);
camera.position.x = window.innerWidth / 2;
camera.position.y = window.innerHeight / 2;
camera.position.z = window.innerHeight / 2;

let scene = new THREE.Scene();

let renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

// Create world and register the systems on it
export var world = new World();

world
    .registerSystem(MovableSystem)
    .registerSystem(ThreeRendererSystem);

// for (let i = 0; i < NUM_ELEMENTS; i++) {
    world
        .createEntity()
        .addComponent(ThreeShape, {
            primitive: createMesh(scene, 50, 50, 50, 0x00ff00)
        });
// }

function createMesh(scene, width, height, depth, color) {
    let geometry = new THREE.BoxGeometry( width, height, depth );
    let material = new THREE.MeshBasicMaterial( { color: color } );
    let mesh = new THREE.Mesh( geometry, material );
    
    scene.add( mesh );

    return mesh;
}