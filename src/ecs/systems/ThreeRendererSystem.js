import { System } from "ecsy";
import * as THREE from "three";

import { Shape } from "../components/Shape";
import { Renderable } from "../components/Renderable";
import { Position } from "../components/Position";
import { Rotation } from "../components/Rotation";

let camera = new THREE.PerspectiveCamera( 
    100, window.innerWidth / window.innerHeight, 0.01, 2000
);
camera.position.x = window.innerWidth / 2;
camera.position.y = window.innerHeight / 2;
camera.position.z = window.innerHeight / 2;

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
                this.drawBox(shape.size, position, rotation);
            }

            // rotation should be handled else where
            rotation.x += 0.01;
            rotation.y += 0.01;
        });

        this.drawHelper();

        renderer.render( scene, camera );
    }

    drawBox(size, position, rotation) {
        //size = 0.2;
        let geometry = new THREE.BoxGeometry( size, size, size );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        let mesh = new THREE.Mesh( geometry, material );

        mesh.rotation.x = rotation.x;
        mesh.rotation.y = rotation.y;

        mesh.position.set(position.x, position.y, position.z);

        scene.add( mesh );
    }

    drawHelper() {
        var helper = new THREE.CameraHelper( camera );
        scene.add( helper );

        var material = new THREE.LineBasicMaterial({
            color: 0xff0000
        });
        
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( -1, 0, 0 ),
            new THREE.Vector3( -1, 1, 0 ),
            new THREE.Vector3( -1, -1, 0 )
        );
        
        var line = new THREE.Line( geometry, material );
        scene.add( line );
    }

}

// Define a query of entities that have "Renderable" and "Shape" components
ThreeRendererSystem.queries = {
    shapes: {
        components: [Renderable, Shape, Position, Rotation]
    }
}

export { ThreeRendererSystem }; 