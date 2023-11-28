import * as THREE from "three"

// Code from Slide 29
const child = new THREE.Object3D();
child.position.z = 1;
child.rotation.y = -Math.PI/2;
child.updateMatrix();
const Pc = new THREE.Vector3(1,1,0);
const Pp = Pc.clone().applyMatrix4(child.matrix);
const invMat = new THREE.Matrix4();
invMat.copy(child.matrix).invert();
const Qp = new THREE.Vector3(2,-1,1);
const Qc = Qp.clone().applyMatrix4(invMat);
console.log('Qc=', Qc);
