import { useContext } from "react";

import JobCard from "./jobCard";
import MyContext from "../../Context";
import JobCardSkeleton from "./JobCardSkeleton";
function JobCards() {
  const { filteredJobs, isJobLoading } = useContext(MyContext);
  return (
    <>
      <div className="flex flex-col sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(370px,1fr))] mt-12 ">
        {isJobLoading && <JobCardSkeleton skeletonCount={4} />}
        {filteredJobs.map((job, key) => (
          <JobCard job={job} key={key} />
        ))}
      </div>
    </>
  );
}

export default JobCards;
