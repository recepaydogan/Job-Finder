import { useState, useEffect } from "react";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import PropTypes from "prop-types";

function Header({ isDark }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const theme = storedTheme ? JSON.parse(storedTheme) : false;
    setDark(theme);
    isDark(theme);
    if (theme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const handleDarkMode = () => {
    const newDark = !dark;
    setDark(newDark);
    if (newDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", JSON.stringify(newDark));
    isDark(newDark);
  };
  return (
    <div>
      <div className="flex justify-around items-center select-none border-b py-6">
        <h1 className="text-4xl">Job Listing App</h1>
        <ul className="inline-flex gap-6 justify-center items-center  ">
          {dark ? (
            <CiDark
              onClick={handleDarkMode}
              size={60}
              className="dark:hover:bg-slate-950 dark:hover:text-white active:scale-95  px-3 py-2 rounded-lg cursor-pointer   hover:ring-1  hover:bg-slate-700    outline-none"
            />
          ) : (
            <CiLight
              onClick={handleDarkMode}
              size={60}
              className="dark:hover:bg-slate-950 dark:hover:text-white active:scale-95  px-3 py-2 rounded-lg cursor-pointer   hover:ring-1  hover:bg-slate-700   outline-none"
            />
          )}

          <li className="dark:hover:bg-slate-950 dark:hover:text-white active:scale-95 text-lg px-3 py-2 rounded-lg cursor-pointer hover:ring-1  hover:bg-slate-700   outline-none ">
            Job Listing
          </li>
          <li className="dark:hover:bg-slate-950 dark:hover:text-white active:scale-95 text-lg px-3 py-2 rounded-lg cursor-pointer hover:ring-1  hover:bg-slate-700   outline-none ">
            Task Board
          </li>
          <li className="dark:hover:bg-slate-950 dark:hover:text-white active:scale-95 text-lg px-3 py-2 rounded-lg cursor-pointer   hover:ring-1  hover:bg-slate-700   outline-none">
            Login
          </li>
        </ul>
      </div>
    </div>
  );
}
Header.propTypes = {
  isDark: PropTypes.func.isRequired,
};
export default Header;
