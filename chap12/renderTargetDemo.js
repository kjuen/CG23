// Demos for using a render target
import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";

// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true});
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#ffffff');

// create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, canvas.width / canvas.height,
                                           0.1, 1000);
camera.position.z = 4;

// Add some light
const light = new THREE.SpotLight();
light.position.set(10,10,10);
light.intensity = 1000;
scene.add(light);
scene.add(new THREE.AmbientLight('#707070'));



// Create some objects
// scene.add(new THREE.AxesHelper());
const box = new THREE.Mesh(new THREE.BoxGeometry(1,2,3),
                           new THREE.MeshStandardMaterial({color:"red"}));
box.position.x = 2;
scene.add(box);

const torus = new THREE.Mesh(new THREE.TorusGeometry(1,0.5, 48,48),
                             new THREE.MeshStandardMaterial({color:"green"}));
torus.position.x = -3;
torus.rotation.x = 1;
scene.add(torus);

// Create object to apply texture
const plane = new THREE.Mesh(new THREE.PlaneGeometry(2,2),
                             new THREE.MeshBasicMaterial({color:"#bbbbbb"}));
scene.add(plane);



const rtHeight = 512;
const rtWidth = 512;
const rt = new THREE.WebGLRenderTarget(rtWidth, rtHeight);
plane.material.map = rt.texture;
plane.material.needsUpdate = true;

const rtCamera = new THREE.PerspectiveCamera(90, rt.width / rt.height,
                                             0.1, 1000);
rtCamera.position.copy(camera.position);

const controls = new TrackballControls( camera, canvas );
function render() {
  requestAnimationFrame(render);

  renderer.setRenderTarget(null);
  renderer.render(scene, camera);

  renderer.setRenderTarget(rt);
  renderer.render(scene, rtCamera);
  // renderer.render(scene, camera);

  controls.update();
}

render();
