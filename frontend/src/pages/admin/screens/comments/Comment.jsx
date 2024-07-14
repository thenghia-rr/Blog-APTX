import { Link } from "react-router-dom";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  deleteComment,
  getAllComments,
  updateComment,
} from "../../../../services/index/comments";
import DataTable from "../../components/DataTable";
import { images, stables } from "../../../../constants";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Comment = () => {
  const { t } = useTranslation();

  const {
    userState,
    currentPage,
    searchKeyWord,
    data: commentsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeyWordHandler,
    submitSearchHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () =>
      getAllComments(userState.userInfo.token, searchKeyWord, currentPage),
    dataQueryKey: "comments",
    deleteDataMessage: "Comment is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteComment({
        commentId: slug,
        token,
      });
    },
  });

  // useMutation to update ACTIONS on the comment
  const {
    mutate: mutateUpdateCommentCheck,
    isLoading: isLoadingUpdateCommentCheck,
  } = useMutation({
    mutationFn: ({ token, check, commentId }) =>
      updateComment({
        token,
        check,
        commentId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments"]);
      toast.success(
        data?.check ? "Comment is approved" : "Comment is not approved"
      );
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <DataTable
      pageTitle={t("manageComments")}
      dataListName={t("comments")}
      searchInputPlaceholder={t("searchComment")}
      searchKeyWordOnSubmitHandler={submitSearchHandler}
      searchKeywordOnChangeHandler={searchKeyWordHandler}
      searchKeyword={searchKeyWord}
      tableHeaderTitleList={[
        `${t("author")}`,
        `${t("comments")}`,
        `${t("inRespondTo")}`,
        `${t("createdAt")}`,
        `${t("actions")}`,
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={commentsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={commentsData?.headers}
      totalDataCount={commentsData?.totalCommentsCount}
    >
      {commentsData?.data?.map((comment) => (
        <tr key={comment._id}>
          {/* AUTHOR COLUMN */}
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-dark-backgr ">
            <div className="flex items-center ">
              <div className="flex-shrink-0">
                <Link to={`/`} className="relative block">
                  <img
                    alt={comment?.user?.name}
                    src={
                      comment?.user?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL + comment?.user?.avatar
                        : images.sampleImage
                    }
                    className="mx-auto object-cover rounded-lg h-10 aspect-square "
                  />
                </Link>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap dark:text-dark-text">
                  {comment?.user?.name}
                </p>
              </div>
            </div>
          </td>
          {/* COMMENT COLUMN */}
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-dark-backgr">
            {comment?.replyOnUser !== null && (
              <p className="text-gray-900 whitespace-no-wrap dark:text-dark-soft">
                {t("inReplyTo")} {""}
                <Link
                  to={`/blog/${comment?.post?.slug}/#comment-${comment?._id}`}
                  className="font-bold"
                >
                  {comment?.replyOnUser?.name}
                </Link>
              </p>
            )}
            <p className="text-gray-900 whitespace-no-wrap dark:text-dark-soft">
              {comment?.desc}
            </p>
          </td>
          {/* IN RESPOND TO COLUMN */}
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-dark-backgr">
            <p className="text-gray-900 whitespace-no-wrap dark:text-dark-soft">
              <Link to={`/blog/${comment?.post?.slug}`}>
                {comment?.post?.title}
              </Link>
            </p>
          </td>
          {/* CREATEDAT COLUMN */}
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-dark-backgr">
            <p className="text-gray-900 whitespace-no-wrap dark:text-dark-soft">
              {new Date(comment?.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </td>
          {/* ACTIONS COLUMN */}
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-4 dark:bg-dark-backgr">
            <button
              disabled={isLoadingDeleteData || isLoadingUpdateCommentCheck}
              type="button"
              className={`${
                comment?.check
                  ? "text-yellow-600 hover:text-yellow-900"
                  : "text-green-600 hover:text-green-900"
              }text-red-500 hover:text-rose-900 disabled:opacity-70 disabled:cursor-not-allowed`}
              onClick={() => {
                mutateUpdateCommentCheck({
                  token: userState.userInfo.token,
                  check: comment?.check ? false : true,
                  commentId: comment?._id,
                });
              }}
            >
              {comment?.check ? `${t("unapprove")}` : `${t("approve")}`}
            </button>

            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-500 hover:text-rose-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: comment?._id,
                  token: userState.userInfo.token,
                });
              }}
            >
              {t("delete")}
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default Comment;
