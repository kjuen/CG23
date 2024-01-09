// Demos for applying textures
import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

// create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight,
                                           0.1, 1000);
camera.position.z = 3;

window.addEventListener("resize", function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});


const ambientLight = new THREE.AmbientLight('#404040');
scene.add(ambientLight);
const spotLight = new THREE.SpotLight('#ffffff');
spotLight.position.set( 15,15,15 );
scene.add(spotLight);

const txtLoader = new THREE.TextureLoader();

// Skybox, see http://stemkoski.github.io/Three.js/Skybox.html
const r = "MilkyWay/";   // path relative to html file!
const urls = [ r + "dark-s_px.jpg", r + "dark-s_nx.jpg",
               r + "dark-s_py.jpg", r + "dark-s_ny.jpg",
               r + "dark-s_pz.jpg", r + "dark-s_nz.jpg" ];
let matArray = [];
urls.forEach(tn => {
  const txt = txtLoader.load(tn);
  matArray.push(new THREE.MeshBasicMaterial({map:txt,
                                             side:THREE.BackSide}));
});

let skyBoxGeo = new THREE.BoxGeometry(300, 300, 300);
let skyBox = new THREE.Mesh(skyBoxGeo, matArray);
scene.add(skyBox);



// Earth with various maps
const map = txtLoader.load("earth_surface_2048.jpg");
const normalMap = txtLoader.load("earth_normal_2048.jpg");
const specularMap = txtLoader.load("earth_specular_2048.jpg");
const mat = new THREE.MeshPhongMaterial({
  color:'#ffffff',
  specular:'#606060',
  shininess: 3,
  map,
  normalMap,
  specularMap,
});

const geo = new THREE.SphereGeometry(1, 24, 24);
const earth = new THREE.Mesh(geo, mat);
scene.add(earth);

// clouds
const cloudScale = 1.01;
const cloudGeo = new THREE.SphereGeometry(cloudScale, 24, 24);
const cloudMat = new THREE.MeshPhongMaterial();
cloudMat.transparent = true;
txtLoader.load("earth_clouds_1024.png", function(txtMap) {
  cloudMat.map = txtMap;
  cloudMat.needsUpdate = true;
});
const clouds = new THREE.Mesh(cloudGeo, cloudMat);
earth.add(clouds);





// Render loop
const controls = new OrbitControls( camera, canvas );
controls.zoomSpeed = 1/2;
function render() {
  requestAnimationFrame(render);

  earth.rotation.y += 0.0002;
  clouds.rotation.y += 0.0001;

  skyBox.position.copy(camera.position);

  spotLight.position.copy(camera.position);

  controls.update();
  renderer.render(scene, camera);
}

render();
