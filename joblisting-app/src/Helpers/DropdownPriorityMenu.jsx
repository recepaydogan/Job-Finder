import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import PropTypes from "prop-types";
function DropdownPriorityMenu({ handlePriorityChange, selectedRow }) {
  const generalPriority = ["High", "Medium", "Low"];
  return (
    <div className="absolute z-50 top-0 right-[100%] text-slate-200 bg-slate-950 border border-white/50  rounded-md ">
      <ul>
        {generalPriority.map((priority, index) => {
          return (
            <li
              onClick={() => handlePriorityChange(priority)}
              className="px-2 py-1 w-full text-nowrap hover:bg-slate-800 cursor-pointer flex items-center justify-between"
              key={index}
            >
              {priority === selectedRow.priority ? (
                <div className="flex items-center relative ">
                  <RiCheckboxBlankCircleFill
                    className=" absolute left-1"
                    size={10}
                  />
                  <p className="pl-6">{priority}</p>
                </div>
              ) : (
                <div className="flex items-center">
                  <p className="pl-6">{priority}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
DropdownPriorityMenu.propTypes = {
  handlePriorityChange: PropTypes.func,
  selectedRow: PropTypes.object,
};
export default DropdownPriorityMenu;
