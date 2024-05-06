// import { useContext, useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import JobCards from "./components/JobCards";
import JobListing from "./components/JobListing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import TaskBoard from "./components/TaskBoard";
function App() {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || false
  );
  const isDark = (dark) => {
    setTheme(dark);
  };

  return (
    <>
      <div className="bg-slate-950  min-h-screen text-white dark:bg-white dark:text-black  ">
        <Header isDark={isDark} />
        <div className="flex flex-col container mx-auto ">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <JobListing></JobListing>
                  <JobCards></JobCards>
                </>
              }
            ></Route>
            <Route
              path="/todo-list"
              element={
                <>
                  <TaskBoard></TaskBoard>
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
            theme={theme ? "dark" : "light"}
            transition:Slide
          />{" "}
        </div>
      </div>
    </>
  );
}

export default App;
