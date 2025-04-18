import * as THREE from 'three';
import GUI from 'lil-gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
//import gsap from 'gsap';

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

camera.position.set(0, 20, 35);
orbit.update();

const grid = new THREE.GridHelper(100, 100);
scene.add(grid);

// const ambientLight = new THREE.AmbientLight(0xFFFFFFF, 0.8);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
// scene.add(directionalLight);
// directionalLight.position.set(10, 11, 7);

// const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 2);
// scene.add(directionalLight2);
// directionalLight2.position.set(-10, 11, -7);

const rgbeLoader = new RGBELoader();
const gltfLoader = new GLTFLoader();

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2;

let Man;
let selectedObject;

rgbeLoader.load('/MR_INT-005_WhiteNeons_NAD.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;

    gltfLoader.load('/My ReadPlayMe.glb', function(gltf) {
        const model = gltf.scene;
        model.scale.set(8, 8, 8);
        scene.add(model);
        Man = model;
        console.log(model.children);

        selectedObject = scene.getObjectByName("Wolf3D_Head"); 
        console.log(selectedObject);


// tHIS iS WORK AND MODIFIES THE COLOR OF THE OBJECT Using functions
// if (selectedObject) {
//     selectedObject.material.color.set(0xff0000); // Change color to red
// }
    });
});


function onMouseClick(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    console.log(mouse.x, mouse.y);

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object === selectedObject) {
            console.log('nice');
        }
    }
}

window.addEventListener('click', onMouseClick);

const gui = new GUI();
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'x', -100, 100);
cameraFolder.add(camera.position, 'y', -100, 100);
cameraFolder.add(camera.position, 'z', -100, 100);
cameraFolder.open();

// const GuiEdit =  document.querySelector('.lil-gui');



//const TimeLine = gsap.timeline();
function animate(time) {
    renderer.render(scene, camera);
}

window.addEventListener('click', function() {
    // if (Man) {
    //     TimeLine.to(camera.position, 
    //         {   x: -1.147, 
    //             y: 3.421, 
    //             z: 3.944, 
    //             duration: 1.5,
    //             onUpdate: () => {
    //                 camera.lookAt(Man.position);
    //             }
    //         })
    //     .to(camera.position, 
    //         {   x: 1.403, 
    //             y: 2.000, 
    //             z: 3.595, 
    //             duration: 1.5,
    //             onUpdate: () => {
    //                 camera.lookAt(Man.position);
    //             }
    //         })
    //     .to(camera.position, 
    //         {   x: 2.861, 
    //             y: 1.277, 
    //             z: -3.013, 
    //             duration: 1.5,
    //             onUpdate: () => {
    //                 camera.lookAt(Man.position);
    //             }
    //         })
    //     .to(camera.position, 
    //         {   x: -1.998, 
    //             y: 1, 
    //             z: -3.833, 
    //             duration: 1.5,
    //             onUpdate: () => {
    //                 camera.lookAt(Man.position);
    //             }
    //         });

        // or we can create a function to run the Gsap timeline and call it here as may times as we want
        // this method can be used to animate the camera and any animation that we want to run
        /*function GsapAnimationCamera() {
            TimeLine.to(camera.position, 
                {   x, 
                    y, 
                    z, 
                    duration,
                    onUpdate: () => {
                        camera.lookAt(Man.position);
                    }
                })
        } */

        //Call the function here and pass the parameters. x y z duration
        /* GsapAnimationCamera(1, 1, 1, 1.5); */
    // }
});


renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
