import { Formik } from "formik";
import * as yup from "yup";
import { resetPassword } from "../../firebase/auth.js";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../authContexts/AuthContext.jsx";
import { toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      onSubmit={async (values) => {
        if (values.email) {
          try {
            await resetPassword(values.email);
            toast.success("Password reset link sent to your email");
            navigate("/log-in");
          } catch (error) {
            console.error(error.message);
            toast.error("Error sending password reset link");
          }
        }
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email()
          .required("Email is required")
          .test(
            "is-gmail-or-outlook",
            "Email domain should be gmail.com or outlook.com",
            (value) => {
              return (
                value &&
                (value.endsWith("@gmail.com") || value.endsWith("@outlook.com"))
              );
            }
          ),
      })}
    >
      {({ handleChange, handleSubmit, values, touched, errors }) => {
        return (
          <>
            {userLoggedIn ? (
              navigate("/")
            ) : (
              <div className="w-full h-[85%] flex-col  flex mt-40 justify-center items-center ">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col w-2/6 gap-5 py-8 px-10 bg-slate-900 max-sm:w-10/12 max-lg:w-2/4 max-xl:w-2/4 rounded-lg "
                >
                  <h1 className="text-center text-2xl">Reset Password</h1>
                  <div>
                    <label htmlFor="">Email</label>
                    <input
                      className="w-full mt-2 dark:border-gray-950 dark:text-black bg-transparent text-white border-[1px] border-gray-400  px-4 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                      type="email"
                      value={values.email}
                      name="email"
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <button
                      className=" bg-slate-950 py-2 rounded-md mt-2 hover:bg-slate-800 transition-all"
                      type="submit"
                    >
                      Reset Password
                    </button>
                    <NavLink
                      to={"/log-in"}
                      className=" bg-slate-950 text-center py-2 rounded-md mt-2 hover:bg-slate-800 transition-all"
                    >
                      Go Back
                    </NavLink>
                  </div>
                </form>
              </div>
            )}
          </>
        );
      }}
    </Formik>
  );
}

export default ResetPassword;
