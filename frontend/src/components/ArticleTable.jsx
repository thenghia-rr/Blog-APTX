import PropTypes from "prop-types";
import { images } from "../constants";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const ArticleTable = ({ post, className }) => {
  return (
    <div className={`${className} p-5 bg-white dark:bg-dark-header rounded-2xl shadow-md transition-transform transform hover:scale-105`}>
      <table className="table-fixed w-full">
        <tbody>
          <tr className="h-48">
            <td colSpan="2" className="relative overflow-hidden">
              <Link to={`/blog/${post.slug}`}>
                <img
                  src={post.photo ? post?.photo : images.sampleImage}
                  alt="Post Image"
                  className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
              </Link>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="p-3">
              <Link to={`/blog/${post.slug}`}>
                <h2 className="font-roboto font-bold text-xl text-gray-900 dark:text-white line-clamp-1">
                  {post.title}
                </h2>
                <p className="text-gray-700 mt-2 text-sm md:text-lg line-clamp-2 dark:text-gray-300">
                  {post.caption}
                </p>
              </Link>
            </td>
          </tr>
          <tr className="mt-4">
            <td className="flex items-center gap-x-2">
              <img
                src={post?.user?.avatar ? post?.user?.avatar : images.userAnonymous}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-dark-background shadow-md"
              />
              <div className="flex flex-col">
                <h4 className="font-bold text-gray-900 text-sm md:text-base dark:text-white">
                  {post.user.name}
                </h4>
                <div className="flex items-center gap-x-2">
                  <span className={`${post.user.verified ? "bg-green-500" : "bg-red-500"} w-fit bg-opacity-20 p-1.5 rounded-full`}>
                    {post.user.verified ? (
                      <BsCheckLg className="w-3 h-3 text-green-500" />
                    ) : (
                      <AiOutlineClose className="w-3 h-3 text-red-500" />
                    )}
                  </span>
                  <span className="text-gray-600 text-xs md:text-sm dark:text-gray-400">
                    {post.user.verified ? "Verified writer" : "Unverified writer"}
                  </span>
                </div>
              </div>
            </td>
            <td className="text-right">
              <span className="text-gray-600 text-sm md:text-base font-bold dark:text-gray-400">
                {new Date(post.createdAt).getDate()}{" "}
                {new Date(post.createdAt).toLocaleString("default", {
                  month: "long",
                })}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

ArticleTable.propTypes = {
  className: PropTypes.any,
  post: PropTypes.any,
};

export default ArticleTable;
