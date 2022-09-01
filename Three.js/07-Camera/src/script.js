import "./style.css";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

console.log(OrbitControls);

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
  console.log(cursor.x, cursor.y);
});

// Base

const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
/*
-Prespective Camera
The first parameter is FOV(feild of view) . You have to decide at the begining of the project what 
FOV you want because if you change it after or inbetween the projects then you wont be able to the the 
object that was showing in the previous FOV
Max- 75
Min - 45 (as recommended) (measured in degrees)

----------------------------------------------
The second parameter is the Aspect ratio
size of the width / size of the height

----------------------------------------------

The 3rd and 4th parameter is the near and far values
this is to tell the camera that how much far and close your camera should be going

near value can be 0.1-1

far value can be 100-1000

really depends on us how much far we wan our camera to be
----------------------------------------------


- Orthographic camera
The camera with no prespective.
These have 6 parameter
left , right , top , bottom , near , far (in this order)

the problem is that it render the object based on the size of the canvas for solving that we have to 
use the aspect ratio




*/

// const camera = new THREE.OrthographicCamera(-1 ,
//   1,     We can also use this but there will be render problem
//   -1,
//   1,
//   0.1,
//   100
//   )

// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(    //- Using the recommended Orthographic Camera
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   -1,
//   1,
//   0.1,
//   100
// );

//--------------------------------------------------------------------------------------

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 4;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
// These has to be set just after the camera and updated just before the render in tick fn

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh.rotation.y = elapsedTime;

  //- Update the camera

  // camera.position.x = cursor.x * 10;
  // camera.position.y = cursor.y * 10;
  // The y will create a strange result because when we are moving our mouse to the downside
  // the valuee is also going down but in threejs when the mouse is moving down it is consider
  // to be positive thats why we have to invert something somewhere ( recommended to do in eventlistner)

  //- To view the object rotating only on x-axis

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 10;

  // camera.lookAt(mesh.position);

  // Updating the controls

  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/*
!Types of camera 
- Camera
Its is a abstract class we are not suppose to use it directly

-Array camera
It render multiple cameras on a specific area of the render 

-Stereo Camera
It render the screen through two cameras that mimics the eyes to create a parallax effect
used with the devices like AR/Vr etc

-Cube Camera
It does 6 renders each one facing a different direction . Can render sourroundings like enviornment map 
reflection or shadow map. 

-Orthographic camera (going to be used)
Used to create render of the scene but without prespective
like if the object is far away from the camera the size of the object will be equal ===  the object is closer 
to the camera

- Prespective camera
It is the camera with the prespective

------------------------------------------------------------------------------------

- Built-in Controls
"https://threejs.org/docs/#examples/en/controls/OrbitControls"

There are many typpesof built in control youcan see all in docs by clicking the examples

 Here weare going to use OrbitControls
 This can not be accessed by THREE.OrbitControls we have to pull it out see the import up👆

*/
