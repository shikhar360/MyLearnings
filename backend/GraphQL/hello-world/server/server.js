//Here we will use GraphQL schema language

//we can parse this schema using gql by apollo server , we can use this to tag a template literals , after tagging the template literals will become a doccument node
const { ApolloServer, gql } = require("apollo-server");

//In a schema we always need this list query type that contain all the possible queries that can be made by our client while calling the server

//Default & Hidden

// schema {  // thats why we are able to use query not Query in the spollo studio
//   query : Query
// }
const typeDefs = gql`
  type Query {
    greeting: String
  }
`;

//Time to provide a implementation
// i.e exactly how the servers should return a gretting value , we do that by creating a obj called resolver

//This needs to follow the structure of the typedefinitions
// This function will be called by graphql engine everytime the clients sends a greeting query(to resolve the greeting feild)
const resolvers = {
  Query: {
    //Query is same as typeDefs from above
    greeting: () => "Hello GraphQL world", //greeting is same as typeDefs from above
  },
};

// Now its time to create our server
const server = new ApolloServer({ typeDefs, resolvers }); //here key name is equal to valuename thatswhy

server
  .listen({ port: 9000 }) //explicitly saing to listen 9000
  .then(
    (
      data //can do destructure here as well
    ) /*{url} */ => console.log("Server is running at " + data.url /*url*/)
  );
