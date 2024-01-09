import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";


// Demos for applying textures

// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('rgb(255,255,255)');

// create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight,
                                           0.1, 1000);
camera.position.z = 6;

// Create object to apply texture
const geo = new THREE.PlaneGeometry(9.19, 3.95);
const mat = new THREE.MeshBasicMaterial({color:"#ffffff"});

const obj = new THREE.Mesh(geo, mat);
scene.add(obj);


const loader = new THREE.TextureLoader();
const txt = loader.load('chap12/Brick.jpg');
// txt.wrapS = THREE.RepeatWrapping;  // wrap mode in u-direction
// txt.wrapT = THREE.RepeatWrapping;  // wrap mode in v-direction
// txt.repeat.set(2,3);
// play with texture filtering
// txt.minFilter = THREE.LinearMipmapLinearFilter;
mat.map = txt;
mat.needsUpdate = true;

// // Alternative: load texture with callback. This might be an interesting option if texture loading takes a long time.
// loader.load('chap12/Brick.jpg', texture => {
//   // this callback is executes AFTER texture loading is finished
//   mat.map = texture;
//   mat.needsUpdate = true;  // strictly necessary

// });

const controls = new TrackballControls( camera, canvas );
function render() {
  requestAnimationFrame(render);

  controls.update();
  renderer.render(scene, camera);
}

render();
