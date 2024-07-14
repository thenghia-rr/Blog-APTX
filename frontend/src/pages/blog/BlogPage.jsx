import toast from "react-hot-toast";
import MainLayout from "../../components/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/posts";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import ArticleCard from "../../components/ArticleCard";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Pagination from "../../components/Pagination";
import BtnScrollToTop from "../../components/BtnScrollToTop";
import SearchBlog from "../../components/SearchBlog";
import { useTranslation } from "react-i18next";

let isFirstRun = true;

const BlogPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = Object.fromEntries([...searchParams]);

  const currentPage = parseInt(searchParamsValue?.page || 1);
  const searchKeyword = searchParamsValue?.search || "";

  // use query for get all posts (and search blog)
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage, 9),
    queryKey: ["posts"],
    onErorr: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // Auto scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [currentPage, searchKeyword, refetch]);

  // Handle when page change
  const handlePageChange = (page) => {
    // Change the page's query string in URL
    setSearchParams({ page, search: searchKeyword });
  };

  // Handle Search
  const handleSearch = ({ searchKeyword }) => {
    setSearchParams({ page: 1, search: searchKeyword });
  };

  return (
    <div className="w-full dark:bg-dark-backgr">
      <MainLayout>
        <section className="flex flex-col container mx-auto px-5 py-10 2xl:max-w-[1400px]">
          <SearchBlog
            className="w-full max-w-xl mb-10"
            onSearchKeyword={handleSearch}
          />
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
            ) : data?.data.length === 0 ? (
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
                    {t("noPostFound")}
                  </h2>
                  <p className="text-gray-600 dark:text-dark-soft">
                    {t("noPostFoundDesc")}
                  </p>
                </div>
              </>
            ) : (
              data?.data.map((post) => (
                <ArticleCard
                  key={post._id}
                  post={post}
                  className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] "
                />
              ))
            )}
          </div>
          {!isLoading && (
            <Pagination
              onPageChange={(page) => handlePageChange(page)}
              currentPage={currentPage}
              totalPageCount={JSON.parse(data?.headers?.["x-totalpagecount"])}
            />
          )}
        </section>
        <BtnScrollToTop />
      </MainLayout>
    </div>
  );
};

export default BlogPage;
