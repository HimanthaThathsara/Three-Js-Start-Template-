import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import gsap from 'gsap';


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const container = document.querySelector('.Threejscanva');
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

renderer.setClearColor(0x000000, 0);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;

orbit.addEventListener('change', () => {
    console.log(`Camera position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
});

camera.position.set(4.45, 0.82, 0.13);
orbit.update();

// const grid = new THREE.GridHelper(100, 100);
// scene.add(grid);

// const ambientLight = new THREE.AmbientLight(0xFFFFFFF, 0.8);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
// scene.add(directionalLight);
// directionalLight.position.set(10, 11, 7);
// const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
// scene.add(directionalLight2);
// directionalLight2.position.set(-10, 11, -7);
// const directionalLight3 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
// scene.add(directionalLight3);
// directionalLight3.position.set(10, 11, -7);
// const directionalLight4 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
// scene.add(directionalLight4);
// directionalLight4.position.set(-10, 11, 7);

const CarModelsArray = [
    '/Car Model NFS/Blacklsit-1.glb'
    , '/Car Model NFS/Blacklsit-4.glb'
    , '/Car Model NFS/Blacklsit-5.glb'
    , '/Car Model NFS/Blacklsit-6.glb'
    , '/Car Model NFS/Blacklsit-7.glb'
    , '/Car Model NFS/Blacklsit-8.glb'
    , '/Car Model NFS/Blacklsit-9.glb'
    , '/Car Model NFS/Blacklsit-10.glb'
    , '/Car Model NFS/Blacklsit-11.glb'
    , '/Car Model NFS/Blacklsit-12.glb'
    , '/Car Model NFS/Blacklsit-13.glb'
    , '/Car Model NFS/Blacklsit-14.glb'
    , '/Car Model NFS/Blacklsit-15.glb'
    , '/Car Model NFS/Blacklsit-Police.glb'
    , '/Car Model NFS/Blacklsit-Razer.glb'

];
// console.log(CarModelsArray.length);

const UPButton = document.getElementById('Up');
const DownButton = document.getElementById('Down');
let Count = 0;

UPButton.addEventListener('click', () => {
    if (Count === 0) {    
        window.alert('This is the first car model');
    } else {
        Count -= 1;
        loadCarModel();
    }
});

DownButton.addEventListener('click', () => {
    if (Count === CarModelsArray.length - 1) {
        window.alert('This is the last car model');
    } else {
        Count += 1;
        loadCarModel();
    }
});

const gltfLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

let car;

function loadCarModel() {
    if (car) {
        scene.remove(car);
    }

    rgbeLoader.load('/Car Model NFS/MR_INT-005_WhiteNeons_NAD.hdr', function(texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
    
        
        gltfLoader.load(CarModelsArray[Count], function(gltf) { 
            const model = gltf.scene; 
            scene.add(model);
            car = model;
            model.position.set(0, -0.9, 0);
        });

    });
}

loadCarModel();

function Gsap() {
    gsap.to(camera.position, 
        { duration: 1, 
            x: 2.70, 
            y: 0.07, 
            z: 3.82,
            ease: 'power2.inOut',
            onUpdate: () => {
                camera.lookAt(0, 0, 0);
            }

        });
}

function GsapDefualt() {
    gsap.to(camera.position, 
        { duration: 1, 
            x: 4.45, 
            y: 0.82, 
            z: 0.13,
            ease: 'power2.inOut ',
            onUpdate: () => {
                camera.lookAt(0, 0, 0);
            }
        }); 
}

function onMouseClick(event) {
    if (car) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            Gsap();
        }
    }
}

function Doubelclick(event) {
            GsapDefualt();
}


window.addEventListener('dblclick', Doubelclick);
window.addEventListener('click', onMouseClick);


function animate(time) {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
