import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { RiArrowUpSLine } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { PiSuitcaseSimpleDuotone } from "react-icons/pi";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import { HiMiniArrowSmallDown } from "react-icons/hi2";
import { HiMiniArrowSmallUp } from "react-icons/hi2";
import { FaRegSquare } from "react-icons/fa6";
import { FaRegSquareCheck } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";
import DropdownCategoryMenu from "../Helpers/DropdownCategoryMenu";
import DropdownPriorityMenu from "../Helpers/DropdownPriorityMenu";
import DropdownStatusMenu from "../Helpers/DropdownStatusMenu";
import { RiExpandUpDownFill } from "react-icons/ri";

function TaskBoard() {
  const [taskDetails, setTaskDetails] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [resetSorting, setResetSorting] = useState(false);
  const [openRow, setOpenRow] = useState(null);
  const [openStatusMenu, setOpenStatusMenu] = useState(false);
  const [openPriorityMenu, setOpenPriorityMenu] = useState(false);
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
  const [selectedRow, setselectedRow] = useState();
  const dropDownMenuRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3003/tasks");
      setTaskDetails(response.data);
    };
    fetchData();
  }, [resetSorting]);
  const handleSortFieldChange = (field) => {
    const isDataSortedBefore = !isSorted;
    setIsSorted(isDataSortedBefore);
    if (isDataSortedBefore) {
      const sortedData = [...taskDetails].sort((a, b) =>
        b[field].localeCompare(a[field])
      );
      setTaskDetails(sortedData);
    } else {
      const sortedData = [...taskDetails].sort((a, b) =>
        a[field].localeCompare(b[field])
      );
      setTaskDetails(sortedData);
    }
  };
  const handleStatusSorting = (field) => {
    const isDataSorted = !isSorted;
    setIsSorted(isDataSorted);

    const priorityValues = {
      High: 3,
      Medium: 2,
      Low: 1,
    };
    if (isDataSorted) {
      const sortedData = [...taskDetails].sort(
        (a, b) => priorityValues[a[field]] - priorityValues[b[field]]
      );
      setTaskDetails(sortedData);
    } else {
      const sortedData = [...taskDetails].sort(
        (a, b) => priorityValues[b[field]] - priorityValues[a[field]]
      );
      setTaskDetails(sortedData);
    }
  };
  const resetTable = () => {
    setResetSorting((prev) => !prev);
    console.log("clicked");
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropDownMenuRef.current?.contains(e.target)) {
        setOpenRow(null);
        setOpenStatusMenu(false);
        setOpenPriorityMenu(false);
        setOpenCategoryMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleStatusChange = (status) => {
    axios.put(`http://localhost:3003/tasks/${selectedRow.id}`, {
      ...selectedRow,
      status: status,
    });
    setTaskDetails(
      taskDetails.map((task, index) => {
        if (index === openRow) {
          return { ...task, status: status };
        }
        return task;
      })
    );
    setOpenRow(null);
  };
  const handlePriorityChange = (priority) => {
    axios.put(`http://localhost:3003/tasks/${selectedRow.id}`, {
      ...selectedRow,
      priority: priority,
    });
    setTaskDetails(
      taskDetails.map((task, index) => {
        if (index === openRow) {
          return { ...task, priority: priority };
        }
        return task;
      })
    );
    setOpenRow(null);
  };
  const handleCategoryChange = (category) => {
    axios.put(`http://localhost:3003/tasks/${selectedRow.id}`, {
      ...selectedRow,
      category: category,
    });
    setTaskDetails(
      taskDetails.map((task, index) => {
        if (index === openRow) {
          return { ...task, category: category };
        }
        return task;
      })
    );
    setOpenRow(null);
  };
  const handleSelectingRow = (index) => {
    setOpenRow(openRow === index ? null : index);
    setselectedRow(taskDetails[index]);
  };
  const handleOpenMenu = (menuName) => {
    setOpenStatusMenu(menuName === "status" && !openStatusMenu);
    setOpenPriorityMenu(menuName === "priority" && !openPriorityMenu);
    setOpenCategoryMenu(menuName === "category" && !openCategoryMenu);
  };
  const handleDeleteTask = (id) => {
    // axios.delete(`http://localhost:3003/tasks/${id}`);
    setTaskDetails(taskDetails.filter((task) => task.id !== id));
  };
  return (
    <>
      {openRow !== null && (
        <div className="fixed top-0 left-0 w-full h-full z-10" />
      )}
      <div className="flex flex-col container w-full  items-center gap-10 justify-center">
        <button
          onClick={resetTable}
          className="bg-white text-slate-950 cursor-pointer disabled:cursor-not-allowed px-3 py-2 rounded-md mt-6 hover:bg-slate-800 hover:text-white active:scale-95"
        >
          Reset the Sorted Table
        </button>
        <table className="table-auto w-full   border border-gray-800">
          <thead>
            <tr>
              <th onClick={() => handleSortFieldChange("title")}>
                <div className="flex items-center justify-start gap-3 px-4 py-2 cursor-pointer select-none text-slate-500 hover:text-slate-200 hover:bg-slate-900 w-fit">
                  <span>Title </span> <RiExpandUpDownFill />
                </div>
              </th>
              <th onClick={() => handleSortFieldChange("status")}>
                <div className="flex justify-start items-center gap-3 px-4 py-2 cursor-pointer select-none text-slate-500 hover:text-slate-200 hover:bg-slate-900 w-fit">
                  <span>Status</span> <RiExpandUpDownFill />
                </div>
              </th>
              <th onClick={() => handleStatusSorting("priority")}>
                <div className="flex justify-start items-center gap-3 px-4 py-2 cursor-pointer select-none text-slate-500 hover:text-slate-200 hover:bg-slate-900 w-fit">
                  <span>Priority</span>
                  <RiExpandUpDownFill />
                </div>
              </th>
              <th
                onClick={() => {
                  handleSortFieldChange("category");
                  console.log("clicked");
                }}
              >
                <div className="flex justify-start items-center gap-3 px-4 py-4 cursor-pointer select-none text-slate-500 hover:text-slate-200 hover:bg-slate-900 w-fit">
                  <span>Category</span> <RiExpandUpDownFill />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="relative">
            {taskDetails.map((task, index) => (
              <tr className="border" key={index}>
                <td>
                  <div className="flex items-center justify-start py-5 pl-3 gap-3 text-nowrap">
                    {task.title}
                  </div>
                </td>
                <td>
                  <div className="flex items-center  justify-start py-5 pl-3 gap-3">
                    {task.status === "In Progress" ? (
                      <MdOutlineTimer />
                    ) : task.status === "Done" ? (
                      <FaRegSquareCheck />
                    ) : (
                      <FaRegSquare />
                    )}
                    <p>{task.status}</p>
                  </div>
                </td>
                <td>
                  <div className="flex items-center  justify-start py-5 pl-3 gap-3">
                    {task.priority === "High" ? (
                      <HiMiniArrowSmallUp size={20} />
                    ) : task.priority === "Medium" ? (
                      <HiMiniArrowSmallLeft size={20} />
                    ) : (
                      <HiMiniArrowSmallDown size={20} />
                    )}
                    {task.priority}
                  </div>
                </td>
                <td>
                  <div className="flex items-center pl-3  py-5 justify-start gap-3">
                    {task.category === "Personal" ? (
                      <IoPersonSharp />
                    ) : (
                      <PiSuitcaseSimpleDuotone />
                    )}
                    <p>{task.category}</p>
                  </div>
                </td>
                <td className="relative">
                  <div className="flex  justify-start items-center text-xl pr-3">
                    <button
                      onClick={() => {
                        handleSelectingRow(index);
                      }}
                    >
                      ...
                    </button>
                  </div>
                  {openRow === index && (
                    <div
                      ref={dropDownMenuRef}
                      className="absolute select-none w-36 z-50 -left-40 top-10 text-slate-200 bg-slate-950 border border-white/50  rounded-lg"
                    >
                      <ul className="flex justify-around w-full py-2 gap-2 flex-col  ">
                        <li
                          onClick={() => {
                            handleOpenMenu("status");
                          }}
                          className="px-2 text-nowrap hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                        >
                          Status <HiMiniArrowSmallRight />
                          {openStatusMenu && (
                            <DropdownStatusMenu
                              handleStatusChange={handleStatusChange}
                              selectedRow={selectedRow}
                            />
                          )}
                        </li>
                        <li
                          onClick={() => {
                            handleOpenMenu("priority");
                          }}
                          className=" px-2 text-nowrap hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                        >
                          Priority <HiMiniArrowSmallRight />
                          {openPriorityMenu && (
                            <DropdownPriorityMenu
                              selectedRow={selectedRow}
                              handlePriorityChange={handlePriorityChange}
                            />
                          )}
                        </li>
                        <li
                          onClick={() => {
                            handleOpenMenu("category");
                          }}
                          className="border-b px-2 text-nowrap hover:bg-slate-800 cursor-pointer flex items-center justify-between "
                        >
                          Category <HiMiniArrowSmallRight />
                          {openCategoryMenu && (
                            <DropdownCategoryMenu
                              selectedRow={selectedRow}
                              handleCategoryChange={handleCategoryChange}
                            />
                          )}
                        </li>
                        <li className=" px-2  text-nowrap  hover:bg-slate-800 cursor-pointer  ">
                          Edit
                        </li>
                        <li
                          onClick={() => {
                            handleDeleteTask(task.id);
                          }}
                          className=" px-2 text-nowrap  hover:bg-slate-800 cursor-pointer "
                        >
                          Delete
                        </li>{" "}
                      </ul>
                    </div>
                  )}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div></div>
      </div>
    </>
  );
}

export default TaskBoard;
