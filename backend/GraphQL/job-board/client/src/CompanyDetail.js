import React, { useState, useEffect } from "react";
// import { companies } from "./fake-data";
import { loadCompany } from "./requests";
import { JobList } from "./JobList";

export default function CompanyDetail(props) {
  const [company, setCompany] = useState();

  useEffect(() => {
    async function load() {
      const { companyId } = props.match.params;
      // console.log(jobId);
      const data = await loadCompany(companyId);
      // console.log(data);
      setCompany(data);
    }
    load();
  }, []);
  return (
    <>
      {company && (
        <div>
          <h1 className="title">{company.name}</h1>
          <div className="box">{company.description}</div>
          <h5 className="title is-5">{company.name}</h5>
          <JobList jobs={company.jobs} />
        </div>
      )}
    </>
  );
}

// export class CompanyDetail extends Component {
//   constructor(props) {
//     super(props);
//     const {companyId} = this.props.match.params;
//     this.state = {company: companies.find((company) => company.id === companyId)};
//   }

//   render() {
//     const {company} = this.state;
//     return (
//       <div>
//         <h1 className="title">{company.name}</h1>
//         <div className="box">{company.description}</div>
//       </div>
//     );
//   }
// }
