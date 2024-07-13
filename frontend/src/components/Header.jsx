import { useState } from "react";
import { images } from "../constants";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import toast from "react-hot-toast";
import ToggleTheme from "./ToggleTheme";

const navItemsInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "Blog", type: "link", href: "/blog" },
  { name: "About", type: "link", href: "/about" },
  // {
  //   name: "Pages",
  //   type: "dropdown",
  //   items: [
  //     { title: "About Us", href: "/about" },
  //     { title: "Contact Us", href: "/contact" },
  //   ],
  // },
  { name: "FAQ", type: "link", href: "/faq" },
  // { name: "Pricing", type: "link", href: "/pricing" },
];

const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);

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
            {item.name}
          </Link>
          <span className="absolute text-blue-500 transition-all duration-500 right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            /
          </span>
        </>
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

const Header = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [navIsVisible, setNavIsVisible] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const navDisplayHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  const logoutHandler = () => {
    toast.success("Log out Successfully !");
    dispatch(logout());
  };
  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-white dark:bg-dark-header">
      <header className="container mx-auto px-5 flex justify-between items-center py-4 2xl:max-w-[1400px]">
        <Link to="/">
          <img
            src={images.LogoAPTX}
            alt="Logo"
            className="h-[24px] md:h-[32px] lg:h-[36px] 2xl:h-[38px] dark:brightness-200 dark:contrast-200"
          />
        </Link>
        <div className="z-50 lg:hidden dark:text-dark-text">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6 cursor-pointer"
              onClick={navDisplayHandler}
            />
          ) : (
            <AiOutlineMenu
              className="w-6 h-6 cursor-pointer"
              onClick={navDisplayHandler}
            />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-300 mt-[56px] lg:mt-0 bg-light-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center items-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static  gap-x-9`}
        >
          <ul className="items-center gap-y-5 text-white lg:text-light-soft flex flex-col lg:flex-row gap-x-2 font-semibold dark:text-dark-text">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
          <ToggleTheme />
          {userState.userInfo ? (
            <>
              <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
                <div className="relative group">
                  <div className="flex flex-col items-center">
                    <button
                      className="flex gap-x-1 items-center mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 "
                      onClick={() => setProfileDropdown(!profileDropdown)}
                    >
                      <span>Account</span>
                      <MdKeyboardArrowDown />
                    </button>
                    <div
                      className={`${
                        profileDropdown ? "block" : "hidden"
                      } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                    >
                      <ul className="bg-dark-soft lg:bg-white text-center flex flex-col shadow-lg rounded-lg overflow-hidden dark:bg-dark-header ">
                        {userState?.userInfo?.admin && (
                          <button
                            onClick={() => navigate("/admin")}
                            type="button"
                            className="hover:text-blue-500 hover:bg-light-hard hover:lg:text-white text-white lg:text-light-soft px-4 py-2 dark:text-dark-text dark:hover:bg-dark-soft dark:hover:text-dark-backgr"
                          >
                            Dashboard Admin
                          </button>
                        )}
                        <button
                          onClick={() => navigate("/profile")}
                          type="button"
                          className="hover:text-blue-500 hover:bg-light-hard hover:lg:text-white text-white lg:text-light-soft px-4 py-2 dark:text-dark-text dark:hover:bg-dark-soft dark:hover:text-dark-backgr"
                        >
                          My Profile
                        </button>
                        <button
                          onClick={logoutHandler}
                          type="button"
                          className="hover:text-blue-500 hover:bg-light-hard hover:lg:text-white text-white lg:text-light-soft px-4 py-2 dark:text-dark-text dark:hover:bg-dark-soft dark:hover:text-dark-backgr"
                        >
                          Log out
                        </button>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="mt-5 lg:mt-0 border-2 border-blue-500 rounded-full px-6 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Sign in
            </Link>
          )}
        </div>
      </header>
    </section>
  );
};

NavItem.propTypes = {
  item: PropTypes.any,
};
export default Header;
