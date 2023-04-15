const express = require("express");
const bodyParser = require("body-parser");

const axios = require("axios");
const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000", event);
  axios.post("http://localhost:4001", event);
  axios.post("http://localhost:4002", event);

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("listenig on 4005");
});
