// A house

import * as THREE from "three";
import {TrackballControls} from "three/addons/controls/TrackballControls.js";
// import {VertexNormalsHelper} from "three/addons/helpers/VertexNormalsHelper.js";



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

const light = new THREE.SpotLight(0xffffff);
scene.add(light);
light.intensity=1500;
light.position.set(15,5,4);
light.castShadow = true;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 40;
light.shadow.mapSize.x = 1024;
light.shadow.mapSize.y = 1024;
// add sun at position of house
const sun = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32),
                           new THREE.MeshBasicMaterial({ color:"yellow"}));
sun.position.copy(light.position);
scene.add(sun);


// Add the ground
const groundMat = new THREE.MeshPhongMaterial({color: "green",
                                               side:THREE.DoubleSide} );
groundMat.transparent = true;
groundMat.opacity = 0.5;
const groundGeo = new THREE.PlaneGeometry(20,20);
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI/2;
ground.receiveShadow = true;
scene.add(ground);

// Build the house
const house = new THREE.Object3D();
scene.add(house);
// window.house = house;
// house.position.x = 2;

const width = 1;
const len = 2;
const height = 0.8;

const bodyMat = new THREE.MeshStandardMaterial({color: "#aaaaaa",
                                               flatShading:true} );

bodyMat.transparent = false;
bodyMat.opacity = 0.5;

const bodyGeo = new THREE.BoxGeometry(width,height,len);
const body = new THREE.Mesh(bodyGeo, bodyMat);
body.castShadow=true;
body.position.y = height / 2 + 0.0001;
house.add(body);

// Add the roof to the house
const roofGeo = createIndexedRoofGeo(1.1*len,1.1*width,0.5*height);
// const roofGeo = createRoofGeo(1.1*len,1.1*width,0.5*height);
window.roofGeo = roofGeo;
const roofMat = new THREE.MeshPhongMaterial({color: 0xff4444});
const roof = new THREE.Mesh(roofGeo, roofMat);


roof.position.y = height;
roof.castShadow = true;
house.add(roof);

// Add windows
const windowGeo = new THREE.BoxGeometry(height/3, len/10, 0.01);
// shiny windows
const windowMat = new THREE.MeshPhongMaterial( { color: 'black',
                                                 specular:"white",
                                                 shininess:50} );
const win1 = new THREE.Mesh(windowGeo, windowMat);
house.add(win1);
win1.rotation.z = Math.PI/2;
win1.rotation.y = Math.PI/2;
win1.position.x = width/2;
win1.position.y = height/2;
win1.position.z = len/4;
const win2 = win1.clone();
win2.position.z = -len/4;
house.add(win2);
const win3 = win1.clone();
win3.position.x = -width/2;
house.add(win3);
const win4 = win2.clone();
win4.position.x = -width/2;
house.add(win4);
const win5 = new THREE.Mesh(windowGeo, windowMat);
win5.rotation.z = Math.PI/2;
win5.position.z = len/2;
win5.position.y = height/2;
house.add(win5);




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


/**
 * helper function to create the roof.
 *
 * @param{number} l length of roof
 * @param{number} w width of roof
 * @param{number} h height of roof
 */
function createRoofGeo(l, w, h) {

  const geo = new THREE.BufferGeometry();

  const vertices = new Array(6);
  vertices[0] = new THREE.Vector3(-w/2, 0, -l/2);
  vertices[1] = new THREE.Vector3(w/2, 0, -l/2);
  vertices[2] = new THREE.Vector3(0, h, -l/2);
  vertices[3] = new THREE.Vector3(-w/2, 0, l/2);
  vertices[4] = new THREE.Vector3(w/2, 0, l/2);
  vertices[5] = new THREE.Vector3(0, h, l/2);

  geo.setFromPoints([
    // Face 0
    vertices[0],
    vertices[2],
    vertices[1],
     // Face 1
    vertices[3],
    vertices[4],
    vertices[5],
    // Face 2
    vertices[0],
    vertices[3],
    vertices[2],
    // Face 3
    vertices[2],
    vertices[3],
    vertices[5],
    // Face 4
    vertices[0],
    vertices[1],
    vertices[4],
    // Face 5
    vertices[0],
    vertices[4],
    vertices[3],
    // Face 6
    vertices[1],
    vertices[2],
    vertices[5],
    // Face 7
    vertices[1],
    vertices[5],
    vertices[4]]);

  return geo;
}
