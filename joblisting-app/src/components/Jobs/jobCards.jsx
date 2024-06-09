import { useContext } from "react";

import JobCard from "./jobCard";
import MyContext from "../../Context";

function JobCards() {
  const { filteredJobs } = useContext(MyContext);

  return (
    <>
      <div className="flex flex-col sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(370px,1fr))] mt-12 ">
        {filteredJobs.map((job, key) => (
          <JobCard job={job} key={key} />
        ))}
      </div>
    </>
  );
}

export default JobCards;
