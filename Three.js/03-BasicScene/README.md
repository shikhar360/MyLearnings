## Three.js

In order to get starte we need 4 things

1. SCENE (that will contain the object)
2. OBJECT
3. CAMERA
4. RENDERER

<b> SCENE</b> :

Its is like a container we put object light material etc in that.
At some point of time we will as our renderer to render it.

<b> OBJECT</b>

It can be many this like particle imported models geometrical shapes etc.

<b> CAMERA</b> :

It is not visible , It serves as a point of view at the time of render ,
We can have multiple camera and different types of camera
The most common use camera is PRESPECTIVE CAMERA

<b> RENDERER</b> :

It render the scene from the camera point of view . The result is then drawn to the
canvas . CANVAS is the HTML element in which you can draw stuffs.
Three.js will use the WEBGL to draw the renderer inside the canvas.
We can create it manually or let three.js do it .

As of now we are going to create a canvas (see in the index.html file)
