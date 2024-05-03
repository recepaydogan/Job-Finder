import { useEffect, useState } from "react";
import axios from "axios";
import { RiArrowUpSLine } from "react-icons/ri";

function TaskBoard() {
  const [taskDetails, setTaskDetails] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3003/tasks");
      setTaskDetails(response.data);
    };
    console.log(taskDetails);

    fetchData();
  }, []);
  const handleSortFieldChange = (field) => {
    const isDataSorted = !isSorted;
    setIsSorted(isDataSorted);
    if (isDataSorted) {
      const sortedData = [...taskDetails].sort((b, a) =>
        a[field].localeCompare(b[field])
      );
      setTaskDetails(sortedData);
    } else {""
      const sortedData = [...taskDetails].sort((a, b) =>
        a[field].localeCompare(b[field])
      );
      setTaskDetails(sortedData);
    }
  };
  return (
    <div className=" flex border-[1px] mt-40 py-5 px-14 gap-4">
      <div className="w-1/4 py-2">
        <div className="font-bold py-2 flex items-center gap-2 cursor-pointer">
          <span>Title</span> <RiArrowUpSLine />
        </div>

        {taskDetails.map((task, index) => (
          <div className="py-2" key={index}>
            {task.title}
          </div>
        ))}
      </div>
      <div className="w-1/4 py-2">
        <div className="font-bold py-2 flex items-center gap-2 cursor-pointer">
          <span>status</span> <RiArrowUpSLine />
        </div>
        {taskDetails.map((task, index) => (
          <div className="py-2" key={index}>
            {task.status}
          </div>
        ))}
      </div>
      <div className="w-1/4 py-2">
        <div
          onClick={() => handleSortFieldChange("priority")}
          className="font-bold py-2 flex items-center gap-2 cursor-pointer"
        >
          <span>Priority</span> <RiArrowUpSLine />
        </div>
        {taskDetails.map((task, index) => (
          <div className="py-2" key={index}>
            {task.priority}
          </div>
        ))}
      </div>
      <div className="w-1/4 py-2">
        <div
          onClick={() => handleSortFieldChange("category")}
          className="font-bold py-2 flex items-center gap-2 cursor-pointer"
        >
          <span>Category</span> <RiArrowUpSLine />
        </div>
        {taskDetails.map((task, index) => (
          <div className="py-2" key={index}>
            {task.category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskBoard;
