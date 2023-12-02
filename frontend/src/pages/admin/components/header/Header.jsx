import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { images } from "../../../../constants";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../../services/index/posts";
import { useSelector } from "react-redux";

const Header = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const windowSize = useWindowSize();

  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");

  // Create Post
  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ token }) => {
        return createPost({
          token,
        });
      },
      onSuccess: (data) => {
        toast.success("Create Post Successfully, Edit now !");
        queryClient.invalidateQueries(["posts"]);
        navigate(`/admin/posts/manage/edit/${data?.slug}`);
      },
      onError: (error) => {
        toast.error(error.message);

        console.log(error);
      },
    });

  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  // Handle when click button create new post
  const handleCreateNewPost = ({ token }) => {
    if(window.confirm("Are you sure you want to create new post?")) {
      mutateCreatePost({ token });
    }
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
              <NavItem
                title="Dashboard"
                link="/admin"
                icon={<AiFillDashboard className="text-xl" />}
                name="dashboard"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItem
                title="Comments"
                link="/admin/comments"
                icon={<FaComment className="text-xl" />}
                name="comments"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />

              <NavItemCollapse
                title="Posts"
                icon={<MdDashboard className="text-xl" />}
                name="posts"

                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                <Link
                  to="/admin/posts/manage"
                  className="text-[#A5A5A5] font-semibold"
                >
                  Manage All Posts
                </Link>
                <button
                  disabled={isLoadingCreatePost}
                  onClick={() =>
                    handleCreateNewPost({token: userState?.userInfo?.token})
                  }
                  className="text-start text-[#A5A5A5] font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Create New Post
                </button>
              </NavItemCollapse>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
