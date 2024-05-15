/* eslint-disable react/no-unescaped-entities */
import { Formik } from "formik";
import {
  signIn,
  signInWithGoogle,
  resetPassword,
} from "../../../firebase/auth.js";
import useAuth from "../../../authContexts/AuthContext";
import { Navigate } from "react-router-dom";
function Login() {
  const { userLoggedIn } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values) => {
        if (values.email && values.password) {
          try {
            await signIn(values.email, values.password);
          } catch (error) {
            alert(error.message);
          }
        }
      }}
    >
      {({ handleChange, handleSubmit, values }) => {
        return (
          <>
            {userLoggedIn && <Navigate to="/"></Navigate>}
            <div className="w-full h-[85%] flex-col mt-40  flex justify-center items-center ">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-2/5 py-8 px-10 bg-slate-900 max-sm:w-10/12 max-lg:w-2/4 max-xl:w-2/4 rounded-lg "
              >
                <h1 className="text-center text-2xl">Log in</h1>
                <label>Email</label>
                <input
                  className="w-full mt-2  dark:border-gray-950 dark:text-black   bg-transparent text-white border-[1px] border-white/10   px-4 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                  type="email"
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                />
                <label className="mt-3">Password</label>
                <input
                  autoComplete="off"
                  className="w-full mt-2  dark:border-gray-950 dark:text-black   bg-transparent text-white border-[1px] border-white/10   px-3 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                  type="password"
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                />

                <button
                  className=" bg-slate-950 py-2 rounded-md mt-10 hover:bg-slate-800 transition-all"
                  type="submit"
                >
                  Log in
                </button>
                <button
                  onClick={signInWithGoogle}
                  className=" bg-slate-950 py-2 rounded-md mt-2 hover:bg-slate-800 transition-all"
                >
                  Log in with Google
                </button>
                <div className="flex justify-between items-center select-none">
                  <a className="underline mt-10 pb-0 mb-0" href="/register">
                    I don't have an account
                  </a>
                  <a
                    className="underline mt-10 pb-0 mb-0 cursor-pointer"
                    onClick={() => resetPassword(values.email)}
                  >
                    Reset Password
                  </a>
                </div>
              </form>
            </div>
          </>
        );
      }}
    </Formik>
  );
}

export default Login;
