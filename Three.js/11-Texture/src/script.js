import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//-- Textures

//---------------------------------------------------------
// -Way1
//---------------------------------------------------------
// //-- Create a empty Image
// const image = new Image();

// //-- Create texture
// const texture = new THREE.Texture(image);

// //-- Create a onload func

// image.onload = () => {
//   texture.needsUpdate = true;
// };

// image.src = "./textures/door/color.jpg";

// //! Change the object in material to {map : texture} instead of color

//---------------------------------------------------------
// -Way2
//---------------------------------------------------------

// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load("./textures/door/color.jpg");
// With one texture loader we can load multiple texture

//-- We can also provide 3 callback functions after this
// const texture = textureLoader.load(
//     "./textures/door/color.jpg",
//     ()=>{ console.log("load")},
//     ()=>{console.log("progress")},
//     ()=>{console.log("error")},  //self explainatory
//     );

//! It should be before the texture loader

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log("onstart");
};
loadingManager.onLoad = () => {
  console.log("onLoad");
};
loadingManager.onProgress = () => {
  console.log("onProgress");
};
loadingManager.onError = () => {
  console.log("onError");
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const colorTexture = textureLoader.load("./textures/door/color.jpg");
const alphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const heightTexture = textureLoader.load("./textures/door/height.jpg");
const metalnessTexture = textureLoader.load("./textures/door/metalness.jpg");
const normalTexture = textureLoader.load("./textures/door/normal.jpg");
const roughnessTexture = textureLoader.load("./textures/door/roughness.jpg");

// texture are placed on a geometry with a special cordinates we caan call them as uv cordinates
// accessed by (geometry.attributes.uv)

//-- Playing with texture positions

//To repeat a texture
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;

//To wrap the texture
// colorTexture.wrapS = THREE.MirroredRepeatWrapping; // Side
// colorTexture.wrapT = THREE.MirroredRepeatWrapping; // TOP

//To change the Offset
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

//! the initial coordinates from which it is rotating is the bottom-Left point (we can cahnge it to center also)
// colorTexture.rotation = Math.PI / 4;

// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

//--We can minification the picture using the minFilter value of THREE.NearestFilter (Good for performance issues)
// Default is THREE.LinearMipMapLinearFilter
colorTexture.minFilter = THREE.NearestFilter;

//-- We can also change the Magnification of the image by using magFilter (default= THREE.LinearFilter)
// colorTexture.magFilter = THREE.NearestFilter;

//-- We can deactivate the mipmap generations using'
colorTexture.generateMipmaps = false;

//-- Texture Format and Optimization
// When preparing texture remember 3 important things :
// THe Weight , The Size , The Data
// We also need to choose the right type of file and have to find the balance between quality and  weight

// Use texture Images whose sizes are of the power of 2 512 1024 etc

//Sites to find the texture

// poliigon.com;
// 3dtextures.me
// arroway-textures.ch
//------------------------------------------------------------------------------------

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
camera.position.z = 1;
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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/*
! Textures
Texture are the images that will cover the surface of the object
There are many types of render (see ./texture/door) . Some texture like metalness and roughness follow the 
principle of PBR(physical base render) for having a realistic feel

-- How to add the Texture
To add the texture we have to load the image from the url
There are two ways of doing it
1st : put the image in the src file and give path
2nd : Make a onload function and define path there (recommended)

*/
