import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import ToggleLanguage from "./ToggleLanguage";

const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);
  const { t } = useTranslation();

  const toggleDropdownHandler = () => {
    setDropdown((curState) => !curState);
  };

  return (
    <li className="relative group">
      {item.type === "link" ? (
        <>
          <Link
            to={item.href}
            className="px-4 py-2  hover:text-blue-500 transition-all duration-500"
          >
            {t(item.key)}
          </Link>
          <span className="absolute text-blue-500 transition-all duration-500 right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            /
          </span>
        </>
      ) : item.type === "dropdown" ? (
        <ToggleLanguage
          toggleDropdownHandler={toggleDropdownHandler}
          item={item}
          dropdown={dropdown}
        />
      ) : (
        <div className="flex flex-col items-center ">
          <button
            className="px-4 py-2 flex items-center gap-x-1 hover:text-blue-500 transition-all duration-300"
            onClick={toggleDropdownHandler}
          >
            <span>{item.name}</span>
            <MdKeyboardArrowDown />
          </button>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } lg:hidden transition-all duration-500 pt-1 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max lg:bg-white lg:rounded-lg`}
          >
            <ul className="flex flex-col shadow-lg rounded-lg overflow-hidden">
              {item.items.map((page) => (
                <Link
                  key={page.title}
                  to={page.href}
                  className="hover:text-blue-500 hover:bg-light-hard hover:lg:text-white text-white lg:text-light-soft px-4 py-2  transition-all duration-300"
                >
                  {page.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

export default NavItem;
