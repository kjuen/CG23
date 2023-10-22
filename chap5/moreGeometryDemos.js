// Initialize WebGL renderer
import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";
import {OBJLoader} from "three/addons/loaders/OBJLoader.js";
import {TeapotGeometry} from "three/addons/geometries/TeapotGeometry.js";


const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setClearColor('white');  // background color

// Create a new Three.js scene
const scene = new THREE.Scene();
// show global coordinate system
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// Add a camera
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 500 );
camera.position.set(0,0,10);
// Add a mouse controller to move the camera
const controls = new TrackballControls( camera, renderer.domElement);
controls.zoomSpeed = 1.0;


// Add light sources
scene.add(new THREE.AmbientLight('#909090'));
const light = new THREE.PointLight();
light.intensity = 200;
light.position.set(10,0,10);
scene.add(light);


// Add some objects:

// material for showing wireframes
const wmat = new THREE.MeshBasicMaterial({color:'#555555',
                                          wireframe:true,
                                          wireframeLinewidth:2});
// physical material
const mat = new THREE.MeshStandardMaterial({color:'#afeeee',
                                            metalness:0.5,
                                            roughness:0.1,
                                            side: THREE.DoubleSide});

// Slide 11: simple built-in objects
const sphereGeo = new THREE.SphereGeometry(2, 8,4);
// scene.add(new THREE.Mesh(sphereGeo, mat));

const boxGeo = new THREE.BoxGeometry(1,2,3);
// scene.add(new THREE.Mesh(boxGeo, mat));

// Slide 12: Extrude geometry
const base = new THREE.Shape();
base.moveTo(0,0);
base.lineTo(1,0);
base.lineTo(1/2,1);
base.lineTo( 0, 0 );

const extrudeOpts = {
  steps: 4,
	depth: 2,
	bevelEnabled: false,
};

// const roofGeo = new THREE.ExtrudeGeometry( base, extrudeOpts );
// const roof = new THREE.Mesh(roofGeo, wmat);
// scene.add(roof);

// Slide 14: Load the teapot
// You have to load the file TeapotGeometry.js in main.html
// (note: in the videos it's still called TeapotBufferGeometry)
// const teapotGeo = new TeapotGeometry(0.5, 10, true, false);
// const teapot = new THREE.Mesh(teapotGeo, mat);
// scene.add(teapot);

// Slide 15: Load the clothespin model from an external file
// You have to load the file OBJLoader.js in main.html AND run the application from a web server
// let clothespin;
// const loader = new OBJLoader();
// loader.load(
//   '../chap5/Clothespin.obj',
// 	function ( object ) {
//     clothespin = object;
//     scene.add(clothespin);
//     clothespin.children.forEach(c => c.material = wmat);
// 	});



// Render the scene
function render() {
  requestAnimationFrame(render);

  controls.update();
  renderer.render(scene, camera);
}
render();
