import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Model = new URL('../assets/Idel Stand with 2 animetion.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

renderer.setClearColor(0xf0f0f0);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.enableZoom = true;
orbit.autoRotate = true;
camera.position.set(0, 2, 10);
orbit.update();

const grid = new THREE.GridHelper(30, 30);
scene.add(grid);

// Add AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
scene.add(ambientLight);

// Add DirectionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const assetLoader = new GLTFLoader();

let mixer;
assetLoader.load(Model.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    console.log(clips); // This will log the animations array to check if any animations are available.


    // Ensure the model's default materials and textures are used
    model.traverse((node) => {
        if (node.isMesh) {
            console.log(node.material); // Log the material to ensure it's applied
        }
    });

    // Play all animations at the same time
    clips.forEach(function(clip) {
        const action = mixer.clipAction(clip);
        action.play();
    });

}, undefined, function(error) {
    console.error(error);
});

const clock = new THREE.Clock();
function animate() {
    if (mixer)
        mixer.update(clock.getDelta());
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
