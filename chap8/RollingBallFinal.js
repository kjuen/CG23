import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";


//* Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('rgb(255, 255, 255)');    // set background color

// Create a new Three.js scene with camera and world axes
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(2));
const camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height,
                                          0.1, 1000 );
camera.position.set(20,10,20);

//* Add plane
const planeX = 20;
const planeZ = 20;
const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(planeX, planeZ, 20, 20),
                                 new THREE.MeshBasicMaterial({wireframe:true,
                                                              color:0x000000,
                                                              side:THREE.DoubleSide}));
planeMesh.rotation.x = Math.PI/2;
scene.add(planeMesh);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(planeX, planeZ, 20, 20),
                             new THREE.MeshBasicMaterial({wireframe:false,
                                                          color:0x505050,
                                                          side:THREE.DoubleSide}));
plane.material.transparent = true;
plane.material.opacity = 0.4;
plane.rotation.x = Math.PI/2;
scene.add(plane);



const planeNormal = new THREE.Vector3(0,1,0);

//* Add ball
const ballRadius = 2;
const ball = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 8,4),
                            new THREE.MeshBasicMaterial( {color: 0x0000ff,
                                                          wireframeLinewidth:1,
                                                          wireframe:true}));
ball.matrixAutoUpdate = false;
scene.add(ball);

// speed and current position of translational motion
let ballSpeed = new THREE.Vector3(5*Math.random(), 0, 5*Math.random());
let ballPos = new THREE.Vector3(0, ballRadius, 0);


//* Render loop
const computerClock = new THREE.Clock();
const controls = new TrackballControls( camera , canvas );
function render() {
  requestAnimationFrame(render);

  // Reflection at the invisible walls
  if(ballPos.x> planeX/2) {
    ballSpeed.x = - Math.abs(ballSpeed.x);
  }
  if(ballPos.z > planeZ/2) {
    ballSpeed.z = - Math.abs(ballSpeed.z);
  }

  // Motion of the ball in this time step
  const h = computerClock.getDelta();  // important: call before getElapsedTime!!!
  const t = computerClock.getElapsedTime();

  // update position of ball:
  ballPos.add(ballSpeed.clone().multiplyScalar(h));
  // ball.position.copy(ballPos);

  const om = ballSpeed.length() / ballRadius;
  const axis = planeNormal.clone().cross(ballSpeed).normalize();

  const dR = new THREE.Matrix4().makeRotationAxis(axis, om*h);
  ball.matrix.premultiply(dR);
  ball.matrix.setPosition(ballPos);

  controls.update();
  renderer.render(scene, camera);
}
render();
