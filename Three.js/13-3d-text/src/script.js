import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Axes Helper

// const axesHelper = new THREE.AxesHelper();

// scene.add(axesHelper);
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcaptexture = textureLoader.load("/textures/matcaps/7.png");
const matcaptexture2 = textureLoader.load("/textures/matcaps/4.png");

/**
 * 3D text
 We need to load the font first using the fontloader

 */

const fontLoader = new FontLoader();
//same as texture loader but we cant do like this
// const somefont = fontLoader.load()  // cant do this

fontLoader.load(
  //we have to pass 2 things in this 1. Path   ... 2. Callback func
  "/fonts/helvetiker_regular.typeface.json",
  (font) => {
    //we pass string and a object in this

    const textGeometry = new TextGeometry("Shikhar", {
      font: font,
      size: 0.6,
      height: 0.2,
      curveSegment: 6,
      bevelEnable: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    // Bounding is a information that tells us what space is taken by the geometry . It can be box or
    // sphere(sphere by default )
    // frustum culling -- means rendering or not rendering the object . Three.js uses this in order to max the
    // performance so we need to recenter the object and channge the bouding to a box

    // textGeometry.computeBoundingBox();
    // textGeometry.translate(     // 0.02 is the bevel size , 0.03 id the bevel thickness
    //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,  // 1*0.5 === 1/2
    //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
    //   -(textGeometry.boundingBox.max.z - 0.02) * 0.5
    // );

    //Or we can just use
    textGeometry.center();

    const textMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcaptexture,
    });
    // textMaterial.wireframe = true;
    // textMaterial.matcap = matcaptexture;

    const text = new THREE.Mesh(textGeometry, textMaterial);

    // adding donut in the scene

    const knotGeometry = new THREE.TorusKnotGeometry(0.4, 0.08, 64, 8);
    const knotMaterial = new THREE.MeshMatcapMaterial({
      // we already have this above (can delete this)
      matcap: matcaptexture2,
    });

    for (let i = 0; i < 300; i++) {
      const knot = new THREE.Mesh(knotGeometry, knotMaterial);

      knot.position.x = (Math.random() - 0.5) * 10;
      knot.position.y = (Math.random() - 0.5) * 10;
      knot.position.z = (Math.random() - 0.5) * 10;

      //Adding randommness into their scale

      const scale = Math.random();

      //   knot.scale.x = scale;
      //   knot.scale.y = scale;
      //   knot.scale.z = scale;
      knot.scale.set(scale, scale, scale);

      knot.rotation.x = Math.random() * Math.PI;
      knot.rotation.y = Math.random() * Math.PI;

      scene.add(knot);
    }

    scene.add(text);
  }
);

/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

// scene.add(cube);

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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/*
//! TextBufferGeometry
We are going to use this but we need a particular font called typeface

we have to put the font.json(typeface) file alsong with License in the static file to get started 

as of now we are using that from exapmles





*/
