// A house

import * as THREE from "three";
import {TrackballControls} from "three/addons/controls/TrackballControls.js";

// Initialize WebGL renderer
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setClearColor('#b0c4de');  // background color
renderer.shadowMap.enabled=true;

// Create a new Three.js scene
const scene = new THREE.Scene();
// show global coordinate system
const axesHelper = new THREE.AxesHelper(2);
scene.add( axesHelper );

// Add a camera
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 500 );
camera.position.set(0.5,0.5,3);
window.camera = camera;
const mouseController = new TrackballControls(camera, canvas);
mouseController.rotateSpeed = 2;
mouseController.zoomSpeed = 0.5;

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Add the ground
const groundMat = new THREE.MeshPhongMaterial({color: "green",
                                               side:THREE.DoubleSide} );
groundMat.transparent = true;
groundMat.opacity = 0.5;
const groundGeo = new THREE.PlaneGeometry(20,20);
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

// Build the house
const house = new THREE.Object3D(); 
scene.add(house);
// window.house = house;
house.position.x = 2; 

const width = 1;
const len = 2;
const height = 0.8;

const bodyMat = new THREE.MeshPhongMaterial({color: "gray"} );

const bodyGeo = new THREE.BoxGeometry(width,height,len);
const body = new THREE.Mesh(bodyGeo, bodyMat);
body.position.y = height / 2 + 0.0001;
house.add(body);

// Add the roof to the house
const roofGeo = createIndexedRoofGeo(1.1*len,1.1*width,0.5*height);
const roofMat = new THREE.MeshPhongMaterial({color: 0xff4444});
const roof = new THREE.Mesh(roofGeo, roofMat);

roof.position.y = height;
house.add(roof);


// Render loop
function render() {
  requestAnimationFrame(render);

  mouseController.update();
  renderer.render(scene, camera);
}

render();


function createIndexedRoofGeo(l, w, h) {

  const vertices = new Array(6);
  vertices[0] = new THREE.Vector3(-w/2, 0, -l/2);
  vertices[1] = new THREE.Vector3(w/2, 0, -l/2);
  vertices[2] = new THREE.Vector3(0, h, -l/2);
  vertices[3] = new THREE.Vector3(-w/2, 0, l/2);
  vertices[4] = new THREE.Vector3(w/2, 0, l/2);
  vertices[5] = new THREE.Vector3(0, h, l/2);

  const indices = [0, 2, 1,
                   3, 4, 5,
                   0, 3, 2,
                   2, 3, 5,
                   0, 1, 4,
                   0, 4, 3,
                   1, 2, 5,
                   1, 5, 4];

  const geo = new THREE.BufferGeometry();
  geo.setFromPoints(vertices);
  geo.setIndex(indices);

  return geo;
}