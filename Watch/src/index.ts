import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  timeout,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  DiamondPlugin,
  FrameFadePlugin,
  PerspectiveCamera,
  Vector3, 
  Vector2, 
  Texture, 
  Color,
  GLTFAnimationPlugin,
  GroundPlugin,
  BloomPlugin,
  TemporalAAPlugin,
  AnisotropyPlugin,
  GammaCorrectionPlugin,

  addBasePlugins,
  ITexture, TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,

  IViewerPlugin, FileTransferPlugin,

  // Color, // Import THREE.js internals
  // Texture, // Import THREE.js internals
} from "webgi";
import gsap from "gsap";


const musicControl = document.querySelector(".music--control") as HTMLElement;
// const musicControlSvg = document.querySelector(".music--control--svg") as HTMLElement;
const soundWave = document.querySelector(".sound-wave") as HTMLElement;
const audio = document.getElementById("Audio")  as HTMLAudioElement; 


const body = document.querySelector("body") as HTMLElement;
const nightMode = document.querySelector(".night--mode") as HTMLElement;
const nightModeSvg = document.querySelector(".night--mode--svg") as HTMLElement;


const button = document.querySelector(".button") as HTMLElement;
const buttonSvg = document.querySelector(".btn-customize-1") as HTMLElement;
const buttonSvg2 = document.querySelector(".btn-customize-2") as HTMLElement;

let AsyncWebGiPath: string = '/assets/3d/apple_watch_ultra_-_orange.glb';
const Arrary_3D_Name = [ 'apples_smart_watch_ios.glb' , 'apple_watch_ultra_-_orange.glb' , 'uploads_files_4579221_Model.glb' , 'uploads_files_5352861_apple+watch.glb' , 'uploads_files_5579939_apple+watch1.glb' ]; 
let i = 0;

const ArrayOfStyle = [
  document.getElementById('detalhes') as HTMLElement,
  document.getElementById('footer-p') as HTMLElement,
  document.getElementById('instrucoes') as HTMLElement,
  document.getElementById('Name') as HTMLElement,
  document.getElementById('Credit') as HTMLElement,
  document.getElementById('logo-p') as HTMLElement,
];

const H1Element = document.getElementById('nome_produto') as HTMLElement;

function changeStyle() {
  H1Element.style.top = "40";
  H1Element.style.left = "40px";
  H1Element.style.position = "relative";
  H1Element.style.display = "flex";
  H1Element.style.textAlign = "left";
  H1Element.style.fontSize = "13vw";
  H1Element.style.color = "#ffffff";
  H1Element.style.fontWeight = "800";
  H1Element.style.letterSpacing = "-0.9vw";
  H1Element.style.lineHeight = "13vw";
  H1Element.style.display = "flex";
  H1Element.style.opacity = "0.05";
}

function DayStyle() {
  body.style.background = "#f0f0f0";
  button.style.borderColor = "#000000";
  button.style.background = "transparent";
  button.style.color = "#000000";
  buttonSvg.style.stroke = "#000000"; 
  buttonSvg2.style.stroke = "#000000";
  ArrayOfStyle.forEach((element) => {
    element.style.color = "#000000";
  });
  H1Element.style.color = "#000000";
  H1Element.style.opacity = "0.1";
  nightModeSvg.style.stroke = "#000000";
  musicControlSvg.style.stroke = "#000000";
}

function NightStyle() {
  body.style.background = `linear-gradient( 180deg, #202020 0%, #343434 100%)`;
  body.style.height = "100vh";
  body.style.overflow = "hidden";
  button.style.borderColor = "#ffffff";
  button.style.background = "transparent";
  button.style.color = "#ffffff";
  buttonSvg.style.stroke = "#ffffff"; 
  buttonSvg2.style.stroke = "#ffffff";
  ArrayOfStyle.forEach((element) => {
    element.style.color = "#ffffff";
  });
  H1Element.style.color = "#ffffff";
  H1Element.style.opacity = "0.05";
  nightModeSvg.style.stroke = "#ffffff";
  musicControlSvg.style.stroke = "#ffffff";
}

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.querySelector(".loader .progress") as HTMLElement;
  // const audioLoder = document.getElementById('Audio-loder');

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    progressBar.style.transform = `scaleX(${progress / 100})`;
    if (progress >= 100) {
      clearInterval(interval);
      changeStyle();
      document.body.classList.add("loaded");
      audio.play();
      audio.setAttribute('autoplay','');
      // audioLoder.pause();
      // audio.setAttribute('autoplay','');
    }
  }, 100);
});

