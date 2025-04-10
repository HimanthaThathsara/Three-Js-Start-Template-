import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';

// Setting up a basic Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creating a simple cube object
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Initializing Stats to monitor performance
const stats = new Stats();
document.body.appendChild(stats.dom);

// Camera positioning
camera.position.z = 5;

// Animation loop with Stats monitoring
function animate() {
  stats.begin(); // Start monitoring
  requestAnimationFrame(animate);

  // Rotating the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
  stats.end(); // End monitoring
}

animate();
