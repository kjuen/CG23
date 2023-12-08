import * as THREE from "three"

// Excercise on slide 16 (chapter 8)
// That's a 2D problem => take (0,0,1) as axis of rotation

const axis = new THREE.Vector3(0,0,1);
const theta = Math.PI/4;
const pivot = new THREE.Vector3(3,1,0);
const mat = new THREE.Matrix4();
mat.makeRotationAxis(axis, theta);
const rp = pivot.clone().applyMatrix4(mat);
const prp = pivot.clone().sub(rp);
mat.setPosition(prp);
printMat(mat);


const p = new THREE.Vector3(4,1,0);
p.applyMatrix4(mat);
console.log(p);
