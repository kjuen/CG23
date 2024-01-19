import * as THREE from "three";
import {TrackballControls} from "three/addons/controls/TrackballControls.js";
import {VertexNormalsHelper} from "three/addons/helpers/VertexNormalsHelper.js";




// Final version of the house

// Initialize WebGL renderer
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setClearColor('white');  // background color
renderer.shadowMap.enabled=true;

// Create a new Three.js scene
const scene = new THREE.Scene();
// show global coordinate system
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

// Add a camera
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 500 );
camera.position.set(0,1,3);
const mouseController = new TrackballControls(camera, canvas);
mouseController.rotateSpeed = 2;
mouseController.zoomSpeed = 0.5;

// Add lights
const ambientLight = new THREE.AmbientLight(0x909090);
scene.add(ambientLight);
const light = new THREE.SpotLight(0xffffff);
light.intensity=150;
light.position.set( 5,3,4 );
scene.add(light);
light.position.set(5,3,4);
light.castShadow = true;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 40;
light.shadow.mapSize.x = 1024;
light.shadow.mapSize.y = 1024;

// Add sun at position of spotlight
const txtLoader = new THREE.TextureLoader();
const sun = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32),
                           new THREE.MeshBasicMaterial({color:0xffdd00,
                                                        map: txtLoader.load("sunmap.jpg")}));
sun.position.copy(light.position);
scene.add(sun);

// Add the ground
const groundTxtMap = txtLoader.load("grasslight-big.jpg");
groundTxtMap.wrapS = THREE.RepeatWrapping;
groundTxtMap.wrapT = THREE.RepeatWrapping;
groundTxtMap.repeat.set(25, 20);
groundTxtMap.anisotropy = 16;
// groundTxtMap.encoding = THREE.sRGBEncoding;
const groundNormalMap = txtLoader.load("grasslight-big-nm.jpg");
groundNormalMap.wrapS = THREE.RepeatWrapping;
groundNormalMap.wrapT = THREE.RepeatWrapping;
groundNormalMap.repeat.set(25, 20);
const groundMat = new THREE.MeshPhongMaterial({color: "white",
                                               side:THREE.DoubleSide,
                                               map:groundTxtMap,
                                               normalMap:groundNormalMap} );

groundMat.transparent = false;
groundMat.opacity = 0.5;
const groundGeo = new THREE.PlaneGeometry(20,20);
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.receiveShadow = true;
ground.rotation.x = -Math.PI/2;
scene.add(ground);

// Build the house
const house = new THREE.Object3D();
scene.add(house);
const width = 1;
const len = 2;
const height = 0.8;

const bodyTxtMap = txtLoader.load("brick-wall.jpg");
bodyTxtMap.wrapS = THREE.RepeatWrapping;
bodyTxtMap.wrapT = THREE.RepeatWrapping;
bodyTxtMap.repeat.set(2,2);
// bodyTxtMap.minFilter = THREE.NearestFilter;
// bodyTxtMap.magFilter = THREE.Lin;
const bodyMat = new THREE.MeshPhongMaterial({color: "white",
                                             map:bodyTxtMap} );

const bodyGeo = new THREE.BoxGeometry(width,height,len);
const body = new THREE.Mesh(bodyGeo, bodyMat);
body.position.y = height/2 + 0.0001;
body.castShadow = true;
scene.add(body);


// Add the roof to the house
// const roofGeo = createIndexedRoofGeo(1.1*len,1.1*width,0.5*height);
const roofGeo = createRoofGeo(1.1*len,1.1*width,0.5*height);
const normals = roofGeo.getAttribute("normal");
const roofTxt1 = txtLoader.load("roof.jpg");
roofTxt1.wrapS = THREE.RepeatWrapping;
roofTxt1.wrapT = THREE.RepeatWrapping;
roofTxt1.repeat.set(3,2);
const roofMat1 = new THREE.MeshPhongMaterial({color: 0xffaaaa,
                                              map:roofTxt1});
const roofMatNoTxt = new THREE.MeshPhongMaterial({color: 0xff4444,
                                                 flatShading: true});
const roofTxt2 = txtLoader.load("floor-wood.jpg");
const roofMat2 = new THREE.MeshPhongMaterial({color: "sienna",
                                              map:roofTxt2} );
const roof = new THREE.Mesh(roofGeo, [roofMat1, roofMat2]);
// const normalsHelper = new THREE.VertexNormalsHelper( roof, 0.25, 0x00ff00, 2 );
// scene.add( normalsHelper );
// const roof = new THREE.Mesh(roofGeo, roofMatNoTxt); // new THREE.MeshBasicMaterial({color:"red"}));


