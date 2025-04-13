import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/Addons.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

const clock = new THREE.Clock;

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

camera.position.set(29, 18, 10);
camera.lookAt(scene.position)

const RenderScene = new RenderPass(scene, camera);

const composer = new EffectComposer(renderer);
composer.addPass(RenderScene);

const Bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.1, 0.1);
composer.addPass(Bloom);

const outputPass = new OutputPass();
composer.addPass(outputPass);

// const grid = new THREE.GridHelper(30, 30);
// scene.add(grid);

const ambientLight = new THREE.AmbientLight(0xFFFFFFF, 0.8);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 10);
// scene.add(directionalLight);
// directionalLight.position.set(10, 11, 7);
// const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 2);
// scene.add(directionalLight2);
// directionalLight2.position.set(-10, 11, -7);

const gltfLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;

let mixer;

rgbeLoader.load('/MR_INT-005_WhiteNeons_NAD.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;

    gltfLoader.load('./model/neon_blade_-_sword.glb', function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        mixer = model;

        // mixer = new THREE.AnimationMixer(model);
        // const AnimeClip =gltf .animation;
        // const clip = THREE.AnimationClip.findByName(AnimeClip, 'Animation');
        // const AnimationAction = mixer.clipAction(clip);
        // AnimationAction.play()
    });
});





function animate(time) {
    orbit.update();
    // if (mixer)
    //     mixer.update(clock.getDelta());

    composer.render();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});