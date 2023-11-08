// Initialize WebGL renderer
import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";

const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setClearColor('#eeeeee');  // background color

// Create a new Three.js scene
const scene = new THREE.Scene();
// show global coordinate system
scene.add(new THREE.AxesHelper(1.5));

// Add a camera
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 500 );
camera.position.set(1,4,8);
// Add a mouse controller to move the camera
const controls = new TrackballControls( camera, renderer.domElement);


// Add light sources
scene.add(new THREE.AmbientLight('#909090'));
const light = new THREE.PointLight();
light.position.set(5,0,5);
scene.add(light);

// The moving ball
const ballRadius = 1;
const mat = new THREE.MeshStandardMaterial({color:'#afeeee',
                                            metalness:0.5,
                                            roughness:0.1});

const ball = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 32,16), mat);
scene.add(ball);
let speed = new THREE.Vector3(0,0,0);
const speedValue = 2;


function myCallback(event) {

  // event.preventDefault();
  console.log(event.keyCode);
  if(event.keyCode===37) {   // left arrow key
    speed.x = -speedValue;
  }
  if(event.keyCode===39) {   // right arrow key
    speed.x = speedValue;
  }

  // Exercise 2: slide 18
  if(event.keyCode===38) {   // up arrow key
    speed.y = speedValue;
  }
  if(event.keyCode===40) {   // down arrow key
    speed.y = -speedValue;
  }

}
document.addEventListener("keydown", myCallback);
// use anonymous function as callback
document.addEventListener("keyup", function() {
  speed.set(0,0,0);
});



// Render the scene
const clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);

  const h = clock.getDelta();

  ball.position.add(speed.clone().multiplyScalar(h));

  controls.update();
  renderer.render(scene, camera);
}
render();
