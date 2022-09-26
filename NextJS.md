# A Notes on NextJS

> `index.js` file in any folder under pages folder will work as a landing page for that folder

A simple `About.js` file under folder pages is equal to the `index.js` file under About folder under Pages folder.

Both can be accessed through `domain.com/About`

You will often see the file name like `[abcd].js` it is valid , if the `domain.com/something` does not exist
then , this file will be accessed automatically.

There is a file name convention like `[...slug].js` , if the user types any imaginary file path like
`domin.com/anything/he/want` then this file will be accessed and it will show
`{slug : ["anything" , 'he' , 'want']}`
when running console.log(router.query) --------> import {router} from "next/router"
