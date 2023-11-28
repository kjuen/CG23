import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";

// Initialize WebGL renderer
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setClearColor('white');  // background color

// Create a new Three.js scene
const scene = new THREE.Scene();
// show global coordinate system
const worldAxes = new THREE.AxesHelper( 5 );
worldAxes.material.linewidth = 3;
scene.add( worldAxes );

// Add a camera
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 500 );
camera.position.set(4,7,8);
// Add a mouse controller to move the camera
const controls = new TrackballControls( camera, renderer.domElement);


const sphere = new THREE.Mesh(new THREE.SphereGeometry(1),
                              new THREE.MeshBasicMaterial({color:'blue',
                                                           wireframe:true,
                                                           wireframeLinewidth:2}));
scene.add(sphere);
sphere.matrixAutoUpdate = false;

const sphereAxes = new THREE.AxesHelper(1.5);
sphereAxes.material.linewidth = 2;
sphere.add(sphereAxes);
// parameters of sphere motion
const rad = 3;
const om1 = 1;
const om2 = 2;

// render the scene
const cl = new THREE.Clock();
function render() {
  requestAnimationFrame(render);
  const t =  cl.getElapsedTime();

  const spherePos = new THREE.Vector3(rad*Math.cos(om1*t),
                                      0,
                                      rad*Math.sin(om1*t));

  // Option 1
  sphere.rotation.x = om2*t;
  sphere.position.copy(spherePos);

  // Option 2
  // const T = new THREE.Matrix4().setPosition(spherePos);
  // const R = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1,0,0),
  //                                                om2*t);
  // sphere.matrix.copy(R.premultiply(T));

  // Option 2: a bit easier
  // sphere.matrix.makeRotationAxis(new THREE.Vector3(1,0,0),
  //                                om2*t);
  // sphere.matrix.setPosition(spherePos);

  controls.update();
  renderer.render(scene, camera);
}
render();
