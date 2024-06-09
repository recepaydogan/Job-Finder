/* eslint-disable react-hooks/exhaustive-deps */

import { useRef } from "react";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";
function Header() {
  const headerRef = useRef();

  return (
    <header
      ref={headerRef}
      className="dark:bg-white    flex-wrap z-[100] mx-auto flex  bg-slate-950 justify-around py-3 px-5"
    >
      <NavLink to={"/"} className="text-xl flex items-center ">
        Job & Task Handler
      </NavLink>
      <NavBar headerRef={headerRef} />
    </header>
  );
}

export default Header;
