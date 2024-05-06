import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import PropTypes from "prop-types";

function DropdownCategoryMenu({ handleCategoryChange, selectedRow }) {
  const generalCategories = ["Work", "Personal"];
  return (
    <div className="absolute z-50 top-0 right-[100%] text-slate-200 bg-slate-950 border border-white/50  rounded-md ">
      <ul>
        {generalCategories.map((category, index) => {
          return (
            <li
              onClick={() => handleCategoryChange(category)}
              className="px-2 py-1 w-full text-nowrap hover:bg-slate-800 cursor-pointer flex items-center justify-between"
              key={index}
            >
              {category === selectedRow.category ? (
                <div className="flex items-center relative ">
                  <RiCheckboxBlankCircleFill
                    className=" absolute left-1"
                    size={10}
                  />
                  <p className="pl-6">{category}</p>
                </div>
              ) : (
                <div className="flex items-center">
                  <p className="pl-6">{category}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
DropdownCategoryMenu.propTypes = {
  handleCategoryChange: PropTypes.func.isRequired,
  selectedRow: PropTypes.object.isRequired,
};
export default DropdownCategoryMenu;
