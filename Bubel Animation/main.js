import * as THREE from 'three';
import { ParallaxBarrierEffect } from 'three/addons/effects/ParallaxBarrierEffect.js';

let containers, Camera, Scene, renderer, effect;
const spheres = [];

let mouseX = 0;
let mouseY = 0;

let WindowX = window.innerWidth / 360;
let WindowY = window.innerHeight / 360;

document.addEventListener( 'mousemove', onDocumentMouseMove );

containers = document.createElement( 'div' );
document.body.appendChild( containers );

Camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 100 );
Camera.position.z = 5;

Scene = new THREE.Scene();
Scene.background = 0xffffff;

const geometry = new THREE.SphereGeometry( 0.1, 32, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

for ( let i = 0; i < 500; i ++ ) {

const mesh = new THREE.Mesh( geometry, material );

mesh.position.x = Math.random() * 10 - 5;
mesh.position.y = Math.random() * 10 - 5;
mesh.position.z = Math.random() * 10 - 5;

mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

Scene.add( mesh );

spheres.push( mesh );

}


renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setAnimationLoop( animate );
containers.appendChild( renderer.domElement );

const width = window.innerWidth || 2;
const height = window.innerHeight || 2;

effect = new ParallaxBarrierEffect( renderer );
effect.setSize( width, height );


window.addEventListener( 'resize', onWindowResize );


function onWindowResize() {
	WindowX = window.innerWidth / 2;
	WindowY = window.innerHeight / 2;

	Camera.aspect = window.innerWidth / window.innerHeight;
	Camera.updateProjectionMatrix();

	effect.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - WindowX ) / 360;
    mouseY = ( event.clientY - WindowY ) / 360;
}

function animate() {
    const timer = 0.0001 * Date.now();

	Camera.position.x += ( mouseX - Camera.position.x ) * .05;
	Camera.position.y += ( - mouseY - Camera.position.y ) * .05;

	Camera.lookAt( Scene.position );

	for ( let i = 0, il = spheres.length; i < il; i ++ ) {

		const sphere = spheres[ i ];

		sphere.position.x = 5 * Math.cos( timer + i );
		sphere.position.y = 5 * Math.sin( timer + i * 1.1 );

	}

	effect.render( Scene, Camera );

}
