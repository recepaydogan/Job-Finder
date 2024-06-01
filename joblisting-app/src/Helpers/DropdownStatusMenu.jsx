import PropTypes from "prop-types";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import React from "react";
const DropdownStatusMenu = React.forwardRef(
  ({ handleStatusChange, selectedRow }, ref) => {
    const generalStatus = ["In Progress", "Done", "Todo"];

    return (
      <div
        ref={ref}
        className="absolute z-50 top-0 right-full text-slate-200 bg-slate-950 border border-white/10  rounded-md "
      >
        <ul>
          {generalStatus.map((status, index) => {
            return (
              <li
                onClick={() => handleStatusChange(status)}
                className="min-w-[120px]  px-2 py-1 w-full text-nowrap hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                key={index}
              >
                {status === selectedRow.status ? (
                  <div className="flex items-center relative ">
                    <RiCheckboxBlankCircleFill
                      className=" absolute left-1"
                      size={9}
                    />
                    <p className="pl-6">{status}</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="pl-6">{status}</p>
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
DropdownStatusMenu.displayName = "DropdownStatusMenu";
DropdownStatusMenu.propTypes = {
  handleStatusChange: PropTypes.func.isRequired,
  selectedRow: PropTypes.object.isRequired,
};
export default DropdownStatusMenu;
