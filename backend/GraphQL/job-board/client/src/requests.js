const endpointUrl = "http://localhost:9000/graphql";
import { isLoggedIn, getAccessToken } from "./auth";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
} from "apollo-boost";
import gql from "graphql-tag";

//-------------------------------------------------------------------------------
//-Using Apollo Client

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    //request.headers["authorization"] = "Bearer" + getAccessToken();
    operation.setContext({
      headers: { authorization: "Bearer" + getAccessToken() },
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpointUrl })]),
  cache: new InMemoryCache(),
});

//-------------------------------------------------------------------------------
/*
async function graphqlrequests(query, variables = {}) {
  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  if (isLoggedIn()) {
    request.headers["authorization"] = "Bearer" + getAccessToken();
  }
  const response = await fetch(endpointUrl, request);
  const resData = await response.json();
  // in order to get better errors
  if (resData.errors) {
    const errdata = resData.errors.map((err) => err.message).join("/n");
    throw new Error(errdata);
  }
  return resData.data;
}
*/

const jobQuery = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      id
      title
      description
      company {
        id
        name
      }
    }
  }
`;

export async function createJobs(input) {
  const mutation = gql`
    mutation CreateJobsMutation($input: CreateJobsInput) {
      job: createJobs(input: $input) {
        id
        title
        description
        company {
          id
          name
        }
      }
    }
  `;

  // const { job } = await graphqlrequests(mutation, { input });
  const {
    data: { job },
  } = await client.mutate({
    mutation,
    variables: { input },
    update: (cache, /*mutatiionResult*/ { data }) => {
      //Updating the cache
      cache.writeQuery({
        query: jobQuery,
        variables: { id: data.job.id },
        data,
      });
    },
  });
  return job;
}

export async function loadCompany(id) {
  const query = gql`
    query QueryCompany($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
        }
      }
    }
  `;

  // const { company } = await graphqlrequests(query, { id });
  const {
    data: { company },
  } = await client.query({ query, variables: { id } });
  return company;
}

export async function loadJobs() {
  const query = gql`
    {
      jobs {
        id
        title
        company {
          id
          name
        }
      }
    }
  `;
  // const { jobs } = await graphqlrequests(query);

  const {
    data: { jobs },
  } = await client.query({ query, fetchPolicy: "no-cache" }); //To stop the sending req 2 times
  return jobs;
}

export async function loadJob(id) {
  // const query = gql`
  //   query JobQuery($id: ID!) {
  //     job(id: $id) {
  //       id
  //       title
  //       description
  //       company {
  //         id
  //         name
  //       }
  //     }
  //   }
  // `;

  // const { job } = await graphqlrequests(query, { id });
  const {
    data: { job },
  } = await client.query({ query: jobQuery, variables: { id } });
  return job;
}

//-------------------------------------------------------------------------------------
/* REFACTORED

export async function loadJob(id) {
  const query = `
  query JobQuery($id : ID!){
    job(id : $id) {
      id
      title
      description
      company{
        id
        name
      }
    }
  }
  `;

  const { job } = await graphqlrequests(query, { id });
  return job;
}

// loading single job
export async function loadJob(id) {
  const response = await fetch(endpointUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      // "query JobQuery" a way of providing name to query , Good for debugging
      // "($id: ID!)" all arguments should start with $ sign followed by the type
      query: `
      query JobQuery($id : ID!){
        job(id : $id) {
          id
          title
          description
          company{
            id
            name
          }
        }
      }
      `,
      variables: { id },
    }),
  });
  const resData = await response.json();
  return resData.data.job;
}

// How to make FRAGMENTS
When 2 of the queries are matching we can use one fragment instead 

---------------------------------------------------
Initializing

const jobDetailFragment = gql`

fragment JobDetail on Job {
  id
  title
  description
  company {
    id
    name
  }

}

`

const jobQuery = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
     ...JobDetail
    }
  }
  ${jobDetailFragment}
`;


export async function createJobs(input) {
  const mutation = gql`
    mutation CreateJobsMutation($input: CreateJobsInput) {
      job: createJobs(input: $input) {
       ...JobDetail   // Fragment Name
      }
    }
    ${jobDetailFragment}    // imp todo
  `;
---------------------------------------------------

*/
