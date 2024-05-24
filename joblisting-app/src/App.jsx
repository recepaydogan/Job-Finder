import "./App.css";
import Header from "./components/header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import TaskBoard from "./components/Tasks/taskBoard";
import Login from "./components/Auth/Login";
import useAuth from "./authContexts/AuthContext";
import Register from "./components/Auth/register";
import AddJob from "./components/Jobs/addJob";
import ResetPassword from "./components/Auth/resetPassword";
import HomePage from "./components/HomePage";

function App() {
  const { loading } = useAuth();

  return (
    <>
      <div className=" *:m-0 *:p-0 *:box-border">
        <div className="font-sans bg-slate-950 min-h-screen text-white dark:bg-white dark:text-black  ">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/add-job" element={<AddJob />} />
            <Route path="Reset-password" element={<ResetPassword />} />
            <Route
              path="/log-in"
              element={
                loading ? (
                  <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-white"></div>
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
      </div>
    </>
  );
}

export default App;
