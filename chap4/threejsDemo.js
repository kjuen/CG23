// This is the first three.js demo with modules

import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

// 1(a) Initialize WebGL renderer
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setClearColor('black');  // background color

// 2. Create a new Three.js scene
const scene = new THREE.Scene();
// show global coordinate system
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// 3. Add a camera
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 500 );
camera.position.set(0,0,20);
// Add a mouse controller to move the camera without THREE.
const controls = new OrbitControls( camera, renderer.domElement);
controls.zoomSpeed = 5.0;


// 4. Add light sources
scene.add(new THREE.AmbientLight('#606060'));
const light = new THREE.PointLight();
light.intensity = 200;
light.position.set(0,0,10);
scene.add(light);
// add a light bulb at position of light
const lightBulb = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32),
                                 new THREE.MeshBasicMaterial({color:'yellow'}));
lightBulb.position.copy(light.position);
light.add(lightBulb);


// 5. Create an object made of a geometry and a material
const knotGeometry = new THREE.TorusKnotGeometry(5,1,400,15);
const knotMaterial = new THREE.MeshStandardMaterial({color:'#55ff22',
                                                     metalness:0.5,
                                                     roughness:0.2});
const knot = new THREE.Mesh(knotGeometry, knotMaterial);
scene.add(knot);



// 1(b) render the scene, i.e. take the contents of the scene and project to canvas using camera parameters
function render() {
  requestAnimationFrame(render);

  controls.update();
  renderer.render(scene, camera);
}
render();