roof.position.y = height;
roof.castShadow = true;
scene.add(roof);
// scene.add(new FaceNormalsHelper( roof, 0.2, 0x00ff00, 2 ));
// scene.add(new THREE.VertexNormalsHelper( roof, 0.2, 0x0000ff, 2 ));


// Add windows
const windowGeo = new THREE.BoxGeometry(height/3, len/10, 0.01);
// shiny windows
const windowMat = new THREE.MeshPhongMaterial( { color: 'black',
                                                 specular:"white",
                                                 shininess:50} );
const win1 = new THREE.Mesh(windowGeo, windowMat);
house.add(win1);
win1.rotation.z = Math.PI/2;
win1.rotation.y = Math.PI/2;
win1.position.x = width/2;
win1.position.y = height/2;
win1.position.z = len/4;
const win2 = win1.clone();
win2.position.z = -len/4;
house.add(win2);
const win3 = win1.clone();
win3.position.x = -width/2;
house.add(win3);
const win4 = win2.clone();
win4.position.x = -width/2;
house.add(win4);
const win5 = new THREE.Mesh(windowGeo, windowMat);
win5.rotation.z = Math.PI/2;
win5.position.z = len/2;
win5.position.y = height/2;
house.add(win5);



function render() {
  requestAnimationFrame(render);

  sun.rotation.y += 0.01;


  mouseController.update();
  renderer.render(scene, camera);
}

render();




/**
 * helper function to create the roof.
 *
 * @param{number} l length of roof
 * @param{number} w width of roof
 * @param{number} h height of roof
 */
function createRoofGeo(l, w, h) {

  const geo = new THREE.BufferGeometry();

  const vertices = new Array(6);
  vertices[0] = new THREE.Vector3(-w/2, 0, -l/2);
  vertices[1] = new THREE.Vector3(w/2, 0, -l/2);
  vertices[2] = new THREE.Vector3(0, h, -l/2);
  vertices[3] = new THREE.Vector3(-w/2, 0, l/2);
  vertices[4] = new THREE.Vector3(w/2, 0, l/2);
  vertices[5] = new THREE.Vector3(0, h, l/2);

  geo.setFromPoints([
    // Face 0
    vertices[0],
    vertices[2],
    vertices[1],
     // Face 7
    vertices[3],
    vertices[4],
    vertices[5],
    // Face 1
    vertices[0],
    vertices[3],
    vertices[2],
    // Face 2
    vertices[2],
    vertices[3],
    vertices[5],
    // Face 3
    vertices[0],
    vertices[1],
    vertices[4],
    // Face 4
    vertices[0],
    vertices[4],
    vertices[3],
    // Face 5
    vertices[1],
    vertices[2],
    vertices[5],
    // Face 6
    vertices[1],
    vertices[5],
    vertices[4],

  ]);

  geo.addGroup(0, 6, 1);
  geo.addGroup(6, 18, 0);




  const uvs = [];
  // Face 0
  uvs.push(0,0);
  uvs.push(1/2,1);
  uvs.push(1,0);
  // Face 7
  uvs.push(1,0);
  uvs.push(0,0);
  uvs.push(1/2,1);
  // Face 1
  uvs.push(1,0);
  uvs.push(0,0);
  uvs.push(1,1);
  // Face 2
  uvs.push(1,1);
  uvs.push(0,0);
  uvs.push(0,1);
  // Face 3
  uvs.push(0,0);
  uvs.push(0,1);
  uvs.push(1,1);
  // Face 4
  uvs.push(0,0);
  uvs.push(0,1);
  uvs.push(1,1);
  // Face 5
  uvs.push(1,0);
  uvs.push(1,1);
  uvs.push(0,1);
  // Face 6
  uvs.push(1,0);
  uvs.push(0,1);
  uvs.push(0,0);


  geo.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
  geo.computeVertexNormals();


  return geo;
}


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

  geo.addGroup(0, 6, 1);
  geo.addGroup(6, 18, 0);

  // The uvs correspond to vertices in an indexed BufferGeometry
  const uvs = [];
  uvs.push(0,0);
  uvs.push(1,0);
  uvs.push(1/2,1);
  uvs.push(1,0);
  uvs.push(0,0);
  uvs.push(1/2,1);

  geo.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
  geo.computeVertexNormals();

  return geo;
}
