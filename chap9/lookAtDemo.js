import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";


// A minimal demo for understanding the Object3D.lookAt method and the Object3D.up vector.

// Initialize WebGL renderer
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setClearColor('#eeeeee');  // background color

// Create a new Three.js scene
const scene = new THREE.Scene();
// show global coordinate system
const sceneAxes = new THREE.AxesHelper( 5 );
sceneAxes.material.linewidth = 2;
scene.add( sceneAxes );

// Add a camera
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 500 );
camera.position.set(5,5,5);
// Add a mouse controller to move the camera
const controls = new TrackballControls( camera, renderer.domElement);




let obj1 = new THREE.Object3D();
obj1 = new THREE.PerspectiveCamera(90, 1, 0.1, 2);
const frustum = new THREE.CameraHelper(obj1);
scene.add(frustum);
const obj1Axes = new THREE.AxesHelper(2);
obj1Axes.material.linewidth = 2;
obj1.add(obj1Axes);
obj1.position.set(3,3,1);
scene.add(obj1);

// The up vector
obj1.up.set(0,1,1);
const lineMat = new THREE.LineBasicMaterial({ color: '#000000', linewidth: 2 });
scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), obj1.up]),
                        lineMat));



const P = new THREE.Mesh(new THREE.SphereGeometry(0.2),
                              new THREE.MeshBasicMaterial({color:'orange'}));
P.position.set(2,0,0);
scene.add(P);
obj1.lookAt(P.position);


// render the scene, i.e. take the contents of the scene and project to canvas using camera parameters
function render() {
  requestAnimationFrame(render);

  controls.update();
  renderer.render(scene, camera);
}
render();
