import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";


// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('white');    // set background color

// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.width/canvas.height, 0.1, 1000 );
camera.position.set(0,0,3);
camera.lookAt(scene.position);   // camera looks at origin

const radius = 0.2;
const geo = new THREE.SphereGeometry(radius, 16, 16);

const params = {color: "green",
                wireframe:true,
                wireframeLinewidth:2};
const mat = new THREE.MeshBasicMaterial(params);

// Combine geometry and material to a new object:
const obj = new THREE.Mesh(geo, mat);
scene.add(obj);
const speed = new THREE.Vector3(-2,0,0);

// Draw everything
const axes = new THREE.AxesHelper();
scene.add(axes);
const controls = new TrackballControls( camera, canvas );
const clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);

  const h = clock.getDelta();
  const t = clock.getElapsedTime();

  // move ball
  obj.position.add(speed.clone().multiplyScalar(h));

  controls.update();
  renderer.render(scene, camera);
}
render();
