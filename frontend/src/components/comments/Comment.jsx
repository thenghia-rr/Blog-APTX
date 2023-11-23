import propTypes from "prop-types";
import CommentForm from "./CommentForm";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import { images, stables } from "../../constants";

const Comment = ({
  comment,
  logginedUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  updateComment,
  deleteComment,
  replies,
  parentId = null,
}) => {
  const isUserLoggined = Boolean(logginedUserId);
  const commentBelongToUser = logginedUserId === comment.user._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;

  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg">
      <img
        src={
          comment?.user?.avatar
            ? stables.UPLOAD_FOLDER_BASE_URL + comment.user.avatar
            : images.userAnonymous
        }
        alt="user avt"
        className="w-9 h-9  object-cover object-center bg-center rounded-full"
      />

      <div className="flex flex-1 flex-col">
        <h5 className="font-bold text-light-hard text-xs md:text-sm lg:text-base">
          {comment.user.name}
        </h5>
        <span className="text-xs text-light-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {/* When the comment is not edited, it will be displayed */}
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-light-light">
            {comment.desc}
          </p>
        )}
        {/* When the comment is being edited, the desc will be hidden and the <CommentForm/> will be displayed */}
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHandler={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment.desc}
          />
        )}

        <div className="flex items-center gap-x-3 text-light-light font-roboto text-sm my-3 ">
          {/* Users must be logged in to reply */}
          {isUserLoggined && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment._id })
              }
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}
          {/* Comments can only be ACTIONS by the owner */}
          {commentBelongToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() => deleteComment(comment._id)}
              >
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>

        {/* If isReplying is true, <CommentForm/> will be displayed */}
        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {/* Displays replies corresponding to UserId */}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addComment={addComment}
                affectedComment={affectedComment}
                comment={reply}
                deleteComment={deleteComment}
                logginedUserId={logginedUserId}
                replies={[]}
                updateComment={updateComment}
                parentId={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: propTypes.any,
  logginedUserId: propTypes.any,
  affectedComment: propTypes.any,
  setAffectedComment: propTypes.any,
  addComment: propTypes.any,
  updateComment: propTypes.any,
  deleteComment: propTypes.any,
  replies: propTypes.any,
  parentId: propTypes.any,
};
export default Comment;
