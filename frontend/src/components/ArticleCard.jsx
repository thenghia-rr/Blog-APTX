import PropTypes from "prop-types";
import { images, stables } from "../constants";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const ArticleCard = ({ post, className }) => {
  return (
    <div
      className={`${className} rounded-xl overflow-hidden shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]`}
    >
      <Link to={`/blog/${post.slug}`}>
        <div className="overflow-hidden">
          <img
            src={
              post.photo
                ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
                : images.sampleImage
            }
            alt="Post Image"
            className="w-full object-cover object-center h-56 md:h-52 lg:h-48 xl:h-60 transform hover:scale-110 hover:brightness-105 transition-all duration-300"
          />
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/blog/${post.slug}`}>
          <h2 className="font-roboto font-bold text-xl text-light-soft md:text-2xl lg:text-[28px] line-clamp-1">
            {post.title}
          </h2>
          <p className="text-light-light mt-3 text-sm md:text-lg line-clamp-1 ">
            {post.caption}
          </p>
        </Link>

        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={
                post.user.avatar
                  ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                  : images.userAnonymous
              }
              alt="avt user"
              className="w-9 h-9 md:w-10 md:h-10 rounded-[50%] object-cover object-center"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-light-soft text-sm md:text-base">
                {post.user.name}
              </h4>
              <div className="flex items-center gap-x-2">
                <span
                  className={`${
                    post.user.verified ? "bg-[#36B37E]" : "bg-red-500"
                  }  w-fit bg-opacity-20 p-1.5 rounded-full`}
                >
                  {post.user.verified ? (
                    <BsCheckLg className="w-2 h-2 text-[#36B37E]" />
                  ) : (
                    <AiOutlineClose className="w-2 h-2 text-red-500" />
                  )}
                </span>
                <span className="italic text-light-light text-xs md:text-sm">
                  {post.user.verified ? "Verified writer" : "Unverified writer"}
                </span>
              </div>
            </div>
          </div>
          <span className="italic text-light-soft text-sm md:text-base font-bold">
            {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleString("default", {
              month: "long",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  className: PropTypes.any,
  post: PropTypes.any,
};
export default ArticleCard;
