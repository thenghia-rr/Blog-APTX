import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDashboard, MdOutlineManageSearch } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";

import { images } from "../../../../constants";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";

const MENU_ITEMS = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <AiFillDashboard className="text-xl" />,
    name: "dashboard",
    type: "link",
  },
  {
    title: "Comments",
    link: "/admin/comments",
    icon: <FaComment className="text-xl" />,
    name: "comments",
    type: "link",
  },
  {
    title: "Posts",
    content: [
      {
        title: "New",
        link: "/admin/posts/new",
        icon: <IoIosCreate className="text-lg" />,
      },
      {
        title: "Manage",
        link: "/admin/posts/manage",
        icon: <MdOutlineManageSearch className="text-lg" />,
      },
    ],
    icon: <MdDashboard className="text-xl" />,
    name: "posts",
    type: "collapse",
  },
];

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();

  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  // screen > 1024 => Display sidebar for left
  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  return (
    <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0 z-50">
      {/* Logo */}
      <Link to="/">
        <img src={images.LogoAPTX} alt="logo" className="w-16 lg:hidden" />
      </Link>
      {/* Menu burger icon */}
      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="w-6 h-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="w-6 h-6" onClick={toggleMenuHandler} />
        )}
      </div>

      {/* Sidebar container */}
      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full transition-transform duration-300">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 lg:hidden"
            onClick={toggleMenuHandler}
          />
          {/* Sidebar */}
          <div
            className={`fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6 transform  ${
              isMenuActive ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Link to="/">
              <img src={images.LogoAPTX} alt="logo" className="w-16" />
            </Link>
            <h4 className="mt-10 font-bold text-[#C7C7C7]">MAIN MENU</h4>
            {/* Menu items */}
            <div className="mt-6 flex flex-col gap-y-[0.563rem]">
              {MENU_ITEMS.map((item) =>
                item.type === "link" ? (
                  <NavItem
                    key={item.title}
                    title={item.title}
                    link={item.link}
                    icon={item.icon}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                ) : (
                  <NavItemCollapse
                    key={item.title}
                    title={item.title}
                    content={item.content}
                    icon={item.icon}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
