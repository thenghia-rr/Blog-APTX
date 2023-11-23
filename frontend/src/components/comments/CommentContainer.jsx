import { useState } from "react";
import propTypes from "prop-types";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewComment, updateComment } from "../../services/index/comments";
import toast from "react-hot-toast";

const CommentContainer = ({ className, logginedUserId, comments, postSlug }) => {
  const [affectedComment, setAffectedComment] = useState(null);
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  // isLoading is not working
  // Add comment useMutation
  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
        return createNewComment({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess: () => {
        toast.success(
          "Your comment is send successfully, It will be display after the confirmation of the Admin !"
        );
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
    
  // Update comment useMutation
  const { mutate: mutateUpdateComment } =
  useMutation({
    mutationFn: ({ token,desc, commentId  }) => {
      return updateComment({ token, desc, commentId});
    },
    onSuccess: () => {
      toast.success(
        "Your comment is updated successfully, It will be change after a few seconds"
      );
      queryClient.invalidateQueries(['blog', postSlug])
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  
  // Add Comment
  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token: userState.userInfo.token,
      slug: postSlug,
    });
    setAffectedComment(null);
  };

  // Update Comment 
  const updateCommentHandler = (value, commentId) => {
    mutateUpdateComment({
      token: userState.userInfo.token,
      desc: value,
      commentId
    })
    setAffectedComment(null);
  };

  // Delete Comment
  const deleteCommentHandler = (commentId) => {};

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
      />
      <div className="space-y-4 mt-8">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            logginedUserId={logginedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

CommentContainer.propTypes = {
  className: propTypes.any,
  logginedUserId: propTypes.any,
  comments: propTypes.any,
  postSlug: propTypes.any
};
export default CommentContainer;
