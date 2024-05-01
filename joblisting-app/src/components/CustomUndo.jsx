import MyContext from "../Context";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
const CustomToast = ({ setJobCardVisibility }) => {
  const { toastNotification } = useContext(MyContext);
  const currentToast = toastNotification[0];
  const [undoVisibility, setUndoVisibility] = useState(
    currentToast ? currentToast.visibility : true
  );
  console.log("currentToast", currentToast);
  console.log("toastNotification", toastNotification);
  const toggleJobVisibility = () => {
    localStorage.setItem(
      `job-${currentToast.id}-visibility`,
      JSON.stringify(!currentToast.visibility)
    );
    setUndoVisibility(!currentToast.visible);
  };
  useEffect(() => {
    setJobCardVisibility(undoVisibility);
  }, [undoVisibility, setJobCardVisibility]);
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
CustomToast.propTypes = {
  setJobCardVisibility: PropTypes.func.isRequired,
};
export default CustomToast;
