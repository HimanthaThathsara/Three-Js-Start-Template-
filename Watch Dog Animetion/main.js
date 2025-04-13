import * as THREE from 'three'

const imageContainer = document.getElementById("image");
const imageElement = document.getElementById("ImageTag");

let isHovered = false;
let hoverDuration = 0;

const ANIMATION_CONFIG = {
  updateFrequency: 0.1,
  glitchIntensityMod: 0.5
};

// shaders
const vertexShader = `
    varying vec2 vUv;
    void main() {
       vUv = uv;
       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
   }
`;

const fragmentShader = `
  uniform sampler2D tDiffuse;
  uniform float glitchIntensity;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec4 baseState = texture2D(tDiffuse, uv);

    if (glitchIntensity > 0.0) {
        float segment = floor(uv.y * 12.0); 
        float randomValue = fract(sin(segment * 12345.6789 + glitchIntensity) * 43758.5453); 
        vec2 offset = vec2(randomValue * 0.03, 0.0) * glitchIntensity;

        vec4 redGlitch = texture2D(tDiffuse, uv + offset);
        vec4 greenGlitch = texture2D(tDiffuse, uv - offset);
        vec4 blueGlitch = texture2D(tDiffuse, uv);

        if (mod(segment, 3.0) == 0.0) {
            gl_FragColor = vec4(redGlitch.r, greenGlitch.g, baseState.b, 1.0);
        } else if (mod(segment, 3.0) == 1.0) {
            gl_FragColor = vec4(baseState.r, greenGlitch.g, blueGlitch.b, 1.0);
        } else {
            gl_FragColor = vec4(redGlitch.r, baseState.g, blueGlitch.b, 1.0);
        }
    } else {
        gl_FragColor = baseState; 
    }
}

`;

let scene, camera, renderer, planeMesh;

function initializeScene(texture) {
  // Set up the camera with a perspective view
  camera = new THREE.PerspectiveCamera(
    80, // Field of view
    imageElement.offsetWidth / imageElement.offsetHeight, // Aspect ratio
    0.01, // Near clipping plane
    10 // Far clipping plane
  );
  camera.position.z = 1; // Position the camera

  // Create a new scene
  scene = new THREE.Scene();
  
  // Define shader uniforms
  const shaderUniforms = {
    tDiffuse: { value: texture }, // Texture uniform
    glitchIntensity: { value: 0.0 } // Glitch intensity uniform
  };

  // Create a plane mesh with the shader material
  planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2), // Plane geometry
    new THREE.ShaderMaterial({
      uniforms: shaderUniforms, // Attach uniforms
      vertexShader, // Vertex shader
      fragmentShader // Fragment shader
    })
  );

  // Add the plane mesh to the scene
  scene.add(planeMesh);

  // Set up the WebGL renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight); // Set renderer size
  
  // Append the renderer's canvas element to the image container
  imageContainer.appendChild(renderer.domElement);

  // Add event listener for mouse over to set isHovered to true
  imageContainer.addEventListener("mouseover", function () {
    isHovered = true;
  });

  // Add event listener for mouse out to set isHovered to false and reset glitch intensity
  imageContainer.addEventListener("mouseout", function () {
    isHovered = false;
    shaderUniforms.glitchIntensity.value = 0;
  });
}

// use the existing image from html in the canvas
initializeScene(new THREE.TextureLoader().load(imageElement.src));

animateScene();

function animateScene() {
  requestAnimationFrame(animateScene);
  
  if (isHovered) {
    hoverDuration += ANIMATION_CONFIG.updateFrequency;

    if (hoverDuration >= 0.5) {
      hoverDuration = 0;
      planeMesh.material.uniforms.glitchIntensity.value = Math.random() * ANIMATION_CONFIG.glitchIntensityMod;
    }
  }

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = imageElement.offsetWidth / imageElement.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight);
});



