import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const MyContext = createContext();

function Provider({ children }) {
  const [FormData, setFormData] = useState({});
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [likedJobs, setLikedJobs] = useState([]);
  const [hiddenJobs, setHiddenJobs] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/cards");
      setJobs(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  // Fetch data from the API and set the jobs state
  useEffect(() => {
    fetchData();
    setLikedJobs(JSON.parse(localStorage.getItem("likedJobs")) || []);
    setHiddenJobs(JSON.parse(localStorage.getItem("hiddenJobs")) || []);
  }, [fetchData]);
  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };
  // Filter jobs based on the form data
  useEffect(() => {
    let newDisplayedJobs = jobs;

    if (FormData.showFavorites) {
      newDisplayedJobs = likedJobs;
    }

    setDisplayedJobs(newDisplayedJobs);
  }, [
    FormData.showFavorites,
    jobs,
    likedJobs,
    FormData.showHiddenJobs,
    hiddenJobs,
  ]);
  // Filter jobs based on the form data
  useEffect(() => {
    const filteredJobs = displayedJobs.filter((job) => {
      if (
        hiddenJobs.some((hiddenJob) => hiddenJob.id === job.id) &&
        !FormData.showHiddenJobs
      ) {
        return false;
      }
      if (
        FormData.title &&
        !job.jobTitle.toLowerCase().includes(FormData.title.toLowerCase())
      ) {
        return false;
      }
      if (
        FormData.company &&
        !job.company.toLowerCase().includes(FormData.company.toLowerCase())
      ) {
        return false;
      }
      if (
        FormData.location &&
        !job.location.toLowerCase().includes(FormData.location.toLowerCase())
      ) {
        return false;
      }
      if (FormData.salary && parseInt(job.salary) < parseInt(FormData.salary)) {
        return false;
      }
      if (
        FormData.type &&
        FormData.type !== "Any" &&
        !job.type.toLowerCase().includes(FormData.type.toLowerCase())
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
  }, [FormData, displayedJobs, hiddenJobs, FormData.showFavorites]);
  const sharedDatas = {
    handleFormChange,
    filteredJobs,
    FormData,
    likedJobs,
    setLikedJobs,
    hiddenJobs,
    setHiddenJobs,
    fetchData,
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
