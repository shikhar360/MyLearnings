import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
//-- Making the Group

const group = new THREE.Group();
group.position.y = 2;
group.scale.y = 2;
group.rotation.y = Math.PI * 0.2;

scene.add(group); // we have to add the group to the scene

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
group.add(cube1);
cube1.position.x = -2;

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube2);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
group.add(cube3);
cube3.position.x = 2;
//! we can do all that but its recommended  to create all the objects of same thing like button in shirt together
//! we can do that by making the THREE.Group 👆

//-- AxesHelper
//- Positioning the objectin space can be hard.Axes helper that will help in getting the axes (x,y,z)coloredline

const axes = new THREE.AxesHelper(2);
//It is a object and we have to add it to the scene
// Parameter in the AxesHelper is the length of the Axes
scene.add(axes);

/*
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 1;
// mesh.position.y = 2;
// mesh.position.z = -1.5;

//-- We can also set the positions of x , y , z all at once by

mesh.position.set(1, 2, -1.5); //in the same order

scene.add(mesh);


//-- We can also scale mesh
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;

//Or all at once by
mesh.scale.set(2, 0.5, 0.5);

//-- Rotation
// Doing rotation is hard , careful with that because changing the one axes will completely change other axes
// To avoid getting gimble lock we have to reorder the axes

mesh.rotation.reorder("YXZ"); //doing this after the rotation wont work i.e reorder first
mesh.rotation.y = Math.PI * 0.5;
mesh.rotation.x = Math.PI * 0.25;

//! Quaternion is something like rotation just remember that when you update rotation it will update quaternion

//-- This command will identify the distance between mess and camera and will convert it into 1 i.e Normalize it
mesh.position.normalize();

//-- This will give the difference between the middle of the scene and the object placed
console.log(mesh.position.length());
*/

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 6;

scene.add(camera);

//-- We can tell out camera to look at the specific object by this (parameter === vector3)
// camera.lookAt(mesh.position);

//- It states distance between camera and the mesh
// console.log(mesh.position.distanceTo(camera.position));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

/* 
----------------------------------------------------------------------------------------------

-- IN this we are going to learn how we can transform objects ... we have already learned
~ Position , Scale , Rotation
~ We have a new thing QUATERNION

It is something like rotation.

- All the classes that are inherit from the Object3D posses those(Position , Scale , Rotation , Quaternion)
> Like Mesh , PrespectiveCamera are all inside the Object3d class so thay all can be position scale and roatate 

- `ALWAYS move the mesh positions before the render`
Add positon of mesh right after creating mesh before adding it to the scene
- `scene.add(mesh) //before this`

*/
