/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

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
      <div className="flex justify-around items-center select-none border-b py-2">
        <h1 className="text-xl">Job Listing App</h1>
        <nav>
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

            <NavLink
              className="dark:hover:bg-slate-950 dark:hover:text-white active:scale-95 font-semibold px-3 py-2 rounded-lg cursor-pointer hover:ring-1  hover:bg-slate-700   outline-none "
              to="/"
            >
              Job Board
            </NavLink>
            <NavLink
              className="dark:hover:bg-slate-950 dark:hover:text-white active:scale-95 font-semibold px-3 py-2 rounded-lg cursor-pointer hover:ring-1  hover:bg-slate-700   outline-none "
              to="/todo-list"
            >
              Job List
            </NavLink>
            <NavLink
              className="dark:hover:bg-slate-950 dark:hover:text-white active:scale-95font-semibold px-3 py-2 rounded-lg cursor-pointer hover:ring-1  hover:bg-slate-700   outline-none "
              to="/login"
            >
              Login
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
}
Header.propTypes = {
  isDark: PropTypes.func.isRequired,
};
export default Header;
