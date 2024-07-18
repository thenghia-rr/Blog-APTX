import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "../../components/MainLayout";
import { getAllPosts } from "../../services/index/posts";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import ArticleCard from "../../components/ArticleCard";
import { useTranslation } from "react-i18next";
import { FaBookOpen } from "react-icons/fa";

const MyPostPage = () => {
  const { t } = useTranslation();
  const userState = useSelector((state) => state.user);

  // use query for get all posts (and search blog)
  const {
    data: dataAllPosts,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => getAllPosts("", 1, 9999),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // Auto scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, [refetch]);

  // Check userId hiện tại có trùng với id người tạo trong post không
  const filteredPosts = dataAllPosts?.data.filter(
    (post) => post?.user?._id === userState?.userInfo?._id
  );

  return (
    <MainLayout>
      <section className="flex flex-col container mx-auto px-5 py-10 2xl:max-w-[1400px]">
        <div className="mb-16 flex items-center">
          <span className="text-primary text-3xl mr-4">
            <FaBookOpen />
          </span>
          <h2 className="text-primary font-semibold text-3xl ">
            {t("myPosts")}
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
          ) : filteredPosts.length === 0 ? (
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
                  {t("noPostCreated")}
                </h2>
              </div>
            </>
          ) : (
            filteredPosts.map((post) => (
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

export default MyPostPage;
