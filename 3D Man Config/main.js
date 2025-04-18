import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import gsap from 'gsap';

const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.position.set(0, 0, 0);
scene.rotation.set(0, 0, 0);    
scene.scale.set(1, 1, 1);

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    2000.00
);  

// const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper);

renderer.setClearColor(0x343434);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 1.9, 4);
camera.rotateX(-10);
orbit.update();

// orbit.addEventListener('change', () => {
//     console.log(`Camera position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
// });

const grid = new THREE.GridHelper(10, 100);
scene.add(grid);

// const ambientLight = new THREE.AmbientLight(0xFFFFFFF, 0.8);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
// scene.add(directionalLight);
// directionalLight.position.set(10, 11, 7);

// const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 2);
// scene.add(directionalLight2);
// directionalLight2.position.set(-10, 11, -7);

const rgbeLoader = new RGBELoader();
const gltfLoader = new GLTFLoader();

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2;

let Man;
let Wolf3D_Hair;
let Wolf3D_Head;
let Wolf3D_Body ;
let Wolf3D_Outfit_Top;
let Wolf3D_Outfit_Bottom;
let Wolf3D_Outfit_Footwear;


rgbeLoader.load('/MR_INT-005_WhiteNeons_NAD.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;

    gltfLoader.load('/My ReadPlayMe.glb', function(gltf) {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        scene.add(model);
        Man = model;
        camera.lookAt( Man.position );
        // console.log(model.children);

        Wolf3D_Head = scene.getObjectByName("Wolf3D_Head"); 
        // console.log(Wolf3D_Head);
        // console.log(Wolf3D_Head.material.color);

        Wolf3D_Hair = scene.getObjectByName("Wolf3D_Hair");
        // console.log(Wolf3D_Hair);
        // console.log(Wolf3D_Hair.material.color);

        Wolf3D_Body = scene.getObjectByName("Wolf3D_Body");
        Wolf3D_Outfit_Top = scene.getObjectByName("Wolf3D_Outfit_Top");
        Wolf3D_Outfit_Bottom = scene.getObjectByName("Wolf3D_Outfit_Bottom");
        Wolf3D_Outfit_Footwear = scene.getObjectByName("Wolf3D_Outfit_Footwear");

    });
});

// console.log(scene.children);


// function onMouseClick(event) {
//     const mouse = new THREE.Vector2();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     const raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera(mouse, camera);

//     const intersects = raycaster.intersectObjects(scene.children, true);
//     if (intersects.length > 0) {
//         const object = intersects[0].object;
//         if (object === selectedObject) {
//             console.log('nice');
//         }
//     }
// }

// window.addEventListener('click', onMouseClick);



const button_1 = document.createElement('button');
button_1.className = 'buttons';
button_1.setAttribute('id', 'button_1');
button_1.style.top = '10px';
button_1.style.right = '10px';
button_1.innerText = 'Click Me 1';
document.body.appendChild(button_1);


const button_2 = document.createElement('button');
button_2.className = 'buttons';
button_2.setAttribute('id', 'button_2');
button_2.style.top = '60px';
button_2.style.right = '10px';
button_2.innerText = 'Click Me 2';
document.body.appendChild(button_2);


const button_3 = document.createElement('button');
button_3.className = 'buttons';
button_3.setAttribute('id', 'button_3');
button_3.style.top = '110px';
button_3.style.right = '10px';
button_3.innerText = 'Click Me 3';
document.body.appendChild(button_3);


const button_4 = document.createElement('button');
button_4.className = 'buttons';
button_4.setAttribute('id', 'button_4');
button_4.style.top = '160px';
button_4.style.right = '10px';
button_4.innerText = 'Click Me 4';
document.body.appendChild(button_4);


const button_5 = document.createElement('button');
button_5.className = 'buttons';
button_5.setAttribute('id', 'button_5');
button_5.style.top = '210px';
button_5.style.right = '10px';
button_5.innerText = 'Click Me 5';
document.body.appendChild(button_5);



// Select the button
const buttons = document.querySelectorAll('.buttons');
buttons.forEach(button => {
    button.style.zIndex = '1000';
    button.style.color = '#ffffff';
    button.style.fontWeight = '300';
    button.style.borderRadius = '2em';
    button.style.textAlign = 'center';
    button.style.position = 'absolute';
    button.style.padding = '0.5em 1.7em';
    button.style.textDecoration = 'none';
    button.style.transition = 'all 0.2s';
    button.style.margin = '0 0.1em 1em 0';
    button.style.display = 'inline-block';
    button.style.boxSizing = 'border-box';
    button.style.backgroundColor = 'transparent';
    button.style.fontFamily = '"Roboto", sans-serif';
    button.style.border = '0.16em solid rgb(255, 255, 255)';
    button.style.textShadow = '0 0.04em 0.04em rgba(255, 255, 255, 0.253)';

    button.addEventListener('mouseover', function() {
        button.style.color = 'black';
        button.style.backgroundColor = 'rgb(255, 255, 255)';
    });

    button.addEventListener('mouseout', function() {
        button.style.color = '#ffffff';
        button.style.backgroundColor = 'transparent'; // Default background
    });
});



