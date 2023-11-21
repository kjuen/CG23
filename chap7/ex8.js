import * as THREE from "three"

// Ex. 8 on slide 38

const rd = Math.random;

const u = new THREE.Vector3(rd(), rd(), rd());
u.normalize();
const theta = 2 * Math.PI * rd();
const phi = 2 * Math.PI * rd();

const Rtheta = new THREE.Matrix4().makeRotationAxis(u, theta);
const Rphi = new THREE.Matrix4().makeRotationAxis(u, phi);
const Rprod = Rtheta.clone().multiply(Rphi);
const RthetaPhi = new THREE.Matrix4().makeRotationAxis(u, phi+theta);


console.log('--- Ex 8.3 ---');
console.log('R(u, theta) * R(u, phi):');
printMat(Rprod);
console.log('R(u, theta+phi):');
printMat(RthetaPhi);




console.log('--- Ex 8.4 ---');
console.log('R(u, phi) * R(u, theta)');
printMat(Rphi.clone().multiply(Rtheta));
