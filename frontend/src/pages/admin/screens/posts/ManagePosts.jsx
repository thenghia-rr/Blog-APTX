import { images, stables } from "../../../../constants";
import { getAllPosts } from "../../../../services/index/posts";
import { Link } from "react-router-dom";
import { deletePost } from "../../../../services/index/posts";
import { useDataTable } from "../../../../hooks/useDataTable";
import DataTable from "../../components/DataTable";
import { useTranslation } from "react-i18next";

const ManagePosts = () => {
  const { t } = useTranslation();
  const {
    userState,
    currentPage,
    searchKeyWord,
    data: postsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeyWordHandler,
    submitSearchHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllPosts(searchKeyWord, currentPage),
    dataQueryKey: "posts",
    deleteDataMessage: "Post is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deletePost({
        slug,
        token,
      });
    },
  });

  return (
    <DataTable
      pageTitle={t("managePosts")}
      dataListName={t("posts")}
      searchInputPlaceholder={t("postTitle")}
      searchKeyWordOnSubmitHandler={submitSearchHandler}
      searchKeywordOnChangeHandler={searchKeyWordHandler}
      searchKeyword={searchKeyWord}
      tableHeaderTitleList={[
        `${t("title")}`,
        `${t("categories")}`,
        `${t("createdAt")}`,
        `${t("tags")}`,
        `${t("actions")}`,
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={postsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={postsData?.headers}
      userState={userState}
      totalDataCount={postsData?.totalPostsCount}
    >
      {postsData?.data?.map((post) => (
        <tr key={post._id}>
          {/* TITLE COLUMN */}
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-dark-backgr">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to={`/blog/${post.slug}`} className="relative block">
                  <img
                    alt={post?.title}
                    src={
                      post?.photo
                        ? post?.photo
                        : images.sampleImage
                    }
                    className="mx-auto object-cover rounded-lg h-10 aspect-square "
                  />
                </Link>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap dark:text-dark-text">
                  {post?.title}
                </p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-dark-backgr">
            <p className="text-gray-900 whitespace-no-wrap dark:text-dark-text">
              {post?.categories.length > 0
                ? post.categories
                    .slice(0, 3)
                    .map(
                      (category, index) =>
                        `${category.title}${
                          post.categories.slice(0, 3).length === index + 1
                            ? ""
                            : ", "
                        }`
                    )
                : `${t("uncategorized")}`}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-dark-backgr">
            <p className="text-gray-900 whitespace-no-wrap dark:text-dark-text">
              {new Date(post?.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-dark-backgr">
            <div className="flex gap-x-1 dark:text-dark-text">
              {post?.tags.length > 0
                ? post?.tags.map((tag, index) => (
                    <p key={tag}>
                      {tag}
                      {post.tags.length - 1 !== index && ","}
                    </p>
                  ))
                : `${t("noTags")}`}
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-4 dark:bg-dark-backgr">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-500 hover:text-rose-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: post?.slug,
                  token: userState.userInfo.token,
                });
              }}
            >
              {t("delete")}
            </button>
            <Link
              to={`/posts/edit/${post?.slug}`}
              className="text-indigo-600 hover:text-indigo-900"
            >
              {t("edit")}
            </Link>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default ManagePosts;
