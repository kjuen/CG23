import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";


// Initialize webGL
const canvas = document.getElementById("mycanvas");
const context = canvas.getContext( 'webgl2' );
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true, context: context });
renderer.setClearColor('black');

// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 1, 200 );
camera.position.set(0,0,30);
const controls = new TrackballControls( camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );
scene.add(new THREE.AmbientLight('#606060'));

function resizeWin() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resizeWin);
resizeWin();


// light source with light bulb indicating the position of the light
const light = new THREE.PointLight();
light.position.set(0,0, 0);
const lightBulb = new THREE.Mesh(new THREE.SphereGeometry(0.4),
                                 new THREE.MeshBasicMaterial({color:'yellow'}));
lightBulb.position.copy(light.position);
scene.add(light);
light.add(lightBulb);

// the plane that receives the shadow
const planeDist = 40;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(100,60),
                             new THREE.MeshBasicMaterial({color:'#ffffff'}));
plane.position.z = -planeDist;
scene.add(plane);
// normal vector and distance to origin
const planeNormal = new THREE.Vector3(0,0,1);
const dist = plane.position.length();  // distance to origin

// the object that casts the shadow
const knotGeometry = new THREE.TorusKnotGeometry(5,1,160,100);

const mat = new THREE.MeshStandardMaterial({color:'#55cc22',
                                            metalness:0.3});
const torusKnot = new THREE.Mesh(knotGeometry, mat);
torusKnot.rotation.y = 0.5;
torusKnot.position.z = -20;
scene.add(torusKnot);
torusKnot.updateMatrixWorld();   // make sure torusKnot.matrixWorld is correctly updated

// construct the projection matrix: shift the plane on which to project slightly closer to the
// light source than the white ground in order to avoid z-fighting.
const Qnd = new THREE.Matrix4().multiplyScalar(dist-0.001);
Qnd.elements[3] = -planeNormal.x;
Qnd.elements[7] = -planeNormal.y;
Qnd.elements[11] = -planeNormal.z;
Qnd.elements[15] = 0;


// construct the shadow object as copy of the torusKnot geometry and project it onto the screen:
let shadowKnotGeometry = knotGeometry.clone();
const torus2Plane = Qnd.multiply(torusKnot.matrixWorld);
shadowKnotGeometry.applyMatrix4(torus2Plane);

// construct shadow object from projected geometry
let shadowKnot = new THREE.Mesh(shadowKnotGeometry,
                                new THREE.MeshBasicMaterial({color:'#303030'}));
scene.add(shadowKnot);


function render() {
  requestAnimationFrame(render);
  // torusKnot.rotation.y += 0.01;  // with this, the shadow is wrong, of course

  controls.update();
  renderer.render(scene, camera);
}
render();
