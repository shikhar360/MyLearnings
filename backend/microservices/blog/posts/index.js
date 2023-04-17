const { randomBytes } = require("crypto");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(cors()); // this is used just so that we can send req to other localhost

const posts = {}; //initial state(kind off)

// what user will get when they do fetch on server :4000
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  // after a certain action happens (like post created) ,this will emit a event so that
  //it will be independent
  await axios
    .post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => console.log(err)); //sended the event on localhost 4005

  res.status(201).send(posts[id]); //have to send something to complete the req&res cycle
});

//Recieving events
app.post("/events", (req, res) => {
  console.log("Recieved Events ", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("listening on 4000");
});

/*




*/