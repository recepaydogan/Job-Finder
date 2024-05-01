/* eslint-disable react/prop-types */
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";

import MyContext from "../Context";
import CustomToast from "./CustomUndo";

function JobCard({ job }) {
  const storedJobVisibility = localStorage.getItem(`job-${job.id}-visibility`);
  const { FormData, handleToastNotification, likedJobs, setLikedJobs } =
    useContext(MyContext);
  const [showHiddenJobs, setShowHiddenJobs] = useState(FormData.showHidden);
  const [jobVisibility, setJobVisibility] = useState(
    storedJobVisibility === null ? true : JSON.parse(storedJobVisibility)
  );

  useEffect(() => {
    localStorage.setItem(
      `job-${job.id}-visibility`,
      JSON.stringify(jobVisibility)
    );
    if (FormData) {
      setShowHiddenJobs(FormData.showHiddenJobs);
    }
  }, [jobVisibility, job.id, FormData]);

  const toggleVisibility = () => {
    const newVisibility = !jobVisibility;
    setJobVisibility(newVisibility);
    handleToastNotification(
      `${job.jobTitle} is no longer be shown`,
      newVisibility,
      job.id
    );

    if (!newVisibility) {
      toast(<CustomToast setJobCardVisibility={setJobCardVisibility} />);
    } else {
      toast.dismiss();
    }
  };
  const setJobCardVisibility = (visibility) => {
    setJobVisibility(visibility);
  };
  const toggleLikedJobs = () => {
    const jobExists = likedJobs.some((likedJob) => likedJob.id === job.id);

    if (!jobExists) {
      // If the job is liked and does not exist in likedJobs, add it

      setLikedJobs([...likedJobs, job]);
    } else if (jobExists) {
      const newLikedJobs = likedJobs.filter(
        (likedJob) => likedJob.id !== job.id
      );
      setLikedJobs(newLikedJobs);
    }
  };
  useEffect(() => {
    const storedLikedJobs = localStorage.getItem("likedJobs");
    if (storedLikedJobs) {
      setLikedJobs(JSON.parse(storedLikedJobs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedJobs", JSON.stringify(likedJobs));
  }, [likedJobs]);
  return (
    <>
      <div
        className={`${
          jobVisibility || showHiddenJobs ? "flex" : "hidden text-gray-400"
        } ${
          !jobVisibility ? "text-gray-400" : ""
        } select-none flex-col py-3 px-4  border-white/10 rounded-xl border-[1px] dark:border-slate-950`}
      >
        <div className="flex items-center  justify-between ">
          <div className="text-2xl text-nowrap">{job.jobTitle}</div>
          <div className="flex  justify-center items-center text-lg">
            <span
              className="cursor-pointer flex justify-center items-center  size-12 hover:bg-white/10 rounded-full dark:hover:bg-slate-950 dark:hover:text-white"
              onClick={toggleVisibility}
            >
              {jobVisibility ? (
                <FaRegEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </span>
            <span
              onClick={toggleLikedJobs}
              className="cursor-pointer flex justify-center items-center  size-12 hover:bg-white/10 rounded-full dark:hover:bg-slate-950 dark:hover:text-white"
            >
              {likedJobs.some((likedJob) => likedJob.id === job.id) ? (
                <FcLike size={20} />
              ) : (
                <CiHeart size={20} />
              )}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-400">{job.company}</div>
        <div className="text-sm text-gray-400 dark:text-gray-800">
          {job.location}
        </div>
        <div className="flex text-xs gap-2 items-center justify-start my-2">
          <div className="bg-slate-800 cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
            {job.salary}
          </div>
          <div className="bg-slate-800 cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
            {job.type}
          </div>
          <div className="bg-slate-800 cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
            {job.experienceLevel}
          </div>
        </div>
        <div className="py-8">{job.description}</div>
      </div>
    </>
  );
}

export default JobCard;
