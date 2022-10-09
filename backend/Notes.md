## Backend Notes

To run javascript code without depending on browser and without having restrictions that we have on 
browers . The solution to this is Node.js (Node.js is just another Js runtime) . The the software that execute the code is V8 engine developed by google . 

To enter the node enviornment :

We have to write `node` in the terminal after installing the node LTS from the official website.

After entering the node enviornment you can exit in the following ways
> .exit
> 
> ctrl + D

After entering the node by pressing the TAB two times . You will get buch of the Global variables that you can use i.e String , Number etc

You can go deep to get more Global functions tht are avaiable t the global variable by 
> String. (Hitting Tab)

_ underscore is also a great thing in node it represents the PREVIOUS RESULT 
>i.e 2*3=6 , _-2=4.

#### How to make modules

Make a `modules` folder , In that folder make a js file and write `module.exports= ()=>{}` write the function that you want your module to be doing

In the file where you want to use the modules write
`const anyName = require(./module/any.js)`
Then anyName will work as a function.

### REST Api (Representational State Trasfer)
It is a way of making apis in a logical way in order to make it easy to consume by the clients.

Way of making a REST API or API that followsthe rest structure:

- Sepearate the Api into logocal resources : Resources means Object or representation of something , which has data associated to it. Any information that can be named 

- Expose the stuructured , resource based URL  : `https://acd.com/addsomething`  (//addsomething is the endpoint)

- Use HTTP methods :  These http methods perform  the CRUD methods (Create : POST ; Read : GET , Update : PUT , PATCH  ; Delete : DELETE)

- Send Data as JSON : JSON is just object that has keys and values , where keys always should be strings and values could be anything ( we can format it with JSEND) 
  
- Be stateless : The state should be handled by the client , The server should not have to remember the previous request .