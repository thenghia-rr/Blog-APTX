import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { images, stables } from "../../../constants";
import { useNavigate } from "react-router-dom";

const SuggestedPosts = ({ className, header, posts = [], tags }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg p-4 ${className}`}
    >
      <h2 className="font-roboto font-semibold text-light-hard md:text-xl">
        {header}
      </h2>
      <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex space-x-3 flex-nowrap items-center"
          >
            <img
              src={
                post?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
                  : images.sampleImage
              }
              alt={post?.title}
              className="aspect-square object-cover rounded-lg w-1/5 cursor-pointer"
              onClick={() => navigate(`/blog/${post.slug}`)}
            />
            <div className="text-sm font-roboto text-light-hard font-medium">
              <h3
                className="md:text-base lg:text-lg cursor-pointer line-clamp-2"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                {post.title}
              </h3>
              <span className="text-xs opacity-60">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="font-roboto font-semibold text-light-hard mt-8 md:text-xl">
        Tags
      </h2>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.length === 0 ? (
          <h3 className="text-light-soft text-xs md:text-sm">
            There are no tags to display
          </h3>
        ) : (
          tags.map((tag) => (
            <Link
              key={tag}
              to="/"
              className="inline-block rounded-md px-3 py-2 bg-primary font-roboto text-xs text-white md:text-sm"
            >
              {tag}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

SuggestedPosts.propTypes = {
  className: PropTypes.any,
  header: PropTypes.any,
  posts: PropTypes.any,
  tags: PropTypes.any,
};
export default SuggestedPosts;
