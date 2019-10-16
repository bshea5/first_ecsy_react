import { System } from "ecsy";
import * as THREE from "three";

import { Shape } from "../components/Shape";
import { Renderable } from "../components/Renderable";
import { Position } from "../components/Position";
import { Rotation } from "../components/Rotation";

let camera = new THREE.PerspectiveCamera( 
    100, window.innerWidth / window.innerHeight, 0.01, 10 
);
camera.position.z = 1;

let scene = new THREE.Scene();

let renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

// ThreeRendererSystem
class ThreeRendererSystem extends System {
    // This method will get called on every frame by default
    execute(delta, time) {
        // This may be crap effiency to clearn scene and add meshes every frame
        // for three js. Need to study three js more to see how it can fit into 
        // a ECS system.
        scene.children = [] // clear scene

        // Iterate through all the entities on the query
        this.queries.shapes.results.forEach(entity => {
            var shape = entity.getComponent(Shape);
            var position = entity.getMutableComponent(Position);
            var rotation = entity.getMutableComponent(Rotation);

            if (shape.primitive === 'box') {
                this.drawBox(position, rotation);
            }

            // rotation should be handled else where
            rotation.x += 0.01;
            rotation.y += 0.01;
        });

        renderer.render( scene, camera );
    }

    drawBox(position, rotation) {
        let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        let mesh = new THREE.Mesh( geometry, material );

        mesh.rotation.x = rotation.x;
        mesh.rotation.y = rotation.y;

        // mesh.position.set(position.x, position.y, position.z);

        scene.add( mesh );
    }
}

// Define a query of entities that have "Renderable" and "Shape" components
ThreeRendererSystem.queries = {
    shapes: {
        components: [Renderable, Shape, Position, Rotation]
    }
}

export { ThreeRendererSystem }; 