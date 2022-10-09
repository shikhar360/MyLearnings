const fs = require("fs"); // fs stands for the file system , more on node.js docs
// by this we are able to read and write data into the file

//-------------------------------------------------------------------------------------
//syncronous blockingsystem

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
//-- node index.js (terminal)
const textOut = `We can write to the file as well : ${textIn}`;
fs.writeFileSync("./txt/output.txt", textOut); //as this point the output.txt does not exist
//-- node index.js (terminal)
// after running this we can see the file output.txt

//-------------------------------------------------------------------------------------
//asyncronous non-blocking system
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  //1st arguments will be error
  console.log("file readed");
  fs.writeFile("./txt/something.txt", `${data}` , "utf-8", (err) => {   //same format
    //the data is must be in literals 
    console.log("file written");
  });
});

//-------------------------------------------------------------------------------------
//Creating the server

const http = require("http");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data)


const server = http.createServer((req , res)=>{
  // request and response is what is spills out
  // res.end("Hello from the server bro");

  //- Routing
  const {pathname , query} = url.parse(req.url , true);
  // const pathname = req.url;

  if (pathname === "/" || pathname === "/overview"){

    res.end("aur kya hal chal");
  } else if(pathname === "/product"){
    res.end("Lelo samaan lelo");



  } else if(pathname === "/api"){
    //creating a simple api
    res.writeHead(200 , {"Content-type" : "application/json"})
    res.end(data);
  }else{
    res.end("LOL nothing here");
  }

})

server.listen(/*port*/ 8000 , /*localhost*/ "127.0.0.1" , /*callback*/()=>{
  console.log("listening the request on the server 8000");
})
//-- node index.js (terminal) also open 127.0.0.1:8000 


