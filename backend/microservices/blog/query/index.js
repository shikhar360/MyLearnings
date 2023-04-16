const express = require("express");
const bodyParser = require('body-parser')
const cors =  require("cors")

const app = express();
app.use(bodyParser.json())
app.use(cors())

const posts = {}

// this will run when the event bus sended the post req with the data that they have got from the parent services
app.post('/events', (req , res)=>{
 
  const {type, data} = req.body
  // here the actual data decoration/filteration is happening
  if (type === "PostCreated"){
    const {id , title} = data
    posts[id] = {id , title , comments :[]}; 
  }  

  if(type === "CommentCreated"){
   const {id , content , postId}= data

   const post = posts[postId]
   post.comments.push({id , content})
   
  }

  console.log(posts);

  res.send({}) // to close the req cycle

})

//and whenever someone is quering :4002/posts then simply sending the posts data
app.get('/posts' , (req, res)=>{
 res.send(posts)
})

app.listen(4002 , ()=>{
  console.log("Listening on 4002");
})