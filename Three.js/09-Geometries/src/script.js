import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2); //Adding other 3 parameters wont create difference

//-- Lets create our own geometry

// const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]); // Here we have provided 9 values
// // 3 for each vertices

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3); // 3 here means the vertices are 3

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", positionsAttribute);
// // Dont writ "positions" it wont work

//-- Lets create bunch of random triangles
const geometry = new THREE.BufferGeometry();

const count = 50;

// in this case we have 50 triangkes for that just
const positionsArray = new Float32Array(count * 3 * 3);
// number of triangles have 3 vertices and all of thenm will have 3 values

for (let i = 0; i < count * 3 * 3; i++) {
  // PositionsArray is filled
  positionsArray[i] = (Math.random() - 0.5) * 4;
}

//set the attribute
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

geometry.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true, // It just help us to know the subdivisions
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
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
-- What is Geometry

Geometry is composed of vertices (a 3d points in the spaces) and faces (triangle that join those vertices to 
create surfaces )

Can be used for mesh but also for particles

Can store morre data than the positions (UV coordinates , Normal , Color aor anyting that we want )
---------------------------------------------------------------------------

-- Built-in Geometries
See the documentation to get more grasp of it

- Box Geometry
Till now we are using only 3 parameter for creating box width , height , depth (in order)
There are 3 more paramater :
widthSegment , heightSegments , depthSegment

These are the subdivisions in the axis i.e how many triangles should be there 
1segment = 2 triangles 
2segment means 8 triangles
3segments or subdivisions means 32 triangles




*/
