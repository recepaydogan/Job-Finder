import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
const TasksContext = createContext();

import PropTypes from "prop-types";
function TasksProvider({ children }) {
  const [taskDetails, setTaskDetails] = useState([]);
  const [resetTaskTable, setResetTaskTable] = useState(false);
  const [isTaskLoading, setIsTaskLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://project-data-fnc5.onrender.com/tasks"
      );
      setTaskDetails(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTaskLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData, resetTaskTable]);

  return (
    <TasksContext.Provider
      value={{
        taskDetails,
        setTaskDetails,
        resetTaskTable,
        setResetTaskTable,
        isTaskLoading,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

TasksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TasksContext;
export { TasksProvider };
