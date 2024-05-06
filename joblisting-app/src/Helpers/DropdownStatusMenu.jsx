import PropTypes from "prop-types";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

function DropdownStatusMenu({ handleStatusChange, selectedRow }) {
  const generalStatus = ["In Progress", "Done", "Todo"];

  return (
    <div className="absolute z-50 top-0 right-[100%] text-slate-200 bg-slate-950 border border-white/50  rounded-md ">
      <ul>
        {generalStatus.map((status, index) => {
          return (
            <li
              onClick={() => handleStatusChange(status)}
              className="px-2 py-1 w-full text-nowrap hover:bg-slate-800 cursor-pointer flex items-center justify-between"
              key={index}
            >
              {status === selectedRow.status ? (
                <div className="flex items-center relative ">
                  <RiCheckboxBlankCircleFill
                    className=" absolute left-1"
                    size={10}
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
DropdownStatusMenu.propTypes = {
  handleStatusChange: PropTypes.func.isRequired,
  selectedRow: PropTypes.object.isRequired,
};
export default DropdownStatusMenu;
