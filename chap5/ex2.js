// Initialize WebGL renderer

import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";


const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setClearColor('white');  // background color

// Create a new Three.js scene
const scene = new THREE.Scene();
// show global coordinate system
scene.add(new THREE.AxesHelper(5));

// Add a camera
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 500 );
camera.position.set(0,8,8);
// Add a mouse controller to move the camera
const controls = new TrackballControls( camera, renderer.domElement);
controls.zoomSpeed = 5.0;


// Add light sources
scene.add(new THREE.AmbientLight('#909090'));
const light = new THREE.PointLight();
light.position.set(10,10,10);
light.intensity = 200;
scene.add(light);




// Materials
const mat = new THREE.MeshStandardMaterial({color:'#afeeee',
                                            metalness:0.5,
                                            roughness:0.1,
                                            flatShading:true,   // see chapter 12 why we need this
                                            side: THREE.DoubleSide});
// use this material to view wireframe
const wmat = new THREE.MeshBasicMaterial({color:'#555555',
                                          wireframe:true,
                                          wireframeLinewidth:2});


// Ex 2.1: a ring with LatheGeometry
const outerRadius = 5;  // inner radius of the ring
const height = 1;
const innerRadius = 4.5;

// create a rectangular section of the ring
const points = new Array(5);
points[0] = new THREE.Vector2(innerRadius, 0);
points[1] = new THREE.Vector2(innerRadius, height);
points[2] = new THREE.Vector2(outerRadius, height);
points[3] = new THREE.Vector2(outerRadius, 0);
points[4] = new THREE.Vector2(innerRadius,0);
const latheRingGeo = new THREE.LatheGeometry( points, 500);
const latheRing = new THREE.Mesh( latheRingGeo, mat );
scene.add(latheRing);
latheRing.position.y = -6;

// Ex 2.2: a ring with ExtrudeGeometry
// Code from
const outerCircle = new THREE.Shape();
outerCircle.moveTo(outerRadius, 0);
const innerCircle = new THREE.Shape();   // serves as hole in outerCircle
innerCircle.moveTo(innerRadius, 0);
const N =100;
const deltaPhi = 2*Math.PI / N;
for(let k=1; k<=N; ++k) {
  outerCircle.lineTo(outerRadius*Math.cos(k*deltaPhi),
                     outerRadius*Math.sin(k*deltaPhi));
  innerCircle.lineTo(innerRadius*Math.cos(k*deltaPhi),
                     innerRadius*Math.sin(k*deltaPhi));
}
outerCircle.holes.push(innerCircle);

const extrudeSettings = {
  bevelEnabled: false,
  depth: height,
};
const extrudeGeo = new THREE.ExtrudeGeometry(outerCircle, extrudeSettings);
const extrudeRing = new THREE.Mesh(extrudeGeo, mat);
scene.add(extrudeRing);



// Render the scene
function render() {
  requestAnimationFrame(render);

  controls.update();
  renderer.render(scene, camera);
}
render();
