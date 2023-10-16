// Exercise 6: specular reflection with the three.js library

// Modules:
// Uncomment this line if you want to load the three.js library as a module
// import * as THREE from "../moduleLibs/build/three.module.js";

// With module you don't need to load in the html file but need to load this file with
// <script type="module" src="chap3/solutionEx6.js"> </script>
// Also, you need to provide the html file through a webserver,
// see https://threejs.org/docs/index.html#manual/en/introduction/How-to-run-things-locally



/**
 * calculate specular reflection (note that this functionality is also provided by Vector3.reflect).
 * @param {Vector3} vin incoming vector
 * @param {Vector3} n normal vector
 * @returns {Vector3} outgoing vector
 */
function specRef(vin, n) {
  "use strict";
  const n2 = n.clone();     // we don't want to change the incoming object n
  n2.normalize();           // normalize just in case the caller forgot
  const f = 2 * n2.dot(vin);
  let ret = vin.clone();    // we don't want to change the incoming object n
  ret.sub(n2.multiplyScalar(f));
  return ret;
}


// Reproduce result of exercise on slide 18 of chapter 2:
const n = new THREE.Vector3(1,2,0);
n.normalize();
const vin = new THREE.Vector3(1,0,0);
const vout = specRef(vin, n);
console.log('vout=', vout);