let Wolf3D_Default_color = 0x00FFFFFF;



let Color_Store ;
let button_save;
let button_close;

let Color_Plates;

function ColoraPalates (Wolf3D){
    Color_Plates = document.createElement('div');
    Color_Plates.className = 'color-plates'; // use this class to style the div
    Color_Plates.style.position = 'absolute';
    Color_Plates.style.zIndex = '1010';
    Color_Plates.style.top = '10px';
    Color_Plates.style.right = '10px';
    Color_Plates.style.width = '250px';
    Color_Plates.style.height = '140px';
    Color_Plates.style.padding = '10px';
    Color_Plates.style.borderRadius = '10px';
    Color_Plates.style.backgroundColor = 'rgba(52, 52, 52, 0.5)';
    document.body.appendChild(Color_Plates);

    let color_list = ['#FF0000', '#0000FF', '#008000', '#FFFF00', '#800080', '#FFA500', '#FFC0CB', '#A52A2A', '#000000', '#FFFFFF', '#808080', '#00FFFF', '#FF00FF', '#00FF00', '#4B0082', '#800000', '#000080', '#808000', '#008080', '#C0C0C0', '#00FFFF', '#FF00FF', '#FFD700', '#F5F5DC'];
     color_list.forEach(color => {
        let div = document.createElement('div');
            div.style.backgroundColor = color;
            div.style.width = '20px';
            div.style.height = '20px';
            div.style.display = 'inline-block';
            div.style.margin = '5px';
            div.style.cursor = 'pointer';
            div.style.borderRadius = '25%';
            div.style.boxShadow = '0 0.04em 0.04em rgba(0, 0, 0, 0.253)';
            div.style.transition = 'all 0.2s';
            div.addEventListener('mouseover', function() {
                div.style.transform = 'scale(1.1)';
            });

            div.addEventListener('mouseout', function() {
                div.style.transform = 'scale(1)';
            });

            div.addEventListener('click', function() {
                // console.log("click color button");
                let Color_Edit = color;
                // console.log(typeof(Color_Edit));
                Color_Edit = Color_Edit.replace('#', '0x');
                // console.log(Color_Edit);
                Color_Store = Color_Edit;
                switch (Wolf3D) {
                    case 1:
                        Wolf3D_Head.material.color.setHex(Color_Store);    
                        break;
                    
                    case 2:
                        Wolf3D_Body.material.color.setHex(Color_Store);    
                        break;

                    case 3:
                        Wolf3D_Outfit_Top.material.color.setHex(Color_Store);    
                        break;

                    case 4:
                        Wolf3D_Outfit_Bottom.material.color.setHex(Color_Store);    
                        break;
                    
                    case 5:
                        Wolf3D_Outfit_Footwear.material.color.setHex(Color_Store);    
                        break;

                    default:
                        console.log("An Error Occurred");
                        break;
                }
            });

            Color_Plates.appendChild(div);

    });

    button_save = document.createElement('button');
    button_save.className = 'button_close_Save';
    button_save.setAttribute('id', 'Save');
    button_save.style.zIndex = '1011';
    button_save.style.top = '115px';
    button_save.style.right = '10px';
    button_save.innerText = 'Save';
    Color_Plates.appendChild(button_save);
    
    
    button_close = document.createElement('button');
    button_close.className = 'button_close_Save';
    button_close.setAttribute('id', 'Close');
    button_close.style.zIndex = '1011';
    button_close.style.top = '115px';
    button_close.style.right = '90px';
    button_close.innerText = 'Close';
    Color_Plates.appendChild(button_close);


    const button_close_save = document.querySelectorAll('.button_close_Save');
    button_close_save.forEach(button => {
        button.style.zIndex = '1000';
        button.style.color = '#ffffff';
        button.style.fontWeight = '300';
        button.style.borderRadius = '2em';
        button.style.textAlign = 'center';
        button.style.position = 'absolute';
        button.style.padding = '0.5em 1.7em';
        button.style.textDecoration = 'none';
        button.style.transition = 'all 0.2s';
        button.style.margin = '0 0.1em 1em 0';
        button.style.display = 'inline-block';
        button.style.boxSizing = 'border-box';
        button.style.backgroundColor = 'transparent';
        button.style.fontFamily = '"Roboto", sans-serif';
        button.style.border = '0.16em solid rgb(255, 255, 255)';
        button.style.textShadow = '0 0.04em 0.04em rgba(255, 255, 255, 0.253)';
    
        button.addEventListener('mouseover', function() {
            button.style.color = 'black';
            button.style.backgroundColor = 'rgb(255, 255, 255)';
        });
    
        button.addEventListener('mouseout', function() {
            button.style.color = '#ffffff';
            button.style.backgroundColor = 'transparent'; // Default background
        });


        const SAVE = document.getElementById('Save');
            SAVE.addEventListener('click', () => {
                // console.log("color");
                if (Color_Store === undefined) {
                    Color_Store = Wolf3D_Default_color;
                    switch (Wolf3D) {
                        case 1:
                            Wolf3D_Head.material.color.setHex(Color_Store);    
                            break;
                        
                        case 2:
                            Wolf3D_Body.material.color.setHex(Color_Store);
                            break;
                        
                        case 3:
                            Wolf3D_Outfit_Top.material.color.setHex(Color_Store);
                            break;
                        
                        case 4:
                            Wolf3D_Outfit_Bottom.material.color.setHex(Color_Store);
                            break;
                        
                        case 5:
                            Wolf3D_Outfit_Footwear.material.color.setHex(Color_Store);
                            break;
    
                        default:
                            console.log("An Error Occurred");
                            break;
                    }
                }          
                ShowTheButtons();
                Color_Plates.remove();
                gsap.to(camera.position,
                    {   x: 0, 
                        y: 1.9, 
                        z: 4, 
                        duration: 1.5,
                        onUpdate: () => {
                            camera.lookAt(Man.position);
                        }
                    }); 
                // console.log(Color_Store);
            });
            

        const CLOSE = document.getElementById('Close');
            CLOSE.addEventListener('click', () => {
                switch (Wolf3D) {
                    case 1:
                        Wolf3D_Head.material.color.setHex(Wolf3D_Default_color);
                        break;
                    
                    case 2:
                        Wolf3D_Body.material.color.setHex(Wolf3D_Default_color);
                        break;
                    
                    case 3:
                        Wolf3D_Outfit_Top.material.color.setHex(Wolf3D_Default_color);
                        break;
                    
                    case 4:
                        Wolf3D_Outfit_Bottom.material.color.setHex(Wolf3D_Default_color);
                        break;
                    
                    case 5:
                        Wolf3D_Outfit_Footwear.material.color.setHex(Wolf3D_Default_color);
                        break;
                    
                    default:
                        console.log("An Error Occurred");
                        break;                    
                }
                ShowTheButtons();
                Color_Plates.remove();
                gsap.to(camera.position,
                    {   x: 0, 
                        y: 1.9, 
                        z: 4, 
                        duration: 1.5,
                        onUpdate: () => {
                            camera.lookAt(Man.position);
                        }
                    }); 
            });
    });
    

}


