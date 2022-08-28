//-- This is how we create a basic scene

const scene = new THREE.Scene();

//-- Starting with making a red cub we will be creating a Mesh
// Mesh - combination of geometry shapes and material (how it should be looking)

const geometry = new THREE.BoxGeometry(1, 1, 1); // Creating a Basic Box with 1-unit on each side

const material = new THREE.MeshBasicMaterial({ color: "red" });
// MeshBasicMaterial is the Properties of geometry

const mesh = new THREE.Mesh(geometry, material);

//-- After you have created SCENE and MESH you have to add it to the scene by doing this

scene.add(mesh);

//-- Now we have to add the camera to view the object that we have created
// In the camera we have to provide the ""feild of view"" as a parameter it is VERTICAL view in nature
// Other parameter we have to provide is the "ASPECT RATIO" width/height (we creatig temp sizes as of now)

//aspectRatio
const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5; // just to zoom out of the cube
camera.position.x = 1.5; //(we can do this anywhere but recommended todo before adding camera to scene)
camera.position.y = 1.5;
scene.add(camera);

//-- RENDERER
const canvas = document.querySelector(".webgl");

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

// now its time to do the render we can do that by

renderer.render(scene, camera);
// But we will not be able to see our cube because we are currently inside our cube for that
//we have too move the camera backward

//- We can trnsform a objectby using these prop : "position" , "rotation" , "scale"
// The ""positon"" property is also an object with a properties of "x" , " y" , "z"
//- Three.js consider the forward and backward axis to be the "z" axis. (we have done this near const = camera)
