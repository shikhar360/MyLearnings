import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 There are 2 types of shadow 1. Core shdow (shadow in the object) , 2. Drop Shadow (shdow on the plane)
 When threejs render the shadows it also do render for the lights and it replace ll the mesh with MeshDepthMaterial

 The light renders are stored as textures and we call those shadows map. 

 How to activate Shadows

 Activtate the shadow maps on the renderer

 Then you have to to each object and have to decide wether it can cast shadows or it can recieve the shadows

//-- Only three types of light supports Shadows 
    Directional Light
    point Light
    Spot Light 
 

After objects we have to enable shadowing on lights


Differnt types of algorithm that can be applied on the shadow map
THREE.BasicShadowMap  --- performant with less quality
THREE.PCFShadowMap ---- less performant but smoother edges (default)
THREE.PCFSoftShadowMap----- less performant but more softer edges (recommended) 
THREE.VSMShadowMap -- less performant unexpected results


We can also bake the shadow like predefined shadows but if you move the object the shadow will not move 

Another way of doing that is to use a simple shadow texture which can be moved along with the bject
if the object moves up the alph of the shadow will increse and decrease vice-versa (recommended)
In this metghod we are creatinbg a new plane which is just above  the existing plane 




*/

const textureLoader = new THREE.TextureLoader();
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");

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
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(2, 2, -1);
gui.add(directionalLight, "intensity").min(0).max(1).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
scene.add(directionalLight);

//-- Enabling cast shadow
directionalLight.castShadow = true;

//-- For better Shadow Precision
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

//-- Debuging the shadows
//First we need a camera Helper then we have to set the near and far values to avoid Bugs

//By setting the amplitude we can get more precise shadows

directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = 2;
directionalLight.shadow.camera.right = -2;

directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
// scene.add(directionalLightCameraHelper);

//--  Spot light

const spotLight = new THREE.SpotLight(0xffffff, 0.3, 10, Math.PI * 0.3);

spotLight.castShadow = true;
//shadow improve
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;

//feild of view
spotLight.shadow.camera.fov = 30;

//setting the position of spotlight

spotLight.position.set(0, 2, 2);
scene.add(spotLight.target);
scene.add(spotLight);

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
spotLightCameraHelper.visible = false;
scene.add(spotLightCameraHelper);

//-- Point Light

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;

pointLight.position.set(-1, 1, 0);
scene.add(pointLight);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
// scene.add(pointLightCameraHelper);
/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);

//-- Sphere cant recieve shadow because there is nothing above sphere
sphere.castShadow = true;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

//-- Plane can recieve shadows
plane.receiveShadow = true;

//------------------ adding sphere shadow

const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow,
  })
);

sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.01;

scene.add(sphereShadow);
//------------------------

scene.add(sphere, plane);

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

//-- Enabling Shadow maps
renderer.shadowMap.enabled = false;
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //----------------Adding Sphere and its shadow

  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  //updating Shadows

  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;

  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.5;
  //   ----------------------------------------

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
