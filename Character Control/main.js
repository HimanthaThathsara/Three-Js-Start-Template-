import * as THREE from 'three';
import GUI from 'lil-gui';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Model = new URL('/untitled1.glb', import.meta.url);

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
camera.position.set(-288.422, 222.373, 462.824);
// camera.position.set(-44.869, 202.347, -548.861);
orbit.update();

// const grid = new THREE.GridHelper(window.innerWidth, window.innerHeight, 0xf0f0f0, 0xf0f0f0);                          
// scene.add(grid);

// Add AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
scene.add(ambientLight);

// Add DirectionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const assetLoader = new GLTFLoader();

let model;
let mixer;
let clips;

let StandIdel;
let Walk;
let SlowRun;
let RunWithSlid;
let SpeedRun;
let BreathingIdel;
let Trun180NoGucts;
let TrunWithGucts;
let TellingSecret;
let Yelling;

assetLoader.load(Model.href, function(gltf) {
    model = gltf.scene;
    // model.scale.set(0.1, 0.1, 0.1);
    scene.add(model);
    mixer = new THREE.AnimationMixer(model);
    clips = gltf.animations;

    StandIdel = THREE.AnimationClip.findByName(clips, 'StandIdel');
    Walk = THREE.AnimationClip.findByName(clips, 'Walk');
    SpeedRun = THREE.AnimationClip.findByName(clips, 'SlowRun');
    RunWithSlid = THREE.AnimationClip.findByName(clips, 'RunWithSlid');
    SlowRun = THREE.AnimationClip.findByName(clips, 'SpeedRun');
    BreathingIdel = THREE.AnimationClip.findByName(clips, 'BreathingIdel');
    Trun180NoGucts = THREE.AnimationClip.findByName(clips, 'Trun180NoGucts');
    TrunWithGucts = THREE.AnimationClip.findByName(clips, 'TrunWithGucts');
    TellingSecret = THREE.AnimationClip.findByName(clips, 'TellingSecret');
    Yelling = THREE.AnimationClip.findByName(clips, 'Yelling');

    const animations = [
        StandIdel,
        Walk,
        SlowRun,
        RunWithSlid,
        SpeedRun,
        BreathingIdel,
        Trun180NoGucts,
        TrunWithGucts,
        TellingSecret,
        Yelling
    ];

    let currentAnimationIndex = 0;

    // function playNextAnimation() {
    //     if (currentAnimationIndex < animations.length) {
    //         const clip = animations[currentAnimationIndex];
    //         const action = mixer.clipAction(clip);
    //         action.reset();
    //         action.play();
    //         action.loop = THREE.LoopOnce;
    //         action.clampWhenFinished = true;
    //         action.onFinished = function() {
    //             currentAnimationIndex++;
    //             playNextAnimation();
    //         };
    //     }
    // }

    // playNextAnimation();
    // console.log(currentAnimationIndex);

    // Ensure the model's default materials and textures are used
    model.traverse((node) => {
        if (node.isMesh) {
            /* console.log(node.material); */  // Log the material to ensure it's applied
            console.log(clips);
        }
    });

}, undefined, function(error) {
    console.error(error);
});

// GUI setup
const gui = new GUI({width:300});
// const cubeFolder = gui.addFolder('Cube');
// cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
// cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
// cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
// cubeFolder.open();

const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'x', -1000, 1000);
cameraFolder.add(camera.position, 'y', -1000, 1000);
cameraFolder.add(camera.position, 'z', -1000, 1000);
cameraFolder.open();


// const Visibility = gui.addFolder('Visibility');
// const skeletonHelper = new THREE.SkeletonHelper(model);
// skeletonHelper.visible = false;
// scene.add(skeletonHelper);

// const visibilityParams = {
//     showBones: false
// };

// Visibility.add(visibilityParams, 'showBones').name('Show Bones').onChange((value) => {
//     model.visible = !value;
//     skeletonHelper.visible = value;
// });


const Activation_Deactivation = gui.addFolder('Activation/Deactivation');

const animationParams = {
    currentAnimation: 'StandIdel'
};

const animationNames = [
    'StandIdel',
    'Walk',
    'SlowRun',
    'RunWithSlid',
    'SpeedRun',
    'BreathingIdel',
    'Trun180NoGucts',
    'TrunWithGucts',
    'TellingSecret',
    'Yelling'
];

Activation_Deactivation.add(animationParams, 'currentAnimation', animationNames).name('Select Animation').onChange((value) => {
    const clip = THREE.AnimationClip.findByName(clips, value);
    if (clip) {
        const action = mixer.clipAction(clip);
        mixer.stopAllAction();
        action.reset();
        action.play();
    }
});


// Initializing Stats to monitor performance
const stats = new Stats();
document.body.appendChild(stats.dom);

const clock = new THREE.Clock();
function animate() {
  stats.begin(); // Start monitoring
  requestAnimationFrame(animate);  
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
  stats.end(); // End monitoring
}

animate();
