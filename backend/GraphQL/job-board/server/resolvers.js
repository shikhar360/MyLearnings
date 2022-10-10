const db = require("./db");

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

module.exports = { Query, Job, Company };
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
*/
