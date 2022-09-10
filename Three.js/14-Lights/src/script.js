import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 Adding ligts is simple as adding Mesh 
 */
//-- Ambient Light is the omnidirectional Light

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//OR
// const ambientLight = new THREE.AmbientLight();
// ambientLight.color = new THREE.Color(0x00ff00);
// ambientLight.intensity = 0.5;

// (While dding light from one direction it will only light up the part that is reflected ..... To create a /
// light bouncing effect on each part we usethe ambient lighting )

scene.add(ambientLight);

//-- Directional Light creates a sun like effect if the sun rays travelling in the parallel

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
//Cana also set teh position of light
directionalLight.position.set(1, 0.245, 0);
// scene.add(directionalLight);

//-- Hemisphere Light works as a ambient light throws 2 colors

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.2);
scene.add(hemisphereLight);

//-- point Light is infinite small Light putting light in everydirection from one point
// the other 2 parameter after intensity are reach(how far light should go) and decay(where it should decay)

const pointLight = new THREE.PointLight(0xff9000, 2, 3, 2);

pointLight.position.set(1, 0.5, 1);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
scene.add(pointLight);

// -- RectAreaLight (rectangle studuio light) it only works with MeshStandardMaterial and MeshPhysicalMaterial

const rectLight = new THREE.RectAreaLight(0x4e00ff, 2, 2, 2); // color , intensity , width , height
//to move it
rectLight.position.set(-1.5, 1, 1.5);
rectLight.lookAt(new THREE.Vector3());
scene.add(rectLight);

//-- Spotlight (self explinatory)

const spotLight = new THREE.SpotLight(0x78ff00, 1, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3);
//color , intensity , distance  , angle , penumbra(edge iontensity) , decay

//We cannot move the light in the same way

spotLight.target.position.x = -0.75;
scene.add(spotLight.target); // spotlight is looking for a  object3d to focus its light
scene.add(spotLight);

//-- Helpers

const hemisphereLighthelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.25
);
scene.add(hemisphereLighthelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.25
);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.25);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);

scene.add(spotLightHelper);

window.requestAnimationFrame(() => {
  spotLightHelper.update();
});

/**
 * 
 * Have to be Imported from three/examples/........... 
 
 const rectAreaLightHelper = new THREE.RectAreaLightHelper(rectLight);
 scene.add(rectAreaLighthelper)

 window.requestAnimationFrame(() => {
  rectAreaLightHelper.position.copy(rectLight.position)
  rectAreaLightHelper.update();
});


 
 */

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial(); //MeshStandardMaterial need s lights in order to shjow something
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
