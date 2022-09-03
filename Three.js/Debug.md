## Debugging the UI

There anre many libraries to debug the ui like
dat.gui
control-panel
ControlKit
Guify
Oui

In this we are going to use the dat.gui

To install just

`npm install --save dat.gui`

Then,

`import * as dat from "dat.gui" `

You can access that by using
`const gui = new dat.GUI() `

There are different types of element that you can add to the panel
Range , Color , Text , Checkbox , Select , Button , Folder

> It is recommended to use the folder for the better management of the code and debugging

#### How to add ?

You can add the element to the panel by using

`gui.add(mesh.position , "y" , -3 , 3 , 0.01)` // here mesh.position is the object and "y" is the property name

The other three parameter (-3,3,0.01) are the 'minimum ', 'maximum' and the 'precision' value

We can write the above code like this also

`gui.add(mesh.position , "y").min(-3).max(3).step(0.01)` // This is much more cleaner

we can also change theproperty name by adding a .name('string')

`gui.add(mesh.position , "y").min(-3).max(3).step(0.01).name("elevation")`

## Changing the color of the object

Changing the color of the object in the Three.js is bit tricky

Here you can not use the gui.add(...) method like above

EX- `gui.add(material , "wireframe")`
datgui will autoatically know that its a boolean and will add checkbox in the panel

You have to use the gui.addColor(...) instead

First you needto create a debugColor object

```javascript
const debug = {
  color: 0xff0000,
  spin: () => {
    console.log("By this way  we can add any debug prop to the panel");
    // Like if we want to spin the obj
    gsap.to(mesh.position, { duratrion: 1, y: mesh.rotation.y + Math.PI * 2 });
    //This wil create a panel on the button that will spin the obj
    // We have to add this too
  },
};

// Then ,

//-- Color
// gui.addColor(debug, "color"); // but it will not change the colo of the obj as it is not updating

//we have to chain a onchange function in this
gui.addColor(debug, "color").onChange(() => {
  material.color.set(debug.color); //  material is the obj that is containing the property
});

//We can now set the color in th material to debug.color instead of hardcoding the value

const material = new THREE.MeshBasicMaterial({ color: debug.color });

//-- Spin

gui.add(debug, "spin");
```
