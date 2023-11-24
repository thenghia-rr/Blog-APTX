import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavItem = ({
  title,
  link,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  return (
    <NavLink
      to={link}
      className={`${
        name === activeNavName
          ? "font-bold text-primary"
          : "font-semibold text-[#A5A5A5]"
      } flex items-center gap-x-2 py-4 text-lg`}
      onClick={() => setActiveNavName(name)}
    >
      {icon}
      {title}
    </NavLink>
  );
};

NavItem.propTypes = {
  title: PropTypes.any,
  link: PropTypes.any,
  icon: PropTypes.any,
  name: PropTypes.any,
  activeNavName: PropTypes.any,
  setActiveNavName: PropTypes.any,
};

export default NavItem;
