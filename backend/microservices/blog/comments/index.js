const { randomBytes } = require("crypto");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content , status: "pending"});

  commentsByPostId[req.params.id] = comments; // updating comments after every push

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status : "pending"
    },
  }); //emiting event after comment creation

  
  res.status(201).send(comments);
});

//Recieving events
// getting notified tha data is sended succesfully
// also can be used if some data needed from the event bus
app.post("/events", async (req, res) => {
  console.log("Recieved Events ", req.body.type);
  const {type, data} = req.body
  if(type === "CommentModerated"){
    const {postId , id , status} = req.body
    const comments = commentsByPostId[postId]
    
    const comment = comments.find(comment =>  {
      return comment.id === id
    })
    comment.status = status;
    
    await axios.post('http://localhost:4005/events' , {
      type : "CommentUpdated",
      data : {
        id , status  , postId , content
      }
    })

  }
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
