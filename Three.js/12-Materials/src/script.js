import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/*
Debug
*/
const gui = new dat.GUI();

//TEXTURES (these are to be written in the begining)

const textureLoader = new THREE.TextureLoader();

//-- Environment loader
const cubeTexureLoader = new THREE.CubeTextureLoader();

const aplhaTexture = textureLoader.load("/textures/door/alpha.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTextures = textureLoader.load("/textures/matcaps/4.png");
const gradientTextures = textureLoader.load("/textures/gradients/5.jpg");
gradientTextures.minFilter = THREE.NearestFilter; //for toonish objects
gradientTextures.magFilter = THREE.NearestFilter;
gradientTextures.generateMipmaps = false;

// Theese enviornment loader needs all 6 direction images

const enviornmentTexture = cubeTexureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
]);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//----------------------------------------------------------------------------------
/*
OBJECTs
*/

/*

const material = new THREE.MeshBasicMaterial();
//we can also use map like this
material.map = colorTexture;

// But we can set the color of the material like this
// material.color.set("yellow");
//or
//material.color = new THREE.Color("blue");
//or
// material.color = new THREE.Color(0x00ff00);
//or
// material.color = new THREE.Color("#00f");

//-- We can also use the opacity
// material.opacity = 0.5;
material.transparent = true; //In order to use the alphamap we also need to make material transparent

//-- We can also see the doubleside

material.side = THREE.DoubleSide; //THREE.Frontside is default
//(doubleside is not recommended always because it sends more calculations to GPU)

//-- We can also set the alpha map (unnecessary things will be hiden)
material.alphaMap = aplhaTexture;
*/

// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true; //To get a squary pattern

//-- MeshMatcapMaterial will display a colour by using the normals as a rfrenceto pick a right color on the
//-- texture to lok like a sphere

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTextures;

//-- MeshDepthMaterial will simply color the geometry in white if the material is near the camera and
//-- in black if it is faar from the camera

// const material = new THREE.MeshDepthMaterial();

//-- MeshLambertMaterial is a meterial that reacts to light

// const material = new THREE.MeshLambertMaterial();
//But this is also creating a line pattern if looked closely .. Instead of this we can use this

//-- MeshPhongMaterial

// const material = new THREE.MeshPhongMaterial();
//We can aslo set the material shineness with that using
// material.shininess = 100;
//to set the color of the reflection
// material.specular = new THREE.Color(0x0000ff);

//-- Mesh Toon Material creates a cartoonish effect

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTextures;

// -- Mesh Standardmaterial like MeshLambartMaterial and MeshPhongMaterial it supports light but with more
// -- realistic renders and better parameter like roughness and metalness

// const material = new THREE.MeshStandardMaterial();
// material.roughness = 1; //default val = 1 (recommended to initialize with this)
// material.metalness = 0; //default val = 0 (recommended to initialize with this)
// material.map = colorTexture;
// material.aoMap = ambientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = heightTexture;
// material.displacementScale = 0.05;

// material.roughnessMap = roughnessTexture;
// material.metalnessMap = metalnessTexture;

// material.normalMap = normalTexture; // for tiny detailings
// //set the intensity of the normal map
// material.normalScale.set(0.5, 0.5);

// //Controling Aplha
// material.transparent = true;
// material.alphaMap = aplhaTexture;

// --Enviornment Loader (Three.js only supports cube enviornment map )

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = enviornmentTexture;

//HDRIHaven.com for searching the images  then we can use
// "https://matheowis.github.io/HDRI-to-CubeMap/"  //for changing the HDRI into all 6 direction photo

//* ALWAYS USE THIS AFTER CREATING MATERIAL

gui.add(material, "roughness").min(0).max(1).step(0.001);
gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 64, 64),
  material
);

sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

sphere.position.x = -1.25;

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 100, 100),
  material
);
plane.position.x = 1.25;

plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.5, 0.2, 64, 128),
  material
);

torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

scene.add(sphere, plane, torus);

//----------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
// Adding few lights just for material ( indepth in other lesson )
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

scene.add(pointLight);

//--------------------------------------------------------------------------------------------
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

  //Update the objects
  sphere.rotation.y = 0.2 * elapsedTime;
  plane.rotation.y = 0.2 * elapsedTime;
  torus.rotation.y = 0.2 * elapsedTime;

  sphere.rotation.x = 0.1 * elapsedTime;
  plane.rotation.x = 0.1 * elapsedTime;
  torus.rotation.x = 0.1 * elapsedTime;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
