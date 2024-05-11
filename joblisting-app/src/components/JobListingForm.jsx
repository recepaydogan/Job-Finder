import { useCallback, useContext, useEffect, useState } from "react";
import CustomSelect from "../Helpers/CustomSelect";
import MyContext from "../Context";
function JobListingForm() {
  const { handleFormChange } = useContext(MyContext);
  const [FormData, setFormData] = useState({
    title: "",
    location: "",
    minSalary: "",
    jobType: "",
    experienceLevel: "",
    showHiddenJobs: false,
    showFavorites: false,
  });
  // Handle form change
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value || checked };
    });
  };
  // Handle job type change
  const handleJobTypeChange = useCallback((value) => {
    setFormData((prev) => ({ ...prev, jobType: value }));
  }, []);
  // Handle experience level change
  const handleExperinceLevelChange = useCallback((value) => {
    setFormData((prev) => ({ ...prev, experienceLevel: value }));
  }, []);
  // Handle checkbox change
  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: checked };
    });
  };
  // Handle form change
  useEffect(() => {
    handleFormChange(FormData);
  }, [FormData, handleFormChange]);

  return (
    <>
      <form className="grid mt-6 grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 place-items-center gap-7 grid-rows-2  ">
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold">Title</label>
          <input
            name="title"
            onChange={handleChange}
            placeholder="Search for a job title"
            className="dark:border-gray-950 dark:text-black  bg-transparent text-white border-[1px] border-white/10   px-3 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold">Location</label>
          <input
            name="location"
            onChange={handleChange}
            placeholder="Search for a location"
            className="dark:border-gray-950 dark:text-black   bg-transparent text-white border-[1px] border-white/10   px-4 py-3 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold">Min. Salary</label>
          <input
            name="minSalary"
            onChange={handleChange}
            placeholder="Search for a min. salary"
            className="dark:border-gray-950 dark:text-black   bg-transparent text-white border-[1px] border-white/10   px-4 py-3 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
            type="number"
          />
        </div>
        <div className="flex dark:text-black  flex-col gap-1 w-full">
          <label className="font-semibold">Job Type</label>
          <CustomSelect
            onSelectChange={handleJobTypeChange}
            options={["Any", "Full-Time", "Part-Time", "Internship"]}
            defaultValue="Any"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold">Experience Level</label>
          <CustomSelect
            onSelectChange={handleExperinceLevelChange}
            options={["Any", "Junior", "Middle", "Senior"]}
            defaultValue="Any"
          />
        </div>
        <div className="flex h-full items-center justify-end select-none gap-1 w-full">
          <div className="flex h-full flex-col justify-end">
            <label className="flex items-center cursor-pointer gap-3">
              <input
                name="showHiddenJobs"
                onChange={handleCheckBoxChange}
                className="dark:border-gray-950 appearance-none relative after:absolute after:top-2/4 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2  after:text-black after:text-md checked:after:visible after:invisible  after:content-['✓'] size-4 border-[1px]  checked:bg-white border-white/10"
                type="checkbox"
              />
              <p className="text-nowrap">Show Hidden</p>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                name="showFavorites"
                onChange={handleCheckBoxChange}
                className="dark:border-gray-950 appearance-none relative after:absolute after:top-2/4 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2  after:text-black after:text-md checked:after:visible after:invisible after:content-['✓'] size-4 border-[1px]  checked:bg-white border-white/10"
                type="checkbox"
              />
              <p className="text-nowrap">Show Favorites</p>
            </label>
          </div>
          <div className="flex h-full items-center justify-end flex-col gap-1 w-full">
            <button className="dark:bg-slate-950 dark:text-white py-2 px-4 rounded-md text-black font-semibold bg-white hover:bg-white/90">
              Reset
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default JobListingForm;
