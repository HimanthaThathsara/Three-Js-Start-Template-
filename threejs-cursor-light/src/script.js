

import './main.css'
import { Clock, Scene, LoadingManager, WebGLRenderer, sRGBEncoding, Group, PerspectiveCamera, DirectionalLight, PointLight, MeshPhongMaterial } from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'



const ftsLoader = document.querySelector(".lds-roller")
const looadingCover = document.getElementById("loading-text-intro")
const loadingManager = new LoadingManager()

loadingManager.onLoad = function () {

    document.querySelector(".main-container").style.visibility = 'visible'
    document.querySelector("body").style.overflow = 'auto'

    const yPosition = { y: 0 }

    new TWEEN.Tween(yPosition).to({ y: 100 }, 900).easing(TWEEN.Easing.Quadratic.InOut).start()
        .onUpdate(function () { looadingCover.style.setProperty('transform', `translate( 0, ${yPosition.y}%)`) })
        .onComplete(function () { looadingCover.parentNode.removeChild(document.getElementById("loading-text-intro")); TWEEN.remove(this) })

    introAnimation()
    ftsLoader.parentNode.removeChild(ftsLoader)

    window.scroll(0, 0)

}



const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
dracoLoader.setDecoderConfig({ type: 'js' })
const loader = new GLTFLoader(loadingManager)
loader.setDRACOLoader(dracoLoader)



const container = document.getElementById('canvas-container')



let oldMaterial
let secondContainer = false
let width = container.clientWidth
let height = container.clientHeight



const scene = new Scene()



const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
renderer.autoClear = true
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
renderer.setSize(width, height)
renderer.outputEncoding = sRGBEncoding
container.appendChild(renderer.domElement)





const cameraGroup = new Group()
scene.add(cameraGroup)

const camera = new PerspectiveCamera(35, width / height, 1, 100)
camera.position.set(19, 1.54, -0.1)
cameraGroup.add(camera)


window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()

    renderer.setSize(container.clientWidth, container.clientHeight)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
})



const sunLight = new DirectionalLight(0x435c72, 0.08)
sunLight.position.set(-100, 0, -100)
scene.add(sunLight)

const fillLight = new PointLight(0x88b2d9, 2.7, 4, 3)
fillLight.position.set(30, 3, 1.8)
scene.add(fillLight)



loader.load('###', function (gltf) {

    gltf.scene.traverse((obj) => {
        if (obj.isMesh) {
            oldMaterial = obj.material
            obj.material = new MeshPhongMaterial({
                shininess: 45
            })
        }
    })
    scene.add(gltf.scene)
    clearScene()
})

function clearScene() {
    oldMaterial.dispose()
    renderer.renderLists.dispose()
}



function introAnimation() {
    new TWEEN.Tween(camera.position.set(0, 4, 2.7)).to({ x: 0, y: 2.4, z: 8.8 }, 3500).easing(TWEEN.Easing.Quadratic.InOut).start()
        .onComplete(function () {
            TWEEN.remove(this)
            document.querySelector('.header').classList.add('ended')
            document.querySelector('.first>p').classList.add('ended')
        })

}


const cursor = { x: 0, y: 0 }
const clock = new Clock()
let previousTime = 0




function rendeLoop() {

    TWEEN.update()

    if (secondContainer) {
        // renderer2.render(scene, camera2)
    }
    else {
        renderer.render(scene, camera)
    }

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    const parallaxY = cursor.y
    fillLight.position.y -= (parallaxY * 9 + fillLight.position.y - 2) * deltaTime

    const parallaxX = cursor.x
    fillLight.position.x += (parallaxX * 8 - fillLight.position.x) * 2 * deltaTime

    cameraGroup.position.z -= (parallaxY / 3 + cameraGroup.position.z) * 2 * deltaTime
    cameraGroup.position.x += (parallaxX / 3 - cameraGroup.position.x) * 2 * deltaTime

    requestAnimationFrame(rendeLoop)
}

rendeLoop()



document.addEventListener('mousemove', (event) => {
    event.preventDefault()

    cursor.x = event.clientX / window.innerWidth - 0.5
    cursor.y = event.clientY / window.innerHeight - 0.5

    handleCursor(event)
}, false)



const watchedSection = document.querySelector('.second')

function obCallback(payload) {
    if (payload[0].intersectionRatio > 0.05) {
        secondContainer = true
    } else {
        secondContainer = false
    }
}

const ob = new IntersectionObserver(obCallback, {
    threshold: 0.05
})

ob.observe(watchedSection)



const btn = document.querySelectorAll('nav > .a')
const customCursor = document.querySelector('.cursor')

function update(e) {
    const span = this.querySelector('span')

    if (e.type === 'mouseleave') {
        span.style.cssText = ''
    } else {
        const { offsetX: x, offsetY: y } = e, { offsetWidth: width, offsetHeight: height } = this,
            walk = 20, xWalk = (x / width) * (walk * 2) - walk, yWalk = (y / height) * (walk * 2) - walk
        span.style.cssText = `transform: translate(${xWalk}px, ${yWalk}px);`
    }
}

const handleCursor = (e) => {
    const x = e.clientX
    const y = e.clientY
    customCursor.style.cssText = `left: ${x}px; top: ${y}px;`
}

btn.forEach(b => b.addEventListener('mousemove', update))
btn.forEach(b => b.addEventListener('mouseleave', update))