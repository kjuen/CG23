import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";

// Code to check exercise 2

// Camera parameters don't matter here:
const camera = new THREE.PerspectiveCamera(90, 1, 1, 100) ;
camera.position.set(5, 0, 0);
camera.lookAt(0, 0, 0);
// camera.updateMatrix();     // don't forget!
// printMat(camera.matrix);
