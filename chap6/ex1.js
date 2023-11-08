// Initialize WebGL renderer
import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";

const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setClearColor('black');  // background color

// Create a new Three.js scene
const scene = new THREE.Scene();


// Add a camera
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 500 );
camera.position.set(2,0,5);
// Add a mouse controller to move the camera
const controls = new TrackballControls( camera, renderer.domElement);


// Add light sources
scene.add(new THREE.AmbientLight('#909090'));
const light = new THREE.PointLight();
light.position.set(0,0,0);
scene.add(light);


// Create sun, earthm moon
const sun = new THREE.Mesh(new THREE.SphereGeometry( 0.5, 32, 32),
                           new THREE.MeshBasicMaterial({color: "yellow"}));
scene.add(sun);

const earth = new THREE.Mesh(new THREE.SphereGeometry( 0.2, 16,16),
                             new THREE.MeshStandardMaterial({color: "#0055ff"}));
scene.add(earth);
const distSunEarth = 3;
const wEarth = 2*Math.PI/15;

const moon = new THREE.Mesh(new THREE.SphereGeometry( 0.1, 16,16),
                            new THREE.MeshBasicMaterial({color: "#cccccc"}));
earth.add(moon);
const distEarthMoon = 1;
const wMoon = 2*Math.PI/5;



// Render the scene
const clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);

  const t = clock.getElapsedTime();

  earth.position.x = distSunEarth * Math.cos(wEarth * t);
  earth.position.y = distSunEarth * Math.sin(wEarth * t);

  moon.position.x = distEarthMoon * Math.cos(wMoon * t);
  moon.position.y = distEarthMoon * Math.sin(wMoon * t);


  controls.update();
  renderer.render(scene, camera);
}
render();
