import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);  

renderer.setClearColor(0x000000);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-1.998, 1, -3.833);
orbit.update();

const grid = new THREE.GridHelper(100, 100);
scene.add(grid);

// const ambientLight = new THREE.AmbientLight(0xFFFFFFF, 0.8);
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
scene.add(directionalLight);
directionalLight.position.set(10, 11, 7);

const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 2);
scene.add(directionalLight2);
directionalLight2.position.set(-10, 11, -7);

const gltfLoader = new GLTFLoader();

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2;

let car;

gltfLoader.load('/bmw_m3_need_for_speed_most_wanted.glb', function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    car = model;
});

const TimeLine = gsap.timeline();
function animate(time) {
    renderer.render(scene, camera);
}

window.addEventListener('click', function() {
    if (car) {
        TimeLine.to(camera.position, 
            {   x: -1.147, 
                y: 1.421, 
                z: 3.944, 
                duration: 1.5,
                onUpdate: () => {
                    camera.lookAt(car.position);
                }
            })
        .to(camera.position, 
            {   x: 1.403, 
                y: 2.000, 
                z: 3.595, 
                duration: 1.5,
                onUpdate: () => {
                    camera.lookAt(car.position);
                }
            })
        .to(camera.position, 
            {   x: 2.861, 
                y: 1.277, 
                z: -3.013, 
                duration: 1.5,
                onUpdate: () => {
                    camera.lookAt(car.position);
                }
            })
        .to(camera.position, 
            {   x: -1.998, 
                y: 1, 
                z: -3.833, 
                duration: 1.5,
                onUpdate: () => {
                    camera.lookAt(car.position);
                }
            });

        // or we can create a function to run the Gsap timeline and call it here as may times as we want
        // this method can be used to animate the camera and any animation that we want to run
        /*function GsapAnimationCamera() {
            TimeLine.to(camera.position, 
                {   x, 
                    y, 
                    z, 
                    duration,
                    onUpdate: () => {
                        camera.lookAt(car.position);
                    }
                })
        } */

        //Call the function here and pass the parameters. x y z duration
        /* GsapAnimationCamera(1, 1, 1, 1.5); */
    }
});


renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});