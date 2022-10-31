## GraphQL

GraphQL is a query language . With the help of GraphQL you can get the exact data that you want from the API that you are requesting from.

This will help to get the under serverd data that we want . The problem with the REST API was that we were getting a lot of unwanted data from the API (overfetching) .

With the help of the GraphQL we can also get more than one data in a single request . This helpsin optimization of the app on slower mobiles as well.

It uses types in order to get a clear consize info of data that is requested with a benefit of getting low errors.

## Hello World App
There are 2 main paradigms : Frontend or `client`   && Backend or `server` 

Here in frontend for the sake of simplicity we will use simple boilerplate of `index.html` and `app.js` file and for the backend we will use apollo server and graphql

Make 2 folders for the client and server for the same 

In server folder create a `package.json` file and paste this content and run `npm install` in your terminal

```json
{
  "name": "hello-world",
  "dependencies": {
    "apollo-server": "^3.10.3",
    "graphql": "^16.6.0"
  }
}

```

Here we will use GraphQL schema language along with Apollo Client

**What is Apollo Client**

Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI

we can parse GraphQL schema using `gql` by apollo server , we can use this to tag a template literals , after tagging the template literals will become a doccument node

Create a `server.js` file and import these :
```js
const { ApolloServer, gql } = require("apollo-server");
```

In a schema we always need this list ` query type` that contain all the possible queries that can be made by our client while calling the server

```js
const typeDefs = gql`
  type Query {
    greeting: String
  }
`;
```

Time to provide a implementation
i.e exactly how the servers should return a gretting value , we do that by creating a obj called `resolver`

**This needs to follow the structure of the typedefinitions**

This function will be called by graphql engine everytime the clients sends a greeting query(to resolve the greeting feild)

```js
const resolvers = {
  Query: {
    //Query is same as typeDefs from above
    greeting: () => "Hello GraphQL world", //greeting is same as typeDefs from above
  },
};
```
Now its time to create our server

```js
const server = new ApolloServer({ typeDefs, resolvers }); //here key name is equal to valuename thatswhy

server
  .listen({ port: 9000 }) //explicitly saing to listen 9000
  .then(
    (
      data //can do destructure here as well
    ) /*{url} */ => console.log("Server is running at " + data.url /*url*/)
  );
```





**FRONTEND || `Client`**

Now its time to move in the frontend or ``client`` side


Paste the following content into your `app.js` file and read the comments carefully.
```js
const GRAPHQL_URL = "http://localhost:9000/";

async function fetchGreetings() {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST", // here are the variouss method of the rest APIs that we can use 
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ // the query that we will run to get our data
      query: `
      query{
        greeting
      }`,
    }),
  });

  // const data = await response.json();  // this is returning a obj with data key

  const { data } = await response.json();
  return data;
}

fetchGreetings().then((/*data*/ { greeting }) => {
  //destructuring : data.greeting
  const title = document.querySelector("h1");  //selecting the element from the frontend
  title.textContent = greeting;
});
```

#### Notes
- Resolver must follow the pattern of schema
- To access the Apollo Playground search `yourlocalhost:3000/graphql`
  