/* eslint-disable react/prop-types */
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";

import MyContext from "../Context";

function JobCard({ job }) {
  const { FormData, likedJobs, setLikedJobs, setHiddenJobs, hiddenJobs } =
    useContext(MyContext);
  const [showHiddenJobs, setShowHiddenJobs] = useState(FormData.showHidden);
  const [isJobHidden, setIsJobHidden] = useState(
    hiddenJobs.some((hiddenJob) => hiddenJob.id === job.id) || false
  );
  useEffect(() => {
    if (FormData) {
      setShowHiddenJobs(FormData.showHiddenJobs);
    }
  }, [job.id, FormData]);

  const toggleVisibility = () => {
    const isItHidden = hiddenJobs.some((hiddenJob) => hiddenJob.id === job.id);

    if (!isItHidden) {
      setHiddenJobs([...hiddenJobs, job]);
    } else if (isItHidden) {
      const newHiddenJobs = hiddenJobs.filter(
        (hiddenJob) => hiddenJob.id !== job.id
      );
      setHiddenJobs(newHiddenJobs);
    }
    handleToastProcess();
  };
  const handleToastProcess = () => {
    const newVisibility = isJobHidden;

    if (!newVisibility) {
      toast(
        <div className="flex items-center justify-center py-3 px-2 gap-5 ">
          <div className="flex flex-col justify-center">
            <div className="font-semibold text-slate-950 dark:text-white ">
              Job is hidden
            </div>
            <div className="text-slate-700 text-sm dark:text-white ">
              {job.jobTitle} is no longer be shown
            </div>
          </div>
          <div className="">
            <button
              onClick={() => undoJobVisibility(job.id)}
              className="bg-white text-gray-900 text-nowrap h-10 px-3 py-1 rounded-md"
            >
              Undo
            </button>
          </div>
        </div>
      );
    }
  };
  const undoJobVisibility = (id) => {
    const getHiddenJobs = JSON.parse(localStorage.getItem("hiddenJobs"));
    const filteredHiddenJobs = getHiddenJobs.filter((job) => {
      return job.id !== id;
    });
    localStorage.setItem("hiddenJobs", JSON.stringify(filteredHiddenJobs));
    setHiddenJobs(filteredHiddenJobs);
  };
  const toggleLikedJobs = () => {
    const jobExists = likedJobs.some((likedJob) => likedJob.id === job.id);

    if (!jobExists) {
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
    const storedHiddenJobs = localStorage.getItem("hiddenJobs");
    if (storedHiddenJobs) {
      setHiddenJobs(JSON.parse(storedHiddenJobs));
    }
  }, [setHiddenJobs]);

  useEffect(() => {
    localStorage.setItem("likedJobs", JSON.stringify(likedJobs));
  }, [likedJobs]);
  useEffect(() => {
    localStorage.setItem("hiddenJobs", JSON.stringify(hiddenJobs));
  }, [hiddenJobs]);
  useEffect(() => {
    setIsJobHidden(hiddenJobs.some((hiddenJob) => hiddenJob.id === job.id));
  }, [hiddenJobs, job.id]);

  return (
    <>
      <div
        className={`${
          !isJobHidden || showHiddenJobs ? "flex" : "hidden text-gray-400"
        } ${
          isJobHidden ? "text-gray-400" : ""
        } select-none flex-col py-3 px-4  border-white/10 rounded-xl border-[1px] dark:border-slate-950`}
      >
        <div className="flex items-center  justify-between ">
          <div className="text-2xl text-nowrap">{job.jobTitle}</div>
          <div className="flex  justify-center items-center text-lg">
            <span
              className="cursor-pointer flex justify-center items-center  size-12 hover:bg-white/10 rounded-full dark:hover:bg-slate-950 dark:hover:text-white"
              onClick={toggleVisibility}
            >
              {!isJobHidden ? (
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
            {Number(job.salary).toLocaleString()}
          </div>
          <div className="bg-slate-800 cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
            {job.type}
          </div>
          <div className="bg-slate-800 cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
            {job.experienceLevel}
          </div>
        </div>
        <div className="py-8">{job.description}</div>
        <div>{isJobHidden ? "true" : "false"}</div>
      </div>
    </>
  );
}

export default JobCard;
