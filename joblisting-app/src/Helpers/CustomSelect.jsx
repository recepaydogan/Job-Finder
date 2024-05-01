/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function CustomSelect({ options, defaultValue, onSelectChange }) {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [selecting, setSelecting] = useState(false);
  const selectRef = useRef();
  useEffect(() => {
    function handleClickOutside(e) {
      if (!selectRef.current.contains(e.target)) {
        setSelecting(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (selectedOption) {
      onSelectChange(selectedOption);
    }
  }, [selectedOption, onSelectChange, defaultValue]);
  return (
    <div ref={selectRef} className=" relative select-none cursor-pointer">
      <div
        onClick={() => setSelecting(!selecting)}
        className="dark:text-black dark:border-slate-950  dark:hover:bg-gray-100 flex  w-full  justify-between  text-white border-[1px] border-white/10   px-4 py-3 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
      >
        {selectedOption}
        <IoMdArrowDropdown />
      </div>
      <div
        className={` ${
          selecting
            ? "opacity-100  "
            : "opacity-0 select-none pointer-events-none"
        } dark:border-slate-950 dark:bg-white bg-slate-950 absolute w-full border-[1px] py-8 border-white/10 rounded-lg flex gap-3 flex-col px-3 mt-1 z-10  `}
      >
        {options.map((option, index) => (
          <div
            className=" w-full dark:border-gray-950 dark:text-black dark:hover:bg-gray-100 hover:bg-slate-900  text-white border-b-2   px-4 py-3 rounded-lg "
            key={index}
            onClick={() => {
              setSelectedOption(option);
              setSelecting(false);
            }}
          >
            {option === selectedOption ? (
              <span className="text-green-500">✔ {option}</span>
            ) : (
              option
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomSelect;
