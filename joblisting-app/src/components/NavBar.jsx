import { useState, useEffect, useRef } from "react";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../authContexts/AuthContext";
import { signOutUser } from "../firebase/auth";
import { ThreeDots } from "react-loader-spinner";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import useClickOutside from "../CustomHooks/useClickOutside";
import { Transition } from "@headlessui/react";
const NavLinks = () => {
  const navigate = useNavigate();
  const { userLoggedIn, user, setLoading, loading } = useAuth();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const menu = useRef();
  useClickOutside({ itemRef: menu, setItem: setOpenUserMenu });
  const handleLogOut = async () => {
    setOpenUserMenu(false);
    setLoading(true);
    await signOutUser().then(() => {
      navigate("/log-in");
    });
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const userMenu = () => {
    setOpenUserMenu(!openUserMenu);
  };
  return (
    <ul
      className={`${
        loading && "pointer-events-none"
      } font-semibold flex gap-3 `}
    >
      <NavLink
        className="dark:hover:bg-slate-950 transition-all dark:hover:text-white active:scale-95 font-semibold px-4 py-2 rounded-lg cursor-pointer    hover:bg-gray-800  outline-none "
        to="/"
      >
        Job Board
      </NavLink>

      <NavLink
        className="dark:hover:bg-slate-950 transition-all dark:hover:text-white active:scale-95 font-semibold px-4 py-2 rounded-lg cursor-pointer  hover:bg-gray-800   outline-none "
        to="/todo-list"
      >
        Task List
      </NavLink>

      {userLoggedIn ? (
        <div ref={menu} className="relative  ">
          <button
            className="max-w-fit dark:bg-white dark:text-black dark:hover:bg-slate-900 dark:hover:text-white  flex items-center justify-center bg-slate-950 px-3 py-2 rounded-md hover:bg-slate-900 transition-colors"
            onClick={userMenu}
          >
            {user ? (
              <span className="flex items-center  gap-2">
                {user.email.split("@")[0]} <IoMdArrowDropdown />
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
          <Transition
            show={openUserMenu}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="absolute w-full z-50 ">
              <button
                className="w-full bg-slate-200 text-black flex items-center justify-center px-3 py-1 mt-1 rounded-md "
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          </Transition>
        </div>
      ) : (
        <NavLink
          className="dark:hover:bg-slate-950 dark:hover:text-white active:scale-95font-semibold px-3 py-2 rounded-lg cursor-pointer hover:ring-1  hover:bg-slate-700   outline-none "
          to="/log-in"
        >
          Login
        </NavLink>
      )}
    </ul>
  );
};
function NavBar({ headerRef }) {
  const [dark, setDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [navBarWidth, setNavBarWidth] = useState(window.innerWidth);
  useClickOutside({ itemRef: headerRef, setItem: setIsOpen });
  const location = useLocation();
  const navRef = useRef();
  useEffect(() => {
    const handleResize = () => {
      setNavBarWidth(window.innerWidth);
      navBarWidth < 641 && setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navBarWidth]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

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
  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav ref={navRef} className="min-w-fit justify-end items-center flex">
        {dark ? (
          <CiDark
            onClick={handleDarkMode}
            size={55}
            className="dark:hover:bg-slate-950 transition-all  dark:hover:text-white active:scale-95  px-2 py-1 rounded-lg cursor-pointer   hover:ring-1   outline-none"
          />
        ) : (
          <CiLight
            onClick={handleDarkMode}
            size={55}
            className="dark:hover:bg-slate-950 transition-all dark:hover:text-white active:scale-95  px-2 py-1 rounded-lg cursor-pointer   hover:ring-1    outline-none"
          />
        )}

        <div className="flex max-sm:hidden justify-end  items-center w-full">
          <NavLinks />
        </div>

        <div
          onClick={toggleNavBar}
          className="hidden cursor-pointer hover:bg-white/10 active:scale-90 px-3 py-4  max-sm:block"
        >
          <CiMenuBurger size={20} />
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && navBarWidth < 641 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" flex basis-full flex-col items-center"
          >
            <NavLinks setIsOpen={setIsOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
NavBar.propTypes = {
  headerRef: PropTypes.object.isRequired,
};
NavLinks.propTypes = {
  setIsOpen: PropTypes.func,
};
export default NavBar;
