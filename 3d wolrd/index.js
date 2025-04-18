//IMPORT THE THREE.JS AND THE ORIBITCONTROLS
import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

// IMPORT GETSTARFID AND GETFRESNEMAT FORM THE SRC FOLDER THE SOURCE CODE GET FROM THE GITHUB.
import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

// GET THE VALUES FORM THE WINDOW SRCEEN SIZE
const w = window.innerWidth;
const h = window.innerHeight;

// ADD THE SCENE AND THE CAMERA TO THE PROJECT.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);

// MODIFY THE CAMERA POSSITION , BY DEFULT THE CAMERA POSSITION IS (0,0,0)
// CHANGE THE "Z" POSSITION
camera.position.z = 5;

// ADD THE WEBGUL RENDER FROM THREE.JS
const renderer = new THREE.WebGLRenderer(
  { 
    antialias: true 
  }
);

// SET THE CANVA SIZE USING WINDOW.INNERWIDTH AND WINDOW.INNERHEIGHT 
renderer.setSize(w, h);

// SET THE RENDERER TO THE CANVAS AS A BODY CHILD
document.body.appendChild(renderer.domElement);

// THREE.ColorManagement.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

// CREATE A NEW GROUP USING THREE.JS GROUP METHODE.
const earthGroup = new THREE.Group();

// ADDING ROTATION DEGREES TO THE EARTHGRUOP WE DEFINED BEFOR. SO THE EARTH NOW -23.4 DEGREE ROTATION TO THE EASTERN 
earthGroup.rotation.z = -23.4 * Math.PI / 180;

// ADDING EARTHGROUP TO THE SCENE.
scene.add(earthGroup);

// INITIALIZE ORBITCONTROLS, ALLOWING YOU TO ROTATE, PAN, AND ZOOM THE CAMERA USING THE MOUSE.
new OrbitControls(camera, renderer.domElement);

// CREATE NEW TEXTURELOADER TO THE PROJETC FROM THE THREE.JS , CREATE A TEXTURE TO APPLY TO A SURFACE OR AS A REFLECTION OR REFRACTION MAP.
const loader = new THREE.TextureLoader();

// CREATE NEW GEMOTRY AND GET ICOSAHEDRONGEOMETRY FROM THE THREE.JS , BY DEFULT (radius is 1, detail is 0).
const geometry = new THREE.IcosahedronGeometry(1, 12);

// MESHPHONGMATERIAL USES PER-FRAGMENT SHADING. MATERIAL FOR SHINY SURFACES WITH SPECULAR HIGHLIGHTS.
// PARAMETERS - (OPTIONAL) AN OBJECT WITH ONE OR MORE PROPERTIES DEFINING THE MATERIAL'S APPEARANCE. ANY PROPERTY OF THE MATERIAL (INCLUDING ANY PROPERTY INHERITED FROM MATERIAL) CAN BE PASSED IN HERE.
// THE EXCEPTION IS THE PROPERTY COLOR, WHICH CAN BE PASSED 
const material = new THREE.MeshPhongMaterial({
        // EARTH TEXTUERS AND LOAD TO THE LOADER
        map: loader.load("./textures/00_earthmap1k.jpg"),

        // EARTHSPEACE TEXTUERS AND LOAD TO THE LOADER
        specularMap: loader.load("./textures/02_earthspec1k.jpg"),

        // EARTHBLUER TEXTUERS AND LOAD TO THE LOADER
        bumpMap: loader.load("./textures/01_earthbump1k.jpg"),

        bumpScale: 0.04,
});


// material.map.colorSpace = THREE.SRGBColorSpace;


// CREATING MESH AND SEND GEMOTRY , MATERIAL AS PARAMETERS
const earthMesh = new THREE.Mesh(geometry, material);

// ADDING EARTHMESH TO THE EARTHGROUP.
earthGroup.add(earthMesh);

// A MATERIAL FOR DRAWING GEOMETRIES IN A SIMPLE SHADED (FLAT OR WIREFRAME) WAY.
// PARAMETERS - (OPTIONAL) AN OBJECT WITH ONE OR MORE PROPERTIES DEFINING THE MATERIAL'S APPEARANCE. ANY PROPERTY OF THE MATERIAL (INCLUDING ANY PROPERTY INHERITED FROM MATERIAL) CAN BE PASSED IN HERE.
// THE EXCEPTION IS THE PROPERTY COLOR, WHICH CAN BE PASSED 
const lightsMat = new THREE.MeshBasicMaterial({

        map: loader.load("./textures/03_earthlights1k.jpg"),

        blending: THREE.AdditiveBlending,

});

