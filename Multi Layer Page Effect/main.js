import * as THREE from 'three';

let renderer, scene, camera;
let width, height, wWidth, wHeight;


const conf = {
    color: 0xf0f0f0,
    objectWidth: 12,
    objectThickness: 3,
    ambientColor: 0xf0f0f0,
    light1Color: 0xf0f0f0,
    shadow: false,
    perspective: 75,
    cameraZ: 75 
};

let objects = [];
let geometry, material;

init();
animate();

function init() {
    const canvas = document.getElementById('reveal-effect');
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    camera = new THREE.PerspectiveCamera(conf.perspective, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = conf.cameraZ;

    scene = new THREE.Scene();
    geometry = new THREE.BoxGeometry(conf.objectWidth, conf.objectWidth, conf.objectThickness);

    window.addEventListener('resize', onResize);
    document.getElementById('trigger').addEventListener('click', initScene);

    onResize();
    initScene();
}

function initScene() {
    scene.clear();
    initLights();
    initObjects();
}

function initLights() {
    const ambientLight = new THREE.AmbientLight(conf.ambientColor);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(conf.light1Color);
    pointLight.position.set(0, 0, 100);
    scene.add(pointLight);
}

function initObjects() {
    objects = [];
    const nx = Math.round(wWidth / conf.objectWidth) + 1;
    const ny = Math.round(wHeight / conf.objectWidth) + 1;

    for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
            material = new THREE.MeshLambertMaterial({ color: conf.color, transparent: true, opacity: 1 });
            const mesh = new THREE.Mesh(geometry, material);
            const x = -wWidth / 2 + i * conf.objectWidth;
            const y = -wHeight / 2 + j * conf.objectWidth;
            mesh.position.set(x, y, 0);
            objects.push(mesh);
            scene.add(mesh);
        }
    }
    document.body.classList.add('loaded');
    startAnim();
}

function startAnim() {
    document.body.classList.remove('revealed');
    objects.forEach(mesh => {
        mesh.rotation.set(0, 0, 0);
        mesh.material.opacity = 1;
        mesh.position.z = 0;

        // Generate random values without using randFloat or randFloatSpread
        const delay = 1 + Math.random(); // Equivalent to randFloat(1, 2)
        const rx = (Math.random() - 0.5) * 2 * Math.PI; // Equivalent to randFloatSpread(2 * Math.PI)
        const ry = (Math.random() - 0.5) * 2 * Math.PI;
        const rz = (Math.random() - 0.5) * 2 * Math.PI;

        TweenMax.to(mesh.rotation, 2, { x: rx, y: ry, z: rz, delay: delay });
        TweenMax.to(mesh.position, 2, { z: 80, delay: delay + 0.5, ease: Power1.easeOut });
        TweenMax.to(mesh.material, 2, { opacity: 0, delay: delay + 0.5 });
    });

    setTimeout(() => {
        document.body.classList.add('revealed');
    }, 4500);
}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    const size = getRendererSize();
    wWidth = size[0];
    wHeight = size[1];
}

function getRendererSize() {
    const cam = new THREE.PerspectiveCamera(conf.perspective, camera.aspect);
    const vFOV = cam.fov * Math.PI / 180;
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
    const width = height * cam.aspect;
    return [width, height];
}
