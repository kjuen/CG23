import * as THREE from "three"

// Euler Example on slide 29
const a = Math.PI/2;
const eu = new THREE.Euler(a,a,0,"XYZ");
const m = new THREE.Matrix4();
m.makeRotationFromEuler(eu);
// printMat(m);
const v1 = new THREE.Vector3(0,0,1).applyMatrix4(m);
// console.log('Order XYZ:');
console.table(v1);


// Exercise 5 on slide 30:
// eu.order = "YXZ";
// m.makeRotationFromEuler(eu);
// const v2 = new THREE.Vector3(0,0,1).applyMatrix4(m);
// console.table('Order YXZ:');
// console.table(v2);
