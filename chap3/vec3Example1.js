// Example: using the three.js library the old way by loading from a script tag

const v1 = new THREE.Vector3(1, 2, 3);
v1.multiplyScalar(2);   // in place multiplication
console.log('v1=', v1);

const v2 = new THREE.Vector3(4, 5, 6);
v2.add(v1);   // changes v2, but not v1
console.log('v2=', v2);
