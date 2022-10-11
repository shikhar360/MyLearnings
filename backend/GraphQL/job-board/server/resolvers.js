const db = require("./db");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//* WARNING
//* Resolver must follow the pattern of schema
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Query = {
  //jobs: () => [], //It should ALWAYS BE A FUNCTION
  jobs: () => db.jobs.list(),

  //Job data that we will get by arguments

  // job : (root/*parent Object*/ , args)=>db.jobs.get(args.id)
  //OR
  job: (root, { id }) => db.jobs.get(id),

  //Getting the company details
  company: (root, { id }) => db.companies.get(id),
};

const Mutation = {
  // createJobs: (root, { companyId, title, description }) => {
  //   return db.jobs.create({ companyId, title, description });
  // },

  createJobs: (root, { input }) => {
    const id = db.jobs.create(input);
    return db.jobs.get(id);
  },
};

// because Job type in the schema contains a custom Company type (nesting happening ) and we have to resolve that as well so we have to define the company here
const Job = {
  // jobs have company id , in order to get their names we defined company with specific companyId
  company: (job) => db.companies.get(job.companyId), //be carefull with typos
};

// Now our Company is also nesting the Job type so we have to define jobs as well
const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

module.exports = { Query, Job, Company, Mutation };
//we have to send the Job here as well

//------------------------------------------------------------------------------------------------
/*
!NOTE
All resolver function recieves an argument and the first argument is the parent object

- Things that we query in the sandbox or GraphiQL

This will return the jobs with the relevant data
{
  jobs {
    id
    title
    description
  }
}
------------------------------------------------
This will give us the nested data
{
  jobs {
    id
    title
    company{
      id
      name
      description
    }
  }
}

---------------------------------------------------
Query to get single job obj by arguments

{
  job(id : "SJRAZDu_z" ){
    title
    description
  }
}

---------------------------------------------------
Mutation query 

NOT RECOMMENDED
mutation($companyId: ID, $title: String, $description: String){
  createJobs(companyId: $companyId, title: $title , description: $description)
}

-RECOMMENDED
mutation CreateJobsMutation($input : CreateJobsInput){
  // Creating a "job :" before "createJobs" change the name in the output json to "job" 
  // you can fine the "input" args name in the schema
  job : createJobs(input: $input){
    id
    title
    company {
      id
      name
    }
  }
}

variables like this
{
 "input" : {
  "companyId": "HJRa-DOuG",
  "title": "Mast naya Job Phirse",
  "description": "Paisa hi paisa hoga paisa hi paisa hoga",
 } 
}

*/
