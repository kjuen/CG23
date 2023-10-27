import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";

// Initialize WebGL renderer
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

// The wall
const wallDist = 5;
const wallThickness = 0.2;
const wall = new THREE.Mesh(new THREE.BoxGeometry(3,2,wallThickness),
                            new THREE.MeshStandardMaterial({color:'maroon',
                                                            metalness:0.1,
                                                            roughness:0.9}));
wall.position.x = wallDist + 1/2*wallThickness;
wall.rotation.y = Math.PI/2;
// scene.add(wall);



// The moving ball
const ballRadius = 1;
const mat = new THREE.MeshStandardMaterial({color:'#afeeee',
                                            metalness:0.5,
                                            roughness:0.1});

const ball = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 32,16), mat);
scene.add(ball);

// Static rendering
renderer.render(scene, camera);
// Dynamic rendering
// const clock = new THREE.Clock();
// function render() {
//   requestAnimationFrame(render);

//   const h = clock.getDelta();   // time increment in seconds
//   const t = clock.getElapsedTime();   // overall time in seconds

//   controls.update();
// }
// render();
