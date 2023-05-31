#### How to connect with a hosted database ??
First we need to install mongoose in our system using
`npm i mongoose`

To connect the app with the hosted database we first have to go to the official site of mongo db and there we will find a database connecting string like
`mongo+srv://myname<PASSWORD>abcxyz`

we will also get a db password there , we have to save all that thing in the .env file

After that we have to connect the mongoose to the server.js file

```js
const mongoose = require("mongoose");
const DB  = process.env.DATABASE.replace("<PASSWORD>" , process.env.DATABASE_PASSWORD)

//Then we have to connect by putting the db into that along with some other things just to not get the deprecation warning
mongoose.connect(DB , {
  useNewUrlParserer : true ,
  useCreateIndex : true ,
  useFindAndModify : false
}).then(()=> console.log("Db connection established successfully"))
```

#### How to create a Schema ?
We use this to create a simple guideline for doing all the CRUD Operations

To define a schema , we 

```js
const dataSchema = new mongoose.Schema({
  // here are the different ways in which we can define schema
  name : String,
  price : {
    type : Number , 
    required : true ,
    unique : false
  },
  rating : {
    type : Number , 
    required : [true , "The error you want to get displayed when it isn't true"]
  }
})
```

How to create a Model out of Schema

`const ModelData = mongoose.model("ModelData" , dataSchema)`

we will use this model to create something in database.

To create a data with this we have to go at a place where we want to use it in controller (in async function ) then

```js
//this is for creating a data
const newTour = await ModelData.create(req.body)

// this is for reading a data
const tour = await ModelData.find() //to get all the data
const tour = await ModelData.findById(req.params.id) // to get the data by id
// const tour = await ModelData.findOne({_id : abcd }) // this is same as above 

//this is for updating data
const tour = await ModelData.findByIdAndUpdate(req.params.id , req.body , {
  new: true, // this will return new data default is the old one
  runValidators : true
})

//this is to delete the data
const deletedtour = await ModelData.findByIdAndDelete(req.params.id )
// we dont really need to return thing when we delete something from the api

res.status(201).json({
  status: "success",
  data : {
    tour : newTour  // tour
  }
})

catch(err){
  res.status(400).json({
    status: "fail",
    message : err.message
  })
}

```