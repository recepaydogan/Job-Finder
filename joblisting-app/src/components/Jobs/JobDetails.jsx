import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";

function JobDetails({ job, setShowJobDetails }) {
  const jobDetailsRef = useRef();

  useEffect(() => {
    const handleCloseJobDetails = (e) => {
      if (!jobDetailsRef.current?.contains(e.target)) setShowJobDetails(false);
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowJobDetails(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleCloseJobDetails);
    return () => {
      document.removeEventListener("mousedown", handleCloseJobDetails);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="flex justify-center  items-center h-full w-2/3 mx-auto">
      <div
        ref={jobDetailsRef}
        className="bg-slate-950 relative border-[1px] border-white/40  flex flex-col   min-h-fit w-2/4  rounded-md px-10 py-8  "
      >
        <span
          onClick={() => setShowJobDetails(false)}
          className="absolute flex justify-center items-center cursor-pointer top-2 right-3 hover:bg-white/10 rounded-full p-2"
        >
          <IoMdClose size={28} />
        </span>{" "}
        <div className="mt-2">
          <p className="font-semibold text-2xl">{job.jobTitle}</p>{" "}
          <div className="text-sm text-gray-400 dark:text-gray-800">
            {job.company}
          </div>
          <div className="text-sm text-gray-400 dark:text-gray-800">
            {job.location}
          </div>
          <div className="flex text-xs gap-2 items-center justify-start my-2">
            <div className="bg-slate-800 cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
              {Number(job.salary).toLocaleString()}
            </div>
            <div className="bg-slate-800 cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
              {job.type}
            </div>
            <div className="bg-slate-800 cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
              {job.experienceLevel}
            </div>
          </div>
        </div>
        <div className="mb-10 my-2">
          <a
            target="_blank"
            rel="noopener norefeerer"
            href={job.applicationUrl}
            className="dark:bg-slate-950 w-f dark:text-white py-2 px-4 rounded-md text-black font-semibold bg-white hover:bg-white/90"
          >
            Aplly On Company Site
          </a>
        </div>
        <div>
          <p className="text-4xl mb-3"> Work For {job.company}</p>
          <p>{job.longDescription}</p>
        </div>{" "}
        <div>
          <div>
            <h2 className="text-2xl my-5">Benefits</h2>
            <ul className="list-inside  flex flex-col gap-4 list-disc text-gray-400">
              <li>Great Payment</li>
              <li>Good Work Hours</li>
              <li>Flexible</li>
            </ul>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
JobDetails.propTypes = {
  job: PropTypes.object.isRequired,
};
export default JobDetails;
