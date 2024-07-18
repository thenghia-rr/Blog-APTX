import { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { images } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentContainer from "../../components/comments/CommentContainer";
import BtnSocialShare from "../../components/BtnSocialShare";
import {
  getAllPosts,
  getSinglePost,
  savePost,
  unsavePost,
} from "../../services/index/posts";
import { CiBookmark, CiBookmarkCheck } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
// Body content
import parseJsonToHtml from "../../utils/parseJsonToHtml";
import ArticleDetailSkeleton from "../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { useSelector } from "react-redux";
import Editor from "../../components/editor/Editor";
import BtnScrollToTop from "../../components/BtnScrollToTop";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const ArticleDetailPage = () => {
  const { t } = useTranslation();
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get All posts
  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  // Get sigle post
  const {
    data: dataSinglePost,
    isError,
    isLoading,
  } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setBreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: `${data?.title}`, link: `/blog/${data?.slug}` },
      ]);
      setBody(parseJsonToHtml(data?.body));
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Save post
  const { mutate: savePostMutate } = useMutation({
    mutationFn: ({ token, postId }) => savePost({ token, postId }),
    onSuccess: () => {
      toast.success("Post saved successfully")
      queryClient.invalidateQueries(["blog", slug]);
    },
    onError: (error) => {
      toast.error("Post saved failed")
      console.log(error.message); // Handle error appropriately
    },
  });

  // Unsave post
  const { mutate: unsavePostMutate } = useMutation({
    mutationFn: ({ token, postId }) => unsavePost({ token, postId }),
    onSuccess: () => {
      toast.success("Post unsaved successfully")
      queryClient.invalidateQueries(["blog", slug]);
    },
    onError: (error) => {
      toast.error("Post unsaved failed")
      console.log(error.message); // Handle error appropriately
    },
  });

  // Main Func saved post
  const handleSave = () => {
    if (dataSinglePost?.savedBy.includes(userState?.userInfo?._id)) { // check user đã lưu bài viết hay chưa
      unsavePostMutate({token: userState?.userInfo?.token, postId: dataSinglePost._id });
    } else {
      savePostMutate({token: userState?.userInfo?.token, postId: dataSinglePost._id });
    }
  };

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch this post data from database" />
      ) : (
        <section className="container mx-auto max-w-6xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <BreadCrumbs data={breadCrumbsData} />
            <img
              src={
                dataSinglePost?.photo
                  ? dataSinglePost?.photo
                  : images.sampleImage
              }
              alt={dataSinglePost?.title}
              className="rounded-xl w-full max-h-[520px] object-cover dark:shadow-[-10px_-10px_30px_4px_rgba(255,255,255,0.1)]"
            />
            <span className="text-light-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base dark:text-dark-soft">
              {`${t("categories")}:${" "}`}
            </span>
            {dataSinglePost?.categories &&
            dataSinglePost.categories.length > 0 ? (
              dataSinglePost.categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/blog?category=${category.title}`}
                  className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold italic text-primary text-sm font-roboto inline-block mt-4 mr-2 md:text-base"
                >
                  {category.title}
                </Link>
              ))
            ) : (
              <span className="text-primary">{t("noCategory")}</span>
            )}

            <h1 className="text-xl font-semibold font-roboto mt-4 text-light-hard md:text-[26px] lg:text-3xl dark:text-dark-text">
              {dataSinglePost?.title}
            </h1>
            <div className="mt-4 text-light-soft prose prose-base sm:prose-xl">
              <div className="w-full">
                {!isLoading && !isError && (
                  <Editor content={dataSinglePost?.body} editable={false} />
                )}
              </div>
            </div>

            <CommentContainer
              comments={dataSinglePost?.comments}
              className="mt-10
          "
              logginedUserId={userState?.userInfo?._id}
              postSlug={slug}
            />
          </article>

          <div className="sticky top-20 right-0">
            <SuggestedPosts
              className="mt-8 lg:mt-0 lg:max-w-xs"
              header={t("latestArticle")}
              posts={postsData?.data}
              tags={dataSinglePost?.tags}
            />
            <div className="mt-7">
              {/* Saved Post */}
              <div className="text-3xl text-primary mb-4 cursor-pointer hover:text-red-400 transition-all duration-300">
                {dataSinglePost?.savedBy.includes(userState?.userInfo?._id) ? (
                  <FaBookmark onClick={handleSave} />
                ) : (
                  <CiBookmark onClick={handleSave} />
                )}
              </div>

              {/* Btn edit post for owner post */}
              {dataSinglePost?.user?._id === userState?.userInfo?._id && (
                <button
                  onClick={() =>
                    navigate(`/posts/edit/${dataSinglePost?.slug}`)
                  }
                  className="w-fit bg-primary text-sm text-white rounded-lg px-3 py-1 mb-3 font-semibold"
                >
                  {t("editPost")}
                </button>
              )}

              <h2 className="w-fit font-roboto font-medium text-light-hard mb-4 md:text-xl dark:text-dark-text">
                {`${t("shareOn")}: `}
              </h2>
              <BtnSocialShare
                url={encodeURI(window.location.href)}
                title={encodeURIComponent(dataSinglePost?.title)}
              />
            </div>
          </div>
        </section>
      )}
      <BtnScrollToTop />
    </MainLayout>
  );
};

export default ArticleDetailPage;
