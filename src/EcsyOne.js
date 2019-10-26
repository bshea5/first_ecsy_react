import { world as world1 } from './ecs/worlds/WorldOne';
import { world as world2, world } from './ecs/worlds/WorldTwo';
import { world as world3 } from './ecs/worlds/WorldThree';
import { world as world4 } from './ecs/worlds/WorldFour';

const worlds = [
    world1,
    world2,
    world3
];

var worldIndex = 0;

// Run!
function run() {
    // Compute delta and elapsed time
    var time = performance.now();
    var delta = time - lastTime;

    // Run all the systems
    worlds[worldIndex].execute(delta, time);

    lastTime = time;
    requestAnimationFrame(run);
}

function toggleWorld(e) {
    console.log("change worlds!");
    worlds[worldIndex].stop();
    worldIndex++;
    worldIndex = worldIndex < worlds.length ? worldIndex : 0;
    worlds[worldIndex].play();
}

document.addEventListener('keydown', toggleWorld);

var startTime = performance.now();
var lastTime = startTime
run();

