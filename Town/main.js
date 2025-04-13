    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

    const renderer = new THREE.WebGLRenderer({ antialias: true });
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
    camera.position.set(4, 50, 200);
    orbit.update();

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    scene.add(directionalLight);
    directionalLight.position.set(10, 11, 7);

    const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    scene.add(directionalLight2);
    directionalLight2.position.set(-10, 11, -7);

    const gltfLoader = new GLTFLoader();

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2;

    let Town;

    // Get the loading container and progress bar elements
    const loadingContainer = document.querySelector('.preloader');
    const progressBar = loadingContainer.querySelector('.progress-bar');
    const percentageText = loadingContainer.querySelector('.percentage');
    const loadingTextInitial = loadingContainer.querySelector('.loading-text.initial');
    const loadingTextComplete = loadingContainer.querySelector('.loading-text.complete');

    gltfLoader.load(
        '/Test Town.glb',
        function (gltf) {
            const model = gltf.scene;
            scene.add(model);
            Town = model;

            // Hide the loading container once the model is loaded
            loadingContainer.style.display = 'none';
        },
        function (xhr) {
            // Update the progress bar width based on the loading progress
            const progress = (xhr.loaded / xhr.total) * 100;
            progressBar.style.width = `${progress}%`;
            percentageText.textContent = `${Math.round(progress)}`;

            // Show "Complete" text when loading is finished
            if (progress === 100) {
                loadingTextInitial.style.transform = 'translateY(-100%)';
                loadingTextComplete.style.transform = 'translateY(0)';
            }
        },
        function (error) {
            console.error('An error happened', error);
        }
    );

    function animate(time) {
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
