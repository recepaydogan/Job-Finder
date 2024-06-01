/* eslint-disable react-hooks/exhaustive-deps */

import { useRef } from "react";
import NavBar from "./NavBar";
function Header() {
  const headerRef = useRef();

  return (
    <header
      ref={headerRef}
      className="dark:bg-white dark:border-b-gray-400 border-b-[1px] grow top-0 sticky flex-wrap z-[100] mx-auto flex w-full bg-slate-950 justify-around items-center py-3 px-5"
    >
      <h1 className="text-xl">Job Listing App</h1>
      <NavBar headerRef={headerRef} />
    </header>
  );
}

export default Header;
