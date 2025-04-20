import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000000);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(6, 8, 12);

new RGBELoader().load('syferfontein_1d_clear_puresky_8k.hdr', (EnvironmentMap) => {
    EnvironmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = EnvironmentMap;
});

const controls = new FirstPersonControls(camera, renderer.domElement);
controls.activeLook = false;
controls.autoForward = false;
controls.lookVertical = true;
controls.constrainVertical = true;
controls.verticalMin = 1.0;
controls.verticalMax = 2.0;
controls.movementSpeed = 2;
controls.lookSpeed = 0.01;

// let ismoving = false;

addEventListener('mousemove', (event) => {
    // ismoving = true;
    controls.activeLook = true;
    document.body.style.cursor = 'none';

});

addEventListener('keydown', (event) => {
    if (event.key === 'Escape') 
        {
            document.body.style.cursor = 'default';
            controls.activeLook = false;
            console.log('Escape key pressed');
        }
});

addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            camera.position.z -= 1;
            break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
            camera.position.x -= 1;
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            camera.position.z += 1;
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            camera.position.x += 1;
            break;
        default:
            break;
    }
});

// addEventListener('keyup', (event) => {
//     switch (event.key) {
//         case 'w':
//         case 'W':
//         case 'ArrowUp':
//             console.log('Stop moving up');
//             break;
//         case 'a':
//         case 'A':
//         case 'ArrowLeft':
//             console.log('Stop moving left');
//             break;
//         case 's':
//         case 'S':
//         case 'ArrowDown':
//             console.log('Stop moving down');
//             break;
//         case 'd':
//         case 'D':
//         case 'ArrowRight':
//             console.log('Stop moving right');
//             break;
//         default:
//             break;
//     }
// });


function animate() {
    // if (!ismoving) {
    //     controls.activeLook = false;
    // }
    controls.update(0.1); 
    renderer.render(scene, camera);
    // controls.activeLook = false;
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});