import "./App.css";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import TaskBoard from "./components/TasksComponents/taskBoard";
import Login from "./components/Auth/Login";
import useAuth from "./authContexts/AuthContext";
import Register from "./components/Auth/Register/";
import AddJob from "./components/JobComponents/AddJob";
import ResetPassword from "./components/Auth/ResetPassword";
import HomePage from "./components/HomePage";
import Loading from "./components/Loading";

function App() {
  const { loading } = useAuth();

  return (
    <>
      <div className="font-sans bg-slate-950 min-h-screen text-white dark:bg-white dark:text-black  ">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/add-job" element={<AddJob />} />
          <Route path="Reset-password" element={<ResetPassword />} />
          <Route path="/log-in" element={loading ? <Loading /> : <Login />} />
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
          <Route
            path="*"
            element={
              <div className="text-red-700 text-5xl text-center mt-10">
                404 Not Found
              </div>
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
