import PropTypes from "prop-types";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import React from "react";
const DropdownTaskMenu = React.forwardRef(
  ({ handleChange, selectedRow, generalItems, type }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute z-50 top-0 right-full text-slate-200 bg-slate-950 border border-white/10  rounded-md "
      >
        <ul>
          {generalItems.map((item, index) => {
            return (
              <li
                onClick={() => handleChange(type, item)}
                className="min-w-[120px]  px-2 py-1 w-full text-nowrap hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                key={index}
              >
                {item === selectedRow[type] ? (
                  <div className="flex items-center relative ">
                    <RiCheckboxBlankCircleFill
                      className=" absolute left-1"
                      size={9}
                    />
                    <p className="pl-6">{item}</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="pl-6">{item}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
DropdownTaskMenu.displayName = "DropdownTaskMenu";
DropdownTaskMenu.propTypes = {
  handleChange: PropTypes.func,
  selectedRow: PropTypes.object,
  generalItems: PropTypes.array,
  type: PropTypes.string,
};
export default DropdownTaskMenu;
