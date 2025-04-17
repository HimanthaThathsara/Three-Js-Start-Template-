import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import spline from "./spline.js";

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

scene.fog = new THREE.FogExp2(0x000000, 0.3);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;


const points = spline.getPoints(100);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0xf0f0f0 });
const line = new THREE.Line(geometry, material);


const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);


const edges = new THREE.EdgesGeometry(tubeGeo, 0.2);
const lineMat = new THREE.LineBasicMaterial({ color: 0xf0f0f0 });
const tubeLines = new THREE.LineSegments(edges, lineMat);
scene.add(tubeLines);


function updateCamera(t) {
  const time = t * 0.1;
  const looptime = 10 * 1000;
  const p = (time % looptime) / looptime;
  const pos = tubeGeo.parameters.path.getPointAt(p);
  const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);
}

// let wKeyPressed = false;

// addEventListener('keypress', (e) => {
//   if (e.key === 'w' || e.key === 'W' ) {
//     wKeyPressed = true;
//   }
// });

function animate(t = 0) {
  requestAnimationFrame(animate);
  // if (wKeyPressed) {
  //   updateCamera(t);
  //   wKeyPressed = false;
  // }
  // time = t;
  updateCamera(t);
  renderer.render(scene, camera);
  controls.update();
}


animate();

function WindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', WindowResize);