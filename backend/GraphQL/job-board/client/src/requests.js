const endpointUrl = "http://localhost:9000/graphql";
import { isLoggedIn, getAccessToken } from "./auth";

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

export async function createJobs(input) {
  const mutation = `
  mutation CreateJobsMutation($input : CreateJobsInput){
    job : createJobs(input: $input){
      id
      title
      company {
        id
        name
      }
    }
  }
  `;

  const { job } = await graphqlrequests(mutation, { input });
  return job;
}

export async function loadCompany(id) {
  const query = `
  query QueryCompany($id: ID!){
    company(id: $id) {
      id
      name
      description
      jobs{
        id 
        title
      }
    }
  }`;

  const { company } = await graphqlrequests(query, { id });
  return company;
}

export async function loadJobs() {
  const query = `
  {
    jobs {
      id
      title
      company{
        id
        name
      }
    }
  }
  `;
  const { jobs } = await graphqlrequests(query);
  return jobs;
}

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

//-------------------------------------------------------------------------------------
/* REFACTORED


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
*/
