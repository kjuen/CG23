// Initialize WebGL renderer
import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";


const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setClearColor('white');  // background color

// Create a new Three.js scene
const scene = new THREE.Scene();
const worldSpaceAxes =new THREE.AxesHelper( 1.5 );
worldSpaceAxes.name="World Space Axes";
scene.add(worldSpaceAxes);

// Add a camera with mouse control
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 500 );
camera.position.set(1,1,2);
const controls = new TrackballControls( camera, renderer.domElement);

// Add objects to the scene
// The material specifies how triangle looks like
const mat = new THREE.MeshBasicMaterial({color: "black",
                                         wireframe:false,
                                         wireframeLinewidth:2.0} );

// Version 1
const geo = new THREE.BufferGeometry();
const corners = new Array(4);
corners[0] = new THREE.Vector3(-1, 0, -1);
corners[1] = new THREE.Vector3(-1, 0, 1);
corners[2] = new THREE.Vector3(1, 0, 1);
corners[3] = new THREE.Vector3(1, 0, -1);
geo.setFromPoints([
  // Face 0
  corners[0],
  corners[1],
  corners[2],
  // Face 1
  corners[0],
  corners[2],
  corners[3],
]);

const obj1 = new THREE.Mesh(geo, mat);
scene.add(obj1);

// Version 2
const indexGeo = new THREE.BufferGeometry();
indexGeo.setFromPoints(corners);
const faceIndices = [0, 2, 1,
  0, 2, 3];
indexGeo.setIndex(faceIndices);
const obj2 = new THREE.Mesh(indexGeo, mat);
scene.add(obj2);


// Tetrahedron
const tetGeo = new THREE.BufferGeometry();
const tetVertices = new Array(4);
tetVertices[0] = new THREE.Vector3(0, 0, 1);
tetVertices[1] = new THREE.Vector3(1, 0, 0);
tetVertices[2] = new THREE.Vector3(0, 0, 0);
tetVertices[3] = new THREE.Vector3(0.5, 0.5, 0.5);
tetGeo.setFromPoints([
  // Face 0
  tetVertices[0],
  tetVertices[1],
  tetVertices[2],
  // Face 1
  tetVertices[0],
  tetVertices[3],
  tetVertices[2],
  // Face 2
  tetVertices[1],
  tetVertices[2],
  tetVertices[3],
  // Face 3
  tetVertices[0],
  tetVertices[1],
  tetVertices[3]
]);
const obj3 = new THREE.Mesh(tetGeo, mat);
scene.add(obj3);




// Render the scene
function render() {
  requestAnimationFrame(render);

  controls.update();
  renderer.render(scene, camera);
}
render();
