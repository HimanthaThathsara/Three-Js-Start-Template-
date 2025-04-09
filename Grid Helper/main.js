// import the THREE.JS and ORBITCONTROLS
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

//Create a Render from WEBGLRENDERER 
const renderer = new THREE.WebGLRenderer({antialias: true});
//Set the render to window width and hight
renderer.setSize(window.innerWidth, window.innerHeight);
// Append chiled as to the HTML FILE
document.body.appendChild(renderer.domElement);

// Sets the color of the background.
renderer.setClearColor(0x000000);

// Create a Scene 
const scene = new THREE.Scene();

// Add perspectivecamera ( FOV , ASPECT , NEAR , FAR 
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around.
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning.
camera.position.set(6, 8, 12);
// Has to be done everytime we update the camera position.
orbit.update();

// Creates a 120 by 120 grid helper.
const gridHelper = new THREE.GridHelper(120, 120);
// Add grid helper to scene
scene.add(gridHelper);

// animate the render
function animate() {
    renderer.render(scene, camera);
}
// call the animate funtion every 60 second
renderer.setAnimationLoop(animate);

// set the add event lisner to resize the window
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});