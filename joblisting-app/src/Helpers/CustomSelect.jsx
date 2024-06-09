/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import useClickOutside from "./useClickOutside";
import { Transition } from "@headlessui/react";
function CustomSelect({
  options,
  defaultValue,
  onSelectChange,
  onChange,
  name,
}) {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [selecting, setSelecting] = useState(false);
  const selectRef = useRef();
  useClickOutside({ itemRef: selectRef, setItem: setSelecting });
  // Close the dropdown when clicking outside
  useEffect(() => {
    if (defaultValue == "") {
      setSelectedOption("Any");
    }
  }, [defaultValue]);

  // Handle the change of the selected option -- For the job Creation form

  const handleChange = (value) => {
    onChange({
      target: {
        name: name,
        value: value !== "Any" ? value : "",
      },
    });
  };
  // Update the parent component when the selected option changes -- For filtering Jobs and others
  useEffect(() => {
    if (selectedOption && onSelectChange) {
      onSelectChange(selectedOption);
    }
  }, [selectedOption, onSelectChange]);

  return (
    <div ref={selectRef} className=" relative select-none cursor-pointer">
      <div
        onClick={() => setSelecting(!selecting)}
        className=" dark:border-slate-950 dark:bg-slate-900  flex  w-full  justify-between  text-white border-[1px] border-gray-400   px-4 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
      >
        {selectedOption}
        <IoMdArrowDropdown />
      </div>
      <Transition
        show={selecting}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className={` ${
            selecting
              ? "opacity-100  "
              : "opacity-0 select-none pointer-events-none"
          } dark:border-slate-950 dark:bg-white bg-slate-950 absolute w-full border-[1px] py-8 border-gray-400 rounded-lg flex gap-3 flex-col px-3 mt-1 z-10  `}
        >
          {options.map((option, index) => (
            <div
              className=" w-full dark:border-gray-950 dark:text-black dark:hover:bg-gray-100 hover:bg-slate-900  text-white border-b-[1px]   px-3 py-1 rounded-lg "
              key={index}
              onClick={() => {
                setSelectedOption(option);
                setSelecting(false);
                if (onChange) {
                  handleChange(option);
                }
              }}
            >
              {option === selectedOption ? (
                <div className="relative">
                  <span className="absolute -top-1 dark:text-black text-white text-xl">
                    ✓
                  </span>{" "}
                  <p className="pl-6">{option}</p>
                </div>
              ) : (
                <p className="pl-6">{option}</p>
              )}
            </div>
          ))}
        </div>
      </Transition>
    </div>
  );
}

export default CustomSelect;
