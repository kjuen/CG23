// A house

import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";

// Initialize WebGL renderer
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setClearColor('#b0c4de');  // background color
renderer.shadowMap.enabled=true;

// Create a new Three.js scene
const scene = new THREE.Scene();
// show global coordinate system
const axesHelper = new THREE.AxesHelper(2);
scene.add( axesHelper );

// Add a camera
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 500 );
camera.position.set(0.5,0.5,3);
window.camera = camera;
const mouseController = new TrackballControls(camera, canvas);
mouseController.rotateSpeed = 2;
mouseController.zoomSpeed = 0.5;

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Add the ground

// Build the house


// Render loop
function render() {
  requestAnimationFrame(render);

  mouseController.update();
  renderer.render(scene, camera);
}

render();
