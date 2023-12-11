import * as THREE from "three"

// Code to check exercise 2

// Camera parameters don't matter here:
const camera = new THREE.PerspectiveCamera(90, 2, 2, 10) ;
camera.updateProjectionMatrix();
printMat(camera.projectionMatrix);
