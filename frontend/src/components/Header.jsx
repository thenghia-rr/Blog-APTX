import { useState } from "react";
import { images } from "../constants";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import toast from "react-hot-toast";
import ToggleTheme from "./ToggleTheme";
import { useTranslation } from "react-i18next";
import NavItem from "./NavItem";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { createPost } from "../services/index/posts";

const navItemsInfo = [
  { name: "Home", type: "link", key: "home", href: "/" },
  { name: "Blog", type: "link", key: "blog", href: "/blog" },
  { name: "About", type: "link", key: "about", href: "/about" },
  {
    name: "Language",
    type: "dropdown",
    toggleIcons: true,
    items: [
      { title: "Tiếng Việt", key: "vietnamese", lang: "vi" },
      { title: "English", key: "english", lang: "en" },
    ],
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const { t } = useTranslation();

  const [navIsVisible, setNavIsVisible] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  // Create new Post (useMutation)
  const { mutate: mutateCreatePost } = useMutation({
    mutationFn: ({ token }) => {
      return createPost({
        token,
      });
    },
    onSuccess: (data) => {
      toast.success(t("messageCreatePostSuccess"));
      queryClient.invalidateQueries(["posts"]);
      navigate(`/posts/edit/${data?.slug}`);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // Handle display navbar
  const navDisplayHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  // Handle create new Post
  const handleCreatePost = ({ token }) => {
    if (confirm(t("isCreateNewPost"))) {
      window.scrollTo(0, 0);
      mutateCreatePost({ token });
    }
  };


  // Handle logout account
  const logoutHandler = () => {
    toast.success("Log out Successfully !");
    dispatch(logout());
    navigate("/");
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
                    <img
                      src={
                        userState?.userInfo?.avatar
                          ? userState?.userInfo.avatar
                          : images.userAnonymous
                      }
                      alt=""
                      className="rounded-full w-11 h-11 object-cover mt-5 lg:mt-0 border-[1px] border-blue-500 dark:border-glow cursor-pointer shadow-xl hover:scale-105 transition-all duration-300 ease-linear"
                      onClick={() => setProfileDropdown(!profileDropdown)}
                    />
                    {/* Profile Dropdown */}
                    <div
                      className={`${
                        profileDropdown ? "block" : "hidden"
                      } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                    >
                      <ul className="text-base font-semibold bg-dark-soft lg:bg-white text-center flex flex-col shadow-lg rounded-lg overflow-hidden dark:bg-dark-header ">
                        {userState?.userInfo?.admin && (
                          <button
                            onClick={() => navigate("/admin")}
                            type="button"
                            className="hover:text-blue-500 hover:bg-light-hard hover:lg:text-white text-white lg:text-light-soft px-4 py-2 dark:text-dark-text dark:hover:bg-dark-soft dark:hover:text-dark-backgr"
                          >
                            {t("dashboardAdmin")}
                          </button>
                        )}
                        {userState?.userInfo?.verified && (
                          <>
                            <button
                              onClick={() =>
                                handleCreatePost({
                                  token: userState?.userInfo?.token,
                                })
                              }
                              type="button"
                              className="hover:text-blue-500 hover:bg-light-hard hover:lg:text-white text-white lg:text-light-soft px-4 py-2 dark:text-dark-text dark:hover:bg-dark-soft dark:hover:text-dark-backgr"
                            >
                              {t("writeBlog")}
                            </button>
                            <button
                              onClick={() => navigate("/me/posts")}
                              type="button"
                              className="hover:text-blue-500 hover:bg-light-hard hover:lg:text-white text-white lg:text-light-soft px-4 py-2 dark:text-dark-text dark:hover:bg-dark-soft dark:hover:text-dark-backgr"
                            >
                              {t("myPosts")}
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => navigate("/me/saved-posts")}
                          type="button"
                          className="hover:text-blue-500 hover:bg-light-hard hover:lg:text-white text-white lg:text-light-soft px-4 py-2 dark:text-dark-text dark:hover:bg-dark-soft dark:hover:text-dark-backgr"
                        >
                          {t("savedPosts")}
                        </button>

                        <button
                          onClick={() => navigate("/me/profile")}
                          type="button"
                          className="hover:text-blue-500 hover:bg-light-hard hover:lg:text-white text-white lg:text-light-soft px-4 py-2 dark:text-dark-text dark:hover:bg-dark-soft dark:hover:text-dark-backgr"
                        >
                          {t("myProfile")}
                        </button>
                        <button
                          onClick={logoutHandler}
                          type="button"
                          className="hover:text-blue-500 hover:bg-light-hard hover:lg:text-white text-white lg:text-light-soft px-4 py-2 dark:text-dark-text dark:hover:bg-dark-soft dark:hover:text-dark-backgr"
                        >
                          {t("logout")}
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
              onClick={() => window.scrollTo(0, 0)}
              className="mt-5 lg:mt-0 border-2 border-blue-500 rounded-full px-6 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              {t("login")}
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
