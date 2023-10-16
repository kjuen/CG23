// Example: using the three.js library as a module

import * as THREE from "../lib/build/three.module.min.js";

const v1 = new THREE.Vector3(1, 2, 3);
v1.multiplyScalar(3);   // in place multiplication
console.log('v1=', v1);

const v2 = new THREE.Vector3(4, 5, 6);
v2.add(v1);   // changes v2, but not v1
console.log('v2=', v2);

// Make v2 accessible in the browser console
window.v3 = v2;
