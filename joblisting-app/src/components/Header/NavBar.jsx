import { useState, useEffect, useRef } from "react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../authContexts/AuthContext";
import { signOutUser } from "../../firebase/auth.js";
import { ThreeDots } from "react-loader-spinner";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import useClickOutside from "../../Helpers/useClickOutside";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";

import { FaDesktop } from "react-icons/fa";
import { HiSun } from "react-icons/hi";
import { IoMoonSharp } from "react-icons/io5";

const NavLinks = () => {
  const navigate = useNavigate();
  const { userLoggedIn, user, setLoading, loading } = useAuth();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const menu = useRef();
  const location = useLocation();

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
        {...(location.pathname === "/" && { "data-active": "true" })}
        className="transition-all active:scale-95 font-semibold px-4 py-2 rounded-lg cursor-pointer outline-none data-[active]:pointer-events-none"
        to="/"
      >
        Jobs
      </NavLink>

      <NavLink
        {...(location.pathname === "/todo-list" && { "data-active": "true" })}
        className=" transition-all  active:scale-95 font-semibold px-4 py-2 rounded-lg cursor-pointer data-[active]:pointer-events-none outline-none  "
        to="/todo-list"
      >
        Tasks
      </NavLink>

      {userLoggedIn ? (
        <div ref={menu} className="relative  ">
          <button
            className="max-w-fit dark:bg-white dark:text-black   flex items-center justify-center bg-slate-950 px-3 py-2 rounded-md  transition-colors"
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
          className="active:scale-95font-semibold px-3 py-2 rounded-lg cursor-pointer outline-none "
          to="/log-in"
        >
          Login
        </NavLink>
      )}
    </ul>
  );
};
function NavBar({ headerRef }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme"))
      : null
  );
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

  // Check if dark mode is enabled and set the theme
  useEffect(() => {
    switch (theme) {
      case true:
        document.body.classList.add("dark");
        localStorage.setItem("theme", true);
        break;
      case false:
        document.body.classList.remove("dark");
        localStorage.setItem("theme", false);
        break;
      case null:
        document.body.classList.remove("dark");
        localStorage.removeItem("theme");
        break;
      default:
        break;
    }
  }, [theme]);
  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  const themeOption = [
    { value: true, label: "Light", icon: <HiSun /> },
    { value: false, label: "Dark", icon: <IoMoonSharp /> },
    { value: null, label: "System", icon: <FaDesktop /> },
  ];
  return (
    <>
      <nav ref={navRef} className="min-w-fit justify-end items-center flex">
        <div className="flex max-sm:hidden justify-end  items-center w-full">
          <NavLinks />
        </div>
        <div
          onClick={toggleNavBar}
          className="hidden cursor-pointer hover:bg-white/10 active:scale-90 px-3 py-4  max-sm:block"
        >
          <CiMenuBurger size={20} />
        </div>{" "}
        <Listbox className="ml-3" onChange={setTheme} as="div" value={theme}>
          <ListboxButton className="flex items-center text-xl">
            {themeOption.map((option, index) => {
              return (
                option.value === theme && <div key={index}>{option.icon}</div>
              );
            })}
          </ListboxButton>
          <Transition
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className="bg-slate-800 w-32 mt-3 p-2 select-none rounded-md cursor-pointer text-white list-none dark:shadow-lg dark:bg-gray-100 "
              anchor="bottom"
              as="li"
            >
              {themeOption.map((option, index) => {
                return (
                  <ListboxOption key={index} value={option.value}>
                    <div className="flex divide-y divide-gray-400 px-2 py-2 w-full text-sm items-center  dark:text-slate-950">
                      <div className="flex mr-3 text-lg ">{option.icon}</div>
                      {option.label}
                    </div>
                  </ListboxOption>
                );
              })}
            </ListboxOptions>
          </Transition>
        </Listbox>
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
