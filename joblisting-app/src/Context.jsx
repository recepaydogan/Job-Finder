import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const MyContext = createContext();

function Provider({ children }) {
  const [formData, setFormData] = useState({});
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

    if (formData.showFavorites) {
      newDisplayedJobs = likedJobs;
    }

    setDisplayedJobs(newDisplayedJobs);
  }, [
    formData.showFavorites,
    jobs,
    likedJobs,
    formData.showHiddenJobs,
    hiddenJobs,
  ]);
  // Filter jobs based on the form data
  useEffect(() => {
    const filteredJobs = displayedJobs.filter((job) => {
      if (
        hiddenJobs.some((hiddenJob) => hiddenJob.id === job.id) &&
        !formData.showHiddenJobs
      ) {
        return false;
      }
      if (
        formData.title &&
        !job.jobTitle.toLowerCase().includes(formData.title.toLowerCase())
      ) {
        return false;
      }
      if (
        formData.company &&
        !job.company.toLowerCase().includes(formData.company.toLowerCase())
      ) {
        return false;
      }
      if (
        formData.location &&
        !job.location.toLowerCase().includes(formData.location.toLowerCase())
      ) {
        return false;
      }
      if (formData.salary && parseInt(job.salary) < parseInt(formData.salary)) {
        return false;
      }
      if (
        formData.type &&
        formData.type !== "Any" &&
        !job.type.toLowerCase().includes(formData.type.toLowerCase())
      ) {
        return false;
      }
      if (
        formData.experienceLevel &&
        formData.experienceLevel !== "Any" &&
        !job.experienceLevel
          .toLowerCase()
          .includes(formData.experienceLevel.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
    setFilteredJobs(filteredJobs);
  }, [formData, displayedJobs, hiddenJobs, formData.showFavorites]);
  const sharedDatas = {
    handleFormChange,
    filteredJobs,
    formData,
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
