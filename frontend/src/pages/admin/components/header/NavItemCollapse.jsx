import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavItemCollapse = ({
  title,
  content,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (activeNavName !== name) {
      setIsChecked(false);
    }
  }, [activeNavName, name]);
  
  return (
    <div className="d-collapse d-collapse-arrow bg-base-200 min-h-0 rounded-none py-2">
      <input
        type="checkbox"
        className="min-h-0 py-0"
        checked={name === activeNavName}
        onChange={() => {
          setActiveNavName(name);
          setIsChecked(!isChecked);
        }}
      />

      <div
        className={`d-collapse-title font-semibold min-h-0 py-0 pl-0 flex items-center gap-x-2 text-lg ${
          name === activeNavName
            ? "font-bold text-primary"
            : "font-semibold text-[#A5A5A5]"
        }`}
      >
        {icon}
        {title}
      </div>
      {/* Child collapse (Posts) */}
      <div className="d-collapse-content">
        <div className="mt-2 flex flex-col gap-y-2">
          {content.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className='flex gap-x-2 font-semibold text-[#A5A5A5]'
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

NavItemCollapse.propTypes = {
  title: PropTypes.any,
  content: PropTypes.any,
  icon: PropTypes.any,
  name: PropTypes.any,
  activeNavName: PropTypes.any,
  setActiveNavName: PropTypes.any,
};
export default NavItemCollapse;
