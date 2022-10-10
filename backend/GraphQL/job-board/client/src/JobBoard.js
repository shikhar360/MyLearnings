import React, { useEffect, useState } from "react";
import { JobList } from "./JobList";
// const { jobs } = require("./fake-data");
import { loadJobs } from "./requests";

// export class JobBoard extends Component {
//   render() {
//     return (
//       <div>
//         <h1 className="title">Job Board</h1>
//         <JobList jobs={jobs} />
//       </div>
//     );
//   }
// }

export default function JobBoard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await loadJobs();
      console.log(data);
      setJobs(data);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}
