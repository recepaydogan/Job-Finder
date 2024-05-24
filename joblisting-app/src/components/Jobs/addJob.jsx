import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomSelect from "../../Helpers/customSelect";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../../Context";
import { toast } from "react-toastify";
import Loading from "../Loading";

function AddJob() {
  const navigate = useNavigate();
  const { fetchData } = useContext(MyContext);

  return (
    <Formik
      initialValues={{
        jobTitle: "",
        salary: "",
        experienceLevel: "",
        type: "",
        location: "",
        description: "",
        company: "",
        applicationUrl: "",
        longDescription: "",
      }}
      onSubmit={(values) => {
        setTimeout(async () => {
          await axios.post("http://localhost:3000/cards", values);
          fetchData();
          navigate("/");
          toast.success("Job Created Successfully");
        }, 3000);
      }}
      validationSchema={yup.object().shape({
        jobTitle: yup
          .string()
          .required("Job Title is required")
          .min(3, "minimum 3 characters"),
        salary: yup
          .string()
          .required("Salary is required")
          .min(5, "Minimum 5 characters"),
        experienceLevel: yup.string().required("Experience Level is required"),

        type: yup.string().required("Job Type is required"),
        location: yup.string().required("Location is required"),
        description: yup
          .string()
          .min(10, "Minimum 10 characters")
          .required("Description is required"),
        longDescription: yup
          .string()
          .min(10, "Minimum 20 Characters")
          .required("Long Description is required "),

        company: yup.string().required("Company is required"),
        applicationUrl: yup
          .string()
          .url("Must be a valid URL (https://www.example.com/)")
          .required("Required"),
      })}
    >
      {({ handleChange, touched, errors, setFieldValue, isSubmitting }) => {
        return (
          <>
            <div className="min-h-screen">
              {isSubmitting ? (
                <Loading />
              ) : (
                <Form className="grid container mx-auto mt-6 grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 place-items-center gap-7 grid-rows-2 max-h-screen ">
                  <div className="flex flex-col gap-1 w-full relative">
                    <label className="font-semibold">Title</label>
                    <Field
                      name="jobTitle"
                      onChange={handleChange}
                      placeholder="Search for a job title"
                      className="dark:border-gray-950 dark:text-black  bg-transparent text-white border-[1px] border-white/10   px-3 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                      type="text"
                    />
                    {touched.jobTitle && errors.jobTitle && (
                      <p className="text-red-400 pl-2 absolute -bottom-7">
                        <ErrorMessage name="jobTitle" />
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full relative">
                    <label className="font-semibold">Company</label>
                    <Field
                      name="company"
                      onChange={handleChange}
                      placeholder="Search for a job title"
                      className="dark:border-gray-950 dark:text-black  bg-transparent text-white border-[1px] border-white/10   px-3 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                      type="text"
                    />
                    {touched.company && errors.company && (
                      <p className="text-red-400 pl-2 absolute -bottom-7">
                        <ErrorMessage name="company" />
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full relative">
                    <label className="font-semibold">Location</label>
                    <Field
                      name="location"
                      onChange={handleChange}
                      placeholder="Search for a location"
                      className="dark:border-gray-950 dark:text-black  bg-transparent text-white border-[1px] border-white/10   px-3 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                      type="text"
                    />
                    {touched.location && errors.location && (
                      <p className="text-red-400 absolute -bottom-7">
                        <ErrorMessage name="location" />
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full relative">
                    <label className="font-semibold">Min. Salary</label>
                    <Field
                      name="salary"
                      onChange={handleChange}
                      placeholder="Search for a min. salary"
                      className="dark:border-gray-950 dark:text-black  bg-transparent text-white border-[1px] border-white/10   px-3 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                      type="number"
                    />
                    {touched.salary && errors.salary && (
                      <p className="text-red-400 pl-2 absolute -bottom-7">
                        <ErrorMessage name="salary" />
                      </p>
                    )}
                  </div>
                  <div className="flex dark:text-black  flex-col gap-1 w-full relative">
                    <label className="font-semibold">Job Type</label>
                    <Field
                      as={CustomSelect}
                      name="type"
                      options={["Any", "Full-Time", "Part-Time", "Internship"]}
                      defaultValue="Any"
                      onChange={(event) => {
                        console.log(event);
                        const value = event.target.value;
                        setFieldValue("type", value);
                      }}
                    />
                    {touched.type && errors.type && (
                      <p className="text-red-400 pl-2 absolute -bottom-7">
                        {" "}
                        <ErrorMessage name="type" />{" "}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full relative">
                    <label className="font-semibold">Experience Level</label>
                    <Field
                      name="experienceLevel"
                      as={CustomSelect}
                      options={["Any", "Junior", "Middle", "Senior"]}
                      defaultValue="Any"
                      onChange={(event) => {
                        const value = event.target.value;
                        setFieldValue("experienceLevel", value);
                      }}
                    />
                    {touched.experienceLevel && errors.experienceLevel && (
                      <p className="text-red-400 pl-2 absolute -bottom-7">
                        <ErrorMessage name="experienceLevel" />
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full relative">
                    <label className="font-semibold">Description</label>
                    <Field
                      as="textarea"
                      name="description"
                      onChange={handleChange}
                      placeholder="Type Your Description"
                      className="dark:border-gray-950 resize-none dark:text-black  bg-transparent text-white border-[1px] border-white/10   px-3 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                    />
                    {touched.description && errors.description && (
                      <p className="text-red-400 pl-2 absolute -bottom-7">
                        <ErrorMessage name="description" />
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full relative">
                    <label className="font-semibold">Long Description</label>
                    <Field
                      as="textarea"
                      name="longDescription"
                      onChange={handleChange}
                      placeholder="Type Your Long Description"
                      className="dark:border-gray-950 resize-none dark:text-black  bg-transparent text-white border-[1px] border-white/10   px-3 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                    />
                    {touched.longDescription && errors.longDescription && (
                      <p className="text-red-400 pl-2 absolute -bottom-7">
                        <ErrorMessage name="longDescription" />
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full relative">
                    <label className="font-semibold">Application URL</label>
                    <Field
                      name="applicationUrl"
                      onChange={handleChange}
                      placeholder="Type Your Description"
                      className="dark:border-gray-950 resize-none dark:text-black  bg-transparent text-white border-[1px] border-white/10   px-3 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                    />
                    {touched.applicationUrl && errors.applicationUrl && (
                      <p className="text-red-400 pl-2 absolute -bottom-7">
                        <ErrorMessage name="applicationUrl" />
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-white mt-6 max-md:col-span-1 max-lg:col-span-2 col-span-3 text-black w-1/3 rounded-lg py-2 transition-all hover:bg-slate-800 hover:text-white active:scale-95 dark:hover:bg-slate-300 dark:hover:text-slate-950 dark:bg-slate-900 dark:text-white  "
                  >
                    Create
                  </button>
                </Form>
              )}
            </div>
          </>
        );
      }}
    </Formik>
  );
}

export default AddJob;
