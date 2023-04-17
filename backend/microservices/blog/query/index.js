const express = require("express");
const bodyParser = require('body-parser')
const cors =  require("cors")
const axios = require("axios");
const app = express();
app.use(bodyParser.json())
app.use(cors())

const posts = {}

const handleEvent = (type , data)=>{
  if (type === "PostCreated"){
    const {id , title} = data
    posts[id] = {id , title , comments :[]}; 
  }  

  if(type === "CommentCreated"){
   const {id , content , postId , status}= data

   const post = posts[postId]
   post.comments.push({id , content , status})
   
  }
  
  if(type === "CommentUpdated"){
    const {id , content , postId , status } = data;
    const comment  = posts[postId].comments.find(comment =>{
      return comment.id === id 
    })
    comment.status= status; 
    comment.content = content;
  }
}


// this will run when the event bus sended the post req with the data that they have got from the parent services
app.post('/events', (req , res)=>{
 
  const {type, data} = req.body
  // here the actual data decoration/filteration is happening
  


  handleEvent(type , data)

  res.send({}) // to close the req cycle

})

//and whenever someone is quering :4002/posts then simply sending the posts data
app.get('/posts' , (req, res)=>{
 res.send(posts)
})

app.listen(4002 , async ()=>{
  console.log("Listening on 4002");
  const res = await axios.get('http://localhost:4005/events')

   for (let event of res.data){
     handleEvent(event.type , event.data)
   }
})