const express = require('express');
const fs = require('fs');
const app = express();

//////////
app.use(express.json());  // the middleware.
////////////

//- This http method is used to read.  Whenever someone types "/"  he should get
// app.get("/" , (req , res )=>{
//   // res.status(200).send("You will get to see this on the website")
//   res.status(200).json({message :"You will get to see this on the website", app : "Natours"})
// })

const tours = JSON.parse(  //always parse the json file
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results : tours.length,
    data: {
      tours,
    },
  });
});

//:id will return a object with a key of id , we can write anything in that but and object key will be 'anything'
//we will able to see the object by using req.params
// we can also use /:other? to get other params , "?"  will check if the data is present or not and will return undefine if not present

app.get('/api/v1/tours/:id', (req, res) => {

  const id = req.params.id

  const tour = tours.find(el=> el.id === id )

  if(!tour){
    res.status(404).json({message :"Not found ser" , status: "fail"})
  }
  // console.log(req.params);
  res.status(200).json({
    status: 'success',
  
    data: {
      tour,
    },
  });
});

// This method is used to Create.
app.post('/api/v1/tours', (req, res) => {
  // The req contain all the data that is requested or send by the client.
  //but in order to have the data avaiable we have to use the middleware. 

   console.log(req.body); // body is available after using the middleware.

   const newID = tours[tours.length - 1].id + 1;
   const newTour = Object.assign({id:newID } , req.body)
   tours.push(newTour);

   fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json` , JSON.stringify(tours) , (err)=>{
    res.status(201).json({
      status :"success",
      data : {
        tour : newTour
      }
    })
   })



  //res.send('DONE'); // we have to send some data in order to finish the req and res cycle
});

app.listen(3000, () => {
  // listen always listens to the port with a empty call back function
  console.log('App is  running on the port ');
});
