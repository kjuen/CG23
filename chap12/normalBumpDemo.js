// Demo for normal and bump maps
import * as THREE from "three"
import {TrackballControls} from "three/addons/controls/TrackballControls.js";


//* Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas,
                                         antialias:true});
renderer.setClearColor('rgb(230, 230, 230)');    // set background color

// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height,
                                          0.1, 1000 );
camera.position.set(2,2,20);
camera.lookAt(scene.position);

const light = new THREE.PointLight();
light.position.set(20,20,20);
scene.add(light);
light.intensity = 2000;
const b = new THREE.Mesh(new THREE.SphereGeometry(1),
                         new THREE.MeshBasicMaterial({color:"yellow"}));
b.position.copy(light.position);
scene.add(b);
scene.add(new THREE.AmbientLight(0x888888));

const txtLoader = new THREE.TextureLoader();


// Normal map example: a box with some structure on its surface
// image from http://cpetry.github.io/NormalMap-Online/
const normTxt = txtLoader.load('chap12/NormalMap.png');
const box = new THREE.Mesh(new THREE.BoxGeometry(8, 8, 8),
                           new THREE.MeshPhongMaterial({color:'#aa67ab',
                                                        side:THREE.DoubleSide,
                                                        // normalMap:normTxt,
                                                        wireframe: false,
                                                        specular:'#aa67ab',
                                                        shininess:10}));
scene.add(box);



// Bump map example: a football with stitchings
const txt = txtLoader.load('chap12/ballMap.png');
const bumpTxt = txtLoader.load('chap12/ballBumpMiddleBlurred.png');
const ballRadius = 4;
const ballGeo = new THREE.SphereGeometry(ballRadius, 64, 64);
const ball = new THREE.Mesh(ballGeo,
                            new THREE.MeshStandardMaterial( {color: '#dddddd',
                                                             map:txt,
                                                             bumpMap:bumpTxt,
                                                             bumpScale:0.1}));
ball.rotation.x = Math.PI/2;
// scene.add(ball);


// Render loop
const controls = new TrackballControls( camera, renderer.domElement );

function render() {
  requestAnimationFrame(render);

  controls.update();
  renderer.render(scene, camera);
}
render();
