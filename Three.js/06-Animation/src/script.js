import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

console.log(gsap);
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

//-- Animation

//- Initializing the clock
// const clock = new THREE.Clock();

//- After installing the gsap library we can have more features of animating things
// here we have 2 arguments : the thing(i.e mesh , camera) that we want to animate and
// obj (how it is going to animate)

gsap.to(mesh.position, { duration: 1, delay: 1, x: 1 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });
// gsap.to(camera.position, { duration: 1, delay: 1, x: 1 });

//! gsap has its own tick

const tick = () => {
  //- Using the time elapsed (it will give us 1 second time break )
  //   const timeElapsed = clock.getElapsedTime();

  //-Update Objects
  //This is now depend on the compute power and it may vary from computer to computer
  // to adapt to the frame rate we will be using THREE.Clock because it will be same for every computer

  //   mesh.rotation.y = timeElapsed;
  //   mesh.position.y = Math.sin(timeElapsed);
  //   mesh.position.x = Math.cos(timeElapsed);

  //Render the object
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

/*
! Animation

Animation is done using process stop motion means object move take photo again obj move take photo 
(these we call them as FPS - Frames per second ) standard rate is 60 fps

We need to update objects and render on each frame 
we are going to do that in function and call that funcion with
- window.requestAnimationFrame(...)

The purpose of requestAnimationFrame is to call a function on the next frame . Later we will call same 
functin inside that(requestanimationFrame) to do something on the next frame and thats how the animation
works



*/
