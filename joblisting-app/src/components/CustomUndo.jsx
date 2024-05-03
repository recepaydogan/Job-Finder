import MyContext from "../Context";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
const CustomToast = () => {
  const { toastNotification, setHiddenJobs } = useContext(MyContext);
  console.log(toastNotification);
  // toastNotification could be an array of objects fix that
  const currentToast = toastNotification[0];
  console.log(currentToast);
  const toggleJobVisibility = () => {
    const isJobHidden = JSON.parse(localStorage.getItem("hiddenJobs"));
    const filteredHiddenJobs = isJobHidden.filter((job) => {
      return job.id !== currentToast.id;
    });
    localStorage.setItem("hiddenJobs", JSON.stringify(filteredHiddenJobs));
    setHiddenJobs(filteredHiddenJobs);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex flex-col justify-center">
        <div className="font-semibold text-slate-950">
          Job is {`${currentToast?.visible ? "visible" : "hidden"}`}
        </div>
        <div className="text-slate-700">{currentToast?.message}</div>
      </div>
      <div className="">
        <button
          onClick={toggleJobVisibility}
          className="bg-slate-950 text-nowrap h-10 text-white px-3 py-1 rounded-md"
        >
          Undo
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
