import { useCallback } from "react";
import JobCards from "./Jobs/jobCards";
import JobListing from "./Jobs/jobListing";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import useAuth from "../authContexts/AuthContext";

function HomePage() {
  const { userLoggedIn } = useAuth();
  const displayWarning = useCallback(() => {
    toast.error("You need to login to add a job");
  }, []);
  return (
    <div className="container mx-auto pb-20 text-sm pt-5 ">
      <h1 className="text-3xl font-semibold flex justify-between items-center gap-8 mb-8">
        Jobs
        {userLoggedIn ? (
          <NavLink
            className="dark:text-white text-base border border-white/10 px-3 select-none py-2 rounded-md bg-slate-900 hover:bg-slate-800 transition-all"
            to="/add-job"
          >
            Add Job
          </NavLink>
        ) : (
          <span
            onClick={displayWarning}
            className="dark:text-white text-base border cursor-not-allowed select-none border-white/10 px-3 py-2 rounded-md bg-slate-900 hover:bg-slate-800 transition-all"
          >
            Add Job
          </span>
        )}
      </h1>
      <JobListing></JobListing>
      <JobCards></JobCards>
    </div>
  );
}

export default HomePage;