// CREATE A LIGHT MESH USING GEMOTRY AND LIGHTSMAT
const lightsMesh = new THREE.Mesh(geometry, lightsMat);

// ADD TO THE EARTHGROUP
earthGroup.add(lightsMesh);

// A STANDARD PHYSICALLY BASED MATERIAL, USING METALLIC-ROUGHNESS WORKFLOW.
const cloudsMat = new THREE.MeshStandardMaterial({

        // ADDING NEW TEXTURES AND LOAD TO THE LOADER
        map: loader.load("./textures/04_earthcloudmap.jpg"),
        // ENABEL TRANSPARENT
        transparent: true,
        // ADDING OPACITY
        opacity: 0.8,

        blending: THREE.AdditiveBlending,

        alphaMap: loader.load('./textures/05_earthcloudmaptrans.jpg'),

        // alphaTest: 0.3,
});

// MESHING GEMOTRY , CLOUDMAT AND ADDING IT TO CLOUDEMESH
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);

cloudsMesh.scale.setScalar(1.003);

// ADDING CLOUDMESH TO THE EARTHGROUP
earthGroup.add(cloudsMesh);

// NOW USING IMPORT GETFRESNELMAT FROM SRC FOLDER
const fresnelMat = getFresnelMat();

// MESH THE GETFRESNELMAT AND THE GEOMETRY
const glowMesh = new THREE.Mesh(geometry, fresnelMat);

glowMesh.scale.setScalar(1.01);

// ADD TO THE GROUPEARTH 
earthGroup.add(glowMesh);

//SED THE 2000 VALUE AS A PARAMETER TO THE GETSTARFILED FROM SRC FOLDER
const stars = getStarfield(
  {
    numStars: 2000
  }
);

// ADD THE STARS TO THE SCENE
scene.add(stars);

// SET THE DIRECTIONALLIGHT AND ASSIGN TO THE SUNLIGHT
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);

// SET THE POSSINTION IN X: -2 , Y: 0.5 , Z: 1.5
sunLight.position.set(-2, 0.5, 1.5);

// ADD TO THE SCENE
scene.add(sunLight);

// DEFINED THE ANIMATION FUNCTION
function animate() {

  // REQUEST ANIMATION FRAME AND CALL-BACK SAME ANIMATION
  requestAnimationFrame(animate);

  // EVERY TIME RUN THE ANIMATION EARTHMESH ADD ROTATION " Y " TO THE 0.002
  earthMesh.rotation.y += 0.002;

  // EVERY TIME RUN THE ANIMATION LIGHTSMESH ADD ROTATION " Y " TO THE 0.002
  lightsMesh.rotation.y += 0.002;

  // EVERY TIME RUN THE ANIMATION CLOUDSMESH ADD ROTATION " Y " TO THE 0.002
  cloudsMesh.rotation.y += 0.0023;

  // EVERY TIME RUN THE ANIMATION GLOWMESH ADD ROTATION " Y " TO THE 0.002
  glowMesh.rotation.y += 0.002;

  // EVERY TIME RUN THE ANIMATION STARS SUBSTARCT ROTATION " Y " TO THE 0.002
  stars.rotation.y -= 0.0002;

  // EVERY TIME RUN THE ANIMATION RENDERER THE SCENE AND CAMERA
  renderer.render(scene, camera);
}

// CALL ANIMETION FUNCTION
animate();

// DEFINED THE HANDLEWINDOWRESIZE FUNCTION
function handleWindowResize () {

  // WHEN CALL THE FUNCTION CAMERA ASPECT RESIO WILL CHANGE AS TO THE WINDOW SIZE
  camera.aspect = window.innerWidth / window.innerHeight;

  // UPDATE THE CAMERA PROJECTION MATRIX ACCODINT TO THE WINDOW SIZE
  camera.updateProjectionMatrix();

  // RENDERE WILL RESIZE THE "CANVAS" ACCODINT TO THE WINDOW SIZE
  renderer.setSize(window.innerWidth, window.innerHeight);

}

// DEFIND THE EVENTLISTENER WHEN RESIZE THE WINDOW AND CALL THE "HANDLEWINDOWRESIZE"
window.addEventListener('resize', handleWindowResize, false);