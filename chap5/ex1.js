function createIndexedRoofGeo(l, w, h) {

  const vertices = new Array(6);
  vertices[0] = new THREE.Vector3(-w/2, 0, -l/2);
  vertices[1] = new THREE.Vector3(w/2, 0, -l/2);
  vertices[2] = new THREE.Vector3(0, h, -l/2);
  vertices[3] = new THREE.Vector3(-w/2, 0, l/2);
  vertices[4] = new THREE.Vector3(w/2, 0, l/2);
  vertices[5] = new THREE.Vector3(0, h, l/2);

  const indices = [0, 2, 1,
                   3, 4, 5,
                   0, 3, 2,
                   2, 3, 5,
                   0, 1, 4,
                   0, 4, 3,
                   1, 2, 5,
                   1, 5, 4];

  const geo = new THREE.BufferGeometry();
  geo.setFromPoints(vertices);
  geo.setIndex(indices);

  return geo;
}
