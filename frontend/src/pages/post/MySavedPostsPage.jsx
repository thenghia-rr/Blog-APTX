import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getSavedPosts } from "../../services/index/posts";
import MainLayout from "../../components/MainLayout";
import ErrorMessage from "../../components/ErrorMessage";
import { useTranslation } from "react-i18next";
import ArticleCard from "../../components/ArticleCard";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import { IoBookmarksSharp } from "react-icons/io5";

const MySavedPostsPage = () => {
  const { t } = useTranslation();
  const userState = useSelector((state) => state.user);

  const {
    data: savedPosts,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: () => getSavedPosts({ token: userState?.userInfo?.token }),
  });

  // Auto scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, [refetch]);
  
  return (
    <MainLayout>
      <section className="flex flex-col container mx-auto px-5 py-10 2xl:max-w-[1400px]">
        <div className="mb-16 flex items-center">
          <span className="text-primary text-3xl mr-4">
            <IoBookmarksSharp />
          </span>
          <h2 className="text-primary font-semibold text-3xl ">
            {t("savedPosts")}
          </h2>
        </div>
        <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {isLoading || isFetching ? (
            [...Array(6)].map((item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] 2xl:w-[calc(25%-22px)] "
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Couldn't fetch the posts data from database" />
          ) : savedPosts?.length === 0 ? (
            <>
              <div className="text-center p-6 max-w-sm mx-auto mt-10 bg-white rounded-xl shadow-lg space-y-4 dark:bg-dark-header dark:border-glow">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 dark:text-dark-text"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2M7 9v2m10-2v2m-6 4h.01M3 13h18m-9-9a3 3 0 00-3 3v3a3 3 0 003 3 3 3 0 003-3V7a3 3 0 00-3-3z"
                  />
                </svg>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-dark-text">
                  {t("noSavePosts")}
                </h2>
              </div>
            </>
          ) : (
            savedPosts.map((post) => (
              <ArticleCard
                key={post._id}
                post={post}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] xl:w-[calc(25%-22px)]"
              />
            ))
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default MySavedPostsPage;
