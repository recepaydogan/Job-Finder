import "./App.css";
import Header from "./components/Header";
import JobCards from "./components/JobCards";
import JobListing from "./components/JobListing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, NavLink } from "react-router-dom";
import TaskBoard from "./components/TaskBoard";
import Login from "./components/Auth/Login/Login";
import useAuth from "./authContexts/AuthContext";
import Register from "./components/Auth/Register/Register";
import AddJob from "./components/AddJob";
function App() {
  const { loading, userLoggedIn } = useAuth();
  const displayWarning = () => {
    toast.error("You need to login to add a job");
  };
  console.log("userLoggedIn", userLoggedIn);
  return (
    <>
      <div className="font-sans bg-slate-950  min-h-screen text-white dark:bg-white dark:text-black  ">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mx-auto text-sm pt-5 ">
                <h1 className="text-3xl font-semibold flex justify-between items-center gap-8  mb-8">
                  Jobs
                  {userLoggedIn ? (
                    <NavLink
                      className="text-base border border-white/10 px-3 select-none py-2 rounded-md bg-slate-900 hover:bg-slate-800 transition-all"
                      to="/add-job"
                    >
                      Add Job
                    </NavLink>
                  ) : (
                    <span
                      onClick={displayWarning}
                      className="text-base border cursor-not-allowed select-none border-white/10 px-3 py-2 rounded-md bg-slate-900 hover:bg-slate-800 transition-all"
                    >
                      Add Job
                    </span>
                  )}
                </h1>
                <JobListing></JobListing>
                <JobCards></JobCards>
              </div>
            }
          ></Route>
          <Route path="/add-job" element={<AddJob />} />
          <Route
            path="/log-in"
            element={
              loading ? (
                <div className="flex justify-center items-center h-screen">
                  <h1>Loading...</h1>
                </div>
              ) : (
                <Login></Login>
              )
            }
          />
          <Route
            path="/todo-list"
            element={
              <>
                <TaskBoard></TaskBoard>
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Register></Register>
              </>
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={3}
          theme={"dark"}
          transition:Slide
        />
      </div>
    </>
  );
}

export default App;