let musicPlaying = true;
musicControl.addEventListener("click", () => {
  if (musicPlaying) {
    soundWave.remove();
    audio.pause();
    musicPlaying = false;
  } else {
    musicControlSvg.appendChild(soundWave);
    audio.play();
    musicPlaying = true;
  }
});


let NIghtModeOff = false;
nightMode.addEventListener("click", () => {
  if (!NIghtModeOff) {
    DayStyle();
    NIghtModeOff = true;
  } else {
    NightStyle();
    NIghtModeOff = false;
  }
});



















const ModeViewer = document.querySelector("model-viewer") as HTMLElement;
const Load = document.querySelector('.loader') as HTMLElement;
const BodyDiv = document.getElementById('BOdy-div') as HTMLElement;
const Heard = document.querySelector('.header') as HTMLElement;
const musicControlSvg = document.querySelector(".music--control--svg") as HTMLElement;


button.addEventListener("click", () => {

  gsap.timeline()
  .to("#instrucoes", { opacity: 0, duration: 0.8, x: -100 })
  .to("#nome_produto", { opacity: 0, duration: 0.8, x: -100 }, "-=0.8")
  .to("#footer", { opacity: 0, duration: 0.8, x: 100 }, "-=0.8");


  document.querySelector("body")?.insertAdjacentHTML('beforeend', `
    <div id="webgi-canvas-container">
      <canvas id="webgi-canvas"></canvas>
    </div>

    <button id="Button-Exit">
          Exit Now<!-- CHANGE THE TEXT -->
          <svg class="btn-customize-1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
          <path d="m10.998 16 5-4-5-4v3h-9v2h9z"></path>
          <path d="M12.999 2.999a8.938 8.938 0 0 0-6.364 2.637L8.049 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051S20 10.13 20 12s-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637C21.063 16.665 22 14.405 22 12s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"></path>
          </svg>
    </button>

    <button id="Button-Next">
          Next Item<!-- CHANGE THE TEXT -->
          <svg xmlns="http://www.w3.org/2000/svg" class="btn-customize-1" width="40" height="40" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
            <path d="M10.296 7.71 14.621 12l-4.325 4.29 1.408 1.42L17.461 12l-5.757-5.71z"></path>
            <path d="M6.704 6.29 5.296 7.71 9.621 12l-4.325 4.29 1.408 1.42L12.461 12z"></path>
          </svg>
    </button>

  `);

  ModeViewer.remove();
  Load.remove();
  BodyDiv.remove(); // if you remove this code line the gsap animetion will showed up
  Heard.style.marginTop = '20px';
  Heard.style.color = '#000000';
  musicControlSvg.style.stroke = "#000000"
  nightModeSvg.style.stroke = "#000000"
  setupViewer();



  const ButtonExit = document.getElementById("Button-Exit") as HTMLElement;
  const ButtonNext = document.getElementById("Button-Next") as HTMLElement;

  ButtonExit.addEventListener("click", () => {
    document.getElementById("webgi-canvas-container")?.remove();
    document.getElementById("Button-Exit")?.remove();
    document.getElementById("Button-Next")?.remove();
    document.querySelector("body")?.insertAdjacentHTML('beforeend', `
      <model-viewer alt="A 3D model of an Apple Watch" ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" camera-controls></model-viewer>
        <div id="BOdy-div">

          <div id="instrucoes">
            Design by
            <a href="https://github.com/HimanthaThathsara" target="_blank" id="Name">Himantha Thathsara.</a>
            
            <br />

            Model credits:
            <a href="##" target="_blank" id="Credit">SkechFeb</a>
          </div>

          <h1 id="nome_produto">New Model Configuration</h1>

          <div id="footer">
            <h2 id="detalhes">
              This watches have offer a range of features beyond just telling time. This can track your fitness, monitor your heart rate, and even keep you connected with notifications from your smartphone. 
            </h2>
            <p id="footer-p">
              Click on the items to learn more. Tap to rotate the Model. Use scroll
              or pinch to zoom in <!--and double-click to reset. -->
            </p>
            <button tabindex="-1" class="button button-scroll" onclick="Start()">
              Start now <!-- CHANGE THE TEXT -->
              <svg class="btn-customize" width="40" height="40" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_254_236)">
                  <path class="btn-customize-1" d="M12 15.1511C13.6569 15.1511 15 13.808 15 12.1511C15 10.4943 13.6569 9.15112 12 9.15112C10.3431 9.15112 9 10.4943 9 12.1511C9 13.808 10.3431 15.1511 12 15.1511Z" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"/>
                  <path class="btn-customize-2" d="M19.4 15.1511C19.2669 15.4527 19.2272 15.7873 19.286 16.1117C19.3448 16.4361 19.4995 16.7354 19.73 16.9711L19.79 17.0311C19.976 17.2169 20.1235 17.4374 20.2241 17.6802C20.3248 17.923 20.3766 18.1833 20.3766 18.4461C20.3766 18.709 20.3248 18.9692 20.2241 19.212C20.1235 19.4548 19.976 19.6754 19.79 19.8611C19.6043 20.0471 19.3837 20.1946 19.1409 20.2952C18.8981 20.3959 18.6378 20.4477 18.375 20.4477C18.1122 20.4477 17.8519 20.3959 17.6091 20.2952C17.3663 20.1946 17.1457 20.0471 16.96 19.8611L16.9 19.8011C16.6643 19.5706 16.365 19.4159 16.0406 19.3571C15.7162 19.2983 15.3816 19.338 15.08 19.4711C14.7842 19.5979 14.532 19.8084 14.3543 20.0767C14.1766 20.3449 14.0813 20.6593 14.08 20.9811V21.1511C14.08 21.6816 13.8693 22.1903 13.4942 22.5653C13.1191 22.9404 12.6104 23.1511 12.08 23.1511C11.5496 23.1511 11.0409 22.9404 10.6658 22.5653C10.2907 22.1903 10.08 21.6816 10.08 21.1511V21.0611C10.0723 20.7301 9.96512 20.4091 9.77251 20.1398C9.5799 19.8705 9.31074 19.6654 9 19.5511C8.69838 19.418 8.36381 19.3783 8.03941 19.4371C7.71502 19.4959 7.41568 19.6506 7.18 19.8811L7.12 19.9411C6.93425 20.1271 6.71368 20.2746 6.47088 20.3752C6.22808 20.4759 5.96783 20.5277 5.705 20.5277C5.44217 20.5277 5.18192 20.4759 4.93912 20.3752C4.69632 20.2746 4.47575 20.1271 4.29 19.9411C4.10405 19.7554 3.95653 19.5348 3.85588 19.292C3.75523 19.0492 3.70343 18.789 3.70343 18.5261C3.70343 18.2633 3.75523 18.003 3.85588 17.7602C3.95653 17.5174 4.10405 17.2969 4.29 17.1111L4.35 17.0511C4.58054 16.8154 4.73519 16.5161 4.794 16.1917C4.85282 15.8673 4.81312 15.5327 4.68 15.2311C4.55324 14.9354 4.34276 14.6831 4.07447 14.5054C3.80618 14.3278 3.49179 14.2324 3.17 14.2311H3C2.46957 14.2311 1.96086 14.0204 1.58579 13.6453C1.21071 13.2703 1 12.7616 1 12.2311C1 11.7007 1.21071 11.192 1.58579 10.8169C1.96086 10.4418 2.46957 10.2311 3 10.2311H3.09C3.42099 10.2234 3.742 10.1162 4.0113 9.92363C4.28059 9.73103 4.48572 9.46186 4.6 9.15112C4.73312 8.84951 4.77282 8.51493 4.714 8.19053C4.65519 7.86614 4.50054 7.5668 4.27 7.33112L4.21 7.27112C4.02405 7.08538 3.87653 6.8648 3.77588 6.622C3.67523 6.37921 3.62343 6.11895 3.62343 5.85612C3.62343 5.59329 3.67523 5.33304 3.77588 5.09024C3.87653 4.84745 4.02405 4.62687 4.21 4.44112C4.39575 4.25517 4.61632 4.10765 4.85912 4.007C5.10192 3.90635 5.36217 3.85455 5.625 3.85455C5.88783 3.85455 6.14808 3.90635 6.39088 4.007C6.63368 4.10765 6.85425 4.25517 7.04 4.44112L7.1 4.50112C7.33568 4.73166 7.63502 4.88631 7.95941 4.94513C8.28381 5.00395 8.61838 4.96424 8.92 4.83112H9C9.29577 4.70436 9.54802 4.49388 9.72569 4.22559C9.90337 3.9573 9.99872 3.64291 10 3.32112V3.15112C10 2.62069 10.2107 2.11198 10.5858 1.73691C10.9609 1.36184 11.4696 1.15112 12 1.15112C12.5304 1.15112 13.0391 1.36184 13.4142 1.73691C13.7893 2.11198 14 2.62069 14 3.15112V3.24112C14.0013 3.56291 14.0966 3.8773 14.2743 4.14559C14.452 4.41388 14.7042 4.62436 15 4.75112C15.3016 4.88424 15.6362 4.92395 15.9606 4.86513C16.285 4.80631 16.5843 4.65166 16.82 4.42112L16.88 4.36112C17.0657 4.17517 17.2863 4.02765 17.5291 3.927C17.7719 3.82636 18.0322 3.77455 18.295 3.77455C18.5578 3.77455 18.8181 3.82636 19.0609 3.927C19.3037 4.02765 19.5243 4.17517 19.71 4.36112C19.896 4.54687 20.0435 4.76745 20.1441 5.01024C20.2448 5.25304 20.2966 5.51329 20.2966 5.77612C20.2966 6.03895 20.2448 6.29921 20.1441 6.542C20.0435 6.7848 19.896 7.00538 19.71 7.19112L19.65 7.25112C19.4195 7.4868 19.2648 7.78614 19.206 8.11053C19.1472 8.43493 19.1869 8.76951 19.32 9.07112V9.15112C19.4468 9.44689 19.6572 9.69914 19.9255 9.87682C20.1938 10.0545 20.5082 10.1498 20.83 10.1511H21C21.5304 10.1511 22.0391 10.3618 22.4142 10.7369C22.7893 11.112 23 11.6207 23 12.1511C23 12.6816 22.7893 13.1903 22.4142 13.5653C22.0391 13.9404 21.5304 14.1511 21 14.1511H20.91C20.5882 14.1524 20.2738 14.2478 20.0055 14.4254C19.7372 14.6031 19.5268 14.8554 19.4 15.1511V15.1511Z" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_254_236">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.151123)"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>

        </div>
    `);

    const ModeViewerDOM = document.querySelector('model-viewer')as HTMLElement;
    ModeViewerDOM.setAttribute('src', AsyncWebGiPath );

    Heard.style.marginTop = '-160px';
    Heard.style.color = '#ffffff';
    musicControlSvg.style.stroke = "#ffffff";
    nightModeSvg.style.stroke = "#ffffff";

    const H1Element = document.getElementById('nome_produto') as HTMLElement;

    H1Element.style.top = "40";
    H1Element.style.left = "40px";
    H1Element.style.position = "relative";
    H1Element.style.display = "flex";
    H1Element.style.textAlign = "left";
    H1Element.style.fontSize = "13vw";
    H1Element.style.color = "#ffffff";
    H1Element.style.fontWeight = "800";
    H1Element.style.letterSpacing = "-0.9vw";
    H1Element.style.lineHeight = "13vw";
    H1Element.style.display = "flex";
    H1Element.style.opacity = "0.05";


  const musicControl = document.querySelector(".music--control") as HTMLElement;
  // const musicControlSvg = document.querySelector(".music--control--svg") as HTMLElement;
  const soundWave = document.querySelector(".sound-wave") as HTMLElement;
  const audio = document.getElementById("Audio")  as HTMLAudioElement; 


  const body = document.querySelector("body") as HTMLElement;
  const nightMode = document.querySelector(".night--mode") as HTMLElement;


  const button = document.querySelector(".button") as HTMLElement;
  const buttonSvg = document.querySelector(".btn-customize-1") as HTMLElement;
  const buttonSvg2 = document.querySelector(".btn-customize-2") as HTMLElement;


  const ArrayOfStyle = [
    document.getElementById('detalhes') as HTMLElement,
    document.getElementById('footer-p') as HTMLElement,
    document.getElementById('instrucoes') as HTMLElement,
    document.getElementById('Name') as HTMLElement,
    document.getElementById('Credit') as HTMLElement,
    document.getElementById('logo-p') as HTMLElement,
  ];

  function DayStyle() {
    body.style.background = "#f0f0f0";
    button.style.borderColor = "#000000";
    button.style.background = "transparent";
    button.style.color = "#000000";
    buttonSvg.style.stroke = "#000000"; 
    buttonSvg2.style.stroke = "#000000";
    ArrayOfStyle.forEach((element) => {
      element.style.color = "#000000";
    });
    H1Element.style.color = "#000000";
    H1Element.style.opacity = "0.1";
    nightModeSvg.style.stroke = "#000000";
    musicControlSvg.style.stroke = "#000000";
  }

  function NightStyle() {
    body.style.background = `linear-gradient( 180deg, #202020 0%, #343434 100%)`;
    body.style.height = "100vh";
    body.style.overflow = "hidden";
    button.style.borderColor = "#ffffff";
    button.style.background = "transparent";
    button.style.color = "#ffffff";
    buttonSvg.style.stroke = "#ffffff"; 
    buttonSvg2.style.stroke = "#ffffff";
    ArrayOfStyle.forEach((element) => {
      element.style.color = "#ffffff";
    });
    H1Element.style.color = "#ffffff";
    H1Element.style.opacity = "0.05";
    nightModeSvg.style.stroke = "#ffffff";
    musicControlSvg.style.stroke = "#ffffff";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.querySelector(".loader .progress") as HTMLElement;
    // const audioLoder = document.getElementById('Audio-loder');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      progressBar.style.transform = `scaleX(${progress / 100})`;
      if (progress >= 100) {
        clearInterval(interval);
        changeStyle();
        document.body.classList.add("loaded");
        audio.play();
        audio.setAttribute('autoplay','');
        // audioLoder.pause();
        // audio.setAttribute('autoplay','');
      }
    }, 100);
  });

  let musicPlaying = true;
  musicControl.addEventListener("click", () => {
    if (musicPlaying) {
      soundWave.remove();
      audio.pause();
      musicPlaying = false;
    } else {
      musicControlSvg.appendChild(soundWave);
      audio.play();
      musicPlaying = true;
    }
  });


  let NIghtModeOff = false;
  nightMode.addEventListener("click", () => {
    if (!NIghtModeOff) {
      DayStyle();
      NIghtModeOff = true;
    } else {
      NightStyle();
      NIghtModeOff = false;
    }
  });

  }

  );

  ButtonNext.addEventListener("click", () => {
    i = (i + 1) % Arrary_3D_Name.length;
    AsyncWebGiPath = "./assets/3d/"+Arrary_3D_Name[i];
    console.log(AsyncWebGiPath);
    if(i === Arrary_3D_Name.length){
      i = 0 ;
    }
    setupViewer();

  });



});


