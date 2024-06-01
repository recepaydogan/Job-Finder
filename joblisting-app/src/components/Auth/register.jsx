import { Formik } from "formik";
import * as yup from "yup";
import { signUp } from "../../firebase/auth.js";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../authContexts/AuthContext.jsx";

function Register() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={async (values) => {
        if (values.email && values.password) {
          try {
            await signUp(values.email, values.password);
            navigate("/");
          } catch (error) {
            console.error(error.message);
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
        password: yup.string().min(6).required("Password is required"),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password")], "Passwords must match")
          .required("Confirm password is required"),
      })}
    >
      {({ handleChange, handleSubmit, values, touched, errors }) => {
        return (
          <>
            {userLoggedIn ? (
              navigate("/")
            ) : (
              <div className="w-full flex-col flex justify-center items-center dark:text-white mt-40">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 w-2/6 py-8 px-10 bg-slate-900 max-sm:w-10/12 max-lg:w-2/4 max-xl:w-2/4 rounded-lg "
                >
                  <h1 className="text-center text-2xl">Register</h1>
                  <div>
                    <label htmlFor="">Email</label>
                    <input
                      className="w-full mt-2  dark:border-gray-950   bg-transparent text-white border-[1px] border-white/10   px-4 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                      type="email"
                      value={values.email}
                      name="email"
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="">Password</label>
                    <input
                      autoComplete="off"
                      className="w-full mt-2  dark:border-gray-950   bg-transparent text-white border-[1px] border-white/10   px-3 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                      type="password"
                      value={values.password}
                      name="password"
                      onChange={handleChange}
                    />
                    {touched.password && errors.password && (
                      <p className="text-red-500">{errors.password}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="">Confirm Password</label>
                    <input
                      autoComplete="off"
                      className="w-full mt-2  dark:border-gray-950   bg-transparent text-white border-[1px] border-white/10   px-3 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                      type="password"
                      value={values.confirmPassword}
                      name="confirmPassword"
                      onChange={handleChange}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <p className="text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <button
                      className=" bg-slate-950 py-2 rounded-md mt-2 hover:bg-slate-800 transition-all"
                      type="submit"
                    >
                      Register
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

export default Register;
