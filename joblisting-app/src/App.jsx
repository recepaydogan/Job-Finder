// import { useContext, useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import JobCards from "./components/JobCards";
import JobListing from "./components/JobListing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || false
  );
  const isDark = (dark) => {
    setTheme(dark);
  };

  return (
    <div className="bg-slate-950  min-h-screen text-white dark:bg-white dark:text-black  ">
      <Header isDark={isDark} />
      <div className="flex flex-col container mx-auto ">
        <JobListing />
        <JobCards />{" "}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={3}
          theme={theme ? "dark" : "light"}
          transition:Bounce
        ></ToastContainer>{" "}
      </div>
    </div>
  );
}

export default App;
