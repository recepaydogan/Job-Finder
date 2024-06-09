import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Loading from "../../Helpers/Loading.jsx";
import useAuth from "../../authContexts/AuthContext.jsx";
import {
  PiCalendarCheckBold,
  PiCurrencyCircleDollarBold,
} from "react-icons/pi";
import { SlGraduation } from "react-icons/sl";
import useClickOutside from "../../Helpers/useClickOutside.jsx/";
import MyContext from "../../Context.jsx";
import { Transition } from "@headlessui/react";
import { toast } from "react-toastify";

function JobDetails({ job, setShowJobDetails }) {
  const { user } = useAuth();
  const { loading, setLoading } = useAuth();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const { handleTaskDelete } = useContext(MyContext);
  const jobDetailsRef = useRef();
  useClickOutside({ itemRef: jobDetailsRef, setItem: setShowJobDetails });

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowJobDetails(false);
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setShowJobDetails]);
  const deleteTheTask = async () => {
    if (!user) {
      toast.error("You need to be logged in to delete a task");
      return;
    }
    setLoading(true);
    await handleTaskDelete(job.id);
    setShowJobDetails(false);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="flex justify-center min-h-fit  items-center h-full w-2/3 mx-auto">
        <div
          ref={jobDetailsRef}
          className="dark:text-white bg-slate-950 relative border-[1px] border-white/40  flex flex-col   min-h-fit  min-w-full  rounded-md px-10 py-8  "
        >
          <span
            onClick={() => setShowJobDetails(false)}
            className="absolute flex justify-center items-center cursor-pointer top-2 right-3 hover:bg-white/10 rounded-full p-2"
          >
            <IoMdClose size={28} />
          </span>{" "}
          <div className="mt-2">
            <p className="font-semibold text-2xl text-wrap break-words">
              {job.jobTitle}
            </p>{" "}
            <div className="text-sm text-gray-400 ">{job.company}</div>
            <div className="text-sm text-gray-400 ">{job.location}</div>
            <div className="flex dark:text-black max-sm:flex-col max-sm:items-start  text-xs gap-2 items-center justify-start my-2">
              <div className=" min-w-24 max-sm:justify-start  text-start bg-slate-800 flex gap-1 items-center justify-center cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
                <PiCurrencyCircleDollarBold size={20} />
                {Number(job.salary).toLocaleString()}
              </div>
              <div className="text-nowrap max-sm:justify-start  min-w-24 bg-slate-800 flex gap-1 items-center justify-center cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
                <PiCalendarCheckBold size={20} />
                {job.type}
              </div>
              <div className="min-w-24 max-sm:justify-start  bg-slate-800 flex gap-1 items-center justify-center cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
                <SlGraduation size={20} />
                {job.experienceLevel}
              </div>
            </div>
          </div>
          <div className="mb-10 mt-5 my-2">
            <a
              target="_blank"
              rel="noopener norefeerer"
              href={job.applicationUrl}
              className="dark:bg-slate-700 dark:active:bg-gray-900 dark:text-white py-2 px-4 rounded-md text-black active:bg-gray-400 font-semibold bg-white hover:bg-white/90"
            >
              Aplly On Company Site
            </a>
          </div>
          <div className="max-w-fulf">
            <p className="text-4xl mb-3 text-wrap break-words">
              {" "}
              Work For {job.company}
            </p>
            <p className="text-wrap break-words">{job.longDescription}</p>
          </div>
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
          <div className="flex justify-end ">
            {user === null ? (
              <span
                onClick={() =>
                  toast.error("You need to be logged in to delete a task")
                }
                className="hover:bg-red-900 cursor-pointer active:scale-95 text-end w-max px-4 py-2 rounded-md mt-3 bg-red-600 "
              >
                Delete This Task
              </span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setConfirmationModal((prev) => !prev);
                }}
                className="hover:bg-red-900 active:scale-95 text-end w-max px-4 py-2 rounded-md mt-3 bg-red-600 "
              >
                Delete This Task
              </button>
            )}
          </div>
          <Transition
            show={confirmationModal}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="flex flex-col gap-3 items-center justify-center ">
              <p className="text-lg">
                Are you sure you want to delete this task?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => deleteTheTask()}
                  className="hover:bg-red-900  px-4 py-2 rounded-md active:scale-95  bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmationModal((prev) => !prev)}
                  className=" bg-slate-800 hover:bg-slate-900  active:scale-95 px-4 py-2 rounded-md"
                >
                  No
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
JobDetails.propTypes = {
  job: PropTypes.object.isRequired,
  setShowJobDetails: PropTypes.func.isRequired,
};
export default JobDetails;
