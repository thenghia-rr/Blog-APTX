import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const NavItemCollapse = ({
  title,
  children,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(name === activeNavName);
  }, [activeNavName, name]);

  const handleChange = () => {
    if (isChecked) {
      setActiveNavName(""); // Đặt thành giá trị trống khi đóng
    } else {
      setActiveNavName(name);
    }
    setIsChecked(!isChecked);
  };

  return (
    <div className="d-collapse d-collapse-arrow bg-base-200 min-h-0 rounded-none py-2">
      <input
        type="checkbox"
        className="min-h-0 py-0"
        checked={isChecked}
        onChange={handleChange}
      />
      <div
        className={`d-collapse-title font-semibold min-h-0 py-0 pl-0 flex items-center gap-x-2 text-lg ${
          isChecked ? "font-bold text-primary" : "font-semibold text-[#A5A5A5]"
        }`}
      >
        {icon}
        {title}
      </div>
      {isChecked && (
        <div className="d-collapse-content">
          <div className="mt-2 flex flex-col gap-y-2">{children}</div>
        </div>
      )}
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
