import * as THREE from "three"


// Ex. 7.4 on slide 37
const theta = Math.PI/3;
const ax = new THREE.Vector3(1,1,1);
ax.normalize();
const mat = new THREE.Matrix4();
mat.makeRotationAxis(ax, theta);
printMat(mat);

const v1 = new THREE.Vector3(1,-1,0);
v1.applyMatrix4(mat);
console.table(v1);
const v2 = new THREE.Vector3(2,2,2);
v2.applyMatrix4(mat);
console.table(v2);
