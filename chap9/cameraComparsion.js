"use strict";

import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";

// A little demo to compare parallel and perspective cameras

// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true});
renderer.setClearColor('black');    // set background color
renderer.setSize(window.innerWidth, window.innerHeight);
const aspect = window.innerWidth/window.innerHeight;
// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();

const camSize = 1.5;
// const camera = new THREE.OrthographicCamera(-camSize, camSize, -camSize, camSize,
//                                             0.1, 100);
const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 100);
camera.position.set(0,0,10);
camera.lookAt(scene.position);   // camera initially looks at origin


const geo = new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,2));

const mat = new THREE.LineBasicMaterial( { color: 0x00ff00 ,
                                           linewidth:2});

const obj = new THREE.LineSegments(geo, mat);
scene.add(obj);

// Draw everything
const controls = new TrackballControls( camera, canvas );
function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}
  render();