function ShowTheButtons(){
    buttons.forEach(button => {
        button.style.display = 'inline-block';
    });
}


function HideTheBUttons(){
    buttons.forEach(button => {
        button.style.display = 'none';
    });
}


button_1.addEventListener('click', () => {
    gsap.to(camera.position, 
                {   x: -2.926, 
                    y: 3.17, 
                    z: 1.09, 
                    duration: 1.5,
                    onUpdate: () => {
                        camera.lookAt(Man.position);
                    }
                });
    HideTheBUttons();
    ColoraPalates(1);
    
});

button_2.addEventListener('click', () => {
    gsap.to(camera.position, 
                {   x: 1.026, 
                    y: 2.24, 
                    z: 0.11, 
                    duration: 1.5,
                    onUpdate: () => {
                        camera.lookAt(Man.position);
                    }
                });
    HideTheBUttons();
    ColoraPalates(2);
    
});

button_3.addEventListener('click', () => {
    gsap.to(camera.position, 
                {   x: 1.024, 
                    y: 2.62,
                    z: 1.51,
                    duration: 1.5,
                    onUpdate: () => {
                        camera.lookAt(Man.position);
                    }
                });
    HideTheBUttons();
    ColoraPalates(3);
    
});

button_4.addEventListener('click', () => {
    gsap.to(camera.position, 
                {   x: -0.75, 
                    y: 1.18,
                    z: 2.02, 
                    duration: 1.5,
                    onUpdate: () => {
                        camera.lookAt(Man.position);
                    }
                });
    HideTheBUttons();
    ColoraPalates(4);
    
});

button_5.addEventListener('click', () => {
    gsap.to(camera.position, 
                {   x: 0, 
                    y: 0.42, 
                    z: 0.88,
                    duration: 1.5,
                    onUpdate: () => {
                        camera.lookAt(Man.position);
                    }
                });
    HideTheBUttons();
    ColoraPalates(5);
    
});


function animate(time) {
    // if (Man) {
    //     Man.rotation.y += 0.002;
    // }
    renderer.render(scene, camera); 
}


renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
