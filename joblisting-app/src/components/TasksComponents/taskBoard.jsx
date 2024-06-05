import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoPersonSharp } from "react-icons/io5";
import { PiSuitcaseSimpleDuotone } from "react-icons/pi";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import { HiMiniArrowSmallDown } from "react-icons/hi2";
import { HiMiniArrowSmallUp } from "react-icons/hi2";
import { FaRegSquare } from "react-icons/fa6";
import { FaRegSquareCheck } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";
import { RiExpandUpDownFill } from "react-icons/ri";
import AddTask from "./AddTask";
import { LuPlus } from "react-icons/lu";
import useAuth from "../../authContexts/AuthContext";
import { toast } from "react-toastify";
import { Transition } from "@headlessui/react";
import DropdownTaskMenu from "../../Helpers/DropdownTaskMenu";
import { useContext } from "react";
import TasksContext from ".//..//..//TaskContext";
function TaskBoard() {
  const [isFieldSorted, setIsFieldSorted] = useState(false);
  const [openRow, setOpenRow] = useState(null);
  const [openStatusMenu, setOpenStatusMenu] = useState(false);
  const [openPriorityMenu, setOpenPriorityMenu] = useState(false);
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
  const [selectedRow, setselectedRow] = useState();
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const dropDownMenuRef = useRef();
  const { userLoggedIn } = useAuth();
  const { taskDetails, setTaskDetails, setResetTaskTable, resetTaskTable } =
    useContext(TasksContext);

  const handleSortFieldChange = (field) => {
    const isDataSortedBefore = !isFieldSorted;
    setIsFieldSorted(isDataSortedBefore);
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
    const isDataSorted = !isFieldSorted;
    setIsFieldSorted(isDataSorted);

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
    setResetTaskTable((prev) => !prev);
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
  const handleSelectingRow = (index) => {
    setOpenRow(openRow === index ? null : index);
    setselectedRow(taskDetails[index]);
  };
  const handleOpenMenu = (menuName) => {
    setOpenStatusMenu(menuName === "status" && !openStatusMenu);
    setOpenPriorityMenu(menuName === "priority" && !openPriorityMenu);
    setOpenCategoryMenu(menuName === "category" && !openCategoryMenu);
  };
  const handleDeleteTask = async (id) => {
    setTaskDetails(taskDetails.filter((task) => task.id !== id));
    setOpenRow(null);
    await axios.delete(`https://project-data-fnc5.onrender.com/tasks/${id}`);
  };
  const handleTaskCreating = async (task) => {
    await axios.post("https://project-data-fnc5.onrender.com/tasks", task);
    setTaskDetails([...taskDetails, task]);
    setOpenTaskForm(false);
    setResetTaskTable(!resetTaskTable);
  };
  const handleTaskChange = async (key, value) => {
    setTaskDetails(
      taskDetails.map((task, index) => {
        if (index === openRow) {
          return { ...task, [key]: value };
        }
        return task;
      })
    );
    setOpenRow(null);
    await axios.put(
      `https://project-data-fnc5.onrender.com/tasks/${selectedRow.id}`,
      {
        ...selectedRow,
        [key]: value,
      }
    );
  };
  return (
    <>
      {openRow !== null && (
        <div className="fixed top-0 left-0 w-full h-full  z-10" />
      )}
      <Transition
        show={openTaskForm}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="fixed top-0 left-0 backdrop-blur w-full h-full z-10 flex items-center justify-center">
          <AddTask
            setOpenTaskForm={setOpenTaskForm}
            onsubmit={handleTaskCreating}
          />
        </div>
      </Transition>

      <main className="w-full pb-32 bg-slate-950 relative items-center gap-10 justify-center dark:bg-white">
        <section className=" w-2/3 mx-auto max-md:w-11/12">
          <div className="flex text-sm items-center justify-around pb-4 select-none">
            <button
              onClick={resetTable}
              className="bg-slate-900 transition-all cursor-pointer  px-3 py-2 rounded-md mt-6 hover:bg-slate-800 hover:text-white active:scale-95 dark:bg-gray-200 dark:hover:text-white dark:hover:bg-slate-950"
            >
              Reset the Sorted Table
            </button>
            {userLoggedIn ? (
              <button
                onClick={() => setOpenTaskForm(true)}
                className="flex gap-2 transition-all items-center justify-center bg-slate-900 cursor-pointer  px-3 py-2 rounded-md mt-6 hover:bg-slate-800 hover:text-white active:scale-95  dark:bg-gray-200 dark:hover:text-white dark:hover:bg-slate-950"
              >
                <LuPlus />
                Add Task
              </button>
            ) : (
              <span
                onClick={() => {
                  toast.error("You need to login to add a task");
                }}
                className="flex gap-2 transition-all items-center justify-center bg-slate-900 cursor-pointer  px-3 py-2 rounded-md mt-6 hover:bg-slate-800 hover:text-white active:scale-95  dark:bg-gray-200 dark:hover:text-white dark:hover:bg-slate-950"
              >
                <LuPlus />
                Add Task
              </span>
            )}
          </div>
          {taskDetails?.length === 0 ? (
            <p className="flex justify-center items-center">
              No tasks available. Please add tasks by clicking on the Add Task
            </p>
          ) : (
            <div className="w-full border-gray-800 rounded-3xl">
              <table className="w-full caption-bottom table-fixed border ">
                <thead>
                  <tr>
                    <th onClick={() => handleSortFieldChange("title")}>
                      <div className="transition-all flex items-center justify-start gap-3 px-4 py-3 cursor-pointer select-none text-slate-500 hover:text-slate-200 hover:bg-slate-900 w-fit">
                        <span>Title </span> <RiExpandUpDownFill />
                      </div>
                    </th>
                    <th onClick={() => handleSortFieldChange("status")}>
                      <div className="transition-all flex justify-start items-center gap-3 px-4 py-3 cursor-pointer select-none text-slate-500 hover:text-slate-200 hover:bg-slate-900 w-fit">
                        <span>Status</span> <RiExpandUpDownFill />
                      </div>
                    </th>
                    <th onClick={() => handleStatusSorting("priority")}>
                      <div className="transition-all flex justify-start items-center gap-3 px-4 py-3 cursor-pointer select-none text-slate-500 hover:text-slate-200 hover:bg-slate-900 w-fit">
                        <span>Priority</span>
                        <RiExpandUpDownFill />
                      </div>
                    </th>
                    <th
                      onClick={() => {
                        handleSortFieldChange("category");
                      }}
                    >
                      <div className="transition-all flex justify-start items-center gap-3 px-4 py-3 cursor-pointer select-none text-slate-500 hover:text-slate-200 hover:bg-slate-900 w-fit">
                        <span>Category</span> <RiExpandUpDownFill />
                      </div>
                    </th>
                    <th>
                      <div className="transition-all flex justify-start items-center gap-3 px-4 py-3 cursor-pointer select-none text-slate-500 hover:text-slate-200 hover:bg-slate-900 w-fit">
                        Control Panel
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="relative ">
                  {taskDetails?.map((task, index) => (
                    <tr
                      className="border border-gray-800 text-sm hover:bg-slate-900 dark:hover:text-white"
                      key={index}
                    >
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
                        <div className="flex  text-xl">
                          <button
                            className="hover:bg-slate-800 px-3   rounded-lg h-10 w-10  flex items-start justify-end"
                            onClick={() => {
                              handleSelectingRow(index);
                            }}
                          >
                            ...
                          </button>
                        </div>

                        <Transition
                          show={openRow === index}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-100"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <div
                            ref={dropDownMenuRef}
                            className="absolute  select-none w-36 z-50 -left-36 top-10 text-slate-200 bg-slate-950 border border-white/10  rounded-lg"
                          >
                            <ul className="flex justify-around w-full flex-col">
                              <li
                                onMouseEnter={() => {
                                  handleOpenMenu("status");
                                }}
                                onMouseLeave={() => {
                                  setOpenStatusMenu(false);
                                }}
                                className="px-3 py-1 relative text-nowrap hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                              >
                                Status <HiMiniArrowSmallRight />
                                <Transition
                                  show={openStatusMenu}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-100"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <DropdownTaskMenu
                                    type={"status"}
                                    handleChange={handleTaskChange}
                                    selectedRow={selectedRow}
                                    generalItems={[
                                      "In Progress",
                                      "Done",
                                      "Todo",
                                    ]}
                                  />
                                </Transition>
                              </li>
                              <li
                                onMouseEnter={() => {
                                  handleOpenMenu("priority");
                                }}
                                onMouseLeave={() => {
                                  setOpenPriorityMenu(false);
                                }}
                                className="px-3 py-1 relative text-nowrap hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                              >
                                Priority <HiMiniArrowSmallRight />
                                <Transition
                                  show={openPriorityMenu}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-100"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <DropdownTaskMenu
                                    type={"priority"}
                                    selectedRow={selectedRow}
                                    handleChange={handleTaskChange}
                                    generalItems={["High", "Medium", "Low"]}
                                  />
                                </Transition>
                              </li>
                              <li
                                onMouseEnter={() => {
                                  handleOpenMenu("category");
                                }}
                                onMouseLeave={() => {
                                  setOpenCategoryMenu(false);
                                }}
                                className="px-3 py-1 border-b border-white/30 relative text-nowrap hover:bg-slate-800 cursor-pointer flex items-center justify-between "
                              >
                                Category <HiMiniArrowSmallRight />
                                <Transition
                                  show={openCategoryMenu}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-100"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <DropdownTaskMenu
                                    type={"category"}
                                    selectedRow={selectedRow}
                                    handleChange={handleTaskChange}
                                    generalItems={["Personal", "Work"]}
                                  />
                                </Transition>
                              </li>
                              <li
                                onClick={() => {
                                  handleDeleteTask(task.id);
                                }}
                                className="px-3 py-2 text-nowrap hover:bg-slate-800 cursor-pointer "
                              >
                                Delete
                              </li>{" "}
                            </ul>
                          </div>
                        </Transition>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default TaskBoard;
