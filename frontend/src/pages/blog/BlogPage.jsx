import toast from "react-hot-toast";
import MainLayout from "../../components/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/posts";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import ArticleCard from "../../components/ArticleCard";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import BtnScrollToTop from "../../components/BtnScrollToTop";

let isFirstRun = true;

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = Object.fromEntries([...searchParams]);

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParamsValue?.page || 1)
  );

  // use query for get all posts
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getAllPosts("", currentPage, 9),
    queryKey: ["posts"],
    onErorr: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // Auto scroll to top
  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    window.scrollTo(0, 0);
    refetch();
  }, [currentPage, refetch]);

  // Handle when page change
  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Change the page's query string in URL
    setSearchParams({ page });
  };

  return (
    <MainLayout>
      <section className="flex flex-col container mx-auto px-5 py-10 2xl:max-w-[1400px]">
        <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {isLoading ? (
            [...Array(3)].map((item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] 2xl:w-[calc(25%-22px)] "
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Couldn't fetch the posts data from database" />
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
  );
};

export default BlogPage;
