const express = require("express");
const bodyParser = require("body-parser");

const axios = require("axios");
const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;
  // here we are emmiting event to every microservice with the data that they have sended
  // :4000 && :4001 is just to notify the parent services that data is sended successfully
  axios
    .post("http://localhost:4000/events", event)
    .catch((err) => console.log(err));
  axios
    .post("http://localhost:4001/events", event)
    .catch((err) => console.log(err));
  //4002 is important cause its filtering the data
  axios
    .post("http://localhost:4002/events", event)
    .catch((err) => console.log(err));

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("listenig on 4005");
});
