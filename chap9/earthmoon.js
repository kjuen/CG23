import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";

// Initialize WebGL renderer
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setClearColor('black');  // background color

// Create a new Three.js scene
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper());


// Add a camera
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 500 );
camera.position.set(0,5,0);

// Add a mouse controller to move the camera
const controls = new TrackballControls( camera, renderer.domElement);

function resizeWindow() {

  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w,h);
  camera.aspect = w/h;
  camera.updateProjectionMatrix();
};
resizeWindow();
window.addEventListener("resize", resizeWindow);


// Add light sources
scene.add(new THREE.AmbientLight('#303030'));
const light = new THREE.PointLight();
light.position.set(0,0,0);
scene.add(light);
light.intensity = 400;


// Create sun, earthm moon
const sun = new THREE.Mesh(new THREE.SphereGeometry( 0.3, 32, 32),
                           new THREE.MeshBasicMaterial({color: "yellow"}));
scene.add(sun);

const earth = new THREE.Mesh(new THREE.SphereGeometry( 0.2, 16,16),
                             new THREE.MeshStandardMaterial({color: "#0055ff"}));
scene.add(earth);
earth.add(new THREE.AxesHelper(0.5));
const distSunEarth = 3;
const wEarth = 2*Math.PI/200;
const wEarthDay = 10*wEarth;


const moon = new THREE.Mesh(new THREE.SphereGeometry( 0.1, 16,16),
                            new THREE.MeshStandardMaterial({color: "#cccccc"}));
scene.add(moon);
const distEarthMoon = 1;
const wMoon = 12*wEarth;

const camera2 = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 0.1, 5);
const frustum = new THREE.CameraHelper(camera2);
scene.add(frustum);
earth.add(camera2);

// Render the scene
const R = new THREE.Matrix4();

const clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);

  const t = clock.getElapsedTime();

  earth.position.x = distSunEarth * Math.cos(wEarth * t);
  earth.position.z = distSunEarth * Math.sin(wEarth * t);
  earth.rotation.y = wEarthDay*t;

  R.makeRotationAxis(new THREE.Vector3(0,1,0), wMoon*t);
  const pivot = earth.position.clone();
  const prp = pivot.sub(pivot.clone().applyMatrix4(R));
  R.setPosition(prp);
  moon.position.copy(earth.position);
  moon.position.x += distEarthMoon;
  moon.position.applyMatrix4(R);

  // camera2.lookAt(0,0,0); // look at sun
  // camera2.lookAt(moon.position); // look at moon
  camera2.lookAt(new THREE.Vector3(1,0,0).applyMatrix4(earth.matrix));  // look at (1,0,0) in earth coordinates
  controls.update();
  // renderer.render(scene, camera);
  renderer.render(scene, camera2);
}
render();
