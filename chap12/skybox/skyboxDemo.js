import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js";


// Skybox demo: note that it works best if the canvas aspect ration coincides with the aspect ratio
// of the skybox images, which have equal width and height.
// Thererfore, the canvas has equal height and width and there's no resize callback
// (the video explaining this code does this differently...).


// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true});
renderer.setClearColor('rgb(255,255,255)');

// create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, canvas.width / canvas.height,
                                            0.1, 1000);
camera.position.x =4;
camera.position.z =12;

const ambientLight = new THREE.AmbientLight('#404040');
scene.add(ambientLight);

const spotLight = new THREE.SpotLight('#aaaaaa');
spotLight.intensity = 200;
spotLight.position.set( 15,15,15 );
scene.add(spotLight);


scene.add(new THREE.AxesHelper(1));
const knotGeometry = new THREE.TorusKnotGeometry(2,0.5,150,15);
const knotMaterial = new THREE.MeshStandardMaterial({color:'#55ff22',
                                                     metalness:0.5,
                                                     roughness:0.2});
const knot = new THREE.Mesh(knotGeometry, knotMaterial);
scene.add(knot);



const txtLoader = new THREE.TextureLoader();

// Skybox, https://www.youtube.com/watch?v=cp-H_6VODko

const urls = [
  "right.jpg",
  "left.jpg",
  "top.jpg",
  "bottom.jpg",
  "front.jpg",
  "back.jpg",
];

let matArray = [];
urls.forEach(tn => {
  const txt = txtLoader.load(tn);
  matArray.push(new THREE.MeshBasicMaterial({map:txt,
                                             side:THREE.DoubleSide}));
});

let skyBoxGeo = new THREE.BoxGeometry(300, 300, 300);
let skyBox = new THREE.Mesh(skyBoxGeo, matArray);
scene.add(skyBox);

const controls = new OrbitControls( camera, canvas );
controls.zoomSpeed = 5;
// controls.maxDistance = 50;
function render() {
  requestAnimationFrame(render);
  skyBox.position.copy(camera.position);

  spotLight.position.copy(camera.position);

  controls.update();
  renderer.render(scene, camera);
}

render();
