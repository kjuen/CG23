// Demos how texture coordinates work
import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";

console.log('THREE.REVISION=', THREE.REVISION);


// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('rgb(255,255,255)');

// create scene and camera
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper());
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight,
                                           0.1, 1000);
camera.position.z = 6;

// Create object to apply texture
const txt = new THREE.TextureLoader().load('chap12/Schraffur.jpg');
const txt2 = new THREE.TextureLoader().load('chap12/Brick.jpg');
const uvGrid = new THREE.TextureLoader().load('chap12/uv_grid_opengl.jpg');
const geo = myPlaneHouseGeo();
const mat = new THREE.MeshBasicMaterial({color:"#ffffff",
                                        map:txt});
const mat2 = new THREE.MeshBasicMaterial({color:"#ffffff", map:txt2});
const mat3 = new THREE.MeshBasicMaterial({color:"#aaaaaa", map:uvGrid});
const obj = new THREE.Mesh(geo, mat);
scene.add(obj);

const controls = new TrackballControls( camera, canvas );
function render() {
  requestAnimationFrame(render);

  controls.update();
  renderer.render(scene, camera);
}

render();



function myPlaneGeo() {
  const planeVertices = new Array(4);
  planeVertices[0] = new THREE.Vector3(2,1,0);
  planeVertices[1] = new THREE.Vector3(0,1,0);
  planeVertices[2] = new THREE.Vector3(0,0,0);
  planeVertices[3] = new THREE.Vector3(2,0,0);
  const geo = new THREE.BufferGeometry();
  geo.setFromPoints([planeVertices[0], planeVertices[1], planeVertices[2],
                     planeVertices[0], planeVertices[2], planeVertices[3]]);

  const uvs = [];
  // Face 0
  uvs.push(1,1);
  uvs.push(0,1);
  uvs.push(0,0);

  // Face 1
  uvs.push(1.0,1.0);
  uvs.push(0.0,0.0);
  uvs.push(1.0,0.0);

  geo.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );

  return geo;
}



function myPlaneIndexGeo() {
  const planeVertices = new Array(4);
  planeVertices[0] = new THREE.Vector3(2,1,0);
  planeVertices[1] = new THREE.Vector3(0,1,0);
  planeVertices[2] = new THREE.Vector3(0,0,0);
  planeVertices[3] = new THREE.Vector3(2,0,0);
  const indices = [0, 1, 2,   // Face 0
                   0, 2, 3];  // Face 1
  const geo = new THREE.BufferGeometry();
  geo.setFromPoints(planeVertices);
  geo.setIndex(indices);

  const uvs = [];
  uvs.push(1,1);
  uvs.push(0,1);
  uvs.push(0,0);
  uvs.push(0,1);

  geo.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );

  return geo;
}



function myPlaneHouseGeo() {
  const geo = new THREE.BufferGeometry();
  const houseVertices = new Array(5);
  houseVertices[0] = new THREE.Vector3(2,1,0);
  houseVertices[1] = new THREE.Vector3(1,2,0);
  houseVertices[2] = new THREE.Vector3(0,1,0);
  houseVertices[3] = new THREE.Vector3(0,0,0);
  houseVertices[4] = new THREE.Vector3(2,0,0);
  geo.setFromPoints([houseVertices[0], houseVertices[2], houseVertices[3],
                     houseVertices[0], houseVertices[3], houseVertices[4],
                     houseVertices[0], houseVertices[1], houseVertices[2]]);


  return geo;
}
