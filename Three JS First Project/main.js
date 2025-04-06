import * as THREE from 'three';
import { Screen } from 'three';
import { lights } from 'three/examples/jsm/nodes/Nodes.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//import css file
import './style.css';

//screen 
const screen = new THREE.Scene;

//Geometry
const Geometry = new THREE.ShapeGeometry(3, 64, 64)

//Material
const Material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
});


//Mesh
const Mesh = new THREE.Mesh(Geometry, Material);
screen.add(Mesh);

//light
const Light = new THREE.DirectionalLight(0xffffff, 100);
Light.position.set(0, 10, 10);
Screen.add(Light);

//Camera
const Camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
Camera.position.z = 20;
screen.add(Camera);

//Renderer
const canvas = document.querySelectorAll('.canvas');
const Renderer = new THREE.WebGLRenderer({ canvas });
Renderer.setSize(window.innerWidth, window.innerHeight);
Renderer.setPixelRatio(window.devicePixelRatio);
Renderer.render(screen, Camera);

//Controls
const controls = new OrbitControls(Camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;


//Resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    //update aspect ratio && update size
    Camera.aspect = width / height;
    Renderer.setSize(width, height);
    Camera.updateProjectionMatrix();
});

const loop = () => {
    controls.update();
    lights.rotation.x += 0.1;
    //lights.rotation.y += 0.1;
    Renderer.render(screen, Camera);
    window.requestAnimationFrame(loop);
}

loop();