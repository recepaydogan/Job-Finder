import "./App.css";
import Header from "./components/Header";
import JobCards from "./components/JobCards";
import JobListing from "./components/JobListing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import TaskBoard from "./components/TaskBoard";
function App() {
  return (
    <>
      <div className="font-sans bg-slate-950  h-dvh text-white dark:bg-white dark:text-black  ">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mx-auto text-sm">
                <JobListing></JobListing>
                <JobCards></JobCards>
              </div>
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
          theme={"dark"}
          transition:Slide
        />
      </div>
    </>
  );
}

export default App;
