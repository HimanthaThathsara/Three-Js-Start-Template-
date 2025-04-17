import gsap from 'gsap';
import * as THREE from 'three';
import { Timeline } from 'gsap/gsap-core';
import { MapControls } from 'three/examples/jsm/Addons.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';


const ButtonClick = document.getElementById('ExploerButton');

ButtonClick.addEventListener('click', () => {
    gsap.to(camera.position, {x: 515.70, y: 273.09, z: 250.55, duration: 2});
    ButtonClick.remove();
});

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0xb6b6b6);


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const map = new MapControls(camera, renderer.domElement);
map.enableDamping = true;
map.dampingFactor = 0.25;
// map.screenSpacePanning = false;
// map.minDistance = 100;
// map.maxDistance = 500;
// map.maxPolarAngle = Math.PI / 2;
// map.enableRotate = false;
// map.enableZoom = false;
// map.enablePan = false;
// map.target.set(0, 0, 0);
// map.update();


// map.addEventListener('change', () => {
//     console.log(`Camera position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
// });



camera.position.set(1394.96, 673.55, 587.70);
map.update();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);


const model = new GLTFLoader();
let glb;
model.load('public/untitled.glb',function(glb) {
        glb = glb.scene;
        scene.add(glb);
    }
);

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
