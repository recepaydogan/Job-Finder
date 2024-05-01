import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const MyContext = createContext();

function Provider({ children }) {
  const [FormData, setFormData] = useState({});
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [toastNotification, setToastNotification] = useState([]);
  const [likedJobs, setLikedJobs] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/cards");
      setJobs(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  useEffect(() => {
    fetchData();
    setLikedJobs(JSON.parse(localStorage.getItem("likedJobs")) || []);
  }, [fetchData]);
  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleToastNotification = (message, visibility, id) => {
    setToastNotification([{ message, visibility, id }]);
  };
  useEffect(() => {
    setDisplayedJobs(FormData.showFavorites ? likedJobs : jobs);
  }, [FormData.showFavorites, jobs, likedJobs]);

  useEffect(() => {
    const filteredJobs = displayedJobs.filter((job) => {
      if (
        FormData.title &&
        !job.jobTitle.toLowerCase().includes(FormData.title.toLowerCase())
      ) {
        return false;
      }
      if (
        FormData.location &&
        !job.location.toLowerCase().includes(FormData.location.toLowerCase())
      ) {
        return false;
      }
      if (
        FormData.minSalary &&
        parseInt(job.salary) < parseInt(FormData.minSalary)
      ) {
        return false;
      }
      if (
        FormData.jobType &&
        FormData.jobType !== "Any" &&
        !job.type.toLowerCase().includes(FormData.jobType.toLowerCase())
      ) {
        return false;
      }
      if (
        FormData.experienceLevel &&
        FormData.experienceLevel !== "Any" &&
        !job.experienceLevel
          .toLowerCase()
          .includes(FormData.experienceLevel.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
    setFilteredJobs(filteredJobs);
  }, [FormData, displayedJobs]);
  const sharedDatas = {
    handleFormChange,
    filteredJobs,
    FormData,
    handleToastNotification,
    toastNotification,
    likedJobs,
    setLikedJobs,
  };

  return (
    <MyContext.Provider value={sharedDatas}>{children}</MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Provider };
export default MyContext;
