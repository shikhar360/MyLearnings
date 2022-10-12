const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const db = require("./db");
const port = 9000;
const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");
//-----------------------------------------------------------------------------------------------
const { ApolloServer, gql } = require("apollo-server-express");
const fs = require("fs");

const app = express();
app.use(
  cors(),
  bodyParser.json(),
  expressJwt({
    secret: jwtSecret,
    credentialsRequired: false,
  })
);

//-----------------------------------------------------------------------------------------------

// const typeDefs = gql`     // we used to do this
//   # todo
// `;

const typeDefs = gql(fs.readFileSync("./schema.graphql", { encoding: "utf8" }));

// const resolvers = {
//   //todo
// };

const resolvers = require("./resolvers");

// const apolloServer = new ApolloServer({ typeDefs, resolvers });
// apolloServer.applyMiddleware({ app, path: "/graphql" });  app is defined above , path is default
//- Error: You must `await server.start()` before calling `server.applyMiddleware()`

let apolloServer = null;

//req.user will be indefine if we are not authenticated
// const context = ({ req }) => ({ user: req.user });
const context = ({ req }) => ({ user: req.user && db.users.get(req.user.sub) }); //req.user.sub is the id

async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    // Here we can pass the context that we defined in our resolver
    context,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });
}
startServer();

//!NOTE
//The differences are that GraphiQL is more limited and runs at /graphiql, while the Playground has more features (like multiple tabs and setting HTTP headers) and is visible at the same path used to post GraphQL requests,  i.e. /graphql in the examples.

// Express Jwt search for the authentication , if a user is authenticated then it will spill out the
//-- "req.user"
// If the reqcontains a valid token "req.user " will contain the decoded info of the token
//-----------------------------------------------------------------------------------------------

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({ sub: user.id }, jwtSecret);
  res.send({ token });
});

app.listen(port, () => console.info(`Server started on port ${port}`));