async function setupViewer(){

  // Initialize the viewer
  const viewer = new ViewerApp({
      canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
  })

  // Add plugins individually.
  // await viewer.addPlugin(GBufferPlugin)
  // await viewer.addPlugin(new ProgressivePlugin(32))
  // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
  // await viewer.addPlugin(GammaCorrectionPlugin)
  // await viewer.addPlugin(SSRPlugin)
  // await viewer.addPlugin(SSAOPlugin)
  // await viewer.addPlugin(DiamondPlugin)
  // await viewer.addPlugin(FrameFadePlugin)
  // await viewer.addPlugin(GLTFAnimationPlugin)
  // await viewer.addPlugin(GroundPlugin)
  // await viewer.addPlugin(BloomPlugin)
  // await viewer.addPlugin(TemporalAAPlugin)
  // await viewer.addPlugin(AnisotropyPlugin)
  // and many more...



  // or use this to add all main ones at once.
  await addBasePlugins(viewer); // check the source: https://codepen.io/repalash/pen/JjLxGmy for the list of plugins added.

  // Add a popup(in HTML) with download progress when any asset is downloading.
  await viewer.addPlugin(AssetManagerBasicPopupPlugin);

  // Required for downloading files from the UI
  await viewer.addPlugin(FileTransferPlugin);

  // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
  await viewer.addPlugin(CanvasSnipperPlugin);

  // Import and add a GLB file.
  await viewer.load(AsyncWebGiPath);

  // Load an environment map if not set in the glb file
  await viewer.setEnvironmentMap("./assets/MR_INT-005_WhiteNeons_NAD.hdr");

  //get the current camera possition
  // const camera = viewer.scene.activeCamera;
  // console.log(camera.position);

  // ever time i change something in the camera, i can get the new possition
  // camera.addEventListener("update", () => {
  //   console.log(camera.position);
  // });




  // const cameraObj = new PerspectiveCamera();
  // viewer.scene.activeCamera = viewer.createCamera(cameraObj); 
  
  // const controller = viewer.scene.activeCamera;
  // // get the threejs camera
  // const perspectiveCamera = controller.cameraObject;
  // // get orbit controls
  // const orbitControls = controller.controls;
  
  viewer.scene.activeCamera.position = new Vector3(0.4077, 0.4077 , 0.6207);
  viewer.scene.activeCamera.target = new Vector3(0, 0, 0);

  // Add some UI for tweak and testing.
  const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)

  // Add plugins to the UI to see their settings.
  uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin)

}
