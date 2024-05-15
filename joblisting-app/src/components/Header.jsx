/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../authContexts/AuthContext";
import { signOutUser } from "../firebase/auth";
import { ThreeDots } from "react-loader-spinner";
import { IoMdArrowDropdown } from "react-icons/io";

function Header() {
  const navigate = useNavigate();
  const { userLoggedIn, user, setLoading, loading } = useAuth();
  console.log(user);
  const [dark, setDark] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(null);
  // Check if dark mode is enabled and set the theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const theme = storedTheme ? JSON.parse(storedTheme) : false;
    setDark(theme);

    if (theme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);
  // Handle dark mode toggle
  const handleDarkMode = () => {
    const newDark = !dark;
    setDark(newDark);
    if (newDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", JSON.stringify(newDark));
  };
  const handleLogOut = async () => {
    setLoading(true);
    await signOutUser().then(() => {
      navigate("/log-in");
    });
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  };
  const userMenu = () => {
    setOpenUserMenu(!openUserMenu);
  };
  return (
    <>
      <div className="flex justify-around items-center select-none border-b py-2">
        <h1 className="text-xl">Job Listing App</h1>
        <nav>
          <ul
            className={`${
              loading && "pointer-events-none"
            } inline-flex  gap-2 justify-center items-center  `}
          >
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
            {userLoggedIn ? (
              <div className="relative ">
                <button
                  className="min-w-[245px]  flex items-center justify-center bg-slate-950 px-3 py-2 rounded-md hover:bg-slate-900 transition-colors"
                  onClick={userMenu}
                >
                  {user ? (
                    <span className="flex items-center gap-2">
                      {user.email} <IoMdArrowDropdown />
                    </span>
                  ) : (
                    <ThreeDots
                      visible={true}
                      height="27"
                      width="27"
                      color="#fff"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  )}
                </button>
                {openUserMenu && (
                  <div className="absolute w-full ">
                    <button
                      className="w-full bg-slate-200 text-black flex items-center justify-center px-3 py-1 mt-1 rounded-md "
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                className="dark:hover:bg-slate-950 dark:hover:text-white active:scale-95font-semibold px-3 py-2 rounded-lg cursor-pointer hover:ring-1  hover:bg-slate-700   outline-none "
                to="log-in"
              >
                Login
              </NavLink>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
