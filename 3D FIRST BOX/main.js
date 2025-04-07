// installed three.js, and are either running a build tool, or using a local server with a CDN and import maps

import * as THREE from 'three';

import { OrbitControls } from 'jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';


//It's a good idea to use the width and height of the area we want to fill with our app
//in this case, the width and height of the browser window.

const w = window.innerWidth;
const h = window.innerHeight;


// To actually be able to display anything with three.js, we need three things: SCENE, CAMERA and RENDERER

//CAMERA
//There are a few different cameras in three.js. For now, let's use a "PERSPECTIVECAMERA"

// "FIELD OF VIEW". "FOV" is the extent of the scene that is seen on the display at any given moment. The value is in "degrees".
let FOV = 75;


// The second one is the "ASPECT RATIO". You almost always want to use the width of the element divided by the height
let ASPECT = w / h ;


// The next two attributes are the "NEAR" and "FAR" clipping plane. What that means, is that objects further away from the camera than the value of far or closer than near won't be rendered
let NEAR = 0.1;
let FAR  = 1000;



// PERSPECTIVECAMERA CAMERA 
const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);  

const renderer = new THREE.WebGLRenderer();

const scene = new THREE.Scene();



renderer.setSize( w, h );
//you can also give "SETSIZE" smaller values, like "WINDOW.INNERWIDTH/2" and "WINDOW.INNERHEIGHT/2", which will make the app render at quarter size.
//If you wish to keep the size of your app but render it at a lower resolution, you can use "UPDATESTYLE" as a third argument in "SETSIZE". 
//"SETSIZE(WINDOW.INNERWIDTH/2, WINDOW.INNERHEIGHT/2, FALSE 'This is the UPDATESTYLE ARGUMENT');" will render your app at half resolution, given that your "<canvas>" has 100% width and height.


document.body.appendChild( renderer.domElement );


// Assign "BOXGOMETRY" to "geometry"
// To create a cube, we need a BoxGeometry. This is an object that contains all the points (vertices) and fill (faces) of the cube.
// IN "BOXGOMETRY" have some parameters (width : Float , height : Float , depth : Float , widthSegments : Integer , heightSegments : Integer , depthSegments : Integer)
// In THREE JS have range of gometry bulit in so, you can go to this link and find the suitable gemotry details :- https://threejs.org/docs/#api/en/geometries/BoxGeometry
const geometry = new THREE.BoxGeometry( 1, 1, 1 );


//Assign "MESHABASICMATERIAL" to "material"
//In addition to the geometry, we need a material to color it. 
//Three.js comes with several materials, but we'll stick to the "MESHBASICMATERIAL" for now. 
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );


// The third thing we need is a "Mesh". 
// A "MESH" is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.
// Assign to gemotry and material both together using "MESH" to "cube"
const cube = new THREE.Mesh( geometry, material );


// We Add the "Cube" to the Screen.
// "cube"  contain the BOXGEOMETRY AND MESHmetiriacls.
scene.add( cube );


//By default, when we call scene.add(), the thing we add will be added to the coordinates (0,0,0)
//So We position the camera to lite bit move. 
// Z :- z-coordinate represents the distance of a point from the Camera.
// X :- x-coordinate represents the Horizontal position of the Object.
// Y :- y-coordinate represents the Vertical position of the Object.
camera.position.z = 5;


//TO rendering anything to the "<CANVAS>" we need what's called a render or animation loop.
function animate() {

    // ROTATION ANIMATION IN EVERY TIME LOOP RUN
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}

//This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second). 
renderer.setAnimationLoop( animate );