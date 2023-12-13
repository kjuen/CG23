// Solution to exercise on slide 50, chapter 4

// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('white');    // set background color

// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.width/canvas.height, 0.1, 1000 );
camera.position.set(0,0,3);
camera.lookAt(scene.position);   // camera looks at origin

const radius = 0.2;
const geo = new THREE.SphereGeometry(radius, 16, 16);

const params = {color: "green",
                wireframe:true,
                wireframeLinewidth:2};
const mat = new THREE.MeshBasicMaterial(params);

// Combine geometry and material to a new object:
const obj = new THREE.Mesh(geo, mat);
scene.add(obj);
const speed = new THREE.Vector3(-2,0,0);

// Draw everything
const axes = new THREE.AxesHelper();
scene.add(axes);
const controls = new THREE.TrackballControls( camera, canvas );
const clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);

  const h = clock.getDelta();
  const t = clock.getElapsedTime();

  // calculate position in camera space
  const posInCam = obj.position.clone();
  posInCam.applyMatrix4(camera.matrixWorldInverse);
  const zc = Math.abs(posInCam.z);  // make sure zc is positive
  const xc = posInCam.x;
  // size of frustum at this zc-value
  const hc = 2 * zc * Math.tan(Math.PI/180*camera.fov/2);
  const wc = camera.aspect * hc;

  // simple check if ball hits frustum
  if(xc >= wc/2-radius) speed.x = -Math.abs(speed.x);
  if(xc <= -wc/2+radius) speed.x = Math.abs(speed.x);

  // move ball
  obj.position.add(speed.clone().multiplyScalar(h));

  controls.update();
  renderer.render(scene, camera);
}
render();
