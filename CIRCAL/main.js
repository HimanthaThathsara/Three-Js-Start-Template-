import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const win_width = window.innerWidth;

const win_Higth = window.innerHeight;

const fov = 75;
const aspect = win_width / win_Higth;
const near = 0.1;
const far = 1000;

const Camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

Camera.position.z = 5;

const Screen = new THREE.Scene();

const Render = new THREE.WebGLRenderer();
Render.setSize(win_width, win_Higth);
Render.setAnimationLoop(animate);
document.body.appendChild(Render.domElement);


const controls = new OrbitControls(Camera, Render.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 4);

const mat = new THREE.MeshStandardMaterial({

    color: 0xffffff,

    flatShading: true

});

const mesh = new THREE.Mesh(geo, mat);

Screen.add(mesh);


const wireMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true
});

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);
const hemiLight = new THREE.HemisphereLight(0x000000, 0xffffff);
Screen.add(hemiLight);



function animate() {

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    Render.render(Screen, Camera);

} 